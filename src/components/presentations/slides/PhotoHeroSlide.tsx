import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, PAD, resolveCanvas } from "./slideCommon";
import RichText from "../RichText";

export default function PhotoHeroSlide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const photo = slide.photoUrl;
  const canvas = resolveCanvas(c, canvasMode);
  // When there's a photo we render directly (bypass SlideFrame) so the photo
  // can fill the bleed and the title sits directly on the image. Otherwise we
  // fall back to the normal frame with an accent background.
  if (photo) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#000",
          overflow: "hidden",
          color: "#FFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: `${PAD / 2}px ${PAD}px 0 ${PAD}px`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/logos/alternative-logo-white.svg`}
            alt="Stay"
            style={{ height: 48, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: `${PAD}px ${PAD}px ${PAD + 72}px ${PAD}px`,
            zIndex: 2,
          }}
        >
          <RichText
            as="h1"
            text={slide.title || "Meet the team."}
            iconScale={0.85}
            style={{ ...TITLE_STYLE, fontSize: 140, color: "#FFF", maxWidth: 1500 }}
          />
          {slide.subtitle && (
            <p style={{ ...BODY_STYLE, fontSize: 32, marginTop: 18, color: "rgba(255,255,255,0.88)", maxWidth: 1200 }}>
              {slide.subtitle}
            </p>
          )}
        </div>
        <Footer canvasBg="#000" canvasFg="#FFF" pageNumber={pageNumber} totalPages={totalPages} />
      </div>
    );
  }

  return (
    <SlideFrame c={c} canvasMode={canvasMode} pageNumber={pageNumber} totalPages={totalPages} bg={canvas.accent}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: `${PAD}px ${PAD}px ${PAD + 72}px ${PAD}px`,
          gap: 20,
        }}
      >
        <RichText
          as="h1"
          text={slide.title || "Meet the team."}
          iconScale={0.85}
          style={{ ...TITLE_STYLE, fontSize: 140, color: canvas.fg, maxWidth: 1500 }}
        />
        {slide.subtitle && (
          <p style={{ ...BODY_STYLE, fontSize: 32, color: canvas.fg, opacity: 0.82, maxWidth: 1200 }}>
            {slide.subtitle}
          </p>
        )}
      </div>
    </SlideFrame>
  );
}

function Footer({ canvasBg, canvasFg, pageNumber, totalPages }: { canvasBg: string; canvasFg: string; pageNumber?: number; totalPages?: number }) {
  const showPage = typeof pageNumber === "number" && pageNumber > 0;
  return (
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        bottom: PAD / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 3,
        pointerEvents: "none",
      }}
    >
      {showPage ? (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: canvasFg,
            color: canvasBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 500,
            fontSize: 22,
          }}
        >
          {String(pageNumber).padStart(2, "0")}
          {typeof totalPages === "number" && totalPages > 0 && (
            <span style={{ opacity: 0.55, fontSize: 14, marginLeft: 2 }}>/{String(totalPages).padStart(2, "0")}</span>
          )}
        </div>
      ) : (
        <span />
      )}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "10px 22px",
          borderRadius: 999,
          border: `2px solid ${canvasFg}`,
          background: "transparent",
          color: canvasFg,
          fontFamily: "'Mukta', sans-serif",
          fontWeight: 500,
          fontSize: 20,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        stayinsured.de
      </div>
    </div>
  );
}
