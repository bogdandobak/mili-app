/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const localStorageService = {
  setItem (type: string, value: any) {
    localStorage.setItem(type, JSON.stringify(value))
  },
  getItem (type: string) {
    return JSON.parse(localStorage.getItem(type)!)
  },
  clear () {
    localStorage.clear()
  }
}
