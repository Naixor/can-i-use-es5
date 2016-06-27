(function (util) {
    var createApiList = util.createApiList;
    var canUseApi = util.canUseApi;
    var getObjectName = util.getObjectName;
    var apiList = [];
    try {
        createApiList(apiList, String, ['fromCharCode'], ['charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substr', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'toString', 'trim', 'valueOf']);
        createApiList(apiList, Array, ['isArray'], ['concat', 'every', 'filter', 'forEach', 'indexOf', 'join', 'lastIndexOf', 'map', 'pop', 'push', 'reduce', 'reduceRight', 'reverse', 'shift', 'slice', 'some', 'sort', 'splice', 'toLocaleString', 'toString', 'unshift']);
        createApiList(apiList, Object, ['create', 'defineProperty', 'defineProperties', 'seal', 'freeze', 'preventExtensions', 'isSealed', 'isFrozen', 'isExtensible', 'keys'], ['constructor', 'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable']);
        createApiList(apiList, Function, ['length'], ['constructor', 'toString', 'apply', 'call', 'bind']);
        createApiList(apiList, Number, ['MAX_VALUE', 'MIN_VALUE', 'NaN', 'NEGATIVE_INFINITY', 'POSITIVE_INFINITY'], ['toString', 'toLocaleString', 'valueOf', 'toFixed', 'toExponential', 'toPrecision']);
        createApiList(apiList, Math, ['E', 'LN10', 'LN2', 'LOG2E', 'LOG10E', 'PI', 'SQRT1_2', 'SQRT2', 'abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'random', 'round', 'sin', 'sqrt', 'tan'], []);
        createApiList(apiList, Date, ['parse', 'UTC', 'now'], ['toString', 'toDateString', 'toTimeString', 'toLocaleString', 'toLocaleDateString', 'toLocaleTimeString', 'valueOf', 'getTime', 'getFullYear', 'getUTCFullYear', 'getMonth', 'getUTCMonth', 'getDate', 'getUTCDate', 'getDay', 'getUTCDay', 'getHours', 'getUTCHours', 'getMinutes', 'getUTCMinutes', 'getSeconds', 'getUTCSeconds', 'getMilliseconds', 'getUTCMilliseconds', 'getTimezoneOffset', 'setTime', 'setMilliseconds', 'setUTCMilliseconds', 'setSeconds', 'setUTCSeconds', 'setMinutes', 'setUTCMinutes', 'setHours', 'setUTCHours', 'setDate', 'setUTCDate', 'setMonth', 'setUTCMonth', 'setFullYear', 'setUTCFullYear', 'toUTCString', 'toISOString', 'toJSON']);
        createApiList(apiList, RegExp, ['$1', '$2', '$3', '$4', '$5', '$6', '$7', '$8', '$9', 'input'], ['exec', 'test', 'toString', 'source', 'global', 'ignoreCase', 'multiline', 'lastIndex']);
        createApiList(apiList, Error, ['name', 'toString'], ['message']);
        createApiList(apiList, JSON, ['parse', 'stringify'], []);
        createApiList(apiList, window, ['EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'], []);
    } catch(e) {
        document.write(e.String());
        return;
    }
    var table = util.createTable();

    apiList.forEach(function (api) {
        var obj = api.object;
        var objName = getObjectName(obj);
        var checkRes = [];
        api.static.forEach(function (method) {
            if (!canUseApi(obj, method)) {
                checkRes.push([objName, method, 'static method']);
            }
        });
        if (api.prototype.length) {
            var instance = new obj();
            api.prototype.forEach(function (method) {
                if (!canUseApi(instance, method)) {
                    checkRes.push([objName, method, 'instance method']);
                }
            });
        }
        if (!checkRes.length) {
            table.append([objName, 'all right ok!']);
        } else {
            checkRes.forEach(function (row) {
                table.append(row);
            });
        }
    });
    table.render();
})({
    // util
    createApiList: function (arr, object, staticFuncs, prototypeFuncs) {
        arr.push({
            object: object,
            static: staticFuncs,
            prototype: prototypeFuncs
        });
    },
    canUseApi: function (object, api) {
        // console.log(object[api]);
        return api in object;
    },
    createTable: function () {
        var table = document.createElement('table');

        return {
            append: function (arr) {
                table.innerHTML += ['<tr>', '<td>', arr.join('</td><td>'), '</td>', '</tr>'].join('');
            },
            render: function (container) {
                if (!(container instanceof HTMLElement)) {
                    container = document.body;
                }
                container.appendChild(table);
            }
        }
    },
    getObjectName: function (obj) {
        var matchFunc = obj.toString().match(/^function (\w+)\(\)/)
        if (matchFunc) {
            return matchFunc[1];
        } else {
            return obj.toString().slice(8, -1);
        }
    }
});