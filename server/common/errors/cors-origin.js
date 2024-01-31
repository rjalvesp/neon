class CorsOriginError extends Error {
  /* istanbul ignore next */
  constructor(text) {
    super(text || 'Not allowed by CORS');
    this.name = 'CorsOriginError';
    this.code = 'CorsOriginError';
  }
}

module.exports = CorsOriginError;
