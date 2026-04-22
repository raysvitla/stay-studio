// Stay Studio — root page
// Static export doesn't support redirect() from next/navigation, so the
// root route renders the editor directly. /editor remains an alias.

import EditorShell from "@/components/editor/EditorShell";

export default function HomePage() {
  return <EditorShell />;
}
