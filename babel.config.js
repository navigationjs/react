module.exports = {
  presets: ['@babel/preset-react', ['@babel/preset-env', {
    targets: {
      browsers: ["last 2 versions", "ie >= 9"] 
    }
  }]],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
};
