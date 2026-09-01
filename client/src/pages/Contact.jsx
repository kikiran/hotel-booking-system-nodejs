import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageSquare, FiUser, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20 lg:pt-24 bg-secondary-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-10 lg:py-16">
        <div className="section-container text-center">
          <h1 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have a question or need assistance? Our team is here to help you 24/7.
          </p>
        </div>
      </div>

      <div className="section-container py-8 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6 text-center">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiMapPin className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-secondary-900 mb-1">Visit Us</h3>
              <p className="text-secondary-500 text-sm">123 Luxury Avenue,<br />New York, NY 10001</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6 text-center">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiPhone className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-secondary-900 mb-1">Call Us</h3>
              <p className="text-secondary-500 text-sm">+1 (555) 123-4567<br />Mon - Fri, 9am - 6pm</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6 text-center">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiMail className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-secondary-900 mb-1">Email Us</h3>
              <p className="text-secondary-500 text-sm">support@luxstay.com<br />We reply within 24 hours</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 p-6 lg:p-8">
              <h2 className="text-2xl font-display font-bold text-secondary-900 mb-2">Send Us a Message</h2>
              <p className="text-secondary-500 mb-6">Fill out the form and we'll get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">Your Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="input-field resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                    <FiSend className="w-4 h-4" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <div className="flex items-center gap-2 text-xs text-secondary-400">
                    <FiClock className="w-4 h-4" />
                    Average response time: 2 hours
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiMessageSquare className="w-8 h-8 text-white" />
                </div>
                <div className="text-center lg:text-left flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">Need instant help?</h3>
                  <p className="text-white/80 text-sm">Chat with our support team anytime. Live assistance is available 24/7.</p>
                </div>
                <button className="bg-white text-primary-700 hover:bg-primary-50 font-medium px-6 py-3 rounded-lg transition-colors flex-shrink-0">
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
