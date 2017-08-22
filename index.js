module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AwaitExpression(path) {
                let comment = path.parentPath.node.trailingComments;
                if (comment) {
                    const value = comment[0].value.match(/@([^ ]*)/)[1];

                    if (path.node.argument.callee.type === "MemberExpression") {
                        let getCallbackArguments = path.node.argument.arguments[path.node.argument.arguments.length - 1].arguments;
                        path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(
                            getCallbackArguments,
                            t.BlockStatement([
                                t.IfStatement(t.Identifier("err"), t.ExpressionStatement(t.CallExpression(t.Identifier("reject"), [t.Identifier("getCallbackArgument")]))),
                                t.ExpressionStatement(t.CallExpression(t.Identifier("resolve"), [t.Identifier(getCallbackArguments[1].name)]))
                            ])
                        );

                        path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                            t.ArrowFunctionExpression([t.Identifier("resolve"), t.Identifier("reject")], t.BlockStatement([t.ExpressionStatement(path.node.argument)]))
                        ]);
                    } else {
                        let getCallbackArguments = path.node.argument.arguments[path.node.argument.arguments.length - 1].arguments;

                        var isError =
                            getCallbackArguments.length > 0
                                ? (getCallbackArguments[0] !== undefined && getCallbackArguments[0].name === "err") || getCallbackArguments[0].name === "error" ? "exists" : "no"
                                : "no arguments";
                        //console.log(isError);
                        path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(
                            getCallbackArguments,
                            t.BlockStatement([
                                // t.IfStatement(
                                //     t.Identifier("err"),
                                //     t.ExpressionStatement(
                                //         t.CallExpression(t.Identifier("reject"), [t.Identifier(getCallbackArguments[0].name)])
                                //     )
                                // ),
                                getCallbackArguments[0] ? t.ExpressionStatement(t.Identifier("true")) : t.ExpressionStatement(t.Identifier("false")),
                                t.ExpressionStatement(t.CallExpression(t.Identifier("resolve"), [t.Identifier("asdasd")]))
                            ])
                        );

                        path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                            t.ArrowFunctionExpression([t.Identifier("resolve"), t.Identifier("reject")], t.BlockStatement([t.ExpressionStatement(path.node.argument)]))
                        ]);
                    }
                }
            }
        }
    };
};
