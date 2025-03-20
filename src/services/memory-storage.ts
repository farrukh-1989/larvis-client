/**
 * This implementation acts as a backup
 * in case session storage is denied by browser
 */
export class MemStorage implements Storage {
  private valueMap: Map<string, string> = new Map();

  get length(): number {
    return this.valueMap.size;
  }

  clear(): void {
    this.valueMap.clear();
  }

  getItem(key: string): string | null {
    const value = this.valueMap.get(key);
    return value || null;
  }

  key(index: number): string | null {
    let i = 0;
    for (const keyValue of Array.from(this.valueMap)) {
      if (i++ == index) {
        return keyValue[0];
      }
    }
    return null;
  }

  removeItem(key: string): void {
    this.valueMap.delete(key);
  }

  setItem(key: string, value: string): void {
    this.valueMap.set(key, value);
  }
}
