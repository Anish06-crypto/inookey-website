import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Workflow, Users, Zap, Shield, Rocket } from 'lucide-react';
import AnimatedAIChart from './AnimatedAIChart';
import InteractiveTeamAvatars from './InteractiveTeamAvatars';
import ProcessFlowAnimation from './ProcessFlowAnimation';
import ProfitVsCostChart from './ProfitVsCostChart';
import Particles from './Particles';

const services = [
  {
    icon: <Users size={32} className="text-cyan-400" />,
    title: 'Seamless Collaboration',
    description: 'Weekly check-ins, shared updates, and feedback loops built around you. Through workshops, regular syncs, and updates, we unlock innovation and drive growth.',
    badge: 'AI-Driven',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.1 },
    },
  },
  {
    icon: <Workflow size={32} className="text-green-400" />,
    title: 'AI-Powered Workflows',
    description: 'Automate the tedious. Let AI handle the repetitive so your team can focus on what matters. Automate tasks like sending emails, processing orders, and more.',
    badge: 'Automation',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.2 },
    },
  },
  {
    icon: <BarChart3 size={32} className="text-orange-400" />,
    title: 'Scalable Architecture',
    description: 'Clean APIs, fast backends, and a future-ready tech stack baked in. Transform your operations with AI-driven solutions that drive revenue growth.',
    badge: 'AI Analytics',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.3 },
    },
  },
  {
    icon: <Zap size={32} className="text-fuchsia-400" />,
    title: 'Built in 30 Days',
    description: 'From idea to launch — we deliver production-grade MVPs in one month. Get actionable insights and recommendations in real time.',
    badge: 'Live AI',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.4 },
    },
  },
  {
    icon: <div className="text-2xl">🔒</div>,
    title: 'You Own Everything',
    description: 'No black box. 100% code ownership. Fully portable and scalable. Intelligent interfaces designed with clarity.',
    badge: 'Ownership',
    animation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.5 },
    },
  },
  {
    icon: <Rocket size={32} className="text-yellow-400" />,
    title: 'Future-Ready Solutions',
    description: 'Stay ahead with cutting-edge AI technologies and scalable infrastructure. We build systems that grow with your business and adapt to tomorrow\'s challenges.',
    badge: 'Innovation',
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
          Our Products & Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20" style={{
          gridTemplateAreas: `
            "card1 card2 card3"
            "card4 card5 card6"
          `,
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: 'auto auto'
        }}>
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 shadow-lg group overflow-hidden hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm"
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
              <h3 className="text-2xl font-bold mb-2 gradient-text group-hover:text-cyan-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-2">
                {service.description}
              </p>
              {/* Embed animated components in cards */}
              {idx === 0 && (
                <div className="mt-6">
                  <InteractiveTeamAvatars />
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
                  <AnimatedAIChart />
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
                       style={{ maxWidth: 400, minHeight: 200, width: '100%', height: '200px' }}
                     >
                                               {/* Background grid */}
                        <defs>
                          <pattern id="grid5" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#37415122" strokeWidth="0.3"/>
                          </pattern>
                          {/* Chain link pattern */}
                          <defs>
                            <g id="chainLink">
                              <ellipse cx="0" cy="0" rx="3" ry="1.5" fill="none" stroke="#a855f7" strokeWidth="1"/>
                            </g>
                          </defs>
                        </defs>
                        <rect x="0" y="0" width="100" height="100" fill="url(#grid5)" />
                       
                       {/* Black box container */}
                       <motion.rect
                         x="35"
                         y="30"
                         width="30"
                         height="25"
                         rx="3"
                         fill="#111827"
                         stroke="#a855f7"
                         strokeWidth="1.5"
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
                       
                       {/* Lock on the box */}
                       <motion.g transform="translate(50, 42)">
                         {/* Lock body */}
                         <motion.rect
                           x="-4"
                           y="-8"
                           width="8"
                           height="12"
                           rx="2"
                           fill="#a855f7"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: [0.7, 1, 0.7] }}
                           transition={{ 
                             duration: 2,
                             repeat: Infinity,
                             repeatDelay: 1
                           }}
                         />
                         {/* Lock shackle */}
                         <motion.path
                           d="M -4 -8 Q -4 -12 0 -12 Q 4 -12 4 -8"
                           fill="none"
                           stroke="#a855f7"
                           strokeWidth="2"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: [0.7, 1, 0.7] }}
                           transition={{ 
                             duration: 2,
                             delay: 0.3,
                             repeat: Infinity,
                             repeatDelay: 1
                           }}
                         />
                       </motion.g>
                       
                                               {/* Connected chains in cross pattern around the box */}
                        <motion.g>
                          {/* Chain 1 - Horizontal chain */}
                          <motion.g>
                            {/* Chain link 1 */}
                            <motion.ellipse
                              cx="25"
                              cy="25"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 2 */}
                            <motion.ellipse
                              cx="35"
                              cy="25"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 3 */}
                            <motion.ellipse
                              cx="45"
                              cy="25"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.4, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 4 */}
                            <motion.ellipse
                              cx="55"
                              cy="25"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 5 */}
                            <motion.ellipse
                              cx="65"
                              cy="25"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.8, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 6 */}
                            <motion.ellipse
                              cx="75"
                              cy="25"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
                            />
                          </motion.g>
                          
                          {/* Chain 2 - Vertical chain */}
                          <motion.g>
                            {/* Chain link 1 */}
                            <motion.ellipse
                              cx="25"
                              cy="25"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 2 */}
                            <motion.ellipse
                              cx="25"
                              cy="35"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.7, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 3 */}
                            <motion.ellipse
                              cx="25"
                              cy="45"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.9, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 4 */}
                            <motion.ellipse
                              cx="25"
                              cy="55"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.1, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 5 */}
                            <motion.ellipse
                              cx="25"
                              cy="65"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.3, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 6 */}
                            <motion.ellipse
                              cx="25"
                              cy="75"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
                            />
                          </motion.g>
                          
                          {/* Chain 3 - Right vertical chain */}
                          <motion.g>
                            {/* Chain link 1 */}
                            <motion.ellipse
                              cx="75"
                              cy="25"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 2 */}
                            <motion.ellipse
                              cx="75"
                              cy="35"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.7, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 3 */}
                            <motion.ellipse
                              cx="75"
                              cy="45"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 0.9, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 4 */}
                            <motion.ellipse
                              cx="75"
                              cy="55"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.1, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 5 */}
                            <motion.ellipse
                              cx="75"
                              cy="65"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.3, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 6 */}
                            <motion.ellipse
                              cx="75"
                              cy="75"
                              rx="1.5"
                              ry="3"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
                            />
                          </motion.g>
                          
                          {/* Chain 4 - Bottom horizontal chain */}
                          <motion.g>
                            {/* Chain link 1 */}
                            <motion.ellipse
                              cx="25"
                              cy="75"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 2 */}
                            <motion.ellipse
                              cx="35"
                              cy="75"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 3 */}
                            <motion.ellipse
                              cx="45"
                              cy="75"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.4, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 4 */}
                            <motion.ellipse
                              cx="55"
                              cy="75"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.6, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 5 */}
                            <motion.ellipse
                              cx="65"
                              cy="75"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 1.8, repeat: Infinity, repeatDelay: 1 }}
                            />
                            {/* Chain link 6 */}
                            <motion.ellipse
                              cx="75"
                              cy="75"
                              rx="3"
                              ry="1.5"
                              fill="none"
                              stroke="#a855f7"
                              strokeWidth="1.5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 1 }}
                            />
                          </motion.g>
                          
                          {/* Chain connectors at corners */}
                          <motion.circle
                            cx="25"
                            cy="25"
                            r="2"
                            fill="#a855f7"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          />
                          <motion.circle
                            cx="75"
                            cy="25"
                            r="2"
                            fill="#a855f7"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
                          />
                          <motion.circle
                            cx="25"
                            cy="75"
                            r="2"
                            fill="#a855f7"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
                          />
                          <motion.circle
                            cx="75"
                            cy="75"
                            r="2"
                            fill="#a855f7"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
                          />
                        </motion.g>
                       
                       {/* Ownership text */}
                       <motion.text
                         x="50"
                         y="85"
                         textAnchor="middle"
                         fill="#a855f7"
                         fontSize="10"
                         fontFamily="Inter"
                         fontWeight="600"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: [0.7, 1, 0.7] }}
                         transition={{ 
                           duration: 2,
                           delay: 1,
                           repeat: Infinity,
                           repeatDelay: 1
                         }}
                       >
                         100% Ownership
                       </motion.text>
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
                       style={{ maxWidth: 400, minHeight: 200, width: '100%', height: '200px' }}
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
                           1010
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
                           1101
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
                           0110
                         </motion.text>
                       </motion.g>
                       
                       {/* Future-Ready text */}
                       <motion.text
                         x="50"
                         y="90"
                         textAnchor="middle"
                         fill="#eab308"
                         fontSize="10"
                         fontFamily="Inter"
                         fontWeight="600"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: [0.7, 1, 0.7] }}
                         transition={{ 
                           duration: 2,
                           delay: 1,
                           repeat: Infinity,
                           repeatDelay: 1
                         }}
                       >
                         Future-Ready
                       </motion.text>
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

export default ServicesSection;