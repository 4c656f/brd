export function getRandomItems<T>(array: T[], n: number): T[] {
    if (n > array.length) {
        throw new Error("n cannot be greater than the length of the array");
    }
    const indices = new Set<number>();
    const result: T[] = [];
    
    while (indices.size < n) {
        const randomIndex = Math.floor(Math.random() * array.length);
        if (!indices.has(randomIndex)) {
            indices.add(randomIndex);
            result.push(array[randomIndex]);
        }
    }

    return result;
}
