module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            ExpressionStatement(path) {
                let comment = path.node.leadingComments;
                console.log(comment[0]);
            }
        }
    };
};
