const fs = require('fs');

// get all routes from express ---------------

// const routes = {}
// function routerRecursion(middleware, pointer, currentName) {
//   if (middleware.route) { // routes registered directly on the app
//     if (!Array.isArray(pointer['routes'])) {
//       pointer['routes'] = []
//     }
//     const routeObj = {
//       path: middleware.route.path,
//       method: middleware.route.stack[0].method
//     }
//     pointer['routes'].push(routeObj)
//   } else if (middleware.name === 'router') { // inside router
//     const current = middleware.regexp.toString().replace(/\/\^\\\//, '').replace(/\\\/\?\(\?\=\\\/\|\$\)\/\i/, '')
//     pointer[current] = {}
//     middleware.handle.stack.forEach(function (handler) {
//       routerRecursion(handler, pointer[current], current)
//     });
//   }
// }
// app._router.stack.forEach(function (middleware) {
//   routerRecursion(middleware, routes, 'main')
// });
// console.log(routes);
// -------------------------------------------


function isObject(element) {
    if (!element) return false;
    if (Array.isArray(element)) return false;
    return element instanceof Object;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const fileData = fs.readFileSync('./currentRoutes.json')
const parseData = JSON.parse(fileData);

// extract all routes and give the they full path -------

const routes = []
function recursion(obj, currentRoute) {
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            const element = obj[i];
            element.path = currentRoute + element.path
            routes.push(element)
        }
    }
    else if (isObject(obj)) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                const myKey = key == 'routes' ? '' : '/' + key
                recursion(element, currentRoute + myKey)
            }
        }
    } else {
        element.path = currentRoute + element.path
        routes.push(obj)
    }
}



for (const key in parseData) {
    if (Object.hasOwnProperty.call(parseData, key)) {
        const element = parseData[key];
        recursion(element, '/api')
    }
}
console.log('all routes array', routes.length);
// console.log(routes);

// ---------------------------------


// combine same routes with different methods 
const pathObj = {}

function placeData(path, method) {
    path[method] = {
    }
}

for (let i = 0; i < routes.length; i++) {
    const element = routes[i];
    if (!isObject(pathObj[element.path])) {
        pathObj[element.path] = {}
    }
    if (Array.isArray(element.method)) {
        for (let i = 0; i < element.method.length; i++) {
            const method = element.method[i];
            placeData(pathObj[element.path], method)
        }
    } else {
        placeData(pathObj[element.path], element.method)
    }
}

// console.log(pathObj);
console.log('combine routes different methods ', Object.keys(pathObj).length);

function formatKey(key, isSchema = false) {
    const strArr = key.split('/')
    for (let i = 0; i < strArr.length; i++) {
        const element = strArr[i];
        if (element == 'v1') {
            let nextElem = strArr[i + 1]
            if (isSchema) {
                nextElem = capitalize(nextElem)
            } else if (nextElem[nextElem.length - 1] == 's') {
                nextElem = nextElem.substring(0, nextElem.length - 1)
            }
            return nextElem
        }
    }
}

function needParams(key) {
    const strArr = key.split('/')
    const last = strArr[strArr.length - 1]
    const needParam = (last[last.length - 1] == '}' || last[last.length - 2] == '}')
    return needParam
}

function addPostParams(route, description, schema) {
    route['tags'] = [schema]
    route['summary'] = description
    route['parameters'] = [{
        in: "body",
        name: "body",
        description: params + ' data',
        required: true,
        schema: {
            "$ref": `#/definitions/${schema}`
        }
    }]
    route['responses'] = {
        "201": {
            description: "OK",
            schema: {
                "$ref": `#/definitions/${schema}`
            }
        },
        "400": {
            description: "Cannot Process Request",
        },
        "401": {
            description: "Access Token Required / Unauthorized"
        }
    }
}

function addPatchOrPutParams(route, description, schema, needParams, params) {
    route['tags'] = [schema]
    route['summary'] = description
    route['parameters'] = [{
        in: "body",
        name: "body",
        description: params + ' data',
        required: true,
        schema: {
            "$ref": `#/definitions/${schema}`
        }
    }]
    if (needParams) {
        route['parameters'].unshift({
            in: "path",
            name: params + 'Id',
            description: `Id of ${params}`,
            required: true,
            schema: {
                type: "integer",
                format: "int64",
                minimum: 1
            }
        })
    }
    route['responses'] = {
        "202": {
            description: "Updated",
            schema: {
                "$ref": `#/definitions/${schema}`
            }
        },
        "400": {
            description: "Cannot Process Request",
        },
        "404": {
            description: 'Not found'
        },
        "401": {
            description: "Access Token Required / Unauthorized"
        }
    }
}

function addGetParams(route, description, schema, needParams, params) {
    route['tags'] = [schema]
    route['summary'] = description
    route['parameters'] = [{
        in: "query",
        name: 'name',
        description: `Data query`,
        required: true,
        schema: {
            type: "string"
        }
    }]
    if (needParams) {
        route['parameters'].unshift({
            in: "path",
            name: params  + 'Id',
            description: `Id of ${schema}`,
            required: true,
            schema: {
                type: "integer",
                format: "int64",
                minimum: 1
            }
        })
    }
    route['responses'] = {
        "200": {
            description: "OK",
            schema: {
                "$ref": `#/definitions/${schema}`
            }
        },
        "404": {
            description: 'Not found'
        },
        "401": {
            description: "Access Token Required / Unauthorized"
        }
    }
}

function addDeleteParams(route, description, schema, needParams, params) {
    route['tags'] = [schema]
    route['summary'] = description
    if (needParams) {
        route['parameters'] = [{
            in: "path",
            name: params + 'Id',
            description: `Id of ${params}`,
            required: true,
            schema: {
                type: "integer",
                format: "int64",
                minimum: 1
            }
        }]
    }
    route['responses'] = {
        "204": {
            description: "Deleted",
        },
        "404": {
            description: 'Not found'
        },
        "401": {
            description: "Access Token Required / Unauthorized"
        }
    }
}

function addParams(routesObj) {
    for (const key in routesObj) {
        if (Object.hasOwnProperty.call(routesObj, key)) {
            const element = routesObj[key];
            if (element.post) {
                addPostParams(element.post, `Add a ${formatKey(key)}`, formatKey(key, true))
            }
            if (element.patch) {
                addPatchOrPutParams(element.patch, `Update ${formatKey(key)}`, formatKey(key, true), needParams(key), formatKey(key))
            }
            if (element.put) {
                addPatchOrPutParams(element.put, `Update ${formatKey(key)}`, formatKey(key, true), needParams(key), formatKey(key))
            }
            if (element.get) {
                addGetParams(element.get, `Get ${formatKey(key)}`, formatKey(key, true), needParams(key), formatKey(key))
            }
            if (element.delete) {
                addDeleteParams(element.delete, `Delete ${formatKey(key)}`, formatKey(key, true), needParams(key), formatKey(key))
            }
        }
    }
}

addParams(pathObj)


// create file if not exist
const fileNumber = 2

fs.appendFile(`./tries/try${fileNumber}.json`, '', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

// write the data on the file

fs.writeFileSync(`./tries/try${fileNumber}.json`, JSON.stringify(pathObj), function (err) {
    if (err) throw err;
    console.log('Saved!');
});



