const basePath = '/vehiclecomponent';

module.exports = {
  basePath,
  assetPrefix: basePath,
  env: {
    API_PATH: basePath + '/api'
  },
  rewrites() {
    return [
      {
        source: '/api/autocatalogs/:path*',
        destination: `${process.env['apps.autocatalogs.ws']}/autocatalogs/api/:path*`
      }
    ];
  }
};
