'use client';

import type { CSSProperties, PointerEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';

type HighlightSparkleAnimationProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

const transition = {
  duration: 1.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

const accentPaths = [
  { id: 1, d: 'M166.778 372.424C159.278 366.924 149.778 369.424 139.278 379.591C124.778 393.424 124.278 398.757 137.278 399.091C148.945 399.424 173.445 377.257 166.778 372.424Z', delay: 0.9 },
  { id: 2, d: 'M165.945 344.257C165.945 339.924 150.445 335.424 144.279 338.091C133.945 342.424 75.7789 388.091 71.6122 389.757C61.4456 393.757 77.1122 401.924 88.7789 398.758C99.4456 395.758 165.945 348.924 165.945 344.257Z', delay: 0.4 },
  { id: 3, d: 'M117.946 174.091C130.446 174.258 133.779 169.925 125.945 163.425C110.779 150.591 98.9455 146.258 89.6122 150.258C78.6122 154.758 101.112 173.758 117.946 174.091Z', delay: 1.2 },
  { id: 4, d: 'M312.778 191.758C321.778 191.924 338.612 181.424 337.612 176.258C335.778 166.924 317.112 166.924 307.112 176.258C296.278 186.258 298.112 191.591 312.778 191.758Z', delay: 1.65 },
  { id: 5, d: 'M154.945 169.257C171.278 172.257 170.112 164.258 149.945 135.591C112.779 82.7577 100.278 69.4243 91.4452 73.091C79.6118 77.7577 137.945 165.925 154.945 169.257Z', delay: 0.7 },
  { id: 6, d: 'M408.445 144.091C400.278 147.591 339.445 187.924 324.278 199.758C320.945 202.424 332.445 207.091 340.945 206.424C349.445 205.758 352.612 204.091 386.778 181.591C406.945 168.258 425.612 156.091 428.112 154.591C440.112 147.091 422.778 137.924 408.445 144.091Z', delay: 1.35 },
  { id: 7, d: 'M342.112 358.924C333.112 350.591 320.612 345.924 317.112 349.591C314.945 351.758 319.612 357.091 328.112 361.924C341.778 369.758 351.612 367.591 342.112 358.924Z', delay: 1.9 },
  { id: 8, d: 'M287.111 361.923C282.278 364.757 283.611 367.423 297.778 385.423C322.611 416.923 335.778 426.257 343.945 418.09C347.778 414.257 345.778 410.757 327.611 388.423C305.111 360.757 297.611 355.923 287.111 361.923Z', delay: 2.2 },
] as const;

export default function HighlightSparkleAnimation({
  size = 500,
  className = '',
  style,
}: HighlightSparkleAnimationProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), {
    stiffness: 140,
    damping: 18,
    mass: 0.8,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-11, 11]), {
    stiffness: 140,
    damping: 18,
    mass: 0.8,
  });
  const offsetX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 20,
  });
  const offsetY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 20,
  });

  const highlightX = useTransform(pointerX, [-0.5, 0.5], [22, 78]);
  const highlightY = useTransform(pointerY, [-0.5, 0.5], [20, 80]);
  const background = useMotionTemplate`radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.98) 0%, rgba(247,247,244,0.92) 28%, rgba(235,235,230,0.82) 52%, rgba(224,224,218,0.4) 72%, rgba(255,255,255,0) 100%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        overflow: 'visible',
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={transition}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
      >
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: 'visible',
            x: offsetX,
            y: offsetY,
          }}
          animate={{
            scale: [1, 1.012, 0.996, 1],
            y: [0, -5, 3, 0],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          <defs>
            <linearGradient id="pricingPrimary" x1="120" y1="80" x2="280" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#161616" />
              <stop offset="0.55" stopColor="#2B2B28" />
              <stop offset="1" stopColor="#4F4E49" />
            </linearGradient>
            <linearGradient id="pricingAccent" x1="94" y1="118" x2="400" y2="388" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1C1C1A" />
              <stop offset="1" stopColor="#0F0F0E" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0C0C0B" floodOpacity="0.16" />
            </filter>
          </defs>

          <motion.g
            filter="url(#softShadow)"
            initial={{ opacity: 0, scale: 0.88, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ ...transition, delay: 0.08 }}
            style={{ transformOrigin: '244px 260px' }}
          >
            <motion.path
              d="M318.945 268.758C327.945 264.091 327.778 262.758 317.612 252.758C286.445 222.258 260.445 151.924 254.612 82.9243C252.445 58.0909 229.278 34.5909 216.945 93.7576C201.278 168.424 164.279 244.424 139.779 252.258C123.279 257.591 125.112 268.758 142.446 268.758C168.112 268.758 183.778 291.924 193.778 345.258C200.278 379.924 211.278 433.591 212.278 436.424C214.778 443.091 237.612 453.924 243.612 409.591C251.945 346.924 284.612 286.258 318.945 268.758ZM290.112 261.091C262.612 280.591 235.445 318.424 228.445 347.258C226.778 353.924 224.945 352.924 223.612 344.758C217.112 303.091 203.278 278.091 179.945 264.924L170.945 259.758C194.945 234.258 205.778 225.091 233.612 146.925C234.778 143.591 234.945 144.091 240.945 164.258C252.112 202.591 266.112 229.924 284.112 248.758C293.112 258.424 293.278 258.924 290.112 261.091Z"
              fill="url(#pricingPrimary)"
              initial={{ pathLength: 0, opacity: 0, filter: 'blur(6px)' }}
              animate={{ pathLength: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2.1, ease: [0.19, 1, 0.22, 1] as const, delay: 0.1 }}
            />
            <motion.path
              d="M318.945 268.758C327.945 264.091 327.778 262.758 317.612 252.758C286.445 222.258 260.445 151.924 254.612 82.9243C252.445 58.0909 229.278 34.5909 216.945 93.7576C201.278 168.424 164.279 244.424 139.779 252.258C123.279 257.591 125.112 268.758 142.446 268.758C168.112 268.758 183.778 291.924 193.778 345.258C200.278 379.924 211.278 433.591 212.278 436.424C214.778 443.091 237.612 453.924 243.612 409.591C251.945 346.924 284.612 286.258 318.945 268.758ZM290.112 261.091C262.612 280.591 235.445 318.424 228.445 347.258C226.778 353.924 224.945 352.924 223.612 344.758C217.112 303.091 203.278 278.091 179.945 264.924L170.945 259.758C194.945 234.258 205.778 225.091 233.612 146.925C234.778 143.591 234.945 144.091 240.945 164.258C252.112 202.591 266.112 229.924 284.112 248.758C293.112 258.424 293.278 258.924 290.112 261.091Z"
              fill="transparent"
              stroke="rgba(255,255,255,0.58)"
              strokeWidth="1.2"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 2.4, ease: [0.19, 1, 0.22, 1] as const, delay: 0.28 }}
            />
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5 }}
          >
            {accentPaths.map((sparkle) => (
              <motion.g
                key={sparkle.id}
                animate={{
                  opacity: [0.22, 1, 0.42],
                  scale: [0.985, 1.02, 0.99],
                }}
                transition={{
                  duration: 5.8,
                  delay: sparkle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.path
                  d={sparkle.d}
                  fill="url(#pricingAccent)"
                  initial={{ pathLength: 0, opacity: 0, filter: 'blur(3px)' }}
                  animate={{ pathLength: 1, opacity: [0.34, 1, 0.6], filter: 'blur(0px)' }}
                  transition={{
                    pathLength: { duration: 1.5, delay: sparkle.delay, ease: [0.19, 1, 0.22, 1] as const },
                    opacity: { duration: 5.8, delay: sparkle.delay, repeat: Infinity, ease: 'easeInOut' },
                    filter: { duration: 0.8, delay: sparkle.delay },
                  }}
                />
                <motion.path
                  d={sparkle.d}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0, 1, 0.72, 0.22, 0, 0.96, 0.68, 0.18],
                    strokeWidth: [1.45, 1.45, 2.5, 2.2, 1.8, 1.45, 2.35, 2.05, 1.7],
                  }}
                  transition={{
                    duration: 0.42,
                    delay: sparkle.delay * 0.18,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.12, 0.18, 0.28, 0.4, 0.5, 0.62, 0.76, 1],
                  }}
                  style={{ filter: 'blur(0.25px)' }}
                />
              </motion.g>
            ))}
          </motion.g>
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
