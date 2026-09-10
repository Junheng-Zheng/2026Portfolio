import { notFound } from "next/navigation";
import WorkProjectPage from "../../Components/WorkProjectPage";
import { getAllWorkSlugs, getWorkPage } from "../../data/workPages";

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getWorkPage(slug);
  if (!page) return {};

  return {
    title: `${page.title} | Junheng Zheng`,
    description: page.about?.[0] ?? `${page.title} — Junheng Zheng`,
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const page = getWorkPage(slug);
  if (!page) notFound();

  return <WorkProjectPage page={page} slug={slug} />;
}
