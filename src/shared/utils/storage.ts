export function SET_STORAGE_ITEM(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function GET_STORAGE_ITEM(key: string) {
  return JSON.parse(localStorage.getItem(key)!);
}

export function REMOVE_STORAGE_ITEM(key: string) {
  return localStorage.removeItem(key);
}
