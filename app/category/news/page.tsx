import { getLatestPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryHeader from "@/components/CategoryHeader";

export default async function NewsPage() {
  const { items } = await getLatestPosts(50);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Category Header */}
      <CategoryHeader
        title="News"
        subtitle="Stay informed with the latest breaking news, exclusive interviews, and expert analysis from the world of entertainment"
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        }
        color="bg-blue-600"
        articleCount={items.length}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Simple Content Filters */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200">
                  All Articles
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                  Latest
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                  Popular
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                  Film
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                  TV
                </button>
              </div>
            </div>

            {/* Articles Grid */}
            {items.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {items.map((p) => <PostCard key={p.slug || p.id} post={p} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Articles Yet</h3>
                <p className="text-gray-600 text-lg">Check back soon for the latest entertainment industry content.</p>
              </div>
            )}

            {/* Simple Pagination */}
            <div className="flex justify-center mt-16">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">1</button>
                <button className="px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">2</button>
                <button className="px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">3</button>
                <button className="px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">4</button>
                <button className="px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">5</button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Advertisement */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Professional Equipment</h3>
              <p className="text-gray-600 mb-4 text-sm">High-quality filmmaking gear</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200">
                Shop Now
              </button>
            </div>

            {/* Trending Stories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Stories</h3>
              <div className="space-y-3">
                {[
                  { title: "The Future of Film", views: "2.4k views" },
                  { title: "Top 10 Films of the Year", views: "1.8k views" },
                  { title: "Streaming Wars Update", views: "1.5k views" },
                  { title: "AI in Filmmaking", views: "1.2k views" }
                ].map((story, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{story.title}</h4>
                    <span className="text-xs text-gray-500">{story.views}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Updated</h3>
              <p className="text-gray-600 text-sm mb-4">Get the latest entertainment insights</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
