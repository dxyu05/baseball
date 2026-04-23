import Search from '@/app/ui/search';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f1923] flex flex-col items-center justify-center px-4 relative">
      {/* Logo & title */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl select-none">⚾</span>
          <h1 className="text-6xl font-bold tracking-tight text-white">
            stat<span className="text-[#e63946]">.y</span>
          </h1>
        </div>
        <p className="text-gray-400 text-lg">Career MLB statistics at your fingertips</p>
      </div>

      {/* Search bar */}
      <div className="w-full max-w-xl">
        <Suspense>
          <Search placeholder="Search for a player (e.g. Mike Trout)" />
        </Suspense>
        <p className="text-center text-gray-500 text-sm mt-3">
          Enter first and last name, then press <kbd className="bg-[#1a2535] border border-[#2d3f55] rounded px-1.5 py-0.5 text-gray-300 text-xs">Enter</kbd>
        </p>
      </div>

      {/* Footer */}
      <p className="absolute bottom-8 text-gray-600 text-sm">
        MLB Stats Tracker
      </p>
    </main>
  );
}
