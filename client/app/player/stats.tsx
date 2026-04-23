import { playerStats } from './playerStats';

type Props = {
  playerStats: playerStats;
}

const statGroups: { title: string; accent: string; stats: { key: keyof playerStats; label: string }[] }[] = [
  {
    title: 'Batting Basics',
    accent: 'border-blue-500',
    stats: [
      { key: 'gamesPlayed', label: 'Games Played' },
      { key: 'atBats', label: 'At Bats' },
      { key: 'plateAppearances', label: 'Plate Appearances' },
      { key: 'hits', label: 'Hits' },
      { key: 'avg', label: 'Batting Average' },
      { key: 'runs', label: 'Runs' },
      { key: 'rbi', label: 'RBI' },
    ],
  },
  {
    title: 'Extra Base Hits',
    accent: 'border-red-500',
    stats: [
      { key: 'doubles', label: 'Doubles' },
      { key: 'triples', label: 'Triples' },
      { key: 'homeRuns', label: 'Home Runs' },
      { key: 'totalBases', label: 'Total Bases' },
      { key: 'atBatsPerHomeRun', label: 'AB per HR' },
    ],
  },
  {
    title: 'Advanced Metrics',
    accent: 'border-purple-500',
    stats: [
      { key: 'obp', label: 'On-Base %' },
      { key: 'slg', label: 'Slugging %' },
      { key: 'ops', label: 'OPS' },
      { key: 'babip', label: 'BABIP' },
      { key: 'groundOutsToAirouts', label: 'GO/AO Ratio' },
    ],
  },
  {
    title: 'Plate Discipline',
    accent: 'border-green-500',
    stats: [
      { key: 'baseOnBalls', label: 'Walks' },
      { key: 'strikeOuts', label: 'Strikeouts' },
      { key: 'intentionalWalks', label: 'Int. Walks' },
      { key: 'hitByPitch', label: 'Hit By Pitch' },
      { key: 'numberOfPitches', label: 'Pitches Seen' },
    ],
  },
  {
    title: 'Baserunning',
    accent: 'border-yellow-400',
    stats: [
      { key: 'stolenBases', label: 'Stolen Bases' },
      { key: 'caughtStealing', label: 'Caught Stealing' },
      { key: 'stolenBasePercentage', label: 'SB Success %' },
    ],
  },
  {
    title: 'Miscellaneous',
    accent: 'border-gray-500',
    stats: [
      { key: 'groundOuts', label: 'Ground Outs' },
      { key: 'airOuts', label: 'Air Outs' },
      { key: 'groundIntoDoublePlay', label: 'GIDP' },
      { key: 'leftOnBase', label: 'Left On Base' },
      { key: 'sacBunts', label: 'Sac Bunts' },
      { key: 'sacFlies', label: 'Sac Flies' },
      { key: 'catchersInterference', label: "Catcher's Int." },
    ],
  },
];

const Stats = ({ playerStats }: Props) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {statGroups.map((group) => (
        <div
          key={group.title}
          className={`bg-[#1a2535] rounded-xl border-t-4 ${group.accent} p-5 shadow-lg`}
        >
          <h2 className="text-white font-semibold text-base mb-4 tracking-wide">{group.title}</h2>
          <div className="space-y-0">
            {group.stats.map(({ key, label }) => (
              <div
                key={key}
                className="flex justify-between items-center py-2 border-b border-[#243349] last:border-0"
              >
                <span className="text-gray-400 text-sm">{label}</span>
                <span className="text-white font-medium tabular-nums">
                  {playerStats[key] ?? '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
