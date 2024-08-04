// components/stats.tsx

interface StatsProps {
  playerStats: any; // Define a specific type for your player stats if possible
}

const Stats = ({ playerStats}: StatsProps) => {
  return (
    <div>
      <pre>{JSON.stringify(playerStats, null, 2)}</pre> {/* Display player stats */}
    </div>
  );
};

export default Stats;