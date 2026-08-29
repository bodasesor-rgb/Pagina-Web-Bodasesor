import BlogDetailPage from "./BlogDetailPage";
import { hasStaticBlogHtml } from "../data/static-blog-slugs";
import { blogArticleHref } from "../utils/static-blog";

interface Props {
  slug: string;
}

/**
 * SPA catch-all for /blog/:slug. Nexus articles with static HTML must hard-navigate
 * so Netlify serves public/blog/{slug}/index.html — never blog-data stubs.
 */
export default function BlogStaticRedirect({ slug }: Props) {
  if (typeof window !== "undefined" && slug && hasStaticBlogHtml(slug)) {
    window.location.replace(blogArticleHref(slug));
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#162040] font-serif">
        Cargando artículo…
      </div>
    );
  }

  return <BlogDetailPage slug={slug} />;
}
