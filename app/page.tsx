"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Motion Particles */}
        <div className="absolute w-full h-full">
          {mounted &&
            Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-[2px] rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 20,
                  ease: "linear",
                }}
                style={{
                  background: i % 2 === 0 ? "#f97316" : "#ffffff",
                }}
              />
            ))}
        </div>

        {/* Spider Webs */}
        <div className="absolute w-full h-full">
          <motion.div
            className="absolute w-[150px] h-[150px] top-[10%] right-[10%] opacity-20"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              background: `
                linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.2) 50%, transparent 51%),
                linear-gradient(30deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(60deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.2) 50%, transparent 51%),
                linear-gradient(120deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(150deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                radial-gradient(circle at center, transparent 15%, rgba(255,255,255,0.15) 16%, rgba(255,255,255,0.15) 17%, transparent 18%),
                radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.15) 31%, rgba(255,255,255,0.15) 32%, transparent 33%),
                radial-gradient(circle at center, transparent 45%, rgba(255,255,255,0.15) 46%, rgba(255,255,255,0.15) 47%, transparent 48%),
                radial-gradient(circle at center, transparent 60%, rgba(255,255,255,0.15) 61%, rgba(255,255,255,0.15) 62%, transparent 63%)
              `,
            }}
          >
            <motion.div
              className="absolute top-[20%] right-[30%] text-xs opacity-60"
              animate={{
                x: [0, 10, -5, 5, 0],
                y: [0, -5, 10, 5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🕷️
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute w-[150px] h-[150px] bottom-[20%] left-[5%] opacity-20"
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              background: `
                linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.2) 50%, transparent 51%),
                linear-gradient(30deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(60deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.2) 50%, transparent 51%),
                linear-gradient(120deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(150deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                radial-gradient(circle at center, transparent 15%, rgba(255,255,255,0.15) 16%, rgba(255,255,255,0.15) 17%, transparent 18%),
                radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.15) 31%, rgba(255,255,255,0.15) 32%, transparent 33%),
                radial-gradient(circle at center, transparent 45%, rgba(255,255,255,0.15) 46%, rgba(255,255,255,0.15) 47%, transparent 48%),
                radial-gradient(circle at center, transparent 60%, rgba(255,255,255,0.15) 61%, rgba(255,255,255,0.15) 62%, transparent 63%)
              `,
            }}
          >
            <motion.div
              className="absolute top-[20%] right-[30%] text-xs opacity-60"
              animate={{
                x: [0, 10, -5, 5, 0],
                y: [0, -5, 10, 5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 3,
              }}
            >
              🕷️
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute w-[150px] h-[150px] top-[50%] right-[5%] opacity-20"
            animate={{
              opacity: [0.2, 0.55, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{
              background: `
                linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.2) 50%, transparent 51%),
                linear-gradient(30deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(60deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.2) 50%, transparent 51%),
                linear-gradient(120deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                linear-gradient(150deg, transparent 49%, rgba(255,255,255,0.15) 50%, transparent 51%),
                radial-gradient(circle at center, transparent 15%, rgba(255,255,255,0.15) 16%, rgba(255,255,255,0.15) 17%, transparent 18%),
                radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.15) 31%, rgba(255,255,255,0.15) 32%, transparent 33%),
                radial-gradient(circle at center, transparent 45%, rgba(255,255,255,0.15) 46%, rgba(255,255,255,0.15) 47%, transparent 48%),
                radial-gradient(circle at center, transparent 60%, rgba(255,255,255,0.15) 61%, rgba(255,255,255,0.15) 62%, transparent 63%)
              `,
            }}
          >
            <motion.div
              className="absolute top-[20%] right-[30%] text-xs opacity-60"
              animate={{
                x: [0, 10, -5, 5, 0],
                y: [0, -5, 10, 5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 7,
              }}
            >
              🕷️
            </motion.div>
          </motion.div>
        </div>
      </div>
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 md:px-6 relative">
          {/* Lighter, More Subtle Orange Gradient Overlay at Top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 w-full h-1/3 z-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(253,186,116,0.08) 0%, rgba(253,186,116,0.05) 30%, rgba(254,215,170,0.03) 60%, rgba(255,255,255,0) 100%)",
              mixBlendMode: "lighten",
            }}
          />
          <div className="container max-w-6xl mx-auto text-center relative z-10">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-white">Find the Best</span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Halloween
                </span>{" "}
                <br />
                Trick-or-Treat <span className="text-white">Spots</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover the best trick-or-treat locations, create optimal
                routes, and make this Halloween unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Link href="/explore" passHref legacyBehavior>
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
                  >
                    Start Planning <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://github.com/gloriaduan/Trek-or-Treat">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-black hover:bg-white hover:text-gray-900 px-8 py-3 text-lg"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-32 h-px bg-gray-400 opacity-60 mx-auto my-8 rounded-full" />

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 md:px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Get started in three simple steps and transform your Halloween
                experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-medium">1</span>
                </div>
                <h3 className="text-xl font-medium mb-4 text-white">
                  Explore Locations
                </h3>
                <p className="text-gray-300">
                  Browse the interactive map to discover trick-or-treat
                  locations in your neighborhood, complete with ratings and
                  photos.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-medium">2</span>
                </div>
                <h3 className="text-xl font-medium mb-4 text-white">
                  Create Your Route
                </h3>
                <p className="text-gray-300">
                  Select your favorite locations and let MapBox create the most
                  efficient route for maximum candy collection.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-medium">3</span>
                </div>
                <h3 className="text-xl font-medium mb-4 text-white">
                  Save & Go
                </h3>
                <p className="text-gray-300">
                  Save your route and use it on Halloween night for a perfectly
                  planned trick-or-treat adventure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 relative overflow-hidden">
          {/* Even More Subtle Lighter Orange Gradient Overlay as Hero, Left to Right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 w-full h-full z-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(253,186,116,0.045) 0%, rgba(253,186,116,0.025) 30%, rgba(254,215,170,0.012) 60%, rgba(255,255,255,0) 100%)",
              mixBlendMode: "lighten",
            }}
          />
          <div className="container max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Plan the{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Ultimate Halloween
              </span>
              ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore" passHref legacyBehavior>
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
                >
                  Explore Now <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-8 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center mb-4 md:mb-0 gap-2">
              {/* <MapPin className="h-6 w-6 text-orange-500" /> */}
              <Image
                src="/trek-or-treat-logo.png"
                width={32}
                height={32}
                alt="Trek or Treat Logo"
                className="w-8"
              />
              <span className="ml-2 text-xl font-bold">Trek or Treat</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Trek or Treat. Made with 🎃 for
              Halloween enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
