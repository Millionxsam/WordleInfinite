import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import axios from "axios";
import addLetter from "./functions/addLetter";
import guessWord from "./functions/guessWord";
import delLetter from "./functions/delLetter";
import Swal from "sweetalert2";

function App() {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);

  useEffect(() => {
    axios
      .get("https://random-word-api.vercel.app/api?words=1&length=5")
      .then(({ data }) => setTargetWord(data[0]));
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        if (guesses.length >= 5) return;
        if (currentGuess.length !== 5) return;
        guessWord(currentGuess, targetWord);

        let g = [...guesses];
        g.push(currentGuess);
        setGuesses(g);
        setCurrentGuess([]);

        setTimeout(() => {
          if (g[g.length - 1].join("").toLowerCase() === targetWord) {
            Swal.fire({
              title: "You guessed the word!",
              icon: "success",
              text: `You guessed the word "${targetWord}" in ${g.length} tries`,
            }).then(console.log);
          } else if (g.length >= 5)
            Swal.fire({
              icon: "error",
              title: `The word was "${targetWord}"`,
              text: "You couldn't guess the word after 5 tries",
            });
        }, 1000);
      } else if (e.key === "Backspace")
        setCurrentGuess(delLetter(currentGuess));
      else setCurrentGuess(addLetter(e.key, currentGuess));
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, guesses, targetWord]);

  return (
    <div className="appContainer">
      <h1>Wordle Infinite</h1>
      <p>{targetWord}</p>
      <Grid
        columns={5}
        rows={5}
        guesses={guesses}
        currentGuess={currentGuess}
      />
      <Keyboard />
    </div>
  );
}

export default App;
