module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.pinimg.com", "i.mydramalist.com", "pbs.twimg.com"],
  },

  env: {
    DATABASE_URI:
      "mongodb+srv://yanvenuslab:eSpU77xvkep9ucv8ArUn@cluster0.umd4j.mongodb.net/meetup?retryWrites=true&w=majority",

    JWT_SECRETE: "ilovekoreanactresses",
    JWT_EXPIRES_IN: "24h",

    GOOGLE_CLIENT_ID:
      "895580960854-3592h7q8iree3mepujk3re2dctcajg06.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
};
