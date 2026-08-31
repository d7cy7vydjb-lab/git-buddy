import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader, ResearchDisclaimer } from "@/components/site/blocks";
import { getPost } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable | Halvin Research" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Halvin Research` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: `${post.title} | Halvin Research` },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow={post.tag} title={post.title} lead={post.excerpt} />
      <article className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,700px)_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readingTime} read
          </p>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {post.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-10 inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> All research notes
          </Link>
        </div>
        <ResearchDisclaimer className="h-fit" />
      </article>
    </>
  );
}
