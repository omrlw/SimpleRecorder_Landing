'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AudioIcon,
  ClockIcon,
  EyesIcon,
  MinusIcon,
  PaperclipIcon,
  PlusIcon,
  RecordIcon,
  ScreenIcon,
  SelectionIcon,
  SettingsIcon,
  SquareIcon,
  WindowsLogoIcon,
  WindowIcon
} from '@/components/icons';

const accentRedSurfaceStyle = {
  backgroundImage: 'var(--accent-red-gradient)',
  backgroundColor: 'var(--accent-red-solid)'
} satisfies React.CSSProperties;

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

export const Navbar = () => {
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


const heroTitleClassName = 'max-w-4xl text-[clamp(3rem,15vw,4.6rem)] font-bold tracking-tight text-[#262626] leading-[1.02] sm:text-[4.25rem] md:text-6xl lg:text-[5.5rem]';
const sectionClassName = 'mx-auto max-w-[1400px] bg-[#F8FAFC] px-4 py-14 sm:px-6 sm:py-16 md:py-[4.5rem] lg:py-20';
const sectionHeaderClassName = 'mb-10 flex flex-col items-start justify-between gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:gap-10';
const sectionHeaderCopyClassName = 'w-full max-w-md lg:max-w-sm lg:pb-1';
const sectionTitleClassName = 'max-w-3xl text-[clamp(3rem,15vw,4.25rem)] font-bold leading-[1.02] tracking-tight text-[#262626] sm:text-[3.6rem] md:text-6xl lg:text-[4.5rem]';
const sectionCopyClassName = 'text-lg font-normal leading-relaxed text-[#262626] sm:text-xl';

export const Hero = () => {
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
          preload="metadata"
          poster="/images/background-window1.webp"
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


export const FAQ = () => {
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
