'use client';

import React from 'react'
import dynamic from 'next/dynamic';

const SixNimmtClient = dynamic(() => import('./SixNimmtClient'), { ssr: false });


const GamePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className=''></div>
      <SixNimmtClient />
    </div>
  );
}

export default GamePage;