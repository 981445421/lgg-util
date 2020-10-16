type type = "String" | "Number" | "Undefined" | "Null" | "Array" | "Object" | "Boolean" | "Symbol" | "Function";

export class Type {
    static getType(value: any): type {
        switch (Object.prototype.toString.call(value)) {
            case  "[object String]":
                return "String";
            case  "[object Number]":
                return "Number";
            case  "[object Undefined]":
                return "Undefined";
            case  "[object Null]":
                return "Null";
            case  "[object Array]":
                return "Array";
            case  "[object Object]":
                return "Object";
            case  "[object Boolean]":
                return "Boolean";
            case  "[object Symbol]":
                return "Symbol";
            case  "[object Function]":
                return "Function";
            default:
                throw new Error("未知类型");
        }
    }

    static isType(type: type, value: any) {
        return type === Type.getType(value)
    }
}
