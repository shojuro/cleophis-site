import '../site.css';
import '../board.css';
import Chrome from '../../components/board/Chrome';
import StaysDemo from '../../components/board/StaysDemo';

export const metadata = {
  title: 'Privacy and board rules · Cleophis',
  description: 'What Cleophis collects, what never leaves your device, and the rules of the feedback board.',
};

// Published before legal review at the owner's direction. A lawyer should still read this page.
const EFFECTIVE = 'November 20, 2026';

const STAYS = [
  'Everything your student types to the tutor, and everything the tutor answers.',
  'Photos of problems taken for the tutor to read, and anything spoken to it.',
  'Your own materials: the PDFs, documents and notes you add to the library.',
  'Chat history, folders and anything you export.',
];

const COLLECT = [
  ['Your account', 'Email address and a nickname. Your password is stored only in scrambled form by our sign-in provider; we cannot read it.', 'To sign you in and unlock your subscription.'],
  ['Your devices', 'When you sign in on a device: a random identifier for it, its type (for example Windows or Android), its graphics chip and how much memory it has.', 'To choose a tutor that fits the device, and to keep one subscription to a reasonable number of devices.'],
  ['Your subscription', 'Which tutors your account has unlocked, how (purchase or access code), and when access ends. If you redeem an access code, which code and when.', 'To give you what you paid for, and to know which codes have been used.'],
  ['Payments', 'Payments are taken by Stripe. We receive a customer reference and the state of your subscription. We never see or store your card number.', 'To bill you and manage renewals, refunds and cancellations.'],
  ['Forms on this website', 'What you enter: usually an email address, sometimes a name or co-op details.', 'To reply to you. Each new address gets one thank-you email. There is no newsletter.'],
  ['The feedback board', 'Your handle, the ideas and comments you post, which ideas you voted for, and any reports you send.', 'To run the board. See the board rules below.'],
  ['Technical records', 'Like every website, the companies that host this site and the installer record basic connection details such as IP address and browser type.', 'To keep the service running and secure.'],
];

const NEVER = [
  'We do not sell or rent your information.',
  'We do not show advertising.',
  'This website uses no tracking cookies and no analytics that follow you around.',
  'The app does not report how your family uses it: not which questions were asked, not for how long, not how often.',
  'We do not build profiles of children.',
];

const HELPERS = [
  ['Supabase', 'accounts and our database (stored in the United States)'],
  ['Stripe', 'payments'],
  ['Vercel', 'hosting this website'],
  ['Resend', 'sending the emails we send you'],
  ['Backblaze', 'hosting the installer and tutor downloads'],
];

const RULES = [
  ['It is for adults.', 'The board is for the adult who holds the Cleophis account. Students should not post.'],
  ['No children’s names, photos or details.', 'Do not post a child’s name, age, school, photo, voice or anything else that could identify them. That includes your own children. Photos of yourself are fine.'],
  ['No one else’s private information.', 'Not addresses, phone numbers, emails or anything shared with you in confidence.'],
  ['Be kind.', 'Disagree with ideas, not with people. No harassment, threats or slurs.'],
  ['Stay on topic.', 'Ideas and comments should be about Cleophis: tutors, features, the library, your account.'],
  ['One idea per post, and search first.', 'If someone has already suggested it, vote for theirs and add a comment.'],
  ['No advertising or spam.', 'No promotions, affiliate links or repeated posts.'],
];

const MODERATION = [
  'Anyone signed in can report an idea or comment. Only the Cleophis team sees reports.',
  'We may remove a post that breaks these rules, and we may stop an account from posting if it keeps happening.',
  'Nobody can see who voted for what. Not other members, and not us.',
  'What you say stays said. Posts cannot be edited once they are up.',
  'To correct or take back something, you can attach one amendment. It is shown as the first reply to your post, for good, and the post then stays on the board.',
  'Or you can remove the post. Removal takes 24 hours: until then the post stays visible with a timer, nobody can comment on it or vote for it, and you cannot post, comment or vote anywhere on the board. A removal cannot be undone.',
  'If a post puts someone at risk, such as a child’s details posted by mistake, report it. The Cleophis team can take a post down at once.',
  'You can export your board data or leave the board from your account page. When you leave or close your account, your handle and votes are deleted. Your ideas and comments stay on the board permanently, shown as “Former member” and closed to new comments and votes. What is posted in public remains part of the record.',
  'A status of Planned or In progress is our honest intention, not a promise or a date.',
];

function List({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((t) => (<li key={t}>{t}</li>))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <Chrome session={null}>
      <div className="bd-stack" style={{ gap: 8, maxWidth: 820 }}>
        <span className="bd-eyebrow">Privacy and board rules</span>
        <h1>What we collect, and what never leaves your device.</h1>
        <p className="bd-muted">Effective {EFFECTIVE} · Cleophis Inc.</p>
      </div>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>The short version</h2>
        <List items={[
          'Private: the tutor, your family’s conversations with it, and the materials you give it. These stay on your device. We cannot see them, because they are never sent to us.',
          'Public: the feedback board. It is a community space, and what you choose to post there is meant to be seen by other families and by us.',
          'In between is the little we need to run your account and subscription, listed in full below. We do not sell your information, show ads, or track you.',
        ]} />
      </section>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>What stays on your device</h2>
        <p>The tutor runs on your own computer or phone. These are stored there and are never sent to Cleophis or anyone else:</p>
        <List items={STAYS} />
        <p>You can check this yourself: turn off your Wi-Fi and the tutor keeps working.</p>
      </section>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>What we collect, and why</h2>
        {COLLECT.map(([what, detail, why]) => (
          <div key={what} className="bd-stack" style={{ gap: 4, paddingTop: 14, borderTop: '1px solid #E0D8C8' }}>
            <h3>{what}</h3>
            <p>{detail}</p>
            <p className="bd-muted">Why: {why}</p>
          </div>
        ))}
      </section>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>What we do not do</h2>
        <List items={NEVER} />
      </section>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>Companies that help us run Cleophis</h2>
        <p>We share information only with the services we need to operate, and only what each one needs:</p>
        <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {HELPERS.map(([name, job]) => (<li key={name}><strong>{name}</strong>: {job}</li>))}
        </ul>
        <p>We may also disclose information if the law requires it.</p>
      </section>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>Children</h2>
        <p>Cleophis accounts are for adults aged 18 or older. Students use the tutor on a family device under a parent’s or guardian’s account, and nothing a student types is sent to us.</p>
        <p>We do not knowingly collect personal information from children under 13. The feedback board is for adults only. If you believe a child has given us personal information, write to <a href="mailto:hello@cleophis.com">hello@cleophis.com</a> and we will delete it.</p>
      </section>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>Your choices</h2>
        <List items={[
          'See and download what the feedback board holds about you, or leave the board, from your account page.',
          'Change your handle or password from your account page.',
          'Cancel your subscription from inside the app.',
          'Delete your whole account by writing to hello@cleophis.com. We delete it as soon as we receive the request. Two things remain: records we must keep by law, such as payment records, and what you posted on the public board, as the board rules explain.',
          'Ask us what we hold about you, or to correct it, at the same address.',
        ]} />
      </section>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>Keeping it safe</h2>
        <p>Connections to our services are encrypted. Our database is set up so that each account can read only its own records. No system is perfectly secure; if something goes wrong that affects your information, we will tell you.</p>
      </section>

      <section id="board-rules" className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <span className="bd-eyebrow">Feedback board</span>
        <h2>Board rules</h2>
        <p>The board is public by design. It is where families talk to Cleophis and to each other, and what you post is stored on our servers and shown under your handle to other signed-in families. Your email is never shown. Post only what you are happy for the community to see.</p>
        {RULES.map(([rule, detail], i) => (
          <div key={rule} className="bd-row" style={{ alignItems: 'flex-start', flexWrap: 'nowrap', paddingTop: 12, borderTop: '1px solid #E0D8C8' }}>
            <span aria-hidden="true" style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', background: '#123C69', color: '#FBF8F1', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
            <p><strong>{rule}</strong> {detail}</p>
          </div>
        ))}
        <h3 style={{ paddingTop: 8 }}>What you say stays said</h3>
        <p>The board is meant to be an honest record, for the community and for us. So posts are not quietly edited or pulled back. Here is what happens instead:</p>
        <StaysDemo />
        <h3 style={{ paddingTop: 8 }}>How the board is looked after</h3>
        <List items={MODERATION} />
        <h3 style={{ paddingTop: 8 }}>Your ideas</h3>
        <p>What you post remains yours. By posting, you allow Cleophis to display it on the board and to use the idea in the product without payment or credit. Please do not post anything you need kept confidential.</p>
      </section>

      <section className="bd-card bd-stack" style={{ maxWidth: 820 }}>
        <h2>Changes and contact</h2>
        <p>If we change this page in a way that matters, we will say so here and update the date at the top before the change takes effect.</p>
        <p>Questions reach a person at <a href="mailto:hello@cleophis.com">hello@cleophis.com</a>. Cleophis is operated by Cleophis Inc., a Delaware corporation.</p>
      </section>
    </Chrome>
  );
}
