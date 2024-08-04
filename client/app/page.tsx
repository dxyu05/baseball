import Search from '@/app/ui/search';
import { Suspense } from 'react';
 
export default function Page() {

  console.log("HELLO!");
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <h1>Enter desired player first name and last name separated by space, press enter to search :0</h1>
      <div className="w-1/2">
        <Suspense>
          <Search placeholder="Search players..." />
        </Suspense>
      </div>
      <div className = "absolute bottom-10 text-sm">
        <p>This site is under construction :)</p>
      </div>
      {/* <Table query = {query}/> */}
    </div>
  );
}