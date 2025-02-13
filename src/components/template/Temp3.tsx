"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Zap, BrainCircuit as Circuit, Power, Sparkles, XCircle } from "lucide-react";

const Logo = () => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-6 right-6 z-50">
    <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 bg-cyan-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/20">
      <Code className="w-6 h-6 text-cyan-400" />
      <span className="text-cyan-400 font-bold">Zenux</span>
    </motion.div>
  </motion.div>
);

type Mood = "superHappy" | "happy" | "excited" | "hopeful" | "nervous" | "question" | "sad1" | "sad2" | "sad3" | "sad4" | "celebration";

const EmotiveFace = ({ mood = "happy", noCount = 0 }: { mood?: Mood; noCount?: number }) => {
  const expressions = {
    superHappy: "🤖",
    happy: "👾",
    excited: "🚀",
    hopeful: "💫",
    nervous: "⚡",
    question: "❓",
    sad1: "💢",
    sad2: "⚠️",
    sad3: "🔥",
    sad4: "💀",
    celebration: "✨",
  };

  const getMoodEmoji = () => {
    if (mood === "celebration") return expressions.celebration;
    if (mood === "question") return expressions.question;
    if (noCount > 0) {
      if (noCount >= 10) return expressions.sad4;
      if (noCount >= 7) return expressions.sad3;
      if (noCount >= 4) return expressions.sad2;
    return expressions[mood as Mood];
    }
    return expressions[mood];
  };

  return (
    <motion.div
      initial={false}
      animate={
        noCount === 0
          ? {
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 0.8, 1],
            }
          : {
              rotate: [0, -20, 20, -20, 0],
              scale: [1, 0.8, 1.2, 0.8, 1],
            }
      }
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="text-6xl mb-6 select-none"
    >
      {getMoodEmoji()}
    </motion.div>
  );
};

const CyberCircuit = () => (
  <div className="fixed inset-0 -z-10">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: [0, 0.5, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 4,
          delay: i * 0.2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      >
        <Circuit
          className={`w-${Math.floor(Math.random() * 16 + 8)} h-${Math.floor(Math.random() * 16 + 8)} text-cyan-500/20`}
          style={{ transform: `rotate(${Math.random() * 360}deg)` }}
        />
      </motion.div>
    ))}
  </div>
);

const PowerGrid = () => (
  <div className="fixed inset-0 -z-20">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900" />
    <div className="grid grid-cols-8 h-full">
      {Array.from({ length: 64 }).map((_, i) => (
        <motion.div
          key={i}
          className="border-[0.5px] border-cyan-500/5"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.2, 0],
            backgroundColor: ["rgba(6, 182, 212, 0)", "rgba(6, 182, 212, 0.1)", "rgba(6, 182, 212, 0)"],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  </div>
);

const CelebrationPopup = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{
        scale: 1,
        rotate: 0,
        y: [0, -10, 0],
      }}
      exit={{ scale: 0, rotate: 20 }}
      transition={{
        type: "spring",
        damping: 12,
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
      }}
      className="bg-slate-900/90 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden border border-cyan-500/20"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: ["linear-gradient(45deg, #06b6d4, #3b82f6)", "linear-gradient(45deg, #3b82f6, #06b6d4)", "linear-gradient(45deg, #06b6d4, #3b82f6)"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="text-center relative">
        <EmotiveFace mood="celebration" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 8, delay: 0.2 }}
          className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden border border-cyan-500/20">
          <Image
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Z2E4OWF1NXJ3OWF4ZDR2bXE4M2RwdWx4YnB4ZWF6aHd6YmtnNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/108M7gCS1JSoO4/giphy.gif"
            alt="Celebration"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">System Activated! 🚀</h2>
          <p className="text-cyan-100 text-lg mb-6">Connection established successfully! 💫</p>
        </motion.div>

        <motion.div className="flex justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: 0.7 + i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-3xl"
            >
              {["⚡", "💫", "✨", "🚀", "💠"][i]}
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-cyan-500/20 transition-all"
          onClick={onClose}
        >
          Initialize System 🚀
        </motion.button>
    </motion.div>
      {/* </div> */}
  </motion.div>
);

export default function Temp3() {
  const [step, setStep] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const messages = [
    "System Initializing... 🚀",
    "Establishing Neural Link... 💫",
    "Quantum Sync in Progress... ⚡",
    "Connection Optimized... 💠",
    "Ready for Neural Handshake... 🌐",
    "Initiate Neural Link? 🔮",
  ];

  const moods: Mood[] = ["superHappy", "excited", "happy", "hopeful", "nervous", "question"];

  const yesButtonScales = [1, 1.1, 1.2, 1.3, 1.4];
  const noButtonMessages = [
    "Decline",
    "System Error",
    "Warning",
    "Critical",
    "Danger",
    "Override",
    "Malfunction",
    "System Failure",
    "Fatal Error",
    "Meltdown",
    "Emergency",
    "Alert",
    "Breach",
    "Overload",
  ];

  useEffect(() => {
    if (showEmojis) {
      const timer = setInterval(() => {
        setStep((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [showEmojis, messages.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  if (!showEmojis) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-4 overflow-hidden bg-slate-900" onMouseMove={handleMouseMove}>
        <PowerGrid />
        <CyberCircuit />
        <Logo />

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center relative">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
          >
            <Power className="w-32 h-32 text-cyan-400 mb-8 mx-auto" />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEmojis(true)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xl flex items-center gap-2 mx-auto shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            <Zap className="w-6 h-6" />
            Initialize System
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] overflow-hidden relative bg-slate-900" onMouseMove={handleMouseMove}>
      <PowerGrid />
      <CyberCircuit />
      <Logo />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -50 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <motion.div className="text-center" initial={{ y: 20, rotateX: 90 }} animate={{ y: 0, rotateX: 0 }} transition={{ type: "spring", stiffness: 200 }}>
            <EmotiveFace mood={moods[step]} noCount={noCount} />
            <motion.div className="perspective-text">
              {messages[step].split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    color: ["#06b6d4", "#3b82f6", "#06b6d4"],
                  }}
                  transition={{
                    delay: i * 0.05,
                    color: {
                      repeat: Infinity,
                      duration: 4,
                    },
                  }}
                  className="inline-block text-4xl md:text-6xl font-bold"
                  style={{
                    textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {step === messages.length - 1 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.5,
                }}
                className="flex gap-4 justify-center items-center mt-12"
              >
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: yesButtonScales[Math.min(noCount, yesButtonScales.length - 1)],
                  }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-2xl flex items-center gap-2 shadow-lg"
                  onClick={() => setShowCelebration(true)}
                >
                  <Zap className="w-6 h-6" />
                  Initialize
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setNoCount((prev) => prev + 1)}
                  className="px-8 py-4 rounded-full bg-slate-800/50 text-cyan-400 font-bold text-xl flex items-center gap-2 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                  {noButtonMessages[Math.min(noCount, noButtonMessages.length - 1)]}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>{showCelebration && <CelebrationPopup onClose={() => setShowCelebration(false)} />}</AnimatePresence>
    </div>
  );
}
