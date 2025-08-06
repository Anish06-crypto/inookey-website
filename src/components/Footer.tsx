import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Youtube } from 'lucide-react';
import Particles from './Particles';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white border-t border-white/10 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 h-full">
        <Particles 
          particleColors={["#67e8f9", "#2dd4bf", "#fff"]}
          particleCount={200}
          particleSpread={5}
          speed={0.04}
          alphaParticles={true}
          particleBaseSize={60}
          sizeRandomness={0.4}
          cameraDistance={16}
          className="w-full h-full"
        />
      </div>
      
      {/* Background Gradient
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-purple-900/20 to-green-900/20 z-5"></div> */}
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Copyright and Links Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} InooKey Inc. Privacy Policy.
          </div>
          
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <a href="#services" className="text-sm text-gray-300 hover:text-white transition-colors">
                Case Studies
              </a>
              <a href="#services" className="text-sm text-gray-300 hover:text-white transition-colors">
                Benefits
              </a>
              <a href="#process" className="text-sm text-gray-300 hover:text-white transition-colors">
                Process
              </a>
              <a href="#about" className="text-sm text-gray-300 hover:text-white transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
            </nav>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com/inookey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
                X
              </a>
              <a 
                href="https://youtube.com/@inookey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
                Youtube
              </a>
            </div>
          </div>
        </div>

        {/* Large Brand Name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-orange-500 via-yellow-500 to-white bg-clip-text text-transparent leading-none">
            INOOKEY
          </h1>
        </motion.div>

        {/* Additional Footer Content */}
        <div className="mt-12 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-gray-400">
            <a href="mailto:hello@inookey.com" className="hover:text-white transition-colors">
              hello@inookey.com
            </a>
            <span className="hidden md:block">•</span>
            <span>AI Services, Integration & Automation</span>
            <span className="hidden md:block">•</span>
            <span>Built with ❤️ for your success</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 