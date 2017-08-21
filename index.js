module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            CallExpression(path) {
                //let comment = path.parentPath.node.leadingComments[0].value.match(/@([^ ]*)/)[1];
                console.log(path.parentPath.node);
                // path.replaceWithSourceString(`function add(a, b) {
                //     return a + b;
                //   }`);
            }
        }
    };
};
