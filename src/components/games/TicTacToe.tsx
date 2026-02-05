import { useState, useCallback } from "react";
import { RotateCcw } from "lucide-react";

type Player = "X" | "O" | null;
type Board = Player[];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const checkWinner = useCallback((newBoard: Board): Player => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinningLine(combo);
        return newBoard[a];
      }
    }
    return null;
  }, []);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
  };

  const isDraw = !winner && board.every((cell) => cell !== null);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Status */}
      <div className="text-center">
        {winner ? (
          <h2 className="text-3xl font-display font-bold text-neon-cyan neon-text">
            Player {winner} Wins!
          </h2>
        ) : isDraw ? (
          <h2 className="text-3xl font-display font-bold text-neon-yellow neon-text-yellow">
            It's a Draw!
          </h2>
        ) : (
          <h2 className="text-2xl font-display">
            Player{" "}
            <span className={currentPlayer === "X" ? "text-neon-cyan neon-text" : "text-neon-magenta neon-text-magenta"}>
              {currentPlayer}
            </span>
            's Turn
          </h2>
        )}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-card rounded-2xl border border-border">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
            className={`w-24 h-24 md:w-28 md:h-28 rounded-xl font-display text-5xl font-bold transition-all duration-200
              ${!cell && !winner ? "hover:bg-muted cursor-pointer" : "cursor-default"}
              ${winningLine?.includes(index) ? "bg-primary/20 animate-glow-pulse" : "bg-muted/50"}
              ${cell === "X" ? "text-neon-cyan" : "text-neon-magenta"}
            `}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="arcade-button flex items-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        New Game
      </button>
    </div>
  );
};

export default TicTacToe;
