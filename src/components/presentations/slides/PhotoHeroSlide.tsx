import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, PAD } from "./slideCommon";

export default function PhotoHeroSlide({ c, slide }: SlideRenderProps) {
  const photo = slide.photoUrl;
  return (
    <SlideFrame c={c} bg={photo ? c.text : c.bg}>
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "auto",
          padding: `${PAD}px ${PAD}px ${PAD / 2}px ${PAD}px`,
          background: photo ? "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)" : "transparent",
        }}
      >
        <h1
          style={{
            ...TITLE_STYLE,
            fontSize: 120,
            color: photo ? "#FFF" : c.text,
            maxWidth: 1400,
          }}
        >
          {slide.title || "Meet the team."}
        </h1>
        {slide.subtitle && (
          <p
            style={{
              ...BODY_STYLE,
              fontSize: 30,
              marginTop: 20,
              color: photo ? "rgba(255,255,255,0.85)" : c.text,
              opacity: photo ? 1 : 0.82,
              maxWidth: 1200,
            }}
          >
            {slide.subtitle}
          </p>
        )}
      </div>
    </SlideFrame>
  );
}
