module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AwaitExpression(path) {
                let comment1 = path.parentPath.node.leadingComments;
                let comment2 = path.parentPath.parentPath.node.leadingComments;
                if (comment1 !== null || comment2 !== null) {
                    const comment =
                        comment1[0].value.match(/@([^ ]*)/)[1] == undefined
                            ? comment2[0].value.match(/@([^ ]*)/)[1]
                            : commen1t[0].value.match(/@([^ ]*)/)[1];
                    console.log(comment);
                }
                // if (comment !== null) {
                //     console.log(comment);
                //     // comment = comment[0].value.match(/@([^ ]*)/)[1];
                //     // console.log(comment);
                // }
            }
        }
    };
};
