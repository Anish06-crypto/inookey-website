import React from 'react';
import Particles from './Particles';

const AboutSection: React.FC = () => {

  return (
    <section id="about" className="relative py-24 bg-black text-white border-t border-white/10 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 h-full">
        <Particles 
          particleColors={["#67e8f9", "#2dd4bf", "#fff"]}
          particleCount={300}
          particleSpread={5}
          speed={0.08}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.6}
          cameraDistance={20}
          className="w-full h-full"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team section temporarily hidden
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet the Team Powering InooKey
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProfileCard
                avatarUrl={member.avatarUrl}
                name={member.name}
                title={member.title}
                handle={member.handle}
                status={member.status}
                behindGradient={member.behindGradient}
                innerGradient={member.innerGradient}
                contactText="Contact"
                onContactClick={() => handleContactClick(member.name)}
                className="w-full max-w-sm"
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex justify-center items-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <button className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
        */}


      </div>
    </section>
  );
};

export default AboutSection; 