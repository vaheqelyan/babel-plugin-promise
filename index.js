module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            ExpressionStatement(path) {
                //let comment = path.node.leadingComments[0].value.match(/@([^ ]*)/)[1];
                path.replaceWith(t.callExpression(t.memberExpression(t.identifier("mori"), t.identifier("vector")), path.node.elements));
            }
        }
    };
};
