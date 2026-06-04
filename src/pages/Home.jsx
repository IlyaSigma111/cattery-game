import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../store/gameContext'

export default function Home() {
  const [name, setName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [createRoom, setCreateRoom] = useState(true)
  const navigate = useNavigate()
  const { dispatch } = useGame()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return

    dispatch({ type: 'SET_PLAYER', name: name.trim() })

    if (createRoom) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      dispatch({ type: 'SET_ROOM', roomId: code })
      navigate(`/lobby?room=${code}&player=${encodeURIComponent(name.trim())}`)
    } else {
      if (!roomCode.trim()) return
      dispatch({ type: 'SET_ROOM', roomId: roomCode.trim().toUpperCase() })
      navigate(`/lobby?room=${roomCode.trim().toUpperCase()}&player=${encodeURIComponent(name.trim())}`)
    }
  }

  return (
    <div className="home">
      <div className="home__card">
        <div className="home__logo">🐱</div>
        <h1 className="home__title">Кошачий питомник</h1>
        <p className="home__subtitle">Кооперативная игра для 4 игроков</p>

        <form onSubmit={handleSubmit} className="home__form">
          <div className="form-group">
            <label className="form-label">Ваше имя</label>
            <input
              className="form-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Введите имя..."
              maxLength={20}
              required
            />
          </div>

          <div className="home__tabs">
            <button
              type="button"
              className={`tab ${createRoom ? 'tab--active' : ''}`}
              onClick={() => setCreateRoom(true)}
            >
              Создать комнату
            </button>
            <button
              type="button"
              className={`tab ${!createRoom ? 'tab--active' : ''}`}
              onClick={() => setCreateRoom(false)}
            >
              Присоединиться
            </button>
          </div>

          {!createRoom && (
            <div className="form-group">
              <label className="form-label">Код комнаты</label>
              <input
                className="form-input"
                value={roomCode}
                onChange={e => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Введите код..."
                maxLength={6}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn--primary btn--full" disabled={!name.trim()}>
            {createRoom ? 'Создать игру' : 'Войти в комнату'}
          </button>
        </form>

        <div className="home__roles-preview">
          <p className="home__roles-title">Роли в игре:</p>
          <div className="home__roles">
            <div className="role-badge" style={{ '--role-color': '#2563eb', '--role-bg': '#dbeafe' }}>
              👔 Директор
            </div>
            <div className="role-badge" style={{ '--role-color': '#16a34a', '--role-bg': '#dcfce7' }}>
              💉 Ветеринар
            </div>
            <div className="role-badge" style={{ '--role-color': '#d97706', '--role-bg': '#fef3c7' }}>
              🧹 Зоотехник
            </div>
            <div className="role-badge" style={{ '--role-color': '#dc2626', '--role-bg': '#fee2e2' }}>
              📸 Маркетолог
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
