import { useState, useEffect, useCallback, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const directionRef = useRef(direction);
  directionRef.current = direction;

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
  };

  const startGame = () => {
    if (gameOver) resetGame();
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      const currentDir = directionRef.current;
      switch (e.key) {
        case "ArrowUp":
          if (currentDir !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (currentDir !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (currentDir !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (currentDir !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const currentDir = directionRef.current;

        switch (currentDir) {
          case "UP": head.y -= 1; break;
          case "DOWN": head.y += 1; break;
          case "LEFT": head.x -= 1; break;
          case "RIGHT": head.x += 1; break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          setHighScore((prev) => Math.max(prev, score));
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          setIsPlaying(false);
          setHighScore((prev) => Math.max(prev, score));
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, food, generateFood, score]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Score Display */}
      <div className="flex gap-8 text-center">
        <div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">Score</p>
          <p className="text-3xl font-display font-bold text-neon-cyan neon-text">{score}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">High Score</p>
          <p className="text-3xl font-display font-bold text-neon-yellow neon-text-yellow">{highScore}</p>
        </div>
      </div>

      {/* Game Board */}
      <div
        className="relative bg-card rounded-xl border border-border overflow-hidden"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: GRID_SIZE }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-foreground"
              style={{ top: i * CELL_SIZE }}
            />
          ))}
          {Array.from({ length: GRID_SIZE }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-foreground"
              style={{ left: i * CELL_SIZE }}
            />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute rounded-sm transition-all duration-75 ${
              index === 0 ? "bg-neon-cyan shadow-[0_0_10px_hsl(180_100%_50%/0.8)]" : "bg-neon-cyan/70"
            }`}
            style={{
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-neon-magenta rounded-full animate-pulse shadow-[0_0_15px_hsl(300_100%_60%/0.8)]"
          style={{
            left: food.x * CELL_SIZE + 2,
            top: food.y * CELL_SIZE + 2,
            width: CELL_SIZE - 4,
            height: CELL_SIZE - 4,
          }}
        />

        {/* Overlay */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              {gameOver && (
                <h3 className="text-2xl font-display font-bold text-neon-magenta mb-4">
                  Game Over!
                </h3>
              )}
              <button onClick={startGame} className="arcade-button flex items-center gap-2">
                {gameOver ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {gameOver ? "Play Again" : "Start Game"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <p className="text-muted-foreground text-sm">
        Use <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">↑</kbd>{" "}
        <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">↓</kbd>{" "}
        <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">←</kbd>{" "}
        <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">→</kbd> to move
      </p>
    </div>
  );
};

export default SnakeGame;
