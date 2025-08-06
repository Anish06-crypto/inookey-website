import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Globe, Video, User } from 'lucide-react';
import Particles from './Particles';

const CalendarSection: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');

  const timeSlots = [
    '2:30pm', '3:00pm', '3:30pm', '4:30pm', 
    '5:00pm', '5:30pm', '6:00pm', '7:30pm', '8:00pm'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    // Add empty days for padding
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleDateClick = (day: number) => {
    if (day) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <section id="booking" className="relative py-24 bg-black text-white border-t border-white/10 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 h-full">
        <Particles 
          particleColors={["#67e8f9", "#2dd4bf", "#fff"]}
          particleCount={200}
          particleSpread={5}
          speed={0.05}
          alphaParticles={true}
          particleBaseSize={60}
          sizeRandomness={0.4}
          cameraDistance={16}
          className="w-full h-full"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Book Your Consultation
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Schedule a call to discuss your project and get started with your AI-powered solution
          </p>
        </motion.div>

        {/* Calendar Widget */}
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Meeting Details - Left Panel */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/40x40/4f46e5/ffffff?text=TO"
                  alt="Thomas Olson"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">Thomas Olson</h3>
                  <p className="text-sm text-gray-400">InooKey Team</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">MVP 30 Min Meeting</h4>
                  <p className="text-sm text-gray-400">inookey.com</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>30m</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Video className="w-4 h-4" />
                  <span>Google Meet</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Globe className="w-4 h-4" />
                  <span>Europe/London</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Calendar Grid - Middle Panel */}
            <div className="space-y-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="font-semibold">{formatMonth(currentMonth)}</h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Selected Date */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{formatSelectedDate(selectedDate)}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setTimeFormat('12h')}
                    className={`px-2 py-1 text-xs rounded ${
                      timeFormat === '12h' ? 'bg-white text-black' : 'text-gray-400'
                    }`}
                  >
                    12h
                  </button>
                  <button
                    onClick={() => setTimeFormat('24h')}
                    className={`px-2 py-1 text-xs rounded ${
                      timeFormat === '24h' ? 'bg-white text-black' : 'text-gray-400'
                    }`}
                  >
                    24h
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs text-gray-400 py-2">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day || 0)}
                    className={`p-2 text-sm rounded-lg transition-colors ${
                      day === selectedDate.getDate() && 
                      currentMonth.getMonth() === selectedDate.getMonth()
                        ? 'bg-white text-black'
                        : day
                        ? 'hover:bg-white/10 text-white'
                        : 'text-gray-600'
                    }`}
                    disabled={!day}
                  >
                    {day || ''}
                  </button>
                ))}
              </div>

              {/* Next Month Preview */}
              <div className="text-xs text-gray-400 mt-4">
                <div className="grid grid-cols-7 gap-1">
                  {['3', '4', '5', '6', '7', '8', '9'].map((day, index) => (
                    <div key={index} className="text-center py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="text-center mt-1">AUG</div>
              </div>
            </div>

            {/* Time Slots - Right Panel */}
            <div className="space-y-4">
              <h4 className="font-semibold">Available Times</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    className="w-full py-3 px-4 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">
            Can't find a suitable time? Contact us directly at hello@inookey.com
          </p>
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Book Your Session
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CalendarSection; 