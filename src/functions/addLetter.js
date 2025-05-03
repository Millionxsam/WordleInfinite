export default function addLetter(letter, currentGuess) {
  const letters = [...currentGuess];
  let newLetter = letter.toUpperCase();

  if (letters.length >= 5) return letters;
  if (letter.trim().length !== 1) return letters;

  letters.push(newLetter);
  return letters;
}
