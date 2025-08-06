import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SplineSceneProps {
  className?: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineViewerRef = useRef<any>(null);

  useEffect(() => {
    // Load Spline viewer script dynamically
    const loadSplineViewer = async () => {
      try {
        // Check if script is already loaded
        if (window.customElements?.get('spline-viewer')) {
          return;
        }

        // Load the Spline viewer script
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js';
        script.onload = () => {
          console.log('Spline viewer loaded successfully');
        };
        script.onerror = () => {
          console.error('Failed to load Spline viewer');
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Spline viewer:', error);
      }
    };

    loadSplineViewer();
  }, []);

  useEffect(() => {
    // Create spline-viewer element after script is loaded
    const createSplineViewer = () => {
      if (!containerRef.current) return;

      // Wait for custom element to be defined
      if (!window.customElements?.get('spline-viewer')) {
        setTimeout(createSplineViewer, 100);
        return;
      }

      // Clear existing content
      containerRef.current.innerHTML = '';

      // Create spline-viewer element
      const splineViewer = document.createElement('spline-viewer');
      splineViewer.setAttribute('url', 'https://prod.spline.design/YDfflhUHczfhClIJ/scene.splinecode');
      splineViewer.style.width = '100%';
      splineViewer.style.height = '100%';
      splineViewer.style.position = 'absolute';
      splineViewer.style.top = '0';
      splineViewer.style.left = '0';
      splineViewer.style.zIndex = '1';
      splineViewer.style.pointerEvents = 'auto'; // Enable pointer events for hover
      
      // Disable all interactions to prevent redirects
      splineViewer.setAttribute('events-target', 'none');
      splineViewer.setAttribute('loading-anim', 'true');
      splineViewer.setAttribute('mouse-events', 'false');
      splineViewer.setAttribute('touch-events', 'false');
      splineViewer.setAttribute('click-events', 'false');

      containerRef.current.appendChild(splineViewer);
      splineViewerRef.current = splineViewer;

      // Wait for the viewer to load and then enable interactions
      const enableInteractions = () => {
        if (splineViewerRef.current) {
          // Enable mouse events
          splineViewerRef.current.addEventListener('load', () => {
            console.log('Spline scene loaded, interactions enabled');
          });

          // Add event listeners for debugging
          splineViewerRef.current.addEventListener('mouseenter', () => {
            console.log('Mouse entered Spline scene');
          });

          // Prevent clicks but allow hover
          splineViewerRef.current.addEventListener('click', (e: any) => {
            console.log('Clicked on Spline scene', e);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
          });

          // Additional click prevention
          splineViewerRef.current.addEventListener('mousedown', (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
          });

          splineViewerRef.current.addEventListener('mouseup', (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
          });
        }
      };

      // Enable interactions after a short delay to ensure scene is loaded
      setTimeout(enableInteractions, 2000);
    };

    createSplineViewer();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-full ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ pointerEvents: 'auto' }} // Enable pointer events
    >
      {/* Loading state */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="text-white text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading 3D Scene...
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplineScene; 