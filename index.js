module.exports = function(babel) {
    const t = babel.types;
    return {
        visitor: {
            Identifier(path) {
                if (path.node.name === "async") {
                    console.log(path.node.parentPath);
                }
            }
        }
    };
};
