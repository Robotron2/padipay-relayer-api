const StellarSdk = require('stellar-sdk');
const StellarError = require('../errors/StellarError');
const ConfigError = require('../errors/ConfigError');

/**
 * Factory function for Stellar Service handling transaction operations like signing.
 * @param {Object} deps - Dependencies
 * @param {Object} deps.config - Application configuration
 */
const createStellarService = ({ config }) => {
  /**
   * Signs a transaction (or fee bump transaction) using the configured sponsor account.
   * @param {string} transactionXdr - Base64 encoded XDR of the unsigned transaction
   * @returns {string} Base64 encoded signed transaction XDR
   */
  const signTransaction = (transactionXdr) => {
    if (!config.FEE_BUMP_SECRET_KEY) {
      throw new ConfigError('FEE_BUMP_SECRET_KEY is missing from configuration');
    }

    try {
      const sponsorKeypair = StellarSdk.Keypair.fromSecret(config.FEE_BUMP_SECRET_KEY);
      const transaction = StellarSdk.TransactionBuilder.fromXDR(transactionXdr, config.NETWORK_PASSPHRASE);
      
      transaction.sign(sponsorKeypair);
      
      return transaction.toXDR();
    } catch (error) {
      throw new StellarError(`Failed to sign transaction: ${error.message}`);
    }
  };

  return { signTransaction };
};

module.exports = { createStellarService };
