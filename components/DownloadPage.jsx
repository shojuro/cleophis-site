'use client';

import { useEffect, useState } from 'react';
import { MSI_HREF, saveSignup } from '../lib/site';

function detectPlatform() {
  const ua = navigator.userAgent || '';
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return 'Phone';
  if (/Mac/i.test(ua)) return 'Mac';
  if (/Linux|CrOS/i.test(ua)) return 'Linux';
  return 'Windows';
}

const EMAIL = /^\S+@\S+\.\S+$/;

export default function DownloadPage() {
  const [s, setS] = useState({ plat: 'Windows', got: false, email: '', err: false, sent: false, busy: false });
  const set = (patch) => setS((old) => ({ ...old, ...patch }));
  useEffect(() => { set({ plat: detectPlatform() }); }, []);

  const p = s.plat, win = p === 'Windows', phone = p === 'Phone';
  const isWin = win, isOther = !win, got = s.got, email = s.email, err = s.err, sent = s.sent, form = !s.sent;
  const claimed = 0, showCount = false; // shown only once there is a real count to show
  const title = win ? 'Download Cleophis' : phone ? 'Cleophis installs on a Windows PC' : 'Cleophis for ' + p + ' is on the way';
  const blurb = phone
    ? 'Leave your email and we will send you the download link to open on your computer. An Android app is on the way.'
    : 'It is not ready yet. Leave your email and we will write once, when the ' + p + ' version can be downloaded.';
  const label = phone ? 'Email me the download link' : 'Your email';
  const cta = s.busy ? 'Sending…' : phone ? 'Send me the link' : 'Email me when it is ready';
  const thanks = phone ? 'Got it. We will email you the download link for your Windows PC.' : 'Got it. We will email you when Cleophis for ' + p + ' is ready.';
  const download = () => set({ got: true });
  const onEmail = (e) => set({ email: e.target.value, err: false });
  const send = async () => {
    if (s.busy) return;
    if (!EMAIL.test(s.email.trim())) { set({ err: true }); return; }
    set({ busy: true });
    try {
      await saveSignup({ email: s.email.trim(), role: phone ? 'Download link (phone visitor)' : 'Waitlist: ' + p });
      set({ sent: true, err: false, busy: false });
    } catch {
      set({ err: true, busy: false });
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
<a href="/download" aria-current="page" className="btn" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 18px', borderRadius: '10px', background: '#A83A5C', color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}>Download</a>
</nav>
</div>
</header>

<main style={{ background: '#F1EBDF' }}>
<div style={{ maxWidth: '1160px', margin: '0 auto', padding: '56px 24px 88px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '40px 56px' }}>

<div style={{ flex: '1 1 480px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '22px' }}>
<h1 className="load d2" style={{ margin: '0', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', fontSize: 'clamp(36px, 4.6vw, 54px)', lineHeight: '1.1', letterSpacing: '-0.01em', color: '#123C69', textWrap: 'balance' }}>{title}</h1>

{isWin && (<>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
<p style={{ margin: '0', fontSize: '19px', color: '#465060', textWrap: 'pretty' }}>Free to install. You pay inside the app when you pick your first subject.</p>
<a href={MSI_HREF} onClick={download} className="btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '56px', padding: '0 28px', border: '0', borderRadius: '12px', background: '#A83A5C', color: '#FFFFFF', font: '600 18px var(--font-sans), system-ui, sans-serif', cursor: 'pointer' }}>Download for Windows <span className="arr arrd" aria-hidden="true">↓</span></a>
<p style={{ margin: '0', fontSize: '15px', color: '#5C6470' }}>CleophisSetup.msi · Windows 10 or newer · 4 GB of memory or more</p>
<p style={{ margin: '0', maxWidth: '520px', padding: '12px 14px', borderRadius: '10px', background: '#F3E6C4', color: '#6B4A0C', fontSize: '15px' }}>Cleophis is new, so Windows may show a “Windows protected your PC” box when you open the installer. Choose <strong>More info</strong>, then <strong>Run anyway</strong>.</p>
{got && (<>
<div role="status" className="depth" style={{ alignSelf: 'stretch', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '14px' }}>
<span style={{ fontWeight: '600', color: '#1B5E40' }}>Your download has started. If it did not, use the button again.</span>
<span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '600', fontSize: '22px', color: '#123C69' }}>Three steps once it is installed</span>
<ol style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
<li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><span style={{ flex: 'none', width: '28px', height: '28px', borderRadius: '50%', background: '#123C69', color: '#FBF8F1', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span><span>Open Cleophis and create your account.</span></li>
<li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><span style={{ flex: 'none', width: '28px', height: '28px', borderRadius: '50%', background: '#123C69', color: '#FBF8F1', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span><span>Pick Algebra I and subscribe. The founding price is applied for you.</span></li>
<li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><span style={{ flex: 'none', width: '28px', height: '28px', borderRadius: '50%', background: '#123C69', color: '#FBF8F1', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span><span>Type in or photograph the first problem your student is stuck on.</span></li>
</ol>
</div>
</>)}
<a href="#other" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', fontWeight: '600' }}>Other platforms</a>
</div>
</>)}

{isOther && (<>
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
<p style={{ margin: '0', fontSize: '19px', color: '#465060', textWrap: 'pretty' }}>{blurb}</p>
{form && (<>
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '460px' }}>
<label htmlFor="em" style={{ fontWeight: '600' }}>{label}</label>
<input id="em" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={onEmail} style={{ minHeight: '52px', padding: '0 16px', boxSizing: 'border-box', width: '100%', border: '1px solid #8F8778', borderRadius: '12px', background: '#FBF8F1', color: '#1E2A3A', font: '400 17px var(--font-sans), system-ui, sans-serif' }} />
{err && (<>
<p role="alert" style={{ margin: '0', color: '#A3261C', fontWeight: '600' }}>Enter your email address.</p>
</>)}
<button type="button" onClick={send} className="btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '56px', padding: '0 28px', border: '0', borderRadius: '12px', background: '#A83A5C', color: '#FFFFFF', font: '600 18px var(--font-sans), system-ui, sans-serif', cursor: 'pointer' }}>{cta}</button>
<span style={{ fontSize: '15px', color: '#5C6470' }}>One email. No newsletter.</span>
</div>
</>)}
{sent && (<>
<p role="status" style={{ margin: '0', padding: '16px 18px', borderRadius: '12px', background: '#DCEFE3', color: '#1B5E40', fontWeight: '600' }}>{thanks}</p>
</>)}
</div>
</>)}
</div>

<div style={{ flex: '1 1 360px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '18px' }}>
<div className="depth" style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '14px', borderTop: '4px solid #B08A3E' }}>
<span style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#983154' }}>Founding families</span>
<span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '700', fontSize: '26px', lineHeight: '1.2', color: '#123C69' }}>$5 a month for the first 100 families</span>
<p style={{ margin: '0', color: '#465060' }}>For as long as you stay subscribed. After the first 100, it is $10 a month. The price is applied automatically when you subscribe in the app.</p>
{showCount && (<>
<p style={{ margin: '0', fontWeight: '600', color: '#1E2A3A' }}>{claimed} of 100 claimed</p>
</>)}
</div>
<div className="depth" style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '14px' }}>
<span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '600', fontSize: '20px', color: '#123C69' }}>30-day money-back promise</span>
<p style={{ margin: '0', color: '#465060' }}>If Cleophis is not right for your family in the first 30 days, write to <a href="mailto:hello@cleophis.com">hello@cleophis.com</a> and we refund you.</p>
</div>
<div id="code" className="depth" style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '14px' }}>
<span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '600', fontSize: '20px', color: '#123C69' }}>Have an access code?</span>
<p style={{ margin: '0', color: '#465060' }}>Investors and beta testers: download as usual, then choose “Have a code?” on the payment screen inside the app. Nothing to pay.</p>
</div>
<div id="other" className="depth" style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', background: '#FBF8F1', border: '1px solid #E0D8C8', borderRadius: '14px' }}>
<span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: '600', fontSize: '20px', color: '#123C69' }}>Platforms</span>
<p style={{ margin: '0', color: '#465060' }}>Windows is available now. Mac, Linux and Android are on the way.</p>
</div>
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
<a href="#code" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>Have a code?</a>
<a href="mailto:hello@cleophis.com" style={{ display: 'flex', alignItems: 'center', minHeight: '44px', padding: '0 10px', fontSize: '16px', fontWeight: '500' }}>Contact</a>
</nav>
<span style={{ fontSize: '14px', color: '#5C6470' }}>© 2026 Cleophis. All rights reserved.</span>
</div>
</footer>
</div>
  );
}
