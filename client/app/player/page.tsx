import Stats from './stats';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const name = query.split(' ');
  const link = `http://localhost:8080/player-stats/?firstName=${encodeURIComponent(name[0])}&lastName=${encodeURIComponent(name[1])}`;

  async function getStats() {
    const res = await fetch(link);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  let playerStats = null;
  let error = null;

  try {
    playerStats = await getStats();
  } catch (error) {
    console.error('Database Error:', error);
  }

  return (
    <div>
      <h1>Player Stats</h1>
      {error ? (
        <div>Failed to load data: {error}</div>
      ) : (
        <Stats playerStats={playerStats}/>
      )}
    </div>
  );
}

