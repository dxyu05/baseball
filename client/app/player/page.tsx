import Stats from './stats';
import Link from 'next/link';

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
  const link = `http://localhost:10000/player-stats/?firstName=${name[0]}&lastName=${name[1]}`;

  try {
    const response = await fetch(link);
    const playerStats = await response.json();

    if (response.status !== 200) {
      throw new Error(playerStats.error || 'Failed to fetch player stats');
    }

    return (
      <main className="min-h-screen bg-[#0f1923] px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </Link>

          {/* Player header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#1a2535]">
            <span className="text-4xl select-none">⚾</span>
            <div>
              <h1 className="text-3xl font-bold text-white">{playerStats.name}</h1>
              <p className="text-gray-400 text-sm mt-1">Career Statistics</p>
            </div>
          </div>

          {/* Stats grid */}
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
      </main>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    return (
      <main className="min-h-screen bg-[#0f1923] flex flex-col items-center justify-center px-4">
        <div className="bg-[#1a2535] border border-red-500/30 rounded-xl p-10 max-w-md w-full text-center">
          <span className="text-5xl mb-5 block select-none">⚾</span>
          <h2 className="text-white text-xl font-semibold mb-2">Player Not Found</h2>
          <p className="text-gray-400 text-sm mb-8">{errorMessage}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#e63946] text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Try Another Search
          </Link>
        </div>
      </main>
    );
  }
}
