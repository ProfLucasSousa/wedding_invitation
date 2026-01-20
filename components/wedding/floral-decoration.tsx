"use client"

import { motion } from "framer-motion"

interface FloralDecorationProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  variant?: "detailed" | "simple"
}

export function FloralDecoration({ position, variant = "simple" }: FloralDecorationProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
  }

  const size = variant === "detailed" ? "w-48 h-48 md:w-56 md:h-56" : "w-32 h-32 md:w-40 md:h-40"

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} ${size} pointer-events-none z-0`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {variant === "detailed" ? (
        <svg
          viewBox="0 0 250 250"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main branch */}
          <path
            d="M5 240 Q40 200 60 150 Q80 100 100 70 Q120 40 150 20"
            stroke="#5A7A5A"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M60 150 Q75 130 90 115"
            stroke="#5A7A5A"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M100 70 Q115 55 130 45"
            stroke="#5A7A5A"
            strokeWidth="1.5"
            fill="none"
          />
          
          {/* Secondary branch */}
          <path
            d="M30 210 Q55 180 75 160"
            stroke="#6B8B6B"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M80 130 Q95 110 110 95"
            stroke="#6B8B6B"
            strokeWidth="1.5"
            fill="none"
          />
          
          {/* Large leaves */}
          <ellipse
            cx="25"
            cy="220"
            rx="20"
            ry="10"
            transform="rotate(-50 25 220)"
            fill="#5A7A5A"
            opacity="0.9"
          />
          <ellipse
            cx="40"
            cy="195"
            rx="18"
            ry="9"
            transform="rotate(-35 40 195)"
            fill="#6B8B6B"
            opacity="0.85"
          />
          <ellipse
            cx="55"
            cy="170"
            rx="16"
            ry="8"
            transform="rotate(-45 55 170)"
            fill="#5A7A5A"
            opacity="0.9"
          />
          <ellipse
            cx="68"
            cy="145"
            rx="17"
            ry="8"
            transform="rotate(-30 68 145)"
            fill="#7A9B7A"
            opacity="0.85"
          />
          <ellipse
            cx="82"
            cy="120"
            rx="15"
            ry="7"
            transform="rotate(-50 82 120)"
            fill="#5A7A5A"
            opacity="0.9"
          />
          <ellipse
            cx="95"
            cy="95"
            rx="14"
            ry="7"
            transform="rotate(-40 95 95)"
            fill="#6B8B6B"
            opacity="0.8"
          />
          <ellipse
            cx="110"
            cy="70"
            rx="13"
            ry="6"
            transform="rotate(-55 110 70)"
            fill="#5A7A5A"
            opacity="0.85"
          />
          <ellipse
            cx="125"
            cy="50"
            rx="12"
            ry="5"
            transform="rotate(-35 125 50)"
            fill="#7A9B7A"
            opacity="0.8"
          />
          <ellipse
            cx="145"
            cy="30"
            rx="10"
            ry="5"
            transform="rotate(-50 145 30)"
            fill="#5A7A5A"
            opacity="0.75"
          />
          
          {/* Medium leaves on other side */}
          <ellipse
            cx="15"
            cy="230"
            rx="12"
            ry="6"
            transform="rotate(-70 15 230)"
            fill="#7A9B7A"
            opacity="0.7"
          />
          <ellipse
            cx="48"
            cy="180"
            rx="11"
            ry="5"
            transform="rotate(15 48 180)"
            fill="#8BAB8B"
            opacity="0.65"
          />
          <ellipse
            cx="75"
            cy="135"
            rx="10"
            ry="5"
            transform="rotate(20 75 135)"
            fill="#7A9B7A"
            opacity="0.7"
          />
          <ellipse
            cx="100"
            cy="85"
            rx="9"
            ry="4"
            transform="rotate(25 100 85)"
            fill="#8BAB8B"
            opacity="0.6"
          />
          <ellipse
            cx="120"
            cy="60"
            rx="8"
            ry="4"
            transform="rotate(30 120 60)"
            fill="#7A9B7A"
            opacity="0.65"
          />
          
          {/* Small accent leaves */}
          <ellipse
            cx="35"
            cy="205"
            rx="8"
            ry="4"
            transform="rotate(-60 35 205)"
            fill="#8BAB8B"
            opacity="0.5"
          />
          <ellipse
            cx="62"
            cy="158"
            rx="7"
            ry="3"
            transform="rotate(-25 62 158)"
            fill="#9BBB9B"
            opacity="0.5"
          />
          <ellipse
            cx="88"
            cy="108"
            rx="7"
            ry="3"
            transform="rotate(-65 88 108)"
            fill="#8BAB8B"
            opacity="0.55"
          />
          <ellipse
            cx="115"
            cy="58"
            rx="6"
            ry="3"
            transform="rotate(-40 115 58)"
            fill="#9BBB9B"
            opacity="0.5"
          />
          
          {/* Tiny leaves */}
          <ellipse
            cx="50"
            cy="185"
            rx="5"
            ry="2.5"
            transform="rotate(-75 50 185)"
            fill="#AACBAA"
            opacity="0.4"
          />
          <ellipse
            cx="78"
            cy="128"
            rx="5"
            ry="2.5"
            transform="rotate(10 78 128)"
            fill="#AACBAA"
            opacity="0.45"
          />
          <ellipse
            cx="105"
            cy="78"
            rx="4"
            ry="2"
            transform="rotate(-30 105 78)"
            fill="#AACBAA"
            opacity="0.4"
          />
          
          {/* Decorative gold dots */}
          <circle cx="30" cy="210" r="2.5" fill="#C4A35A" opacity="0.6" />
          <circle cx="55" cy="165" r="2" fill="#C4A35A" opacity="0.5" />
          <circle cx="80" cy="115" r="2" fill="#C4A35A" opacity="0.55" />
          <circle cx="105" cy="65" r="2" fill="#C4A35A" opacity="0.5" />
          <circle cx="135" cy="35" r="1.5" fill="#C4A35A" opacity="0.45" />
          
          {/* Additional small gold accents */}
          <circle cx="45" cy="188" r="1.5" fill="#D4B87A" opacity="0.4" />
          <circle cx="70" cy="140" r="1.5" fill="#D4B87A" opacity="0.4" />
          <circle cx="95" cy="90" r="1.5" fill="#D4B87A" opacity="0.4" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main branch */}
          <path
            d="M10 180 Q50 150 70 100 Q90 50 120 30"
            stroke="#5A7A5A"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M70 100 Q80 80 95 70"
            stroke="#5A7A5A"
            strokeWidth="1.5"
            fill="none"
          />
          
          {/* Leaves */}
          <ellipse
            cx="30"
            cy="160"
            rx="15"
            ry="8"
            transform="rotate(-45 30 160)"
            fill="#5A7A5A"
            opacity="0.8"
          />
          <ellipse
            cx="45"
            cy="140"
            rx="12"
            ry="6"
            transform="rotate(-30 45 140)"
            fill="#6B8B6B"
            opacity="0.9"
          />
          <ellipse
            cx="55"
            cy="120"
            rx="14"
            ry="7"
            transform="rotate(-50 55 120)"
            fill="#5A7A5A"
            opacity="0.7"
          />
          <ellipse
            cx="70"
            cy="95"
            rx="10"
            ry="5"
            transform="rotate(-20 70 95)"
            fill="#7A9B7A"
            opacity="0.8"
          />
          <ellipse
            cx="85"
            cy="70"
            rx="13"
            ry="6"
            transform="rotate(-40 85 70)"
            fill="#5A7A5A"
            opacity="0.9"
          />
          <ellipse
            cx="100"
            cy="50"
            rx="11"
            ry="5"
            transform="rotate(-55 100 50)"
            fill="#6B8B6B"
            opacity="0.7"
          />
          <ellipse
            cx="115"
            cy="35"
            rx="9"
            ry="4"
            transform="rotate(-35 115 35)"
            fill="#5A7A5A"
            opacity="0.8"
          />
          
          {/* Small decorative dots */}
          <circle cx="40" cy="150" r="2" fill="#C4A35A" opacity="0.5" />
          <circle cx="75" cy="85" r="2" fill="#C4A35A" opacity="0.5" />
          <circle cx="105" cy="45" r="2" fill="#C4A35A" opacity="0.4" />
        </svg>
      )}
    </motion.div>
  )
}
