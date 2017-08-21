module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            CallExpression(path) {
                console.log(path.leadingComments);
            }
        }
    };
};
