module.exports = {
    presets: [
        [
            "@babel/preset-react",
            {
                runtime: "automatic" // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
            }
        ],
        "@babel/typescript",
    ],
};