import Link from "next/link";

export default function Home() {
  return (
    <div className="main-layout">
      {/* Navigation Header */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">W</div>
          <span>WhooWon</span>
        </div>
        <nav className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#download" className="nav-link">Download</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Track Your Matchups.<br />
          Discover <span>WhooWon</span>.
        </h1>
        <p>
          The premium scoreboard app for friendly rivalries. Keep history, log scores, and see who dominates in tennis, video games, chess, and more.
        </p>

        <div className="download-badges" id="download">
          {/* App Store Badge Mockup */}
          <div className="store-badge">
            <span className="store-icon"></span>
            <div className="store-text">
              <span className="store-subtitle">Download on the</span>
              <span className="store-title">App Store</span>
            </div>
          </div>

          {/* Google Play Badge Mockup */}
          <div className="store-badge">
            <span className="store-icon">🤖</span>
            <div className="store-text">
              <span className="store-subtitle">Get it on</span>
              <span className="store-title">Google Play</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2 className="features-title">Why WhooWon?</h2>
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="card feature-card">
            <div className="feature-icon-wrapper">⚔️</div>
            <h3>1v1 Rivalries</h3>
            <p>Create matchups and track head-to-head performance over time. Never argue about who's better again.</p>
          </div>

          {/* Feature 2 */}
          <div className="card feature-card">
            <div className="feature-icon-wrapper">📊</div>
            <h3>Scoreboard History</h3>
            <p>Log scores quickly with built-in templates matching the rules of your favorite sports and board games.</p>
          </div>

          {/* Feature 3 */}
          <div className="card feature-card">
            <div className="feature-icon-wrapper">🏆</div>
            <h3>Leagues & Tournaments</h3>
            <p>Scale up your game. Host weekend tournaments or run long-term leagues with dynamic leaderboards.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-nav">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <p>© {new Date().getFullYear()} WhooWon. All rights reserved.</p>
      </footer>
    </div>
  );
}
