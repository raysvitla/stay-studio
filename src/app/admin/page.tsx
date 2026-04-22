// Stay Studio — admin placeholder
// Phase 2+: user management, master template editor, asset library moderation,
// analytics. For now: a friendly stub so the route exists.

export default function AdminPage() {
  return (
    <div style={{ padding: "48px 64px", maxWidth: 720, fontFamily: "'Arimo',sans-serif", color: "#3C3C3C" }}>
      <h1
        style={{
          fontFamily: "'Mukta',sans-serif",
          fontWeight: 400,
          fontSize: 48,
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          marginBottom: 16,
        }}
      >
        Admin
      </h1>
      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
        This is where designers will manage the asset library, approve uploads,
        edit master templates, and see usage analytics.
      </p>
      <p style={{ lineHeight: 1.6, color: "rgba(60,60,60,0.6)" }}>
        Ships in Phase 2. For now, template catalogs live in{" "}
        <code style={{ background: "#FCFCFC", padding: "2px 6px", borderRadius: 4 }}>
          src/lib/formats.ts
        </code>{" "}
        and{" "}
        <code style={{ background: "#FCFCFC", padding: "2px 6px", borderRadius: 4 }}>
          src/lib/templates.ts
        </code>
        .
      </p>
    </div>
  );
}
