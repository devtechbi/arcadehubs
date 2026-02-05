import Header from "@/components/Header";
import MemoryGame from "@/components/games/MemoryGame";

const MemoryPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-black mb-4">
              <span className="text-neon-yellow neon-text-yellow">MEMORY MATCH</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Find all the matching pairs — Can you beat your best score?
            </p>
          </div>
          
          <MemoryGame />
        </div>
      </main>
    </div>
  );
};

export default MemoryPage;
