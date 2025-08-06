import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SplineSceneAdvanced from './components/SplineSceneAdvanced';
import ServicesSection from './components/ServicesSection';
import ProcessSteps from './components/ProcessSteps';
import CTASection from './components/CTASection';
import PricingSection from './components/PricingSection';
import CalendarSection from './components/CalendarSection';
import Footer from './components/Footer';
import VoiceAssistant from './components/VoiceAssistant';
import BrandsSection from './components/BrandsSection';

interface NavigationLink {
  href: string;
  label: string;
}

const navigationLinks: NavigationLink[] = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  // { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const App: React.FC = () => {
  const [isVoiceAssistantVisible, setIsVoiceAssistantVisible] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <a href="#hero" className="flex rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="bg-black text-white px-4 py-3 font-black text-xl tracking-wider">
                  INOO
                </div>
                <div className="bg-white text-black px-4 py-3 font-black text-xl tracking-wider">
                  KEY
                </div>
              </a>
            </motion.div>

            {/* Navigation Links */}
            <motion.div 
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {navigationLinks.map((link, index) => (
                <motion.a 
                  key={link.href}
                  href={link.href} 
                  className="relative text-white/90 hover:text-white font-medium transition-all duration-300 group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Spline 3D Scene */}
      <section id="hero" className="min-h-screen flex flex-col justify-end relative">
        {/* 3D Spline Scene Background */}
        <div className="absolute inset-0 z-0">
          <SplineSceneAdvanced className="w-full h-full" />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
          {/* Main Headline */}
          <motion.h1 
            className="text-xl md:text-3xl lg:text-4xl font-black mb-6 gradient-text leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            We Don't Just Build Software — We Build Thinking Systems.
          </motion.h1>
          
          {/* Tagline */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto italic"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Seamless, scalable AI tools crafted by a team that truly gets it.
          </motion.p>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From workflows that adapt to apps that learn, Inookey delivers intelligent software in just 30 days — so your business can think faster, act smarter, and grow effortlessly.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-colors neon-glow flex items-center gap-2 overflow-hidden">
              <span className="relative z-10 transition-opacity duration-500 group-hover:opacity-0">Explore Intelligence →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <span className="text-xs text-gray-600 font-mono tracking-wider">
                  "The Island awaits..."
                </span>
              </div>
            </button>
            <a href="#contact" className="border border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2">
              Book Consultation →
            </a>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
          <motion.div
            className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full"
            animate={{ 
              scale: [1, 2, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesSection />
      </section>
      
      {/* Process Steps Section */}
      <section id="process">
        <ProcessSteps />
      </section>
      
      {/* Brands Section */}
      <BrandsSection />
      
      {/* Call to Action Section */}
      <CTASection />
      
      {/* About Section */}
      {/* <section id="about">
        <AboutSection />
      </section> */}
      
      {/* Pricing Section */}
      <section id="pricing">
        <PricingSection />
      </section>
      
      {/* Calendar Booking Section */}
      <section id="contact">
        <CalendarSection />
      </section>
      
      {/* Footer */}
      <Footer />
      


      {/* Voice Assistant */}
      <VoiceAssistant 
        isVisible={isVoiceAssistantVisible}
        onToggle={() => setIsVoiceAssistantVisible(!isVoiceAssistantVisible)}
      />
    </div>
  );
};

export default App; 