import Link from "next/link";
import { getAllContent, getAllTags } from "@/lib/content";

const categoryLabel: Record<string, string> = {
  reviews: "Review",
  research: "Research",
  journal: "Journal",
  publications: "Publication",
  projects: "Project",
};

export default function Home() {
  const reviews = getAllContent("reviews").slice(0, 3);
  const tags = getAllTags().slice(0, 16);
  const journalItems = getAllContent("journal").slice(0, 4);
  const researchItems = getAllContent("research").slice(0, 3);
  const allContent = [
    ...reviews.slice(0, 1).map((i) => ({ ...i, cat: "review" })),
    ...researchItems.slice(0, 1).map((i) => ({ ...i, cat: "research" })),
    ...journalItems.slice(0, 1).map((i) => ({ ...i, cat: "journal" })),
  ];

  const categories = [
    { name: "Review", slug: "/review", count: getAllContent("reviews").length },
    { name: "Research", slug: "/research", count: getAllContent("research").length },
    { name: "Journal", slug: "/journal", count: getAllContent("journal").length },
    { name: "Publications", slug: "/publications", count: getAllContent("publications").length },
    { name: "Projects", slug: "/projects", count: getAllContent("projects").length },
  ];

  return (
    <div className="page-wrap" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="two-col">
       {/* ─── Left Column: Latest Posts ─── */}
       <div className="col-main">
          {/* About */}
          <div className="widget" style={{ marginBottom: 40 }}>
            <h1 className="section-title">About</h1>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--color-text)" }}>
              网络社会不研究所（Institute of Not Studying Network Society，INNS）
              成立于一个已经记不清具体日期的下午。研究所长期坚持
              "不立项、不结项、不验收"的办所方针，积极推进
              "有空再说""下周开始""等我整理一下"等重大科研计划。
              近年来，在摸鱼理论、窗口切换学、浏览器标签管理、
              收藏夹考古、文献囤积工程、同人文生产关系、赛博拖延症
              等领域取得了零星成果，获得广泛自娱自乐。
            </p>
          </div>

         <h1 className="section-title">Latest</h1>

          {reviews.map((item) => (
            <Link key={item.slug} href={`/review/${item.slug}`} className="article-card">
              <div className="article-thumb">
                <span>NS</span>
              </div>
              <div className="article-body">
                <span className="article-category">Review</span>
                <h2 className="article-title">{item.meta.title}</h2>
                {item.meta.description && (
                  <p className="article-summary">{item.meta.description}</p>
                )}
                <span className="article-date">{item.meta.date}</span>
              </div>
            </Link>
          ))}

          {researchItems.map((item) => (
            <Link key={item.slug} href={`/research/${item.slug}`} className="article-card">
              <div className="article-thumb">
                <span>NS</span>
              </div>
              <div className="article-body">
                <span className="article-category">Research</span>
                <h2 className="article-title">{item.meta.title}</h2>
                {item.meta.description && (
                  <p className="article-summary">{item.meta.description}</p>
                )}
                <span className="article-date">{item.meta.date}</span>
              </div>
            </Link>
          ))}

          {journalItems.map((item) => (
            <Link key={item.slug} href={`/journal/${item.slug}`} className="article-card">
              <div className="article-thumb">
                <span>NS</span>
              </div>
              <div className="article-body">
                <span className="article-category">Journal</span>
                <h2 className="article-title">{item.meta.title}</h2>
                {item.meta.description && (
                  <p className="article-summary">{item.meta.description}</p>
                )}
                <span className="article-date">{item.meta.date}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── Right Column: Sidebar ─── */}
        <div className="col-side">
          {/* Newsletter Widget */}
          <div className="widget">
            <h3 className="widget-title">Newsletter</h3>
            <p className="newsletter-text">
              Subscribe for updates on new research, reviews, and projects.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>

          {/* Tags Widget */}
          <div className="widget">
            <h3 className="widget-title">Tags</h3>
            <div className="sidebar-tags">
              {tags.map(({ tag }) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="sidebar-tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Posts Widget */}
          <div className="widget">
            <h3 className="widget-title">Recent Posts</h3>
            {[...reviews, ...researchItems].slice(0, 4).map((item) => (
              <Link
                key={item.slug}
                href={`/${item.meta.type === "reviews" ? "review" : "research"}/${item.slug}`}
                className="recent-item"
              >
                <p className="recent-title">{item.meta.title}</p>
                <span className="recent-date">{item.meta.date}</span>
              </Link>
            ))}
          </div>

          {/* Categories Widget */}
          <div className="widget">
            <h3 className="widget-title">Categories</h3>
            {categories.map((cat) => (
              <Link key={cat.slug} href={cat.slug} className="cat-item">
                <span>{cat.name}</span>
                <span className="cat-count">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
