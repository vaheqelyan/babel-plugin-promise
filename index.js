module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            ExpressionStatement(path) {
                let comment = path.node.leadingComments[0].value.match(/@([^ ]*)/)[1];
                //path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
            }
        }
    };
};
