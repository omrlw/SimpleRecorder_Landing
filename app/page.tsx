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
  Circle, 
  Check, 
  Zap, 
  Layers, 
  ChevronDown,
  Play,
  MicOff,
  VideoOff,
  Square,
  ArrowRight,
  Mail,
  MessageSquare,
  Clock,
  Paperclip,
  Eye
} from 'lucide-react';

// --- Components ---

const AppLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 36C0 16.1178 16.1178 0 36 0C55.8823 0 72 16.1178 72 36C72 55.8823 55.8823 72 36 72C16.1178 72 0 55.8823 0 36Z" fill="url(#paint0_linear_1_100)"/>
    <path d="M36 48C42.6274 48 48 42.6274 48 36C48 29.3726 42.6274 24 36 24C29.3726 24 24 29.3726 24 36C24 42.6274 29.3726 48 36 48Z" fill="white" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_1_100" x1="36" y1="0" x2="36" y2="72" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB2C36"/>
        <stop offset="1" stopColor="#951A20"/>
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = () => (
  <nav className="w-full px-6 py-6 flex items-center justify-between bg-white max-w-[1400px] mx-auto">
    <div className="flex items-center gap-3">
      <AppLogo className="w-10 h-10" />
      <span className="font-bold text-lg tracking-tight text-[#262626]">Simple Recorder</span>
    </div>
    <div className="hidden md:flex items-center gap-2">
      <a href="#features" className="bg-[#f0f0f0] hover:bg-[#e5e5e5] cursor-pointer transition-colors px-5 py-2.5 rounded-full text-sm font-medium text-[#262626] flex items-center gap-2">
        Features
      </a>
      <a href="#pricing" className="px-5 py-2.5 text-sm font-medium text-[#262626] hover:text-black transition-colors">Pricing</a>
      <a href="#contact" className="px-5 py-2.5 text-sm font-medium text-[#262626] hover:text-black transition-colors">Contact</a>
      <a href="#pricing" className="bg-[#262626] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
        DOWNLOAD FREE
      </a>
    </div>
  </nav>
);

const AnimatedWidget = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRecording(prev => !prev);
      if (!isRecording) {
        setShowSettings(false);
      } else {
        setTimeout(() => setShowSettings(true), 1000);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Settings Popover */}
      <AnimatePresence>
        {showSettings && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-[#e5e5e5]/95 backdrop-blur-xl p-5 rounded-[32px] shadow-2xl border border-white/40 w-80 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#262626]">
                <Monitor className="w-4 h-4" /> Display
              </div>
              <div className="bg-black text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-medium">
                Screen 1 <div className="w-2 h-2 rounded-full bg-[#fb2c36]" />
              </div>
            </div>
            <div className="w-full border-b border-[#d9d9d9] border-dashed my-1" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#262626]">
                <Mic className="w-4 h-4" /> Microphone
              </div>
              <div className="bg-black text-white text-xs px-3 py-1.5 rounded-full font-medium">
                External mic
              </div>
            </div>
            <div className="w-full border-b border-[#d9d9d9] border-dashed my-1" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#262626]">
                <Eye className="w-4 h-4" /> Quality
              </div>
              <div className="bg-black text-white text-xs px-3 py-1.5 rounded-full font-medium">
                120fps
              </div>
            </div>
            <div className="w-full border-b border-[#d9d9d9] border-dashed my-1" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#262626]">
                <Clock className="w-4 h-4" /> Countdown
              </div>
              <div className="bg-black text-white text-xs px-3 py-1.5 rounded-full font-medium">
                5s
              </div>
            </div>
            <div className="w-full border-b border-[#d9d9d9] border-dashed my-1" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#262626]">
                <Paperclip className="w-4 h-4" /> Save to
              </div>
              <div className="bg-black text-white text-xs px-3 py-1.5 rounded-full font-medium">
                Desktop/
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Mode Selector */}
      <AnimatePresence>
        {!isRecording && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#262626] p-1.5 rounded-full flex items-center gap-1 shadow-2xl"
          >
            <div className="bg-[#d9d9d9] text-[#262626] px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Screen 1
            </div>
            <div className="text-[#d9d9d9] hover:text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors">
              <AppWindow className="w-4 h-4" /> Window
            </div>
            <div className="text-[#d9d9d9] hover:text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors">
              <Maximize className="w-4 h-4" /> Region
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Control Bar */}
      <motion.div 
        layout
        className="flex items-center gap-4"
      >
        <motion.button 
          layout
          className="w-14 h-14 rounded-full bg-[#262626] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          {isRecording ? (
            <div className="relative">
              <MicOff className="w-5 h-5 text-[#fb2c36]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#46d478]" />
            </div>
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </motion.button>

        <motion.button 
          layout
          className="w-14 h-14 rounded-full bg-[#262626] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          {isRecording ? (
            <div className="relative">
              <VideoOff className="w-5 h-5 text-[#fb2c36]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#46d478]" />
            </div>
          ) : (
            <Video className="w-5 h-5" />
          )}
        </motion.button>

        <motion.button 
          layout
          onClick={() => setIsRecording(!isRecording)}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isRecording ? 'bg-[#fb2c36] scale-95' : 'bg-[#fb2c36] hover:scale-105'}`}
        >
          {isRecording ? (
            <Square className="w-6 h-6 text-white fill-white" />
          ) : (
            <div className="w-8 h-8 bg-white rounded-full" />
          )}
        </motion.button>

        <motion.button 
          layout
          className="w-14 h-14 rounded-full bg-[#262626] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </motion.div>

    </div>
  );
};

const Hero = () => (
  <section className="px-6 pt-12 pb-24 max-w-[1400px] mx-auto bg-white">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-12">
      <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-medium tracking-tight text-[#262626] max-w-4xl leading-[1.05]">
        Record your screen in 120fps with zero friction
      </h1>
      <div className="flex flex-col gap-6 max-w-sm pb-2">
        <p className="text-xl text-[#262626] font-medium leading-relaxed">
          Unlock professional screen capture with our premium solutions.
        </p>
        <button className="bg-[#262626] text-white px-8 py-4 rounded-full w-fit text-sm font-bold tracking-wide hover:bg-black transition-colors">
          DOWNLOAD FREE
        </button>
      </div>
    </div>

    {/* Visual Area */}
    <div className="relative w-full h-[500px] md:h-[700px] rounded-[40px] overflow-hidden bg-[#e5e5e5]">
      {/* Background Image / Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2c4a52] to-[#5a7d7f] opacity-90" />
      <img 
        src="https://picsum.photos/seed/abstract/1920/1080?blur=4" 
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" 
        alt=""
        referrerPolicy="no-referrer"
      />
      
      {/* Cutouts (Simulated with white divs matching the page background) */}
      {/* Top Cutout */}
      <div className="absolute -top-16 left-[25%] w-24 h-32 bg-white rounded-full" />
      {/* Bottom Cutout */}
      <div className="absolute -bottom-16 left-[15%] w-40 h-32 bg-white rounded-full" />

      {/* Floating Elements */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
         <AnimatedWidget />
      </div>

      {/* Reference-style Floating Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-1/4 right-[5%] md:right-[10%] bg-[#d9d9d9]/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl flex items-start gap-4 max-w-[280px] z-20"
      >
        <div className="w-6 h-6 rounded-full bg-[#262626] flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-white text-xs font-serif italic">i</span>
        </div>
        <div>
          <p className="text-xs text-[#262626]/60 font-medium mb-1">Simple Recorder</p>
          <p className="text-lg font-medium text-[#262626] leading-tight mb-2">Recording saved to Desktop</p>
          <p className="text-xs text-[#262626]/60">File: Rec_73291.mp4</p>
        </div>
      </motion.div>
    </div>
  </section>
);

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
    }
  ];

  return (
    <section id="features" className="py-32 px-6 bg-white max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
        <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-[#262626] max-w-3xl leading-[1.05]">
          Everything you need.<br/>
          <span className="text-[#262626]/40">Nothing you don't.</span>
        </h2>
        <div className="max-w-sm pb-2">
          <p className="text-xl text-[#262626] font-medium leading-relaxed">
            We stripped away the complex menus to give you a tool that just works, beautifully.
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
            className="bg-[#f4f4f4] p-10 md:p-14 rounded-[40px] flex flex-col justify-between h-full min-h-[320px] group hover:bg-[#ebebeb] transition-colors"
          >
            <div className={`w-16 h-16 rounded-full ${feature.iconBg} flex items-center justify-center mb-12 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              {feature.icon}
            </div>
            <div>
              <h3 className="text-3xl font-medium text-[#262626] mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-lg text-[#262626]/70 leading-relaxed font-medium">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Pricing = () => (
  <section id="pricing" className="py-32 px-6 bg-white max-w-[1400px] mx-auto">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
      <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-[#262626] max-w-3xl leading-[1.05]">
        Simple pricing.<br/>
        <span className="text-[#262626]/40">No surprises.</span>
      </h2>
      <div className="max-w-sm pb-2">
        <p className="text-xl text-[#262626] font-medium leading-relaxed">
          Start for free, upgrade when you need professional power.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Free Tier */}
      <div className="bg-[#f4f4f4] p-10 md:p-14 rounded-[40px] flex flex-col">
        <div className="mb-12">
          <h3 className="text-3xl font-medium text-[#262626] mb-4 tracking-tight">Starter</h3>
          <p className="text-lg text-[#262626]/60 font-medium">Perfect for quick captures.</p>
        </div>
        <div className="mb-12">
          <span className="text-7xl font-medium tracking-tight text-[#262626]">$0</span>
          <span className="text-xl text-[#262626]/60 font-medium ml-2">/forever</span>
        </div>
        <ul className="flex flex-col gap-5 mb-12 flex-grow">
          {['1080p recording', 'Up to 5 minutes per clip', 'Basic audio capture', 'Standard support'].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-lg text-[#262626]/80 font-medium">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-[#262626]" />
              </div>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full py-5 rounded-full font-bold text-[#262626] bg-white hover:bg-[#ebebeb] transition-colors text-lg">
          Download Free
        </button>
      </div>

      {/* Pro Tier */}
      <div className="bg-[#262626] p-10 md:p-14 rounded-[40px] flex flex-col relative overflow-hidden">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-medium text-white tracking-tight">Pro</h3>
            <div className="bg-[#fb2c36] text-white text-xs font-bold px-4 py-1.5 rounded-full">
              MOST POPULAR
            </div>
          </div>
          <p className="text-lg text-white/60 font-medium">For creators and professionals.</p>
        </div>
        <div className="mb-12">
          <span className="text-7xl font-medium tracking-tight text-white">$9</span>
          <span className="text-xl text-white/60 font-medium ml-2">/month</span>
        </div>
        <ul className="flex flex-col gap-5 mb-12 flex-grow">
          {['120fps 4K recording', 'Unlimited recording time', 'Multi-track studio audio', 'Custom watermarks', 'Priority support'].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-lg text-white/90 font-medium">
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
  <section id="contact" className="py-32 px-6 bg-white max-w-[1400px] mx-auto">
    <div className="flex flex-col lg:flex-row gap-16 items-start">
      {/* Left side: Title */}
      <div className="lg:w-1/2">
        <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-[#262626] leading-[1.05] mb-6">
          Have questions?<br/>
          <span className="text-[#262626]/40">Let's talk.</span>
        </h2>
        <p className="text-xl text-[#262626] font-medium leading-relaxed max-w-md">
          Our team is here to help. Send us a message and we'll respond within 24 hours.
        </p>
      </div>

      {/* Right side: Form */}
      <div className="lg:w-1/2 w-full bg-[#f4f4f4] p-10 md:p-14 rounded-[40px]">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-[#262626] uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                placeholder="Jane Doe"
                className="px-6 py-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#fb2c36] transition-all bg-white text-lg font-medium placeholder:text-[#262626]/30"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-[#262626] uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                placeholder="jane@example.com"
                className="px-6 py-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#fb2c36] transition-all bg-white text-lg font-medium placeholder:text-[#262626]/30"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-[#262626] uppercase tracking-wider">Message</label>
            <textarea 
              rows={4}
              placeholder="How can we help you?"
              className="px-6 py-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#fb2c36] transition-all bg-white text-lg font-medium placeholder:text-[#262626]/30 resize-none"
            />
          </div>
          <button className="w-full bg-[#262626] text-white py-5 rounded-full font-bold hover:bg-black transition-colors text-lg mt-4">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#262626] pt-24 pb-12 px-6 mt-12 rounded-t-[40px] max-w-[1400px] mx-auto mb-6">
    <div className="flex flex-col items-center text-center mb-20">
      <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-8">
        Ready to record?
      </h2>
      <button className="bg-white text-[#262626] px-10 py-5 rounded-full text-lg font-bold hover:bg-[#f4f4f4] transition-colors">
        DOWNLOAD FREE
      </button>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
      <div className="flex items-center gap-3">
        <AppLogo className="w-8 h-8" />
        <span className="font-bold text-lg tracking-tight text-white">Simple Recorder</span>
      </div>
      <div className="flex gap-8 text-sm font-medium text-white/60">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
      </div>
      <div className="text-sm text-white/40 font-medium">
        © {new Date().getFullYear()} Simple Recorder. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#fb2c36]/20 selection:text-[#fb2c36]">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
