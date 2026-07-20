import { ImageResponse } from "next/og";

export const alt = "INVINCIBLE PROS. — Engineering the future";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1000px 600px at 78% -10%, rgba(56,225,255,0.16), transparent 60%), radial-gradient(900px 600px at 0% 110%, rgba(124,92,255,0.18), transparent 55%), #050609",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#eef1fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "9999px",
              background: "linear-gradient(120deg, #38e1ff, #7c5cff)",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            INVINCIBLE PROS.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "94px",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Engineering
          </div>
          <div
            style={{
              fontSize: "94px",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(100deg, #38e1ff, #7c5cff)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            the future.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#9aa3b8",
            letterSpacing: "0.01em",
          }}
        >
          Software · Intelligence · Design · Infrastructure · Hardware ·
          Experience
        </div>
      </div>
    ),
    { ...size },
  );
}
