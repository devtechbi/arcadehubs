import Header from "@/components/Header";
import TicTacToe from "@/components/games/TicTacToe";

const TicTacToePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-black mb-4">
              <span className="text-neon-cyan neon-text">TIC TAC TOE</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Classic strategy game — Get three in a row to win!
            </p>
          </div>
          
          <TicTacToe />
        </div>
      </main>
    </div>
  );
};

export default TicTacToePage;
