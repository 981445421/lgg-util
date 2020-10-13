type FN = (...rest: any[]) => any;
type FailFn = (str: string) => void;
type LockType = "first" | "last"

interface Param {
    next: FN,
    fail: FailFn,
}

interface LockItem {
    type: LockType,
    instanceLock: any,
    count: number
}

type NextFn = (param: Param, ...rest: any[]) => any

interface LockResult {
    catch: (fn: FailFn) => void,
}

interface Result {
    lock: (id: string, type: LockType) => LockResult,
    then: (fn: NextFn) => Result,
    catch: (fn: FailFn) => void,
}

export interface LinFn {
    (...restFn: NextFn[]): Result,

    _lock: {
        [p: string]: LockItem | undefined
    }
}

export const linFn: LinFn = function (...restFn: NextFn[]) {
    let _catchFn: null | FN = null;
    let _restFnArr = [...restFn];
    let _clockId: string = "";
    let _state: "pending" | "success" | "fail" = "pending";//pending 挂起 success 成功 fail 失败
    let _catchStr: string | undefined = undefined;
    const _catch = function (fn: FailFn) {
        _catchFn = fn;
        if (_state === "fail") {
            fail(_catchStr);
        }
    }
    const _then = function (fn: NextFn) {
        if (fn) {
            _restFnArr.push(fn);
        }
        return result;
    }
    const _lockInit = function (id: string, type: LockType) {
        _clockId = id;
        if (linFn._lock !== undefined) {
            linFn._lock = {};
        }
        const conf = linFn._lock[_clockId];
        if (!conf) {
            linFn._lock[_clockId] = {
                type,
                instanceLock: _lockInit,
                count: 1,
            };
        } else {
            conf.count = conf.count + 1;
        }
        _verifyLockFirst()
        return {catch: _catch,};
    }
    const _verifyLockFirst = function () {
        const conf = linFn._lock[_clockId];
        if (conf && conf.instanceLock !== _lockInit && conf.count > 1) {
            if (conf.type === "first") {
                _state = "fail";
                _catchStr = "加锁"
            }
        }
    }
    const _verifyLockLast = function () {
        if (!_clockId) return;
        const conf = linFn._lock[_clockId];
        if (conf && conf.instanceLock === _lockInit && conf.count > 1) {
            if (conf.type === "last") {
                _state = "fail";
                _catchStr = "加锁"
            }
        }
    }
    const result: Result = {
        then: _then,
        catch: _catch,
        lock: _lockInit
    }
    if (_restFnArr.length === 0) {
        return result;
    }
    let i = -1;
    const next = function (...param: any[]) {
        _verifyLockLast()
        i = i + 1;
        if (_state === "pending") {
            if (i < _restFnArr.length) {
                try {
                    return _restFnArr[i]({next, fail}, ...param);
                } catch (err) {
                    fail(err)
                }
            } else {
                _state = "success";
            }
        }
    }
    const fail = function (error: string | undefined) {
        _state = "fail";
        if (_catchFn) {
            _catchFn(error);
        } else {
            throw error
        }
    }
    setTimeout(function () {
        next();
    })
    return result;
}
linFn._lock = {};
