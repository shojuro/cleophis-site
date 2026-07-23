import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import Counter from '../../components/Counter';

export const metadata = {
  title: 'Cleophis — For Investors',
  description:
    'Cleophis is opening a $1.4 billion US market — private, offline, on-device AI tutoring for the 39 million students the cloud leaves behind. Raising pre-seed.',
};

const NAV_LINKS = [
  ['/', 'Product'],
  ['#problem', 'Problem'],
  ['#solution', 'Solution'],
  ['#how', 'How it works'],
  ['#vision', 'Vision'],
];

const SOLUTION_CARDS = [
  {
    big: '$10/mo',
    title: 'Affordable',
    desc: 'A full academic tutor for families priced out of $60/hour tutoring.',
  },
  {
    big: '100% Offline',
    title: 'No internet needed',
    desc: 'Works with no internet, on hardware from a 4 GB phone to a 32 GB PC.',
  },
  {
    big: '100% Private',
    title: 'On-device by design',
    desc: 'Student data never leaves the phone or PC — nothing is logged to a cloud.',
  },
];

const STEPS = [
  {
    title: 'Auto-Profile System',
    desc: 'Checks the device’s memory (4 GB to 32 GB+)',
  },
  {
    title: 'Select & Load',
    desc: 'Automatically downloads the best-fit local model for the device',
  },
  {
    title: 'Private Execution',
    desc: '24/7 tutoring, fully offline',
  },
];

const VISION_CARDS = [
  { phase: 'LIVE', live: true, domain: 'Academics', items: ['Algebra II', 'AP Biology', 'Essay writing'] },
  { phase: 'NEXT', live: false, domain: 'Test Prep', items: ['SAT · ACT', 'MCAT', 'Bar exam'] },
  { phase: 'NEXT', live: false, domain: 'Professional', items: ['Coding', 'Accounting', 'Skilled trades'] },
  { phase: 'NEXT', live: false, domain: 'Life & Hobbies', items: ['French cuisine', 'Guitar', 'Home repair'] },
];

const INV_CHIPS = [
  {
    title: 'Train once — the device does the rest',
    desc: 'Inference, the expensive part of AI, runs 100% on the customer’s device. Our costs — training, storage, a one-time download — are cents per user.',
  },
  {
    title: '$0 marginal cost per query',
    desc: 'Additional usage adds no cloud or API cost, so margins hold steady as the user base grows.',
  },
  {
    title: 'Model independence',
    desc: 'In-house training and hosting of our model library — no reliance on frontier-model pricing or availability.',
  },
];

export default function InvestorsPage() {
  return (
    <main id="top">
      <Nav links={NAV_LINKS} cta={{ href: 'mailto:invest@cleophis.com', label: 'Request the deck' }} />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="float-d" style={{ width: 22, height: 22, top: '18%', left: '6%' }} />
        <div className="float-d" style={{ width: 14, height: 14, top: '64%', left: '12%', animationDelay: '-4s' }} />
        <div className="float-d" style={{ width: 18, height: 18, top: '30%', right: '10%', animationDelay: '-7s' }} />
        <div className="float-d" style={{ width: 12, height: 12, top: '72%', right: '18%', animationDelay: '-2s' }} />

        <div className="container">
          <Reveal>
            <span className="hero-badge">
              <span className="diamond" aria-hidden="true" />
              Pre-seed · 2026
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1>Private, offline academic tutoring — on any device.</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="hero-sub">
              Cleophis is a growing <strong>library of fine-tuned, on-device AI models</strong> — a
              full academic tutor that works 100% offline, with data that never leaves the device,
              sized to anything from a 4 GB phone to a 32 GB PC.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="hero-ctas">
              <a href="mailto:invest@cleophis.com" className="btn btn-primary">
                Request the investor deck
                <span className="arr" aria-hidden="true">→</span>
              </a>
              <a href="/" className="btn btn-ghost">
                Visit the product site
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= STAT BAND ================= */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <Reveal className="stat">
              <div className="stat-num">
                <Counter to={39} suffix="M" />
              </div>
              <div className="stat-label">US students locked out of tutoring</div>
            </Reveal>
            <Reveal className="stat" delay={100}>
              <div className="stat-num">
                <Counter to={155} prefix="$" suffix="B" />
              </div>
              <div className="stat-label">global tutoring market</div>
            </Reveal>
            <Reveal className="stat" delay={200}>
              <div className="stat-num">
                <Counter to={100} suffix="%" />
              </div>
              <div className="stat-label">offline — no internet required</div>
            </Reveal>
            <Reveal className="stat" delay={300}>
              <div className="stat-num">
                <Counter to={0} prefix="$" />
              </div>
              <div className="stat-label">marginal cost per query</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="section problem" id="problem">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Problem
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="problem-statement">
              <span className="accent">39 million</span> US students are locked out of a{' '}
              <span className="accent">$155 billion</span> tutoring market — they can’t afford it,
              can’t get online, and their parents won’t trust the cloud with their data.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="caption">The trifecta of knowledge disparity: cost, connectivity, and privacy.</p>
          </Reveal>
        </div>
      </section>

      {/* ================= SOLUTION ================= */}
      <section className="section solution" id="solution" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Solution
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">Cleophis answers all three.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sub">
              A library of fine-tuned, on-device AI models — starting with a full academic tutor.
            </p>
          </Reveal>

          <div className="grid3">
            {SOLUTION_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <div className="card">
                  <span className="diamond" aria-hidden="true" />
                  <div className="card-big">{c.big}</div>
                  <div className="card-title">{c.title}</div>
                  <p className="card-desc">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="quote-card">
              <span className="quote-mark" aria-hidden="true">“</span>
              <div className="quote-headline">"Microsoft weighs DeepSeek for Copilot Cowork"</div>
              <p className="quote-body">
                “Microsoft is exploring DeepSeek V4, a Chinese open-source AI model fine-tuned on
                Azure, as a cheaper model option for Copilot Cowork”
              </p>
              <p className="quote-source">
                <strong>Axios</strong>, June 16, 2026 · <strong>Memeburn</strong>, June 19, 2026
              </p>
              <p className="caption quote-caption">
                The exact category Microsoft is now chasing — a fine-tuned, local model.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="section" id="how" style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              How it works
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">Zero setup, on-device execution.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sub">
              The application profiles the device on launch, loads the best-fit model from its
              catalog, and runs 100% offline with zero cloud latency.
            </p>
          </Reveal>

          <div className="steps">
            <div className="step-connector" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 140} className="step">
                <div className="step-circle">{String(i + 1).padStart(2, '0')}</div>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="caption how-payoff">
              From install to first answer in under a minute — no account, no internet, no data
              leaving the device.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="section" id="vision">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Vision
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">One on-device library. Any subject.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sub">
              Academic tutoring is our wedge. The same architecture — small models fine-tuned to the
              subdomain and sized to the device — extends to anything people want to learn,
              privately and offline.
            </p>
          </Reveal>

          <div className="grid4">
            {VISION_CARDS.map((c, i) => (
              <Reveal key={c.domain} delay={i * 100}>
                <div className={`card ${c.live ? 'vision-card-live' : ''}`}>
                  <span className={`pill ${c.live ? 'pill-live' : 'pill-next'}`}>{c.phase}</span>
                  <div className="card-title" style={{ marginTop: 0 }}>{c.domain}</div>
                  <ul className="vision-items">
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="caption moat">
              <strong>The moat:</strong> not one general cloud model, but a growing library of
              narrow, on-device experts — each small enough to run on a phone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= INVESTORS CTA ================= */}
      <section className="section investors" id="investors">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              For investors
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">Democratizing K–12 education.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sub">
              We’re opening a <strong style={{ color: 'var(--white)' }}>$1.4 billion</strong> US
              market — starting with the 39 million students the cloud leaves behind. Cleophis is
              raising a pre-seed round.
            </p>
          </Reveal>

          <div className="inv-chips">
            {INV_CHIPS.map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <div className="inv-chip">
                  <div className="inv-chip-title">{c.title}</div>
                  <p className="inv-chip-desc">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="inv-ctas">
              <a href="mailto:invest@cleophis.com" className="btn btn-primary">
                Request the investor deck
                <span className="arr" aria-hidden="true">→</span>
              </a>
              <a href="/" className="btn btn-ghost">
                See the product site
              </a>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="inv-meta">
              Pre-seed · Patrick Jackson, Founder &amp; System Architect · 2026
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
