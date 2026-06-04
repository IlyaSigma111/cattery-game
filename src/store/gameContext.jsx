import { createContext, useContext, useReducer, useCallback } from 'react'
import { CAT_NAMES, CAT_BREEDS, EVENTS } from '../data/roles'

const GameContext = createContext(null)

const initialCats = Array.from({ length: 6 }, (_, i) => createCat(i))

function createCat(index) {
  const breed = CAT_BREEDS[index % CAT_BREEDS.length]
  const min = breed.priceRange[0]
  const max = breed.priceRange[1]
  const basePrice = Math.floor(min + Math.random() * (max - min))
  return {
    id: index + 1,
    name: CAT_NAMES[index % CAT_NAMES.length],
    breed: breed.name,
    breedEmoji: breed.emoji,
    age: Math.floor(Math.random() * 3) + 1,
    health: 70 + Math.floor(Math.random() * 30),
    hunger: 60 + Math.floor(Math.random() * 40),
    happiness: 50 + Math.floor(Math.random() * 50),
    basePrice,
    sold: false,
    adoptedBy: null,
    isNew: false,
  }
}

const initialState = {
  roomId: null,
  playerName: '',
  playerRole: null,
  players: [],
  gameStarted: false,
  day: 1,
  money: 50000,
  food: 100,
  cleanliness: 80,
  reputation: 50,
  cats: initialCats,
  log: ['Добро пожаловать в питомник! Начните управление.'],
  phase: 'morning',
  pendingRoles: new Set(['director', 'veterinarian', 'zootechnician', 'marketer']),
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_ROOM': {
      return { ...state, roomId: action.roomId }
    }
    case 'SET_PLAYER': {
      return { ...state, playerName: action.name }
    }
    case 'JOIN_ROOM': {
      if (state.players.length >= 4) return state
      const player = { name: action.name, role: null }
      return { ...state, players: [...state.players, player] }
    }
    case 'SET_ROLE': {
      const newPending = new Set(state.pendingRoles)
      newPending.delete(action.role)
      const newPlayers = state.players.map((p, i) =>
        i === action.playerIndex ? { ...p, role: action.role } : p
      )
      return { ...state, players: newPlayers, pendingRoles: newPending }
    }
    case 'START_GAME': {
      return { ...state, gameStarted: true }
    }
    case 'SPEND_MONEY': {
      if (state.money < action.amount) return state
      return { ...state, money: state.money - action.amount, log: [`-${action.amount}₽: ${action.reason}`, ...state.log] }
    }
    case 'ADD_MONEY': {
      return { ...state, money: state.money + action.amount, log: [`+${action.amount}₽: ${action.reason}`, ...state.log] }
    }
    case 'USE_FOOD': {
      const newFood = Math.max(0, state.food - action.amount)
      return { ...state, food: newFood }
    }
    case 'ADD_FOOD': {
      return { ...state, food: state.food + action.amount, log: [`Куплен корм +${action.amount}`, ...state.log] }
    }
    case 'FEED_CATS': {
      const foodNeeded = Math.min(action.amount, state.food)
      return {
        ...state,
        food: state.food - foodNeeded,
        cats: state.cats.map(c => ({
          ...c,
          hunger: Math.min(100, c.hunger + Math.floor(foodNeeded / state.cats.filter(c => !c.sold).length * 10)),
        })),
        log: [`Корм раздан (-${foodNeeded})`, ...state.log],
      }
    }
    case 'SET_CLEANLINESS': {
      return { ...state, cleanliness: Math.min(100, Math.max(0, state.cleanliness + action.delta)), log: [`Чистота ${action.delta > 0 ? '+' : ''}${action.delta}`, ...state.log] }
    }
    case 'HEAL_CAT': {
      return {
        ...state,
        cats: state.cats.map(c =>
          c.id === action.catId ? { ...c, health: Math.min(100, c.health + 30) } : c
        ),
        log: [`Кот #${action.catId} пролечен`, ...state.log],
      }
    }
    case 'ADD_CAT': {
      const newCat = createCat(state.cats.length)
      newCat.isNew = true
      return { ...state, cats: [...state.cats, newCat], log: [`Новый кот: ${newCat.name}`, ...state.log] }
    }
    case 'SELL_CAT': {
      return {
        ...state,
        cats: state.cats.map(c =>
          c.id === action.catId ? { ...c, sold: true, adoptedBy: action.buyer } : c
        ),
        money: state.money + action.price,
        log: [`${action.buyer} приобрёл кота #${action.catId} за ${action.price}₽`, ...state.log],
      }
    }
    case 'SET_REPUTATION': {
      return { ...state, reputation: Math.min(100, Math.max(0, state.reputation + action.delta)), log: [`Репутация ${action.delta > 0 ? '+' : ''}${action.delta}`, ...state.log] }
    }
    case 'NEXT_DAY': {
      const event = EVENTS[Math.floor(Math.random() * EVENTS.length)]
      const newCats = state.cats.map(c => {
        if (c.sold) return c
        const healthDecay = Math.floor(Math.random() * 10) + 5
        const hungerDecay = Math.floor(Math.random() * 15) + 10
        const happinessDecay = Math.floor(Math.random() * 8) + 2
        return {
          ...c,
          health: Math.max(0, c.health - healthDecay),
          hunger: Math.max(0, c.hunger - hungerDecay),
          happiness: Math.max(0, c.happiness - happinessDecay),
        }
      })
      const newState = {
        ...state,
        day: state.day + 1,
        cats: newCats,
        cleanliness: Math.max(0, state.cleanliness - 15),
        food: Math.max(0, state.food - state.cats.filter(c => !c.sold).length * 5),
        log: [`День ${state.day + 1} начался`, ...state.log],
      }
      if (event.effect.money) {
        newState.money += event.effect.money
      }
      if (event.effect.food) {
        newState.food += event.effect.food
      }
      if (event.effect.reputation) {
        newState.reputation = Math.min(100, Math.max(0, newState.reputation + event.effect.reputation))
      }
      if (event.effect.cleanliness) {
        newState.cleanliness = Math.min(100, Math.max(0, newState.cleanliness + event.effect.cleanliness))
      }
      newState.log = [event.text, ...newState.log]
      return newState
    }
    case 'ADD_LOG': {
      return { ...state, log: [action.text, ...state.log] }
    }
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const addLog = useCallback((text) => {
    dispatch({ type: 'ADD_LOG', text })
  }, [])

  return (
    <GameContext.Provider value={{ state, dispatch, addLog }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
