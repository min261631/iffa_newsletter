import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  // Ensure consistent data structure for all articles
  const normalizedPost = {
    title: post.title || "Untitled Article",
    subtitle: post.subtitle || post.excerpt || "",
    content: post.content || "",
    image: post.bannerUrl || post.image || "https://placehold.co/1200x800/e5e7eb/6b7280?text=E+FORUM",
    category: post.category || "General",
    author: post.author || "E FORUM Team",
    authorByline: post.authorByline || "Entertainment Expert",
    publishTime: post.publishTime || post.createdAt || "Recent",
    slug: post.slug || post.id || ""
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Consistent for all articles */}
      <div className="relative">
        <div className="w-full h-[70vh] relative overflow-hidden">
          <img
            src={normalizedPost.image}
            alt={normalizedPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        {/* Article Info Overlay - Consistent structure */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-5xl mx-auto">
            {/* Category and Time - Always present */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-lg">
                {normalizedPost.category}
              </span>
              <span className="text-gray-200 text-sm font-medium bg-black/20 px-3 py-1 rounded-full">
                {normalizedPost.publishTime}
              </span>
            </div>
            
            {/* Title - Always present */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              {normalizedPost.title}
            </h1>
            
            {/* Subtitle - Conditional but consistent styling */}
            {normalizedPost.subtitle && (
              <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed max-w-4xl">
                {normalizedPost.subtitle}
              </p>
            )}
            
            {/* Author Info - Always present with consistent structure */}
            <div className="flex items-center space-x-6 text-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold mr-3 shadow-lg">
                  {normalizedPost.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-semibold text-lg">{normalizedPost.author}</span>
                  <p className="text-sm text-gray-300">{normalizedPost.authorByline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Consistent layout for all articles */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Article Content - Always 3 columns */}
          <div className="lg:col-span-3">
            {/* Reading Progress Bar - Always present */}
            <div className="sticky top-20 z-10 mb-8">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
              </div>
            </div>

            {/* Article Text - Consistent structure */}
            <article className="prose prose-xl max-w-none">
              {normalizedPost.content ? (
                <div className="text-gray-800 leading-relaxed">
                  {normalizedPost.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-8 text-xl leading-relaxed text-gray-700 font-light">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Content Coming Soon</h3>
                  <p className="text-gray-600 text-lg">The full article content will be available shortly.</p>
                </div>
              )}
            </article>

            {/* Article Footer - Always present with consistent structure */}
            <div className="mt-16 pt-12 border-t border-gray-200">
              {/* Tags - Always present */}
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-gray-600 font-medium">Tags:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {normalizedPost.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                  Entertainment
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                  Industry
                </span>
              </div>

              {/* Share and Navigation - Always present */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">Share this article:</span>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-200 hover:scale-110 shadow-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-all duration-200 hover:scale-110 shadow-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <Link 
                  href="/"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-200 hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar - Always 2 columns with consistent structure */}
          <div className="lg:col-span-2 space-y-10">
            {/* Author Info - Always present */}
            <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-6">
                  {normalizedPost.author.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{normalizedPost.author}</h3>
                <p className="text-blue-600 font-medium text-sm uppercase tracking-wide mb-4">{normalizedPost.authorByline}</p>
                <p className="text-gray-600 leading-relaxed text-base">
                  Entertainment industry expert with years of experience in film and media analysis.
                </p>
              </div>
            </div>

            {/* Newsletter Signup - Always present */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-10 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-8 leading-relaxed text-lg">
                Get the latest entertainment industry insights delivered to your inbox.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm text-lg"
                />
                <button className="w-full px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
