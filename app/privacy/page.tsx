import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div style={styles.pageContainer}>
      <header className="navbar">
        <Link href="/" className="brand">
          <div className="brand-icon">W</div>
          <span>WhooWon</span>
        </Link>
      </header>

      <main style={styles.main}>
        <div className="card" style={styles.contentCard}>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.date}>Last Updated: June 19, 2026</p>

          <div style={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when creating an account, setting up matchups, logging scores, or interacting within the app. This includes your email, name, and game history.
            </p>
          </div>

          <div style={styles.section}>
            <h2>2. How We Use Information</h2>
            <p>
              We use the collected information to manage scoreboards, track win/loss history, compile streaks, enable sharing, and display leaderboards among you and your rivals.
            </p>
          </div>

          <div style={styles.section}>
            <h2>3. Information Sharing</h2>
            <p>
              Your matchup scores, player name, and sport statistics are public by default to ensure transparency and integrity of the scoreboards. We do not sell your personal information.
            </p>
          </div>

          <div style={styles.section}>
            <h2>4. Security & Retention</h2>
            <p>
              We use standard database protections via Supabase and secure storage to safeguard your credentials. You can request deletion of your account and related matchups at any time by contacting support.
            </p>
          </div>

          <div style={{ marginTop: "40px" }}>
            <Link href="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} WhooWon. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    width: "100vw"
  },
  main: {
    flex: 1,
    padding: "60px 24px",
    display: "flex",
    justifyContent: "center"
  },
  contentCard: {
    width: "100%",
    maxWidth: "800px",
    textAlign: "left" as const,
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px"
  },
  title: {
    fontSize: "36px",
    fontWeight: 900
  },
  date: {
    fontSize: "14px",
    color: "#64748b"
  },
  section: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px"
  }
};
