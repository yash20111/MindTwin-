import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "MindTwin — Your mind, remembered.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#FBF8F3",
        backgroundImage:
          "radial-gradient(circle at 85% 20%, rgba(255,181,71,0.45), transparent 45%), radial-gradient(circle at 70% 90%, rgba(76,111,255,0.22), transparent 45%), radial-gradient(circle at 10% 100%, rgba(255,122,69,0.25), transparent 40%)",
        color: "#14161C",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="88" height="88" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7A45" />
              <stop offset="100%" stopColor="#FFB547" />
            </linearGradient>
            <clipPath id="c">
              <circle cx="12" cy="16" r="9" />
            </clipPath>
          </defs>
          <circle cx="20" cy="16" r="9" fill="url(#g)" clipPath="url(#c)" />
          <circle cx="12" cy="16" r="9" fill="none" stroke="#14161C" strokeWidth="2.5" />
          <circle cx="20" cy="16" r="9" fill="none" stroke="#4C6FFF" strokeWidth="2.5" />
        </svg>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 800, letterSpacing: -1.5 }}>
          Mind<span style={{ color: "#B8481C" }}>Twin</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            flexWrap: "wrap",
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          Your mind,&nbsp;
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, #E0592A, #FF7A45 50%, #FFB547)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            remembered.
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#5B6070", maxWidth: 900 }}>
          Speak it, write it, live it — MindTwin remembers it all, and answers when you ask.
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5B6070" }}
      >
        <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        <span
          style={{
            display: "flex",
            padding: "10px 24px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #FF7A45, #FFB547)",
            color: "#14161C",
            fontWeight: 700,
          }}
        >
          Join the waitlist
        </span>
      </div>
    </div>,
    size,
  );
}
