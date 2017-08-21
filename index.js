module.exports = function(babel) {
    const t = babel.types;

    function moriMethod(name) {
        const expr = t.memberExpression(t.identifier("mori"), t.identifier(name));
        expr.isClean = true;
        return expr;
    }

    return {
        visitor: {}
    };
};
