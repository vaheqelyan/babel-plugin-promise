module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AwaitExpression(path) {
                console.log(path.get("CallExpression").node.type);
                // let comment = path.parentPath.node.leadingComments;
                // if (comment !== null) {
                //     comment = comment[0].value.match(/@([^ ]*)/)[1];
                //     path.replaceWithSourceString(`function ${comment}(a, b) {
                //         return a + b;
                //       }`);
                // }
            }
        }
    };
};
