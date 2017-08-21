module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            ExpressionStatement(path) {
                //let comment = path.node.leadingComments[0].value.match(/@([^ ]*)/)[1];
                console.log(path);
            }
        }
    };
};
