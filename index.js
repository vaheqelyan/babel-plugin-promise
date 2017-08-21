module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AssignmentExpression(path) {
                let isPromise = path.node.left.name;
                if (isPromise === "promise") {
                    let expression = path.node.right;
                    let type = expression.callee.type;
                    console.log(expression.arguments);
                }
            }
        }
    };
};
