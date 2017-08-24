module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AwaitExpression(path) {
                let comment = path.parentPath.node.trailingComments;
                if (comment) {
                    // for just comment
                    if (/@promisify<([^>]+)?>/g.test(comment[0].value)) {
                        if (path.node.argument.callee.type === "MemberExpression") {
                            var reg = /<([^>]+)?>/gi.exec(comment[0].value)[1].split(",");

                            if (reg[0] != "null") {
                                path.node.argument.arguments.push(
                                    t.ArrowFunctionExpression(
                                        [t.Identifier(reg[0]), t.Identifier(reg[1])],
                                        t.BlockStatement([
                                            t.IfStatement(
                                                t.Identifier(reg[0]),
                                                t.ExpressionStatement(
                                                    t.CallExpression(t.Identifier("reject"), [
                                                        t.Identifier(reg[0])
                                                    ])
                                                )
                                            ),
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("resolve"), [
                                                    t.Identifier(reg[1])
                                                ])
                                            )
                                        ])
                                    )
                                );
                            } else {
                                path.node.argument.arguments.push(
                                    t.ArrowFunctionExpression(
                                        [t.Identifier(reg[1])],
                                        t.BlockStatement([
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("resolve"), [
                                                    t.Identifier(reg[1])
                                                ])
                                            )
                                        ])
                                    )
                                );
                            }

                            path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                                t.ArrowFunctionExpression(
                                    [t.Identifier("resolve"), t.Identifier("reject")],
                                    t.BlockStatement([t.ExpressionStatement(path.node.argument)])
                                )
                            ]);
                        } else {
                            var reg = /<([^>]+)?>/gi.exec(comment[0].value)[1].split(",");

                            if (reg[0] != "null") {
                                path.node.argument.arguments.push(
                                    t.ArrowFunctionExpression(
                                        [t.Identifier(reg[0]), t.Identifier(reg[1])],
                                        t.BlockStatement([
                                            t.IfStatement(
                                                t.Identifier(reg[0]),
                                                t.ExpressionStatement(
                                                    t.CallExpression(t.Identifier("reject"), [
                                                        t.Identifier(reg[0])
                                                    ])
                                                )
                                            ),
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("resolve"), [
                                                    t.Identifier(reg[1])
                                                ])
                                            )
                                        ])
                                    )
                                );
                            } else {
                                path.node.argument.argument.push(
                                    t.ArrowFunctionExpression(
                                        [t.Identifier(reg[1])],
                                        t.BlockStatement([
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("resolve"), [
                                                    t.Identifier(reg[1])
                                                ])
                                            )
                                        ])
                                    )
                                );
                            }
                            //path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(getCallbackArguments, t.BlockStatement([]));
                            path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                                t.ArrowFunctionExpression(
                                    [t.Identifier("resolve"), t.Identifier("reject")],
                                    t.BlockStatement([t.ExpressionStatement(path.node.argument)])
                                )
                            ]);
                        }
                    }
                } else if (path.parentPath.parentPath.node.trailingComments) {
                    // in case of parent
                    let comment = path.parentPath.parentPath.node.trailingComments;
                    const value = comment[0].value.match(/@([^ ]*)/)[1];
                    if (/@promisify<([^>]+)?>/g.test(comment[0].value)) {
                        var reg = /<([^>]+)?>/gi.exec(comment[0].value)[1].split(",");
                        if (path.node.argument.callee.type === "MemberExpression") {
                            if (reg[0] != "null") {
                                path.node.argument.arguments[
                                    path.node.argument.arguments.length - 1
                                ] = t.ArrowFunctionExpression(
                                    [t.Identifier(reg[0]), t.Identifier(reg[1])],
                                    t.BlockStatement([
                                        t.IfStatement(
                                            t.Identifier(reg[0]),
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("reject"), [
                                                    t.Identifier(reg[0])
                                                ])
                                            )
                                        ),
                                        t.ExpressionStatement(
                                            t.CallExpression(t.Identifier("resolve"), [
                                                t.Identifier(reg[1])
                                            ])
                                        )
                                    ])
                                );
                            } else {
                                path.node.argument.arguments[
                                    path.node.argument.arguments.length - 1
                                ] = t.ArrowFunctionExpression(
                                    [t.Identifier(reg[1])],
                                    t.BlockStatement([
                                        t.ExpressionStatement(
                                            t.CallExpression(t.Identifier("resolve"), [
                                                t.Identifier(reg[1])
                                            ])
                                        )
                                    ])
                                );
                            }

                            path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                                t.ArrowFunctionExpression(
                                    [t.Identifier("resolve"), t.Identifier("reject")],
                                    t.BlockStatement([t.ExpressionStatement(path.node.argument)])
                                )
                            ]);
                        } else {
                            if (reg[0] != "null") {
                                path.node.argument.arguments[
                                    path.node.argument.arguments.length - 1
                                ] = t.ArrowFunctionExpression(
                                    [t.Identifier(reg[0]), t.Identifier(reg[1])],
                                    t.BlockStatement([
                                        t.IfStatement(
                                            t.Identifier(reg[0]),
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("reject"), [
                                                    t.Identifier(reg[0])
                                                ])
                                            )
                                        ),
                                        t.ExpressionStatement(
                                            t.CallExpression(t.Identifier("resolve"), [
                                                t.Identifier(reg[1])
                                            ])
                                        )
                                    ])
                                );
                            } else {
                                path.node.argument.arguments[
                                    path.node.argument.arguments.length - 1
                                ] = t.ArrowFunctionExpression(
                                    [t.Identifier(reg[1])],
                                    t.BlockStatement([
                                        t.ExpressionStatement(
                                            t.CallExpression(t.Identifier("resolve"), [
                                                t.Identifier(reg[1])
                                            ])
                                        )
                                    ])
                                );
                            }
                            //path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(getCallbackArguments, t.BlockStatement([]));
                            path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                                t.ArrowFunctionExpression(
                                    [t.Identifier("resolve"), t.Identifier("reject")],
                                    t.BlockStatement([t.ExpressionStatement(path.node.argument)])
                                )
                            ]);
                        }
                    }
                } else if (path.parentPath.parentPath.parentPath.node.trailingComments) {
                    const Atlin = path.node.loc.start.line;
                    const comment = path.parentPath.parentPath.parentPath.node.trailingComments[0];

                    const commentLine = comment.loc.start.line;
                    if (commentLine == Atlin && /@promisify<([^>]+)?>/g.test(comment.value)) {
                        var reg = /<([^>]+)?>/gi.exec(comment.value)[1].split(",");
                        if (path.node.argument.callee.type === "MemberExpression") {
                            if (reg[0] != "null") {
                                path.node.argument.arguments.push(
                                    t.ArrowFunctionExpression(
                                        [t.Identifier(reg[0]), t.Identifier(reg[1])],
                                        t.BlockStatement([
                                            t.IfStatement(
                                                t.Identifier(reg[0]),
                                                t.ExpressionStatement(
                                                    t.CallExpression(t.Identifier("reject"), [
                                                        t.Identifier(reg[0])
                                                    ])
                                                )
                                            ),
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("resolve"), [
                                                    t.Identifier(reg[1])
                                                ])
                                            )
                                        ])
                                    )
                                );
                            } else {
                                path.node.argument.arguments.push(
                                    t.ArrowFunctionExpression(
                                        [t.Identifier(reg[1])],
                                        t.BlockStatement([
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("resolve"), [
                                                    t.Identifier(reg[1])
                                                ])
                                            )
                                        ])
                                    )
                                );
                            }

                            path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                                t.ArrowFunctionExpression(
                                    [t.Identifier("resolve"), t.Identifier("reject")],
                                    t.BlockStatement([t.ExpressionStatement(path.node.argument)])
                                )
                            ]);
                        } else {
                            if (reg[0] != "null") {
                                path.node.argument.arguments.push(
                                    t.ArrowFunctionExpression(
                                        [t.Identifier(reg[0]), t.Identifier(reg[1])],
                                        t.BlockStatement([
                                            t.IfStatement(
                                                t.Identifier(reg[0]),
                                                t.ExpressionStatement(
                                                    t.CallExpression(t.Identifier("reject"), [
                                                        t.Identifier(reg[0])
                                                    ])
                                                )
                                            ),
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("resolve"), [
                                                    t.Identifier(reg[1])
                                                ])
                                            )
                                        ])
                                    )
                                );
                            } else {
                                path.node.argument.arguments.push(
                                    t.ArrowFunctionExpression(
                                        [t.Identifier(reg[1])],
                                        t.BlockStatement([
                                            t.ExpressionStatement(
                                                t.CallExpression(t.Identifier("resolve"), [
                                                    t.Identifier(reg[1])
                                                ])
                                            )
                                        ])
                                    )
                                );
                            }
                            //path.node.argument.arguments[path.node.argument.arguments.length - 1] = t.ArrowFunctionExpression(getCallbackArguments, t.BlockStatement([]));
                            path.node.argument = t.NewExpression(t.Identifier("Promise"), [
                                t.ArrowFunctionExpression(
                                    [t.Identifier("resolve"), t.Identifier("reject")],
                                    t.BlockStatement([t.ExpressionStatement(path.node.argument)])
                                )
                            ]);
                        }
                    }
                }
            },
            CallExpression(path) {
                if (path.parentPath.node.trailingComments) {
                    var comment = path.parentPath.node.trailingComments[0];
                    //path.replaceWithSourceString(`const name = () => {console.log('asdasd')}`);
                }
            }
        }
    };
};
