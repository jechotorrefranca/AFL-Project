import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function ProblemPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [caseP, setCaseP] = useState(null);
  const [final, setFinal] = useState([]);
  const [wholeResult, setWholeResult] = useState(false);
  const [noSelect, setNoSelect] = useState(null);

  const colorProblem1 = (str) => {
    if (!str.includes("ab")) {
      return <span className="text-green-400">{str}</span>;
    }

    return str.split(/(ab)/g).map((part, index) => {
      if (part === "ab") {
        return (
          <span key={index} className="text-red-400">
            {part}
          </span>
        );
      }
      return (
        <span key={index} className="text-green-400">
          {part}
        </span>
      );
    });
  };

  const colorProblem2 = (str) => {
    const bCount = (str.match(/b/g) || []).length;
    if (bCount <= 2) {
      return <span className="text-green-400">{str}</span>;
    } else {
      return str.split("b").map((part, index) => {
        return (
          <span key={index}>
            {index > 0 && <span className="text-red-400">b</span>}
            <span className="text-green-400">{part}</span>
          </span>
        );
      });
    }
  };

  // Accept all strings that do not contain 'ab'
  const checkProblem1 = () => {
    if (!input.includes("ab")) {
      setResult("Accepted");
      setFinal([<span className="text-green-400">{input}</span>]);
      setWholeResult(true);
    } else {
      setResult("Rejected");
      const coloredString = colorProblem1(input);
      setFinal([coloredString]);
      setWholeResult(true);
    }
  };

  // Accept all strings where 'b' is never tripled
  const checkProblem2 = () => {
    const bCount = (input.match(/b/g) || []).length;
    if (bCount <= 2) {
      setResult("Accepted");
      const coloredString = colorProblem2(input);
      setFinal([coloredString]);
      setWholeResult(true);
    } else {
      setResult("Rejected");
      const coloredString = colorProblem2(input);
      setFinal([coloredString]);
      setWholeResult(true);
    }
  };

  const handleButton1 = () => {
    setSelectedProblem("Accept all strings that do not contain 'ab'");
    setCaseP(1);
    setFinal([]);
    setResult("");
    setWholeResult(false);
    setNoSelect(null);
  };

  const handleButton2 = () => {
    setSelectedProblem("Accept all strings where 'b' is never tripled");
    setResult("");
    setFinal([]);
    setCaseP(2);
    setWholeResult(false);
    setNoSelect(null);
  };

  const handleCheck = () => {
    if (caseP === 1) {
      checkProblem1();
    } else if (caseP === 2) {
      checkProblem2();
    } else {
      setNoSelect("Please select a rule first!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950">
      <div className="flex flex-col gap-10 bg-zinc-900 border-2 border-blue-300 rounded-lg shadow-lg p-10 px-16 w-[50%] max-w-[60rem] text-center">
        <div className="flex justify-around gap-7">
          <button
            onClick={handleButton1}
            className={`font-bold bg-blue-600 text-white py-8 px-10 rounded-lg text-lg transition-all duration-300 transform ${
              caseP === 1 ? "bg-blue-950" : ""
            }`}
          >
            Accept all strings that do not contain 'ab'
          </button>
          <button
            onClick={handleButton2}
            className={`font-bold bg-blue-600 text-white py-8 px-10 rounded-lg text-lg transition-all duration-300 transform ${
              caseP === 2 ? "bg-blue-950" : ""
            }`}
          >
            Accept all strings where 'b' is never tripled
          </button>
        </div>

        {noSelect && (
          <div className="text-2xl text-red-400">
            <strong>{noSelect}</strong>
          </div>
        )}

        {selectedProblem && (
          <div className="text-blue-300 text-2xl flex justify-center items-center gap-4">
            <FontAwesomeIcon icon={faArrowRight} className="text-red-300" />
            <strong>{selectedProblem}</strong>
            <FontAwesomeIcon icon={faArrowLeft} className="text-red-300" />
          </div>
        )}

        <div className="bg-blue-200 rounded-full flex justify-center items-center p-3 gap-2">
          <input
            type="text"
            className="w-full border p-2 rounded-full text-center text-lg"
            value={input}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^ab]/g, "");
              setInput(newValue);
            }}
            placeholder="Enter a string"
          />

          <button
            onClick={handleCheck}
            className="bg-green-500 text-white w-fit h-fit p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-600 active:bg-green-700"
          >
            <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
          </button>
        </div>

        {wholeResult && (
          <div className="border-blue-300 border rounded-lg p-5 flex flex-col gap-5">
            <div
              className={`text-2xl font-bold ${
                result === "Rejected" ? "text-red-500" : "text-green-500"
              }`}
            >
              {result}
            </div>

            <div className="text-xl font-bold tracking-widest">{final}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemPage;
