import { getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryHeader from "@/components/CategoryHeader";

export default async function ReviewsPage() {
  const { items } = await getPostsByCategory("reviews", 12);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Category Header */}
      <CategoryHeader
        title="Reviews"
        subtitle="Expert analysis and honest reviews of the latest films, TV shows, and entertainment content"
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        }
        color="bg-red-600"
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
                <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-all duration-200">
                  All
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                  Latest
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                  Popular
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                  Film Reviews
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                  TV Reviews
                </button>
              </div>
            </div>

            {/* Reviews Grid */}
            {items.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {items.map((p) => <PostCard key={p.slug || p.id} post={p} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Reviews Yet</h3>
                <p className="text-gray-600 text-lg">Check back soon for expert analysis and honest reviews.</p>
              </div>
            )}

            {/* Simple Pagination */}
            <div className="flex justify-center mt-16">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">1</button>
                <button className="px-4 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">2</button>
                <button className="px-4 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">3</button>
                <button className="px-4 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">4</button>
                <button className="px-4 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">5</button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Advertisement */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Review Platform</h3>
              <p className="text-gray-600 mb-4 text-sm">Share your own reviews</p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200">
                Get Started
              </button>
            </div>

            {/* Trending Stories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Stories</h3>
              <div className="space-y-3">
                {[
                  { title: "Top 10 Films of 2024", views: "2.4k views" },
                  { title: "Best TV Shows This Year", views: "1.8k views" },
                  { title: "Most Disappointing Films", views: "1.5k views" },
                  { title: "Hidden Gems to Watch", views: "1.2k views" }
                ].map((story, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{story.title}</h4>
                    <span className="text-xs text-gray-500">{story.views}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Updated</h3>
              <p className="text-gray-600 text-sm mb-4">Get the latest review insights</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all duration-200">
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
