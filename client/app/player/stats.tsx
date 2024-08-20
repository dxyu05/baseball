// components/stats.tsx

interface StatsProps {
  playerStats: any;
  gamesPlayed: number;
  groundOuts: number;
  airOuts: number;
  runs: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  strikeOuts: number;
  baseOnBalls: number;
  intentionalWalks: number;
  hits: number;
  hitByPitch: number;
  avg: number;
  atBats: number;
  obp: number;
  slg: number;
  ops: number;
  caughtStealing: number;
  stolenBases: number;
  stolenBasePercentage: number;
  groundIntoDoublePlay: number;
  numberOfPitches: number;
  plateAppearances: number;
  totalBases: number;
  rbi: number;
  leftOnBase: number;
  sacBunts: number;
  sacFlies: number;
  babip: number;
  groundOutsToAirouts: number;
  catchersInterference: number;
  atBatsPerHomeRun: number; // Define a specific type for your player stats if possible
}

const Stats = ({ playerStats }: StatsProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(playerStats).map(([stat, value]: [string, any]) => (
            <tr key={stat}>
              <td>{stat}</td>
              <td style={{ paddingLeft: '30px' }}>{value}</td> {/* Add style to increase left padding */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;