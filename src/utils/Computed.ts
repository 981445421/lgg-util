class Computed {
    /**
     * js简单精度计算方法
     * @param {number} arg1  参与计算的第一个参数
     * @param {"+" | "-" | "*" | "/"} type  执行计算方法类型,加减乘除
     * @param {number} arg2  参与计算的第二个参数
     * @param {number} accuracy  精度,可选,不指名精度,保留所有精度,指名进度,不够添加,多了舍弃
     * @returns {number} 结果
     */
    static operation(arg1: number, type: "+" | "-" | "*" | "/", arg2: number, accuracy?: number) {
        const computed = new Computed();
        //不存在精度,自动补全精度
        accuracy = computed.getDefaultAccuracy(arg1, arg2, accuracy)
        //保留两位小数
        let strArg1 = computed.precision(arg1, accuracy);
        let strArg2 = computed.precision(arg2, accuracy);
        //统一转换成数字类型
        const newArg1: number = Number(strArg1.replace('.', ''));
        const newArg2: number = Number(strArg2.replace('.', ''));
        switch (type) {
            case '+':
                return computed.add(newArg1, newArg2, accuracy);
            case '-':
                return computed.subtract(newArg1, newArg2, accuracy);
            case '*':
                return computed.secx(newArg1, newArg2, accuracy);
            case '/':
                return computed.divide(newArg1, newArg2);
            default:
                throw new Error("operation 无法计算")
        }
    }

    //add  加
    add(arg1: number, arg2: number, accuracy: number) {
        let result = arg1 + arg2;
        result = result / Math.pow(10, accuracy);
        return result;
    }

    //subtract 减
    subtract(arg1: number, arg2: number, accuracy: number) {
        let result = arg1 - arg2;
        result = result / Math.pow(10, accuracy);
        return result;
    }

    //secx 乘
    secx(arg1: number, arg2: number, accuracy: number) {
        let result = arg1 * arg2;
        result = result / Math.pow(10, 2 * accuracy);
        return result;
    }

    //divide  除以
    divide(arg1: number, arg2: number) {
        let result = arg1 / arg2;
        return result;
    }

    //得到精度长度
    getAccuracy(arg: number,) {
        const newArg = String(arg);
        const argIndex = newArg.indexOf('.');
        const result: number = newArg.length - 1 - argIndex;
        return result;
    }

    //给数字添加精度
    precision(arg: number, num: number) {
        let newArg: string = arg + "";
        const argIndex = newArg.indexOf('.');
        if (argIndex != -1) {
            let argLength = newArg.length - argIndex - 1;
            if (argLength >= num) {
                //如果实际精度大于指定精度,按照指定精度来
                newArg = newArg.substring(0, argIndex + num + 1);
            } else {
                let ce = num - argLength;
                for (let i = 0; i < ce; i++) {
                    newArg += '0';
                }
            }
        } else {
            //没有精度给添加上精度
            newArg = newArg + '.';
            for (let i = 0; i < num; i++) {
                newArg += '0';
            }
        }
        return newArg;
    }

    //获取默认精度,不存在精度,自动补全精度,获取两个参数中的最大进度
    getDefaultAccuracy(arg1: number, arg2: number, accuracy?: number) {
        if (!accuracy) {
            if (this.getAccuracy(arg1) >= this.getAccuracy(arg2)) {
                accuracy = this.getAccuracy(arg1)
            } else {
                accuracy = this.getAccuracy(arg2)
            }
        }
        return accuracy;
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
}

export default Computed;
