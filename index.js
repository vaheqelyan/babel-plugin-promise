module.exports = function(
    babel
) {
    const t =
        babel.types;
    return {
        visitor: {
            AwaitExpression(
                path
            ) {
                let comment =
                    path
                        .parentPath
                        .node
                        .trailingComments;
                if (
                    comment
                ) {
                    const value = comment[0].value.match(
                        /@([^ ]*)/
                    )[1];

                    if (
                        path
                            .node
                            .argument
                            .callee
                            .type ===
                        "MemberExpression"
                    ) {
                        console.log(
                            "MemberExpression !"
                        );
                    } else {
                        let getCallbackArguments =
                            path
                                .node
                                .argument
                                .arguments[
                                path
                                    .node
                                    .argument
                                    .arguments
                                    .length -
                                    1
                            ]
                                .arguments;
                        path.node.argument.arguments[
                            path
                                .node
                                .argument
                                .arguments
                                .length -
                                1
                        ] = t.ArrowFunctionExpression(
                            getCallbackArguments,
                            t.BlockStatement(
                                [
                                    t.IfStatement(
                                        t.Identifier(
                                            "err"
                                        ),
                                        t.ExpressionStatement(
                                            t.CallExpression(
                                                t.Identifier(
                                                    "reject"
                                                ),
                                                [
                                                    t.Identifier(
                                                        "err"
                                                    )
                                                ]
                                            )
                                        )
                                    ),
                                    t.ExpressionStatement(
                                        t.CallExpression(
                                            t.Identifier(
                                                "resolve"
                                            ),
                                            [
                                                t.Identifier(
                                                    "user"
                                                )
                                            ]
                                        )
                                    )
                                ]
                            )
                        );

                        path.node.argument = t.NewExpression(
                            t.Identifier(
                                "Promise"
                            ),
                            [
                                t.ArrowFunctionExpression(
                                    [
                                        t.Identifier(
                                            "resolve"
                                        ),
                                        t.Identifier(
                                            "reject"
                                        )
                                    ],
                                    t.BlockStatement(
                                        [
                                            t.ExpressionStatement(
                                                path
                                                    .node
                                                    .argument
                                            )
                                        ]
                                    )
                                )
                            ]
                        );
                    }
                }
            }
        }
    };
};
