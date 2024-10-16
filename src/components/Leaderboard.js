import React, { useMemo } from 'react';

const Leaderboard = ({ leaderboardData }) => {
  
  const filteredLeaderboard = useMemo(() => {
    if (!leaderboardData) {
      return [];  
    }
    return leaderboardData.filter(item => item.score > 100);
  }, [leaderboardData]);

  return (
    <div>
      <h2>Таблица лидеров</h2>
      <ul>
        {filteredLeaderboard.map((item, index) => (
          <li key={index}>{item.name}: {item.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
