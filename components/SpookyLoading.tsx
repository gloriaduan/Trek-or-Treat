"use client";

import { Ghost } from "lucide-react";
import { useEffect, useState } from "react";

export default function HalloweenLoading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Three floating ghosts */}
        <div className="flex justify-center space-x-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-bounce"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: "1.5s",
              }}
            >
              <Ghost className="w-12 h-12 text-white" />
            </div>
          ))}
        </div>

        {/* Simple loading text */}
        <p className="text-white text-xl">Loading{dots}</p>
      </div>
    </div>
  );
}
