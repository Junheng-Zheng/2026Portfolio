import GetInTouchButton from "../GetInTouchButton";
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
            renderBlock(child, `${index}-${childIndex}`),
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
    >
      {renderBlocks(section.blocks)}
    </BlogSection>
  );
}

export default function BlogPost({ post, embedded = false }) {
  const content = (
    <div
      className={`mx-auto flex w-full flex-col gap-16 ${
        embedded ? "max-w-none" : "max-w-[848px]"
      }`}
    >
      <div className="flex w-full flex-col gap-16 lg:flex-row lg:gap-12">
        <div
          className={`flex w-full min-w-0 flex-col gap-16 ${
            embedded ? "max-w-none" : "max-w-[600px]"
          }`}
        >
          {embedded ? null : (
            <BlogHeader
              title={post.title}
              meta={post.meta}
              cover={post.cover}
              coverCaption={post.coverCaption}
            />
          )}
          {!embedded && post.navigation?.length > 0 ? (
            <BlogMobileTableOfContents navigation={post.navigation} />
          ) : null}
          {post.sections.map(renderSection)}
        </div>
        {!embedded && post.navigation?.length > 0 ? (
          <aside className="hidden w-[200px] shrink-0 lg:block">
            <div className="sticky top-24 flex flex-col gap-6">
              <GetInTouchButton size="compact" />
              <BlogTableOfContents navigation={post.navigation} />
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return <BlogLayout>{content}</BlogLayout>;
}
