const withSass = require("@zeit/next-sass");
module.exports = withSass({
  poweredByHeader: false,
  amp: true
});

// module.exports = {poweredByHeader: false,}
