import Link from "next/link";
import BlogLayout from "./BlogLayout";
import BlogHeader from "./BlogHeader";
import BlogSection from "./BlogSection";
import BlogSubsection from "./BlogSubsection";
import BlogBody, { BlogList, BlogParagraph } from "./BlogBody";
import BlogGraphic from "./BlogGraphic";
import BlogFlow from "./BlogFlow";
import BlogStatGrid from "./BlogStatGrid";
import BlogDefinitionList from "./BlogDefinitionList";
import BlogIssueList from "./BlogIssueList";
import BlogTableOfContents from "./BlogTableOfContents";
import BlogMobileTableOfContents from "./BlogMobileTableOfContents";
import BlogPostFooter from "./BlogPostFooter";
import BlogCode from "./BlogCode";

function renderBlock(block, index) {
  switch (block.type) {
    case "paragraph":
      return block.segments ? (
        <BlogParagraph key={index} segments={block.segments} />
      ) : (
        <BlogParagraph key={index}>{block.text}</BlogParagraph>
      );
    case "list":
      return (
        <BlogList
          key={index}
          items={block.items}
          ordered={block.ordered ?? false}
        />
      );
    case "definitions":
      return (
        <BlogDefinitionList
          key={index}
          items={block.items}
          ordered={block.ordered ?? false}
        />
      );
    case "graphic":
      return (
        <BlogGraphic
          key={index}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
        />
      );
    case "flow":
      return (
        <BlogFlow key={index} steps={block.steps} caption={block.caption} />
      );
    case "stats":
      return (
        <BlogStatGrid key={index} stats={block.stats} columns={block.columns} />
      );
    case "issues":
      return <BlogIssueList key={index} items={block.items} />;
    case "code":
      return (
        <BlogCode
          key={index}
          code={block.code}
          language={block.language}
          caption={block.caption}
        />
      );
    case "subsection":
      return (
        <BlogSubsection key={index} title={block.title}>
          {block.blocks.map((child, childIndex) =>
            renderBlock(child, `${index}-${childIndex}`)
          )}
        </BlogSubsection>
      );
    default:
      return null;
  }
}

function renderBlocks(blocks) {
  return <BlogBody>{blocks.map(renderBlock)}</BlogBody>;
}

function renderSection(section, index) {
  return (
    <BlogSection
      key={section.id ?? section.title ?? index}
      id={section.id}
      title={section.title}
      className={section.spacious ? "[&>div]:gap-6" : undefined}
    >
      {renderBlocks(section.blocks)}
    </BlogSection>
  );
}

export default function BlogPost({ post }) {
  return (
    <BlogLayout>
      <div className="mx-auto flex w-full max-w-[848px] flex-col gap-8">
        <Link
          href="/"
          className="text-[14px] text-white/60 underline decoration-white/30 underline-offset-[2px] transition-opacity hover:opacity-80"
        >
          Back home
        </Link>
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex w-full min-w-0 max-w-[600px] flex-col gap-8 md:gap-12">
            <BlogHeader
              title={post.title}
              meta={post.meta}
              cover={post.cover}
              coverCaption={post.coverCaption}
            />
            {post.navigation?.length > 0 ? (
              <BlogMobileTableOfContents navigation={post.navigation} />
            ) : null}
            {post.sections.map(renderSection)}
            <BlogPostFooter />
          </div>
          {post.navigation?.length > 0 ? (
            <aside className="hidden w-[200px] shrink-0 lg:block">
              <div className="sticky top-24 flex flex-col gap-6">
                <a
                  href="https://www.linkedin.com/in/junhengzheng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-white/8 px-4 py-1.5 text-center text-[14px] text-white/80 transition-colors hover:bg-white/12 hover:text-white/90"
                >
                  Contact
                </a>
                <BlogTableOfContents navigation={post.navigation} />
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </BlogLayout>
  );
}
