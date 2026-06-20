import Link from "next/link";

export default function TermsPage() {
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
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.date}>Last Updated: June 19, 2026</p>

          <div style={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the WhooWon application, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the service.
            </p>
          </div>

          <div style={styles.section}>
            <h2>2. Scoreboard Integrity</h2>
            <p>
              WhooWon relies on honest submissions. You agree to submit only accurate and agreed-upon match scores. Intentionally falsifying scores or manipulating matchups may result in account termination.
            </p>
          </div>

          <div style={styles.section}>
            <h2>3. Account Responsibilities</h2>
            <p>
              You are responsible for keeping your login credentials secure. You must immediately notify support of any unauthorized use of your account.
            </p>
          </div>

          <div style={styles.section}>
            <h2>4. Limitations of Liability</h2>
            <p>
              WhooWon is provided "as is" without warranties of any kind. We are not liable for any disputes, scores, or competitive disagreements that arise out of the use of this service.
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
