import Search from '@/app/ui/search';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center">
      <h1>Enter desired player first name and last name separated by space, press enter to search :0</h1>
      <div className="w-1/2 flex justify-center">
        <Suspense>
          <Search placeholder="Search players..." />
        </Suspense>
      </div>
      <div className="flex justify-center" style={{ marginTop: '-120px' }}>
        <img src="https://i.pinimg.com/originals/9b/ef/62/9bef627fa3b84f59fcfdf5a5376c2b3c.png" alt="Image" />
      </div>
      <div className="absolute bottom-10 text-sm">
        <p>This site is under construction :)</p>
      </div>
      {/* <Table query = {query}/> */}
    </div>
  );
}