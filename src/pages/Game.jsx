import { useSearchParams, useNavigate } from 'react-router-dom'
import { useGame } from '../store/gameContext'
import { ROLES } from '../data/roles'
import StatsBar from '../components/StatsBar'
import Cattery from '../components/Cattery'
import RolePanel from '../components/RolePanel'
import GameLog from '../components/GameLog'
import PlayerList from '../components/PlayerList'

export default function Game() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { state } = useGame()

  const playerName = searchParams.get('player')
  const playerIndex = state.players.findIndex(p => p.name === playerName)
  const player = state.players[playerIndex]

  if (!player || !player.role) {
    navigate('/')
    return null
  }

  const roleInfo = ROLES[player.role]

  return (
    <div className="game">
      <StatsBar />
      <div className="game__layout">
        <div className="game__sidebar">
          <div className="game__role-info" style={{ borderColor: roleInfo.color, backgroundColor: roleInfo.bgColor }}>
            <span className="game__role-emoji">{roleInfo.emoji}</span>
            <div>
              <div className="game__role-name" style={{ color: roleInfo.color }}>{roleInfo.name}</div>
              <div className="game__role-player">{playerName}</div>
            </div>
          </div>
          <PlayerList players={state.players} />
          <GameLog log={state.log} />
        </div>
        <div className="game__main">
          <RolePanel role={player.role} playerIndex={playerIndex} />
          <Cattery />
        </div>
      </div>
    </div>
  )
}
