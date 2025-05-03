export default function Grid({ columns: c, rows: r, guesses, currentGuess }) {
  const columns = [];
  const rows = [];

  for (let i = 0; i < c; i++) columns.push(0);
  for (let i = 0; i < r; i++) rows.push(0);

  return (
    <div className="grid">
      {rows.map((_, currentRow) => (
        <div key={currentRow}>
          {columns.map((_, currentCol) => (
            <span key={currentCol}>
              {guesses.length === currentRow
                ? currentGuess[currentCol]
                : guesses.length > currentRow
                ? guesses[currentRow][currentCol]
                : ""}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
