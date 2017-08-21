module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            ExpressionStatement(path) {
                console.log(path.leadingComments);
            }
        }
    };
};
