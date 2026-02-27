import { ImageResponse } from "next/og";

export const alt = "Vishnu — Founder & Systems Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #111111 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "80px",
                    fontFamily: "system-ui, sans-serif",
                    position: "relative",
                }}
            >
                {/* Subtle grid pattern overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage:
                            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 0%, transparent 50%)",
                        display: "flex",
                    }}
                />

                {/* Accent line */}
                <div
                    style={{
                        width: "60px",
                        height: "4px",
                        background: "linear-gradient(90deg, #ffffff, #666666)",
                        marginBottom: "40px",
                        borderRadius: "2px",
                        display: "flex",
                    }}
                />

                {/* Name */}
                <div
                    style={{
                        fontSize: "72px",
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "-2px",
                        lineHeight: 1,
                        marginBottom: "20px",
                        display: "flex",
                    }}
                >
                    Vishnu
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: "28px",
                        fontWeight: 400,
                        color: "#888888",
                        letterSpacing: "0.5px",
                        marginBottom: "48px",
                        display: "flex",
                    }}
                >
                    Founder · Operator · Product Builder
                </div>

                {/* Description */}
                <div
                    style={{
                        fontSize: "20px",
                        fontWeight: 400,
                        color: "#555555",
                        lineHeight: 1.6,
                        maxWidth: "700px",
                        display: "flex",
                    }}
                >
                    Building scalable businesses in lead generation, automation, and AI systems.
                </div>

                {/* Domain */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "60px",
                        right: "80px",
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "#444444",
                        letterSpacing: "1px",
                        display: "flex",
                    }}
                >
                    justaditya.com
                </div>
            </div>
        ),
        { ...size }
    );
}
