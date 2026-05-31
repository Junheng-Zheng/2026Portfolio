import { notFound } from "next/navigation";
import PortfolioWorkDetail from "../../Components/PortfolioWorkDetail";
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
    description: page.abstractSegments.map((s) => s.text).join(""),
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const page = getWorkPage(slug);
  if (!page) notFound();

  return (
    <PortfolioWorkDetail
      abstractSegments={page.abstractSegments}
      team={page.team}
      duration={page.duration}
    />
  );
}
