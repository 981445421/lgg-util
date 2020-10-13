## lgg-util
js工具库,
>方法
* lggLinFn() 流程控制，支持链式，加锁，异常捕获;
```
lggLinFn(function({next,fail},param){},function({next,fail},param){}).then(function({next,fail},param){}).then(function({next,fail},param){}).lock("123","first").catch(function(err){})
```
* lggGetId() 快速获取当前唯一id;
