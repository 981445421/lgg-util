export interface obj {
    [key: string]: string | null | undefined | number | obj[] | obj,
}

export const deepCopy = function (origin: any[] | obj) {
    let result: any[] | obj;
    if (Array.isArray(origin)) {
        result = [];
        for (const obj of origin) {
            if (obj !== null && typeof obj === 'object') {
                result.push(deepCopy(obj))
            } else {
                result.push(obj);
            }
        }
    } else {
        result = {};
        for (let k in origin) {
            const obj = origin[k];
            if (obj !== null && typeof obj === 'object') {
                result[k] = deepCopy(obj);
            } else {
                result[k] = obj;
            }
        }
    }
    return result;
}
export const deleteNullUndefined = function (origin: any[] | obj) {
    let result: any[] | obj;
    if (Array.isArray(origin)) {
        result = [];
        for (const obj of origin) {
            if (obj === null || obj === undefined) {

            } else if (typeof obj === 'object') {
                result.push(deepCopy(obj))
            } else {
                result.push(obj);
            }
        }
    } else {
        result = {};
        for (let k in origin) {
            const obj = origin[k];
            if (obj === null || obj === undefined) {

            } else if (typeof obj === 'object') {
                result[k] = deepCopy(obj);
            } else {
                result[k] = obj;
            }
        }
    }
    return result;
}
