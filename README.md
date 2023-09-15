// Can also be called with these default options
  await validate({
    email: 'name@example.org',
    sender: 'name@example.org',
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: true,
  })
  