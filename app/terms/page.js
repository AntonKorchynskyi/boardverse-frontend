import React from 'react';

const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen px-6 py-10">
            <div className="container mx-auto max-w-4xl">
                {/* Page Title */}
                <h1 className="text-4xl font-semibold mb-6 text-pink-500">Terms of Service</h1>

                {/* Introduction */}
                <p className="mb-4">
                    Welcome to <strong>BoardVerse</strong>! Please read these terms carefully before using our platform.
                    By accessing or using the site, you agree to comply with these terms and conditions.
                </p>

                {/* Section 1: User Responsibilities */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-pink-500">1. User Responsibilities</h2>
                    <p>
                        Users are expected to provide accurate information during registration and to respect
                        other players on the platform. Any misuse or inappropriate behaviour may result in a
                        suspension or ban.
                    </p>
                </div>

                {/* Section 2: Intellectual Property */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-pink-500">2. Intellectual Property</h2>
                    <p>
                        All content, including designs, logos, and trademarks, are the property of BoardVerse.
                        Unauthorized use or distribution of content is strictly prohibited.
                    </p>
                </div>

                {/* Section 3: Prohibited Activities */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-pink-500">3. Prohibited Activities</h2>
                    <ul className="list-disc pl-6">
                        <li>Cheating or hacking to gain unfair advantages in games.</li>
                        <li>Harassment or abuse of other users.</li>
                        <li>Uploading malicious content or attempting to breach site security.</li>
                    </ul>
                </div>

                {/* Section 4: Limitation of Liability */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-pink-500">4. Limitation of Liability</h2>
                    <p>
                        BoardVerse is not responsible for any damages arising from the use of the platform. 
                        Users assume all risks associated with their participation in games and activities.
                    </p>
                </div>

                {/* Section 5: Changes to Terms */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-pink-500">5. Changes to Terms</h2>
                    <p>
                        BoardVerse reserves the right to modify these terms at any time. Users will be notified
                        of significant changes, and continued use of the platform signifies agreement to the updated terms.
                    </p>
                </div>

                {/* Footer */}
                <p className="text-sm mt-8 text-gray-400">
                    Last updated: 2025-01-12.
                </p>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
