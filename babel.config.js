module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./app'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.ts',
                    '.tsx',
                    '.json'
                ],
                alias: {
                    tests: ['./tests/'],
                    '@components': './app/components',
                    '@screens': './app/screens',
                    '@constants': './app/constants',
                    '@lib': './app/lib',
                    '@database': './app/database',
                    '@typings': './app/typings'
                }
            }
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
}
