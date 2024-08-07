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
    <div className="w-full h-screen flex flex-col gap-3 items-center">
      <h1>{`${name[0]} ${name[1]}`} Stats</h1>
      {error ? (
        <div>Failed to load data: {error}</div>
      ) : (

        <Stats
          playerStats={{
            gamesPlayed: playerStats?.gamesPlayed || 0,
            groundOuts: playerStats?.groundOuts || 0,
            airOuts: playerStats?.airOuts || 0,
            runs: playerStats?.runs || 0,
            doubles: playerStats?.doubles || 0,
            triples: playerStats?.triples || 0,
            homeRuns: playerStats?.homeRuns || 0,
            strikeOuts: playerStats?.strikeOuts || 0,
            baseOnBalls: playerStats?.baseOnBalls || 0,
            intentionalWalks: playerStats?.intentionalWalks || 0,
            hits: playerStats?.hits || 0,
            hitByPitch: playerStats?.hitByPitch || 0,
            avg: playerStats?.avg || 0,
            atBats: playerStats?.atBats || 0,
            obp: playerStats?.obp || 0,
            slg: playerStats?.slg || 0,
            ops: playerStats?.ops || 0,
            caughtStealing: playerStats?.caughtStealing || 0,
            stolenBases: playerStats?.stolenBases || 0,
            stolenBasePercentage: playerStats?.stolenBasePercentage || 0,
            groundIntoDoublePlay: playerStats?.groundIntoDoublePlay || 0,
            numberOfPitches: playerStats?.numberOfPitches || 0,
            plateAppearances: playerStats?.plateAppearances || 0,
            totalBases: playerStats?.totalBases || 0,
            rbi: playerStats?.rbi || 0,
            leftOnBase: playerStats?.leftOnBase || 0,
            sacBunts: playerStats?.sacBunts || 0,
            sacFlies: playerStats?.sacFlies || 0,
            babip: playerStats?.babip || 0,
            groundOutsToAirouts: playerStats?.groundOutsToAirouts || 0,
            catchersInterference: playerStats?.catchersInterference || 0,
            atBatsPerHomeRun: playerStats?.atBatsPerHomeRun || 0,
            // Add the remaining properties here
          }}
          gamesPlayed={0}
          groundOuts={0}
          airOuts={0}
          runs={0}
          doubles={0}
          triples={0}
          homeRuns={0}
          strikeOuts={0}
          baseOnBalls={0}
          intentionalWalks={0}
          hits={0}
          hitByPitch={0}
          avg={0}
          atBats={0}
          obp={0}
          slg={0}
          ops={0}
          caughtStealing={0}
          stolenBases={0}
          stolenBasePercentage={0}
          groundIntoDoublePlay={0}
          numberOfPitches={0}
          plateAppearances={0}
          totalBases={0}
          rbi={0}
          leftOnBase={0}
          sacBunts={0}
          sacFlies={0}
          babip={0}
          groundOutsToAirouts={0}
          catchersInterference={0}
          atBatsPerHomeRun={0}
        />
      )}
    </div>
  );
}

