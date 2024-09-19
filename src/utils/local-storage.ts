const setLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}
const clearLocalStorage = () => {
  localStorage.clear()
}

const getLocalStorage = <T>(key: string): T => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export { setLocalStorage, clearLocalStorage, getLocalStorage }
