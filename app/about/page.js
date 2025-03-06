import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-[#1e103e] text-gray-300 font-sans min-h-screen flex flex-col items-center px-4">
            {/* Page Container */}
            <div className="max-w-6xl w-full text-center mt-12">
                
                <h1 className="text-4xl font-bold text-pink-500 mb-8">About BoardVerse</h1>

                <p className="text-lg leading-relaxed mb-6">
                    Welcome to <strong>BoardVerse</strong>, the ultimate hub for digital board game enthusiasts! Our mission is to bring the joy of traditional board gaming into the online space, blending modern interactivity with classic gameplay.
                </p>
                <hr className="border-gray-700 my-6" />
                
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">Our Mission</h2>
                    <p className="text-base leading-relaxed">
                        At BoardVerse, we strive to create a platform that delivers engaging, user-friendly experiences for players of all skill levels. Whether you're a casual player or a seasoned strategist, our goal is to make gaming accessible and fun.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">Key Features</h2>
                    <ul className="list-disc list-inside space-y-2 text-left mx-auto max-w-3xl">
                        <li>Interactive real-time gameplay to connect with friends and players worldwide.</li>
                        <li>Leaderboards, achievements, and a profile system to track your progress.</li>
                        <li>Intuitive, Steam-like interface for easy navigation and accessibility.</li>
                        <li>Synthwave-inspired design to reduce eye strain and create an immersive atmosphere.</li>
                    </ul>
                </div>
                
                <div className="mt-12">
                    <p className="text-sm text-gray-400">
                        Thank you for exploring BoardVerse! We hope you enjoy the journey into the world of online board games.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
