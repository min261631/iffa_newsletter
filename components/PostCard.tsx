import Link from "next/link";

export default function PostCard({ post }: { post: any }) {
  // Normalize post data to ensure consistency
  const normalizedPost = {
    title: post.title || "Untitled Article",
    subtitle: post.subtitle || post.excerpt || "",
    image: post.bannerUrl || post.image || "https://placehold.co/800x450/e5e7eb/6b7280?text=E+FORUM",
    category: post.category || "General",
    author: post.author || "E FORUM Team",
    authorByline: post.authorByline || "Entertainment Expert",
    publishTime: post.publishTime || post.createdAt || "Recent",
    slug: post.slug || post.id || ""
  };

  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300">
      <Link href={`/post/${normalizedPost.slug}`}>
        {/* Image Container - Always present */}
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={normalizedPost.image}
            alt={normalizedPost.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge - Always present */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white shadow-sm">
              {normalizedPost.category}
            </span>
          </div>
          {/* Hover Overlay - Always present */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content - Always present with consistent structure */}
        <div className="p-5">
          {/* Author Info - Always present */}
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {normalizedPost.author.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-sm text-gray-600">{normalizedPost.author}</span>
            <span className="ml-2 text-xs text-gray-500">• {normalizedPost.authorByline}</span>
          </div>

          {/* Title - Always present */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
            {normalizedPost.title}
          </h3>

          {/* Excerpt/Subtitle - Always present */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {normalizedPost.subtitle || "Read the full article for complete insights and analysis."}
          </p>

          {/* Footer - Always present with consistent structure */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-gray-500 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 01-2-2V5a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{normalizedPost.publishTime}</span>
            </div>
            
            {/* Read More Arrow - Always present */}
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
              <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
