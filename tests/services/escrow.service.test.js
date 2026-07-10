const { createEscrowService } = require('../../src/services/escrow.service');
const StellarSdk = require('stellar-sdk');

describe('Escrow Service', () => {
  let escrowService;
  let transactionBuilderMock;
  const mockConfig = {
    // Valid Ed25519 Secret Seed for testing purposes only
    FEE_BUMP_SECRET_KEY: StellarSdk.Keypair.random().secret()
  };
  const mockSponsorPublicKey = StellarSdk.Keypair.fromSecret(mockConfig.FEE_BUMP_SECRET_KEY).publicKey();

  beforeEach(() => {
    transactionBuilderMock = {
      buildTransaction: jest.fn().mockResolvedValue('MOCK_XDR')
    };

    escrowService = createEscrowService({
      transactionBuilder: transactionBuilderMock,
      config: mockConfig
    });
  });

  it('should construct create escrow transaction', async () => {
    const validBuyer = StellarSdk.Keypair.random().publicKey();
    const validSeller = StellarSdk.Keypair.random().publicKey();
    
    const params = {
      buyer: validBuyer,
      seller: validSeller,
      amount: '100'
    };

    const xdr = await escrowService.createEscrow(params);
    
    expect(xdr).toBe('MOCK_XDR');
    expect(transactionBuilderMock.buildTransaction).toHaveBeenCalledWith(
      mockSponsorPublicKey, // source address
      'create_escrow',
      expect.any(Array) // scVal parameters
    );
  });

  it('should construct lock escrow transaction', async () => {
    const xdr = await escrowService.lockEscrow({ escrowId: '123' });
    expect(xdr).toBe('MOCK_XDR');
    expect(transactionBuilderMock.buildTransaction).toHaveBeenCalledWith(
      mockSponsorPublicKey,
      'lock_funds',
      expect.any(Array)
    );
  });

  it('should construct release escrow transaction', async () => {
    const xdr = await escrowService.releaseEscrow({ escrowId: '123' });
    expect(xdr).toBe('MOCK_XDR');
    expect(transactionBuilderMock.buildTransaction).toHaveBeenCalledWith(
      mockSponsorPublicKey,
      'release',
      expect.any(Array)
    );
  });

  it('should construct refund escrow transaction', async () => {
    const xdr = await escrowService.refundEscrow({ escrowId: '123' });
    expect(xdr).toBe('MOCK_XDR');
    expect(transactionBuilderMock.buildTransaction).toHaveBeenCalledWith(
      mockSponsorPublicKey,
      'refund',
      expect.any(Array)
    );
  });
});
