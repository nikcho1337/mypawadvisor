import { products } from "@/lib/products";
import { blogPosts as allBlogPosts, blogPostDate } from "@/lib/blog";

const SITE = "https://www.mypawadvisor.com";

export async function GET() {
  const blogPosts = [...allBlogPosts].sort((a, b) => blogPostDate(b).getTime() - blogPostDate(a).getTime());

  const reviewItems = products
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.name} Review 2026 – Honest Hands-On Testing]]></title>
      <link>${SITE}/reviews/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/reviews/${p.slug}</guid>
      <description><![CDATA[${p.tagline} Rating: ${p.rating}/5 from ${p.reviewCount} Amazon reviews. Price: ${p.price}.]]></description>
      <pubDate>${new Date(p.datePublished + "T08:00:00Z").toUTCString()}</pubDate>
      <category>Pet Product Reviews</category>
      <image>
        <url>${p.heroImage}</url>
        <title>${p.name}</title>
        <link>${SITE}/reviews/${p.slug}</link>
      </image>
    </item>`
    )
    .join("\n");

  const blogItems = blogPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${blogPostDate(post).toUTCString()}</pubDate>
      <category>Pet Care</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>MyPawAdvisor – Honest Pet Product Reviews</title>
    <link>${SITE}</link>
    <description>Hands-on reviews of the best pet products on Amazon. No sponsored rankings. Real testing with real pets.</description>
    <language>en-us</language>
    <managingEditor>hello@mypawadvisor.com (MyPawAdvisor)</managingEditor>
    <webMaster>hello@mypawadvisor.com (MyPawAdvisor)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE}/og-default.png</url>
      <title>MyPawAdvisor</title>
      <link>${SITE}</link>
    </image>
    ${reviewItems}
    ${blogItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
