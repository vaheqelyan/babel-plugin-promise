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

                        var isError =
                            getCallbackArguments.length > 0
                                ? (getCallbackArguments[0] !== undefined && getCallbackArguments[0].name === "err") || getCallbackArguments[0].name === "error" ? true : false
                                : "no arguments";

                        if (isError == true) {
                            path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(
                                getCallbackArguments,
                                t.BlockStatement([
                                    t.IfStatement(
                                        t.Identifier(getCallbackArguments[0].name),
                                        t.ExpressionStatement(t.CallExpression(t.Identifier("reject"), [t.Identifier(getCallbackArguments[0].name)]))
                                    ),
                                    t.ExpressionStatement(t.CallExpression(t.Identifier("resolve"), [t.Identifier(getCallbackArguments[1].name)]))
                                ])
                            );
                        } else {
                            path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(
                                getCallbackArguments,
                                t.BlockStatement([t.ExpressionStatement(t.CallExpression(t.Identifier("resolve"), [t.Identifier(getCallbackArguments[1].name)]))])
                            );
                        }

                        path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                            t.ArrowFunctionExpression([t.Identifier("resolve"), t.Identifier("reject")], t.BlockStatement([t.ExpressionStatement(path.node.argument)]))
                        ]);
                    } else {
                        let getCallbackArguments = path.node.argument.arguments[path.node.argument.arguments.length - 1].arguments;

                        var isError =
                            getCallbackArguments.length > 0
                                ? (getCallbackArguments[0] !== undefined && getCallbackArguments[0].name === "err") || getCallbackArguments[0].name === "error" ? true : false
                                : "no arguments";

                        if (isError == true) {
                            path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(
                                getCallbackArguments,
                                t.BlockStatement([
                                    t.IfStatement(
                                        t.Identifier(getCallbackArguments[0].name),
                                        t.ExpressionStatement(t.CallExpression(t.Identifier("reject"), [t.Identifier(getCallbackArguments[0].name)]))
                                    ),
                                    t.ExpressionStatement(t.CallExpression(t.Identifier("resolve"), [t.Identifier(getCallbackArguments[1].name)]))
                                ])
                            );
                        } else {
                            path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(
                                getCallbackArguments,
                                t.BlockStatement([t.ExpressionStatement(t.CallExpression(t.Identifier("resolve"), [t.Identifier(getCallbackArguments[1].name)]))])
                            );
                        }
                        //path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(getCallbackArguments, t.BlockStatement([]));
                        path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                            t.ArrowFunctionExpression([t.Identifier("resolve"), t.Identifier("reject")], t.BlockStatement([t.ExpressionStatement(path.node.argument)]))
                        ]);
                    }
                }
            }
        }
    };
};
