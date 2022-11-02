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
        source: '/autocatalogs/:path*',
        destination: 'http://127.0.0.1:3000/autocatalogs/api/:path*'
      }
    ];
  }
};
