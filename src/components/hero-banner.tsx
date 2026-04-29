export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl" style={{ background: '#0f0f0d', minHeight: '320px', display: 'flex', alignItems: 'center' }}>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <radialGradient id="glow1" cx="75%" cy="30%" r="55%">
              <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0f0f0d" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="320" fill="url(#grid)" />
          <rect width="800" height="320" fill="url(#glow1)" />
          <circle cx="100" cy="280" r="90" fill="rgba(160,131,111,0.04)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-12 py-12 max-w-2xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-7" style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '5px 14px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c8a96e', display: 'inline-block' }} />
          <span style={{ fontFamily: 'Helvetica Neue, Helvetica, sans-serif', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
            New Drop — Camello Market
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'Helvetica Neue, Helvetica, sans-serif', fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 700, color: '#f5f0e8', lineHeight: 1.05, margin: 0, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
          Everthing<br />
          <span style={{ color: '#c8a96e' }}>In Camello</span>
        </h1>

        {/* Subtext */}
        <p style={{ fontFamily: 'Helvetica Neue, Helvetica, sans-serif', fontSize: '13px', color: 'rgba(245,240,232,0.4)', lineHeight: 1.8, margin: '20px 0 0', maxWidth: '360px', fontWeight: 300, letterSpacing: '0.02em' }}>
          We have everything you need in one place.
        </p>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.25), transparent)' }} />
    </section>
  );
}
