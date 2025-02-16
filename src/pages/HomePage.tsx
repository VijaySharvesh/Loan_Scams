import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, TrendingUp, Users } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const trustedLenders = [
  {
    name: 'Global Finance Bank',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60',
    rating: 4.8,
  },
  {
    name: 'Secure Trust',
    image: 'https://images.unsplash.com/photo-1616803140344-6682afb13cda?w=800&auto=format&fit=crop&q=60',
    rating: 4.9,
  },
  {
    name: 'Future Credit',
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&auto=format&fit=crop&q=60',
    rating: 4.7,
  },
];

export function HomePage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar />
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&auto=format&fit=crop&q=80)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className={`text-center transition-all duration-1000 transform ${
          heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Verify Your Lender.</span>
            <span className="block text-blue-400">Prevent Loan Scams.</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            SafeLend helps you verify legitimate lenders and protect yourself from loan scams.
          </p>
        </div>
      </section>

      {/* Trusted Lenders Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted Lenders</h2>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {trustedLenders.map((lender, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                  <img
                    src={lender.image}
                    alt={lender.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{lender.name}</h3>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(lender.rating) ? 'fill-current' : 'fill-gray-300'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{lender.rating}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border transform transition-all hover:scale-105">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verify Lenders</h3>
              <p className="text-gray-600 mb-4">Check if your lender is RBI-approved and legitimate.</p>
              <Link to="/verify" className="text-blue-600 hover:text-blue-700 font-medium">
                Verify Now →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border transform transition-all hover:scale-105">
              <ShieldAlert className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Report Scams</h3>
              <p className="text-gray-600 mb-4">Help others by reporting fraudulent lenders.</p>
              <Link to="/report" className="text-blue-600 hover:text-blue-700 font-medium">
                Report Scam →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border transform transition-all hover:scale-105">
              <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600 mb-4">Get instant verification results and scam alerts.</p>
              <Link to="/verify" className="text-blue-600 hover:text-blue-700 font-medium">
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border transform transition-all hover:scale-105">
              <Users className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Legal Assistance</h3>
              <p className="text-gray-600 mb-4">Get help if you've been a victim of loan fraud.</p>
              <Link to="/legal-help" className="text-blue-600 hover:text-blue-700 font-medium">
                Get Help →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Website Features Section */}
      <section 
        ref={statsRef}
        className="relative py-16 text-white"
        style={{
          background: 'linear-gradient(rgba(37, 99, 235, 0.9), rgba(37, 99, 235, 0.9)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&auto=format&fit=crop&q=80)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 gap-8 md:grid-cols-3 text-center transition-all duration-1000 transform ${
            statsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-2xl font-bold mb-2">Instant Verification</div>
              <div className="text-blue-100">Check lender legitimacy in seconds with our real-time verification system</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-2xl font-bold mb-2">Community Alerts</div>
              <div className="text-blue-100">Stay informed about new scams with our community-driven alert system</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-2xl font-bold mb-2">Legal Support</div>
              <div className="text-blue-100">Access expert legal assistance and resources for loan-related issues</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}