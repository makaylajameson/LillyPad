export const normalizeObj = (array) => {
    const obj = {};
    array.forEach((e) => obj[e.id] = e);
    return obj;
}
