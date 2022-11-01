module.exports = {
  rewrites() {
    return [
      {
        source: '/autocatalogs/api/:path*',
        destination: 'http://127.0.0.1:3000/autocatalogs/api/:path*'
      }
    ];
  }
};
