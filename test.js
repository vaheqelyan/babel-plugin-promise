async function name() {
    asdf;
    asdfasdf;
    asdfasdf;

    await findOne(callback(err, user)); //@promise

    async function asd() {
        //@promise
        let name = await findOne({ name: "vahe", _id: "123123123" }, callback(err, user)).async();
    }
    //@promise
    await asd();
}
