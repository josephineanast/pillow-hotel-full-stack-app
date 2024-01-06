/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://pillow.vercel.app",
    DB_LOCAL_URI: "https://pillow.vercel.app",
    DB_URI:
      "mongodb+srv://josephinedjojo:<cLvakQpQOWJDCmVD>@pillow.qwk4ngi.mongodb.net/pillow?retryWrites=true&w=majority",

    CLOUDINARY_CLOUD_NAME: "dy9jdltpw",
    CLOUDINARY_API_KEY: "848126114554635",
    CLOUDINARY_API_SECRET: "ErnnjaMgC-1b1plu3HrJpkFszA8",

    SMTP_HOST: "sandbox.smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "8c6fe281e26167",
    SMTP_PASS: "c2a9a0240654a8",
    SMTP_FROM_EMAIL: "noreply@pillow.com",
    SMTP_FROM_NAME: "Pillow",

    GEOCODER_API_KEY: "fzpa2APSkuSY1n1EnsyjuQYy7MlSInqg",
    GEOCODER_PROVIDER: "mapquest",

    MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoiZGpvam8xMjMiLCJhIjoiY2xxajgyeHU5MXNidDJqbWVtcWs2N3M2OCJ9.QwsyLcO6qJiQ-zG5lqMh3w",

    STRIPE_SECRET_KEY:
      "sk_test_51OSO38HbCJr3AB7OOgiglsm5zXsCmODDPJEFWaoiIWOzeB6AbjddTP389hjAVWOkcFyThv3F6wbMifgRcBbA95UQ00LRRPEUEc",
    STRIPE_WEBHOOK_SECRET: "whsec_0JV2x3t0Iq5z1LrJeZZMpEtgTgqBn473",

    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "CHDSUIEFHCVIUSDEJZKJCFLDSK",
    GOOGLE_CLIENT_ID:
      "1004593914670-5a83sbhj6k9k23t0cpgnur2ffpln6kif.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
