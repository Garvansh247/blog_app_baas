export function toPlain(value) {
    return JSON.parse(JSON.stringify(value));
}