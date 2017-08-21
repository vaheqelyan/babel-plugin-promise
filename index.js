module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            CallExpression(path) {
                //let comment = path.parentPath.node.leadingComments[0].value.match(/@([^ ]*)/)[1];
                let comment = path.parentPath.node.leadingComments;
                if (comment !== null) {
                    comment = comment[0].value.match(/@([^ ]*)/)[1];
                }
                // path.replaceWithSourceString(`function add(a, b) {
                //     return a + b;
                //   }`);
            }
        }
    };
};
