import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.brand.name}, création de sites et d'applications`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0b0b0c", color: "#edeae3", position: "relative" }}>
        <div style={{ position: "absolute", left: 250, top: 260, width: 700, height: 700, borderRadius: 700, background: "radial-gradient(circle, rgba(255,106,61,0.55), rgba(255,106,61,0) 65%)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 2, background: "linear-gradient(90deg, transparent, #ff6a3d 30%, #8fd6cb 70%, transparent)" }} />
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 2 }}>{`${siteConfig.brand.name} · ${siteConfig.brand.tagline}`.toUpperCase()}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1, letterSpacing: -2 }}>
          <span>Des sites et des apps</span>
          <span style={{ color: "#ff6a3d" }}>qui travaillent pour vous.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#96928b" }}>{siteConfig.location}</div>
      </div>
    ),
    size,
  );
}
