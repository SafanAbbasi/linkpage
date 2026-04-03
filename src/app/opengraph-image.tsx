import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Safan Abbasi — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 50%, #0f172a 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            borderRadius: 32,
            padding: "48px 64px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "#0d9488",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
              color: "white",
            }}
          >
            SA
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#111827",
              marginTop: 24,
            }}
          >
            Safan Abbasi
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#6b7280",
              marginTop: 8,
            }}
          >
            Software Engineer &amp; NASA Patent Co-Inventor
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 32,
              fontSize: 16,
              color: "#9ca3af",
            }}
          >
            Full-Stack Engineering &bull; AI &amp; LLM Systems &bull; Cloud Architecture
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
