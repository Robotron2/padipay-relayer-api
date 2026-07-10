const { parseTransactionStatus } = require('../../src/utils/status.parser');

describe('Status Parser', () => {
  it('should parse SUCCESS status', () => {
    const result = parseTransactionStatus({ status: 'SUCCESS' }, 'hash');
    expect(result.status).toBe('SUCCESS');
    expect(result.txId).toBe('hash');
  });

  it('should parse NOT_FOUND status', () => {
    const result = parseTransactionStatus({ status: 'NOT_FOUND' }, 'hash');
    expect(result.status).toBe('NOT_FOUND');
    expect(result.txId).toBe('hash');
  });

  it('should parse FAILED status', () => {
    const result = parseTransactionStatus({ status: 'FAILED' }, 'hash');
    expect(result.status).toBe('FAILED');
    expect(result.txId).toBe('hash');
  });

  it('should parse PENDING status as fallback', () => {
    const result = parseTransactionStatus({ status: 'UNKNOWN_OR_PENDING' }, 'hash');
    expect(result.status).toBe('UNKNOWN_OR_PENDING');
    expect(result.txId).toBe('hash');
  });

  it('should return error for undefined response', () => {
    const result = parseTransactionStatus(null);
    expect(result.success).toBe(false);
    expect(result.status).toBe('UNKNOWN');
  });
});
