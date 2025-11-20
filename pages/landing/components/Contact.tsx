import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon, MapPinIcon } from '../../../components/icons';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <section className="py-24 bg-atlas-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">Get in Touch</h2>
          <div className="w-24 h-1.5 bg-atlas-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div className="bg-atlas-soft/50 backdrop-blur-sm border border-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Name</label>
                <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-4 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-atlas-primary focus:border-transparent transition-all text-white placeholder-gray-600 shadow-inner" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-atlas-primary focus:border-transparent transition-all text-white placeholder-gray-600 shadow-inner" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Phone</label>
                <input type="tel" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full p-4 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-atlas-primary focus:border-transparent transition-all text-white placeholder-gray-600 shadow-inner" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Message</label>
                <textarea placeholder="How can we help you?" rows={5} value={message} onChange={e => setMessage(e.target.value)} required className="w-full p-4 bg-atlas-dark border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-atlas-primary focus:border-transparent transition-all text-white placeholder-gray-600 shadow-inner"></textarea>
              </div>
              <button type="submit" className="w-full bg-atlas-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-emerald-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] ripple uppercase tracking-wider">
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-8">
            <div className="bg-atlas-soft border border-gray-800 p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-atlas-primary border-b border-gray-800 pb-4">Contact Details</h3>
                <div className="space-y-6">
                  <p className="flex items-center text-gray-300 group">
                    <div className="bg-gray-800 p-3 rounded-full mr-4 group-hover:bg-atlas-primary/20 transition-colors">
                        <EnvelopeIcon className="h-6 w-6 text-atlas-primary" />
                    </div>
                    <a href="mailto:contact@atlasclasses.com" className="hover:text-atlas-primary transition-colors text-lg">contact@atlasclasses.com</a>
                  </p>
                  <p className="flex items-center text-gray-300 group">
                    <div className="bg-gray-800 p-3 rounded-full mr-4 group-hover:bg-atlas-primary/20 transition-colors">
                        <PhoneIcon className="h-6 w-6 text-atlas-primary" />
                    </div>
                    <a href="tel:+1234567890" className="hover:text-atlas-primary transition-colors text-lg">+123-456-7890</a>
                  </p>
                  <p className="flex items-center text-gray-300 group">
                    <div className="bg-gray-800 p-3 rounded-full mr-4 group-hover:bg-atlas-primary/20 transition-colors">
                        <GlobeAltIcon className="h-6 w-6 text-atlas-primary" />
                    </div>
                    <a href="https://www.atlasclasses.com" target="_blank" rel="noopener noreferrer" className="hover:text-atlas-primary transition-colors text-lg">www.atlasclasses.com</a>
                  </p>
                  <p className="flex items-start text-gray-300 group">
                    <div className="bg-gray-800 p-3 rounded-full mr-4 mt-1 group-hover:bg-atlas-primary/20 transition-colors">
                        <MapPinIcon className="h-6 w-6 text-atlas-primary" />
                    </div>
                    <span className="text-lg pt-1">Bellari, Karnataka, India</span>
                  </p>
                </div>
            </div>
             <div className="bg-gray-800 border border-gray-700 rounded-2xl h-80 overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61525.9926415754!2d76.8824194519998!3d15.14815211915995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb714256865de11%3A0x46533a3ac1332a31!2sBallari%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1716386623696!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Atlas Classes Location in Bellari, Karnataka"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;