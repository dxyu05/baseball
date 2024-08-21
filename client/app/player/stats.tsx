import { playerStats } from './playerStats';

type Props = {
  playerStats: playerStats;
}

const Stats = ({ playerStats }: Props) => {
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