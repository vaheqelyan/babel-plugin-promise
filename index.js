module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AssignmentExpression(path) {
                let isPromise = path.node.left.name;
                let promisedName = String;
                if (isPromise === "promise") {
                    let arrow = path.node.right;
                    promisedName = arrow.params[0].name;
                    console.log(arrow.body.callee);
                }
            }
        }
    };
};
