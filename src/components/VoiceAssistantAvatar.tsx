import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface VoiceAssistantAvatarProps {
  isListening: boolean;
  isProcessing: boolean;
  isMuted: boolean;
}

const AvatarMesh: React.FC<{
  isListening: boolean;
  isProcessing: boolean;
  isMuted: boolean;
}> = ({ 
  isListening, 
  isProcessing, 
  isMuted 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const waveRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Rotation animation
      meshRef.current.rotation.y += 0.01;
    }

    if (pulseRef.current && isListening) {
      // Pulse animation when listening
      const scale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.2;
      pulseRef.current.scale.set(scale, scale, scale);
    }

    if (waveRef.current && isListening) {
      // Wave animation when listening
      waveRef.current.rotation.z += 0.05;
    }
  });

  return (
    <group>
      {/* Main avatar body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={isListening ? '#4ade80' : isProcessing ? '#fbbf24' : '#3b82f6'}
          emissive={isListening ? '#22c55e' : isProcessing ? '#f59e0b' : '#1d4ed8'}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Pulse ring when listening */}
      {isListening && (
        <mesh ref={pulseRef} position={[0, 0, 0]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial color="#4ade80" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Processing indicator */}
      {isProcessing && (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0.2, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[-0.2, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        </group>
      )}

      {/* Muted indicator */}
      {isMuted && (
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
          <meshStandardMaterial color="#ef4444" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Wave rings when listening */}
      {isListening && (
        <group ref={waveRef} position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[1.5, 1.7, 32]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[1.8, 2.0, 32]} />
            <meshBasicMaterial color="#16a34a" transparent opacity={0.3} />
          </mesh>
        </group>
      )}
    </group>
  );
};

const VoiceAssistantAvatar: React.FC<VoiceAssistantAvatarProps> = ({
  isListening,
  isProcessing,
  isMuted
}) => {
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AvatarMesh 
          isListening={isListening}
          isProcessing={isProcessing}
          isMuted={isMuted}
        />
      </Canvas>
    </div>
  );
};

export default VoiceAssistantAvatar; 