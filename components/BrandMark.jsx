// The Cleophis mark: a crown of five standing books on a paper tile.
// Same drawing as the app icon and favicon (app/favicon.ico, app/icon.png).
export default function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="63" height="63" rx="14" fill="#FBF8F1" stroke="#E0D6C2" />
      <g transform="translate(9 9.5) scale(0.72)">
        <rect className="bk bk1" x="8" y="23" width="8" height="25" rx="1.6" fill="#123C69" />
        <rect className="bk bk2" x="18" y="31" width="8" height="17" rx="1.6" fill="#123C69" />
        <rect className="bk bk3" x="28" y="17" width="8" height="31" rx="1.6" fill="#123C69" />
        <rect className="bk bk4" x="38" y="31" width="8" height="17" rx="1.6" fill="#123C69" />
        <rect className="bk bk5" x="48" y="23" width="8" height="25" rx="1.6" fill="#123C69" />
        <circle cx="12" cy="16.5" r="3.4" fill="#B08A3E" />
        <circle cx="32" cy="10" r="3.8" fill="#B08A3E" />
        <circle cx="52" cy="16.5" r="3.4" fill="#B08A3E" />
        <rect x="6" y="50.5" width="52" height="5.5" rx="1.6" fill="#B08A3E" />
      </g>
    </svg>
  );
}
