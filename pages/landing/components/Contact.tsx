import React, { useState } from 'react';

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
          <h2 className="text-4xl font-extrabold mb-4">Get in Touch</h2>
          <div className="w-24 h-1 bg-atlas-orange mx-auto mb-12"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange" />
              <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange" />
              <input type="tel" placeholder="Your Phone" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full p-3 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange" />
              <textarea placeholder="Your Message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required className="w-full p-3 bg-atlas-gray border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange"></textarea>
              <button type="submit" className="w-full bg-atlas-orange text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-atlas-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-atlas-orange">Contact Details</h3>
                <p className="text-gray-300">Email: <a href="mailto:info@atlasclasses.com" className="hover:text-atlas-orange">info@atlasclasses.com</a></p>
                <p className="text-gray-300">Phone: <a href="tel:+91XXXXXXXXXX" className="hover:text-atlas-orange">+91-XXXXXXXXXX</a></p>
            </div>
             <div className="bg-atlas-gray rounded-lg h-64 flex items-center justify-center text-gray-500">
                [ Embedded Google Map Placeholder ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;