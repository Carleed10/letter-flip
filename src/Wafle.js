import { useEffect, useState } from "react";
import React from "react";
import "../src/wafle.css";
import Animation from "./Animation";
import confetti from 'canvas-confetti'; 

const Wafle = () => {
  const words = [
    { word: "ABSCOND", meaning: "To leave hurriedly and secretly." },
    { word: "ADJURE", meaning: "To urge or request solemnly." },
    { word: "AEGIS", meaning: "Protection; support." },
    { word: "ALACRITY", meaning: "Brisk and cheerful readiness." },
    { word: "BILIOUS", meaning: "Irritable; sickly." },
    { word: "CATECH", meaning: "To teach the principles of Christian religion." },
    { word: "CLOISTER", meaning: "A covered walk in a convent, monastery, or college." },
    { word: "CONFLU", meaning: "To flow together." },
    { word: "DILETT", meaning: "A person who cultivates an area of interest without real commitment." },
    { word: "EQUIV", meaning: "A word having the same or nearly the same meaning as another." },
    { word: "FELICIT", meaning: "Well chosen or suited to the circumstances." },
    { word: "HAPHAZ", meaning: "Lacking any obvious principle of organization." },
    { word: "INEFF", meaning: "Too great to be expressed in words." },
    { word: "LACUNA", meaning: "An unfilled space or gap." },
    { word: "MALAPROP", meaning: "The misuse of a word by confusion with one that sounds similar." },
    { word: "NEBULO", meaning: "In the form of a cloud or haze; vague." },
    { word: "OBFUSC", meaning: "To deliberately make something unclear." },
    { word: "PANDIC", meaning: "To stretch oneself." },
    { word: "QUINT", meaning: "The most perfect or typical example of a quality or class." },
    { word: "RECOND", meaning: "Little known; abstruse." },
    { word: "SACROS", meaning: "Regarded as too important or valuable to be interfered with." },
    { word: "TANTAM", meaning: "Equivalent in seriousness to; virtually the same as." },
    { word: "VICISS", meaning: "A change of circumstances or fortune." },
    { word: "WHIMSY", meaning: "Playfully quaint or fanciful." },
    { word: "XYLOPH", meaning: "A musical instrument with wooden bars struck by mallets." },
    { word: "ABJECT", meaning: "Extremely bad, unpleasant, and degrading." },
    { word: "ABRUPT", meaning: "Sudden and unexpected." },
    { word: "BATTED", meaning: "To hit something with a bat." },
    { word: "CABAL", meaning: "A secret political clique or faction." },
    { word: "CAUSTIC", meaning: "Able to burn or corrode organic tissue." },
    { word: "CHIMERA", meaning: "A mythical creature or a fanciful illusion." },
    { word: "CONCUR", meaning: "To agree or have the same opinion." },
    { word: "DAUNT", meaning: "To make someone feel intimidated or apprehensive." },
    { word: "DIPLOM", meaning: "An official document conferring a degree or honor." },
    { word: "DURESS", meaning: "Threats, violence, or other actions used to coerce someone." },
    { word: "EDIFY", meaning: "To instruct or improve someone morally or intellectually." },
    { word: "ELOPE", meaning: "To run away secretly to get married." },
    { word: "ELITIST", meaning: "Favoring or advocating the interests of a select group." },
    { word: "ENIGMA", meaning: "A person or thing that is mysterious or difficult to understand." },
    { word: "FATHOM", meaning: "To understand a difficult problem after much thought." },
    { word: "GAUCHE", meaning: "Lacking ease or grace; unsophisticated and socially awkward." },
    { word: "GRAVEN", meaning: "To carve or engrave." },
    { word: "HEGIRA", meaning: "A journey, especially a long one." },
    { word: "JARGON", meaning: "Special words or expressions used by a particular profession." },
    { word: "JOSTLE", meaning: "To push, elbow, or bump against someone." },
    { word: "LAPSE", meaning: "A temporary failure of concentration." },
    { word: "MIRAGE", meaning: "An optical illusion caused by atmospheric conditions." },
    { word: "OBTUSE", meaning: "Annoyingly insensitive or slow to understand." },
    { word: "PALLOR", meaning: "An unhealthy pale appearance." },
    { word: "PLIGHT", meaning: "A dangerous, difficult, or otherwise unfortunate situation." },
    { word: "RANCOR", meaning: "Bitterness or resentfulness." },
    { word: "SABLE", meaning: "A black color or a type of mammal." },
    { word: "TENABLE", meaning: "Able to be maintained or defended against attack." },
    { word: "VIRILE", meaning: "Having strength, energy, and a strong sex drive." },
    { word: "WISTFUL", meaning: "Having or showing a feeling of vague or regretful longing." },
    { word: "ZEST", meaning: "Great enthusiasm and energy." },
    { word: "BLOOMY", meaning: "In full bloom; flourishing." },
    { word: "DAZZLE", meaning: "To blind temporarily with bright light." },
    { word: "FLEET", meaning: "Fast and nimble." },
    { word: "GAUNT", meaning: "Lean and haggard, especially because of suffering." },
    { word: "GRITTY", meaning: "Having a rough texture; showing courage." },
    { word: "HALCYON", meaning: "Denoting a period of time in the past that was idyllically happy." },
    { word: "JEJUNE", meaning: "Naive, simplistic, and superficial." },
    { word: "LUMEN", meaning: "The unit of measurement for visible light." },
    { word: "MOROSE", meaning: "Sullen and ill-tempered." },

  
  ];

  const [selectedWord, setSelectedWord] = useState("");
  const [originalWord, setOriginalWord] = useState("");
  const [inputFields, setInputFields] = useState([]); // For first attempt
  const [inputFields2, setInputFields2] = useState([]); // For second attempt
  const [draggedChar, setDraggedChar] = useState(null);
  const [attempts, setAttempts] = useState(2);
  const [usedIndexes, setUsedIndexes] = useState(new Set()); // Track used character indexes for current attempt
  const [isPhoneScreen, setIsPhoneScreen] = useState(false);


  useEffect(() => {
    resetGame();
    const handleResize = () => {
      const isPhoneScreen = window.innerWidth <= 568; // Adjust screen width for phones if needed
      setIsPhoneScreen(isPhoneScreen);
    };
  
    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once on component mount to set the initial state
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleConfetti = () => {
    confetti({
      particleCount: 250,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

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
            handleConfetti(); 
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
    <Animation>

<div className="wrap">
      <div className="all">
        <h3>Re-arrange in the correct order, you have just 2 chances</h3>

        <div className="word">
          {selectedWord.split("").map((char, index) => (
            <div
              key={index}
              data-aos="fade-down"
              data-aos-duration="2000"
              className="incorrect"
              draggable={!isPhoneScreen}
              onDragStart={() => handleDragStart(char, index)}
            >
              {char}
            </div>
          ))}
        </div>

        <div className="input-fields">
          <div className="div-input">
            {inputFields.map((value, index) => (
              <input readOnly
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
              <input readOnly
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

    </Animation>
  );
};

export default Wafle;