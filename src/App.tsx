import Aurora from '@/components/Aurora';
import BlurText from '@/components/BlurText';

/**
 * Placeholder shell — exists to prove the React Bits pipeline renders.
 * The real design replaces all of this.
 */
export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Aurora colorStops={['#00ff88', '#0a0a0a', '#00ff88']} amplitude={1.0} blend={0.5} />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <BlurText
          text="RIZ Games"
          delay={120}
          animateBy="letters"
          className="font-gaming text-6xl font-bold text-neon-green md:text-8xl"
        />
        <BlurText
          text="Small studio, big experience."
          delay={40}
          animateBy="words"
          className="text-xl text-white/70 md:text-2xl"
        />
      </div>
    </main>
  );
}
