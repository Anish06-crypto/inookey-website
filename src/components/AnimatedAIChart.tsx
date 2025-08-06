import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Multiple data series for different metrics
const dataSeries = {
  revenue: [
    { x: 0, y: 40 },
    { x: 1, y: 38 },
    { x: 2, y: 45 },
    { x: 3, y: 60 },
    { x: 4, y: 80 },
    { x: 5, y: 90 },
    { x: 6, y: 120 },
    { x: 7, y: 140 },
    { x: 8, y: 180 },
    { x: 9, y: 200 },
  ],
  efficiency: [
    { x: 0, y: 60 },
    { x: 1, y: 65 },
    { x: 2, y: 70 },
    { x: 3, y: 75 },
    { x: 4, y: 85 },
    { x: 5, y: 90 },
    { x: 6, y: 95 },
    { x: 7, y: 98 },
    { x: 8, y: 100 },
    { x: 9, y: 105 },
  ],
  automation: [
    { x: 0, y: 20 },
    { x: 1, y: 25 },
    { x: 2, y: 35 },
    { x: 3, y: 50 },
    { x: 4, y: 70 },
    { x: 5, y: 85 },
    { x: 6, y: 95 },
    { x: 7, y: 110 },
    { x: 8, y: 130 },
    { x: 9, y: 150 },
  ],
};

const seriesConfig = {
  revenue: { color: '#2dd4bf', label: 'Revenue Growth', gradient: ['#67e8f9', '#2dd4bf'] },
  efficiency: { color: '#a855f7', label: 'Efficiency', gradient: ['#c084fc', '#a855f7'] },
  automation: { color: '#f59e0b', label: 'Automation', gradient: ['#fbbf24', '#f59e0b'] },
};

const width = 500;
const height = 220;
const padding = 40;

// Scale data to fit SVG
const allData = [...dataSeries.revenue, ...dataSeries.efficiency, ...dataSeries.automation];
const maxY = Math.max(...allData.map(d => d.y));
const minY = Math.min(...allData.map(d => d.y));

const createPath = (data: typeof dataSeries.revenue, color: string) => {
  const points = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - ((d.y - minY) / (maxY - minY)) * (height - 2 * padding);
    return [x, y];
  });
  return {
    path: points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' '),
    points,
    color,
  };
};

const paths = Object.entries(dataSeries).map(([key, data]) => 
  createPath(data, seriesConfig[key as keyof typeof seriesConfig].color)
);

const AnimatedAIChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: any; series: string } | null>(null);
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Loop animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="rounded-2xl bg-gradient-to-br from-cyan-900/30 to-black/80 border border-white/10 shadow-lg"
        style={{ maxWidth: 400, minHeight: 200, width: '100%', height: '200px' }}
      >
        {/* Subtle grid */}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1={0}
            x2={width}
            y1={height - padding - ((height - 2 * padding) / 4) * i}
            y2={height - padding - ((height - 2 * padding) / 4) * i}
            stroke="#2dd4bf22"
            strokeWidth={1}
          />
        ))}

        {/* Y-axis labels */}
        {[...Array(5)].map((_, i) => {
          const value = minY + ((maxY - minY) / 4) * i;
          const y = height - padding - ((height - 2 * padding) / 4) * i;
          return (
            <text
              key={i}
              x={padding - 10}
              y={y + 4}
              textAnchor="end"
              fill="#2dd4bf66"
              fontSize="12"
              fontFamily="Inter"
            >
              {Math.round(value)}
            </text>
          );
        })}

        {/* X-axis labels */}
        {dataSeries.revenue.map((_, i) => {
          const x = padding + (i * (width - 2 * padding)) / (dataSeries.revenue.length - 1);
          return (
            <text
              key={i}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              fill="#2dd4bf66"
              fontSize="12"
              fontFamily="Inter"
            >
              Q{i + 1}
            </text>
          );
        })}

        {/* Animated glowing lines with looping */}
        {paths.map((pathData, seriesIndex) => {
          const seriesKey = Object.keys(dataSeries)[seriesIndex];
          const config = seriesConfig[seriesKey as keyof typeof seriesConfig];
          const isHovered = hoveredSeries === seriesKey;
          
          return (
            <g key={seriesKey}>
              {/* Area fill */}
              <motion.path
                d={`${pathData.path} L${pathData.points[pathData.points.length - 1][0]},${height - padding} L${pathData.points[0][0]},${height - padding} Z`}
                fill={`url(#area-${seriesKey})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.3 : 0.1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Line with looping animation */}
              <motion.path
                d={pathData.path}
                fill="none"
                stroke={`url(#glow-${seriesKey})`}
                strokeWidth={isHovered ? 6 : 4}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1, 0],
                  opacity: [0.5, 1, 1, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  ease: 'easeInOut',
                  delay: seriesIndex * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                style={{ 
                  filter: `drop-shadow(0 0 ${isHovered ? '16px' : '12px'} ${pathData.color}88)` 
                }}
                onMouseEnter={() => setHoveredSeries(seriesKey)}
                onMouseLeave={() => setHoveredSeries(null)}
                className="cursor-pointer"
              />
            </g>
          );
        })}

        {/* Interactive data points with pulsing animation */}
        {paths.map((pathData, seriesIndex) => {
          const seriesKey = Object.keys(dataSeries)[seriesIndex];
          const config = seriesConfig[seriesKey as keyof typeof seriesConfig];
          const data = dataSeries[seriesKey as keyof typeof dataSeries];
          
          return pathData.points.map(([x, y], i) => (
            <motion.circle
              key={`${seriesKey}-${i}`}
              cx={x}
              cy={y}
              r={8}
              fill={config.color}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.2 + seriesIndex * 0.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
              style={{ filter: `drop-shadow(0 0 8px ${config.color})` }}
              onMouseEnter={() => setHoveredPoint({ 
                x, 
                y, 
                data: data[i], 
                series: seriesKey 
              })}
              onMouseLeave={() => setHoveredPoint(null)}
              className="cursor-pointer"
              whileHover={{ scale: 1.3, r: 10 }}
            />
          ));
        })}

        {/* Gradients */}
        <defs>
          {Object.entries(seriesConfig).map(([key, config]) => (
            <React.Fragment key={key}>
              <linearGradient id={`glow-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={config.gradient[0]} />
                <stop offset="100%" stopColor={config.gradient[1]} />
              </linearGradient>
              <linearGradient id={`area-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={config.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={config.color} stopOpacity="0.1" />
              </linearGradient>
            </React.Fragment>
          ))}
        </defs>
      </svg>

      {/* Tooltip */}
      {hoveredPoint && (
        <motion.div
          className="absolute bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white text-sm shadow-xl z-50"
          style={{
            left: hoveredPoint.x + 20,
            top: hoveredPoint.y - 40,
            transform: 'translateX(-50%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="font-semibold text-cyan-300">
            {seriesConfig[hoveredPoint.series as keyof typeof seriesConfig].label}
          </div>
          <div className="text-gray-300">
            Value: {hoveredPoint.data.y}
          </div>
          <div className="text-gray-400 text-xs">
            Quarter {hoveredPoint.data.x + 1}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedAIChart;