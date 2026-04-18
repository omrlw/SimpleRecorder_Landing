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
  WindowsLogoIcon,
  WindowIcon
} from '@/components/icons';

// --- Components ---

const accentRedSurfaceStyle = {
  backgroundImage: 'var(--accent-red-gradient)',
  backgroundColor: 'var(--accent-red-solid)'
} satisfies React.CSSProperties;

const AppLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 36C0 16.1178 16.1178 0 36 0C55.8823 0 72 16.1178 72 36C72 55.8823 55.8823 72 36 72C16.1178 72 0 55.8823 0 36Z" fill="url(#paint0_linear_1_100)" />
    <path d="M36 48C42.6274 48 48 42.6274 48 36C48 29.3726 42.6274 24 36 24C29.3726 24 24 29.3726 24 36C24 42.6274 29.3726 48 36 48Z" fill="white" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="paint0_linear_1_100" x1="36" y1="0" x2="36" y2="72" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--accent-red-start)" />
        <stop offset="1" stopColor="var(--accent-red-end)" />
      </linearGradient>
    </defs>
  </svg>
);

const NavbarLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <span
    className={`accent-red-surface relative inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
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
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const compactMenuRef = React.useRef<HTMLDivElement>(null);
  const desktopMenuRef = React.useRef<HTMLDivElement>(null);
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
      const target = event.target as Node;
      const menuContainers = [
        mobileMenuRef.current,
        compactMenuRef.current,
        desktopMenuRef.current
      ];

      if (!menuContainers.some((container) => container?.contains(target))) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('pointerdown', handlePointerDown);
    }

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen((open) => !open);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between bg-[#F8FAFC] px-4 py-4 sm:px-6 sm:py-5 md:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <NavbarLogo className="w-10 h-10" />
          <span className="truncate font-bold tracking-tight text-[#262626] text-[0.95rem] sm:text-lg">Simple Recorder</span>
        </div>

        <div ref={mobileMenuRef} className="relative">
          <button
            type="button"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            className="rounded-full bg-[#d8d8d8] px-4 py-2.5 text-sm font-bold text-[#262626] transition-colors hover:bg-[#cecece]"
          >
            Menu
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.985 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(220px,calc(100vw-32px))] rounded-[28px] border border-black/5 bg-[#F8FAFC]/96 p-2 shadow-[0_24px_50px_-20px_rgba(38,38,38,0.28)] backdrop-blur-xl"
              >
                <div className="flex flex-col">
                  {navLinks.map((link) => (
                    <a
                      key={`mobile-${link.href}`}
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
        </div>
      </nav>

      <div className="hidden md:block lg:hidden h-[92px]" aria-hidden="true" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden md:flex lg:hidden justify-center px-6 pt-5">
        <motion.nav
          layout
          transition={navbarTransition}
          className="pointer-events-auto relative flex w-full max-w-[860px] items-center justify-between rounded-[30px] border border-black/5 bg-[#F8FAFC]/94 px-4 py-3 shadow-[0_22px_55px_-20px_rgba(38,38,38,0.2)] backdrop-blur-xl"
        >
          <div className="relative z-10 flex min-w-0 items-center gap-3">
            <NavbarLogo className="w-10 h-10" />
            <span className="truncate text-[1.05rem] font-bold tracking-tight text-[#262626]">
              Simple Recorder
            </span>
          </div>

          <div ref={compactMenuRef} className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
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
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.985 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-[calc(100%+14px)] left-1/2 w-[220px] -translate-x-1/2 rounded-[28px] border border-black/5 bg-[#F8FAFC]/96 p-2 shadow-[0_24px_50px_-20px_rgba(38,38,38,0.28)] backdrop-blur-xl"
                >
                  <div className="flex flex-col">
                    {navLinks.map((link) => (
                      <a
                        key={`tablet-${link.href}`}
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
          </div>

          <a
            href="#pricing"
            className="relative z-10 shrink-0 rounded-full bg-[#262626] px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-black"
          >
            <span className="inline-flex items-center gap-2">
              <WindowsLogoIcon className="h-4 w-4" />
              <span>DOWNLOAD FREE</span>
            </span>
          </a>
        </motion.nav>
      </div>

      <div className="hidden lg:block h-[104px]" aria-hidden="true" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden lg:flex justify-center px-6 pt-6">
        <motion.nav
          layout
          transition={navbarTransition}
          className={`pointer-events-auto relative flex w-full items-center justify-between overflow-visible ${isScrolled
            ? 'max-w-[720px] rounded-[34px] border border-black/5 bg-[#F8FAFC]/94 px-4 py-3 shadow-[0_22px_55px_-20px_rgba(38,38,38,0.2)] backdrop-blur-xl xl:max-w-[760px] xl:px-5'
            : 'max-w-[1400px] rounded-none border border-transparent bg-[#F8FAFC] px-0 py-0 shadow-none'
            }`}
        >
          <motion.div
            layout="position"
            transition={navbarTransition}
            className={`relative z-10 flex shrink-0 items-center gap-3 ${isScrolled ? 'lg:min-w-[200px] xl:min-w-[220px]' : ''}`}
          >
            <NavbarLogo className="w-10 h-10" />
            <span className={`font-bold tracking-tight text-[#262626] ${isScrolled ? 'text-[1.05rem]' : 'text-lg'}`}>
              Simple Recorder
            </span>
          </motion.div>

          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
            <div ref={desktopMenuRef} className="relative flex items-center justify-center">
              <motion.div
                layout
                transition={centerTransition}
                className={`origin-center flex items-center justify-center overflow-hidden ${isScrolled ? 'w-0 scale-x-[0.82] opacity-0 pointer-events-none blur-[0.4px]' : 'w-[380px] scale-x-100 opacity-100 blur-0 xl:w-[430px]'
                  }`}
              >
                <div className="flex items-center gap-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={`expanded-${link.href}`}
                      href={link.href}
                      className={
                        index === 0
                          ? 'bg-[#d8d8d8] hover:bg-[#cecece] cursor-pointer rounded-full px-4 py-2.5 text-sm font-bold text-[#262626] transition-colors xl:px-5'
                          : 'px-4 py-2.5 text-sm font-bold text-[#262626] transition-colors hover:text-black xl:px-5'
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
                className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${isScrolled ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-[0.94]'
                  }`}
              >
                <button
                  type="button"
                  onClick={handleMenuToggle}
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                  className="min-w-[104px] rounded-full bg-[#d8d8d8] px-5 py-2.5 text-sm font-bold text-[#262626] transition-all duration-300 hover:bg-[#cecece] xl:min-w-[108px]"
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
                      className="absolute top-[calc(100%+16px)] left-1/2 w-[210px] -translate-x-1/2 rounded-[28px] border border-black/5 bg-[#F8FAFC]/96 p-2 shadow-[0_24px_50px_-20px_rgba(38,38,38,0.28)] backdrop-blur-xl xl:w-[220px]"
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
              className={`rounded-full bg-[#262626] font-bold text-white transition-colors hover:bg-black ${isScrolled ? 'px-5 py-2.5 text-[14px]' : 'px-6 py-3 text-[14px]'
                }`}
            >
              <span className="inline-flex items-center gap-2">
                <WindowsLogoIcon className="h-4 w-4" />
                <span>DOWNLOAD FREE</span>
              </span>
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
  const [viewportWidth, setViewportWidth] = useState(0);
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
  const isSmUp = viewportWidth >= 640;
  const isMdUp = viewportWidth >= 768;
  const displayValue = 'Screen 1';
  const countdownValue = stage === 'countdown' ? `${countdown}s` : '5s';
  const highlightedRow = stage === 'countdown' ? 'Countdown' : null;
  const introControlDark = isIntroApp || isRecording;
  const centerHasGradient = isIntroApp || isTransitioningToRecording || isRecording;
  const centerShowsStop = isTransitioningToRecording || isRecording;
  const widgetHeight = isMdUp ? 362 : isSmUp ? 332 : 298;
  const popupWidth = isMdUp ? 300 : isSmUp ? 276 : 252;
  const selectorTop = isMdUp ? 214 : isSmUp ? 196 : 182;
  const selectorWidth = compactSelector
    ? (isMdUp ? 224 : isSmUp ? 210 : 192)
    : (isMdUp ? 308 : isSmUp ? 276 : 244);
  const controlSizeClassName = isMdUp ? 'h-[52px] w-[52px]' : isSmUp ? 'h-12 w-12' : 'h-11 w-11';
  const controlIconClassName = isMdUp ? 'h-5 w-5' : isSmUp ? 'h-[18px] w-[18px]' : 'h-4 w-4';
  const centerControlSizeClassName = isMdUp ? 'h-[72px] w-[72px]' : isSmUp ? 'h-[68px] w-[68px]' : 'h-[60px] w-[60px]';
  const centerIconClassName = isMdUp ? 'h-6 w-6' : isSmUp ? 'h-[22px] w-[22px]' : 'h-5 w-5';
  const centerDotClassName = isMdUp ? 'h-8 w-8' : isSmUp ? 'h-7 w-7' : 'h-6 w-6';
  const settingsRows = [
    {
      label: 'Display',
      value: displayValue,
      icon: ScreenIcon,
      toggle: true,
      toggleColor: activeMode === 0 ? 'accent-red' : '#46d478',
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
    const handleResize = () => setViewportWidth(window.innerWidth);

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timeoutIds: number[] = [];

    if (stage === 'intro-app') {
      timeoutIds.push(window.setTimeout(() => setStage('settings-open'), 1580));
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
      className="relative w-full max-w-[360px]"
      style={{ height: widgetHeight }}
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
            style={{ width: popupWidth }}
            className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col gap-3 rounded-[34px] bg-[#d9d9d9] px-5 py-4 text-[#262626] sm:gap-3.5 sm:px-5 sm:py-[1.125rem] md:rounded-[38px] md:px-6 md:py-5"
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
                  className="flex items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="flex w-full items-center justify-between gap-3 sm:gap-4">
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
                      className="flex items-center gap-1.5 text-[11px] font-medium tracking-[-0.01em] text-[#111111] sm:gap-2 sm:text-[11.5px] md:text-[12px]"
                    >
                      <Icon className="h-3 w-3 shrink-0 md:h-[13px] md:w-[13px]" />
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
                      className="flex h-5 min-w-[86px] items-center justify-center gap-1.5 rounded-full bg-black px-2.5 text-[11px] font-medium text-[#d9d9d9] sm:min-w-[92px] sm:gap-2 sm:px-3 sm:text-[11.5px] md:min-w-[100px] md:text-[12px]"
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
                        <motion.span className="relative h-[9px] w-5 overflow-hidden rounded-[5px] bg-[#262626] md:h-[10px] md:w-[22px]">
                          <motion.span
                            animate={{ opacity: toggleActive ? 1 : 0 }}
                            transition={{ duration: 0.24, ease: smoothEase }}
                            className="absolute inset-0 rounded-[5px]"
                            style={{ background: 'linear-gradient(90deg, #262626 0%, #8c8c8c 100%)' }}
                          />
                          <motion.span
                            animate={{
                              x: toggleActive ? 13 : 2,
                              scale: toggleActive ? 1 : [1, 1.08, 1],
                              opacity: toggleActive ? 1 : [0.86, 1, 0.86]
                            }}
                            transition={{
                              x: buttonSpring,
                              scale: toggleActive
                                ? { duration: 0.18, ease: smoothEase }
                                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                              opacity: toggleActive
                                ? { duration: 0.18, ease: smoothEase }
                                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                            }}
                            className="absolute top-[1.5px] h-1.5 w-1.5 overflow-hidden rounded-full md:h-[7px] md:w-[7px]"
                          >
                            <motion.span
                              animate={{ opacity: toggleColor === 'accent-red' ? 1 : 0 }}
                              transition={{ duration: 0.2, ease: smoothEase }}
                              className="accent-red-surface absolute inset-0"
                            />
                            <motion.span
                              animate={{ opacity: toggleColor === 'accent-red' ? 0 : 1 }}
                              transition={{ duration: 0.2, ease: smoothEase }}
                              className="absolute inset-0 rounded-full"
                              style={{ backgroundColor: toggleColor === 'accent-red' ? '#46d478' : (toggleColor ?? '#46d478') }}
                            />
                          </motion.span>
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
            className="absolute left-1/2 flex h-9 -translate-x-1/2 items-center rounded-full bg-[#262626] px-1.5 sm:h-10 sm:px-2"
          >
            <div className="relative flex h-6 w-full items-center gap-1.5 sm:gap-2">
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
                          <Icon className={`h-3 w-3 md:h-[13px] md:w-[13px] ${isActive ? 'text-white' : 'text-[#d9d9d9]'}`} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`${label}-expanded`}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: smoothEase }}
                          className="flex items-center gap-1 text-[#111111] sm:gap-1.5"
                        >
                          <Icon className="h-[10px] w-[10px] sm:h-[11px] sm:w-[11px]" />
                          <span className="text-[10px] font-medium tracking-[-0.01em] sm:text-[11px] md:text-[12px]">{label}</span>
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

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-4 sm:gap-5 md:gap-6">
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
          className={`relative flex items-center justify-center rounded-full ${controlSizeClassName}`}
        >
          <AudioIcon className={controlIconClassName} />
          <AnimatePresence initial={false}>
            {isRecording ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={buttonSpring}
                className="absolute right-[10px] top-[9px] h-1.5 w-1.5 rounded-full bg-[#46d478]"
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
          className={`relative flex items-center justify-center rounded-full ${controlSizeClassName}`}
        >
          <RecordIcon className={controlIconClassName} />
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
                className="absolute right-[10px] top-[9px] h-1.5 w-1.5 rounded-full bg-[#46d478]"
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
          className={`relative flex items-center justify-center overflow-hidden rounded-full bg-black ${centerControlSizeClassName}`}
        >
          <motion.span
            animate={{ opacity: centerHasGradient ? 1 : 0 }}
            transition={{ duration: 0.28, ease: smoothEase }}
            className="absolute inset-0"
            style={accentRedSurfaceStyle}
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
                <SquareIcon className={`${centerIconClassName} fill-white text-white`} />
              </motion.div>
            ) : (
              <motion.div
                key={centerHasGradient ? 'armed' : 'idle'}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={buttonSpring}
                className={`relative z-10 rounded-full bg-white ${centerDotClassName}`}
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
          className={`flex items-center justify-center rounded-full ${controlSizeClassName}`}
        >
          <SettingsIcon className={controlIconClassName} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const heroTitleLines = [
  'Record your screen in',
  '120fps with zero',
  'friction',
] as const;

const sectionClassName = 'mx-auto max-w-[1400px] bg-[#F8FAFC] px-4 py-14 sm:px-6 sm:py-16 md:py-[4.5rem] lg:py-20';
const sectionHeaderClassName = 'mb-10 flex flex-col items-start justify-between gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:gap-10';
const sectionHeaderCopyClassName = 'w-full max-w-md lg:max-w-sm lg:pb-1';
const heroTitleClassName = 'max-w-4xl text-[clamp(3rem,15vw,4.6rem)] font-bold tracking-tight text-[#262626] leading-[1.02] sm:text-[4.25rem] md:text-6xl lg:text-[5.5rem]';
const sectionTitleClassName = 'max-w-3xl text-[clamp(3rem,15vw,4.25rem)] font-bold leading-[1.02] tracking-tight text-[#262626] sm:text-[3.6rem] md:text-6xl lg:text-[4.5rem]';
const sectionTitleDarkClassName = 'text-[clamp(3rem,15vw,4.25rem)] font-bold tracking-tight text-white leading-[1.02] sm:text-[3.6rem] md:text-6xl lg:text-[4.5rem]';
const sectionCopyClassName = 'text-lg font-normal leading-relaxed text-[#262626] sm:text-xl';
const sectionCopyDarkClassName = 'max-w-md text-lg font-normal leading-relaxed text-white/70 sm:text-xl';
const sectionCardClassName = 'rounded-[32px] bg-[#d8d8d8] p-6 sm:rounded-[40px] sm:p-8 lg:p-10';
const priceValueClassName = 'text-[clamp(4.5rem,24vw,5.75rem)] font-bold leading-none tracking-tighter md:text-[5.75rem] xl:text-[6.5rem]';

const Hero = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0.6);

  const heroEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const heroTitleDelay = 0.18;
  const heroTitleStagger = 0.12;
  const heroContentDelay = heroTitleDelay + (heroTitleLines.length * heroTitleStagger) + 0.15;

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
    <section className="mx-auto max-w-[1400px] bg-[#F8FAFC] px-4 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 md:pb-[4.5rem] md:pt-10 lg:pb-20 lg:pt-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-10 sm:gap-8 lg:mb-12 lg:flex-row lg:items-end lg:gap-10">
        {/* Animation 1-3: Title lines slide from right to left */}
        <h1 className={heroTitleClassName}>
          {heroTitleLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: 80, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.92,
                delay: heroTitleDelay + i * heroTitleStagger,
                ease: heroEase,
              }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <div className="flex w-full max-w-sm flex-col gap-5 lg:pb-2">
          {/* Animation 4: Description and button slide from top */}
          <motion.p
            initial={{ opacity: 0, y: -28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.82,
              delay: heroContentDelay,
              ease: heroEase,
            }}
            className={sectionCopyClassName}
          >
            Unlock professional screen capture with our premium solutions.
          </motion.p>

          {/* Animation 5: Button slides from top + subtle glow blink */}
          <motion.button
            initial={{ opacity: 0, y: -22, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.82,
              delay: heroContentDelay + 0.1,
              ease: heroEase,
            }}
            className="relative w-fit overflow-hidden rounded-full bg-[#262626] px-6 py-3.5 text-[13px] font-bold tracking-wide text-white transition-colors hover:bg-black sm:px-8 sm:py-4 sm:text-sm"
          >
            {/* Glow sweep overlay */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.35, 0],
                background: [
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)',
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                ],
              }}
              transition={{
                duration: 2.4,
                delay: heroContentDelay + 0.9,
                repeat: Infinity,
                repeatDelay: 3.6,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 pointer-events-none"
            />
            <span className="relative z-10 inline-flex items-center gap-2">
              <WindowsLogoIcon className="h-4 w-4" />
              <span>DOWNLOAD FREE</span>
            </span>
          </motion.button>
        </div>
      </div>

      {/* Visual Area */}
      <div className="relative h-[360px] w-full overflow-hidden rounded-[28px] bg-[#e5e5e5] sm:h-[420px] sm:rounded-[32px] md:h-[560px] lg:h-[620px] lg:rounded-[40px] xl:h-[700px]">
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
        <div className="absolute inset-0 z-10 flex items-center justify-center px-2 sm:px-4 md:px-0">
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
      className="mt-6 sm:mt-8"
    >
      <div className="pt-8 sm:pt-10">
        <div className="mb-8 sm:mb-10">
          <div className="max-w-4xl">
            <h3 className="text-[clamp(2.25rem,11vw,3.25rem)] font-bold leading-[1.02] tracking-tight text-[#262626] sm:text-4xl md:text-5xl">
              Leave one strong screen here and swap in your video later.
            </h3>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#262626] p-2.5 shadow-[0_34px_80px_-34px_rgba(38,38,38,0.45)] sm:rounded-[36px] sm:p-3">
          <div className="overflow-hidden rounded-[24px] bg-[#f2f2f2] sm:rounded-[30px]">
            <div className="bg-[linear-gradient(135deg,#314e56_0%,#527278_48%,#9ab1b4_100%)] p-2.5 sm:p-3 md:p-4">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-white/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%),linear-gradient(145deg,rgba(12,18,20,0.18),rgba(12,18,20,0.48))] sm:rounded-[28px]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_34%,rgba(255,255,255,0.05)_100%)]" />
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
      icon: EyesIcon,
      iconClassName: 'text-[#262626] group-hover:text-white',
      badgeStartsAccent: false,
      title: "120 FPS",
      description: "Silky s   mooth recordings perfect for gaming, high-end UI demonstrations, and professional tutorials. Zero dropped frames."
    },
    {
      icon: SelectionIcon,
      iconClassName: 'text-[#262626] group-hover:text-white',
      badgeStartsAccent: false,
      title: "Precision Selection",
      description: "Instantly snap to windows, select custom regions, or record your entire display with a single click."
    },
    {
      icon: RecordIcon,
      iconClassName: 'text-[#262626] group-hover:text-white',
      badgeStartsAccent: false,
      title: "Studio Audio",
      description: "Capture system audio and your microphone on separate tracks for ultimate control in post-production."
    },
    {
      icon: WindowIcon,
      iconClassName: 'text-[#262626] group-hover:text-white',
      badgeStartsAccent: false,
      title: "Floating UI",
      description: "Our unobtrusive floating widget stays out of your way while giving you instant access to controls."
    },
    {
      icon: NoWatermarkIcon,
      iconClassName: 'text-[#262626] group-hover:text-white',
      badgeStartsAccent: false,
      title: "No Watermark",
      description: "Your recordings stay clean from start to finish. No branding stamped over your work, even on the free plan."
    },
    {
      icon: SpeedIcon,
      iconClassName: 'text-[#262626] group-hover:text-white',
      badgeStartsAccent: false,
      title: "Built for Speed",
      description: "Launch fast, record fast, and move on. Simple Recorder is optimized to feel instant, lightweight, and reliable every time."
    },
  ] as const;

  return (
    <section id="features" className={sectionClassName}>
      <div className={sectionHeaderClassName}>
        <h2 className={sectionTitleClassName}>
          {/* Animation 1: "Everything you need." slides left to right */}
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything you need.
          </motion.span>
          {/* Animation 2: "Nothing you don't." slides left to right (staggered) */}
          <motion.span
            className="block text-[#262626]/40"
            initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Nothing you don&apos;t.
          </motion.span>
        </h2>
        <div className={sectionHeaderCopyClassName}>
          {/* Animation 3: Description slides bottom to top */}
          <motion.p
            className={sectionCopyClassName}
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.82, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            Built for instant captures and high-fidelity exports. Get professional results without the cluttered workflow.
          </motion.p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {features.map(({ icon: Icon, iconClassName, badgeStartsAccent, title, description }, idx) => {
          const row = Math.floor(idx / 2);
          const col = idx % 2;
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: row * 0.12 + col * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`${sectionCardClassName} group flex h-full min-h-[280px] flex-col justify-between transition-colors hover:bg-[#cecece] sm:min-h-[320px]`}
            >
              <div className="relative mb-10 h-14 w-14 sm:mb-12 sm:h-16 sm:w-16">
                <span
                  className={`absolute inset-0 rounded-full shadow-sm transition-all duration-300 ${badgeStartsAccent ? 'accent-red-surface opacity-100 group-hover:opacity-0' : 'bg-white opacity-100 group-hover:opacity-0'
                    }`}
                  style={badgeStartsAccent ? accentRedSurfaceStyle : undefined}
                />
                <span
                  className={`absolute inset-0 rounded-full shadow-sm transition-all duration-300 ${badgeStartsAccent ? 'bg-white opacity-0 group-hover:opacity-100' : 'accent-red-surface opacity-0 group-hover:opacity-100'
                    }`}
                  style={!badgeStartsAccent ? accentRedSurfaceStyle : undefined}
                />
                <div className="relative flex h-14 w-14 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                  <Icon className={`h-7 w-7 transition-colors duration-300 sm:h-8 sm:w-8 ${iconClassName}`} />
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-[#262626] sm:text-3xl">{title}</h3>
                <p className="text-base font-normal leading-relaxed text-[#262626]/70 sm:text-lg">{description}</p>
              </div>
            </motion.div>
          )
        }
        )}
      </div>

      <FeatureWorkflowMockup />
    </section>
  );
};

const Pricing = () => (
  <section id="pricing" className={sectionClassName}>
    <div className={sectionHeaderClassName}>
      <h2 className={sectionTitleClassName}>
        {/* Animation 1: "Simple pricing." slides left to right */}
        <motion.span
          className="block"
          initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
        >
          Simple pricing.
        </motion.span>
        {/* Animation 2: "No surprises." with dramatic "No" reveal */}
        <span className="block text-[#262626]/40">
          <motion.span
            className="inline-block"
            style={{ color: 'var(--accent-red-solid)' }}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            No
          </motion.span>
          {' '}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            surprises.
          </motion.span>
        </span>
      </h2>
      <div className={sectionHeaderCopyClassName}>
        {/* Animation 3: Description slides bottom to top */}
        <motion.p
          className={sectionCopyClassName}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.82, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          Pay once, own it forever. No subscriptions, no recurring fees.
        </motion.p>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-px overflow-hidden rounded-[32px] bg-[#cecece] sm:rounded-[40px] lg:grid-cols-2"
    >
      {/* Starter — Free */}
      <div className="flex flex-col bg-[#d8d8d8] p-6 sm:p-8 md:p-8 xl:p-16">
        {/* Plan header */}
        <div className="mb-10 sm:mb-12 xl:mb-14">
          <div className="mb-4 flex flex-col items-start gap-2 sm:mb-5 sm:flex-row sm:items-center sm:gap-3">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#262626]/40">
              Starter
            </p>
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#262626]/60 bg-[#262626]/10 px-3 py-1 rounded-full">
              Free forever
            </span>
          </div>
          <div className="mb-4 flex items-baseline gap-2 sm:mb-5">
            <span className={`${priceValueClassName} text-[#262626]`}>
              $0
            </span>
          </div>
          <p className="text-base font-normal leading-relaxed text-[#262626]/60 sm:text-lg">
            Everything you need for clean, fast screen recording — completely free, forever.
          </p>
        </div>

        {/* Features */}
        <div className="mb-10 flex-grow sm:mb-12 xl:mb-14">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#262626]/40 mb-6">
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-4 sm:gap-5">
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
              <li key={i} className="flex items-start gap-4 text-base font-normal text-[#262626]/80 sm:text-lg">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckIcon className="w-4 h-4 text-[#262626]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button className="w-full cursor-pointer rounded-full bg-white py-4 text-base font-bold text-[#262626] shadow-sm transition-colors hover:bg-[#F8FAFC] sm:py-5 sm:text-lg">
          <span className="inline-flex items-center gap-2">
            <WindowsLogoIcon className="h-5 w-5" />
            <span>Download Free</span>
          </span>
        </button>
      </div>

      {/* Pro — One-time */}
      <div className="relative flex flex-col bg-[#262626] p-6 sm:p-8 md:p-8 xl:p-16">
        {/* Plan header */}
        <div className="mb-10 sm:mb-12 xl:mb-14">
          <div className="mb-4 flex flex-col items-start gap-2 sm:mb-5 sm:flex-row sm:items-center sm:gap-3">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/40">
              Pro
            </p>
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-white bg-white/10 px-3 py-1 rounded-full">
              One-time purchase
            </span>
          </div>
          <div className="mb-4 flex items-baseline gap-2 sm:mb-5">
            <span className={`${priceValueClassName} text-white`}>
              $5
            </span>
          </div>
          <p className="text-base font-normal leading-relaxed text-white/60 sm:text-lg">
            Unlock the full power of Simple Recorder with a single payment. Yours forever.
          </p>
        </div>

        {/* Features */}
        <div className="mb-10 flex-grow sm:mb-12 xl:mb-14">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/35 mb-6">
            Everything in Starter, plus
          </p>
          <ul className="flex flex-col gap-4 sm:gap-5">
            {[
              'Record at your monitor\'s refresh rate',
              'Up to 4K resolution',
              'System + microphone audio',
              'Separate audio channels',
              'Advanced export formats',
              'Priority support',
              'Future updates included'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-base font-normal text-white/80 sm:text-lg">
                <div className="accent-red-surface w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={accentRedSurfaceStyle}>
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          className="accent-red-surface w-full cursor-pointer rounded-full py-4 text-base font-bold text-white transition-[filter] hover:brightness-110 sm:py-5 sm:text-lg"
          style={accentRedSurfaceStyle}
        >
          Get Lifetime Access
        </button>
      </div>
    </motion.div>
  </section>
);

const Contact = () => (
  <section id="contact" className={sectionClassName}>
    <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px]">
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
      <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-10">
        <div className="flex flex-col items-start gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:gap-16">
          {/* Left side: Title */}
          <div className="w-full lg:w-1/2">
            <h2 className={`${sectionTitleDarkClassName} mb-5 max-w-[10ch] sm:mb-6`}>
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
              >
                Have questions?
              </motion.span>
              <motion.span
                className="block text-white/40"
                initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.88, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                Let&apos;s talk.
              </motion.span>
            </h2>
            <motion.p
              className={sectionCopyDarkClassName}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.82, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              Our team is here to help. Send us a message and we&apos;ll respond within 24 hours.
            </motion.p>
          </div>

          {/* Right side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:rounded-[32px] sm:p-6 md:p-8 lg:w-1/2 lg:p-10">

            <form className="flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                <div className="flex min-w-0 flex-col gap-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="accent-red-focus-ring w-full min-w-0 rounded-2xl border-none bg-white/10 px-5 py-3.5 text-base font-normal text-white placeholder:text-white/30 transition-all focus:outline-none sm:px-6 sm:py-4 sm:text-lg"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="accent-red-focus-ring w-full min-w-0 rounded-2xl border-none bg-white/10 px-5 py-3.5 text-base font-normal text-white placeholder:text-white/30 transition-all focus:outline-none sm:px-6 sm:py-4 sm:text-lg"
                  />
                </div>
              </div>
              <div className="flex min-w-0 flex-col gap-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="accent-red-focus-ring w-full min-w-0 resize-none rounded-2xl border-none bg-white/10 px-5 py-3.5 text-base font-normal text-white placeholder:text-white/30 transition-all focus:outline-none sm:px-6 sm:py-4 sm:text-lg"
                />
              </div>
              <button
                className="accent-red-surface mt-2 w-full rounded-full py-4 text-base font-bold text-white transition-[filter] hover:brightness-110 sm:mt-4 sm:py-5 sm:text-lg"
                style={accentRedSurfaceStyle}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <div
    className="border-b border-[#cecece] last:border-b-0"
  >
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-4 py-6 text-left sm:py-8"
    >
      <span className="pr-4 text-lg font-bold text-[#262626] transition-colors group-hover:text-[#da3036] sm:pr-8 sm:text-xl md:text-2xl">
        {question}
      </span>
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-12 sm:w-12 ${isOpen ? 'accent-red-surface rotate-0' : 'bg-[#d8d8d8] group-hover:bg-[#cecece]'
          }`}
        style={isOpen ? accentRedSurfaceStyle : undefined}
      >
        {isOpen ? (
          <MinusIcon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        ) : (
          <PlusIcon className="h-4 w-4 text-[#262626] sm:h-5 sm:w-5" />
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
          <p className="max-w-3xl pb-6 text-base font-normal leading-relaxed text-[#262626]/60 sm:pb-8 sm:text-lg">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
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
    <section id="faq" className={sectionClassName}>
      <div className={sectionHeaderClassName}>
        <h2 className={sectionTitleClassName}>
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
          >
            Got questions?
          </motion.span>
          <motion.span
            className="block text-[#262626]/40"
            initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            We&apos;ve got answers.
          </motion.span>
        </h2>
        <div className={sectionHeaderCopyClassName}>
          <motion.p
            className={sectionCopyClassName}
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.82, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything you need to know about SimpleRecorder before getting started.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 rounded-[32px] bg-[#d8d8d8] p-6 sm:rounded-[40px] sm:p-8 md:p-10"
      >
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </motion.div>
    </section>
  );
};

const Footer = () => (
  <footer className="mt-4 px-4 sm:mt-6 sm:px-6">
    <div className="mx-auto max-w-[1400px] rounded-t-[32px] bg-[#262626] p-3 sm:rounded-t-[40px] sm:p-4 md:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.66fr)]">
        <div className="px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
          <div className="flex items-center gap-3">
            <AppLogo className="w-8 h-8" />
            <span className="font-bold text-lg tracking-tight text-white">Simple Recorder</span>
          </div>

          <div className="mt-auto flex flex-col items-start gap-5 pt-10 sm:gap-6 sm:pt-12 md:pt-16">
            <motion.h2
              className="max-w-[9ch] text-left text-[clamp(2.5rem,12vw,3.5rem)] font-bold tracking-tight text-white md:text-5xl lg:text-[3.7rem] lg:leading-[0.98]"
              initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
            >
              Ready to record?
            </motion.h2>
            <motion.button
              className="rounded-full bg-white px-8 py-4 text-base font-bold text-[#262626] transition-colors hover:bg-[#d8d8d8] sm:px-10 sm:py-5 sm:text-lg"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.82, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2">
                <WindowsLogoIcon className="h-5 w-5" />
                <span>DOWNLOAD FREE</span>
              </span>
            </motion.button>
          </div>
        </div>

        <div className="flex min-h-[320px] flex-col rounded-[28px] border border-white/10 bg-white/[0.06] px-6 py-6 sm:min-h-[372px] sm:rounded-[32px] sm:px-8 sm:py-8 md:px-10 md:py-10">
          <div className="grid w-full gap-8 sm:gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-x-16 lg:gap-x-24">
            <div className="flex flex-col items-start gap-5">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/38">
                LEGAL
              </span>
              <div className="flex flex-col items-start gap-3 sm:gap-4 md:gap-5">
                <a href="#" className="text-[1.45rem] font-bold leading-none tracking-tight text-white transition-colors hover:text-white/70 sm:text-[1.65rem] md:text-[2.05rem]">
                  Privacy Policy
                </a>
                <a href="#" className="text-[1.45rem] font-bold leading-none tracking-tight text-white transition-colors hover:text-white/70 sm:text-[1.65rem] md:text-[2.05rem]">
                  Terms of Service
                </a>
              </div>
            </div>
            <div className="flex flex-col items-start gap-5">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/38">
                LINKS
              </span>
              <div className="flex flex-col items-start gap-3 sm:gap-4 md:gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[1.45rem] font-bold leading-none tracking-tight text-white transition-colors hover:text-white/70 sm:text-[1.65rem] md:text-[2.05rem]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-10 text-left text-sm font-normal text-white/40 sm:pt-14 md:pt-16">
            © {new Date().getFullYear()} Simple Recorder. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
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
