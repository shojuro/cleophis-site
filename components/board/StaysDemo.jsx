// A small looping picture of the board's rule, shown before anyone posts:
// amend a post and it stays for good, or remove it and wait out 24 hours.
const DESCRIPTION =
  'Animated example. On the left, a post gets an amendment attached beneath it and stays on the board for good. ' +
  'On the right, a post asked to be removed turns yellow with a 24-hour timer, is locked, then disappears.';

function Lines() {
  return (
    <>
      <span className="bd-demo-line" style={{ width: '82%' }} />
      <span className="bd-demo-line" style={{ width: '58%' }} />
    </>
  );
}

export default function StaysDemo() {
  return (
    <div className="bd-demo" role="img" aria-label={DESCRIPTION}>
      <div className="bd-demo-col" aria-hidden="true">
        <strong>Add an amendment</strong>
        <div className="bd-demo-stage">
          <div className="bd-demo-post"><Lines /></div>
          <div className="bd-demo-amend">Author’s amendment</div>
        </div>
        <span className="bd-demo-cap">Attached as the first reply. The post stays for good.</span>
      </div>
      <div className="bd-demo-col" aria-hidden="true">
        <strong>Or remove it</strong>
        <div className="bd-demo-stage">
          <div className="bd-demo-post bd-demo-rm">
            <Lines />
            <span className="bd-demo-lock">Locked · 24 hours</span>
            <span className="bd-demo-timer"><span /></span>
          </div>
          <div className="bd-demo-gone">Removed. You can post again.</div>
        </div>
        <span className="bd-demo-cap">It stays up, locked, for 24 hours, and your posting is paused. Then it comes down.</span>
      </div>
    </div>
  );
}
