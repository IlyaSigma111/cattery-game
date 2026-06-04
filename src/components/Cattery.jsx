import { useGame } from '../store/gameContext'

export default function Cattery() {
  const { state } = useGame()
  const cats = state.cats.filter(c => !c.sold)

  return (
    <div className="cattery">
      <h3 className="cattery__title">🐱 Обитатели питомника</h3>
      <div className="cattery__grid">
        {cats.map(cat => (
          <div key={cat.id} className={`cat-card ${cat.isNew ? 'cat-card--new' : ''}`}>
            <div className="cat-card__header">
              <span className="cat-card__emoji">{cat.breedEmoji}</span>
              <span className="cat-card__name">{cat.name}</span>
            </div>
            <div className="cat-card__breed">{cat.breed}</div>
            <div className="cat-card__stats">
              <div className="cat-card__stat">
                <span className="stat-label">Здоровье</span>
                <div className="stat-bar">
                  <div className={`stat-bar__fill stat-bar__fill--${cat.health > 60 ? 'good' : cat.health > 30 ? 'warn' : 'bad'}`} style={{ width: `${cat.health}%` }} />
                </div>
                <span className="stat-value">{cat.health}</span>
              </div>
              <div className="cat-card__stat">
                <span className="stat-label">Сытость</span>
                <div className="stat-bar">
                  <div className={`stat-bar__fill stat-bar__fill--${cat.hunger > 60 ? 'good' : cat.hunger > 30 ? 'warn' : 'bad'}`} style={{ width: `${cat.hunger}%` }} />
                </div>
                <span className="stat-value">{cat.hunger}</span>
              </div>
              <div className="cat-card__stat">
                <span className="stat-label">Счастье</span>
                <div className="stat-bar">
                  <div className={`stat-bar__fill stat-bar__fill--${cat.happiness > 60 ? 'good' : 'warn'}`} style={{ width: `${cat.happiness}%` }} />
                </div>
                <span className="stat-value">{cat.happiness}</span>
              </div>
            </div>
            <div className="cat-card__age">Возраст: {cat.age} {cat.age === 1 ? 'год' : cat.age < 5 ? 'года' : 'лет'}</div>
            <div className="cat-card__price">{cat.basePrice.toLocaleString()}₽</div>
          </div>
        ))}
      </div>
    </div>
  )
}
