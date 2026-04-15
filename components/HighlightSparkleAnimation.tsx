'use client';

import type { CSSProperties } from 'react';
import { motion } from 'motion/react'; // o 'framer-motion' dependiendo de tu versión

type HighlightSparkleAnimationProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  color?: string;
  strokeColor?: string;
  speed?: number;
};

const centerPath =
  'M318.945 268.758C327.945 264.091 327.778 262.758 317.612 252.758C286.445 222.258 260.445 151.924 254.612 82.9243C252.445 58.0909 229.278 34.5909 216.945 93.7576C201.278 168.424 164.279 244.424 139.779 252.258C123.279 257.591 125.112 268.758 142.446 268.758C168.112 268.758 183.778 291.924 193.778 345.258C200.278 379.924 211.278 433.591 212.278 436.424C214.778 443.091 237.612 453.924 243.612 409.591C251.945 346.924 284.612 286.258 318.945 268.758ZM290.112 261.091C262.612 280.591 235.445 318.424 228.445 347.258C226.778 353.924 224.945 352.924 223.612 344.758C217.112 303.091 203.278 278.091 179.945 264.924L170.945 259.758C194.945 234.258 205.778 225.091 233.612 146.925C234.778 143.591 234.945 144.091 240.945 164.258C252.112 202.591 266.112 229.924 284.112 248.758C293.112 258.424 293.278 258.924 290.112 261.091Z';

const accentPaths = [
  { id: 1, d: 'M166.778 372.424C159.278 366.924 149.778 369.424 139.278 379.591C124.778 393.424 124.278 398.757 137.278 399.091C148.945 399.424 173.445 377.257 166.778 372.424Z', delay: 0.04 },
  { id: 2, d: 'M165.945 344.257C165.945 339.924 150.445 335.424 144.279 338.091C133.945 342.424 75.7789 388.091 71.6122 389.757C61.4456 393.757 77.1122 401.924 88.7789 398.758C99.4456 395.758 165.945 348.924 165.945 344.257Z', delay: 0.1 },
  { id: 3, d: 'M117.946 174.091C130.446 174.258 133.779 169.925 125.945 163.425C110.779 150.591 98.9455 146.258 89.6122 150.258C78.6122 154.758 101.112 173.758 117.946 174.091Z', delay: 0.18 },
  { id: 4, d: 'M312.778 191.758C321.778 191.924 338.612 181.424 337.612 176.258C335.778 166.924 317.112 166.924 307.112 176.258C296.278 186.258 298.112 191.591 312.778 191.758Z', delay: 0.26 },
  { id: 5, d: 'M154.945 169.257C171.278 172.257 170.112 164.258 149.945 135.591C112.779 82.7577 100.278 69.4243 91.4452 73.091C79.6118 77.7577 137.945 165.925 154.945 169.257Z', delay: 0.14 },
  { id: 6, d: 'M408.445 144.091C400.278 147.591 339.445 187.924 324.278 199.758C320.945 202.424 332.445 207.091 340.945 206.424C349.445 205.758 352.612 204.091 386.778 181.591C406.945 168.258 425.612 156.091 428.112 154.591C440.112 147.091 422.778 137.924 408.445 144.091Z', delay: 0.24 },
  { id: 7, d: 'M342.112 358.924C333.112 350.591 320.612 345.924 317.112 349.591C314.945 351.758 319.612 357.091 328.112 361.924C341.778 369.758 351.612 367.591 342.112 358.924Z', delay: 0.3 },
  { id: 8, d: 'M287.111 361.923C282.278 364.757 283.611 367.423 297.778 385.423C322.611 416.923 335.778 426.257 343.945 418.09C347.778 414.257 345.778 410.757 327.611 388.423C305.111 360.757 297.611 355.923 287.111 361.923Z', delay: 0.34 },
] as const;

export default function HighlightSparkleAnimation({
  size = 44,
  className = '',
  style,
  color = '#171717',
  strokeColor = 'rgba(0, 0, 0, 0.1)',
  speed = 0.6, // Configurado por defecto a la versión "Más activa"
}: HighlightSparkleAnimationProps) {

  const baseDuration = 0.8 * speed;

  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        lineHeight: 0,
        flexShrink: 0,
        verticalAlign: 'middle',
        transform: 'translateY(-0.12em)',
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.15, rotate: 12 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Cuerpo central */}
        <motion.path
          d={centerPath}
          fill={color}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />

        {/* Destellos */}
        {accentPaths.map((accent) => (
          <motion.g
            key={accent.id}
            style={{ transformOrigin: 'center' }}
          >
            <motion.path
              d={accent.d}
              fill={color}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.85, 1.1, 0.85]
              }}
              transition={{
                duration: baseDuration + (accent.id * 0.1),
                delay: accent.delay * speed,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d={accent.d}
              fill="transparent"
              stroke={strokeColor}
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                strokeWidth: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: baseDuration + (accent.id * 0.1),
                delay: accent.delay * speed,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.g>
        ))}
      </svg>
    </motion.span>
  );
}