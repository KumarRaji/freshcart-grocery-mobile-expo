const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log("Source folder not found:", src);
    process.exit(1);
  }

  fs.mkdirSync(dest, { recursive: true });

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const src = path.join(process.cwd(), "privacy");
const dest = path.join(process.cwd(), "dist", "privacy");

copyDir(src, dest);
console.log("✅ Copied privacy pages to:", dest);
