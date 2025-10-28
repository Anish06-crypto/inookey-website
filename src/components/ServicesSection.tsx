import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Workflow, Users, Zap, Rocket } from 'lucide-react';
import ProcessFlowAnimation from './ProcessFlowAnimation';
import ProfitVsCostChart from './ProfitVsCostChart';
import Particles from './Particles';
import styled from 'styled-components';

// CountUp Component for animated number counting - removed unused component

const services = [
  {
    icon: <Users size={32} className="text-cyan-400" />,
    title: 'Digital & Social Media Marketing',
    badge: 'Marketing',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.1 },
    },
  },
  {
    icon: <Workflow size={32} className="text-green-400" />,
    title: 'AI-Automation & Systems Workflows',
    badge: 'Automation',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.2 },
    },
  },
  {
    icon: <BarChart3 size={32} className="text-orange-400" />,
    title: 'Data Analytics & Insights',
    badge: 'Analytics',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.3 },
    },
  },
  {
    icon: <Zap size={32} className="text-fuchsia-400" />,
    title: 'Software Development',
    badge: 'Software',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.4 },
    },
  },
  {
    icon: <div className="text-2xl">🔒</div>,
    title: 'Website Development & Design',
    badge: 'Website',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.5 },
    },
  },
  {
    icon: <Rocket size={32} className="text-yellow-400" />,
    title: 'Security & Compliance Solutions',
    badge: 'Security',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.6 },
    },
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative py-24 bg-black text-white border-t border-white/10 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 h-full">
        <Particles 
          particleColors={["#67e8f9", "#2dd4bf", "#fff"]}
          particleCount={400}
          particleSpread={5}
          speed={0.12}
          alphaParticles={true}
          particleBaseSize={90}
          sizeRandomness={0.7}
          cameraDistance={22}
          className="w-full h-full"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg group overflow-hidden hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm"
              initial={service.animation.initial}
              whileInView={service.animation.whileInView}
              transition={service.animation.transition}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(0,255,255,0.15)' }}
            >
              <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <span className="inline-block bg-cyan-900/40 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                  {service.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 gradient-text group-hover:text-cyan-300 transition-colors duration-300">
                {service.title}
              </h3>
              {/* Embed animated components in cards */}
              {idx === 0 && (
                <div className="mt-6">
                  <div className="w-full h-full flex items-center justify-center relative">
                    <StyledSocialCard>
                      <div className="card">
                        <div className="socialContainer containerOne">
                          <svg className="socialSvg instagramSvg" viewBox="0 0 16 16"> 
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" /> 
                          </svg>
                        </div>
                        <div className="socialContainer containerTwo">
                          <svg className="socialSvg twitterSvg" viewBox="0 0 16 16"> 
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" /> 
                          </svg>
                        </div>
                        <div className="socialContainer containerThree">
                          <svg className="socialSvg linkdinSvg" viewBox="0 0 448 512">
                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                          </svg>
                        </div>
                        <div className="socialContainer containerFour">
                          <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16"> 
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /> 
                          </svg>
                        </div>
                      </div>
                      
                      {/* Engagement Metrics
                      <div className="engagement-metrics">
                        <div className="metric-item">
                          <div className="metric-icon likes-icon">❤️</div>
                          <div className="metric-value">
                            <CountUp end={2400} duration={2.5} suffix="+" />
                          </div>
                          <div className="metric-label">Likes</div>
                        </div>
                        <div className="metric-item">
                          <div className="metric-icon comments-icon">💬</div>
                          <div className="metric-value">
                            <CountUp end={1200} duration={2.5} delay={0.3} suffix="+" />
                          </div>
                          <div className="metric-label">Comments</div>
                        </div>
                        <div className="metric-item">
                          <div className="metric-icon shares-icon">🔄</div>
                          <div className="metric-value">
                            <CountUp end={856} duration={2.5} delay={0.6} suffix="+" />
                          </div>
                          <div className="metric-label">Shares</div>
                        </div>
                        <div className="metric-item">
                          <div className="metric-icon views-icon">👁️</div>
                          <div className="metric-value">
                            <CountUp end={15700} duration={2.5} delay={0.9} suffix="+" />
                          </div>
                          <div className="metric-label">Views</div>
                        </div>
                      </div> */}
                    </StyledSocialCard>
                  </div>
                </div>
              )}
              {idx === 1 && (
                <div className="mt-6">
                  <ProcessFlowAnimation />
                </div>
              )}
              {idx === 2 && (
                <div className="mt-6">
                  <ProfitVsCostChart />
                </div>
              )}
              {idx === 3 && (
                <div className="mt-6">
                  <div className="w-full h-full flex items-center justify-center relative">
                    <StyledAITriangle>
                      <div className="ai-triangle-container">
                        {/* Claude Button - Top */}
                        <div className="ai-button claude-button">
                          <div className="claude-logo">
                            <svg viewBox="0 0 512 512" clipRule="evenodd" fillRule="evenodd" imageRendering="optimizeQuality" textRendering="geometricPrecision" shapeRendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg">
                              <rect ry="105.042" rx="104.187" height={512} width={512} fill="#CC9B7A" />
                              <path d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z" fillRule="nonzero" fill="#1F1F1E" />
                            </svg>
                          </div>
                          <div className="button-text">
                            <span>Powered By</span>
                            <span>Claude 3.5</span>
                          </div>
                        </div>
                        
                        {/* OpenAI Button - Bottom Left */}
                        <div className="ai-button openai-button">
                          <div className="openai-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="openai-icon">
                              <path fill="#10A37F" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                            </svg>
                          </div>
                          <div className="button-text">
                            <span>Powered By</span>
                            <span>GPT-Omni</span>
                          </div>
                        </div>
                        
                        {/* DeepSeek Button - Bottom Right */}
                        <div className="ai-button deepseek-button">
                          <div className="deepseek-logo">
                            <svg width="22mm" height="297mm" viewBox="0 0 210 237" version="1.1" id="svg1" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                              <defs id="defs1" />
                              <g id="layer1">
                                <image width="200.70386" height="174.32936" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAYAAAB/HSuDAAAACXBIWXMAAAsTAAALEwEAmpwYAAAgAElEQVR4nOzdeZxkVXXA8R5WEQUEVFwQBdS4xwU1uIwaB3umzq2eUUsBjShqzdS51TOOGNG4tFsU" />
                              </g>
                            </svg>
                          </div>
                          <div className="button-text">
                            <span>Powered By</span>
                            <span>DeepSeek</span>
                          </div>
                        </div>
                      </div>
                    </StyledAITriangle>
                  </div>
                </div>
              )}
                             {idx === 4 && (
                 <div className="mt-6">
                   <div className="w-full h-full flex items-center justify-center relative">
                     <svg
                       width="100%"
                       height="100%"
                       viewBox="0 0 100 100"
                                             className="rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/90 border border-white/10 shadow-lg"
                      style={{ maxWidth: 400, minHeight: 120, width: '100%', height: 'auto', aspectRatio: '2/1' }}
                     >
                                               {/* Background grid */}
                        <defs>
                          <pattern id="grid5" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#37415122" strokeWidth="0.3"/>
                          </pattern>
                         {/* Gradient definitions */}
                         <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                           <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8"/>
                           <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6"/>
                           <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8"/>
                         </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="100" height="100" fill="url(#grid5)" />
                       
                       {/* Central brand logo/icon */}
                       <motion.g transform="translate(50, 50)">
                         {/* Main logo circle */}
                         <motion.circle
                           cx="0"
                           cy="0"
                           r="18"
                           fill="url(#brandGradient)"
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ 
                           opacity: [0.8, 1, 0.8],
                           scale: [1, 1.05, 1]
                         }}
                         transition={{ 
                           duration: 4,
                           repeat: Infinity,
                           repeatDelay: 0.5
                         }}
                       />
                       
                         {/* Inner design element */}
                         <motion.path
                           d="M -8 -8 L 8 -8 L 8 8 L -8 8 Z"
                           fill="none"
                           stroke="white"
                           strokeWidth="1.5"
                           initial={{ opacity: 0, rotate: 0 }}
                           animate={{ 
                             opacity: [0.7, 1, 0.7],
                             rotate: [0, 360]
                           }}
                           transition={{ 
                             duration: 6,
                             repeat: Infinity,
                             ease: "linear"
                           }}
                         />
                         
                         {/* Rotating dots around logo */}
                         <motion.g>
                           {/* Dot 1 */}
                           <motion.circle
                             cx="0"
                             cy="-25"
                             r="2"
                             fill="#a855f7"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ 
                               opacity: [0, 1, 0],
                               scale: [0, 1, 0],
                               rotate: [0, 360]
                             }}
                           transition={{ 
                               duration: 4,
                               delay: 0,
                             repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Dot 2 */}
                           <motion.circle
                              cx="25"
                             cy="0"
                             r="2"
                             fill="#8b5cf6"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ 
                               opacity: [0, 1, 0],
                               scale: [0, 1, 0],
                               rotate: [0, 360]
                             }}
                             transition={{ 
                               duration: 4,
                               delay: 1,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Dot 3 */}
                           <motion.circle
                             cx="0"
                              cy="25"
                             r="2"
                             fill="#7c3aed"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ 
                               opacity: [0, 1, 0],
                               scale: [0, 1, 0],
                               rotate: [0, 360]
                             }}
                             transition={{ 
                               duration: 4,
                               delay: 2,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Dot 4 */}
                           <motion.circle
                             cx="-25"
                             cy="0"
                             r="2"
                             fill="#a855f7"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ 
                               opacity: [0, 1, 0],
                               scale: [0, 1, 0],
                               rotate: [0, 360]
                             }}
                             transition={{ 
                               duration: 4,
                               delay: 3,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                            />
                          </motion.g>
                          
                         {/* Connection lines */}
                          <motion.g>
                           {/* Line 1 */}
                           <motion.line
                             x1="0"
                             y1="-18"
                             x2="0"
                             y2="-25"
                             stroke="url(#brandGradient)"
                             strokeWidth="0.8"
                              initial={{ opacity: 0 }}
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2,
                               delay: 0,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Line 2 */}
                           <motion.line
                             x1="18"
                             y1="0"
                             x2="25"
                             y2="0"
                             stroke="url(#brandGradient)"
                             strokeWidth="0.8"
                              initial={{ opacity: 0 }}
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2,
                               delay: 1,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Line 3 */}
                           <motion.line
                             x1="0"
                             y1="18"
                             x2="0"
                             y2="25"
                             stroke="url(#brandGradient)"
                             strokeWidth="0.8"
                              initial={{ opacity: 0 }}
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2,
                               delay: 2,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Line 4 */}
                           <motion.line
                             x1="-18"
                             y1="0"
                             x2="-25"
                             y2="0"
                             stroke="url(#brandGradient)"
                             strokeWidth="0.8"
                              initial={{ opacity: 0 }}
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2,
                               delay: 3,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                         </motion.g>
                          </motion.g>
                          
                       {/* Floating design elements */}
                          <motion.g>
                         {/* Color palette */}
                         <motion.rect
                           x="15"
                           y="15"
                           width="8"
                           height="8"
                           fill="#a855f7"
                           rx="1"
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: [0.5, 1, 0.5], y: [-10, -5, -10] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                         />
                         
                         <motion.rect
                           x="25"
                           y="15"
                           width="8"
                           height="8"
                           fill="#8b5cf6"
                           rx="1"
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: [0.5, 1, 0.5], y: [-10, -5, -10] }}
                           transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                         />
                         
                         <motion.rect
                           x="35"
                           y="15"
                           width="8"
                           height="8"
                           fill="#7c3aed"
                           rx="1"
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: [0.5, 1, 0.5], y: [-10, -5, -10] }}
                           transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                         />
                         
                         {/* Typography elements */}
                       <motion.text
                           x="75"
                           y="25"
                         fill="#a855f7"
                           fontSize="8"
                         fontFamily="Inter"
                         fontWeight="600"
                         initial={{ opacity: 0 }}
                           animate={{ opacity: [0, 1, 0] }}
                         transition={{ 
                           duration: 2,
                             delay: 1.5,
                           repeat: Infinity,
                             ease: "easeInOut"
                         }}
                       >
                           UI/UX
                       </motion.text>
                         
                         <motion.text
                           x="80"
                           y="35"
                           fill="#8b5cf6"
                           fontSize="6"
                           fontFamily="Inter"
                           fontWeight="400"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: [0, 1, 0] }}
                           transition={{ 
                             duration: 2,
                             delay: 2,
                             repeat: Infinity,
                             ease: "easeInOut"
                           }}
                         >
                           3D Design
                         </motion.text>
                       </motion.g>
                       
                       
                     </svg>
                   </div>
                 </div>
               )}
                             {idx === 5 && (
                 <div className="mt-6">
                   <div className="w-full h-full flex items-center justify-center relative">
                     <svg
                       width="100%"
                       height="100%"
                       viewBox="0 0 100 100"
                                             className="rounded-2xl bg-gradient-to-br from-yellow-900/30 to-black/90 border border-white/10 shadow-lg"
                      style={{ maxWidth: 400, minHeight: 120, width: '100%', height: 'auto', aspectRatio: '2/1' }}
                     >
                       {/* Background grid */}
                       <defs>
                          <pattern id="grid6" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#eab30822" strokeWidth="0.3"/>
                         </pattern>
                          {/* Holographic effect */}
                          <defs>
                            <linearGradient id="hologramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#eab308" stopOpacity="0.8"/>
                              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6"/>
                              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8"/>
                            </linearGradient>
                          </defs>
                       </defs>
                        <rect x="0" y="0" width="100" height="100" fill="url(#grid6)" />
                       
                       {/* Central holographic sphere */}
                       <motion.g transform="translate(50, 50)">
                         {/* Outer ring */}
                         <motion.circle
                           cx="0"
                           cy="0"
                           r="20"
                           fill="none"
                           stroke="url(#hologramGradient)"
                           strokeWidth="1"
                           initial={{ opacity: 0, rotate: 0 }}
                           animate={{ 
                             opacity: [0.3, 1, 0.3],
                             rotate: [0, 360]
                           }}
                           transition={{ 
                             duration: 8,
                             repeat: Infinity,
                             ease: "linear"
                           }}
                         />
                         
                         {/* Middle ring */}
                         <motion.circle
                           cx="0"
                           cy="0"
                           r="15"
                           fill="none"
                           stroke="url(#hologramGradient)"
                           strokeWidth="1.5"
                           initial={{ opacity: 0, rotate: 0 }}
                           animate={{ 
                             opacity: [0.5, 1, 0.5],
                             rotate: [0, -360]
                           }}
                           transition={{ 
                             duration: 6,
                             repeat: Infinity,
                             ease: "linear"
                           }}
                         />
                         
                         {/* Inner core */}
                         <motion.circle
                           cx="0"
                           cy="0"
                           r="8"
                           fill="url(#hologramGradient)"
                           initial={{ opacity: 0, scale: 0.5 }}
                           animate={{ 
                             opacity: [0.7, 1, 0.7],
                             scale: [0.8, 1.2, 0.8]
                           }}
                           transition={{ 
                             duration: 3,
                             repeat: Infinity,
                             ease: "easeInOut"
                           }}
                         />
                         
                         {/* Data particles */}
                         <motion.g>
                           {/* Particle 1 */}
                           <motion.circle
                             cx="0"
                             cy="-25"
                             r="1"
                             fill="#eab308"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ 
                               opacity: [0, 1, 0],
                               scale: [0, 1, 0],
                               y: [-25, -35, -25]
                             }}
                             transition={{ 
                               duration: 4,
                               delay: 0,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Particle 2 */}
                           <motion.circle
                             cx="25"
                             cy="0"
                             r="1"
                             fill="#fbbf24"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ 
                               opacity: [0, 1, 0],
                               scale: [0, 1, 0],
                               x: [25, 35, 25]
                             }}
                             transition={{ 
                               duration: 4,
                               delay: 1,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Particle 3 */}
                           <motion.circle
                             cx="0"
                             cy="25"
                             r="1"
                             fill="#f59e0b"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ 
                               opacity: [0, 1, 0],
                               scale: [0, 1, 0],
                               y: [25, 35, 25]
                             }}
                             transition={{ 
                               duration: 4,
                               delay: 2,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Particle 4 */}
                           <motion.circle
                             cx="-25"
                             cy="0"
                             r="1"
                             fill="#eab308"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ 
                               opacity: [0, 1, 0],
                               scale: [0, 1, 0],
                               x: [-25, -35, -25]
                             }}
                             transition={{ 
                               duration: 4,
                               delay: 3,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                         </motion.g>
                         
                         {/* Connection lines */}
                         <motion.g>
                           {/* Line 1 */}
                           <motion.line
                             x1="0"
                             y1="-15"
                             x2="0"
                             y2="-25"
                             stroke="url(#hologramGradient)"
                             strokeWidth="0.5"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2,
                               delay: 0,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Line 2 */}
                           <motion.line
                             x1="15"
                             y1="0"
                             x2="25"
                             y2="0"
                             stroke="url(#hologramGradient)"
                             strokeWidth="0.5"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2,
                               delay: 1,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Line 3 */}
                           <motion.line
                             x1="0"
                             y1="15"
                             x2="0"
                             y2="25"
                             stroke="url(#hologramGradient)"
                             strokeWidth="0.5"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2,
                               delay: 2,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                           
                           {/* Line 4 */}
                           <motion.line
                             x1="-15"
                             y1="0"
                             x2="-25"
                             y2="0"
                             stroke="url(#hologramGradient)"
                             strokeWidth="0.5"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2,
                               delay: 3,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                         </motion.g>
                       </motion.g>
                       
                       {/* Floating tech elements */}
                       <motion.g>
                         {/* Binary code */}
                         <motion.text
                           x="15"
                           y="20"
                           fill="#eab308"
                           fontSize="6"
                           fontFamily="monospace"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: [0, 1, 0] }}
                           transition={{ 
                             duration: 3,
                             delay: 0.5,
                             repeat: Infinity,
                             ease: "easeInOut"
                           }}
                         >
                           SOC2
                         </motion.text>
                         
                         <motion.text
                           x="75"
                           y="80"
                           fill="#fbbf24"
                           fontSize="6"
                           fontFamily="monospace"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: [0, 1, 0] }}
                           transition={{ 
                             duration: 3,
                             delay: 1.5,
                             repeat: Infinity,
                             ease: "easeInOut"
                           }}
                         >
                           ISO 27001
                         </motion.text>
                         
                         <motion.text
                           x="80"
                           y="25"
                           fill="#f59e0b"
                           fontSize="6"
                           fontFamily="monospace"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: [0, 1, 0] }}
                           transition={{ 
                             duration: 3,
                             delay: 2.5,
                             repeat: Infinity,
                             ease: "easeInOut"
                           }}
                         >
                           GDPR
                         </motion.text>
                       
                       <motion.text
                           x="15"
                         y="90"
                           fill="#f59e0b"
                           fontSize="6"
                           fontFamily="monospace"
                         initial={{ opacity: 0 }}
                           animate={{ opacity: [0, 1, 0] }}
                         transition={{ 
                             duration: 3,
                             delay: 2.5,
                           repeat: Infinity,
                             ease: "easeInOut"
                         }}
                       >
                           PCI DSS
                       </motion.text>
                       </motion.g>
                       
                      
                     </svg>
                   </div>
                 </div>
               )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StyledAITriangle = styled.div`
  .ai-triangle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 15px;
    position: relative;
  }

  @media (min-width: 640px) {
    .ai-triangle-container {
      gap: 20px;
      padding: 20px;
    }
  }

  .ai-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    border-radius: 8px;
    padding: 0;
    text-decoration: none;
    color: #000000;
    font-weight: bold;
    position: relative;
    box-shadow: 3px 3px 0px #000000;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 60px;
    width: 60px;
    cursor: pointer;
  }

  @media (min-width: 640px) {
    .ai-button {
      height: 80px;
      width: 80px;
    }
  }

  /* Claude Button */
  .claude-button {
    background-color: rgb(204, 155, 122);
    box-shadow: 4px 4px 0px #000000;
  }

  .claude-button::before {
    background-color: rgb(204, 155, 122);
  }

  /* OpenAI Button */
  .openai-button {
    background-color: #356854;
    box-shadow: 4px 4px 0px #000000;
  }

  .openai-button::before {
    background-color: #316b58;
  }

  /* DeepSeek Button */
  .deepseek-button {
    background: linear-gradient(135deg, #0a2a66, #1e3d8f, #a0c1f1, #ffffff);
    background-size: 300% 300%;
    animation: gradientShift 6s ease infinite;
    box-shadow: 4px 4px 0px dodgerblue;
  }

  .deepseek-button::before {
    background: linear-gradient(135deg, #0a2a66, #1e3d8f, #a0c1f1, #ffffff);
    background-size: 300% 300%;
    animation: gradientShift 6s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .ai-button::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -150%;
    width: 300%;
    height: 300%;
    border-radius: 50%;
    transform: translateX(-50%) scale(0);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    z-index: 1;
  }

  .ai-button:hover::before {
    transform: translateX(-50%) scale(1);
  }

  .ai-button:hover {
    transform: translate(-4px, -4px);
  }

  .claude-button:hover {
    box-shadow: 8px 8px 0px #000000;
  }

  .openai-button:hover {
    box-shadow: 8px 8px 0px #000000;
  }

  .deepseek-button:hover {
    box-shadow: 8px 8px 0px dodgerblue;
  }

  .ai-button:active {
    transform: translate(2px, 2px);
  }

  .claude-button:active {
    box-shadow: 2px 2px 0px #000000;
  }

  .openai-button:active {
    box-shadow: 2px 2px 0px #000000;
  }

  .deepseek-button:active {
    box-shadow: 2px 2px 0px dodgerblue;
  }

  /* Logo styles */
  .claude-logo, .openai-logo, .deepseek-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .claude-logo {
    border-radius: 30%;
  }

  .openai-logo {
    background-color: #0f1715;
  }

  .deepseek-logo {
    background: linear-gradient(135deg, #ffffff, #a0c1f1, #1e3d8f, #0a2a66);
    background-size: 200% 200%;
    animation: gradientShift 6s ease infinite;
  }

  .claude-logo svg, .openai-logo svg, .deepseek-logo svg {
    width: 35px;
    height: 35px;
    transition: all 0.6s ease-in-out;
  }

  .openai-icon {
    fill: #ffffff;
  }

  .deepseek-logo svg {
    fill: dodgerblue;
    stroke: dodgerblue;
    stroke-width: 16;
  }

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .ai-button:hover .claude-logo,
  .ai-button:hover .openai-logo,
  .ai-button:hover .deepseek-logo {
    animation: spin 5s linear infinite;
    width: 35px;
    height: 35px;
    top: 25%;
  }

  .ai-button:hover .claude-logo svg,
  .ai-button:hover .openai-logo svg,
  .ai-button:hover .deepseek-logo svg {
    transform: scale(0.6);
  }

  /* Button text */
  .button-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.2;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    text-align: center;
    opacity: 0;
    transform: translateY(15px);
    z-index: 2;
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
  }

  .button-text span:first-child {
    font-size: 10px;
    font-weight: 500;
    margin-bottom: 1px;
  }

  .button-text span:last-child {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .claude-button .button-text {
    color: #000000;
  }

  .openai-button .button-text {
    color: #ffffff;
  }

  .deepseek-button .button-text {
    color: #ffffff;
  }

  .ai-button:hover .button-text {
    opacity: 1;
    transform: translateY(0);
  }

  /* Triangle positioning */
  .ai-triangle-container {
    display: grid;
    grid-template-areas: 
      ". top ."
      "left . right";
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    align-items: center;
    justify-items: center;
  }

  .claude-button {
    grid-area: top;
  }

  .openai-button {
    grid-area: left;
  }

  .deepseek-button {
    grid-area: right;
  }
`;

const StyledSocialCard = styled.div`
  .card {
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    gap: 10px;
    box-shadow: none;
    flex-wrap: wrap;
  }

  @media (min-width: 640px) {
    .card {
      padding: 25px 25px;
      gap: 20px;
    }
  }

  /* for all social containers*/
  .socialContainer {
    width: 40px;
    height: 40px;
    background-color: rgb(44, 44, 44);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition-duration: .3s;
    border-radius: 8px;
  }

  @media (min-width: 640px) {
    .socialContainer {
      width: 52px;
      height: 52px;
    }
  }
  /* instagram*/
  .containerOne:hover {
    background-color: #d62976;
    transition-duration: .3s;
  }
  /* twitter*/
  .containerTwo:hover {
    background-color: #00acee;
    transition-duration: .3s;
  }
  /* linkdin*/
  .containerThree:hover {
    background-color: #0072b1;
    transition-duration: .3s;
  }
  /* Whatsapp*/
  .containerFour:hover {
    background-color: #128C7E;
    transition-duration: .3s;
  }

  .socialContainer:active {
    transform: scale(0.9);
    transition-duration: .3s;
  }

  .socialSvg {
    width: 17px;
  }

  .socialSvg path {
    fill: rgb(255, 255, 255);
  }

  .socialContainer:hover .socialSvg {
    animation: slide-in-top 0.3s both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Engagement Metrics */
  .engagement-metrics {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 15px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    gap: 15px;
  }

  .metric-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
  }

  .metric-icon {
    font-size: 20px;
    margin-bottom: 5px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .metric-value {
    font-size: 18px;
    font-weight: 700;
    color: white;
    margin-bottom: 2px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .metric-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Count Up Animation Styling */
  .count-up-number {
    display: inline-block;
    transition: all 0.3s ease;
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
    50% {
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .engagement-metrics {
      flex-direction: column;
      gap: 10px;
    }
    
    .metric-item {
      flex-direction: row;
      gap: 8px;
    }
    
    .metric-icon {
      margin-bottom: 0;
    }
  }`;

export default ServicesSection;