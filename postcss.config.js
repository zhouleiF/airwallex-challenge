module.exports = {
  plugins: {
    autoprefixer: {},
    'px2rem-postcss-custom': [
      {
        remUnit: 75,
        exclude: /node_modules/i
      }
    ]
  }
}
