export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^react-is$": "<rootDir>/node_modules/react-is/index.js",
    "/\\.js$/": ".js",
  },
};
