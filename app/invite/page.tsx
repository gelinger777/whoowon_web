"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// Replicate sports mapping locally for styling
const SPORTS = [
  { slug: "tennis", emoji: "🎾" },
  { slug: "padel", emoji: "🎾" },
  { slug: "table_tennis", emoji: "🏓" },
  { slug: "badminton", emoji: "🏸" },
  { slug: "chess", emoji: "♟" },
  { slug: "foosball", emoji: "⚽" },
  { slug: "mini_golf", emoji: "⛳" }
];

function getSportEmoji(slug: string): string {
  return SPORTS.find((s) => s.slug === slug)?.emoji ?? "🏆";
}

function splitEventName(name: string) {
  const parts = name.split(" vs ");
  return {
    sideA: parts[0]?.trim() || "Player 1",
    sideB: parts[1]?.trim() || "Player 2"
  };
}

interface InvitePreview {
  rivalry_id: string;
  sport_slug: string;
  side_a_name: string;
  side_b_name: string;
  invite_role: string;
  claim_side: "A" | "B" | null;
  already_accepted: boolean;
  participant_name: string | null;
  expires_at: string | null;
}

function InviteContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<InvitePreview | null>(null);

  useEffect(() => {
    if (!token) {
      setError("No invite token provided in the URL.");
      setLoading(false);
      return;
    }

    async function fetchPreview() {
      try {
        setLoading(true);
        setError(null);

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yswfadxlxnssxkdpcsxk.supabase.co";
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseAnonKey) {
          setError("Invite preview is not configured yet.");
          return;
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data, error: rpcError } = await supabase.rpc("get_event_invite_preview", {
          invite_token: token
        });

        if (rpcError) throw rpcError;

        const rawPreview = Array.isArray(data) ? data[0] : data;
        if (!rawPreview) {
          setError("Invite link is invalid or has expired.");
          return;
        }

        const { sideA, sideB } = splitEventName(rawPreview.event_name || "");
        const participantName = rawPreview.participant_name || null;

        setPreview({
          rivalry_id: rawPreview.event_id,
          sport_slug: rawPreview.sport_slug || "generic",
          side_a_name: sideA,
          side_b_name: sideB,
          invite_role: rawPreview.invite_role || "participant",
          claim_side: participantName ? (participantName === sideA ? "A" : "B") : null,
          already_accepted: Boolean(rawPreview.already_accepted),
          participant_name: participantName,
          expires_at: rawPreview.expires_at || null
        });

        // Trigger automatic deep-link redirect
        const deepLink = `whoowon://invite/${token}`;
        setTimeout(() => {
          window.location.replace(deepLink);
        }, 800);
      } catch (err) {
        console.error("Error loading invite preview:", err);
        setError("Could not load the invite. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }

    fetchPreview();
  }, [token]);

  const deepLinkUrl = token ? `whoowon://invite/${token}` : "#";

  return (
    <div style={styles.pageContainer}>
      <header className="navbar">
        <Link href="/" className="brand">
          <div className="brand-icon">W</div>
          <span>WhooWon</span>
        </Link>
      </header>

      <main style={styles.main}>
        <div className="card" style={styles.inviteCard}>
          {loading && (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Loading invite details...</p>
            </div>
          )}

          {error && (
            <div style={styles.errorContainer}>
              <div style={styles.errorIcon}>⚠️</div>
              <h2 style={styles.errorTitle}>Invalid Invite</h2>
              <p style={{ marginBottom: "20px" }}>{error}</p>
              <Link href="/" className="btn btn-secondary">
                Go to Homepage
              </Link>
            </div>
          )}

          {!loading && !error && preview && (
            <div style={styles.cardContent}>
              <div style={styles.badgeWrapper}>
                <span style={styles.sportBadge}>
                  {getSportEmoji(preview.sport_slug)}
                </span>
              </div>

              <h1 style={styles.cardTitle}>You're Invited!</h1>

              <p style={styles.subtitle}>
                You have been invited to join the matchup as a{" "}
                <strong style={styles.highlight}>{preview.invite_role}</strong>.
              </p>

              <div style={styles.matchBox}>
                <div style={styles.competitor}>
                  <span style={styles.competitorName}>{preview.side_a_name}</span>
                  {preview.claim_side === "A" && <span style={styles.youBadge}>You</span>}
                </div>
                <div style={styles.vs}>vs</div>
                <div style={styles.competitor}>
                  <span style={styles.competitorName}>{preview.side_b_name}</span>
                  {preview.claim_side === "B" && <span style={styles.youBadge}>You</span>}
                </div>
              </div>

              <a href={deepLinkUrl} className="btn" style={styles.btnFull}>
                Open in App
              </a>

              <p style={styles.hintText}>
                We are attempting to open this in your <strong>WhooWon</strong> app automatically. If nothing happens, click the button above.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="footer" style={{ marginTop: "auto" }}>
        <p>© {new Date().getFullYear()} WhooWon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={
      <div style={styles.pageContainer}>
        <header className="navbar">
          <Link href="/" className="brand">
            <div className="brand-icon">W</div>
            <span>WhooWon</span>
          </Link>
        </header>
        <main style={styles.main}>
          <div className="card" style={styles.inviteCard}>
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Loading invite page...</p>
            </div>
          </div>
        </main>
      </div>
    }>
      <InviteContent />
    </Suspense>
  );
}

// Inline styles
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    width: "100vw"
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px"
  },
  inviteCard: {
    width: "100%",
    maxWidth: "480px",
    textAlign: "center" as const,
    animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "16px",
    padding: "40px 0"
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(16,20,18,0.12)",
    borderTop: "3px solid #4f7a0d",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  errorContainer: {
    padding: "20px 0"
  },
  errorIcon: {
    fontSize: "48px",
    marginBottom: "16px"
  },
  errorTitle: {
    fontSize: "24px",
    fontWeight: 800,
    marginBottom: "10px",
    color: "#ff5a2e"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    alignItems: "center"
  },
  badgeWrapper: {
    width: "72px",
    height: "72px",
    borderRadius: "22px",
    background: "rgba(198, 242, 78, 0.12)",
    border: "1px solid rgba(198, 242, 78, 0.28)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sportBadge: {
    fontSize: "36px"
  },
  cardTitle: {
    fontSize: "32px",
    fontWeight: 900
  },
  subtitle: {
    fontSize: "16px",
    color: "#6a716a"
  },
  highlight: {
    color: "#4f7a0d",
    textTransform: "uppercase" as const,
    fontWeight: 800,
    letterSpacing: "0.05em"
  },
  matchBox: {
    width: "100%",
    background: "rgba(16, 20, 18, 0.035)",
    border: "1px solid rgba(16,20,18,0.10)",
    borderRadius: "18px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px"
  },
  competitor: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "4px",
    flex: 1
  },
  competitorName: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#11150f"
  },
  youBadge: {
    fontSize: "10px",
    background: "#c6f24e",
    color: "#0a0c0b",
    padding: "2px 8px",
    borderRadius: "8px",
    fontWeight: 800,
    textTransform: "uppercase" as const
  },
  vs: {
    fontSize: "14px",
    fontWeight: 900,
    color: "#9aa099",
    textTransform: "uppercase" as const
  },
  btnFull: {
    width: "100%"
  },
  hintText: {
    fontSize: "13px",
    color: "#6a716a"
  }
};
