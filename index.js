module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AwaitExpression(path) {
                let comment = path.parentPath.node.trailingComments;
                if (comment) {
                    const value = comment[0].value.match(/@([^ ]*)/)[1];

                    if (path.node.argument.callee.type === "MemberExpression") {
                        console.log("MemberExpression !");
                    } else {
                        console.log(path.node.argument.arguments);
                        path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                            t.ArrowFunctionExpression([t.Identifier("resolve"), t.Identifier("reject")], t.BlockStatement([]))
                        ]);
                    }
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
