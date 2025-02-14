"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Check, Clipboard } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Preview = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [copyText, setCopyText] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url!);
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center  p-6">
      {showConfetti && <Confetti width={width} height={height} />}

      <Card className="bg-blue/20 backdrop-blur-sm rounded-lg p-6 max-w-xl w-full text-center shadow-2xl">
        <CardTitle>
          <h1 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h1>
        </CardTitle>
        <CardContent>
          <p className="text-lg mb-6">Your website is live! Share it with the world:</p>
          <div className="flex justify-center items-center space-x-3">
            <div className="bg-blue/30  rounded-lg p-4 mb-6">
              <p className="text-xl font-mono break-all">{url}</p>
            </div>
            <Button size="lg" variant="ghost" className={`p-4 ${copyText ? "bg-green-500" : "bg-blue/30"} rounded-lg self-center mb-4`} onClick={copyToClipboard}>
              {copyText ? <Check className="text-4xl" /> : <Clipboard className="text-4xl" />}
            </Button>
          </div>

          <a
            href={url || "blue"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
          >
            Visit Your Website
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

const page = () => {
  return (
    <Suspense>
      <Preview />
    </Suspense>
  );
};

export default page;
