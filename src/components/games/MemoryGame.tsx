import { useState, useEffect } from "react";
import { RotateCcw, Trophy } from "lucide-react";

const EMOJIS = ["🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "🎸", "🎺"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matches === EMOJIS.length && matches > 0) {
      setIsComplete(true);
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
      }
    }
  }, [matches, moves, bestScore]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.emoji === secondCard.emoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatches((m) => m + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length >= 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, index]);
    if (flippedCards.length === 1) {
      setMoves((m) => m + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Stats */}
      <div className="flex gap-8 text-center">
        <div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">Moves</p>
          <p className="text-3xl font-display font-bold text-neon-cyan neon-text">{moves}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">Matches</p>
          <p className="text-3xl font-display font-bold text-neon-magenta neon-text-magenta">
            {matches}/{EMOJIS.length}
          </p>
        </div>
        {bestScore !== null && (
          <div>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Best</p>
            <p className="text-3xl font-display font-bold text-neon-yellow neon-text-yellow">{bestScore}</p>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-3 p-4 bg-card rounded-2xl border border-border">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            disabled={card.isFlipped || card.isMatched}
            className={`w-20 h-20 md:w-24 md:h-24 rounded-xl text-4xl font-bold transition-all duration-300 transform
              ${card.isFlipped || card.isMatched
                ? "bg-muted rotate-0"
                : "bg-gradient-to-br from-primary/30 to-secondary/30 hover:scale-105 cursor-pointer"
              }
              ${card.isMatched ? "ring-2 ring-neon-green shadow-[0_0_15px_hsl(150_100%_50%/0.5)]" : ""}
            `}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {card.isFlipped || card.isMatched ? (
              card.emoji
            ) : (
              <span className="text-2xl text-muted-foreground">?</span>
            )}
          </button>
        ))}
      </div>

      {/* Win message */}
      {isComplete && (
        <div className="text-center animate-float">
          <div className="flex items-center justify-center gap-2 text-neon-yellow mb-2">
            <Trophy className="w-8 h-8" />
            <h3 className="text-2xl font-display font-bold neon-text-yellow">
              Congratulations!
            </h3>
          </div>
          <p className="text-muted-foreground">
            You completed the game in {moves} moves!
          </p>
        </div>
      )}

      {/* Reset Button */}
      <button onClick={initializeGame} className="arcade-button flex items-center gap-2">
        <RotateCcw className="w-5 h-5" />
        New Game
      </button>
    </div>
  );
};

export default MemoryGame;
