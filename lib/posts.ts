import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, TABLE_POSTS } from "./dynamo";

export type Post = {
  id: string;                // PK in your table
  slug?: string;             // we'll derive from id
  title?: string;
  subtitle?: string;
  excerpt?: string;          // we'll derive from subtitle if present
  image?: string;            // your image field
  bannerUrl?: string;        // we'll map image -> bannerUrl for UI
  category?: string;         // e.g., "Reviews"
  author?: string;
  authorByline?: string;
  content?: string;
  createdAt?: string;        // ISO string preferred
  publishTime?: string;      // human-friendly string
};

// --- helpers ---
function toIsoOrZero(s?: string) {
  if (!s) return 0;
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : 0;
}

function normalize(items: any[]) {
  return (items ?? []).map((p) => {
    const createdMs = toIsoOrZero(p.createdAt);
    // Fallback: try publishTime if createdAt missing/invalid
    const publishedMs = createdMs || toIsoOrZero(p.publishTime);
    
    // Debug: Log the image field
    console.log(`Post ${p.id} - image field:`, p.image);
    console.log(`Post ${p.id} - bannerUrl field:`, p.bannerUrl);
    
    return {
      ...p,
      slug: p.slug || p.id,                    // use id as slug
      bannerUrl: p.bannerUrl || p.image,       // map image -> bannerUrl for UI
      excerpt: p.excerpt || p.subtitle,        // prefer subtitle if no excerpt
      _sortTs: publishedMs,                    // for sorting
    } as Post & { _sortTs: number };
  });
}

function sortNewest(items: (Post & { _sortTs: number })[], limit: number) {
  return items
    .filter((p) => p.title)                    // only posts with a title
    .sort((a, b) => b._sortTs - a._sortTs)     // newest first
    .slice(0, limit)
    .map(({ _sortTs, ...rest }) => rest);
}

// --- queries (using Scan for now; fine for small tables) ---

export async function getLatestPosts(limit = 9, cursor?: Record<string, any>) {
  try {
    const res = await ddb.send(
      new ScanCommand({
        TableName: TABLE_POSTS,
        ExclusiveStartKey: cursor,
      })
    );
    
    // Debug: Log raw data
    console.log("Raw DynamoDB items:", res.Items);
    
    const items = sortNewest(normalize(res.Items || []), limit);
    
    // Debug: Log normalized items
    console.log("Normalized items:", items);
    
    return { items, cursor: res.LastEvaluatedKey ?? null };
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return { items: [] as Post[], cursor: null };
  }
}

export async function getPostsByCategory(category: string, limit = 9, cursor?: Record<string, any>) {
  try {
    const res = await ddb.send(
      new ScanCommand({
        TableName: TABLE_POSTS,
        ExclusiveStartKey: cursor,
      })
    );
    const cat = category.toLowerCase();
    const filtered = (res.Items || []).filter(
      (p) => (p.category || "").toLowerCase() === cat
    );
    const items = sortNewest(normalize(filtered), limit);
    return { items, cursor: res.LastEvaluatedKey ?? null };
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return { items: [] as Post[], cursor: null };
  }
}

export async function getPost(slug: string) {
  try {
    const res = await ddb.send(
      new GetCommand({
        TableName: TABLE_POSTS,
        Key: { id: slug }, // your PK is "id"
      })
    );
    if (!res.Item) return undefined;
    const [item] = sortNewest(normalize([res.Item]), 1);
    return item as Post | undefined;
  } catch (error) {
    console.error("Error fetching post:", error);
    return undefined;
  }
}
