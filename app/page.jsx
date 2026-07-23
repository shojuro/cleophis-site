import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import EmailCapture from '../components/EmailCapture';
import HeroChat from '../components/HeroChat';

const NAV_LINKS = [
  ['#why', 'Why Cleophis'],
  ['#privacy', 'Privacy'],
  ['#subjects', 'Subjects'],
  ['#pricing', 'Pricing'],
  ['/investors', 'Investors'],
];

// When the installer is ready: drop it at public/downloads/CleophisSetup.msi,
// set MSI_READY = true, and the site reverts to direct-download buttons.
const MSI_READY = false;
const MSI_HREF = '/downloads/CleophisSetup.msi';
const CTA_HREF = MSI_READY ? MSI_HREF : '#download';
const CTA_LABEL = MSI_READY ? 'Download for Windows' : 'Get early access';

const TRIO = [
  {
    title: 'Endlessly patient',
    desc: 'It explains again — a new way each time — without sighing, judging, or charging by the hour.',
  },
  {
    title: 'Works anywhere',
    desc: 'Kitchen table, long car rides, spotty Wi-Fi. The tutor is on the device, so it just works.',
  },
  {
    title: 'One quiet price',
    desc: '$10 a month. No hourly rates, no surprise fees, and you can cancel whenever you like.',
  },
];

const FAQ = [
  {
    q: 'What does it run on?',
    a: 'Any Windows PC with at least 4 GB of memory. Android is on the way, with more platforms after that.',
  },
  {
    q: 'Is it really private?',
    a: 'Yes — in the way that matters. The tutoring happens entirely on your device, and what your child says to the tutor is never sent anywhere. Your account only handles sign-in, family profiles, and billing — it can’t see the conversations.',
  },
  {
    q: 'Why is there an account?',
    a: 'Two reasons: it unlocks your subscription, and it gives everyone in the house their own space. Mom, dad, and each kid can have their own tutor, their own subjects, and their own conversations — separate and private.',
  },
  {
    q: 'Does it just hand over answers?',
    a: 'It’s built to teach — walking through problems step by step and checking understanding along the way, the way a good tutor would.',
  },
  {
    q: 'When does it need the internet?',
    a: 'To download the app, to sign in, and to add new subject tutors. The tutoring itself runs fully offline. And if you’ve signed in on a device before, it remembers you — you can get back in even without a connection.',
  },
  {
    q: 'What does it cost?',
    a: '$10 a month, inside the app, after you install. Installing is free, and you can cancel anytime.',
  },
];

export default function Home() {
  return (
    <main id="top">
      <Nav links={NAV_LINKS} cta={{ href: CTA_HREF, label: MSI_READY ? 'Download' : 'Get early access' }} />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="float-d" style={{ width: 20, height: 20, top: '20%', left: '4%' }} />
        <div className="float-d" style={{ width: 12, height: 12, top: '70%', left: '9%', animationDelay: '-5s' }} />

        <div className="container hero-grid">
          <div>
            <Reveal>
              <span className="hero-badge">
                <span className="diamond" aria-hidden="true" />
                Early access · Windows
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1>A patient tutor for your kid. Right on your device.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="hero-sub">
                Cleophis lives on your computer — not in the cloud. It explains, step by step, as
                many times as your kid needs. Once it’s set up, tutoring needs no internet —{' '}
                <strong>and nothing your kid says ever leaves home.</strong> Ten dollars a month.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="hero-ctas">
                <a href={CTA_HREF} className="btn btn-primary" download={MSI_READY ? true : undefined}>
                  {CTA_LABEL}
                  <span className="arr" aria-hidden="true">{MSI_READY ? '↓' : '→'}</span>
                </a>
                <a href="#why" className="btn btn-ghost">
                  Why families choose it
                </a>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <p className="dl-note">For Windows PCs with 4 GB of memory or more · Android on the way</p>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <HeroChat />
          </Reveal>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="section" id="why">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Why Cleophis
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">Gentle help, whenever homework happens.</h2>
          </Reveal>

          <div className="trio">
            {TRIO.map((t, i) => (
              <Reveal key={t.title} delay={i * 120}>
                <div className="trio-item">
                  <span className="diamond" aria-hidden="true" />
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRIVACY ================= */}
      <section className="section privacy" id="privacy">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Privacy
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">What happens at home, stays home.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sub privacy-lead">
              Your child’s questions, homework, and conversations never leave your device — the
              tutoring has nothing to send. Your account is just a key: it signs you in, keeps each
              family member’s tutor separate, and manages your subscription. It can’t see what’s
              said. What happens between your kid and their tutor stays on the machine.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="quiet-list">
              Conversations stay on-device · No tracking · A profile for everyone in the house
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= WHAT'S A LOCAL TUTOR ================= */}
      <section className="section" id="local">
        <div className="container explain-grid">
          <div>
            <Reveal>
              <div className="kicker">
                <span className="diamond" aria-hidden="true" />
                On your device
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="headline">Downloaded, not streamed.</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="sub">
                Most AI tutors live in a data center — your child reaches them through the
                internet, and their questions travel with them. Cleophis works the way software
                used to: you download it, and it’s yours. The tutor itself — the AI — is installed
                on your computer, sized to fit the memory it has. That’s why tutoring works with no
                Wi-Fi, and why the conversations never leave the house.
              </p>
            </Reveal>
          </div>
          <div className="explain-cards">
            <Reveal delay={200}>
              <div className="card explain-card">
                <div className="explain-label">Cloud AI</div>
                <p className="card-desc">Questions travel to someone else’s computer.</p>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="card explain-card explain-card-us">
                <div className="explain-label explain-label-us">Cleophis</div>
                <p className="card-desc">The tutor lives on yours.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= YOUR STUDY SPACE ================= */}
      <section className="section darksec" id="library">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Your study space
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">Their books, their notes, their tutor.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sub">
              Cleophis isn’t just a chat window — it’s a private study space your family fills with
              its own materials. And like everything else, it all stays on the device.
            </p>
          </Reveal>

          <div className="grid4">
            <Reveal delay={0}>
              <div className="inv-chip">
                <div className="inv-chip-title">Teach it from your own books</div>
                <p className="inv-chip-desc">
                  Turn your materials into knowledge packs. The tutor answers from them and cites
                  its sources — or says honestly when the answer isn’t in there.
                </p>
              </div>
            </Reveal>
            <Reveal delay={110}>
              <div className="inv-chip">
                <div className="inv-chip-title">Bring your files</div>
                <p className="inv-chip-desc">
                  PDFs, Word docs, EPUBs, text and notes — if it’s readable, it can join the
                  library.
                </p>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="inv-chip">
                <div className="inv-chip-title">Private folders</div>
                <p className="inv-chip-desc">
                  Keep chats organized by kid, class, or project — with search, and archive for
                  when things pile up.
                </p>
              </div>
            </Reveal>
            <Reveal delay={330}>
              <div className="inv-chip">
                <div className="inv-chip-title">Your chats, yours to keep</div>
                <p className="inv-chip-desc">
                  Export any conversation whenever you like. Nothing is locked in — because nothing
                  ever left your device.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= SUBJECTS ================= */}
      <section className="section privacy" id="subjects">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Subjects
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">Built subject by subject — on purpose.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="sub">
              Each subject is its own specialist — a tutor trained for that topic, not a
              jack-of-all-trades stretched thin. The library keeps growing, and every tutor in it
              is part of the same subscription.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="tag-row">
              <span className="tag tag-live">Algebra II</span>
              <span className="tag tag-live">AP Biology</span>
              <span className="tag tag-live">Essay writing</span>
              <span className="tag">SAT · ACT prep — soon</span>
              <span className="tag">Coding — soon</span>
              <span className="tag">More on the way</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="section" id="pricing">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Pricing
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">Tutoring, without the tutoring bill.</h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="price-card">
              <div className="compare">
                <span className="strike">$60/hour with a human tutor</span>
              </div>
              <div className="price-line">
                <span className="price-num">$10</span>
                <span className="price-per">/month · everything included</span>
              </div>
              <ul className="price-list">
                <li>Unlimited questions, 24/7</li>
                <li>Every subject, current and future</li>
                <li>Works fully offline</li>
                <li>Nothing leaves your device</li>
                <li>Cancel anytime</li>
              </ul>
              <a href={CTA_HREF} className="btn btn-primary" download={MSI_READY ? true : undefined}>
                {CTA_LABEL}
                <span className="arr" aria-hidden="true">{MSI_READY ? '↓' : '→'}</span>
              </a>
              <p className="dl-note">Free to install, subscribe in-app</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section privacy" id="faq">
        <div className="container">
          <Reveal>
            <div className="kicker">
              <span className="diamond" aria-hidden="true" />
              Common questions
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline">Questions parents ask.</h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>
                    {f.q}
                    <span className="faq-chev" aria-hidden="true" />
                  </summary>
                  <p className="faq-a">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="band" id="download">
        <div className="container">
          <Reveal>
            <h2 className="headline">Homework gets easier tonight.</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="band-sub">Private. Offline. $10 a month. Installed in a minute.</p>
          </Reveal>
          {MSI_READY && (
            <Reveal delay={250}>
              <div className="band-ctas">
                <a href={MSI_HREF} className="btn btn-primary" download>
                  Download for Windows
                  <span className="arr" aria-hidden="true">↓</span>
                </a>
              </div>
            </Reveal>
          )}
          <Reveal delay={MSI_READY ? 350 : 250}>
            <p className="band-capture-lead">
              {MSI_READY
                ? 'Not on Windows? Leave your email and we’ll tell you when Cleophis reaches your device.'
                : 'The Windows download opens soon. Leave your email and we’ll send it to you the moment it’s ready.'}
            </p>
            <EmailCapture />
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
