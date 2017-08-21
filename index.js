module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AwaitExpression(path) {
                let comment = path.parentPath.parentPath.node.leadingComments;
                console.log(comment);
                // if (comment !== null) {
                //     console.log(comment);
                //     // comment = comment[0].value.match(/@([^ ]*)/)[1];
                //     // console.log(comment);
                // }
            }
        }
    };
};
