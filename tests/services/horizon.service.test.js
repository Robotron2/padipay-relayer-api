const { createHorizonService } = require('../../src/services/horizon.service');
const RpcError = require('../../src/errors/RpcError');
const { parseTransactionStatus } = require('../../src/utils/status.parser');

jest.mock('../../src/utils/status.parser');

describe('Horizon Service', () => {
  let horizonService;
  let mockServer;

  beforeEach(() => {
    mockServer = {
      getTransaction: jest.fn().mockResolvedValue({ status: 'SUCCESS' })
    };
    
    horizonService = createHorizonService({ server: mockServer });
    
    parseTransactionStatus.mockReset();
    parseTransactionStatus.mockReturnValue({ status: 'SUCCESS' });
  });

  describe('getTransactionStatus', () => {
    it('should query transaction and parse status', async () => {
      const txId = 'dummy_tx_id';
      
      const result = await horizonService.getTransactionStatus(txId);
      
      expect(mockServer.getTransaction).toHaveBeenCalledWith(txId);
      expect(parseTransactionStatus).toHaveBeenCalledWith({ status: 'SUCCESS' }, txId);
      expect(result).toEqual({ status: 'SUCCESS' });
    });

    it('should throw RpcError when getTransaction fails', async () => {
      mockServer.getTransaction.mockRejectedValue(new Error('Network failure'));
      
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(horizonService.getTransactionStatus('dummy')).rejects.toThrow(RpcError);

      consoleSpy.mockRestore();
    });
  });
});
