promise = myaync =>
    setTimeout(() => {
        resolve("result");
    }, 1000);

async function name() {
    let { hello, world } = await User.findOne(callback(err, user)); //@promisifyasd

    async function asd() {
        await User(null, callback(err, user)); //@promisifyasdasd
    }
}
