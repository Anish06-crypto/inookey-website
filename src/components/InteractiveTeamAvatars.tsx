import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Avatar {
  id: number;
  x: number;
  y: number;
  color: string;
  name: string;
  role: string;
  isActive: boolean;
}

const avatars: Avatar[] = [
  { id: 1, x: 30, y: 40, color: '#67e8f9', name: 'Alex', role: 'Lead', isActive: true },
  { id: 2, x: 70, y: 40, color: '#2dd4bf', name: 'Sam', role: 'Dev', isActive: true },
  { id: 3, x: 50, y: 70, color: '#a855f7', name: 'Jordan', role: 'Design', isActive: true },
];

const InteractiveTeamAvatars: React.FC = () => {
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);
  const [connections, setConnections] = useState<Array<{ from: number; to: number }>>([]);

  // Generate connections between avatars
  useEffect(() => {
    const newConnections = [];
    for (let i = 0; i < avatars.length; i++) {
      for (let j = i + 1; j < avatars.length; j++) {
        // Connect avatars that are close to each other
        const distance = Math.sqrt(
          Math.pow(avatars[i].x - avatars[j].x, 2) + 
          Math.pow(avatars[i].y - avatars[j].y, 2)
        );
        if (distance < 40) {
          newConnections.push({ from: avatars[i].id, to: avatars[j].id });
        }
      }
    }
    setConnections(newConnections);
  }, []);

  const getConnectionPath = (from: Avatar, to: Avatar) => {
    return `M${from.x},${from.y} L${to.x},${to.y}`;
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="rounded-2xl bg-gradient-to-br from-cyan-900/30 to-black/80 border border-white/10 shadow-lg"
        style={{ maxWidth: 400, minHeight: 200, width: '100%', height: '200px' }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2dd4bf22" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />

                 {/* Connection lines - simplified */}
         <motion.path
           d="M30,40 L50,70 L70,40"
           stroke="#2dd4bf44"
           strokeWidth="1"
           fill="none"
           initial={{ pathLength: 0, opacity: 0 }}
           animate={{ 
             pathLength: [0, 1, 1, 0],
             opacity: [0, 0.4, 0.4, 0]
           }}
           transition={{ 
             duration: 4,
             repeat: Infinity,
             repeatDelay: 2
           }}
         />

        {/* Avatars */}
        {avatars.map((avatar, index) => (
          <g key={avatar.id}>
            {/* Avatar circle */}
            <motion.circle
              cx={avatar.x}
              cy={avatar.y}
              r={8}
              fill={avatar.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                delay: index * 0.3,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              style={{ filter: `drop-shadow(0 0 8px ${avatar.color})` }}
              onMouseEnter={() => setHoveredAvatar(avatar.id)}
              onMouseLeave={() => setHoveredAvatar(null)}
              className="cursor-pointer"
              whileHover={{ scale: 1.3, r: 10 }}
            />

                         {/* Pulsing ring - simplified */}
             <motion.circle
               cx={avatar.x}
               cy={avatar.y}
               r={10}
               fill="none"
               stroke={avatar.color}
               strokeWidth="1"
               initial={{ scale: 0, opacity: 0 }}
               animate={{ 
                 scale: [0, 1.2, 0],
                 opacity: [0.6, 0, 0]
               }}
               transition={{ 
                 duration: 3,
                 delay: index * 0.5,
                 repeat: Infinity,
                 repeatDelay: 2
               }}
             />

            {/* Name label */}
            <motion.text
              x={avatar.x}
              y={avatar.y + 20}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8"
              fontFamily="Inter"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredAvatar === avatar.id ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            >
              {avatar.name}
            </motion.text>

            {/* Role label */}
            <motion.text
              x={avatar.x}
              y={avatar.y + 28}
              textAnchor="middle"
              fill="#67e8f9"
              fontSize="6"
              fontFamily="Inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredAvatar === avatar.id ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              {avatar.role}
            </motion.text>
          </g>
        ))}

                 {/* Collaboration indicator - simplified */}
         {/* <div className=""></div> */}
      </svg>
    </div>
  );
};

export default InteractiveTeamAvatars; 