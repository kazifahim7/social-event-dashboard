const Privacy = () => {
     return (
          <div className="bg-gray-50 min-h-screen py-12 px-4">
               <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">

                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                         Privacy Policy
                    </h1>

                    <p className="text-gray-600 mb-6">
                         Last updated: March 2026
                    </p>

                    {/* Introduction */}
                    <section className="mb-8">
                         <h2 className="text-xl font-semibold mb-3 text-gray-800">
                              1. Introduction
                         </h2>
                         <p className="text-gray-600 leading-relaxed">
                              We respect your privacy and are committed to protecting your
                              personal information. This Privacy Policy explains how we collect,
                              use, and safeguard your information when you use our website or
                              mobile application.
                         </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="mb-8">
                         <h2 className="text-xl font-semibold mb-3 text-gray-800">
                              2. Information We Collect
                         </h2>
                         <ul className="list-disc pl-6 text-gray-600 space-y-2">
                              <li>Name and email address</li>
                              <li>Profile information and uploaded images</li>
                              <li>Device information and IP address</li>
                              <li>Usage data and analytics</li>
                         </ul>
                    </section>

                    {/* How We Use Information */}
                    <section className="mb-8">
                         <h2 className="text-xl font-semibold mb-3 text-gray-800">
                              3. How We Use Your Information
                         </h2>
                         <ul className="list-disc pl-6 text-gray-600 space-y-2">
                              <li>To provide and maintain our services</li>
                              <li>To improve user experience</li>
                              <li>To communicate important updates</li>
                              <li>To ensure security and prevent fraud</li>
                         </ul>
                    </section>

                    {/* Data Security */}
                    <section className="mb-8">
                         <h2 className="text-xl font-semibold mb-3 text-gray-800">
                              4. Data Security
                         </h2>
                         <p className="text-gray-600 leading-relaxed">
                              We implement appropriate technical and organizational measures to
                              protect your personal data from unauthorized access, alteration,
                              disclosure, or destruction.
                         </p>
                    </section>

                    {/* Third Party Services */}
                    <section className="mb-8">
                         <h2 className="text-xl font-semibold mb-3 text-gray-800">
                              5. Third-Party Services
                         </h2>
                         <p className="text-gray-600 leading-relaxed">
                              We may use third-party services such as analytics providers and
                              payment gateways. These services may collect information in
                              accordance with their own privacy policies.
                         </p>
                    </section>

                    {/* User Rights */}
                    <section className="mb-8">
                         <h2 className="text-xl font-semibold mb-3 text-gray-800">
                              6. Your Rights
                         </h2>
                         <p className="text-gray-600 leading-relaxed">
                              You have the right to access, update, or delete your personal
                              information. If you wish to exercise these rights, please contact
                              us.
                         </p>
                    </section>

                    {/* Contact */}
                    <section>
                         <h2 className="text-xl font-semibold mb-3 text-gray-800">
                              7. Contact Us
                         </h2>
                         <p className="text-gray-600 leading-relaxed">
                              If you have any questions about this Privacy Policy, please contact
                              us at: ioli1997@hotmail.com
                         </p>
                    </section>
               </div>
          </div>
     );
};

export default Privacy;