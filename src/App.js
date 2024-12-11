import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [currentStep, setCurrentStep] = useState("start");
  const [history, setHistory] = useState(["start"]);

  const steps = {
    start: {
      question: "STEP 1: Is this a LEVI'S jacket?\nLook for:",
      options: [
        {
          text: "RED LEVI'S TAG on pocket",
          next: "leatherPatch",
        },
        {
          text: "LEVI'S LABEL inside",
          next: "leatherPatch",
        },
        {
          text: "NO Levi's marks found",
          next: "notLevis",
        },
      ],
    },
    leatherPatch: {
      question:
        "STEP 2: Look at the leather patch inside (usually near collar):",
      options: [
        {
          text: "Real leather patch with MADE IN USA",
          description: "Feels like genuine leather, stamped with USA",
          next: "vintage",
        },
        {
          text: "Real leather patch - without USA",
          description: "Still could be vintage - let's check more",
          next: "findCareTag",
        },
        {
          text: "Paper/Cardboard/Synthetic patch",
          description: "Not genuine leather material",
          next: "findCareTag",
        },
        {
          text: "No patch found or can't tell",
          next: "findCareTag",
        },
      ],
    },
    findCareTag: {
      question:
        "Look for any care/content tag inside the jacket.\nCheck these spots:",
      options: [
        {
          text: "LEFT SIDE SEAM (most common)",
          description: "Check 3-6 inches up from bottom hem",
          next: "examineTag",
        },
        {
          text: "RIGHT SIDE SEAM",
          description: "Check near the bottom of jacket",
          next: "examineTag",
        },
        {
          text: "INSIDE BACK",
          description: "Check near collar or bottom",
          next: "examineTag",
        },
        {
          text: "Can't find any care tag",
          next: "checkConstruction",
        },
      ],
    },
    examineTag: {
      question: "What kind of care tag did you find?",
      options: [
        {
          text: "Simple tag that says MADE IN USA",
          description: "Paper-like feel, basic text, minimal care instructions",
          next: "vintage",
        },
        {
          text: "Modern tag with USA mention",
          description: "Has washing symbols and detailed care instructions",
          next: "checkConstruction",
        },
        {
          text: "Tag shows other country (not USA)",
          next: "checkConstruction",
        },
      ],
    },
    checkConstruction: {
      question: "Check these vintage details.\nDo you see ANY of these?",
      options: [
        {
          text: "Single-stitch on hem/sleeves",
          description: "One row of stitching instead of two",
          next: "vintage",
        },
        {
          text: "Blanket lining inside jacket",
          description: "Soft, fuzzy blanket material",
          next: "vintage",
        },
        {
          text: "Big 'E' on red tab",
          description: "'E' is same size as other letters",
          next: "vintage",
        },
        {
          text: "None of these found",
          next: "regular",
        },
      ],
    },
    vintage: {
      result:
        "★ VINTAGE LEVI'S! ★\n\n→ PUT IN AMERICA'S THRIFT SUPPLY PACKAGE GAYLORD",
      details:
        "IMPORTANT:\n• Send ALL vintage - even if damaged or dirty\n• Do NOT put on sales floor",
      isResult: true,
    },
    regular: {
      result: "REGULAR LEVI'S JACKET\n\n→ PRICE FOR SALES FLOOR",
      isResult: true,
    },
    notLevis: {
      result: "NOT A LEVI'S JACKET\n\n→ SORT WITH REGULAR JACKETS",
      isResult: true,
    },
  };

  const handleOption = (next) => {
    setCurrentStep(next);
    setHistory([...history, next]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentStep(newHistory[newHistory.length - 1]);
    }
  };

  const handleReset = () => {
    setCurrentStep("start");
    setHistory(["start"]);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">QUICK LEVI'S CHECK</h1>

        {currentStepData.isResult ? (
          <div className="result-section">
            <div className="result-box">
              <p className="result-text">{currentStepData.result}</p>
              {currentStepData.details && (
                <p className="result-details">{currentStepData.details}</p>
              )}
            </div>
            <div className="button-group">
              <button onClick={handleBack} className="back-button">
                ← Back
              </button>
              <button onClick={handleReset} className="reset-button">
                ↺ Check Next Jacket
              </button>
            </div>
          </div>
        ) : (
          <div className="question-section">
            <p className="question-text">{currentStepData.question}</p>
            <div className="options-container">
              {currentStepData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOption(option.next)}
                  className="option-button"
                >
                  <div className="option-content">
                    <span>{option.text}</span>
                    <span className="arrow">→</span>
                  </div>
                  {option.description && (
                    <p className="image-caption">{option.description}</p>
                  )}
                </button>
              ))}
            </div>
            {history.length > 1 && (
              <button onClick={handleBack} className="back-button-solo">
                ← Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
