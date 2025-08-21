import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'lg' }) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'h-10',
      image: 'h-8 w-auto'
    },
    md: {
      container: 'h-14',
      image: 'h-12 w-auto'
    },
    lg: {
      container: 'h-48',
      image: 'h-48 w-auto'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${className}`}>
      <a 
        href="#hero" 
        className="flex items-center focus:outline-none focus:ring-0 logo-link"
      >
        <div className={`${config.container} relative overflow-hidden`}>
          <img
            src="/2.png"
            alt="INOO KEY Logo"
            className={`${config.image} object-contain`}
          />
        </div>
      </a>
    </div>
  );
};

export default Logo;
