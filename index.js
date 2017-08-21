module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            ExpressionStatement(path) {
                console.log(path.parentPath);
                //let comment = path.node.leadingComments[0].value.match(/@([^ ]*)/)[1];
                //path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
                //path.insertAfter(t.expressionStatement(t.stringLiteral("A little high, little low.")));
                //path.insertAfter(t.expressionStatement(t.stringLiteral("A little high, little low.")));
            }
        }
    };
};
