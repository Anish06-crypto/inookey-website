import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  month: string;
  profit: number;
  cost: number;
  savings: number;
}

const data: DataPoint[] = [
  { month: 'Jan', profit: 50, cost: 100, savings: 0 },
  { month: 'Feb', profit: 65, cost: 95, savings: 5 },
  { month: 'Mar', profit: 80, cost: 88, savings: 12 },
  { month: 'Apr', profit: 95, cost: 82, savings: 18 },
  { month: 'May', profit: 110, cost: 75, savings: 25 },
  { month: 'Jun', profit: 130, cost: 68, savings: 32 },
  { month: 'Jul', profit: 150, cost: 60, savings: 40 },
  { month: 'Aug', profit: 175, cost: 52, savings: 48 },
];

const width = 500;
const height = 220;
const padding = 60;

const ProfitVsCostChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Scale data to fit SVG
  const maxProfit = Math.max(...data.map(d => d.profit));
  const maxCost = Math.max(...data.map(d => d.cost));
  const minCost = Math.min(...data.map(d => d.cost));

  const scaleY = (value: number, isProfit: boolean) => {
    if (isProfit) {
      return height - padding - ((value / maxProfit) * (height - 2 * padding));
    } else {
      return height - padding - (((value - minCost) / (maxCost - minCost)) * (height - 2 * padding));
    }
  };

  const scaleX = (index: number) => {
    return padding + (index * (width - 2 * padding)) / (data.length - 1);
  };

  // Create paths for profit and cost lines
  const profitPath = data.map((d, i) => {
    const x = scaleX(i);
    const y = scaleY(d.profit, true);
    return [x, y];
  });

  const costPath = data.map((d, i) => {
    const x = scaleX(i);
    const y = scaleY(d.cost, false);
    return [x, y];
  });

  const createPathString = (points: number[][]) => {
    return points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="rounded-2xl bg-gradient-to-br from-orange-900/30 to-black/80 border border-white/10 shadow-lg"
        style={{ maxWidth: 400, minHeight: 200, width: '100%', height: '200px' }}
      >
        {/* Background grid */}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1={0}
            x2={width}
            y1={height - padding - ((height - 2 * padding) / 4) * i}
            y2={height - padding - ((height - 2 * padding) / 4) * i}
            stroke="#f59e0b22"
            strokeWidth={1}
          />
        ))}

        {/* Y-axis labels for Profit */}
        {[...Array(5)].map((_, i) => {
          const value = (maxProfit / 4) * i;
          const y = height - padding - ((height - 2 * padding) / 4) * i;
          return (
            <text
              key={`profit-${i}`}
              x={padding - 10}
              y={y + 4}
              textAnchor="end"
              fill="#2dd4bf66"
              fontSize="10"
              fontFamily="Inter"
            >
              ${Math.round(value)}k
            </text>
          );
        })}

        {/* Y-axis labels for Cost */}
        {[...Array(5)].map((_, i) => {
          const value = maxCost - ((maxCost - minCost) / 4) * i;
          const y = height - padding - ((height - 2 * padding) / 4) * i;
          return (
            <text
              key={`cost-${i}`}
              x={width - padding + 10}
              y={y + 4}
              textAnchor="start"
              fill="#ef444466"
              fontSize="10"
              fontFamily="Inter"
            >
              ${Math.round(value)}k
            </text>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = scaleX(i);
          return (
            <text
              key={i}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              fill="#f59e0b66"
              fontSize="10"
              fontFamily="Inter"
            >
              {d.month}
            </text>
          );
        })}

        {/* Profit line */}
        <motion.path
          d={createPathString(profitPath)}
          fill="none"
          stroke="#2dd4bf"
          strokeWidth={3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2
          }}
          style={{ filter: 'drop-shadow(0 0 8px #2dd4bf)' }}
        />

        {/* Cost line */}
        <motion.path
          d={createPathString(costPath)}
          fill="none"
          stroke="#ef4444"
          strokeWidth={3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 4,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 2
          }}
          style={{ filter: 'drop-shadow(0 0 8px #ef4444)' }}
        />

        {/* Profit data points */}
        {profitPath.map(([x, y], i) => (
          <motion.circle
            key={`profit-${i}`}
            cx={x}
            cy={y}
            r={4}
            fill="#2dd4bf"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            style={{ filter: 'drop-shadow(0 0 6px #2dd4bf)' }}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
            className="cursor-pointer"
            whileHover={{ scale: 1.5, r: 6 }}
          />
        ))}

        {/* Cost data points */}
        {costPath.map(([x, y], i) => (
          <motion.circle
            key={`cost-${i}`}
            cx={x}
            cy={y}
            r={4}
            fill="#ef4444"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.3 + 1,
              repeat: Infinity,
              repeatDelay: 2
            }}
            style={{ filter: 'drop-shadow(0 0 6px #ef4444)' }}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
            className="cursor-pointer"
            whileHover={{ scale: 1.5, r: 6 }}
          />
        ))}

        {/* Legend */}
        <g transform="translate(10, 20)">
          <circle cx="5" cy="5" r="3" fill="#2dd4bf" />
          <text x="12" y="8" fill="#2dd4bf" fontSize="10" fontFamily="Inter" fontWeight="600">
            Profit
          </text>
          <circle cx="5" cy="20" r="3" fill="#ef4444" />
          <text x="12" y="23" fill="#ef4444" fontSize="10" fontFamily="Inter" fontWeight="600">
            Cost
          </text>
        </g>

        {/* Savings indicator */}
        <motion.text
          x="50"
          y="30"
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="12"
          fontFamily="Inter"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          Cost Savings: ${data[data.length - 1].savings}k
        </motion.text>

        {/* Tooltip */}
        {hoveredPoint !== null && (
          <motion.div
            className="absolute bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white text-sm shadow-xl z-50"
            style={{
              left: profitPath[hoveredPoint][0] + 20,
              top: profitPath[hoveredPoint][1] - 40,
              transform: 'translateX(-50%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="font-semibold text-cyan-300">
              {data[hoveredPoint].month}
            </div>
            <div className="text-green-400">
              Profit: ${data[hoveredPoint].profit}k
            </div>
            <div className="text-red-400">
              Cost: ${data[hoveredPoint].cost}k
            </div>
            <div className="text-yellow-400">
              Savings: ${data[hoveredPoint].savings}k
            </div>
          </motion.div>
        )}
      </svg>
    </div>
  );
};

export default ProfitVsCostChart; 