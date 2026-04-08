import { products } from "@/lib/products";

const SITE = "https://mypawadvisor.com";

export async function GET() {
  const blogPosts = [
    {
      slug: "best-dog-food-for-golden-retrievers",
      title: "Best Dog Food for Golden Retrievers 2026 – Vet-Approved Picks",
      excerpt: "Vet-approved picks covering heart health, joint support, and weight management for Golden Retrievers.",
      date: "2026-04-01",
    },
    {
      slug: "best-dog-food-for-german-shepherds",
      title: "Best Dog Food for German Shepherds 2026",
      excerpt: "High-protein, large-breed formulas tested with real German Shepherds. Complete ingredient analysis.",
      date: "2026-04-02",
    },
    {
      slug: "best-cat-food",
      title: "Best Cat Food in 2026: Top Picks for Every Cat",
      excerpt: "We reviewed 25+ wet and dry cat food brands so you don't have to.",
      date: "2026-04-03",
    },
    {
      slug: "pet-insurance-worth-it",
      title: "Is Pet Insurance Actually Worth It? Honest Answer",
      excerpt: "We crunched the numbers on vet costs vs. premiums. Here's the honest answer.",
      date: "2026-04-04",
    },
    {
      slug: "best-pet-products-amazon",
      title: "Best Pet Products on Amazon 2026 – Tested & Rated",
      excerpt: "Our top picks from 82,000+ Amazon reviews across dog toys, beds, grooming tools, and more.",
      date: "2026-04-05",
    },
  ];

  const reviewItems = products
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.name} Review 2026 – Honest Hands-On Testing]]></title>
      <link>${SITE}/reviews/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/reviews/${p.slug}</guid>
      <description><![CDATA[${p.tagline} Rating: ${p.rating}/5 from ${p.reviewCount} Amazon reviews. Price: ${p.price}.]]></description>
      <pubDate>Tue, 08 Apr 2026 08:00:00 GMT</pubDate>
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
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
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
      <url>${SITE}/favicon.ico</url>
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
