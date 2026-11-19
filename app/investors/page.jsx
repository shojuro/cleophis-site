import '../site.css';

export const metadata = {
  title: 'Cleophis — For Investors',
  description:
    'Cleophis is opening a $1.4 billion US market — private, offline, on-device AI tutoring for the 39 million students the cloud leaves behind. Raising pre-seed.',
};

const DECK = 'mailto:invest@cleophis.com';
const SERIF = 'var(--font-serif), Georgia, serif';
const WRAP = { maxWidth: '1160px', margin: '0 auto', padding: '80px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '28px' };
const KICK = { fontSize: '14px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#983154' };
const H2 = { margin: 0, fontFamily: SERIF, fontWeight: '700', fontSize: 'clamp(30px, 3.6vw, 42px)', lineHeight: 1.15, color: '#123C69', textWrap: 'balance' };
const SUB = { margin: 0, maxWidth: '46em', color: '#465060', textWrap: 'pretty' };
const CARD = { display: 'flex', flexDirection: 'column', gap: '10px', padding: '26px', background: '#F1EBDF', border: '1px solid #E0D8C8', borderRadius: '14px', minWidth: 0 };
const GRID = (min) => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))`, gap: '20px' });
const RULE = { width: '36px', height: '3px', background: '#B08A3E' };

const STATS = [
  ['39M', 'US students locked out of tutoring'],
  ['$155B', 'global tutoring market'],
  ['100%', 'of tutoring runs offline, on-device'],
  ['$0', 'marginal cost per query'],
];

const SOLUTION_CARDS = [
  { big: '$10/mo', title: 'Affordable', desc: 'A full academic tutor for families priced out of $60/hour tutoring.' },
  { big: '100% Offline', title: 'No internet needed', desc: 'Works with no internet, on hardware from a 4 GB phone to a 32 GB PC.' },
  { big: '100% Private', title: 'On-device by design', desc: 'Student data never leaves the phone or PC — nothing is logged to a cloud.' },
];

const STEPS = [
  { title: 'Auto-Profile System', desc: 'Checks the device’s memory (4 GB to 32 GB+)' },
  { title: 'Select & Load', desc: 'Automatically downloads the best-fit local model for the device' },
  { title: 'Private Execution', desc: '24/7 tutoring, fully offline' },
];

const VISION_CARDS = [
  { phase: 'Live', live: true, domain: 'Academics', items: ['Algebra II', 'AP Biology', 'Essay writing'] },
  { phase: 'Next', live: false, domain: 'Test Prep', items: ['SAT · ACT', 'MCAT', 'Bar exam'] },
  { phase: 'Next', live: false, domain: 'Professional', items: ['Coding', 'Accounting', 'Skilled trades'] },
  { phase: 'Next', live: false, domain: 'Life & Hobbies', items: ['French cuisine', 'Guitar', 'Home repair'] },
];

const INV_CHIPS = [
  { title: 'Train once — the device does the rest', desc: 'Inference, the expensive part of AI, runs 100% on the customer’s device. Our costs — training, storage, a one-time download — are cents per user.' },
  { title: '$0 marginal cost per query', desc: 'Additional usage adds no cloud or API cost, so margins hold steady as the user base grows.' },
  { title: 'Model independence', desc: 'In-house training and hosting of our model library — no reliance on frontier-model pricing or availability.' },
];

function Buttons({ dark }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <a href={DECK} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', minHeight: '52px', padding: '0 24px', borderRadius: '12px', background: '#A83A5C', color: '#FFFFFF', textDecoration: 'none', fontWeight: '600' }}>
        Request the investor deck <span className="arr" aria-hidden="true">→</span>
      </a>
      <a href="/" className="btn2" style={{ display: 'flex', alignItems: 'center', minHeight: '52px', padding: '0 22px', borderRadius: '12px', border: dark ? '1px solid rgba(227, 201, 138, 0.6)' : '1px solid #C9BFAE', background: dark ? 'transparent' : '#FBF8F1', color: dark ? '#FBF8F1' : '#1E2A3A', textDecoration: 'none', fontWeight: '600' }}>
        Visit the product site
      </a>
    </div>
  );
}

export default function InvestorsPage() {
  return (
<div id="top" style={{ background: '#FBF8F1', color: '#1E2A3A', fontFamily: 'var(--font-sans), system-ui, sans-serif', fontSize: '17px', lineHeight: 1.6 }}>
<div className="prog" aria-hidden="true"></div>
<div className="ribbon" aria-hidden="true"></div>
<header className="hdr" style={{ borderBottom: '1px solid #E0D8C8', background: 'rgba(251, 248, 241, 0.88)' }}>
<div style={{ maxWidth: '1160px', margin: '0 auto', padding: '12px 24px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px 24px' }}>
<a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '44px', textDecoration: 'none' }}><svg className="crown" role="img" aria-label="Cleophis mark: a crown made of standing books" width="36" height="36" viewBox="0 0 64 64" style={{ flex: 'none' }}><rect x="8" y="23" width="8" height="25" rx="1.6" fill="#123C69"></rect><rect x="18" y="31" width="8" height="17" rx="1.6" fill="#123C69"></rect><rect x="28" y="17" width="8" height="31" rx="1.6" fill="#123C69"></rect><rect x="38" y="31" width="8" height="17" rx="1.6" fill="#123C69"></rect><rect x="48" y="23" width="8" height="25" rx="1.6" fill="#123C69"></rect><circle cx="12" cy="16.5" r="3.4" fill="#B08A3E"></circle><circle cx="32" cy="10" r="3.8" fill="#B08A3E"></circle><circle cx="52" cy="16.5" r="3.4" fill="#B08A3E"></circle><rect x="6" y="50.5" width="52" height="5.5" rx="1.6" fill="#B08A3E"></rect></svg><span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', fontSize: '26px', color: '#123C69' }}>Cleophis</span></a>
<nav aria-label="Main" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 6px' }}>
<a href="/" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Product</a>
<a href="#problem" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Problem</a>
<a href="#solution" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Solution</a>
<a href="#how" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>How it works</a>
<a href="#vision" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Vision</a>
<a href={DECK} className="btn" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 18px', borderRadius: '10px', background: '#A83A5C', color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}>Request the deck</a>
</nav>
</div>
</header>

<section style={{ background: '#F1EBDF' }}>
<div style={{ ...WRAP, padding: '80px 24px 88px', alignItems: 'flex-start', gap: '22px' }}>
<span className="load d1" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: '#FBF8F1', border: '1px solid #E0D8C8', fontSize: '14px', fontWeight: '600', color: '#465060' }}><span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B08A3E' }}></span>Pre-seed · 2026</span>
<h1 className="load d2" style={{ margin: 0, maxWidth: '15em', fontFamily: SERIF, fontWeight: '700', fontSize: 'clamp(38px, 5vw, 60px)', lineHeight: 1.08, letterSpacing: '-0.01em', color: '#123C69', textWrap: 'balance' }}>Private, offline academic tutoring — on any device.</h1>
<p className="load d3" style={{ ...SUB, fontSize: '19px', maxWidth: '38em' }}>Cleophis is a growing <strong style={{ color: '#1E2A3A' }}>library of fine-tuned, on-device AI models</strong> — a full academic tutor that works 100% offline, with data that never leaves the device, sized to anything from a 4 GB phone to a 32 GB PC.</p>
<div className="load d4"><Buttons /></div>
</div>
</section>

<section aria-label="Key numbers" style={{ background: '#123C69', color: '#FBF8F1' }}>
<div className="stag" style={{ maxWidth: '1160px', margin: '0 auto', padding: '48px 24px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '28px 32px' }}>
{STATS.map(([n, label]) => (
<div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
<span style={{ fontFamily: SERIF, fontWeight: '700', fontSize: '48px', lineHeight: 1, color: '#E3C98A' }}>{n}</span>
<span style={{ color: '#E9E3D6' }}>{label}</span>
</div>
))}
</div>
</section>

<section id="problem">
<div style={{ ...WRAP, maxWidth: '960px', gap: '18px' }}>
<span style={KICK}>Problem</span>
<p className="rise" style={{ margin: 0, fontFamily: SERIF, fontWeight: '600', fontSize: 'clamp(26px, 3.2vw, 38px)', lineHeight: 1.3, color: '#123C69', textWrap: 'pretty' }}><span style={{ color: '#983154' }}>39 million</span> US students are locked out of a <span style={{ color: '#983154' }}>$155 billion</span> tutoring market — they can’t afford it, can’t get online, and their parents won’t trust the cloud with their data.</p>
<p style={{ margin: 0, fontFamily: SERIF, fontStyle: 'italic', color: '#5C6470' }}>The trifecta of knowledge disparity: cost, connectivity, and privacy.</p>
</div>
</section>

<section id="solution">
<div style={{ ...WRAP, paddingTop: '8px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
<span style={KICK}>Solution</span>
<h2 className="rise" style={H2}>Cleophis answers all three.</h2>
<p style={SUB}>A library of fine-tuned, on-device AI models — downloaded, not streamed — starting with a full academic tutor.</p>
</div>
<div className="stag" style={GRID(260)}>
{SOLUTION_CARDS.map((c) => (
<div key={c.title} className="card" style={CARD}>
<span aria-hidden="true" className="rule" style={RULE}></span>
<span style={{ fontFamily: SERIF, fontWeight: '700', fontSize: '34px', lineHeight: 1.1, color: '#123C69' }}>{c.big}</span>
<h3 style={{ margin: 0, fontFamily: SERIF, fontWeight: '600', fontSize: '21px' }}>{c.title}</h3>
<p style={{ margin: 0, color: '#465060' }}>{c.desc}</p>
</div>
))}
</div>
<figure className="depth rise" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', padding: '32px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '16px' }}>
<span aria-hidden="true" style={{ fontFamily: SERIF, fontWeight: '700', fontSize: '64px', lineHeight: 0.6, color: '#B08A3E', height: '30px' }}>“</span>
<p style={{ margin: 0, fontFamily: SERIF, fontWeight: '700', fontSize: '24px', lineHeight: 1.25, color: '#123C69' }}>"Microsoft weighs DeepSeek for Copilot Cowork"</p>
<blockquote style={{ margin: 0, fontFamily: SERIF, fontSize: '19px', color: '#1E2A3A' }}>“Microsoft is exploring DeepSeek V4, a Chinese open-source AI model fine-tuned on Azure, as a cheaper model option for Copilot Cowork”</blockquote>
<figcaption style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
<span style={{ fontSize: '15px', color: '#465060' }}><strong>Axios</strong>, June 16, 2026 · <strong>Memeburn</strong>, June 19, 2026</span>
<span style={{ paddingTop: '12px', borderTop: '1px solid #E0D8C8', fontFamily: SERIF, fontStyle: 'italic', color: '#5C6470' }}>The exact category Microsoft is now chasing — a fine-tuned, local model.</span>
</figcaption>
</figure>
</div>
</section>

<section id="how" style={{ background: '#F1EBDF' }}>
<div style={WRAP}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
<span style={KICK}>How it works</span>
<h2 className="rise" style={H2}>Zero setup, on-device execution.</h2>
<p style={SUB}>The application profiles the device on launch, loads the best-fit model from its catalog, and runs 100% offline with zero cloud latency.</p>
</div>
<ol className="stag" style={{ listStyle: 'none', margin: 0, padding: 0, ...GRID(240) }}>
{STEPS.map((s, i) => (
<li key={s.title} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '14px' }}>
<span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', width: '44px', height: '44px', borderRadius: '50%', background: '#123C69', color: '#FBF8F1', fontFamily: SERIF, fontWeight: '700', fontSize: '18px' }}>{String(i + 1).padStart(2, '0')}</span>
<h3 style={{ margin: 0, fontFamily: SERIF, fontWeight: '600', fontSize: '21px' }}>{s.title}</h3>
<p style={{ margin: 0, color: '#465060' }}>{s.desc}</p>
</li>
))}
</ol>
<p style={{ margin: 0, fontFamily: SERIF, fontStyle: 'italic', fontSize: '19px', color: '#123C69' }}>From install to first answer in minutes — one sign-in, fully offline tutoring, and no student data leaving the device.</p>
</div>
</section>

<section id="vision">
<div style={WRAP}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
<span style={KICK}>Vision</span>
<h2 className="rise" style={H2}>One on-device library. Any subject.</h2>
<p style={SUB}>Academic tutoring is our wedge. The same architecture — small models fine-tuned to the subdomain and sized to the device — extends to anything people want to learn, privately and offline.</p>
</div>
<div className="stag" style={GRID(220)}>
{VISION_CARDS.map((c) => (
<div key={c.domain} className="card" style={{ ...CARD, background: c.live ? '#123C69' : '#F1EBDF', color: c.live ? '#FBF8F1' : '#1E2A3A', border: c.live ? '1px solid #123C69' : CARD.border }}>
<span style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', background: c.live ? '#DCEFE3' : '#FBF8F1', color: c.live ? '#1B5E40' : '#5C6470', border: c.live ? '0' : '1px solid #E0D8C8' }}>{c.live && <span aria-hidden="true" className="pulse" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1B5E40' }}></span>}{c.phase}</span>
<h3 style={{ margin: 0, fontFamily: SERIF, fontWeight: '600', fontSize: '22px' }}>{c.domain}</h3>
<ul style={{ margin: 0, paddingLeft: '20px', color: c.live ? '#E9E3D6' : '#465060' }}>
{c.items.map((item) => (<li key={item}>{item}</li>))}
</ul>
</div>
))}
</div>
<p style={{ margin: 0, padding: '20px 24px', borderRadius: '14px', background: '#F1EBDF', color: '#1E2A3A' }}><strong style={{ color: '#123C69' }}>The moat:</strong> not one general cloud model, but a growing library of narrow, on-device experts — each small enough to run on a phone.</p>
</div>
</section>

<section id="investors" style={{ background: '#123C69', color: '#FBF8F1' }}>
<div style={{ ...WRAP, padding: '84px 24px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
<span style={{ ...KICK, color: '#E3C98A' }}>For investors</span>
<h2 className="rise" style={{ ...H2, color: '#FBF8F1' }}>Democratizing K–12 education.</h2>
<p style={{ ...SUB, fontSize: '19px', color: '#E9E3D6' }}>We’re opening a <strong style={{ color: '#FFFFFF' }}>$1.4 billion</strong> US market — starting with the 39 million students the cloud leaves behind. Cleophis is raising a pre-seed round.</p>
</div>
<div className="stag" style={GRID(260)}>
{INV_CHIPS.map((c) => (
<div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px', borderRadius: '14px', background: 'rgba(251, 248, 241, 0.06)', border: '1px solid rgba(227, 201, 138, 0.35)' }}>
<h3 style={{ margin: 0, fontFamily: SERIF, fontWeight: '600', fontSize: '20px', color: '#E3C98A' }}>{c.title}</h3>
<p style={{ margin: 0, color: '#E9E3D6' }}>{c.desc}</p>
</div>
))}
</div>
<Buttons dark />
<p style={{ margin: 0, paddingTop: '18px', borderTop: '1px solid rgba(227, 201, 138, 0.45)', fontWeight: '600', color: '#E3C98A' }}>Pre-seed · Patrick Jackson, Founder &amp; System Architect · 2026</p>
</div>
</section>

<footer style={{ background: '#FBF8F1', borderTop: '1px solid #E0D8C8' }}>
<div style={{ maxWidth: '1160px', margin: '0 auto', padding: '36px 24px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px 32px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg role="img" aria-label="Cleophis mark: a crown made of standing books" width="32" height="32" viewBox="0 0 64 64" style={{ flex: 'none' }}><rect x="8" y="23" width="8" height="25" rx="1.6" fill="#123C69"></rect><rect x="18" y="31" width="8" height="17" rx="1.6" fill="#123C69"></rect><rect x="28" y="17" width="8" height="31" rx="1.6" fill="#123C69"></rect><rect x="38" y="31" width="8" height="17" rx="1.6" fill="#123C69"></rect><rect x="48" y="23" width="8" height="25" rx="1.6" fill="#123C69"></rect><circle cx="12" cy="16.5" r="3.4" fill="#B08A3E"></circle><circle cx="32" cy="10" r="3.8" fill="#B08A3E"></circle><circle cx="52" cy="16.5" r="3.4" fill="#B08A3E"></circle><rect x="6" y="50.5" width="52" height="5.5" rx="1.6" fill="#B08A3E"></rect></svg><span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', fontSize: '22px', color: '#123C69' }}>Cleophis</span></div>
<span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', color: '#5C6470' }}>Downloaded, not streamed.</span>
</div>
<nav aria-label="Footer" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
<a href="/download" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>Download</a>
<a href="/co-ops" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>For co-ops</a>
<a href="/investors" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>For investors</a>
<a href="/download#code" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>Have a code?</a>
<a href="mailto:hello@cleophis.com" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>Contact</a>
</nav>
<span style={{ fontSize: '14px', color: '#5C6470' }}>© 2026 Cleophis. All rights reserved.</span>
</div>
</footer>
</div>
  );
}
