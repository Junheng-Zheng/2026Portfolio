import { notFound } from "next/navigation";
import BlogPost from "../../Components/blog/BlogPost";
import BlogScrollToTop from "../../Components/blog/BlogScrollToTop";
import PasswordGate from "../../Components/PasswordGate";
import ProcessUnlockCheck from "../../Components/ProcessUnlockCheck";
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

  if (post.requiresProcessUnlock) {
    return (
      <>
        <BlogScrollToTop />
        <ProcessUnlockCheck>
          <BlogPost post={post} />
        </ProcessUnlockCheck>
      </>
    );
  }

  if (post.passwordProtected === false) {
    return (
      <>
        <BlogScrollToTop />
        <BlogPost post={post} />
      </>
    );
  }

  return (
    <>
      <BlogScrollToTop />
      <PasswordGate>
        <BlogPost post={post} />
      </PasswordGate>
    </>
  );
}
