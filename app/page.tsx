import Link from "next/link";
import TaleOfTheTape from "./tale-of-the-tape";

const SPECS = [
  {
    index: "01",
    title: "Head-to-Head Record",
    body: "Every match logged to a permanent ledger. Win–loss, current streak, and the rivalry that never lies — settled once and for all.",
  },
  {
    index: "02",
    title: "Built-In Scoring",
    body: "Real rules for tennis, padel, table tennis, badminton, chess and more. Tap in the result; we handle sets, games, and tie-breaks.",
  },
  {
    index: "03",
    title: "Leagues & Ladders",
    body: "Run a weekend bracket or a season-long ladder. Standings re-rank the moment a match ends — no spreadsheet, no arguments.",
  },
];

export default function Home() {
  return (
    <div className="main-layout">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">W</div>
          <span>WhooWon</span>
        </div>
        <nav className="nav-links">
          <a href="#specs" className="nav-link">
            Specs
          </a>
          <a href="#download" className="nav-link">
            Download
          </a>
          <span className="nav-live">
            <span className="dot" />
            1,204 matches today
          </span>
        </nav>
      </header>

      {/* Hero — Tale of the Tape */}
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">The Rivalry Ledger · Est. 2026</span>
          <h1 className="display">
            <span className="line">Settle</span>
            <span className="line outline">Every</span>
            <span className="line">
              Score<span className="dot">.</span>
            </span>
          </h1>
          <p className="hero-sub">
            The premium scoreboard for friendly bloodsport. Log every set,
            track every streak, and prove — match after match — exactly{" "}
            <span className="whoo">whoo&nbsp;won</span>.
          </p>
          <div className="hero-actions">
            <a href="#download" className="btn">
              Get the App →
            </a>
            <a href="#specs" className="btn btn-secondary">
              See the Specs
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <b>7</b> sports
            </span>
            <span>
              <b>0</b> spreadsheets
            </span>
            <span>
              <b>∞</b> bragging rights
            </span>
          </div>
        </div>

        <TaleOfTheTape />
      </section>

      {/* Spec sheet */}
      <section className="specs" id="specs">
        <div className="specs-head">
          <h2 className="display">
            The
            <br />
            Spec Sheet
          </h2>
          <p>
            Built like equipment, not a toy. Everything you need to keep an
            honest record and crown an undisputed champion.
          </p>
        </div>

        {SPECS.map((spec) => (
          <div className="spec-row" key={spec.index}>
            <div className="spec-index">/ {spec.index}</div>
            <div className="spec-title">{spec.title}</div>
            <p className="spec-body">{spec.body}</p>
          </div>
        ))}
      </section>

      {/* Download */}
      <section className="download" id="download">
        <span className="eyebrow">Free · iOS &amp; Android</span>
        <h2 className="display">
          Put It On
          <br />
          The Board<span className="dot">.</span>
        </h2>
        <p>
          Download WhooWon, challenge your first rival, and let the scoreboard
          do the talking.
        </p>
        <div className="download-badges">
          <div className="store-badge">
            <span className="store-icon"></span>
            <div className="store-text">
              <span className="store-subtitle">Download on the</span>
              <span className="store-title">App Store</span>
            </div>
          </div>
          <div className="store-badge">
            <span className="store-icon">▶</span>
            <div className="store-text">
              <span className="store-subtitle">Get it on</span>
              <span className="store-title">Google Play</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} WhooWon</span>
        <nav className="footer-nav">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </div>
  );
}
