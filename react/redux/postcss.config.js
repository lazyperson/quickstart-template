module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['Chrome > 65', 'Firefox > 55', 'Safari > 9'],
        }),
    ],
};
