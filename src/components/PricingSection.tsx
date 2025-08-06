import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Particles from './Particles';

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  annualPrice: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'outline';
  discount?: string;
  category: 'software' | 'marketing';
}

const softwarePlans: PricingPlan[] = [
  {
    id: 'website-solutions',
    title: 'Website Solutions',
    price: '£149.99 - £299.99',
    annualPrice: '£1,399 - £2,799/year',
    features: [
      'Local Business Plan (3-4 pages)',
      'Online Business Plan (4-5 pages)',
      'Premium Business Plan (6+ pages)',
      'Contact forms & booking systems',
      'SEO setup & mobile optimization',
      'Lead capture & advanced features'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'primary',
    discount: 'Save 5-15%',
    category: 'software'
  },
  {
    id: 'ai-automation',
    title: 'AI Automation Suite',
    price: '£99.99 - £229.99',
    annualPrice: '£1,199 - £2,759/year',
    features: [
      'AI Voicemail Transcriber',
      'AI SMS Agent (24/7 chatbot)',
      'AI Lead Capture (up to 150/month)',
      'Real-time processing',
      'Multi-language support',
      'CRM integration & weekly reports'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'secondary',
    discount: 'Save 10%',
    category: 'software'
  },
  {
    id: 'premium-ai-suite',
    title: 'Premium AI Suite',
    price: '£299.99 - £399.99',
    annualPrice: '£2,799 - £4,799/year',
    features: [
      'Complete website + AI integration',
      'Advanced lead nurturing',
      'Custom AI response templates',
      'Multi-platform automation',
      'Priority support & training',
      'Custom development options'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline',
    discount: 'Save 15%',
    category: 'software'
  }
];

const marketingPlans: PricingPlan[] = [
  {
    id: 'seo-marketing',
    title: 'SEO & Digital Marketing',
    price: '£149.99 - £249.99',
    annualPrice: '£1,799 - £2,999/year',
    features: [
      'Google SEO + Social Media',
      'Website + Google SEO',
      'Website + Social Media',
      'Keyword tracking & optimization',
      'Performance monitoring',
      'Content strategy & analytics'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'primary',
    discount: 'Save 10%',
    category: 'marketing'
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    price: '£49.99 - £149.99',
    annualPrice: '£599 - £1,799/year',
    features: [
      'Starter Plan (60 posts/month)',
      'Pro Plan (140+ posts/month)',
      'All-in-One Plan (200+ posts/month)',
      'Graphics creation & scheduling',
      'Engagement management',
      'Ads management & branding'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'secondary',
    discount: 'Save 10%',
    category: 'marketing'
  },
  {
    id: 'comprehensive-marketing',
    title: 'Comprehensive Marketing',
    price: '£299.99 - £499.99',
    annualPrice: '£3,599 - £5,999/year',
    features: [
      'Full website + SEO + Social',
      'Multi-platform campaigns',
      'Advanced analytics & reporting',
      'Custom content creation',
      'Brand development',
      'Geo-targeting & local SEO'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline',
    discount: 'Save 15%',
    category: 'marketing'
  }
];

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'software' | 'marketing'>('software');

  const handlePlanClick = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // Add your plan selection logic here
  };

  const currentPlans = activeCategory === 'software' ? softwarePlans : marketingPlans;

  return (
    <section id="pricing" className="relative py-24 bg-black text-white border-t border-white/10 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 h-full">
        <Particles 
          particleColors={["#67e8f9", "#2dd4bf", "#fff"]}
          particleCount={250}
          particleSpread={5}
          speed={0.06}
          alphaParticles={true}
          particleBaseSize={70}
          sizeRandomness={0.5}
          cameraDistance={18}
          className="w-full h-full"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Choose Your Perfect Plan
          </h2>
          
          {/* Category Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              <div className="flex">
                <button
                  onClick={() => setActiveCategory('software')}
                  className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === 'software'
                      ? 'bg-white text-black shadow-lg'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  Software + Security
                </button>
                <button
                  onClick={() => setActiveCategory('marketing')}
                  className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === 'marketing'
                      ? 'bg-white text-black shadow-lg'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  Marketing + GEO
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Toggle */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              <div className="flex">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    !isAnnual
                      ? 'bg-white text-black shadow-lg'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isAnnual
                      ? 'bg-white text-black shadow-lg'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  Annual
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 h-full backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                {/* Discount Badge */}
                {plan.discount && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {plan.discount}
                    </span>
                  </div>
                )}

                {/* Plan Title */}
                <h3 className="text-xl font-bold mb-4 text-center">{plan.title}</h3>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="text-3xl md:text-4xl font-bold">
                    {isAnnual ? plan.annualPrice : plan.price}
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-gray-400 mt-1">billed annually</div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => handlePlanClick(plan.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      plan.buttonVariant === 'primary'
                        ? 'bg-white text-black hover:bg-gray-200'
                        : plan.buttonVariant === 'secondary'
                        ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:opacity-90'
                        : 'border border-white text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                  
                  {/* Contact Email */}
                  <div className="text-center mt-4">
                    <span className="text-gray-400 text-sm">hello@inookey.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 