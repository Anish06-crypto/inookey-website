import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProcessStep {
  id: number;
  name: string;
  type: 'manual' | 'automated';
  status: 'pending' | 'processing' | 'completed';
  color: string;
}

const processSteps: ProcessStep[] = [
  { id: 1, name: 'Manual Data Entry', type: 'manual', status: 'completed', color: '#ef4444' },
  { id: 2, name: 'Manual Processing', type: 'manual', status: 'completed', color: '#f59e0b' },
  { id: 3, name: 'AI Integration', type: 'automated', status: 'processing', color: '#2dd4bf' },
  { id: 4, name: 'Automated Workflow', type: 'automated', status: 'processing', color: '#67e8f9' },
  { id: 5, name: 'Smart Automation', type: 'automated', status: 'pending', color: '#a855f7' },
];

const ProcessFlowAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev % processSteps.length) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="rounded-2xl bg-gradient-to-br from-green-900/30 to-black/80 border border-white/10 shadow-lg"
        style={{ maxWidth: 400, minHeight: 200, width: '100%', height: '200px' }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#2dd4bf22" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />

        {/* Process Flow Line */}
        <motion.path
          d="M10,50 Q50,20 90,50"
          stroke="#2dd4bf44"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />

        {/* Process Steps */}
        {processSteps.map((step, index) => {
          const x = 10 + (index * 20);
          const y = 50 - Math.sin(index * 0.5) * 15;
          const isActive = currentStep === step.id;
          const isAutomated = step.type === 'automated';
          
          return (
            <g key={step.id} transform={`translate(${x}, ${y})`}>
              {/* Step Circle */}
              <motion.circle
                cx="0"
                cy="0"
                r={isAutomated ? 6 : 5}
                fill={step.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isActive ? [1, 1.3, 1] : 1,
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.3,
                  repeat: isActive ? Infinity : 0,
                  repeatDelay: 1
                }}
                style={{ filter: `drop-shadow(0 0 6px ${step.color})` }}
              />

              {/* Step Label */}
              <motion.text
                x="0"
                y={isAutomated ? 15 : 12}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="5"
                fontFamily="Inter"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
              >
                {/* {step.name} */}
              </motion.text>

              {/* Type Indicator */}
              <motion.text
                x="0"
                y={isAutomated ? 22 : 19}
                textAnchor="middle"
                fill={isAutomated ? '#2dd4bf' : '#f59e0b'}
                fontSize="4"
                fontFamily="Inter"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
              >
                {isAutomated ? 'AI' : 'Manual'}
              </motion.text>

              {/* Status Indicator */}
              <motion.circle
                cx="0"
                cy={isAutomated ? -12 : -10}
                r="2"
                fill={step.status === 'completed' ? '#2dd4bf' : 
                      step.status === 'processing' ? '#f59e0b' : '#666666'}
                animate={step.status === 'processing' ? 
                  { scale: [1, 1.5, 1] } : {}
                }
                transition={{ duration: 1, repeat: step.status === 'processing' ? Infinity : 0 }}
              />
            </g>
          );
        })}

        {/* Transformation Arrow */}
        <motion.g transform="translate(50, 30)">
          <motion.path
            d="M-10,0 L10,0 M5,-5 L10,0 L5,5"
            stroke="#2dd4bf"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
          <motion.text
            x="0"
            y="15"
            textAnchor="middle"
            fill="#2dd4bf"
            fontSize="6"
            fontFamily="Inter"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            AI Transformation
          </motion.text>
        </motion.g>

        {/* Efficiency Metrics */}
        <g transform="translate(10, 80)">
          <text
            x="0"
            y="0"
            fill="#ffffff"
            fontSize="6"
            fontFamily="Inter"
          >
            Manual → Automated
          </text>
          <text
            x="0"
            y="8"
            fill="#2dd4bf"
            fontSize="6"
            fontFamily="Inter"
          >
            Efficiency: +300%
          </text>
        </g>

        {/* Progress Indicator */}
        <motion.g transform="translate(70, 80)">
          <rect
            x="0"
            y="0"
            width="20"
            height="4"
            rx="2"
            fill="#ffffff22"
            stroke="#2dd4bf44"
            strokeWidth="0.5"
          />
          <motion.rect
            x="0"
            y="0"
            width="12"
            height="4"
            rx="2"
            fill="#2dd4bf"
            initial={{ width: 0 }}
            animate={{ width: 12 }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default ProcessFlowAnimation; 