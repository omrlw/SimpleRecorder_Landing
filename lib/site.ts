export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.APP_URL ||
  'https://simple-recorder.example.com'
).replace(/\/$/, '');

export const siteName = 'Simple Recorder';
export const siteDescription =
  'Capture your screen with zero friction. Simple Recorder offers 120fps recording, custom regions, and studio-quality audio in a beautifully designed, lightweight app.';
