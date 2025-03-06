import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-[#1e103e] py-10 px-6">
      <div className="container mx-auto max-w-5xl">
        
        <h1 className="text-3xl font-bold text-pink-500 mb-6">Privacy Policy</h1>
        
        <p className="text-gray-300 mb-4">
          At <strong>BoardVerse</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform. By using BoardVerse, you agree to the practices described in this policy.
        </p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-6 mb-4">1. Information We Collect</h2>
        
        <p className="text-gray-300 mb-2">We collect the following types of information:</p>
        
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>
            <strong>Personal Information:</strong> Information such as your name, email address, and username, which you provide during account registration.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with our platform, such as gameplay statistics, preferences, and session activity.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-500 mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-300 mb-4">
          The information we collect is used to provide and improve the platform. Specifically, we use your data to:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Enable user account creation and management.</li>
          <li>Facilitate gameplay, leaderboards, and community features.</li>
          <li>Analyze platform performance and usage patterns.</li>
          <li>Send notifications about updates, features, or support.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-500 mt-6 mb-4">3. Sharing Your Information</h2>
        <p className="text-gray-300 mb-4">
          Your information is not sold or shared with third parties.
        </p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-6 mb-4">4. Data Security</h2>
        <p className="text-gray-300 mb-4">
          We take data security seriously and implement appropriate technical and organizational measures to protect your information. However, no system is entirely secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-6 mb-4">5. Your Rights</h2>
        <p className="text-gray-300 mb-4">
          As a user, you have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Access, update, or delete your personal information.</li>
          <li>Withdraw consent for data processing at any time.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-500 mt-6 mb-4">6. Changes to This Policy</h2>
        <p className="text-gray-300 mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-6 mb-4">7. Contact Us</h2>
        <p className="text-gray-300">
          If you have any questions about this Privacy Policy or how we handle your data, please contact us at: 
          <a href="mailto:support@boardverse.com" className="text-pink-500 hover:underline"> support@boardverse.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
