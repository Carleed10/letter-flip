import { useEffect, useState } from "react";
import React from "react";
import "../src/wafle.css";

const Wafle = () => {
  const words = [
    { word: "QUIRK", meaning: "A peculiar trait or characteristic." },
    { word: "GLEAM", meaning: "A brief or faint appearance of light." },
    { word: "HOVER", meaning: "To remain in one place in the air." },
    { word: "GROAN", meaning: "To make a low sound of pain or discomfort." },
    { word: "STOKE", meaning: "To add fuel to a fire or stir up an activity." },
    { word: "GIVEN", meaning: "Accepted or considered as a fact." },
    { word: "CAMEO", meaning: "A small role in a film or a piece of jewelry with a raised design." },
    { word: "BREEZE", meaning: "A gentle wind." },
    { word: "TWIST", meaning: "To bend or turn something into a different shape." },
    { word: "PRUNE", meaning: "To trim or cut back, especially for improvement." },
    { word: "VAST", meaning: "Very great in extent or quantity." },
    { word: "FLARE", meaning: "A sudden burst of light or flame." },
  ];

  const [selectedWord, setSelectedWord] = useState("");
  const [originalWord, setOriginalWord] = useState("");
  const [inputFields, setInputFields] = useState([]); // For first attempt
  const [inputFields2, setInputFields2] = useState([]); // For second attempt
  const [draggedChar, setDraggedChar] = useState(null);
  const [attempts, setAttempts] = useState(2);
  const [usedIndexes, setUsedIndexes] = useState(new Set()); // Track used character indexes for current attempt

  useEffect(() => {
    resetGame();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setOriginalWord(randomWord.word);

    const shuffledChars = shuffleArray(randomWord.word.split(""));
    const shuffledWord = shuffledChars.join("");

    setSelectedWord(shuffledWord);
    setInputFields(Array(shuffledChars.length).fill(""));
    setInputFields2(Array(shuffledChars.length).fill(""));
    setAttempts(2);
    setUsedIndexes(new Set()); // Reset used indexes for new game
  };

  const handleDragStart = (char, index) => {
    setDraggedChar({ char, index });
  };

  const handleDrop = (index, isSecondAttempt = false) => {
    if (!draggedChar) return;

    const newInputFields = isSecondAttempt ? [...inputFields2] : [...inputFields];

    // Prevent replacing filled input fields
    if (newInputFields[index] !== "") return;

    // Allow drop only if the character has not been used in this attempt
    if (!usedIndexes.has(draggedChar.index)) {
      newInputFields[index] = draggedChar.char;

      if (isSecondAttempt) {
        setInputFields2(newInputFields);
      } else {
        setInputFields(newInputFields);
        // Mark the dragged character index as used in the current attempt
        setUsedIndexes((prev) => new Set(prev).add(draggedChar.index));
      }

      setDraggedChar(null);

      const allFieldsFilled = newInputFields.every((char) => char !== "");

      if (allFieldsFilled) {
        const isWordCorrect = newInputFields.every((char, idx) => char === originalWord[idx]);

        if (isWordCorrect) {
          setTimeout(() => {
            alert("You won!");
            resetGame();
          }, 200);
        } else {
          setAttempts((prevAttempts) => prevAttempts - 1);
          if (attempts - 1 <= 0) {
            setTimeout(() => {
              alert("You've used all attempts! Try again.");
              resetGame();
            }, 200);
          } else {
            // Reset usedIndexes so characters can be dragged again for second attempt
            setUsedIndexes(new Set());

            setTimeout(() => {
              alert("Some characters are incorrect. Try again.");
            }, 1000);
          }
        }
      }
    }
  };

  const handleInputChange = (event, index, isSecondAttempt = false) => {
    const newInputFields = isSecondAttempt ? [...inputFields2] : [...inputFields];
    newInputFields[index] = event.target.value.toUpperCase();
    if (isSecondAttempt) {
      setInputFields2(newInputFields);
    } else {
      setInputFields(newInputFields);
    }
  };

  // Find the meaning of the original word
  const currentWordMeaning = words.find(wordObj => wordObj.word === originalWord)?.meaning;

  return (
    <div className="wrap">
      <div className="all">
        <h3>Re-arrange in the correct order, you have just 2 chances</h3>

        <div className="word">
          {selectedWord.split("").map((char, index) => (
            <div
              key={index}
              className="incorrect"
              draggable // Allow all characters to be dragged
              onDragStart={() => handleDragStart(char, index)}
            >
              {char}
            </div>
          ))}
        </div>

        <div className="input-fields">
          <div className="div-input">
            {inputFields.map((value, index) => (
              <input
                key={index}
                value={value}
                onChange={(event) => handleInputChange(event, index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(index)}
                maxLength={1}
                className="input-box"
                style={{
                  backgroundColor: value
                    ? value === originalWord[index]
                      ? "green"
                      : "red"
                    : "",
                }}
              />
            ))}
          </div>
        </div>

        <div className="input-fields2">
          <div className="div-input">
            {inputFields2.map((value, index) => (
              <input
                key={index}
                value={value}
                onChange={(event) => handleInputChange(event, index, true)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(index, true)}
                maxLength={1}
                className="input-box"
                style={{
                  backgroundColor: value
                    ? value === originalWord[index]
                      ? "green"
                      : "red"
                    : "",
                }}
              />
            ))}
          </div>
        </div>

        {currentWordMeaning && <h5 style={{ color: 'white' }}> <span style={{color: 'yellow'}}>Word Meaning :</span> <br /> {currentWordMeaning}</h5>}
      </div>
    </div>
  );
};

export default Wafle;
