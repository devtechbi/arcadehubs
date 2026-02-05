import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: "cyan" | "magenta" | "yellow";
}

const colorClasses = {
  cyan: {
    border: "hover:border-neon-cyan",
    glow: "group-hover:shadow-[0_0_30px_hsl(180_100%_50%/0.5)]",
    icon: "text-neon-cyan",
    badge: "bg-neon-cyan/20 text-neon-cyan",
  },
  magenta: {
    border: "hover:border-neon-magenta",
    glow: "group-hover:shadow-[0_0_30px_hsl(300_100%_60%/0.5)]",
    icon: "text-neon-magenta",
    badge: "bg-neon-magenta/20 text-neon-magenta",
  },
  yellow: {
    border: "hover:border-neon-yellow",
    glow: "group-hover:shadow-[0_0_30px_hsl(45_100%_55%/0.5)]",
    icon: "text-neon-yellow",
    badge: "bg-neon-yellow/20 text-neon-yellow",
  },
};

const GameCard = ({ title, description, icon: Icon, path, color }: GameCardProps) => {
  const classes = colorClasses[color];

  return (
    <Link to={path} className="group block">
      <div
        className={`relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 ${classes.border} ${classes.glow} hover:-translate-y-2`}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-transparent via-transparent to-primary/5" />
        
        <div className="relative z-10">
          <div className={`inline-flex p-4 rounded-xl ${classes.badge} mb-6`}>
            <Icon className={`w-8 h-8 ${classes.icon}`} />
          </div>
          
          <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
          
          <div className={`mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider ${classes.icon}`}>
            Play Now
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
