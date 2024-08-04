'use client' // Ensure this is a client-side component

import useSWR from 'swr';

export default function Stats(){

    const fetcher = (...args) => fetch(...args).then(res => res.json());

    const name = query.split(' ');
    console.log(query);
    const link = `http://localhost:8080/player-stats/?firstName=${encodeURIComponent(name[0])}&lastName=${encodeURIComponent(name[1])}`;
    console.log(link);
    const { data, error } = useSWR(link, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
        <h1>Player Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display player data */}
        </div>
    );

}