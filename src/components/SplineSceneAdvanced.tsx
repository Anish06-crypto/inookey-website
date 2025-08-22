import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

interface SplineSceneAdvancedProps {
  className?: string;
}

const SplineSceneAdvanced: React.FC<SplineSceneAdvancedProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const splineRef = useRef<any>(null);

  const onLoad = (splineApp: any) => {
    console.log('Spline scene loaded successfully');
    splineRef.current = splineApp;
    setIsLoading(false);
  };

  const onMouseDown = (e: any) => {
    console.log('Mouse down on Spline scene', e);
    // Prevent any default actions
    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseUp = (e: any) => {
    console.log('Mouse up on Spline scene', e);
    // Prevent any default actions
    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseOver = (e: any) => {
    console.log('Mouse over on Spline scene', e);
    // Allow hover interactions but prevent any redirects
    e.stopPropagation();
  };

  // Prevent any clicks on the container
  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // Allow hover but prevent clicks
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only prevent on left click (button 0)
    if (e.button === 0) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Additional click prevention
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <>
      {/* Responsive CSS for mobile */}
      <style>
        {`
          @media (max-width: 768px) {
            .spline-container {
              width: 100% !important;
              height: 100% !important;
              overflow: visible !important;
            }
            
            .spline-scene {
              width: 100% !important;
              height: 100% !important;
              object-fit: contain !important;
            }
          }
        `}
      </style>
      
      <motion.div
        className={`relative w-full h-full overflow-hidden spline-container ${className || ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ 
          pointerEvents: 'auto',
          // Standard viewport sizing
          width: '100%',
          height: '100%',
        }}
        onClick={handleContainerClick}
        onPointerDown={handlePointerDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              className="text-white text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading 3D Scene...
            </motion.div>
          </div>
        )}

        {/* Spline Scene */}
        <div 
          className="relative w-full h-full"
          style={{
            zIndex: 1,
            pointerEvents: 'auto',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
        >
          <Spline
            className="spline-scene"
            scene="https://prod.spline.design/YDfflhUHczfhClIJ/scene.splinecode"
            onLoad={onLoad}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOver={onMouseOver}
            style={{
              width: '100%',
              height: '100%',
              // Let Spline handle responsiveness naturally
              objectFit: 'contain',
              pointerEvents: 'auto',
            }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default SplineSceneAdvanced; 