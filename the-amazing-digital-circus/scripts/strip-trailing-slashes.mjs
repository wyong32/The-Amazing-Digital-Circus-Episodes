import fs from "node:fs";
import path from "node:path";

function stripTrailingSlash(url) {
  if (!url || url === "/" || /^https?:\/\//.test(url)) return url;
  return url.replace(/\/+$/, "");
}

function transform(content) {
  let c = content;
  c = c.replace(/href="(\/[^"]*)"/g, (m, p) => `href="${stripTrailingSlash(p)}"`);
  c = c.replace(/href=\{`([^`]+)`\}/g, (m, p) => `href={\`${stripTrailingSlash(p)}\`}`);
  c = c.replace(/absoluteUrl\(`([^`]+)`\)/g, (m, p) => `absoluteUrl(\`${stripTrailingSlash(p)}\`)`);
  c = c.replace(/href: "(\/[^"]*)"/g, (m, p) => `href: "${stripTrailingSlash(p)}"`);
  return c;
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(js|astro|ts|txt)$/.test(name)) {
      const orig = fs.readFileSync(p, "utf8");
      const next = transform(orig);
      if (next !== orig) fs.writeFileSync(p, next);
    }
  }
}

const guidesPath = "src/data/guides.js";
let guides = fs.readFileSync(guidesPath, "utf8");
const end = guides.indexOf("];");
if (end !== -1) {
  guides = guides.slice(0, end + 2) + "\n";
  fs.writeFileSync(guidesPath, transform(guides));
}

walk("src");
walk("public");
