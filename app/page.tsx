import React from 'react';
import { FAQ, Hero, Navbar } from './landing-client';
import { ClientForm, MButton, MDiv, MH2, MP, MSpan } from './motion-client';
import { siteDescription, siteName, siteUrl } from '@/lib/site';
import {
  CheckIcon,
  EyesIcon,
  NoWatermarkIcon,
  RecordIcon,
  SelectionIcon,
  SpeedIcon,
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

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' }
] as const;

const sectionClassName = 'mx-auto max-w-[1400px] bg-[#F8FAFC] px-4 py-14 sm:px-6 sm:py-16 md:py-[4.5rem] lg:py-20';
const sectionHeaderClassName = 'mb-10 flex flex-col items-start justify-between gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:gap-10';
const sectionHeaderCopyClassName = 'w-full max-w-md lg:max-w-sm lg:pb-1';
const sectionTitleClassName = 'max-w-3xl text-[clamp(3rem,15vw,4.25rem)] font-bold leading-[1.02] tracking-tight text-[#262626] sm:text-[3.6rem] md:text-6xl lg:text-[4.5rem]';
const sectionTitleDarkClassName = 'text-[clamp(3rem,15vw,4.25rem)] font-bold tracking-tight text-white leading-[1.02] sm:text-[3.6rem] md:text-6xl lg:text-[4.5rem]';
const sectionCopyClassName = 'text-lg font-normal leading-relaxed text-[#262626] sm:text-xl';
const sectionCopyDarkClassName = 'max-w-md text-lg font-normal leading-relaxed text-white/70 sm:text-xl';
const sectionCardClassName = 'rounded-[32px] bg-[#d8d8d8] p-6 sm:rounded-[40px] sm:p-8 lg:p-10';
const priceValueClassName = 'text-[clamp(4.5rem,24vw,5.75rem)] font-bold leading-none tracking-tighter md:text-[5.75rem] xl:text-[6.5rem]';

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteName,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows',
    description: siteDescription,
    url: siteUrl,
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${siteUrl}/#pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '5',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${siteUrl}/#pricing`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    brand: {
      '@type': 'Brand',
      name: siteName,
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '5',
      priceCurrency: 'USD',
      offerCount: 2,
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ['Is SimpleRecorder really free?', 'Yes! The Starter plan is completely free forever. You get 1080p recording, up to 5 minutes per clip, and basic audio capture. No credit card required, no trial period — just download and start recording.'],
      ['How does SimpleRecorder achieve 0 latency and 120fps?', 'SimpleRecorder is built as a native Windows application using low-level GPU capture APIs. Unlike browser-based or Electron tools, we hook directly into the display pipeline, eliminating encoding overhead and delivering buttery smooth 120fps capture with virtually zero impact on system performance.'],
      ['What formats does SimpleRecorder export to?', 'SimpleRecorder exports to MP4 (H.264/H.265) by default for maximum compatibility. Pro users also get access to WebM, MKV, and lossless AVI formats, plus the ability to configure custom encoding presets for any workflow.'],
      ['Does it work with multiple monitors?', 'Absolutely. SimpleRecorder detects all connected displays automatically. You can record a single monitor, a specific window, or a custom region that spans across multiple screens — all at their native refresh rate.'],
      ['Can I record system audio and my microphone at the same time?', 'Yes! Pro users get multi-track audio recording, which captures system audio and microphone input on separate tracks. This gives you full control in post-production to adjust levels, add effects, or mute tracks independently.'],
      ['Is there a watermark on the free version?', 'No watermarks on any plan. We believe your content should always look professional, whether you\'re on the free Starter plan or the Pro plan. Your recordings are 100% clean.'],
    ].map(([name, text]) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: {
        '@type': 'Answer',
        text,
      },
    })),
  },
] as const;

const FeatureWorkflowMockup = () => {
  return (
    <MDiv
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
    </MDiv>
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
          <MSpan
            className="block"
            initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything you need.
          </MSpan>
          {/* Animation 2: "Nothing you don't." slides left to right (staggered) */}
          <MSpan
            className="block text-[#262626]/40"
            initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Nothing you don&apos;t.
          </MSpan>
        </h2>
        <div className={sectionHeaderCopyClassName}>
          {/* Animation 3: Description slides bottom to top */}
          <MP
            className={sectionCopyClassName}
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.82, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            Built for instant captures and high-fidelity exports. Get professional results without the cluttered workflow.
          </MP>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {features.map(({ icon: Icon, iconClassName, badgeStartsAccent, title, description }, idx) => {
          const row = Math.floor(idx / 2);
          const col = idx % 2;
          return (
            <MDiv
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
            </MDiv>
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
        <MSpan
          className="block"
          initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
        >
          Simple pricing.
        </MSpan>
        {/* Animation 2: "No surprises." with dramatic "No" reveal */}
        <span className="block text-[#262626]/40">
          <MSpan
            className="inline-block"
            style={{ color: 'var(--accent-red-solid)' }}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            No
          </MSpan>
          {' '}
          <MSpan
            className="inline-block"
            initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            surprises.
          </MSpan>
        </span>
      </h2>
      <div className={sectionHeaderCopyClassName}>
        {/* Animation 3: Description slides bottom to top */}
        <MP
          className={sectionCopyClassName}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.82, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          Pay once, own it forever. No subscriptions, no recurring fees.
        </MP>
      </div>
    </div>

    <MDiv
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
    </MDiv>
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
        preload="none"
        poster="/images/background-window1.webp"
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
              <MSpan
                className="block"
                initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
              >
                Have questions?
              </MSpan>
              <MSpan
                className="block text-white/40"
                initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.88, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                Let&apos;s talk.
              </MSpan>
            </h2>
            <MP
              className={sectionCopyDarkClassName}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.82, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              Our team is here to help. Send us a message and we&apos;ll respond within 24 hours.
            </MP>
          </div>

          {/* Right side: Form */}
          <MDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:rounded-[32px] sm:p-6 md:p-8 lg:w-1/2 lg:p-10">

            <ClientForm className="flex flex-col gap-5 sm:gap-6">
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
            </ClientForm>
          </MDiv>
        </div>
      </div>
    </div>
  </section>
);

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
            <MH2
              className="max-w-[9ch] text-left text-[clamp(2.5rem,12vw,3.5rem)] font-bold tracking-tight text-white md:text-5xl lg:text-[3.7rem] lg:leading-[0.98]"
              initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
            >
              Ready to record?
            </MH2>
            <MButton
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
            </MButton>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
