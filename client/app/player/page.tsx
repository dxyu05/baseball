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
  const link = `https://baseball-529l.onrender.com/player-stats/?firstName=${name[0]}&lastName=${name[1]}`;
  
  try {
    console.log(link)
    let response = await fetch(link); 
    let playerStats = await response.json();
    
    if (response.status !== 200) {
      throw new Error(playerStats.error || 'Failed to fetch player stats');
    }
    //console.log(playerStats);
    // Checking if there's an error in the response
    
    console.log(typeof(playerStats));
  

    return (
      <div className="w-full h-screen flex flex-col gap-3 items-center">
        <h1>{playerStats.name} Career Stats</h1>
        <Stats
          playerStats={{
            gamesPlayed: playerStats.gamesPlayed,
            groundOuts: playerStats.groundOuts,
            airOuts: playerStats.airOuts,
            runs: playerStats.runs,
            doubles: playerStats.doubles,
            triples: playerStats.triples,
            homeRuns: playerStats.homeRuns,
            strikeOuts: playerStats.strikeOuts,
            baseOnBalls: playerStats.baseOnBalls,
            intentionalWalks: playerStats.intentionalWalks,
            hits: playerStats.hits,
            hitByPitch: playerStats.hitByPitch,
            avg: playerStats.avg,
            atBats: playerStats.atBats,
            obp: playerStats.obp,
            slg: playerStats.slg,
            ops: playerStats.ops,
            caughtStealing: playerStats.caughtStealing,
            stolenBases: playerStats.stolenBases,
            stolenBasePercentage: playerStats.stolenBasePercentage,
            groundIntoDoublePlay: playerStats.groundIntoDoublePlay,
            numberOfPitches: playerStats.numberOfPitches,
            plateAppearances: playerStats.plateAppearances,
            totalBases: playerStats.totalBases,
            rbi: playerStats.rbi,
            leftOnBase: playerStats.leftOnBase,
            sacBunts: playerStats.sacBunts,
            sacFlies: playerStats.sacFlies,
            babip: playerStats.babip,
            groundOutsToAirouts: playerStats.groundOutsToAirouts,
            catchersInterference: playerStats.catchersInterference,
            atBatsPerHomeRun: playerStats.atBatsPerHomeRun,
          }}
        />
      </div>
    );
  } catch (error) {
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'An unknown error occurred';
    }

    console.error('Database Error:', errorMessage);
    return <div>Failed to load data: {errorMessage}</div>;
  }
}

