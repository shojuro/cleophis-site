// The automatic thank-you email sent once to each new address collected on the website.
// Server-side only. Sending is skipped (and the signup still saved) unless RESEND_API_KEY is set.

const FROM = process.env.THANKS_FROM || 'Cleophis <hello@cleophis.com>';
const REPLY_TO = process.env.THANKS_REPLY_TO || 'hello@cleophis.com';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// What we tell them happens next, based on which form they used.
function nextStep(role) {
  const r = (role || '').toLowerCase();
  if (r.startsWith('co-op')) return 'We read every co-op request ourselves and will reply personally about a pilot for your families.';
  if (r.startsWith('download link')) return 'Cleophis installs on a Windows PC. Open this email on your computer and download it here: https://www.cleophis.com/download';
  if (r.startsWith('waitlist:')) return 'We will write to you once, when Cleophis is ready for your device.';
  return 'We will write to you when there is news worth your time.';
}

export function thanksEmail({ name, role }) {
  const hello = name ? `Hello ${name},` : 'Hello,';
  const lines = [
    hello,
    'Thank you for your interest in Cleophis, the offline tutor that runs on your family’s own device.',
    nextStep(role),
    'We do not send a newsletter, and we never share your address. If you have a question, reply to this email and it reaches a person.',
    'Patrick Jackson\nFounder, Cleophis\nhttps://www.cleophis.com',
  ];
  const link = (t) => esc(t).replace(/(https:\/\/[^\s<]+)/g, '<a href="$1" style="color:#983154">$1</a>');
  const html =
    '<div style="font-family:Georgia,serif;font-size:17px;line-height:1.6;color:#1E2A3A;max-width:560px">' +
    lines.map((l) => `<p style="margin:0 0 16px">${link(l).replace(/\n/g, '<br>')}</p>`).join('') +
    '</div>';
  return { subject: 'Thank you for your interest in Cleophis', text: lines.join('\n\n'), html };
}

// Returns true when the provider accepted the email.
export async function sendThanks({ email, name, role }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const { subject, text, html } = thanksEmail({ name, role });
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [email], reply_to: REPLY_TO, subject, text, html }),
  });
  if (!res.ok) console.error('[thanks email] provider error', res.status, await res.text());
  return res.ok;
}
