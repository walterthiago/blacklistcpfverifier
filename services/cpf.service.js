function cpfIsValid(cpf) {
  if (!cpf || cpf.toString().length > 14) {
    return Promise.resolve(false);
  }
  return Promise.resolve(/\d{3}.\d{3}.\d{3}-\d{2}/g.test(cpf.toString()));
}

module.exports = exports = {
  cpfIsValid
}