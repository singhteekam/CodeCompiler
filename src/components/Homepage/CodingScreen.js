import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react';
import "./Homepage.css";

const CodingScreen = ({onChange, language, code, theme}) => {

  const [value, setValue]= useState(code || "");

  const handleCodingScreen= (value)=>{
    setValue(value);
    onChange("code", value);
  }


  return (
    <div className='coding-screen'>
        <Editor 
            height="55vh"
            width="100%"
            language={language || "C++"}
            value={value}
            theme={theme}
            defaultValue="// Default text"
            onChange={handleCodingScreen}
        />
    </div>
  )
}

export default CodingScreen;
