import Search from '@/app/ui/search';
import { Suspense } from 'react';
 
export default async function Page() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>This site is under construction :)</h1>
      <div className="mt-5 w-1/2">
        <Search placeholder="Search players..." />
      </div>
    </div>
  );
}