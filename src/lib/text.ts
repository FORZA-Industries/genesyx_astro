// Strips HTML comments and PLACEHOLDER markers so machine-readable outputs stay clean.
export const cleanForMachines = (s: string) =>
  s
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s*\[PLACEHOLDER:[^\]]*\]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
