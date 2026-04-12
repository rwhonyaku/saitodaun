import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ERRORS_DIR = path.join(ROOT, "app", "errors");

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function ensureImport(src) {
  const importLine = `import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";`;

  if (src.includes(importLine)) return src;

  // Insert after last import line, or at top if none
  const lines = src.split("\n");
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*import\s.+from\s.+;?\s*$/.test(lines[i])) lastImportIdx = i;
  }

  if (lastImportIdx >= 0) {
    lines.splice(lastImportIdx + 1, 0, importLine);
    return lines.join("\n");
  }

  return `${importLine}\n\n${src}`;
}

function hasComponent(src) {
  return (
    src.includes("<ErrorRelatedLinks") ||
    src.includes('ErrorRelatedLinks currentSlug=')
  );
}

function injectComponent(src, slug) {
  // We’ll inject just before the final closing tag of the outermost JSX return.
  // Common patterns:
  //   return ( ... </main> );
  //   return ( ... </div> );
  //
  // We do a conservative insertion: find the last occurrence of "\n  );" (or similar)
  // and inject before it, but *inside* the return parentheses.
  //
  // If that fails, we do nothing (and you can paste one file for manual placement).

  const componentLine = `\n        <ErrorRelatedLinks currentSlug="${slug}" />\n`;

  // Find the last "return (" block end by locating the last ");" that closes return.
  const idx = src.lastIndexOf("\n  );");
  if (idx === -1) return src;

  // Insert component before that, but we want it inside JSX.
  // We’ll try to insert before the last closing tag of </main> or </article> or </div> within the return.
  const beforeReturnClose = src.slice(0, idx);
  const afterReturnClose = src.slice(idx);

  const candidates = ["</main>", "</article>", "</section>", "</div>"];
  let insertAt = -1;
  let chosen = "";

  for (const tag of candidates) {
    const pos = beforeReturnClose.lastIndexOf(tag);
    if (pos > insertAt) {
      insertAt = pos;
      chosen = tag;
    }
  }

  if (insertAt === -1) return src;

  const head = beforeReturnClose.slice(0, insertAt);
  const tail = beforeReturnClose.slice(insertAt);

  return head + componentLine + tail + afterReturnClose;
}

function getSlugFromFile(filePath) {
  // app/errors/<slug>/page.tsx OR deeper like app/errors/<slug>/something/page.tsx
  // We take the directory name directly under app/errors
  const rel = path.relative(ERRORS_DIR, filePath);
  const parts = rel.split(path.sep);
  return parts[0]; // first folder under errors/
}

function main() {
  if (!fs.existsSync(ERRORS_DIR)) {
    console.error(`Not found: ${ERRORS_DIR}`);
    process.exit(1);
  }

  const all = walk(ERRORS_DIR);
  const pages = all.filter((p) => p.endsWith(`${path.sep}page.tsx`));

  let changed = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of pages) {
    const slug = getSlugFromFile(file);
    let src = fs.readFileSync(file, "utf8");

    // Only touch error article pages in app/errors/<slug>/page.tsx
    if (!slug || slug === "index" || slug === "status-codes") {
      skipped++;
      continue;
    }

    const already = hasComponent(src);
    if (already) {
      skipped++;
      continue;
    }

    const withImport = ensureImport(src);
    const injected = injectComponent(withImport, slug);

    if (injected === src) {
      console.warn(`WARN: Could not inject into ${path.relative(ROOT, file)}`);
      failed++;
      continue;
    }

    fs.writeFileSync(file, injected, "utf8");
    changed++;
  }

  console.log(
    `Done. changed=${changed}, skipped=${skipped}, failed=${failed}, total=${pages.length}`
  );

  if (failed > 0) {
    console.log(
      `Some files could not be auto-injected due to unexpected JSX structure. Those are safe to fix manually.`
    );
  }
}

main();