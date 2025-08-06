import React from 'react';
import { ScrollTimeline, TimelineEvent } from './ScrollTimeline';
import { Brain, Cpu, Zap, Target, Search, Palette, Code, Rocket, Wrench, MapPin } from 'lucide-react';

const processEvents: TimelineEvent[] = [
  {
    year: "Step 01",
    title: "Discover & Strategize",
    subtitle: "Collaborative Workshop",
    description: "We align with your goals in a collaborative workshop. Every project starts with clarity — from vision to technical feasibility.",
    icon: <Search size={16} className="text-cyan-400" />,
    color: "cyan-400",
  },
  {
    year: "Step 02",
    title: "Design & Prototype",
    subtitle: "Interactive Designs",
    description: "You get interactive designs fast. We map out your core features and user flows to ensure seamless experiences.",
    icon: <Palette size={16} className="text-purple-400" />,
    color: "purple-400",
  },
  {
    year: "Step 03",
    title: "Build & Integrate",
    subtitle: "Rapid Development",
    description: "Rapid development using AI-enhanced workflows. Clean code, scalable structure, and modular APIs — all done in weeks.",
    icon: <Code size={16} className="text-orange-400" />,
    color: "orange-400",
  },
  {
    year: "Step 04",
    title: "Test, Launch & Empower",
    subtitle: "Deploy & Handover",
    description: "We deploy, test, and hand over the keys. You get documentation, training, and support — ready to scale or build further.",
    icon: <Rocket size={16} className="text-green-400" />,
    color: "green-400",
  },
  {
    year: "Step 05",
    title: "Maintenance & Support",
    subtitle: "Ongoing Updates",
    description: "Ongoing updates, bug fixes, and performance optimizations keep your product running smoothly.",
    icon: <Wrench size={16} className="text-blue-400" />,
    color: "blue-400",
  },
  {
    year: "Step 06",
    title: "Geo Marketing Integration",
    subtitle: "Location-Based Strategies",
    description: "Leverage location-based strategies to reach your audience more effectively and boost engagement.",
    icon: <MapPin size={16} className="text-pink-400" />,
    color: "pink-400",
  },
];

const ProcessSteps: React.FC = () => {
  return (
    <section className="relative py-24 bg-black text-white border-t border-white/10">
      <ScrollTimeline
        events={processEvents}
        title="Our 6-Step Process"
        subtitle="From idea to intelligent product — in just 30 days and beyond."
        animationOrder="staggered"
        cardAlignment="alternating"
        lineColor="bg-cyan-500/30"
        activeColor="bg-cyan-500"
        progressIndicator={true}
        cardVariant="outlined"
        cardEffect="glow"
        parallaxIntensity={0.05}
        progressLineWidth={3}
        progressLineCap="round"
        dateFormat="badge"
        revealAnimation="slide"
        connectorStyle="line"
        perspective={true}
        darkMode={true}
        className="bg-black"
      />
    </section>
  );
};

export default ProcessSteps; 