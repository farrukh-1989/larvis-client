import { isStringValid } from './common';

describe('IsStringValid tests', () => {
  it('should correctly determine string validity', () => {
    const isValid = isStringValid('');
    expect(isValid).not.toBeTruthy();
  });
});
