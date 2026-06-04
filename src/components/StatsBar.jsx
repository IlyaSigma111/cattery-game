import { useGame } from '../store/gameContext'

export default function StatsBar() {
  const { state } = useGame()

  return (
    <div className="stats-bar">
      <div className="stats-bar__item">
        <span className="stats-bar__icon">📅</span>
        <span className="stats-bar__label">День</span>
        <span className="stats-bar__value">{state.day}</span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__icon">💰</span>
        <span className="stats-bar__label">Деньги</span>
        <span className={`stats-bar__value ${state.money < 10000 ? 'stats-bar__value--danger' : ''}`}>
          {state.money.toLocaleString()}₽
        </span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__icon">🍖</span>
        <span className="stats-bar__label">Корм</span>
        <span className={`stats-bar__value ${state.food < 30 ? 'stats-bar__value--danger' : ''}`}>
          {state.food}
        </span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__icon">🧹</span>
        <span className="stats-bar__label">Чистота</span>
        <span className={`stats-bar__value ${state.cleanliness < 40 ? 'stats-bar__value--danger' : ''}`}>
          {state.cleanliness}%
        </span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__icon">⭐</span>
        <span className="stats-bar__label">Репутация</span>
        <span className={`stats-bar__value ${state.reputation < 30 ? 'stats-bar__value--danger' : ''}`}>
          {state.reputation}%
        </span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__icon">🐱</span>
        <span className="stats-bar__label">Котов</span>
        <span className="stats-bar__value">{state.cats.filter(c => !c.sold).length}</span>
      </div>
    </div>
  )
}
