module.exports = {
  build: {
    "index.html": "index.html",
    "security.html": "security.html",
    "app.js": [
      "javascripts/app.js",
      "javascripts/security.js",
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
