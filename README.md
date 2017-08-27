# babel-plugin-promise 

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)](https://travis-ci.org/vaheqelyan/babel-plugin-promise)

Turn any callback into a promise

[Basic promisify using leading comments](#basic)

[Without error handle](#without-error-handle)

[Using your own arguments](#using-your-own-arguments)

[ES7 Async/Await](#es7-asyncawait)

[ES7 Async/Await + Arrow functions](#es7-async-and-await-arrow-functions)


## Basic

**before**

```javascript
var fs = require("fs");
//@promisify<err,data> promiseName
__ = fs.readFile("../package.json", "utf8");

```

**after**

```javascript
var fs = require("fs");
//@promisify<err,data> promiseName

function promiseName() {
  return new Promise((resolve, reject) => {
    fs.readFile("../package.json", "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

promiseName().then(res => {
  console.log(res);
});


```


## Without error handle

If the callback does not return us the error message, insert ```null``` instead of ```error```

**before**

```javascript
var fs = require("fs");
//@promisify<null,data> promiseName
__ = fs.readFile("../package.json", "utf8");
```

**after**


```javascript
var fs = require("fs");
//@promisify<null,data> promiseName

function promiseName() {
  return new Promise(resolve => {
    fs.readFile("../package.json", "utf8", data => {
      resolve(data);
    });
  });
}
```

You can see that it does not handle reject


## Using your own arguments

For custom arguments


**before**

```javascript
//@promisify<err,data> findUser
__ = User.findOne(arg1);
```

**after**
```javascript
//@promisify<err,data> findUser
function findUser(arg1) {
  return new Promise((resolve, reject) => {
    User.findOne(arg1, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
```


## ES7 Async/Await

This time you should use trailing comments

**before**

```javascript
var fs = require("fs");

async function someFunction(){
  await fs.readFile('./package.json','utf8') //@promisify<err,data>
}
```

**after**

```javascript
var fs = require("fs");

async function someFunction() {
  await new Promise((resolve, reject) => {
    fs.readFile('./package.json', 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  }); //@promisify<err,data>
}
```

### ES7 Async/Await + Arrow functions

Also, you can make promises with an arrow function expression

**before**

```javascript
var fs = require("fs");

const some = async () => await fs.readFile("./package.json", "uft8"); //@promisify<err,data>

```

**after**

```javascript
var fs = require("fs");

const some = async () => await new Promise((resolve, reject) => {
  fs.readFile("./package.json", "uft8", (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
}); //@promisify<err,data>
```

