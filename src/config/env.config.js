require('dotenv').config();

const requiredVariables = [
  'PORT',
  'RPC_URL',
  'NETWORK_PASSPHRASE',
  'CONTRACT_ID',
  'FEE_BUMP_SECRET_KEY'
];

const missingVariables = requiredVariables.filter(
  (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
  console.error(`FATAL ERROR: Missing required environment variables: ${missingVariables.join(', ')}`);
  process.exit(1);
}

module.exports = {
  PORT: process.env.PORT || 3000,
  RPC_URL: process.env.RPC_URL,
  NETWORK_PASSPHRASE: process.env.NETWORK_PASSPHRASE,
  CONTRACT_ID: process.env.CONTRACT_ID,
  FEE_BUMP_SECRET_KEY: process.env.FEE_BUMP_SECRET_KEY,
};
