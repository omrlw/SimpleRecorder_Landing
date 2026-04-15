'use client';

import type { CSSProperties } from 'react';
import { motion } from 'motion/react';

type QuestionsMarkProps = {
  width?: number;
  className?: string;
  style?: CSSProperties;
};

const primaryPath =
  'M106.73 2.99231C83.335 19.3685 60.1633 137.567 60.1633 137.678L51.3625 125.424C35.9889 104.146 26.7425 92.7816 19.8356 88.4369C7.46987 80.5273 7.35847 91.4459 8.02689 100.469C9.80933 125.089 44.5669 220.896 59.4948 212.986C62.9483 211.204 61.9457 207.639 52.3651 186.138C42.3389 163.635 27.2995 122.526 27.2995 117.402C27.2995 116.288 38.6626 132.776 46.4608 145.476C60.3861 167.868 71.0807 161.184 71.4149 153.274C71.8605 141.354 77.8763 106.931 83.0008 86.9898C84.8946 79.4144 88.1253 68.6084 90.0191 62.9268C91.1332 59.5848 94.4752 58.4707 94.0296 60.6988C91.2446 75.1811 89.9077 82.8679 88.9051 88.7722C86.2315 105.037 98.8199 101.36 99.934 94.007C101.048 86.9887 120.432 58.6935 135.137 44.5454C140.373 39.5323 143.047 41.7593 133.578 54.4591C119.986 72.7291 113.525 84.5389 109.292 91.4459C100.714 105.26 111.854 105.37 121.992 92.893C130.347 82.644 158.197 54.5717 167.778 47.1077C171.566 44.0998 172.791 46.8849 170.786 49.2243C167.332 53.4576 158.42 61.2547 150.288 70.6125C137.588 85.3176 132.018 95.902 127.785 101.027C116.533 114.729 129.79 112.947 144.161 100.247C158.197 87.6582 164.436 82.644 178.473 72.8406C192.398 63.1485 209.443 53.012 210.222 53.7918C212.673 56.1313 157.418 116.623 149.842 119.854C147.28 120.968 145.943 122.416 145.498 124.532C140.707 147.37 131.015 170.542 117.09 192.265C97.8173 222.344 106.73 226.466 127.339 204.185C141.71 188.7 156.972 156.504 159.98 135.783C160.76 130.77 161.874 129.21 175.799 114.616C218.132 70.2783 232.503 49.7814 224.928 45.7709C217.575 41.8718 205.544 45.8823 178.696 61.8128C169.561 67.2715 169.783 66.7145 184.266 50.1156C214.344 15.5808 194.96 16.9165 178.696 28.8366C166.218 37.9716 165.884 38.1955 154.744 45.9937C171.454 21.9307 177.359 13.6869 171.009 11.2361C165.884 9.34225 161.094 10.0096 156.972 13.2402C145.943 21.7068 126.559 38.9742 117.424 48.332C111.743 54.1249 107.175 58.6935 107.175 58.4707C107.175 58.2479 109.626 47.8875 112.745 35.4104C120.878 3.99493 118.984 -5.58557 106.73 2.99231Z';

const bottomFillOne = 'M117.736 209.869H111.735L107.235 212.869C107.235 212.869 85.922 276.678 74.2354 331.578H100.195L117.736 209.869Z';
const bottomFillTwo = 'M50.2356 206.369L0.735352 331.578H43.0048C52.0008 292.699 49.5287 258.303 60.7354 209.869L50.2356 206.369Z';
const strokePath = 'M117.736 209.869H111.735L107.235 212.869M117.736 209.869L100.195 331.578H74.2354C85.922 276.678 107.235 212.869 107.235 212.869M117.736 209.869L107.235 212.869M50.2356 206.369L0.735352 331.578H43.0048C52.0008 292.699 49.5287 258.303 60.7354 209.869L50.2356 206.369Z';

export default function QuestionsMark({
  width = 112,
  className = '',
  style,
}: QuestionsMarkProps) {
  const height = Math.round((332 / 227) * width);

  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-flex',
        width,
        height,
        lineHeight: 0,
        flexShrink: 0,
        ...style,
      }}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 227 332"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
        animate={{ y: [0, 3, 0], rotate: [0, -0.8, 0] }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.path
          d={primaryPath}
          fill="#171717"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={bottomFillOne}
          fill="#171717"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.24 }}
        />
        <motion.path
          d={bottomFillTwo}
          fill="#171717"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.3 }}
        />
        <motion.path
          d={strokePath}
          stroke="#171717"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.62, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={primaryPath}
          fill="transparent"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="1.1"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0.12, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2.4,
            ease: 'easeOut',
            times: [0, 0.18, 0.42, 1],
          }}
        />
      </motion.svg>
    </motion.span>
  );
}
