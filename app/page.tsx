'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Monitor,
  AppWindow,
  Maximize,
  Mic,
  Video,
  Settings,
  Check,
  Zap,
  Layers,
  Square,
  Clock,
  Paperclip,
  Eye,
  Plus,
  Minus
} from 'lucide-react';

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

const Navbar = () => (
  <nav className="w-full px-6 py-6 flex items-center justify-between bg-[#F8FAFC] max-w-[1400px] mx-auto">
    <div className="flex items-center gap-3">
      <AppLogo className="w-10 h-10" />
      <span className="font-bold text-lg tracking-tight text-[#262626]">Simple Recorder</span>
    </div>
    <div className="hidden md:flex items-center gap-2">
      <a href="#features" className="bg-[#d8d8d8] hover:bg-[#cecece] cursor-pointer transition-colors px-5 py-2.5 rounded-full text-sm font-bold text-[#262626] flex items-center gap-2">
        Features
      </a>
      <a href="#pricing" className="px-5 py-2.5 text-sm font-bold text-[#262626] hover:text-black transition-colors">Pricing</a>
      <a href="#faq" className="px-5 py-2.5 text-sm font-bold text-[#262626] hover:text-black transition-colors">FAQ</a>
      <a href="#contact" className="px-5 py-2.5 text-sm font-bold text-[#262626] hover:text-black transition-colors">Contact</a>
      <a href="#pricing" className="bg-[#262626] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-colors">
        DOWNLOAD FREE
      </a>
    </div>
  </nav>
);

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
    { label: 'Screen 1', icon: Monitor },
    { label: 'Window', icon: AppWindow },
    { label: 'Region', icon: Maximize }
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
  const centerHasGradient = isIntroApp;
  const centerIsFlatRed = isTransitioningToRecording || isRecording;
  const centerShowsStop = isTransitioningToRecording || isRecording;
  const selectorTop = 214;
  const selectorWidth = compactSelector ? 224 : 308;
  const settingsRows = [
    {
      label: 'Display',
      value: displayValue,
      icon: Monitor,
      toggle: true,
      toggleColor: activeMode === 0 ? '#fb2c36' : '#46d478',
      toggleActive: activeMode !== 0
    },
    {
      label: 'Microphone',
      value: 'External mic',
      icon: Mic,
      toggle: false,
      toggleColor: null,
      toggleActive: false
    },
    {
      label: 'Quality',
      value: '120fps',
      icon: Eye,
      toggle: false,
      toggleColor: null,
      toggleActive: false
    },
    {
      label: 'Countdown',
      value: countdownValue,
      icon: Clock,
      toggle: false,
      toggleColor: null,
      toggleActive: false
    },
    {
      label: 'Save to',
      value: 'Desktop/',
      icon: Paperclip,
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
      setCountdown(3);
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
                      <Icon className="h-[13px] w-[13px] shrink-0 stroke-[2.2]" />
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
                          <Icon className={`h-[13px] w-[13px] ${isActive ? 'text-white' : 'text-[#d9d9d9]'}`} strokeWidth={2.1} />
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
                          <Icon className="h-[11px] w-[11px]" strokeWidth={2.1} />
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
          <Mic className="h-5 w-5" />
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
          <Video className="h-5 w-5" />
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
            boxShadow: centerHasGradient || centerIsFlatRed ? '0 0 0 rgba(0,0,0,0)' : '0 16px 24px rgba(0,0,0,0.16)'
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
          <motion.span
            animate={{ opacity: centerIsFlatRed ? 1 : 0 }}
            transition={{ duration: 0.18, ease: smoothEase }}
            className="absolute inset-0 bg-[#fb2c36]"
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
                <Square className="h-6 w-6 fill-white text-white" />
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
          <Settings className="h-5 w-5" />
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

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      iconBg: "bg-[#fb2c36]",
      title: "120fps Capture",
      description: "Silky smooth recordings perfect for gaming, high-end UI demonstrations, and professional tutorials. Zero dropped frames."
    },
    {
      icon: <Maximize className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "Precision Selection",
      description: "Instantly snap to windows, select custom regions, or record your entire display with a single click."
    },
    {
      icon: <Mic className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "Studio Audio",
      description: "Capture system audio and your microphone on separate tracks for ultimate control in post-production."
    },
    {
      icon: <Layers className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "Floating UI",
      description: "Our unobtrusive floating widget stays out of your way while giving you instant access to controls."
    },
    {
      icon: <Layers className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "No Watermark",
      description: "Your recordings stay clean from start to finish. No branding stamped over your work, even on the free plan."
    },
    {
      icon: <Layers className="w-8 h-8 text-[#262626]" />,
      iconBg: "bg-white",
      title: "Built for Speed",
      description: "Launch fast, record fast, and move on. Simple Recorder is optimized to feel instant, lightweight, and reliable every time."
    }
  ];

  return (
    <section id="features" className="py-32 px-6 bg-[#F8FAFC] max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
        <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#262626] max-w-3xl leading-[1.05]">
          Everything you need.<br />
          <span className="text-[#262626]/40">Nothing you don't.</span>
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
            key={idx}
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
    </section>
  );
};

const Pricing = () => (
  <section id="pricing" className="py-32 px-6 bg-[#F8FAFC] max-w-[1400px] mx-auto">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
      <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#262626] max-w-3xl leading-[1.05]">
        Simple pricing.<br />
        <span className="text-[#262626]/40">No surprises.</span>
      </h2>
      <div className="max-w-sm pb-2">
        <p className="text-xl text-[#262626] font-normal leading-relaxed">
          Start for free, upgrade when you need professional power.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Free Tier */}
      <div className="bg-[#d8d8d8] p-10 md:p-14 rounded-[40px] flex flex-col">
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-[#262626] mb-4 tracking-tight">Starter</h3>
          <p className="text-lg text-[#262626]/60 font-normal">Perfect for quick captures.</p>
        </div>
        <div className="mb-12">
          <span className="text-7xl font-bold tracking-tight text-[#262626]">$0</span>
          <span className="text-xl text-[#262626]/60 font-normal ml-2">/forever</span>
        </div>
        <ul className="flex flex-col gap-5 mb-12 flex-grow">
          {['1080p recording', 'Up to 5 minutes per clip', 'Basic audio capture', 'Standard support'].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-lg text-[#262626]/80 font-normal">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-[#262626]" />
              </div>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full py-5 rounded-full font-bold text-[#262626] bg-white hover:bg-[#F8FAFC] transition-colors text-lg">
          Download Free
        </button>
      </div>

      {/* Pro Tier */}
      <div className="bg-[#262626] p-10 md:p-14 rounded-[40px] flex flex-col relative overflow-hidden">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-white tracking-tight">Pro</h3>
            <div className="bg-[#fb2c36] text-white text-xs font-bold px-4 py-1.5 rounded-full">
              MOST POPULAR
            </div>
          </div>
          <p className="text-lg text-white/60 font-normal">For creators and professionals.</p>
        </div>
        <div className="mb-12">
          <span className="text-7xl font-bold tracking-tight text-white">$9</span>
          <span className="text-xl text-white/60 font-normal ml-2">/month</span>
        </div>
        <ul className="flex flex-col gap-5 mb-12 flex-grow">
          {['120fps 4K recording', 'Unlimited recording time', 'Multi-track studio audio', 'Custom watermarks', 'Priority support'].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-lg text-white/90 font-normal">
              <div className="w-6 h-6 rounded-full bg-[#fb2c36] flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full py-5 rounded-full font-bold text-white bg-[#fb2c36] hover:bg-[#e02730] transition-colors text-lg shadow-lg shadow-[#fb2c36]/20">
          Get Pro Now
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
              <span className="text-white/40">Let's talk.</span>
            </h2>
            <p className="text-xl text-white/70 font-normal leading-relaxed max-w-md">
              Our team is here to help. Send us a message and we'll respond within 24 hours.
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
          <Minus className="w-5 h-5 text-white" />
        ) : (
          <Plus className="w-5 h-5 text-[#262626]" />
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
        <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#262626] max-w-3xl leading-[1.05]">
          Got questions?<br />
          <span className="text-[#262626]/40">We've got answers.</span>
        </h2>
        <div className="max-w-sm pb-2">
          <p className="text-xl text-[#262626] font-normal leading-relaxed">
            Everything you need to know about SimpleRecorder before getting started.
          </p>
        </div>
      </div>

      <div className="bg-[#d8d8d8] rounded-[40px] p-10 md:p-14">
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
  <footer className="bg-black pt-24 pb-12 px-6 mt-12 rounded-t-[40px] max-w-[1400px] mx-auto mb-6">
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
