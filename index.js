module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AwaitExpression(path) {
                let comment1 = path.parentPath.node.leadingComments;
                let comment2 = path.parentPath.parentPath.node.leadingComments;
                console.log(comment1);
                console.log(comment2);
                // if (comment !== null) {
                //     console.log(comment);
                //     // comment = comment[0].value.match(/@([^ ]*)/)[1];
                //     // console.log(comment);
                // }
            }
        }
    };
};
