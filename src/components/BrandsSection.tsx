import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'BreakTheCode', image: '/4.png' },
  { name: 'BugCrowd', image: '/5.png' },
  { name: 'Digiterati', image: '/8.png' },
  { name: 'FreshBites', image: '/fb.png' },
  { name: 'Inteblu', image: '/7.png' },
  { name: 'POMA', image: '/6.png' },
  { name: 'TryHackMe', image: '/3.png' },
  { name: 'Verzeo', image: '/verzeo.jpeg' }
];

const BrandsSection: React.FC = () => {
  return (
    <section className="relative py-16 bg-black text-white border-t border-white/10 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
                     <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-4 font-hagrid">
             Our Collaborations
           </h2>
           <p className="text-gray-400 text-lg font-hagrid">
             Companies that chose innovation with InooKey. 
           </p>
        </motion.div>

                 {/* Infinite Scroll Container */}
         <div className="relative overflow-hidden">
           {/* Subtle light grey glow background */}
           <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-gray-800/30 to-gray-900/20 rounded-2xl mx-8"></div>
           
           {/* Gradient overlays for smooth fade */}
           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
          
                     {/* Scrolling brands container */}
           <motion.div
             className="flex items-center gap-16 whitespace-nowrap py-8 relative z-20"
             animate={{
               x: [0, -2000]
             }}
             transition={{
               x: {
                 repeat: Infinity,
                 repeatType: "loop",
                 duration: 30,
                 ease: "linear",
               },
             }}
           >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* First set of brands */}
                                    {brands.map((brand, index) => (
                      <div
                        key={`first-${index}`}
                        className="flex-shrink-0 flex flex-col items-center justify-center gap-2"
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className={`h-16 md:h-20 opacity-60 hover:opacity-90 transition-opacity duration-300 mix-blend-multiply filter contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${
                            ['Inteblu', 'POMA', 'Verzeo', 'FreshBites', 'TryHackMe', 'BreakTheCode'].includes(brand.name) ? 'rounded-lg' : ''
                          }`}
                        />
                        <span className="text-xs md:text-sm text-white/60 font-medium tracking-wide capitalize">
                          {brand.name}
                        </span>
                      </div>
                    ))}
            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Duplicate set for seamless loop */}
                                    {brands.map((brand, index) => (
                      <div
                        key={`second-${index}`}
                        className="flex-shrink-0 flex flex-col items-center justify-center gap-2"
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className={`h-16 md:h-20 opacity-60 hover:opacity-90 transition-opacity duration-300 mix-blend-multiply filter contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${
                            ['Inteblu', 'POMA', 'Verzeo', 'FreshBites', 'TryHackMe', 'BreakTheCode'].includes(brand.name) ? 'rounded-lg' : ''
                          }`}
                        />
                        <span className="text-xs md:text-sm text-white/60 font-medium tracking-wide capitalize">
                          {brand.name}
                        </span>
                      </div>
                    ))}
            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       {/* Third set for extra smooth loop */}
                                    {brands.map((brand, index) => (
                      <div
                        key={`third-${index}`}
                        className="flex-shrink-0 flex flex-col items-center justify-center gap-2"
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className={`h-16 md:h-20 opacity-60 hover:opacity-90 transition-opacity duration-300 mix-blend-multiply filter contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${
                            ['Inteblu', 'POMA', 'Verzeo', 'FreshBites', 'TryHackMe', 'BreakTheCode'].includes(brand.name) ? 'rounded-lg' : ''
                          }`}
                        />
                        <span className="text-xs md:text-sm text-white/60 font-medium tracking-wide capitalize">
                          {brand.name}
                        </span>
                      </div>
                    ))}
          </motion.div>
        </div>

        {/* Subtle decorative elements */}
        <div className="flex justify-center items-center mt-12 space-x-2">
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;