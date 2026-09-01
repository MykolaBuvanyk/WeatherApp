const permissionDeniedError = {
  code: 1,
  message: 'Location permission denied',
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

module.exports = {
  getCurrentPosition: jest.fn((_success, error) => {
    error?.(permissionDeniedError);
  }),
  setRNConfiguration: jest.fn(),
};
