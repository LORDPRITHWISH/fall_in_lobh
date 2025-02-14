"use client";

import { motion } from "framer-motion";
import { Code, MapPin, Mail, Phone, Printer } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-blue-300 to-purple-400 p-6 md:p-8">
      <div className="max-w-5xl mx-auto pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-blue/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-blue-400/40 backdrop-blur-md p-8 md:p-12 flex flex-col justify-between">
              <div className="space-y-8">
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-blue">
                  Contact Us
                </motion.h2>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
                  <div className="flex items-center gap-4 text-blue">
                    <MapPin className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <p>32, Avenue ve Newyork</p>
                      <p>321994 Newyork</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-blue">
                    <Mail className="w-6 h-6 flex-shrink-0" />
                    <a href="mailto:support@zenux.live">support@zenux.live</a>
                  </div>

                  <div className="flex items-center gap-4 text-blue">
                    <Phone className="w-6 h-6 flex-shrink-0" />
                    <p>+91 98303 55637</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="p-8 md:p-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
                  <p className="text-gray-600">Feel free to drop us a line below!</p>
                </div>

                <form className="space-y-6" action="https://api.web3forms.com/submit" method="POST">
                  <input type="hidden" name="access_key" value="47601f6b-9224-446e-af9d-9bd037c0b998" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full bg-blue-100 border-2 border-blue-200 rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-fuchsia-400"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full bg-blue-100 border-2 border-blue-200 rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-fuchsia-400"
                    required
                  />

                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Typing your message here..."
                    className="w-full bg-blue-100 border-2 border-blue-200 rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-fuchsia-400"
                    required
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-40 bg-fuchsia-500 hover:bg-fuchsia-600 text-blue text-lg font-semibold rounded-full px-8 py-4 transition-colors shadow-lg"
                  >
                    SEND
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
