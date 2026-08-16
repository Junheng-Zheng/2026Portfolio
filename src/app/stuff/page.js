import fs from "fs";
import path from "path";
import StuffContent from "./StuffContent";

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

function metaFromFile(file) {
  const base = file.replace(IMAGE_EXT, "");
  const parts = base.split("__");
  const pretty = (value) => value.replaceAll("_", " ").trim();

  // order__name__credit
  if (parts.length >= 3 && Number.isFinite(Number.parseInt(parts[0], 10))) {
    const [order, name, ...creditParts] = parts;
    return {
      order: Number.parseInt(order, 10),
      title: pretty(name),
      credit: pretty(creditParts.join("__")),
    };
  }

  // legacy name__credit
  if (parts.length >= 2) {
    const [name, ...creditParts] = parts;
    return {
      order: Number.MAX_SAFE_INTEGER,
      title: pretty(name),
      credit: pretty(creditParts.join("__")),
    };
  }

  return {
    order: Number.MAX_SAFE_INTEGER,
    title: pretty(base),
    credit: "",
  };
}

function getStuffImages() {
  const dir = path.join(process.cwd(), "public/stuff");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXT.test(file))
    .map((file) => {
      const { order, title, credit } = metaFromFile(file);
      return {
        file,
        src: `/stuff/${encodeURIComponent(file)}`,
        order,
        title,
        credit,
      };
    })
    .sort((a, b) => a.order - b.order || a.file.localeCompare(b.file));
}

export default function StuffPage() {
  const images = getStuffImages();
  return <StuffContent images={images} />;
}
