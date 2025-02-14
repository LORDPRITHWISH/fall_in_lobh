"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

import { Heart, Sparkles, CloudRain, RotateCw, Orbit, Puzzle, Rabbit, Rocket, Sprout } from "lucide-react";

interface Temp4Props {
  title: string;
  messages: string[];
  moods: string[];
  prev: boolean;
  noButtonMessages: string[];
  celebrationMediaUrl: string;
  celebrationMessage: string;
}

const QuantumOrbit = ({ active }: { active: boolean }) => {
  const radius = 120;
  const items = 8;

  return (
    <motion.div className="absolute pointer-events-none" animate={{ rotate: active ? 360 : 0 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
      {Array.from({ length: items }).map((_, i) => {
        const angle = (i * 360) / items;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ x, y }}
            animate={{
              scale: [0.8, 1.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {i % 2 === 0 ? <Rabbit className="text-pink-400" /> : <Sprout className="text-green-400" />}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const HolographicBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const baseSize = 400;
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, 
      rgba(255,192,203,0.15) 0%, 
      rgba(255,228,225,0.1) 30%, 
      rgba(255,248,240,0.05) 60%, 
      rgba(255,255,255,0) 100%)`
  );

  return (
    <motion.div className="fixed inset-0 -z-50" style={{ background }}>
      <div className="absolute inset-0 bg-[url('/graph-paper.svg')] opacity-10 mix-blend-overlay" />
      <motion.div
        className="absolute w-full h-full"
        animate={{
          background: [
            "conic-gradient(from 90deg, #ff9ff3, #f368e0, #ff9ff3)",
            "conic-gradient(from 180deg, #ff9ff3, #f368e0, #ff9ff3)",
            "conic-gradient(from 270deg, #ff9ff3, #f368e0, #ff9ff3)",
            "conic-gradient(from 360deg, #ff9ff3, #f368e0, #ff9ff3)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{ opacity: 0.1, mixBlendMode: "screen" }}
      />
    </motion.div>
  );
};

const FloatingIsland = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="relative bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-2xl border-2 border-white/50"
    initial={{ scale: 0, rotate: 15 }}
    animate={{
      scale: 1,
      rotate: 0,
      y: [-10, 10, -10],
    }}
    transition={{
      duration: 8,
      y: { repeat: Infinity, ease: "easeInOut" },
      type: "spring",
      stiffness: 100,
    }}
  >
    <div className="absolute -inset-4 rounded-[3rem] border-2 border-white/30 pointer-events-none" />
    <div className="absolute -inset-8 rounded-[3rem] border border-white/20 pointer-events-none" />
    {children}
  </motion.div>
);

const NeuralParticles = () => {
  const connections = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 -z-40 pointer-events-none">
      {connections.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 bg-pink-300/30"
          initial={{
            x1: Math.random() * window.innerWidth,
            y1: Math.random() * window.innerHeight,
            x2: Math.random() * window.innerWidth,
            y2: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

const CosmicLoveBackground = ({ mood }: { mood: string }) => {
  // Define mood-based colors and effects
  const moodConfig = {
    happy: {
      heartColor: "text-pink-400",
      starColor: "text-yellow-200",
      gradient: ["rgba(255, 182, 193, 0.1)", "rgba(255, 105, 180, 0.05)", "rgba(147, 112, 219, 0)"],
      particleColor: "#ffd6e8",
    },
    excited: {
      heartColor: "text-red-400",
      starColor: "text-orange-200",
      gradient: ["rgba(255, 99, 71, 0.1)", "rgba(255, 69, 0, 0.05)", "rgba(255, 140, 0, 0)"],
      particleColor: "#ffcccb",
    },
    hopeful: {
      heartColor: "text-purple-400",
      starColor: "text-blue-200",
      gradient: ["rgba(147, 112, 219, 0.1)", "rgba(138, 43, 226, 0.05)", "rgba(75, 0, 130, 0)"],
      particleColor: "#e6e6fa",
    },
    shy: {
      heartColor: "text-pink-300",
      starColor: "text-white",
      gradient: ["rgba(255, 192, 203, 0.1)", "rgba(255, 182, 193, 0.05)", "rgba(255, 105, 180, 0)"],
      particleColor: "#fff0f5",
    },
    celebration: {
      heartColor: "text-rainbow", // Custom class for rainbow effect
      starColor: "text-yellow-300",
      gradient: ["rgba(255, 0, 0, 0.1)", "rgba(255, 165, 0, 0.05)", "rgba(255, 255, 0, 0)"],
      particleColor: "#ffffff",
    },
    default: {
      heartColor: "text-pink-400",
      starColor: "text-yellow-200",
      gradient: ["rgba(255, 182, 193, 0.1)", "rgba(255, 105, 180, 0.05)", "rgba(147, 112, 219, 0)"],
      particleColor: "#ffd6e8",
    },
  };

  const currentMood = moodConfig[mood as keyof typeof moodConfig] || moodConfig.default;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Base Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(circle at center, ${currentMood.gradient[0]}, ${currentMood.gradient[1]}, ${currentMood.gradient[2]})`,
            `radial-gradient(circle at center, ${currentMood.gradient[1]}, ${currentMood.gradient[2]}, ${currentMood.gradient[0]})`,
            `radial-gradient(circle at center, ${currentMood.gradient[2]}, ${currentMood.gradient[0]}, ${currentMood.gradient[1]})`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Hearts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className={`absolute ${currentMood.heartColor}`}
          style={{
            fontSize: `${Math.random() * 40 + 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "-100%"],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart />
        </motion.div>
      ))}

      {/* Twinkling Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className={`absolute ${currentMood.starColor}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 10 + 5}px`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <Sparkles />
        </motion.div>
      ))}

      {/* Subtle Particle Grid */}
      <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-10">
        {Array.from({ length: 144 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="rounded-full"
            style={{ backgroundColor: currentMood.particleColor }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Temp4({ title, messages, moods, prev = false, noButtonMessages, celebrationMediaUrl, celebrationMessage }: Temp4Props) {
  const [step, setStep] = useState(-1);
  const [noCount, setNoCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [orbitActive, setOrbitActive] = useState(false);
  const currentMood = moods[step] || "happy";

  const nextStep = () => setStep((prev) => Math.min(prev + 1, messages.length - 1));

  // Auto-progression effect
  useEffect(() => {
    if (step >= 0 && step < messages.length - 1) {
      const timer = setTimeout(() => {
        nextStep();
      }, 4000); // Change message every 4 seconds

      return () => clearTimeout(timer);
    }
  }, [step, messages.length]);

  // Fix: Added proper height control
  const containerHeight = prev ? "h-[60dvh]" : "min-h-screen";

  return (
    <div className={`${containerHeight} relative overflow-hidden flex flex-col`}>
      <HolographicBackground />
      <CosmicLoveBackground mood={currentMood} />
      <NeuralParticles />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {step === -1 ? (
            <motion.div
              key={`message-${step}`}
              initial={{ opacity: 0, x: 20 }} // Reduced initial x movement
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} // Reduced exit x movement
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              className="text-center relative w-full max-w-2xl mx-auto"
            >
              <FloatingIsland>
                <div className="p-8 sm:p-12">
                  <button onMouseEnter={() => setOrbitActive(true)} onMouseLeave={() => setOrbitActive(false)} onClick={nextStep} className="relative z-10 w-full">
                    <QuantumOrbit active={orbitActive} />
                    <motion.div className="text-6xl mb-8" animate={{ rotate: orbitActive ? 360 : 0 }} transition={{ duration: 8, repeat: Infinity }}>
                      <Puzzle className="w-24 h-24 text-pink-500 mx-auto" />
                    </motion.div>
                    <motion.div
                      className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                      animate={{ scale: orbitActive ? 1.1 : 1 }}
                    >
                      {title}
                    </motion.div>
                  </button>
                </div>
              </FloatingIsland>
            </motion.div>
          ) : (
            <motion.div
              key={`message-${step}`} // Add key to force re-render
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Progress Map */}
              <div className="hidden md:flex flex-col justify-center items-end">
                <div className="space-y-4">
                  {messages.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 ${i <= step ? "bg-pink-500 border-pink-600" : "border-pink-200"}`}
                      animate={{
                        scale: i === step ? [1, 1.4] : 1,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Main Message */}
              <div className="col-span-2 md:col-span-1">
                <FloatingIsland>
                  <div className="p-8 sm:p-12">
                    <motion.div
                      className="text-5xl mb-8"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step % 2 === 0 ? <Rocket className="w-20 h-20 text-pink-500" /> : <Rabbit className="w-20 h-20 text-purple-500" />}
                    </motion.div>
                    <motion.h2 className="text-3xl font-bold text-pink-600 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      {messages[step]}
                    </motion.h2>
                    {step === messages.length - 1 && (
                      <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-6 py-3 sm:px-8 sm:py-4 bg-pink-500 text-white rounded-full font-bold"
                          onClick={() => setShowCelebration(true)}
                        >
                          Accept Mission
                        </motion.button>
                        <motion.button
                          whileHover={{ x: [0, 10, -10, 0] }}
                          className="px-6 py-3 sm:px-8 sm:py-4 bg-white border-2 border-pink-200 text-pink-600 rounded-full font-bold"
                          onClick={() => setNoCount((p) => p + 1)}
                        >
                          {noButtonMessages[noCount % noButtonMessages.length]}
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </FloatingIsland>
              </div>

              {/* Algorithm Panel */}
              <div className="hidden md:flex flex-col justify-center">
                <FloatingIsland>
                  <div className="p-6">
                    <div className="text-xl font-bold text-pink-600 mb-4">Love Algorithm</div>
                    <div className="space-y-2">
                      {["Compatibility", "Chemistry", "Commitment"].map((item, i) => (
                        <motion.div
                          key={item}
                          className="flex items-center gap-2 text-pink-500"
                          animate={{
                            x: [0, 10, 0],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            delay: i * 0.3,
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <RotateCw className="w-4 h-4" />
                          <span>
                            {item} {(step + 1) * 33}%
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FloatingIsland>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <FloatingIsland>
              <div className="p-8 sm:p-16 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  className="text-6xl mb-8"
                >
                  <Orbit className="w-24 h-24 text-pink-500 mx-auto" />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-8">Mission Accomplished!</h2>
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-pink-200">
                  <Image src={celebrationMediaUrl} alt="Celebration" layout="fill" objectFit="cover" priority />
                </div>
                <p className="text-lg sm:text-xl text-pink-600 mb-8">{celebrationMessage}</p>
                <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold" onClick={() => setShowCelebration(false)}>
                  Begin Adventure
                </motion.button>
              </div>
            </FloatingIsland>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
