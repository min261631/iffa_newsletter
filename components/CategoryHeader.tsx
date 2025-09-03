interface CategoryHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  articleCount: number;
}

export default function CategoryHeader({ title, subtitle, icon, color, articleCount }: CategoryHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Category Icon and Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-8">
            <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
              {icon}
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          {/* Article Count */}
          <div className="inline-flex items-center px-6 py-3 bg-gray-50 rounded-full">
            <span className="text-gray-600">
              <span className="font-semibold text-gray-900">{articleCount}</span> articles available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
