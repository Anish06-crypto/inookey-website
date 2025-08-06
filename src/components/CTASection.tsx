import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-10 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Wireframe cube structure */}
            <g stroke="white" strokeWidth="1" fill="none" opacity="0.3">
              <path d="M 50 100 L 100 50 L 150 100 L 100 150 Z" />
              <path d="M 50 100 L 50 150 L 100 200 L 100 150" />
              <path d="M 150 100 L 150 150 L 100 200" />
              <path d="M 100 50 L 100 100" />
            </g>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text and Buttons */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-black mb-8 gradient-text leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Get Your Solution Built in 30 Days
            </motion.h2>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* <button className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-colors neon-glow flex items-center justify-center gap-2">
                <Rocket size={20} />
                Join today
              </button> */}
              <a href="#pricing" className="border border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black transition-colors">
                See our plans
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Visual element */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-teal-500 rounded-2xl blur-sm opacity-50"></div>
              <div className="relative bg-black border border-white/20 rounded-2xl p-8 w-80 h-64 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">$50k</div>
                    <div className="text-sm text-gray-400">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">$100k</div>
                    <div className="text-sm text-gray-400">Growth</div>
                  </div>
                </div>
                
                {/* Simple chart representation */}
                <div className="flex-1 flex items-end justify-center gap-1 mt-4">
                  <div className="w-4 bg-green-400 h-8 rounded-sm"></div>
                  <div className="w-4 bg-green-400 h-12 rounded-sm"></div>
                  <div className="w-4 bg-green-400 h-16 rounded-sm"></div>
                  <div className="w-4 bg-green-400 h-20 rounded-sm"></div>
                  <div className="w-4 bg-green-400 h-24 rounded-sm"></div>
                </div>
                
                <button className="bg-gradient-to-r from-orange-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4">
                  <Rocket size={16} />
                  Launch
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 