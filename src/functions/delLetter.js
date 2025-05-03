export default function delLetter(currentGuess) {
  const letters = [...currentGuess];
  letters.pop();
  return letters;
}
