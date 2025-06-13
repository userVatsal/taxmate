import { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Bot,
  Sparkles,
  Brain,
  Globe,
  Lock,
  BarChart3
} from 'lucide-react';
import logo from '/logo.png';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
                <img src={logo} alt="TaxMate Logo" className="h-8 w-8" />
              </div>
              <span className="text-2xl font-bold text-gray-900">TaxMate</span>
              <div className="flex items-center space-x-1">
                <span className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">AI</span>
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">How it Works</a>
              <a href="https://ontaxmate.uk" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Visit Website</a>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Free Trial
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse" />
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 animate-pulse delay-1000" />
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-200">
              <Bot className="h-4 w-4 mr-2" />
              AI-Powered Tax Automation for UK Businesses
              <Sparkles className="h-4 w-4 ml-2" />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Simplify Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Tax Compliance
              </span>
              <br />
              with AI
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Automate VAT calculations, corporation tax planning, and HMRC reporting. 
              <br className="hidden md:block" />
              <span className="font-semibold text-gray-900">Reduce manual workload by 50%</span> while ensuring 
              <span className="font-semibold text-gray-900"> 100% compliance</span> with UK tax regulations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 flex items-center space-x-2"
              >
                <span>Start 30-Day Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-bold text-lg"
              >
                View Pricing
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="font-medium">HMRC Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="font-medium">MTD Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="font-medium">GDPR Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="font-medium">ontaxmate.uk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by UK Businesses
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of businesses already saving time and money
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50%', label: 'Less Manual Work', color: 'from-blue-500 to-indigo-600' },
              { value: '99.9%', label: 'Accuracy Rate', color: 'from-emerald-500 to-green-600' },
              { value: '24/7', label: 'Automated Monitoring', color: 'from-purple-500 to-indigo-600' },
              { value: '500+', label: 'Happy Businesses', color: 'from-orange-500 to-red-600' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to automate your tax processes and stay compliant with UK regulations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Automation',
                description: 'Advanced machine learning automatically categorizes expenses and identifies tax deductions.',
                color: 'from-blue-500 to-indigo-600',
                status: 'Coming Soon'
              },
              {
                icon: Shield,
                title: 'HMRC Compliance',
                description: 'Built-in Making Tax Digital compliance ensures your submissions meet all requirements.',
                color: 'from-emerald-500 to-green-600'
              },
              {
                icon: Zap,
                title: 'Real-time Processing',
                description: 'Instant document processing and categorization with 99.9% accuracy rates.',
                color: 'from-yellow-500 to-orange-600',
                status: 'Coming Soon'
              },
              {
                icon: BarChart3,
                title: 'Smart Analytics',
                description: 'Comprehensive reporting and insights to optimize your tax strategy.',
                color: 'from-purple-500 to-indigo-600'
              },
              {
                icon: Globe,
                title: 'Cloud Integration',
                description: 'Seamlessly connects with Xero, QuickBooks, and other accounting platforms.',
                color: 'from-teal-500 to-cyan-600'
              },
              {
                icon: Lock,
                title: 'Bank-level Security',
                description: 'Enterprise-grade encryption and security protocols protect your data.',
                color: 'from-red-500 to-pink-600'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
              >
                {feature.status && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      {feature.status}
                    </span>
                  </div>
                )}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <img src={logo} alt="TaxMate Logo" className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your Tax Management?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Join hundreds of UK businesses already saving time and money with TaxMate
            </p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
                  <img src={logo} alt="TaxMate Logo" className="h-8 w-8" />
                </div>
                <span className="text-2xl font-bold text-white">TaxMate</span>
              </div>
              <p className="text-gray-400">
                AI-powered tax automation for UK businesses
              </p>
              <p className="text-gray-400 mt-2">
                Visit us at <a href="https://ontaxmate.uk" className="text-blue-400 hover:text-blue-300">ontaxmate.uk</a>
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 TaxMate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}