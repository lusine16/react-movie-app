export function formatMoney(value: string | null): string {
  if (!value) {
    return 'Нет данных'
  }

  const amount = Number(value)

  return `${amount.toLocaleString('ru-RU')} руб.`
}