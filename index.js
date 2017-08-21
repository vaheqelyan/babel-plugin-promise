module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AssignmentExpression(path) {
                let isPromise = path.node.left.name;
                if (isPromise === "promise") {
                    let arrow = path.node.right;
                    console.log(arrow.params[0].type);
                }
            }
        }
    };
};
