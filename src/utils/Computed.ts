export default class Computed {
    #value: number = 0;
    #addFn = (arg1: number, arg2: number, accuracy: number) => {
        let result = arg1 + arg2;
        return result / Math.pow(10, accuracy);
    }
    #subtractFn = (arg1: number, arg2: number, accuracy: number) => {
        let result = arg1 - arg2;
        return result / Math.pow(10, accuracy);
    }
    #multiplyFn = (arg1: number, arg2: number, accuracy: number) => {
        let result = arg1 * arg2;
        return result / Math.pow(10, 2 * accuracy);
    }
    #divideFn = (arg1: number, arg2: number) => {
        return arg1 / arg2;
    }

    constructor(init: number) {
        this.#value = init;
    }

    /**
     * js简单精度计算方法
     * @param {number} arg1  参与计算的第一个参数
     * @param {"+" | "-" | "*" | "/"} type  执行计算方法类型,加减乘除
     * @param {number} arg2  参与计算的第二个参数
     * @param {number} accuracy  精度,可选,不指名精度,保留所有精度,指名进度,不够添加,多了舍弃
     * @returns {number} 结果
     */
    static operation(arg1: number, type: "+" | "-" | "*" | "/", arg2: number) {
        const computed = new Computed(0);
        computed.#value = computed.operationFn(arg1, type, arg2);
        return computed;
    }

    operationFn(arg1: number, type: "+" | "-" | "*" | "/", arg2: number) {
        //不存在精度,自动补全精度
        const accuracy = this.getDefaultAccuracy(arg1, arg2)
        //保留两位小数
        let strArg1 = this.precision(arg1, accuracy);
        let strArg2 = this.precision(arg2, accuracy);
        //统一转换成数字类型
        const newArg1: number = Number(strArg1.replace('.', ''));
        const newArg2: number = Number(strArg2.replace('.', ''));
        switch (type) {
            case '+':
                return this.#addFn(newArg1, newArg2, accuracy);
            case '-':
                return this.#subtractFn(newArg1, newArg2, accuracy);
            case '*':
                return this.#multiplyFn(newArg1, newArg2, accuracy);
            case '/':
                return this.#divideFn(newArg1, newArg2);
            default:
                throw new Error("operation 无法计算")
        }
    }

    //add  加
    add(...arg: number[]) {
        arg.forEach(it => {
            this.#value = this.operationFn(this.#value, "+", it);
        })
        return this;
    }

    //subtract 减
    subtract(...arg: number[]) {
        arg.forEach(it => {
            this.#value = this.operationFn(this.#value, "-", it);
        })
        return this;
    }

    //multiply 乘
    multiply(...arg: number[]) {
        arg.forEach(it => {
            this.#value = this.operationFn(this.#value, "*", it);
        })
        return this;
    }

    //divide  除以
    divide(...arg: number[]) {
        arg.forEach(it => {
            this.#value = this.operationFn(this.#value, "/", it);
        })
        return this;
    }


    //得到精度长度
    getAccuracy(arg: number) {
        const newArg = String(arg);
        const argIndex = newArg.indexOf('.');
        const result: number = newArg.length - 1 - argIndex;
        return result;
    }

    //给数字添加精度
    precision(arg: number, accuracy: number) {
        let newArg: string = arg + "";
        const argIndex = newArg.indexOf('.');
        if (argIndex != -1) {
            let argLength = newArg.length - argIndex - 1;
            if (argLength >= accuracy) {
                //如果实际精度大于指定精度,按照指定精度来
                newArg = newArg.substring(0, argIndex + accuracy + 1);
            } else {
                let ce = accuracy - argLength;
                for (let i = 0; i < ce; i++) {
                    newArg += '0';
                }
            }
        } else {
            //没有精度给添加上精度
            newArg = newArg + '.';
            for (let i = 0; i < accuracy; i++) {
                newArg += '0';
            }
        }
        return newArg;
    }

    //自动补全精度,获取两个参数中的最大进度
    getDefaultAccuracy(arg1: number, arg2: number) {
        if (this.getAccuracy(arg1) >= this.getAccuracy(arg2)) {
            return this.getAccuracy(arg1)
        } else {
            return this.getAccuracy(arg2)
        }
    }

    //判断是否为空,保留0和false
    static isEmpty(arg: any): boolean {
        let flag = false;
        if (typeof arg === "object") {
            const str = JSON.stringify(arg);
            if (str === "[]" || str === "{}") {
                flag = true;
            }
        } else if (arg === null || arg === 'null' || arg === undefined || arg === 'undefined' || arg === '') {
            flag = true;
        }
        return flag;
    }

    result(accuracy?: number) {
        if (accuracy) {
            return Number(this.#value.toFixed(accuracy));
        } else {
            return this.#value;
        }
    }
}
