import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon } from '../../../components/icons';

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
    <section className="py-20 bg-atlas-black">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Get in Touch</h2>
          <div className="w-24 h-1 bg-atlas-orange mx-auto mb-12"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="bg-atlas-gray/50 border border-gray-800 p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange transition-shadow" />
              <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange transition-shadow" />
              <input type="tel" placeholder="Your Phone" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full p-3 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange transition-shadow" />
              <textarea placeholder="Your Message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required className="w-full p-3 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange transition-shadow"></textarea>
              <button type="submit" className="w-full bg-atlas-orange text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 transform hover:scale-105">
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-atlas-gray/50 border border-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-atlas-orange">Contact Details</h3>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-300">
                    <EnvelopeIcon className="h-5 w-5 mr-3 text-atlas-orange" />
                    <a href="mailto:contact@atlasclasses.com" className="hover:text-atlas-orange transition-colors">contact@atlasclasses.com</a>
                  </p>
                  <p className="flex items-center text-gray-300">
                    <PhoneIcon className="h-5 w-5 mr-3 text-atlas-orange" />
                    <a href="tel:+1234567890" className="hover:text-atlas-orange transition-colors">+123-456-7890</a>
                  </p>
                  <p className="flex items-center text-gray-300">
                    <GlobeAltIcon className="h-5 w-5 mr-3 text-atlas-orange" />
                    <a href="#" className="hover:text-atlas-orange transition-colors">www.atlasclasses.com</a>
                  </p>
                </div>
            </div>
             <div className="bg-atlas-gray/50 border border-gray-800 rounded-xl h-64 flex items-center justify-center text-gray-500 overflow-hidden relative">
                <img src="https://raw.githubusercontent.com/animated-mesh-gradients/animated-mesh-gradients/main/packages/images/dist/poster-3d-model-a.png" alt="Abstract map background" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <p className="relative z-10 font-semibold">GLOBAL HEADQUARTERS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;