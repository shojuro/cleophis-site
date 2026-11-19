'use client';

import { useState } from 'react';
import { saveSignup } from '../lib/site';

const EMAIL = /^\S+@\S+\.\S+$/;

export default function CoopsPage() {
  const [s, setS] = useState({ name: '', coop: '', families: '', email: '', err: '', sent: false, busy: false });
  const field = (k) => (e) => setS((old) => ({ ...old, [k]: e.target.value, err: '' }));
  const { name, coop, families, email, err, sent } = s;
  const form = !sent;
  const on_name = field('name'), on_coop = field('coop'), on_families = field('families'), on_email = field('email');
  const send = async () => {
    if (s.busy) return;
    let msg = '';
    if (!name.trim() || !coop.trim()) msg = 'Enter your name and your co-op’s name.';
    else if (!families) msg = 'Choose about how many families.';
    else if (!EMAIL.test(email.trim())) msg = 'Enter your email address.';
    if (msg) { setS((o) => ({ ...o, err: msg })); return; }
    setS((o) => ({ ...o, busy: true }));
    try {
      await saveSignup({ name: name.trim(), email: email.trim(), role: ('Co-op: ' + coop.trim()).slice(0, 80) + ' (' + families + ')' });
      setS((o) => ({ ...o, sent: true, busy: false }));
    } catch {
      setS((o) => ({ ...o, busy: false, err: 'That did not send. Please try again, or write to hello@cleophis.com.' }));
    }
  };

  return (
<div style={{ background: '#FBF8F1', color: '#1E2A3A', fontFamily: 'var(--font-sans), system-ui, sans-serif', fontSize: '17px', lineHeight: '1.6' }}>

<div className="prog" aria-hidden="true"></div>
<header className="hdr" style={{ borderBottom: '1px solid #E0D8C8', background: 'rgba(251, 248, 241, 0.88)' }}>
<div style={{ maxWidth: '1160px', margin: '0 auto', padding: '12px 24px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px 24px' }}>
<a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '44px', textDecoration: 'none' }}><svg className="crown" role="img" aria-label="Cleophis mark: a crown made of standing books" width="36" height="36" viewBox="0 0 64 64" style={{ flex: 'none' }}><rect x="8" y="23" width="8" height="25" rx="1.6" fill="#123C69"></rect><rect x="18" y="31" width="8" height="17" rx="1.6" fill="#123C69"></rect><rect x="28" y="17" width="8" height="31" rx="1.6" fill="#123C69"></rect><rect x="38" y="31" width="8" height="17" rx="1.6" fill="#123C69"></rect><rect x="48" y="23" width="8" height="25" rx="1.6" fill="#123C69"></rect><circle cx="12" cy="16.5" r="3.4" fill="#B08A3E"></circle><circle cx="32" cy="10" r="3.8" fill="#B08A3E"></circle><circle cx="52" cy="16.5" r="3.4" fill="#B08A3E"></circle><rect x="6" y="50.5" width="52" height="5.5" rx="1.6" fill="#B08A3E"></rect></svg><span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', fontSize: '26px', color: '#123C69' }}>Cleophis</span></a>
<nav aria-label="Main" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 6px' }}>
<a href="/#why" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Why Cleophis</a>
<a href="/#privacy" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Privacy</a>
<a href="/#subjects" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Subjects</a>
<a href="/#pricing" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Pricing</a>
<a href="/investors" className="nl" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 12px', color: '#465060', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>Investors</a>
<a href="/download" className="btn" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 18px', borderRadius: '10px', background: '#A83A5C', color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}>Download</a>
</nav>
</div>
</header>

<main style={{ background: '#F1EBDF' }}>
<div style={{ maxWidth: '1160px', margin: '0 auto', padding: '64px 24px 88px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '40px 56px' }}>

<div style={{ flex: '1 1 460px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '22px' }}>
<span className="load d1" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: '#FBF8F1', border: '1px solid #E0D8C8', fontSize: '14px', fontWeight: '600', color: '#465060' }}><span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B08A3E' }}></span>For homeschool co-ops</span>
<h1 className="load d2" style={{ margin: '0', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', fontSize: 'clamp(36px, 4.6vw, 54px)', lineHeight: '1.1', letterSpacing: '-0.01em', color: '#123C69', textWrap: 'balance' }}>Bring Cleophis to your co-op.</h1>
<p className="load d3" style={{ margin: '0', fontSize: '19px', color: '#465060', textWrap: 'pretty' }}>Cleophis is an offline tutor that runs on each family’s own computer. What students type never leaves the device, so there are no student accounts for you to manage and no data for the co-op to look after. We are running a small number of group pilots with co-ops this season.</p>
<ol className="load d4" style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', color: '#465060' }}>
<li style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}><span style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '50%', background: '#123C69', color: '#FBF8F1', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span><span><strong style={{ display: 'block', color: '#1E2A3A' }}>Tell us about your co-op.</strong>A few details in the form, and we reply personally.</span></li>
<li style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}><span style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '50%', background: '#123C69', color: '#FBF8F1', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span><span><strong style={{ display: 'block', color: '#1E2A3A' }}>We send an access code for each family.</strong>Pilot families use Cleophis free for the length of the pilot.</span></li>
<li style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}><span style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '50%', background: '#123C69', color: '#FBF8F1', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span><span><strong style={{ display: 'block', color: '#1E2A3A' }}>Each family installs it at home.</strong>They download it on their own Windows PC and enter the code in the app.</span></li>
</ol>
<p style={{ margin: '0', fontSize: '15px', color: '#5C6470' }}>Just one family? <a href="/download">Download Cleophis</a></p>
</div>

<div className="load d3" style={{ flex: '1 1 380px', minWidth: '0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '18px', padding: '32px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '16px', boxShadow: '0 18px 40px rgba(30, 42, 58, 0.1)' }}>
{form && (<>
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
<h2 style={{ margin: '0', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', fontSize: '28px', lineHeight: '1.2', color: '#123C69' }}>Tell us about your co-op</h2>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><label htmlFor="nm" style={{ fontWeight: '600' }}>Your name</label><input id="nm" type="text" autoComplete="name" value={name} onChange={on_name} style={{ minHeight: '52px', padding: '0 16px', boxSizing: 'border-box', width: '100%', border: '1px solid #8F8778', borderRadius: '12px', background: '#FBF8F1', color: '#1E2A3A', font: '400 17px var(--font-sans), system-ui, sans-serif' }} /></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><label htmlFor="cp" style={{ fontWeight: '600' }}>Co-op name</label><input id="cp" type="text" autoComplete="organization" value={coop} onChange={on_coop} style={{ minHeight: '52px', padding: '0 16px', boxSizing: 'border-box', width: '100%', border: '1px solid #8F8778', borderRadius: '12px', background: '#FBF8F1', color: '#1E2A3A', font: '400 17px var(--font-sans), system-ui, sans-serif' }} /></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><label htmlFor="fam" style={{ fontWeight: '600' }}>About how many families?</label>
<select id="fam" value={families} onChange={on_families} style={{ minHeight: '52px', padding: '0 16px', boxSizing: 'border-box', width: '100%', border: '1px solid #8F8778', borderRadius: '12px', background: '#FBF8F1', color: '#1E2A3A', font: '400 17px var(--font-sans), system-ui, sans-serif' }}>
<option value="">Choose one</option><option>Under 10</option><option>10 to 25</option><option>26 to 50</option><option>More than 50</option>
</select></div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><label htmlFor="em" style={{ fontWeight: '600' }}>Email</label><input id="em" type="email" autoComplete="email" value={email} onChange={on_email} style={{ minHeight: '52px', padding: '0 16px', boxSizing: 'border-box', width: '100%', border: '1px solid #8F8778', borderRadius: '12px', background: '#FBF8F1', color: '#1E2A3A', font: '400 17px var(--font-sans), system-ui, sans-serif' }} /></div>
{err && (<>
<p role="alert" style={{ margin: '0', color: '#A3261C', fontWeight: '600' }}>{err}</p>
</>)}
<button type="button" onClick={send} className="btn" style={{ minHeight: '54px', border: '0', borderRadius: '12px', background: '#A83A5C', color: '#FFFFFF', font: '600 18px var(--font-sans), system-ui, sans-serif', cursor: 'pointer' }}>Ask about a pilot</button>
<p style={{ margin: '0', fontSize: '15px', color: '#5C6470' }}>A person replies, usually within two days. We do not add you to a mailing list.</p>
</div>
</>)}
{sent && (<>
<div role="status" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
<span style={{ alignSelf: 'flex-start', padding: '4px 14px', borderRadius: '999px', background: '#DCEFE3', color: '#1B5E40', fontSize: '14px', fontWeight: '600' }}>Request sent</span>
<h2 style={{ margin: '0', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', fontSize: '30px', lineHeight: '1.15', color: '#123C69' }}>Thank you, {name}.</h2>
<p style={{ margin: '0', fontSize: '18px', color: '#465060' }}>We will write to {email} about a pilot for {coop}.</p>
</div>
</>)}
</div>
</div>
</main>

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
