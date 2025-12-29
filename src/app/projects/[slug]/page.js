import Template from "@/app/Components/Template";
import { Projects } from "@/app/data/Projects";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const Project = Projects[slug];
  if (!Project) return <div className="p-12">Project Not Found</div>;
  return <Template {...Project} />;
}
