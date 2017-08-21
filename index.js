module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            Identifier(path) {
                console.log(path.parentPath.type);
            }
        }
    };
};
