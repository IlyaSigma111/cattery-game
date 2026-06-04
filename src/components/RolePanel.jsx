import { useGame } from '../store/gameContext'

const ROLE_PANELS = {
  director: DirectorPanel,
  veterinarian: VeterinarianPanel,
  zootechnician: ZootechnicianPanel,
  marketer: MarketerPanel,
}

export default function RolePanel({ role, playerIndex }) {
  const Panel = ROLE_PANELS[role]
  if (!Panel) return <div className="role-panel-empty">Роль не найдена</div>
  return <Panel playerIndex={playerIndex} />
}

function DirectorPanel({ playerIndex }) {
  const { state, dispatch } = useGame()

  return (
    <div className="role-panel">
      <div className="role-panel__header">
        <span className="role-panel__icon">👔</span>
        <div>
          <h2>Директор</h2>
          <p className="role-panel__desc">Стратегическое управление</p>
        </div>
      </div>
      <div className="role-panel__actions">
        <button className="btn btn--action" onClick={() => dispatch({ type: 'ADD_CAT' })}>
          Купить кота 🐱
        </button>
        <button
          className="btn btn--action"
          onClick={() => {
            if (state.money >= 3000) {
              dispatch({ type: 'SPEND_MONEY', amount: 3000, reason: 'Закупка корма' })
              dispatch({ type: 'ADD_FOOD', amount: 50 })
            }
          }}
        >
          Закупить корм 🥩
        </button>
        <button className="btn btn--action" onClick={() => dispatch({ type: 'NEXT_DAY' })}>
          Завершить день ⏭️
        </button>
      </div>
      <div className="role-panel__hint">
        Вы видите полную отчётность питомника. Распределяйте бюджет и следите за работой команды.
      </div>
    </div>
  )
}

function VeterinarianPanel({ playerIndex }) {
  const { state, dispatch } = useGame()
  const sickCats = state.cats.filter(c => !c.sold && c.health < 60)

  return (
    <div className="role-panel">
      <div className="role-panel__header">
        <span className="role-panel__icon">💉</span>
        <div>
          <h2>Ветеринар</h2>
          <p className="role-panel__desc">Здоровье котов</p>
        </div>
      </div>
      {sickCats.length === 0 ? (
        <p className="role-panel__info">Все коты здоровы ✅</p>
      ) : (
        <div className="role-panel__cat-list">
          {sickCats.map(cat => (
            <div key={cat.id} className="role-panel__cat-item">
              <span>{cat.breedEmoji} {cat.name}</span>
              <span className={`health-badge health-badge--low`}>
                {cat.health} ❤️
              </span>
              <button className="btn btn--small" onClick={() => {
                dispatch({ type: 'SPEND_MONEY', amount: 2000, reason: `Лечение кота ${cat.name}` })
                dispatch({ type: 'HEAL_CAT', catId: cat.id })
              }}>
                Лечить 💊
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="role-panel__hint">
        Следите за здоровьем котов. Если здоровье ниже 60 — требуется лечение.
      </div>
    </div>
  )
}

function ZootechnicianPanel({ playerIndex }) {
  const { state, dispatch } = useGame()
  const hungryCats = state.cats.filter(c => !c.sold && c.hunger < 40)
  const totalCats = state.cats.filter(c => !c.sold).length

  return (
    <div className="role-panel">
      <div className="role-panel__header">
        <span className="role-panel__icon">🧹</span>
        <div>
          <h2>Зоотехник</h2>
          <p className="role-panel__desc">Кормление и уборка</p>
        </div>
      </div>
      <div className="role-panel__actions">
        <button
          className="btn btn--action"
          disabled={state.food < 10}
          onClick={() => dispatch({ type: 'FEED_CATS', amount: Math.min(state.food, totalCats * 10) })}
        >
          Накормить котов 🍗
        </button>
        <button
          className="btn btn--action"
          onClick={() => dispatch({ type: 'SET_CLEANLINESS', delta: 20 })}
        >
          Убрать вольеры 🧽
        </button>
      </div>
      {hungryCats.length > 0 && (
        <p className="role-panel__warn">⚠️ {hungryCats.length} кот(ов) голодны!</p>
      )}
      {state.cleanliness < 40 && (
        <p className="role-panel__warn">⚠️ Питомник грязный! Чистота: {state.cleanliness}%</p>
      )}
      <div className="role-panel__hint">
        Корма осталось: {state.food} ед. Нужно следить за чистотой и сытостью.
      </div>
    </div>
  )
}

function MarketerPanel({ playerIndex }) {
  const { state, dispatch } = useGame()
  const availableCats = state.cats.filter(c => !c.sold && c.health > 70)

  return (
    <div className="role-panel">
      <div className="role-panel__header">
        <span className="role-panel__icon">📸</span>
        <div>
          <h2>Маркетолог</h2>
          <p className="role-panel__desc">Продажи и пиар</p>
        </div>
      </div>
      <div className="role-panel__actions">
        <button
          className="btn btn--action"
          onClick={() => {
            dispatch({ type: 'SET_REPUTATION', delta: 10 })
            dispatch({ type: 'SPEND_MONEY', amount: 2000, reason: 'Рекламная кампания' })
          }}
        >
          Реклама 📢
        </button>
      </div>
      {availableCats.length > 0 && (
        <div className="role-panel__cat-list">
          <p className="role-panel__info">Здоровые котята на продажу:</p>
          {availableCats.map(cat => (
            <div key={cat.id} className="role-panel__cat-item">
              <span>{cat.breedEmoji} {cat.name} ({cat.breed})</span>
              <span className="price">{cat.basePrice}₽</span>
              <button className="btn btn--small" onClick={() => {
                dispatch({ type: 'SELL_CAT', catId: cat.id, price: cat.basePrice, buyer: 'Покупатель' })
              }}>
                Продать 💰
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="role-panel__hint">
        Репутация: {state.reputation}%. Чем выше репутация, тем дороже можно продавать котят.
      </div>
    </div>
  )
}
