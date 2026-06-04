export default function PlayerList({ players }) {
  return (
    <div className="player-list">
      <h3 className="player-list__title">👥 Команда</h3>
      {players.length === 0 ? (
        <p className="player-list__empty">Ожидаем игроков...</p>
      ) : (
        <div className="player-list__grid">
          {players.map((player, i) => (
            <div key={i} className={`player-card ${player.role ? 'player-card--ready' : ''}`}>
              <div className="player-card__avatar">
                {player.avatar || '👤'}
              </div>
              <div className="player-card__info">
                <div className="player-card__name">{player.name}</div>
                {player.role ? (
                  <div className="player-card__role">{player.role}</div>
                ) : (
                  <div className="player-card__status">выбирает роль...</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
