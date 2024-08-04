// components/stats.tsx

interface StatsProps {
  playerStats: any; // Define a specific type for your player stats if possible
  link: string;
}

const Stats = ({ playerStats, link }: StatsProps) => {
  return (
    <div>
      <h2>Player Stats</h2>
      <h3>{link}</h3>
      <pre>{JSON.stringify(playerStats, null, 2)}</pre> {/* Display player stats */}
    </div>
  );
};

export default Stats;