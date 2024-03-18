export function getAutoIncrId(ids: number[]) {
    const maxId = ids.reduce((a, b) => Math.max(a, b), 0)
    return maxId + 1
}