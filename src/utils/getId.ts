let num: number = 0;
const length = 11;
const getId: () => string = function () {
    num++;
    return Number(Math.random().toString().substr(2, length) + Date.now() + num).toString(36).substr(0, length);
}
export default getId;
