// eslint-disable-next-line no-undef
module.exports = {
  roots: ["./src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  // Test files resolution pattern
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}
