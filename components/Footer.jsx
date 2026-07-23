export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          Cleophis
        </a>
        <p className="footer-tag">Downloaded, not streamed.</p>
        <nav className="footer-links" aria-label="Footer">
          <a href="/#download">Download</a>
          <a href="/investors">For investors</a>
          <a href="mailto:hello@cleophis.com">Contact</a>
        </nav>
        <p className="footer-copy">© 2026 Cleophis. All rights reserved.</p>
      </div>
    </footer>
  );
}
