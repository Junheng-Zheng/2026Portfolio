import { notFound } from "next/navigation";
import BlogPost from "../../Components/blog/BlogPost";
import PasswordGate from "../../Components/PasswordGate";
import { getAllBlogSlugs, getBlogPost } from "../../data/blogPosts";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Junheng Zheng`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  if (post.passwordProtected === false) {
    return <BlogPost post={post} />;
  }

  return (
    <PasswordGate>
      <BlogPost post={post} />
    </PasswordGate>
  );
}
