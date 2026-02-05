import Header from "@/components/Header";
import SnakeGame from "@/components/games/SnakeGame";

const SnakePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-black mb-4">
              <span className="text-neon-magenta neon-text-magenta">SNAKE</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Eat, grow, survive — How long can you last?
            </p>
          </div>
          
          <SnakeGame />
        </div>
      </main>
    </div>
  );
};

export default SnakePage;
