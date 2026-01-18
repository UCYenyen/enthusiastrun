import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Enthusiast Foam Run",
  description: "Privacy Policy regarding data collection, Google Authentication usage, and user rights for Enthusiast Foam Run.",
};

export default function PrivacyPolicyPage() {
  return (
    // Gunakan background putih bersih dan text gelap agar kontras tinggi (Google friendly)
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      
      {/* Container utama dengan lebar maksimum yang nyaman dibaca (max-w-3xl) */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Logo - Tetap ada tapi ukurannya wajar & responsif */}
          <div className="relative w-48 h-24 mb-6">
            <Image
              src="/home/enthusiast-text-logo.webp"
              alt="Enthusiast Logo"
              fill
              className="object-contain"
              priority // Load prioritas agar tidak layout shift
            />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last Updated: January 2026
          </p>
        </div>

        {/* Content Section - Hapus scrollbar internal, biarkan halaman scroll natural */}
        <article className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800">
          
          <p className="lead">
            At <strong>enthusiastrun.com</strong> ("Enthusiast Foam Run"), we value your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or register for our events using Google Authentication.
          </p>

          <hr className="my-8 border-gray-200" />

          <h3>1. Information We Collect</h3>
          <p>We collect information to facilitate your registration for the "Foam Run" event:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Information:</strong> Name, phone number, and t-shirt size (collected during ticket checkout).</li>
            <li><strong>Google User Data:</strong> When you choose to "Log in with Google," we collect your <strong>Google Email Address</strong>, <strong>Full Name</strong>, and <strong>Profile Picture</strong> via the Google OAuth API.</li>
            <li><strong>Usage Data:</strong> Basic logs of how you access our site (IP address, browser type) for security purposes.</li>
          </ul>

          <h3>2. How We Use Your Data</h3>
          <p>We use the data collected solely for the purpose of organizing the Enthusiast:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To create your user account and verify your identity.</li>
            <li>To send you tickets, event updates, and emergency notifications.</li>
            <li>To issue refunds or resolve support tickets.</li>
          </ul>

          <h3>3. Google User Data Policy</h3>
          {/* Highlight box untuk compliance Google */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded-r">
            <p className="text-sm font-medium text-blue-900 mb-2">
              <strong>Explicit Disclosure:</strong>
            </p>
            <p className="text-sm text-blue-800 mb-2">
              We do not share, sell, or transfer your Google User Data to any third-party advertising networks or data brokers.
            </p>
            <p className="text-sm text-blue-800">
              Enthusiast use and transfer to any other app of information received from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="underline font-semibold">Google API Services User Data Policy</a>, including the Limited Use requirements.
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

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Enthusiast. All rights reserved.</p>
        </div>
        
      </div>
    </main>
  );
}