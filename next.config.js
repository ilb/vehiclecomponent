const basePath = "/vehiclecomponent";

module.exports = {
  basePath,
  assetPrefix: basePath,
  env: {
    API_PATH: `${basePath}/api`,
  },
  /**
   * @returns {Object}
   */
  rewrites() {
    return [
      {
        source: "/api/autocatalogs/:path*",
        destination: "https://bb.avclick.ru/autocatalogs/api/:path*",
      },
    ];
  },
};
