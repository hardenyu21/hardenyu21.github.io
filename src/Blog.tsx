import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { blogPosts } from './data/blog';

/** 展示研究文章索引，正文使用独立静态页面以保留原有公式和图表。 */
export function Blog() {
  return (
    <>
      <Header isHome={false} />
      <main id="top" className="blog-page">
        <section className="blog-hero" aria-labelledby="blog-title">
          <div className="blog-hero-inner">
            <a className="blog-home-link" href="/">← Academic homepage</a>
            <p className="blog-eyebrow">Notes & ideas</p>
            <h1 id="blog-title">Blog<span>.</span></h1>
            <p className="blog-intro">
              Research notes on video generation, real-time interaction, and trustworthy AI.
            </p>
            <div className="blog-topics" aria-label="Research topics">
              <span>Video generation</span><span>Real-time interaction</span><span>Trustworthy AI</span>
            </div>
          </div>
        </section>
        <section className="blog-collection" aria-labelledby="blog-posts-title">
          <div className="blog-collection-heading">
            <h2 id="blog-posts-title">Latest writing</h2>
            <span>{blogPosts.length} {blogPosts.length === 1 ? 'article' : 'articles'}</span>
          </div>
          <div className="blog-posts">
            {blogPosts.map((post) => (
              <article className="blog-post" key={post.slug}>
                <a className="blog-cover" href={post.href} aria-label={`阅读：${post.title}`}>
                  <div className="stream-cover" aria-hidden="true">
                    <span className="stream-cover-label">Streaming video</span>
                    <span className="stream-live"><i />Continuous generation</span>
                    <div className="stream-frames">
                      <div className="stream-frame stream-past"><span>k − 1</span></div>
                      <div className="stream-frame stream-now"><span>k</span></div>
                      <div className="stream-frame stream-next"><span>k + 1</span></div>
                    </div>
                    <div className="stream-track"><span /><span /><span /><span /><span /></div>
                    <div className="stream-cover-caption"><span>History</span><span>Generate</span><span>Continue →</span></div>
                  </div>
                </a>
                <div className="blog-post-copy">
                  <div className="blog-post-meta">
                    <time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time><span>{post.category}</span>
                  </div>
                  <h3 lang="zh-CN"><a href={post.href}>{post.title}</a></h3>
                  <p lang="zh-CN">{post.summary}</p>
                  <ul className="blog-tags" aria-label="Article topics">
                    {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <a className="blog-read-link" href={post.href}>Read article <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
