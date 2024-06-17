module.exports = {
    extends: require.resolve('@umijs/max/eslint'),
    rules: {
        // 取消校验 加上下面的这两句
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off"
    }
};
