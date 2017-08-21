module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            AssignmentExpression(path) {
                console.log(path.node.left.node.name);
            }
        }
    };
};
