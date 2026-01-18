import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Enthusiast Foam Run",
  description: "Privacy Policy regarding data collection, Google Authentication usage, and user rights for Enthusiast Foam Run.",
};

export default function PrivacyPolicyPage() {
  return (
    // Outer Container: Background abu-abu lembut, konten di tengah (Flex Center)
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Card Container: 
          - Batas lebar (max-w-3xl)
          - Tinggi fixed (h-[85vh]) agar scroll terjadi DI DALAM kartu
          - Shadow & Rounded corners untuk estetika modern simple 
      */}
      <div className="bg-white w-full mt-24 max-w-3xl h-[85vh] rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-100">
        
        {/* Sticky Header di dalam Kartu (Opsional, agar Judul selalu terlihat) */}
        <div className="bg-white px-6 py-5 border-b border-gray-100 flex-shrink-0 text-center z-10">
          <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-black">
            Privacy Policy
          </h1>
          <p className="text-black text-xs mt-1">
            Enthusiast Foam Run • Last Updated: January 2026
          </p>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          
          <article className="prose text-black prose-sm md:prose-base prose-gray max-w-none 
            prose-headings:font-bold prose-headings:text-black 
            prose-p:text-black prose-li:text-black
            prose-a:text-blue-600 hover:prose-a:text-blue-800 transition-colors">
            
            <p className="lead">
              At <strong>enthusiastrun.com</strong> ("Enthusiast Foam Run"), we value your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or register for our events using Google Authentication.
            </p>

            <hr className="my-6 border-gray-100" />

            <h3>1. Information We Collect</h3>
            <p>We collect information to facilitate your registration for the "Foam Run" event:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Personal Information:</strong> Name, phone number, and t-shirt size (collected during ticket checkout).</li>
              <li><strong>Google User Data:</strong> When you choose to "Log in with Google," we collect your <strong>Google Email Address</strong>, <strong>Full Name</strong>, and <strong>Profile Picture</strong> via the Google OAuth API.</li>
              <li><strong>Usage Data:</strong> Basic logs of how you access our site (IP address, browser type) for security purposes.</li>
            </ul>

            <h3>2. How We Use Your Data</h3>
            <p>We use the data collected solely for the purpose of organizing the Enthusiast:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To create your user account and verify your identity.</li>
              <li>To send you tickets, event updates, and emergency notifications.</li>
              <li>To issue refunds or resolve support tickets.</li>
            </ul>

            {/* Google Disclosure Box - PENTING untuk Verifikasi */}
            <h3>3. Google User Data Policy</h3>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 my-6">
              <p className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide text-xs">
                Explicit Disclosure
              </p>
              <p className="text-sm text-blue-800 mb-3 leading-relaxed">
                We do not share, sell, or transfer your Google User Data to any third-party advertising networks or data brokers.
              </p>
              <p className="text-sm text-blue-800 leading-relaxed">
                Enthusiast use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="underline font-semibold hover:text-blue-900">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </p>
            </div>

            <h3>4. Data Storage and Security</h3>
            <p>
              Your data is stored securely on our servers. We implement industry-standard encryption (HTTPS/TLS) to protect your personal information during transmission. We retain your data only as long as necessary to fulfill the event requirements or as required by law.
            </p>

            <h3>5. Third-Party Services</h3>
            <p>
              We may use third-party payment processors (e.g., Midtrans) to handle transactions. Your payment details are processed directly by them and are not stored on our servers.
            </p>

            <h3>6. Your Rights & Data Deletion</h3>
            <p>
              You have the right to request access to or deletion of your personal data. If you wish to delete your account and remove your Google data from our records, please email us at <a href="mailto:support@enthusiastrun.com">support@enthusiastrun.com</a>. We will process deletion requests within 30 days.
            </p>

            <h3>7. Contact Us</h3>
            <p>
              For any privacy-related inquiries, please contact:<br/>
              <strong>Email:</strong> <a href="mailto:support@enthusiastrun.com">support@enthusiastrun.com</a>
            </p>
          </article>

          {/* Footer inside scroll area */}
          <div className="mt-12 pt-6 border-t border-gray-100 text-center text-xs text-black">
            <p>&copy; {new Date().getFullYear()} Enthusiast Foam Run. All rights reserved.</p>
          </div>
        </div>
        
      </div>
    </main>
  );
}