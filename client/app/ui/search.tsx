'use client';
import { useEffect, useState} from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
    useEffect(()=> {
        fetch("http://localhost:8080/api/home").then(
          response => response.json()
        ).then(
          data=> {
            console.log(data);
          }
        );
      }, []);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
}
