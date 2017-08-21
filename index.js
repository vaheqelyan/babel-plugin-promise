module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            Identifier(path) {
                if (path.name === "async") {
                    console.log(path.parentPath.type);
                }
            }
        }
    };
};
