export default function GameLog({ log }) {
  return (
    <div className="game-log">
      <h3 className="game-log__title">📋 Лог</h3>
      <div className="game-log__list">
        {log.slice(0, 20).map((entry, i) => (
          <div key={i} className={`game-log__entry ${i === 0 ? 'game-log__entry--latest' : ''}`}>
            {entry}
          </div>
        ))}
      </div>
    </div>
  )
}
