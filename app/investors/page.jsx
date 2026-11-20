import '../site.css';

export const metadata = {
  title: 'Cleophis — For Investors',
  description:
    'Cleophis is an offline algebra tutor for homeschool teens at $10 a month per family: a single, on-device AI tutor in place of a patchwork of workbooks and apps.',
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

// Content follows the pitch deck (v8.1). Update both together.
const STATS = [
  ['39M', 'students whose parents piece tutoring together themselves'],
  ['$16B', 'spent each year on the K–12 DIY patchwork, at most'],
  ['$100M+', 'starting market: grades 6–12 homeschoolers'],
  ['$10', 'a month per family'],
];

const SOLUTION_CARDS = [
  { big: '$10/mo', title: 'One price per family', desc: 'Human tutors run $40 to $80 an hour, per child.' },
  { big: '100% on-device', title: 'Private by design', desc: 'Khanmigo, ChatGPT and other cloud AI send student work to their servers. Cleophis does not.' },
  { big: 'Airplane mode', title: 'Distraction-free and offline', desc: 'No browser and no Wi-Fi needed, so there is nothing else on the screen to wander off to.' },
];

const HOW = [
  { title: 'Socratic guidance', desc: 'Walks through each step with math checked by a real calculator, never giving away the answer.' },
  { title: 'Practice till it sticks', desc: 'Generates targeted practice problems until the student solves them solo.' },
];

const GTM = [
  { phase: 'Now', when: 'Months 1–6', title: 'Homeschool beta and early adopters', desc: 'Onboard initial grades 6–12 homeschool families through direct outreach and warm introductions into active online homeschool groups, to validate retention.' },
  { phase: 'Next', when: 'Months 7–24', title: 'Co-op and parent content scaling', desc: 'Scale across online homeschool networks, co-ops, educational content and parent-led referrals as the full grades 6–12 library and test prep roll out.' },
  { phase: 'Later', when: 'Year 3+', title: 'Broader K–12 DIY market', desc: 'Expand beyond homeschooling into the $16B K–12 DIY market for everyday families seeking affordable, private tutoring.' },
];

const COMPETE_COLS = ['Cleophis', 'Khanmigo', 'ChatGPT / cloud AI', 'Human tutors'];
const COMPETE_ROWS = [
  ['Family price', '$10 / mo', '$4 / mo', '$0 – $20 / mo (per user)', '$40 – $80 / hr (per kid)'],
  ['Data privacy', '100% on-device', 'Cloud servers', 'Cloud servers', 'In-person / Zoom'],
  ['Distraction-free and offline', 'Works in airplane mode', 'Requires browser + Wi-Fi', 'Requires browser + Wi-Fi', 'Scheduled sessions'],
  ['Teaching approach', 'Socratic + calculator + practice', 'Socratic', 'Gives direct answers', 'Varies by tutor'],
];

const TEAM = [
  { title: 'Educator & Builder', desc: '10 years classroom teaching, 5 years private tutoring, and built the working offline tutor solo.' },
  { title: 'Field IT & Operations', desc: 'Former U.S. military IT lead (deployed 2,000+ hospital and clinic computers) and forward-deployed Marine Expeditionary Unit medical logistics coordinator.' },
  { title: 'Solo + AI Execution', desc: 'Near-zero-burn operation pairing founder domain expertise with AI tooling across engineering, training, and growth.' },
];

const TRACTION = [
  { title: 'Product', desc: 'Offline math tutor running on Windows and 4 GB Android phones. Ready for beta; cross-device sync in progress.' },
  { title: 'Customers', desc: 'Pre-revenue. Onboarding initial beta families to convert first paying subscribers.' },
  { title: 'Growth', desc: 'Launching first paying cohort, targeting a 100% doubling cadence from initial adopters.' },
];

const BIG = { margin: 0, fontFamily: SERIF, fontWeight: '600', fontSize: 'clamp(26px, 3.2vw, 38px)', lineHeight: 1.3, color: '#123C69', textWrap: 'pretty' };
const H3 = { margin: 0, fontFamily: SERIF, fontWeight: '600', fontSize: '21px' };
const HEAD = { display: 'flex', flexDirection: 'column', gap: '12px' };
const TH = { padding: '14px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.04em', color: '#465060', borderBottom: '2px solid #E0D8C8', whiteSpace: 'nowrap' };
const TD = { padding: '14px 16px', textAlign: 'left', verticalAlign: 'top', borderBottom: '1px solid #E0D8C8', color: '#465060' };
const TABLE_BOX = { overflowX: 'auto', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '14px' };

function Cards({ items, min = 260, tone }) {
  return (
    <div className="stag" style={GRID(min)}>
      {items.map((c) => (
        <div key={c.title} className="card" style={{ ...CARD, background: tone === 'light' ? '#FBF8F1' : CARD.background }}>
          <span aria-hidden="true" className="rule" style={RULE}></span>
          {c.big && <span style={{ fontFamily: SERIF, fontWeight: '700', fontSize: '34px', lineHeight: 1.1, color: '#123C69' }}>{c.big}</span>}
          <h3 style={H3}>{c.title}</h3>
          <p style={{ margin: 0, color: '#465060' }}>{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

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
<a href="#market" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Market</a>
<a href="#team" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Team</a>
<a href="#traction" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Traction</a>
<a href={DECK} className="btn" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 18px', borderRadius: '10px', background: '#A83A5C', color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}>Request the deck</a>
</nav>
</div>
</header>

<section style={{ background: '#F1EBDF' }}>
<div style={{ ...WRAP, padding: '80px 24px 88px', alignItems: 'flex-start', gap: '22px' }}>
<h1 className="load d2" style={{ margin: 0, maxWidth: '15em', fontFamily: SERIF, fontWeight: '700', fontSize: 'clamp(38px, 5vw, 60px)', lineHeight: 1.08, letterSpacing: '-0.01em', color: '#123C69', textWrap: 'balance' }}>An offline algebra tutor for homeschool teens. $10 a month.</h1>
<p className="load d3" style={{ ...SUB, fontSize: '19px', maxWidth: '38em' }}>Cleophis replaces a fragmented patchwork of workbooks and apps with a <strong style={{ color: '#1E2A3A' }}>single, on-device AI tutor</strong>: structured, kid-safe tutoring that works even in airplane mode.</p>
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
<p className="rise" style={BIG}>Parents of <span style={{ color: '#983154' }}>39 million</span> students already spend up to <span style={{ color: '#983154' }}>$16 billion</span> a year on a fragmented DIY patchwork of workbooks and apps, compensating for human tutors they can’t afford and cloud AI tools they don’t trust with their kids’ data.</p>
</div>
</section>

<section id="solution">
<div style={{ ...WRAP, paddingTop: '8px' }}>
<div style={HEAD}>
<span style={KICK}>Solution</span>
<p className="rise" style={BIG}>Cleophis replaces that fragmented patchwork with a single, on-device AI tutor, giving students structured, kid-safe tutoring starting at $10 a month per family.</p>
</div>
<Cards items={SOLUTION_CARDS} />
</div>
</section>

<section id="market" style={{ background: '#F1EBDF' }}>
<div style={{ ...WRAP, maxWidth: '960px', gap: '18px' }}>
<span style={KICK}>Market</span>
<p className="rise" style={BIG}>We are starting with grades 6–12 homeschoolers, a <span style={{ color: '#983154' }}>$100M+</span> DIY market, before expanding into the broader <span style={{ color: '#983154' }}>$16 billion</span> K–12 DIY market.</p>
</div>
</section>

<section id="how">
<div style={WRAP}>
<div style={HEAD}>
<span style={KICK}>How it works</span>
<h2 className="rise" style={H2}>Private math tutoring directly on the student’s device, even in airplane mode.</h2>
</div>
<Cards items={HOW} min={320} />
</div>
</section>

<section id="gtm" style={{ background: '#F1EBDF' }}>
<div style={WRAP}>
<div style={HEAD}>
<span style={KICK}>Go-to-market strategy</span>
<h2 className="rise" style={H2}>Start with homeschool families, then scale.</h2>
<p style={SUB}>We start with grades 6–12 homeschool families and co-ops, then scale into the $16B K–12 DIY market.</p>
</div>
<ol className="stag" style={{ listStyle: 'none', margin: 0, padding: 0, ...GRID(260) }}>
{GTM.map((g) => (
<li key={g.phase} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '14px' }}>
<span style={{ alignSelf: 'flex-start', padding: '3px 12px', borderRadius: '999px', background: '#123C69', color: '#FBF8F1', fontSize: '13px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{g.phase} · {g.when}</span>
<h3 style={H3}>{g.title}</h3>
<p style={{ margin: 0, color: '#465060' }}>{g.desc}</p>
</li>
))}
</ol>
</div>
</section>

<section id="competition">
<div style={WRAP}>
<div style={HEAD}>
<span style={KICK}>Competition</span>
<h2 className="rise" style={H2}>Parents want private, distraction-free tutoring their kids can use anywhere.</h2>
</div>
<div className="depth" style={TABLE_BOX}>
<table style={{ width: '100%', minWidth: '760px', borderCollapse: 'collapse' }}>
<thead><tr>
<th scope="col" style={TH}>What parents need</th>
{COMPETE_COLS.map((c, i) => (<th key={c} scope="col" style={{ ...TH, color: i === 0 ? '#123C69' : TH.color, background: i === 0 ? '#F1EBDF' : 'transparent' }}>{c}</th>))}
</tr></thead>
<tbody>
{COMPETE_ROWS.map(([need, ...cells]) => (
<tr key={need}>
<th scope="row" style={{ ...TD, fontWeight: '600', color: '#1E2A3A' }}>{need}</th>
{cells.map((c, i) => (<td key={i} style={{ ...TD, fontWeight: i === 0 ? '600' : '400', color: i === 0 ? '#123C69' : TD.color, background: i === 0 ? '#F1EBDF' : 'transparent' }}>{c}</td>))}
</tr>
))}
</tbody>
</table>
</div>
</div>
</section>

<section id="team" style={{ background: '#F1EBDF' }}>
<div style={WRAP}>
<div style={HEAD}>
<span style={KICK}>Team</span>
<h2 className="rise" style={H2}>Patrick Jackson, Founder. The teacher and the builder are the same person.</h2>
</div>
<Cards items={TEAM} tone="light" />
</div>
</section>

<section id="traction">
<div style={WRAP}>
<div style={HEAD}>
<span style={KICK}>Traction</span>
<h2 className="rise" style={H2}>A working offline math tutor on Windows and 4 GB Android phones, ready for beta testing.</h2>
</div>
<Cards items={TRACTION} />
</div>
</section>

<section id="contact" style={{ background: '#F1EBDF' }}>
<div style={{ ...WRAP, maxWidth: '960px', alignItems: 'flex-start', gap: '18px' }}>
<span style={KICK}>Contact</span>
<h2 className="rise" style={H2}>An algebra tutor for every family priced out of one.</h2>
<p style={{ ...SUB, fontSize: '19px' }}>Join us in bringing private, on-device tutoring to the families priced out of it.</p>
<Buttons />
<p style={{ margin: 0, paddingTop: '18px', borderTop: '1px solid #E0D8C8', alignSelf: 'stretch', fontWeight: '600', color: '#123C69' }}>Patrick Jackson, Founder &amp; System Architect · <a href="mailto:invest@cleophis.com">invest@cleophis.com</a></p>
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
<a href="/feedback" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>Feedback</a>
<a href="/privacy" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>Privacy</a>
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
