module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            CallExpression(path) {
                //let comment = path.node.leadingComments[0].value.match(/@([^ ]*)/)[1];
                path.replaceWith(t.expressionStatement(t.stringLiteral("Anyway the wind blows, doesn't really matter to me, to me.")));
            }
        }
    };
};
