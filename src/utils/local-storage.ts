

const setLocalStorage = (key: string,value: unknown) => { 

  localStorage.setItem(key, JSON.stringify(value))
}
const clearLocalStorage = () => {
  localStorage.clear()
}

const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export { setLocalStorage, clearLocalStorage, getLocalStorage }