'use client';

import { motion } from 'motion/react';
import type { ComponentProps } from 'react';

export const MDiv = motion.div;
export const MSpan = motion.span;
export const MP = motion.p;
export const MButton = motion.button;
export const MH2 = motion.h2;

export const ClientForm = ({ children, ...props }: ComponentProps<'form'>) => (
  <form {...props} onSubmit={(event) => event.preventDefault()}>
    {children}
  </form>
);
