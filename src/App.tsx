import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Tablelist } from "./components/Table";

function App() {
  const [childInputValue, setChildInputValue] = useState<string>("");

  const handleChildInputChange = (value: string) => {
    setChildInputValue(value);
    console.log(childInputValue);
  };
  return (
    <div className="App">
      <Navbar onInputChange={handleChildInputChange} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          maxWidth: "auto",
          marginInline: "auto",
        }}
      >
        <Tablelist value={childInputValue} />
      </div>
    </div>
  );
}

export default App;
