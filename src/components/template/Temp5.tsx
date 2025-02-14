"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Heart, Sparkles, CloudRain } from "lucide-react";

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
      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
      className={`flex items-center gap-2 bg-pink-200/20 backdrop-blur-sm ${prev ? "px-2 py-1 rounded-md" : "px-4 py-2 rounded-lg"} border border-pink-300/30`}
    >
      <Heart className={`${prev ? "w-4 h-4" : "w-6 h-6"} text-pink-400`} />
      <span className={`${prev ? "text-sm" : "text-base"} text-pink-400 font-bold`}>LoveBears</span>
    </motion.div>
  </motion.div>
);

type Mood = "happy" | "excited" | "hopeful" | "shy" | "question" | "sad1" | "sad2" | "sad3" | "sad4" | "celebration";

const EmotiveFace = ({ mood = "happy", noCount = 0, prev = false }: { mood?: Mood; noCount?: number; prev?: boolean }) => {
  const expressions = {
    happy: "😊",
    excited: "💖",
    hopeful: "🌟",
    shy: "🥹",
    question: "❓",
    sad1: "🌧️",
    sad2: "🍦",
    sad3: "😢",
    sad4: "💔",
    celebration: "🌈",
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
      animate={{
        scale: [1, 1.1, 1],
        y: noCount > 0 ? [0, -10, 10, 0] : [0, -20, 20, 0],
        rotate: noCount > 0 ? [0, 5, -5, 0] : [0, 10, -10, 0],
      }}
      transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity }}
      className={`${prev ? "text-4xl mb-4" : "text-6xl mb-6"} select-none`}
    >
      {getMoodEmoji()}
    </motion.div>
  );
};

const BackgroundMagic = () => (
  <div className="fixed inset-0 -z-50 overflow-hidden">
    {/* Animated gradient overlay */}
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          "linear-gradient(45deg, #fff0f0, #f8f0ff)",
          "linear-gradient(135deg, #f8f0ff, #fff0f5)",
          "linear-gradient(225deg, #fff0f5, #f0f8ff)",
          "linear-gradient(315deg, #f0f8ff, #fff0f0)",
        ],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />

    {/* Floating hearts */}
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={`heart-${i}`}
        className="absolute text-pink-200"
        style={{
          fontSize: `${Math.random() * 40 + 20}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 0.8, 0],
          opacity: [0, 0.4, 0],
          y: ["100vh", "-100vh"],
          rotate: [0, 360],
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

    {/* Magic particle grid */}
    <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-15">
      {Array.from({ length: 144 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="bg-pink-100 rounded-full h-full"
          animate={{
            scale: [0.5, 1, 0.5],
            backgroundColor: ["#ffd6e8", "#ffecf0", "#ffd6e8"],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>

    {/* Twinkling stars */}
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute text-yellow-100"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 10 + 5}px`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
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

    {/* Floating bubbles */}
    {Array.from({ length: 10 }).map((_, i) => (
      <motion.div
        key={`bubble-${i}`}
        className="absolute rounded-full border-2 border-pink-100"
        style={{
          width: `${Math.random() * 40 + 20}px`,
          height: `${Math.random() * 40 + 20}px`,
          left: `${Math.random() * 100}%`,
        }}
        initial={{ y: "100vh", opacity: 0 }}
        animate={{
          y: ["100vh", "-100vh"],
          opacity: [0, 0.3, 0],
          x: [0, Math.random() * 100 - 50],
          rotate: [0, 360],
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          delay: Math.random() * 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
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
    className="fixed inset-0 flex items-center justify-center z-50 bg-pink-100/90 backdrop-blur-sm"
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
      className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-xl relative overflow-hidden border-2 border-pink-200"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: ["linear-gradient(45deg, #ff9ff3, #f368e0)", "linear-gradient(45deg, #f368e0, #ff9ff3)"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="text-center relative">
        <EmotiveFace mood="celebration" prev={prev} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 360] }}
          transition={{ type: "spring", damping: 8, delay: 0.2 }}
          className={`${prev ? "w-32 h-32" : "w-48 h-48"} mx-auto mb-6 rounded-full overflow-hidden border-4 border-pink-200`}
        >
          <Image src={celebrationMediaUrl} alt="Celebration" layout="fill" objectFit="cover" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className={`${prev ? "text-2xl" : "text-3xl"} font-bold text-pink-500 mb-4`}>Love Activated! 🌈</h2>
          <p className={`text-pink-600 ${prev ? "text-sm" : "text-lg"} mb-6`}>{celebrationMessage}</p>
        </motion.div>

        <motion.div className="flex justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: 0.7 + i * 0.1,
                repeat: Infinity,
              }}
              className="text-3xl"
            >
              {["🍭", "🌸", "🎀", "💝", "🎠"][i]}
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.95 }}
          className={`${prev ? "px-4 py-2 text-sm" : "px-6 py-2 text-lg"} mt-6 bg-pink-400 text-white rounded-full font-semibold shadow-lg hover:bg-pink-500 transition-all`}
          onClick={() => (window.location.href = "https://myvalentine.live")}
        >
          Keep Loving 💖
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

export default function Temp4({ title, messages, moods, prev = false, noButtonMessages, celebrationMediaUrl, celebrationMessage }: Temp1Props) {
  const [step, setStep] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const yesButtonScales = [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3];

  useEffect(() => {
    if (showEmojis) {
      const timer = setInterval(() => {
        setStep((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [showEmojis, messages.length]);

  if (!showEmojis) {
    return (
      <div className={`${prev ? "min-h-[60dvh]" : "min-h-[100dvh]"} flex items-center justify-center p-4 overflow-hidden  `}>
        <BackgroundMagic />
        <Logo prev={prev} />

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className={`${prev ? "w-24 h-24" : "w-32 h-32"} text-pink-400 mb-8 mx-auto`} />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEmojis(true)}
            className={`${
              prev ? "px-6 py-2 text-lg" : "px-8 py-3 text-xl"
            } rounded-full bg-pink-400 text-white font-semibold flex items-center gap-2 mx-auto shadow-lg hover:bg-pink-500 transition-all`}
          >
            <Heart className={`${prev ? "w-5 h-5" : "w-6 h-6"} fill-white`} />
            {title}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${prev ? "h-[60dvh]" : "min-h-[100dvh]"} overflow-hidden relative  `}>
      <BackgroundMagic />
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
                    style={{ display: "inline-block", marginRight: "0.5em" }}
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
                          color: ["#ff9ff3", "#f368e0", "#ff9ff3"],
                          textShadow: "0 0 10px rgba(255,158,242,0.5)",
                        }}
                        transition={{
                          delay: (totalPreviousChars + charIndex) * 0.05,
                          color: { repeat: Infinity, duration: 3 },
                        }}
                        className={`inline-block font-bold ${prev ? "text-2xl" : "text-4xl md:text-6xl"}`}
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
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: yesButtonScales[Math.min(noCount, yesButtonScales.length - 1)] }}
                  className={`${
                    prev ? "px-6 py-3 text-xl" : "px-8 py-4 text-2xl"
                  } rounded-full bg-pink-400 text-white font-bold flex items-center gap-2 shadow-lg hover:bg-pink-500`}
                  onClick={() => setShowCelebration(true)}
                >
                  <Heart className={`${prev ? "w-5 h-5" : "w-6 h-6"} fill-white`} />
                  Yes Please!
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, x: [0, 10, -10, 0] }}
                  onClick={() => setNoCount((prev) => prev + 1)}
                  className={`${
                    prev ? "px-6 py-3 text-lg" : "px-8 py-4 text-xl"
                  } rounded-full bg-white/50 text-pink-600 font-bold flex items-center gap-2 border-2 border-pink-200 hover:border-pink-300`}
                >
                  <CloudRain className={`${prev ? "w-5 h-5" : "w-6 h-6"}`} />
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

