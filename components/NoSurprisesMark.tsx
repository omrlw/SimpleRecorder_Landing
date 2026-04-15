'use client';

import type { CSSProperties } from 'react';
import { motion } from 'motion/react';

type NoSurprisesMarkProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  color?: string;
  strokeColor?: string;
  speed?: number;
};

const markPath =
  'M48.701,23.161c26.347,-24.7 122.22,-30.921 192.478,-12.441c99.35,26.164 131.554,81.968 105.39,182.965c-13.722,53.426 -37.874,137.224 -36.41,137.224c0.366,0 10.061,-6.953 21.588,-15.552c36.959,-27.628 56.904,-35.312 66.418,-25.798c3.842,3.842 1.83,6.038 -20.492,21.224c-0.183,0.183 -32.385,21.59 -84.53,64.404c-30.738,25.066 -30.189,10.795 -30.738,-20.675c-0.732,-32.934 -3.842,-53.243 -8.965,-77.577c-2.927,-13.722 -8.965,-31.836 8.416,-34.58c13.905,-2.196 25.798,21.407 30.006,62.574c1.647,16.284 2.743,14.82 10.61,-16.467c3.842,-15.369 9.882,-37.142 13.175,-48.303c36.776,-122.221 13.722,-172.902 -91.483,-201.078c-37.325,-10.063 -109.597,-14.271 -139.237,-8.417c-30.921,6.221 -47.205,2.927 -36.227,-7.502Z';

export default function NoSurprisesMark({
  size = 74,
  className = '',
  style,
  color = '#171717',
  strokeColor = 'rgba(255, 255, 255, 0.8)', // Blanco semitransparente para el brillo
  speed = 1,
}: NoSurprisesMarkProps) {

  const height = Math.round(size * 0.92);
  const baseDuration = 0.85 * speed;

  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: height,
        lineHeight: 0,
        flexShrink: 0,
        verticalAlign: 'middle',
        transform: 'translateY(-0.04em)',
        ...style,
      }}
      // Animación de entrada con "rebote"
      initial={{ opacity: 0, scale: 0.6, x: -10, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.svg
        width={size}
        height={height}
        viewBox="0 0 425 388"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
        // Rotación sutil flotante continua
        animate={{ rotate: [0, 2, -1, 0], y: [0, -2, 1, 0] }}
        transition={{
          duration: 5 * speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* FASE 1: Dibuja el contorno */}
        <motion.path
          d={markPath}
          fill="transparent"
          stroke={color}
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: baseDuration,
            ease: "easeOut",
          }}
        />

        {/* FASE 2: Rellena el interior (Aparece justo al terminar el contorno) */}
        <motion.path
          d={markPath}
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4 * speed,
            delay: baseDuration - 0.2, // Se superpone un poco para ser fluido
            ease: "easeOut",
          }}
        />

        {/* FASE 3: Resplandor/Brillo que viaja por el borde */}
        <motion.path
          d={markPath}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinejoin="round"
          initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 0.15, 0], // Crea un pequeño segmento de linea
            pathOffset: [0, 0.85, 1], // Lo hace viajar del 0% al 100% del SVG
            opacity: [0, 1, 0] // Aparece en el medio del recorrido
          }}
          transition={{
            duration: 2 * speed,
            repeat: Infinity,
            repeatDelay: 2.5 * speed, // Pausa entre cada destello
            ease: 'easeInOut',
          }}
        />
      </motion.svg>
    </motion.span>
  );
}