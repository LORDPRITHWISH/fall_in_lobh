"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Zap, BrainCircuit as Circuit, Power, Sparkles, XCircle } from "lucide-react";

interface Temp1Props {
  title: string;
  messages: string[];
  moods: string[];
  prev: boolean;
  noButtonMessages: string[];
  celebrationMediaUrl: string;
  celebrationMessage: string;
}

const Logo = ({ prev = false }: { prev: boolean }) => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`fixed z-50 ${prev ? "top-4 right-4" : "top-6 right-6"}`}>
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`flex items-center gap-2 bg-cyan-500/10 backdrop-blur-sm ${prev ? "px-2 py-1 rounded-md" : "px-4 py-2 rounded-lg"} border border-cyan-500/20`}
    >
      <Code className={`${prev ? "w-4 h-4" : "w-6 h-6"} text-cyan-400`} />
      <span className={`${prev ? "text-sm" : "text-base"} text-cyan-400 font-bold`}>Zenux</span>
    </motion.div>
  </motion.div>
);

type Mood = "superHappy" | "happy" | "excited" | "hopeful" | "nervous" | "question" | "sad1" | "sad2" | "sad3" | "sad4" | "celebration";

const EmotiveFace = ({ mood = "happy", noCount = 0, prev = false }: { mood?: Mood; noCount?: number; prev?: boolean }) => {
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
      return expressions.sad1;
    }
    return expressions[mood];
  };

  return (
    <motion.div
      initial={false}
      animate={noCount === 0 ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 0.8, 1] } : { rotate: [0, -20, 20, -20, 0], scale: [1, 0.8, 1.2, 0.8, 1] }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`${prev ? "text-4xl mb-4" : "text-6xl mb-6"} select-none`}
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

const CelebrationPopup = ({
  onClose,
  celebrationMediaUrl,
  celebrationMessage,
  prev,
}: {
  onClose: () => void;
  celebrationMediaUrl: string;
  celebrationMessage: string;
  prev: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0, y: [0, -10, 0] }}
      exit={{ scale: 0, rotate: 20 }}
      transition={{
        type: "spring",
        damping: 12,
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      }}
      className="bg-slate-900/90 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden border border-cyan-500/20"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: ["linear-gradient(45deg, blue06b6d4, blue3b82f6)", "linear-gradient(45deg, blue3b82f6, blue06b6d4)"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="text-center relative">
        <EmotiveFace mood="celebration" prev={prev} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 8, delay: 0.2 }}
          className={`${prev ? "w-32 h-32" : "w-48 h-48"} mx-auto mb-6 rounded-2xl overflow-hidden border border-cyan-500/20`}
        >
          <Image src={celebrationMediaUrl} alt="Celebration" layout="fill" objectFit="cover" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className={`${prev ? "text-2xl" : "text-3xl"} font-bold text-cyan-400 mb-4`}>System Activated! 🚀</h2>
          <p className={`text-cyan-100 ${prev ? "text-sm" : "text-lg"} mb-6`}>{celebrationMessage}</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            prev ? "px-4 py-2 text-sm" : "px-6 py-2 text-lg"
          } mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-blue rounded-full font-semibold shadow-lg hover:shadow-cyan-500/20 transition-all`}
          onClick={() => (window.location.href = "https://myvalentine.live")}
        >
          Continue Celebrating 🚀
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

export default function Temp3({ title, messages, moods, prev = false, noButtonMessages, celebrationMediaUrl, celebrationMessage }: Temp1Props) {
  const [step, setStep] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const yesButtonScales = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2];

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
      <div className={`${prev ? "min-h-[60dvh]" : "min-h-[100dvh]"} flex items-center justify-center p-4 overflow-hidden bg-slate-900`}>
        <PowerGrid />
        <CyberCircuit />
        <Logo prev={prev} />

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center relative">
          <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
            <Power className={`${prev ? "w-24 h-24" : "w-32 h-32"} text-cyan-400 mb-8 mx-auto`} />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEmojis(true)}
            className={`${
              prev ? "px-6 py-2 text-lg" : "px-8 py-3 text-xl"
            } rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-blue font-semibold flex items-center gap-2 mx-auto shadow-lg hover:shadow-cyan-500/20 transition-all`}
          >
            <Zap className={`${prev ? "w-5 h-5" : "w-6 h-6"}`} />
            {title}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${prev ? "h-[60dvh]" : "min-h-[100dvh]"} overflow-hidden relative bg-slate-900`}>
      <PowerGrid />
      <CyberCircuit />
      <Logo prev={prev} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <motion.div className="text-center" initial={{ y: 20, rotateX: 90 }} animate={{ y: 0, rotateX: 0 }} transition={{ type: "spring", stiffness: 200 }}>
            <EmotiveFace mood={moods[step] as Mood} noCount={noCount} prev={prev} />
            <motion.div className="perspective-text">
              {messages[step].split(" ").map((word, wordIndex) => {
                const previousWords = messages[step].split(" ").slice(0, wordIndex);
                const totalPreviousChars = previousWords.join("").length;

                return (
                  <motion.span
                    key={wordIndex}
                    style={{ display: "inline-block", marginRight: "0.75em" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: totalPreviousChars * 0.05, duration: 0.5 }}
                  >
                    {Array.from(word).map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          color: ["blue06b6d4", "blue3b82f6", "blue06b6d4"],
                        }}
                        transition={{
                          delay: (totalPreviousChars + charIndex) * 0.05,
                          color: { repeat: Infinity, duration: 4 },
                        }}
                        className={`inline-block font-bold ${prev ? "text-2xl" : "text-4xl md:text-6xl"}`}
                        style={{ textShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                );
              })}
            </motion.div>

            {step === messages.length - 1 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
                className="flex gap-4 justify-center items-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: yesButtonScales[Math.min(noCount, yesButtonScales.length - 1)] }}
                  className={`${
                    prev ? "px-6 py-3 text-xl" : "px-8 py-4 text-2xl"
                  } rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-blue font-bold flex items-center gap-2 shadow-lg`}
                  onClick={() => setShowCelebration(true)}
                >
                  <Zap className={`${prev ? "w-5 h-5" : "w-6 h-6"}`} />
                  Initialize
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setNoCount((prev) => prev + 1)}
                  className={`${
                    prev ? "px-6 py-3 text-lg" : "px-8 py-4 text-xl"
                  } rounded-full bg-slate-800/50 text-cyan-400 font-bold flex items-center gap-2 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors`}
                >
                  <XCircle className={`${prev ? "w-5 h-5" : "w-6 h-6"}`} />
                  {noButtonMessages[Math.min(noCount, noButtonMessages.length - 1)]}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showCelebration && (
          <CelebrationPopup
            onClose={() => {
              setShowCelebration(false);
              setStep(0);
              setNoCount(0);
            }}
            celebrationMediaUrl={celebrationMediaUrl}
            celebrationMessage={celebrationMessage}
            prev={prev}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
