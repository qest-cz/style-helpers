export const get = <T extends Object>(source: T, keys: any[], defaultValue?: string) => {
    return keys.reduce((acc, key) => {
        return acc ? acc[key] : defaultValue;
    }, source);
};
