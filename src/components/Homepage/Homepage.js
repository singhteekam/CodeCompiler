import React, { useEffect, useState } from "react";
import CodingScreen from "./CodingScreen";
import { languages } from "../utils/languages";
import ThemesDropdown from "../utils/ThemesDropdown";
import LanguagesDropdown from "../utils/LanguagesDropdown";
import ResultDisplay from "./ResultDisplay";
import OutputInfo from "./OutputInfo";
import CustomInput from "./CustomInput";
import { defineTheme } from "../utils/defineTheme";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";

const Homepage = () => {
  const defaultCPPCode = `
    // Your First C++ Program

    #include <iostream>
    
    int main() {
        std::cout << "Hello World!";
        return 0;
    }
    `;

  const [code, setCode] = useState(defaultCPPCode);
  const [customInput, setCustomInput] = useState("");
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languages[1]);
  const [outputInfo, setOutputInfo] = useState(null);
  const [processing, setProcessing] = useState(null);

  const [apiKey, setApiKey] = useState(process.env.REACT_APP_RAPID_API_KEY1);

    useEffect(()=>{
      const randomKey= Math.floor(Math.random() * 2) + 1;
      switch (randomKey) {
        case 1:
          setApiKey(process.env.REACT_APP_RAPID_API_KEY1);
          console.log("Using key1");
          break;
        case 2:
          setApiKey(process.env.REACT_APP_RAPID_API_KEY2);
          console.log("Using key2");
          break;
        default:
          setApiKey(process.env.REACT_APP_RAPID_API_KEY1);
          console.log("Default Using key1");
      }
    }, []);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const onCodeScreenChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    console.log("Code:" + btoa(code));
    console.log("Code:" + btoa(customInput));
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    // console.log(process.env.REACT_APP_RAPID_API_URL)
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        // "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Key": apiKey,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        // let status = err.response.status;
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        // "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Key": apiKey,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputInfo(response.data);
        console.log("Successfully executed..");
        // showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      //   showErrorToast();
      console.log("Error");
    }
  };

  return (
    <div>
      <div className="top-header">
          <div className="header-items codecompiler">Code Compiler</div>
          <div className="header-items language">
          <LanguagesDropdown onSelectChange={onSelectChange} />
          </div>
          <div className="header-items theme">
          <ThemesDropdown
              handleThemeChange={handleThemeChange}
              theme={theme}
            />
          </div>
      </div>

      {/* Coding window */}
      <div>
        <CodingScreen
          code={code}
          onChange={onCodeScreenChange}
          language={language?.value}
          theme={theme.value}
        />
      </div>

      {/* To display result */}
      <div>
        <div>
          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
          <br />

          <Button
            variant="secondary"
            onClick={handleCompile}
            disabled={!code}
            className="compile-button"
          >
            {processing ? "Processing..." : "Compile and Execute"}
          </Button>

          <ResultDisplay outputInfo={outputInfo} />
        </div>

        {outputInfo && <OutputInfo outputInfo={outputInfo} />}
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-items">
          Developed by <a href="https://www.singhteekam.in" target="_blank">Teekam Singh</a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
