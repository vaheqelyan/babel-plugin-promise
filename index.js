module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AssignmentExpression(path) {
                let isPromise = path.node.left.name;
                if (isPromise === "promise") {
                    console.log(path.node);
                }
            }
        }
    };
};
