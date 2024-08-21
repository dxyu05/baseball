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
  let stats: string[] = [];

  try {
    playerStats = await getStats();
    playerStats = playerStats.trim();
    //console.log(playerStats);
    stats = playerStats.split('\n');

    console.log('testing array');
    for(let i = 0; i < stats.length; i++) {
      console.log('element ' + i + ' ' + stats[i]);
    }
  } catch (error) {
    console.error('Database Error:', error);
  }
  

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center">
      <h1>{stats[0]} Career Stats</h1>
      {error ? (
        <div>Failed to load data: {error}</div>
      ) : (

        <Stats
          playerStats={{
            gamesPlayed: parseInt(stats[3]?.split(': ')[1]) || 0,
            groundOuts: parseInt(stats[4]?.split(': ')[1]) || 0,
            airOuts: parseInt(stats[5]?.split(': ')[1]) || 0,
            runs: parseInt(stats[6]?.split(': ')[1]) || 0,
            doubles: parseInt(stats[7]?.split(': ')[1]) || 0,
            triples: parseInt(stats[8]?.split(': ')[1]) || 0,
            homeRuns: parseInt(stats[9]?.split(': ')[1]) || 0,
            strikeOuts: parseInt(stats[10]?.split(': ')[1]) || 0,
            baseOnBalls: parseInt(stats[11]?.split(': ')[1]) || 0,
            intentionalWalks: parseInt(stats[12]?.split(': ')[1]) || 0,
            hits: parseInt(stats[13]?.split(': ')[1]) || 0,
            hitByPitch: parseInt(stats[14]?.split(': ')[1]) || 0,
            avg: parseFloat(stats[15]?.split(': ')[1]) || 0,
            atBats: parseInt(stats[16]?.split(': ')[1]) || 0,
            obp: parseFloat(stats[17]?.split(': ')[1]) || 0,
            slg: parseFloat(stats[18]?.split(': ')[1]) || 0,
            ops: parseFloat(stats[19]?.split(': ')[1]) || 0,
            caughtStealing: parseInt(stats[20]?.split(': ')[1]) || 0,
            stolenBases: parseInt(stats[21]?.split(': ')[1]) || 0,
            stolenBasePercentage: parseFloat(stats[22]?.split(': ')[1]) || 0,
            groundIntoDoublePlay: parseInt(stats[23]?.split(': ')[1]) || 0,
            numberOfPitches: parseInt(stats[24]?.split(': ')[1]) || 0,
            plateAppearances: parseInt(stats[25]?.split(': ')[1]) || 0,
            totalBases: parseInt(stats[26]?.split(': ')[1]) || 0,
            rbi: parseInt(stats[27]?.split(': ')[1]) || 0,
            leftOnBase: parseInt(stats[28]?.split(': ')[1]) || 0,
            sacBunts: parseInt(stats[29]?.split(': ')[1]) || 0,
            sacFlies: parseInt(stats[30]?.split(': ')[1]) || 0,
            babip: parseFloat(stats[31]?.split(': ')[1]) || 0,
            groundOutsToAirouts: parseFloat(stats[32]?.split(': ')[1]) || 0,
            catchersInterference: parseInt(stats[33]?.split(': ')[1]) || 0,
            atBatsPerHomeRun: parseFloat(stats[34]?.split(': ')[1]) || 0,
          }}
        />
      )}
    </div>
  );
}

