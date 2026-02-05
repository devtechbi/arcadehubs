import { Grid3X3, Smartphone, Brain, Sparkles } from "lucide-react";
import GameCard from "@/components/GameCard";
import Header from "@/components/Header";

const games = [
  {
    title: "Tic Tac Toe",
    description: "Classic X's and O's. Challenge a friend in this timeless strategy game.",
    icon: Grid3X3,
    path: "/tictactoe",
    color: "cyan" as const,
  },
  {
    title: "Snake",
    description: "Guide the snake, eat the food, grow longer. Don't hit the walls!",
    icon: Smartphone,
    path: "/snake",
    color: "magenta" as const,
  },
  {
    title: "Memory Match",
    description: "Test your memory! Find all matching pairs in the fewest moves.",
    icon: Brain,
    path: "/memory",
    color: "yellow" as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-display uppercase tracking-wider text-primary">
              Free Browser Games
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight">
            <span className="text-foreground">Welcome to</span>
            <br />
            <span className="bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow bg-clip-text text-transparent">
              ARCADE HUB
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Your ultimate destination for classic browser games. 
            No downloads, no ads, just pure gaming fun.
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">
            Choose Your Game
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {games.map((game) => (
              <GameCard key={game.path} {...game} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="font-display text-sm">
            Made with 💜 for gamers everywhere
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
