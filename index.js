module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AwaitExpression(path) {
                let comment = path.parentPath.parentPath.node.leadingComments;
                if (comment !== null) {
                    // comment = comment[0].value.match(/@([^ ]*)/)[1];
                    // console.log(comment);
                }
            }
        }
    };
};
