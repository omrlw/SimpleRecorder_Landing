'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AudioIcon,
  CheckIcon,
  ClockIcon,
  EyesIcon,
  MinusIcon,
  NoWatermarkIcon,
  PaperclipIcon,
  PlusIcon,
  RecordIcon,
  ScreenIcon,
  SelectionIcon,
  SettingsIcon,
  SpeedIcon,
  SquareIcon,
  WindowIcon
} from '@/components/icons';
import HighlightSparkleAnimation from '@/components/HighlightSparkleAnimation';
import NoSurprisesMark from '@/components/NoSurprisesMark';
import QuestionsMark from '@/components/QuestionsMark';

// --- Components ---

const AppLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 36C0 16.1178 16.1178 0 36 0C55.8823 0 72 16.1178 72 36C72 55.8823 55.8823 72 36 72C16.1178 72 0 55.8823 0 36Z" fill="url(#paint0_linear_1_100)" />
    <path d="M36 48C42.6274 48 48 42.6274 48 36C48 29.3726 42.6274 24 36 24C29.3726 24 24 29.3726 24 36C24 42.6274 29.3726 48 36 48Z" fill="white" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="paint0_linear_1_100" x1="36" y1="0" x2="36" y2="72" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB2C36" />
        <stop offset="1" stopColor="#951A20" />
      </linearGradient>
    </defs>
  </svg>
);

const NavbarLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <span
    className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#fb2c36_0%,#951a20_100%)] ${className}`}
  >
    <span className="h-4 w-4 rounded-full bg-white" />
  </span>
);

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' }
] as const;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const navbarTransition = {
    duration: 0.88,
    ease: [0.22, 1, 0.36, 1] as const
  };
  const centerTransition = {
    duration: 0.64,
    ease: [0.16, 1, 0.3, 1] as const
  };

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 40;
      setIsScrolled(nextScrolled);

      if (!nextScrolled) {
        setIsMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('pointerdown', handlePointerDown);
    }

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    if (!isScrolled) return;
    setIsMenuOpen((open) => !open);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full px-6 py-6 flex items-center justify-between bg-[#F8FAFC] max-w-[1400px] mx-auto md:hidden">
        <div className="flex items-center gap-3">
          <NavbarLogo className="w-10 h-10" />
          <span className="font-bold text-lg tracking-tight text-[#262626]">Simple Recorder</span>
        </div>
      </nav>

      <div className="hidden md:block h-[104px]" aria-hidden="true" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden md:flex justify-center px-6 pt-6">
        <motion.nav
          layout
          transition={navbarTransition}
          className={`pointer-events-auto relative flex w-full items-center justify-between overflow-visible ${
            isScrolled
              ? 'max-w-[760px] rounded-[34px] border border-black/5 bg-[#F8FAFC]/94 px-5 py-3 shadow-[0_22px_55px_-20px_rgba(38,38,38,0.2)] backdrop-blur-xl'
              : 'max-w-[1400px] rounded-none border border-transparent bg-[#F8FAFC] px-0 py-0 shadow-none'
          }`}
        >
          <motion.div
            layout="position"
            transition={navbarTransition}
            className={`relative z-10 flex shrink-0 items-center gap-3 ${isScrolled ? 'min-w-[220px]' : ''}`}
          >
            <NavbarLogo className="w-10 h-10" />
              <span className={`font-bold tracking-tight text-[#262626] ${isScrolled ? 'text-[1.05rem]' : 'text-lg'}`}>
                Simple Recorder
              </span>
            </motion.div>

            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
              <div ref={menuRef} className="relative flex items-center justify-center">
                <motion.div
                  layout
                  transition={centerTransition}
                  className={`origin-center flex items-center justify-center overflow-hidden ${
                  isScrolled ? 'w-0 scale-x-[0.82] opacity-0 pointer-events-none blur-[0.4px]' : 'w-[430px] scale-x-100 opacity-100 blur-0'
                }`}
                >
                  <div className="flex items-center gap-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={`expanded-${link.href}`}
                      href={link.href}
                      className={
                        index === 0
                          ? 'bg-[#d8d8d8] hover:bg-[#cecece] cursor-pointer transition-colors px-5 py-2.5 rounded-full text-sm font-bold text-[#262626]'
                          : 'px-5 py-2.5 text-sm font-bold text-[#262626] hover:text-black transition-colors'
                      }
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                layout
                transition={centerTransition}
                className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${
                  isScrolled ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-[0.94]'
                }`}
              >
                <button
                  type="button"
                  onClick={handleMenuToggle}
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                  className="min-w-[108px] rounded-full bg-[#d8d8d8] px-5 py-2.5 text-sm font-bold text-[#262626] transition-all duration-300 hover:bg-[#cecece]"
                >
                  Menu
                </button>

                <AnimatePresence>
                  {isScrolled && isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.985 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-[calc(100%+16px)] left-1/2 w-[220px] -translate-x-1/2 rounded-[28px] border border-black/5 bg-[#F8FAFC]/96 p-2 shadow-[0_24px_50px_-20px_rgba(38,38,38,0.28)] backdrop-blur-xl"
                    >
                      <div className="flex flex-col">
                        {navLinks.map((link) => (
                          <a
                            key={`compact-${link.href}`}
                            href={link.href}
                            onClick={handleLinkClick}
                            className="rounded-[20px] px-4 py-3 text-sm font-bold text-[#262626] transition-colors hover:bg-[#d8d8d8]"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          <motion.div
            layout="position"
            transition={navbarTransition}
            className="relative z-10 flex shrink-0 items-center justify-end"
          >
            <a
              href="#pricing"
              className={`rounded-full bg-[#262626] font-bold text-white transition-colors hover:bg-black ${
                isScrolled ? 'px-5 py-2.5 text-[14px]' : 'px-6 py-3 text-[14px]'
              }`}
            >
              DOWNLOAD FREE
            </a>
          </motion.div>
        </motion.nav>
      </div>
    </>
  );
};

const AnimatedWidget = () => {
  const [stage, setStage] = useState<'intro-app' | 'settings-open' | 'mode-switch' | 'countdown' | 'transition-to-recording' | 'recording-idle'>('intro-app');
  const [countdown, setCountdown] = useState(3);
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const popupSpring = {
    type: 'spring' as const,
    stiffness: 170,
    damping: 24,
    mass: 0.9
  };
  const selectorSpring = {
    type: 'spring' as const,
    stiffness: 210,
    damping: 28,
    mass: 0.82
  };
  const buttonSpring = {
    type: 'spring' as const,
    stiffness: 260,
    damping: 24,
    mass: 0.72
  };
  const subtleShadow = '0 14px 24px rgba(0,0,0,0.12)';
  const activeShadow = '0 16px 26px rgba(0,0,0,0.14)';
  const controlShadow = '0 14px 20px rgba(0,0,0,0.16)';
  const selectorOptions = [
    { label: 'Screen 1', icon: ScreenIcon },
    { label: 'Window', icon: WindowIcon },
    { label: 'Region', icon: SelectionIcon }
  ] as const;
  const isIntroApp = stage === 'intro-app';
  const isSettingsStage = stage === 'settings-open' || stage === 'mode-switch' || stage === 'countdown' || stage === 'transition-to-recording';
  const isTransitioningToRecording = stage === 'transition-to-recording';
  const isRecording = stage === 'recording-idle';
  const showPopup = isSettingsStage;
  const showSelector = !isRecording;
  const compactSelector = !isIntroApp;
  const activeMode = stage === 'mode-switch' || stage === 'countdown' || stage === 'transition-to-recording' || stage === 'recording-idle' ? 1 : 0;
  const displayValue = 'Screen 1';
  const countdownValue = stage === 'countdown' ? `${countdown}s` : '5s';
  const highlightedRow = stage === 'countdown' ? 'Countdown' : null;
  const introControlDark = isIntroApp || isRecording;
  const centerHasGradient = isIntroApp || isTransitioningToRecording || isRecording;
  const centerShowsStop = isTransitioningToRecording || isRecording;
  const selectorTop = 214;
  const selectorWidth = compactSelector ? 224 : 308;
  const settingsRows = [
    {
      label: 'Display',
      value: displayValue,
      icon: ScreenIcon,
      toggle: true,
      toggleColor: activeMode === 0 ? '#fb2c36' : '#46d478',
      toggleActive: activeMode !== 0
    },
    {
      label: 'Microphone',
      value: 'External mic',
      icon: AudioIcon,
      toggle: false,
      toggleColor: null,
      toggleActive: false
    },
    {
      label: 'Quality',
      value: '120fps',
      icon: EyesIcon,
      toggle: false,
      toggleColor: null,
      toggleActive: false
    },
    {
      label: 'Countdown',
      value: countdownValue,
      icon: ClockIcon,
      toggle: false,
      toggleColor: null,
      toggleActive: false
    },
    {
      label: 'Save to',
      value: 'Desktop/',
      icon: PaperclipIcon,
      toggle: false,
      toggleColor: null,
      toggleActive: false
    }
  ] as const;

  useEffect(() => {
    const timeoutIds: number[] = [];

    if (stage === 'intro-app') {
      timeoutIds.push(window.setTimeout(() => setStage('settings-open'), 980));
    }

    if (stage === 'settings-open') {
      timeoutIds.push(window.setTimeout(() => setStage('mode-switch'), 1250));
    }

    if (stage === 'mode-switch') {
      timeoutIds.push(window.setTimeout(() => {
        setCountdown(3);
        setStage('countdown');
      }, 820));
    }

    if (stage === 'countdown') {
      timeoutIds.push(window.setTimeout(() => setCountdown(2), 560));
      timeoutIds.push(window.setTimeout(() => setCountdown(1), 1120));
      timeoutIds.push(window.setTimeout(() => setStage('transition-to-recording'), 1760));
    }

    if (isTransitioningToRecording) {
      timeoutIds.push(window.setTimeout(() => setStage('recording-idle'), 640));
    }

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [isTransitioningToRecording, stage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: smoothEase }}
      className="relative h-[344px] w-[320px] sm:h-[362px] sm:w-[360px]"
    >
      <AnimatePresence initial={false}>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.986 }}
            animate={isTransitioningToRecording
              ? {
                opacity: 0,
                y: 6,
                scale: 0.992,
                boxShadow: '0 10px 16px rgba(0,0,0,0.08)'
              }
              : {
                opacity: 1,
                y: 0,
                scale: 1,
                boxShadow: highlightedRow ? activeShadow : subtleShadow
              }}
            exit={{ opacity: 0, y: 8, scale: 0.988 }}
            transition={{
              ...popupSpring,
              opacity: { duration: 0.24, ease: smoothEase }
            }}
            className="absolute left-1/2 top-0 flex w-[292px] -translate-x-1/2 flex-col gap-3.5 rounded-[38px] bg-[#d9d9d9] px-6 py-5 text-[#262626] sm:w-[300px]"
          >
            {settingsRows.map(({ label, value, icon: Icon, toggle, toggleColor, toggleActive }, index) => {
              const isHighlighted = highlightedRow === label;

              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isTransitioningToRecording ? { opacity: 0, y: 4 } : { opacity: 1, y: 0 }}
                  transition={{
                    ...popupSpring,
                    delay: isTransitioningToRecording ? 0 : 0.08 + (index * 0.055),
                    opacity: { duration: 0.22, ease: smoothEase, delay: isTransitioningToRecording ? 0 : 0.08 + (index * 0.055) }
                  }}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <motion.div
                      animate={{
                        opacity: isTransitioningToRecording ? 0 : 1,
                        x: isTransitioningToRecording ? -4 : 0
                      }}
                      transition={{
                        ...popupSpring,
                        delay: isTransitioningToRecording ? 0 : 0.1 + (index * 0.055),
                        opacity: { duration: 0.18, ease: smoothEase, delay: isTransitioningToRecording ? 0 : 0.1 + (index * 0.055) }
                      }}
                      className="flex items-center gap-2 text-[12px] font-medium tracking-[-0.01em] text-[#111111]"
                    >
                      <Icon className="h-[13px] w-[13px] shrink-0" />
                      <span>{label}</span>
                    </motion.div>

                    <motion.div
                      animate={isTransitioningToRecording
                        ? { opacity: 0, x: 4, scale: 0.985 }
                        : {
                          opacity: 1,
                          x: 0,
                          scale: isHighlighted ? 1.01 : 1,
                          boxShadow: isHighlighted
                            ? '0 6px 10px rgba(0,0,0,0.06)'
                            : '0 0 0 rgba(0,0,0,0)'
                        }}
                      transition={{
                        ...popupSpring,
                        delay: isTransitioningToRecording ? 0 : 0.14 + (index * 0.055),
                        opacity: { duration: 0.18, ease: smoothEase, delay: isTransitioningToRecording ? 0 : 0.14 + (index * 0.055) },
                        boxShadow: { duration: 0.18, ease: smoothEase }
                      }}
                      className="flex h-5 min-w-[100px] items-center justify-center gap-2 rounded-full bg-black px-3 text-[12px] font-medium text-[#d9d9d9]"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={`${label}-${value}`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2, ease: smoothEase }}
                        >
                          {value}
                        </motion.span>
                      </AnimatePresence>

                      {toggle ? (
                        <motion.span className="relative h-[10px] w-[22px] overflow-hidden rounded-[5px] bg-[#262626]">
                          <motion.span
                            animate={{ opacity: toggleActive ? 1 : 0 }}
                            transition={{ duration: 0.24, ease: smoothEase }}
                            className="absolute inset-0 rounded-[5px]"
                            style={{ background: 'linear-gradient(90deg, #262626 0%, #8c8c8c 100%)' }}
                          />
                          <motion.span
                            animate={{
                              x: toggleActive ? 13 : 2,
                              backgroundColor: toggleColor ?? '#fb2c36',
                              scale: toggleActive ? 1 : [1, 1.08, 1],
                              opacity: toggleActive ? 1 : [0.86, 1, 0.86]
                            }}
                            transition={{
                              x: buttonSpring,
                              backgroundColor: { duration: 0.24, ease: smoothEase },
                              scale: toggleActive
                                ? { duration: 0.18, ease: smoothEase }
                                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                              opacity: toggleActive
                                ? { duration: 0.18, ease: smoothEase }
                                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                            }}
                            className="absolute top-[1.5px] h-[7px] w-[7px] rounded-full"
                          />
                        </motion.span>
                      ) : null}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {showSelector && (
          <motion.div
            initial={false}
            animate={isTransitioningToRecording
              ? {
                opacity: 0,
                y: 6,
                scale: 0.99,
                top: 214,
                width: 224,
                boxShadow: '0 8px 14px rgba(0,0,0,0.12)'
              }
              : {
                opacity: 1,
                y: 0,
                scale: 1,
                top: selectorTop,
                width: selectorWidth,
                boxShadow: compactSelector ? '0 12px 18px rgba(0,0,0,0.14)' : '0 14px 20px rgba(0,0,0,0.16)'
              }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{
              top: selectorSpring,
              width: selectorSpring,
              scale: selectorSpring,
              y: selectorSpring,
              opacity: { duration: 0.22, ease: smoothEase },
              boxShadow: { duration: 0.22, ease: smoothEase }
            }}
            className="absolute left-1/2 flex h-10 -translate-x-1/2 items-center rounded-full bg-[#262626] px-2"
          >
            <div className="relative flex h-6 w-full items-center gap-2">
              {selectorOptions.map(({ label, icon: Icon }, index) => {
                const isActive = activeMode === index;

                return (
                  <motion.div
                    key={label}
                    animate={{
                      backgroundColor: compactSelector ? '#000000' : '#d9d9d9',
                      boxShadow: compactSelector && isActive ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : '0 0 0 rgba(0,0,0,0)'
                    }}
                    transition={{
                      backgroundColor: { duration: 0.24, ease: smoothEase },
                      boxShadow: { duration: 0.2, ease: smoothEase }
                    }}
                    className="relative flex h-6 flex-1 items-center justify-center rounded-full"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {compactSelector ? (
                        <motion.div
                          key={`${label}-compact`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: smoothEase }}
                          className="flex items-center justify-center"
                        >
                          <Icon className={`h-[13px] w-[13px] ${isActive ? 'text-white' : 'text-[#d9d9d9]'}`} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`${label}-expanded`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: smoothEase }}
                          className="flex items-center gap-1.5 text-[#111111]"
                        >
                          <Icon className="h-[11px] w-[11px]" />
                          <span className="text-[12px] font-medium tracking-[-0.01em]">{label}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-6">
        <motion.button
          type="button"
          animate={{
            backgroundColor: introControlDark ? '#262626' : '#d9d9d9',
            color: introControlDark ? '#ffffff' : '#262626',
            boxShadow: introControlDark ? controlShadow : '0 12px 18px rgba(0,0,0,0.12)'
          }}
          transition={{
            backgroundColor: { duration: 0.36, ease: smoothEase },
            color: { duration: 0.26, ease: smoothEase },
            boxShadow: { duration: 0.36, ease: smoothEase }
          }}
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full"
        >
          <AudioIcon className="h-5 w-5" />
          <AnimatePresence initial={false}>
            {isRecording ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={buttonSpring}
                className="absolute right-[11px] top-[10px] h-1.5 w-1.5 rounded-full bg-[#46d478]"
              />
            ) : null}
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          animate={{
            backgroundColor: introControlDark ? '#262626' : '#d9d9d9',
            color: introControlDark ? '#ffffff' : '#262626',
            boxShadow: introControlDark ? controlShadow : '0 12px 18px rgba(0,0,0,0.12)'
          }}
          transition={{
            backgroundColor: { duration: 0.36, ease: smoothEase },
            color: { duration: 0.26, ease: smoothEase },
            boxShadow: { duration: 0.36, ease: smoothEase }
          }}
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full"
        >
          <RecordIcon className="h-5 w-5" />
          <AnimatePresence initial={false}>
            {isRecording ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{
                  ...buttonSpring,
                  delay: 0.04
                }}
                className="absolute right-[11px] top-[10px] h-1.5 w-1.5 rounded-full bg-[#46d478]"
              />
            ) : null}
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          animate={{
            scale: stage === 'countdown'
              ? 1.012
              : isTransitioningToRecording
                ? 1.018
                : isRecording
                  ? 1.008
                  : 1,
            boxShadow: centerHasGradient ? '0 0 0 rgba(0,0,0,0)' : '0 16px 24px rgba(0,0,0,0.16)'
          }}
          transition={{
            scale: buttonSpring,
            boxShadow: { duration: 0.34, ease: smoothEase }
          }}
          className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-black"
        >
          <motion.span
            animate={{ opacity: centerHasGradient ? 1 : 0 }}
            transition={{ duration: 0.28, ease: smoothEase }}
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #fb2c36 0%, #951a20 100%)' }}
          />
          <AnimatePresence mode="wait" initial={false}>
            {centerShowsStop ? (
              <motion.div
                key="stop"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={buttonSpring}
                className="relative z-10 flex items-center justify-center"
              >
                <SquareIcon className="h-6 w-6 fill-white text-white" />
              </motion.div>
            ) : (
              <motion.div
                key={centerHasGradient ? 'armed' : 'idle'}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={buttonSpring}
                className="relative z-10 h-8 w-8 rounded-full bg-white"
              />
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          animate={{
            backgroundColor: introControlDark ? '#262626' : '#d9d9d9',
            color: introControlDark ? '#ffffff' : '#262626',
            boxShadow: introControlDark ? controlShadow : '0 12px 18px rgba(0,0,0,0.12)'
          }}
          transition={{
            backgroundColor: { duration: 0.36, ease: smoothEase },
            color: { duration: 0.26, ease: smoothEase },
            boxShadow: { duration: 0.36, ease: smoothEase }
          }}
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full"
        >
          <SettingsIcon className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0.6);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime;
      if (timeLeft < 1.5) {
        setVideoOpacity(0.6 * (timeLeft / 1.5));
      } else if (video.currentTime < 1.5) {
        setVideoOpacity(0.6 * (video.currentTime / 1.5));
      } else {
        setVideoOpacity(0.6);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section className="px-6 pt-12 pb-24 max-w-[1400px] mx-auto bg-[#F8FAFC]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-12">
        <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight text-[#262626] max-w-4xl leading-[1.05]">
          Record your screen in 120fps with zero friction
        </h1>
        <div className="flex flex-col gap-6 max-w-sm pb-2">
          <p className="text-xl text-[#262626] font-normal leading-relaxed">
            Unlock professional screen capture with our premium solutions.
          </p>
          <button className="bg-[#262626] text-white px-8 py-4 rounded-full w-fit text-sm font-bold tracking-wide hover:bg-black transition-colors">
            DOWNLOAD FREE
          </button>
        </div>
      </div>

      {/* Visual Area */}
      <div className="relative w-full h-[500px] md:h-[700px] rounded-[40px] overflow-hidden bg-[#e5e5e5]">
        {/* Background Video / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c4a52] to-[#5a7d7f] opacity-90" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-opacity duration-500"
        >
          <source src="/videos/background-hero1.mp4" type="video/mp4" />
        </video>
        {/* Floating Elements */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <AnimatedWidget />
        </div>

      </div>
    </section>
  );
};

const FeatureWorkflowMockup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6"
    >
      <div className="px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#262626]/45 shadow-sm">
              Product preview
            </div>
            <h3 className="text-4xl font-bold leading-[1.02] tracking-tight text-[#262626] md:text-5xl">
              Leave one strong screen here and swap in your video later.
            </h3>
          </div>

          <p className="max-w-md text-lg leading-relaxed text-[#262626]/60">
            This block is just a clean stage for your future demo, without pretending the app is already finished.
          </p>
        </div>

        <div className="rounded-[36px] bg-[#262626] p-3 shadow-[0_34px_80px_-34px_rgba(38,38,38,0.45)] md:p-4">
          <div className="overflow-hidden rounded-[30px] bg-[#f2f2f2]">
            <div className="flex items-center justify-between border-b border-black/6 bg-[#e7e7e7] px-5 py-4 md:px-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#fb2c36]" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#262626]/45 shadow-sm sm:inline-flex">
                  <ScreenIcon className="h-3.5 w-3.5" />
                  Demo screen
                </div>
                <div className="rounded-full bg-[#fb2c36] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_24px_-14px_rgba(251,44,54,0.9)]">
                  Ready for video
                </div>
              </div>
            </div>

            <div className="bg-[linear-gradient(135deg,#314e56_0%,#527278_48%,#9ab1b4_100%)] p-4 md:p-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-white/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%),linear-gradient(145deg,rgba(12,18,20,0.18),rgba(12,18,20,0.48))]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_34%,rgba(255,255,255,0.05)_100%)]" />

                <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm md:left-6 md:top-6">
                  Replace with product video
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/14 shadow-[0_24px_44px_-24px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                    <div className="ml-1 h-0 w-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-white" />
                  </div>

                  <p className="max-w-xl text-3xl font-bold leading-[1.02] tracking-tight md:text-5xl">
                    Your app walkthrough goes here.
                  </p>

                  <p className="mt-4 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                    Keep this as a single, strong visual. One screen. One message. One product moment.
                  </p>
                </div>

                <div className="absolute bottom-5 left-1/2 flex w-[calc(100%-2.5rem)] -translate-x-1/2 items-center justify-between rounded-[22px] border border-white/12 bg-black/24 px-4 py-3 text-white/80 backdrop-blur-sm md:bottom-6 md:w-auto md:min-w-[460px] md:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fb2c36]">
                      <RecordIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Suggested clip</p>
                      <p className="text-sm font-semibold tracking-tight md:text-base">Show selection, record, and final export in under 12 seconds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <EyesIcon className="w-8 h-8 text-white" />,
      iconBg: "bg-[#fb2c36]",
      title: "120 FPS",
      description: "Silky smooth recordings perfect for gaming, high-end UI demonstrations, and professional tutorials. Zero dropped frames."
    },
    {
      icon: <SelectionIcon className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "Precision Selection",
      description: "Instantly snap to windows, select custom regions, or record your entire display with a single click."
    },
    {
      icon: <RecordIcon className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "Studio Audio",
      description: "Capture system audio and your microphone on separate tracks for ultimate control in post-production."
    },
    {
      icon: <WindowIcon className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "Floating UI",
      description: "Our unobtrusive floating widget stays out of your way while giving you instant access to controls."
    },
    {
      icon: <NoWatermarkIcon className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "No Watermark",
      description: "Your recordings stay clean from start to finish. No branding stamped over your work, even on the free plan."
    },
    {
      icon: <SpeedIcon className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "Built for Speed",
      description: "Launch fast, record fast, and move on. Simple Recorder is optimized to feel instant, lightweight, and reliable every time."
    },
  ] as const;

  return (
    <section id="features" className="py-32 px-6 bg-[#F8FAFC] max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
        <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#262626] max-w-3xl leading-[1.05]">
          <span className="inline-flex items-center gap-3 md:gap-4">
            <span>Everything you need.</span>
            <HighlightSparkleAnimation size={60} />
          </span>
          <span className="text-[#262626]/40">Nothing you don&apos;t.</span>
        </h2>
        <div className="max-w-sm pb-2">
          <p className="text-xl text-[#262626] font-normal leading-relaxed">
            Built for instant captures and high-fidelity exports. Get professional results without the cluttered workflow.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#d8d8d8] p-10 md:p-14 rounded-[40px] flex flex-col justify-between h-full min-h-[320px] group hover:bg-[#cecece] transition-colors"
          >
            <div className={`w-16 h-16 rounded-full ${feature.iconBg} flex items-center justify-center mb-12 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              {feature.icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#262626] mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-lg text-[#262626]/70 leading-relaxed font-normal">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <FeatureWorkflowMockup />
    </section>
  );
};

const Pricing = () => (
  <section id="pricing" className="py-32 px-6 bg-[#F8FAFC] max-w-[1400px] mx-auto">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
      <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#262626] max-w-3xl leading-[1.05]">
        Simple pricing.<br />
        <span className="inline-flex items-center gap-12 text-[#262626]/40">
          <span>No surprises.</span>
          <NoSurprisesMark size={78} />
        </span>
      </h2>
      <div className="max-w-sm pb-2">
        <p className="text-xl text-[#262626] font-normal leading-relaxed">
          Pay once, own it forever. No subscriptions, no recurring fees.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-px bg-[#cecece] rounded-[40px] overflow-hidden">
      {/* Starter — Free */}
      <div className="bg-[#d8d8d8] p-10 md:p-14 lg:p-16 flex flex-col">
        {/* Plan header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#262626]/40">
              Starter
            </p>
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#262626]/60 bg-[#262626]/10 px-3 py-1 rounded-full">
              Free forever
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-[5.5rem] md:text-[6.5rem] font-bold tracking-tighter text-[#262626] leading-none">
              $0
            </span>
          </div>
          <p className="text-lg text-[#262626]/60 font-normal leading-relaxed">
            Everything you need for clean, fast screen recording — completely free, forever.
          </p>
        </div>

        {/* Features */}
        <div className="mb-14 flex-grow">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#262626]/40 mb-6">
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-5">
            {[
              'Up to 120 FPS recording',
              'Up to 1080p resolution',
              'Precision selection',
              'Basic audio capture',
              'Unlimited recordings',
              'No watermark',
              'Lightweight & fast',
              'Community support'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg text-[#262626]/80 font-normal">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckIcon className="w-4 h-4 text-[#262626]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button className="w-full py-5 rounded-full font-bold text-[#262626] bg-white hover:bg-[#F8FAFC] transition-colors text-lg cursor-pointer shadow-sm">
          Download Free
        </button>
      </div>

      {/* Pro — One-time */}
      <div className="bg-[#262626] p-10 md:p-14 lg:p-16 flex flex-col relative">
        {/* Plan header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/40">
              Pro
            </p>
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-white bg-white/10 px-3 py-1 rounded-full">
              One-time purchase
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-[5.5rem] md:text-[6.5rem] font-bold tracking-tighter text-white leading-none">
              $5
            </span>
          </div>
          <p className="text-lg text-white/60 font-normal leading-relaxed">
            Unlock the full power of Simple Recorder with a single payment. Yours forever.
          </p>
        </div>

        {/* Features */}
        <div className="mb-14 flex-grow">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/35 mb-6">
            Everything in Starter, plus
          </p>
          <ul className="flex flex-col gap-5">
            {[
              'Record at your monitor\'s refresh rate',
              'Up to 4K resolution',
              'System + microphone audio',
              'Separate audio channels',
              'Advanced export formats',
              'Priority support',
              'Future updates included'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg text-white/80 font-normal">
                <div className="w-6 h-6 rounded-full bg-[#fb2c36] flex items-center justify-center shrink-0">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button className="w-full py-5 rounded-full font-bold text-white bg-[#fb2c36] hover:bg-[#e02730] transition-colors text-lg cursor-pointer">
          Get Lifetime Access
        </button>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 px-6 bg-[#F8FAFC] max-w-[1400px] mx-auto">
    <div className="relative rounded-[40px] overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/background-video1.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 p-10 md:p-14">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left side: Title */}
          <div className="lg:w-1/2">
            <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-white leading-[1.05] mb-6">
              Have questions?<br />
              <span className="text-white/40">Let&apos;s talk.</span>
            </h2>
            <p className="text-xl text-white/70 font-normal leading-relaxed max-w-md">
              Our team is here to help. Send us a message and we&apos;ll respond within 24 hours.
            </p>
          </div>

          {/* Right side: Form */}
          <div className="lg:w-1/2 w-full bg-white/10 backdrop-blur-sm p-10 md:p-14 rounded-[32px] border border-white/10">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="px-6 py-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#fb2c36] transition-all bg-white/10 text-lg font-normal text-white placeholder:text-white/30"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="px-6 py-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#fb2c36] transition-all bg-white/10 text-lg font-normal text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="px-6 py-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#fb2c36] transition-all bg-white/10 text-lg font-normal text-white placeholder:text-white/30 resize-none"
                />
              </div>
              <button className="w-full bg-[#fb2c36] text-white py-5 rounded-full font-bold hover:bg-[#e02730] transition-colors text-lg mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border-b border-[#cecece] last:border-b-0"
  >
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-8 text-left group cursor-pointer"
    >
      <span className="text-xl md:text-2xl font-bold text-[#262626] pr-8 group-hover:text-[#fb2c36] transition-colors">
        {question}
      </span>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#fb2c36] rotate-0' : 'bg-[#d8d8d8] group-hover:bg-[#cecece]'
        }`}>
        {isOpen ? (
          <MinusIcon className="w-5 h-5 text-white" />
        ) : (
          <PlusIcon className="w-5 h-5 text-[#262626]" />
        )}
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <p className="text-lg text-[#262626]/60 font-normal leading-relaxed pb-8 max-w-3xl">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is SimpleRecorder really free?',
      answer: 'Yes! The Starter plan is completely free forever. You get 1080p recording, up to 5 minutes per clip, and basic audio capture. No credit card required, no trial period — just download and start recording.'
    },
    {
      question: 'How does SimpleRecorder achieve 0 latency and 120fps?',
      answer: 'SimpleRecorder is built as a native Windows application using low-level GPU capture APIs. Unlike browser-based or Electron tools, we hook directly into the display pipeline, eliminating encoding overhead and delivering buttery smooth 120fps capture with virtually zero impact on system performance.'
    },
    {
      question: 'What formats does SimpleRecorder export to?',
      answer: 'SimpleRecorder exports to MP4 (H.264/H.265) by default for maximum compatibility. Pro users also get access to WebM, MKV, and lossless AVI formats, plus the ability to configure custom encoding presets for any workflow.'
    },
    {
      question: 'Does it work with multiple monitors?',
      answer: 'Absolutely. SimpleRecorder detects all connected displays automatically. You can record a single monitor, a specific window, or a custom region that spans across multiple screens — all at their native refresh rate.'
    },
    {
      question: 'Can I record system audio and my microphone at the same time?',
      answer: 'Yes! Pro users get multi-track audio recording, which captures system audio and microphone input on separate tracks. This gives you full control in post-production to adjust levels, add effects, or mute tracks independently.'
    },
    {
      question: 'Is there a watermark on the free version?',
      answer: 'No watermarks on any plan. We believe your content should always look professional, whether you\'re on the free Starter plan or the Pro plan. Your recordings are 100% clean.'
    }
  ];

  return (
    <section id="faq" className="py-32 px-6 bg-[#F8FAFC] max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
        <h2 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-[#262626] md:text-6xl lg:text-[4.5rem]">
          Got questions?<br />
          <span className="relative inline-block text-[#262626]/40">
            We&apos;ve got answers.
            <QuestionsMark
              width={108}
              className="absolute left-[calc(100%-1rem)] -bottom-21 z-0 md:left-[calc(100%+0.5rem)]"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 92%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 92%, transparent 100%)'
              }}
            />
          </span>
        </h2>
        <div className="max-w-sm pb-2">
          <p className="text-xl text-[#262626] font-normal leading-relaxed">
            Everything you need to know about SimpleRecorder before getting started.
          </p>
        </div>
      </div>

      <div className="relative z-20 bg-[#d8d8d8] rounded-[40px] p-10 md:p-14">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#262626] pt-24 pb-12 px-6 mt-12 rounded-t-[40px] max-w-[1400px] mx-auto mb-6">
    <div className="flex flex-col items-center text-center mb-20">
      <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
        Ready to record?
      </h2>
      <button className="bg-white text-[#262626] px-10 py-5 rounded-full text-lg font-bold hover:bg-[#d8d8d8] transition-colors">
        DOWNLOAD FREE
      </button>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
      <div className="flex items-center gap-3">
        <AppLogo className="w-8 h-8" />
        <span className="font-bold text-lg tracking-tight text-white">Simple Recorder</span>
      </div>
      <div className="flex gap-8 text-sm font-normal text-white/60">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
      </div>
      <div className="text-sm text-white/40 font-normal">
        © {new Date().getFullYear()} Simple Recorder. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-[#fb2c36]/20 selection:text-[#fb2c36]">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
