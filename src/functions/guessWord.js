export default function guessWord(guess, targetWord) {
  const currentRow = document.querySelector(".grid > div:not(.complete)");
  currentRow.classList.add("complete");

  guess.forEach((letter, index) => {
    if (
      targetWord
        .split("")
        .find((l, i) => i === index && l === letter.toLowerCase())
    ) {
      currentRow.querySelectorAll("span")[index].classList.add("green");
    } else if (targetWord.includes(letter.toLowerCase())) {
      currentRow.querySelectorAll("span")[index].classList.add("yellow");
    } else {
      currentRow.querySelectorAll("span")[index].classList.add("gray");
    }
  });
}
