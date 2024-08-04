 import Stats from './stats';

 export default function Player({
    searchParams,
    }: {
    searchParams?: {
        query?: string;
        page?: string;
    };
    }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    console.log("HELLO" + query);
    return (
        <div>
        <h1>Player Data</h1>
        </div>
    );
}