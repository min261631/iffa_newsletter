import { getLatestPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import SubscribeForm from "@/components/SubscribeForm";

export default async function Home() {
  const { items } = await getLatestPosts(9);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section - Balanced Size */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Main Title - More reasonable size */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                E FORUM
              </span>
            </h1>
            
            {/* Subtitle - Compact */}
            <p className="text-xl md:text-2xl text-gray-800 mb-6 max-w-3xl mx-auto leading-relaxed font-semibold">
              Entertainment Industry Insights
            </p>
            
            {/* Description - Shorter */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your premier destination for the latest news, reviews, and exclusive interviews from the world of entertainment
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


        {/* Featured Stories */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">View All</a>
          </div>
          
          {items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {items.slice(0, 3).map((p) => <PostCard key={p.slug || p.id} post={p} />)}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Featured Stories Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working on bringing you the latest entertainment industry insights.
              </p>
            </div>
          )}
        </div>

        {/* More Featured Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">More Featured Stories</h3>
          <div className="space-y-4">
            {[
              "The Evolution of Cinematic Storytelling in the Digital Age",
              "Streaming Wars: The Battle for Content Supremacy",
              "The Impact of AI on Creative Industries",
              "Virtual Reality: The Future of Entertainment"
            ].map((title, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <span className="text-gray-800 font-medium">{title}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Latest News */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h3>
          {items.length > 3 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {items.slice(3, 6).map((p) => <PostCard key={p.slug || p.id} post={p} />)}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">More news coming soon...</p>
            </div>
          )}
        </div>

        {/* Sponsored Content */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Sponsored Content</h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium Entertainment Insights</h4>
                <p className="text-gray-600 mb-4">Get exclusive access to industry reports and analysis</p>
                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to our Newsletter</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay up to date with the latest in film and media. Get exclusive insights delivered to your inbox.
            </p>
            <SubscribeForm />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Industry Reports</h4>
            <p className="text-gray-600">Access comprehensive analysis and insights from entertainment industry experts.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h4>
            <p className="text-gray-600">Discover what's hot in the world of entertainment and media.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
