export const ROLES = {
  director: {
    id: 'director',
    name: 'Директор',
    emoji: '👔',
    description: 'Управляет бюджетом, нанимает персонал, принимает стратегические решения',
    color: '#2563eb',
    bgColor: '#dbeafe',
    actions: ['hire', 'fire', 'setBudget', 'viewReports'],
  },
  veterinarian: {
    id: 'veterinarian',
    name: 'Ветеринар',
    emoji: '💉',
    description: 'Лечит больных котов, делает прививки, следит за здоровьем',
    color: '#16a34a',
    bgColor: '#dcfce7',
    actions: ['heal', 'vaccinate', 'diagnose'],
  },
  zootechnician: {
    id: 'zootechnician',
    name: 'Зоотехник',
    emoji: '🧹',
    description: 'Кормит котов, убирает вольеры, следит за чистотой',
    color: '#d97706',
    bgColor: '#fef3c7',
    actions: ['feed', 'clean', 'groom'],
  },
  marketer: {
    id: 'marketer',
    name: 'Маркетолог',
    emoji: '📸',
    description: 'Продаёт котят, ведёт соцсети, повышает репутацию питомника',
    color: '#dc2626',
    bgColor: '#fee2e2',
    actions: ['sell', 'post', 'advertise'],
  },
}

export const CAT_BREEDS = [
  { name: 'Мейн-кун', priceRange: [30000, 80000], emoji: '🦁' },
  { name: 'Британская', priceRange: [15000, 40000], emoji: '🐱' },
  { name: 'Сиамская', priceRange: [10000, 30000], emoji: '😺' },
  { name: 'Сфинкс', priceRange: [25000, 60000], emoji: '😼' },
  { name: 'Персидская', priceRange: [15000, 35000], emoji: '🐈' },
  { name: 'Бенгальская', priceRange: [40000, 100000], emoji: '🐆' },
  { name: 'Шотландская', priceRange: [12000, 35000], emoji: '🦝' },
  { name: 'Абиссинская', priceRange: [20000, 50000], emoji: '🐈‍⬛' },
]

export const CAT_NAMES = [
  'Барсик', 'Мурзик', 'Васька', 'Пушок', 'Снежок',
  'Маркиз', 'Тиша', 'Кузя', 'Персик', 'Граф',
  'Симба', 'Лео', 'Тайсон', 'Боня', 'Цезарь',
  'Моника', 'Жужа', 'Алиса', 'Мася', 'Клеопатра',
]

export const EVENTS = [
  { text: 'К нам приехал известный блогер! Репутация +15', effect: { reputation: 15 } },
  { text: 'Прорвало трубу в вольере. Чистота -20', effect: { cleanliness: -20 } },
  { text: 'Благотворительная акция привлекла внимание. Деньги +5000', effect: { money: 5000 } },
  { text: 'Корм подорожал у поставщика. Деньги -3000', effect: { money: -3000 } },
  { text: 'Ветеринарная проверка выявила нарушения. Репутация -10', effect: { reputation: -10 } },
  { text: 'Местный завод подарил корм. Корм +30', effect: { food: 30 } },
  { text: 'Сбежал котёнок, пришлось искать. Деньги -2000', effect: { money: -2000 } },
  { text: 'Статья в газете о нашем питомнике! Репутация +20', effect: { reputation: 20 } },
]
