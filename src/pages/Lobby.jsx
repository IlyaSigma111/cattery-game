import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useGame } from '../store/gameContext'
import { ROLES } from '../data/roles'
import PlayerList from '../components/PlayerList'

export default function Lobby() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  const [selectedRole, setSelectedRole] = useState(null)

  const roomCode = searchParams.get('room')
  const playerName = searchParams.get('player')

  useEffect(() => {
    if (!roomCode || !playerName) {
      navigate('/')
      return
    }
    if (state.players.length === 0) {
      dispatch({ type: 'JOIN_ROOM', name: playerName })
    }
  }, [])

  function handleJoin() {
    if (!selectedRole) return
    const playerIndex = state.players.findIndex(p => p.name === playerName)
    if (playerIndex === -1) return
    dispatch({ type: 'SET_ROLE', playerIndex, role: selectedRole })

    const updatedPlayers = state.players.map((p, i) =>
      i === playerIndex ? { ...p, role: selectedRole } : p
    )
    const allReady = updatedPlayers.every(p => p.role !== null)
    if (allReady && updatedPlayers.length >= 2) {
      dispatch({ type: 'START_GAME' })
      navigate(`/game?room=${roomCode}&player=${encodeURIComponent(playerName)}`)
    }
  }

  const takenRoles = new Set(state.players.map(p => p.role).filter(Boolean))
  const availableRoles = Object.keys(ROLES).filter(r => !takenRoles.has(r))

  return (
    <div className="lobby">
      <div className="lobby__card">
        <div className="lobby__header">
          <h1>Комната: {roomCode}</h1>
          <p className="lobby__share">Поделитесь кодом с друзьями</p>
        </div>

        <PlayerList players={state.players} />

        <div className="lobby__role-select">
          <h3>Выберите роль:</h3>
          <div className="lobby__roles">
            {availableRoles.map(roleKey => {
              const role = ROLES[roleKey]
              return (
                <button
                  key={roleKey}
                  className={`role-select-card ${selectedRole === roleKey ? 'role-select-card--selected' : ''}`}
                  style={{ '--role-color': role.color, '--role-bg': role.bgColor }}
                  onClick={() => setSelectedRole(roleKey)}
                >
                  <span className="role-select-card__emoji">{role.emoji}</span>
                  <span className="role-select-card__name">{role.name}</span>
                  <span className="role-select-card__desc">{role.description}</span>
                </button>
              )
            })}
          </div>
          <button
            className="btn btn--primary btn--full"
            disabled={!selectedRole}
            onClick={handleJoin}
          >
            Готов!
          </button>
        </div>
      </div>
    </div>
  )
}
