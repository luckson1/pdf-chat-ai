import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen p-4 w-full">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-semibold text-center mb-6">Privacy Policy</h1>

        {/* Section 1: Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>
           Study Pal may collect the following types of information:
            <ul className="list-disc ml-6">
              <li>Personal Information (e.g., name, email address)</li>
              <li>Usage Data (e.g., app usage, interactions)</li>
              <li>Device Information (e.g., device type, operating system)</li>
            </ul>
          </p>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>
            We may use the collected information for the following purposes:
            <ul className="list-disc ml-6">
              <li>Provide and maintain our app</li>
              <li>Personalize your user experience</li>
              <li>Improve our app and services</li>
              <li>Communicate with you, including notifications and updates</li>
            </ul>
          </p>
        </section>

        {/* Section 3: Data Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
          <p>
            We may share your information with third parties in the following circumstances:
            <ul className="list-disc ml-6">
              <li>With your consent</li>
              <li>For legal or regulatory purposes</li>
              <li>With service providers and partners who assist us</li>
            </ul>
          </p>
        </section>

        {/* Section 4: Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>
            We take reasonable measures to protect your information, but no method of transmission or storage is entirely secure. We cannot guarantee the security of your data.
          </p>
        </section>

        {/* Section 5: Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p>
            You have the right to:
            <ul className="list-disc ml-6">
              <li>Access, correct, or delete your personal information</li>
              <li>Object to or restrict the processing of your data</li>
              <li>Withdraw your consent</li>
            </ul>
          </p>
        </section>

        {/* Section 6: Contact Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy, please contact us at [Your Contact Email].
          </p>
        </section>
        
      </div>
    </div>
  );
}

export default PrivacyPolicy;
