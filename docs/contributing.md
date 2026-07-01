# Contributing Guidelines

## Security-First Coding

**CRITICAL:** This service handles transaction signing and manages private keys (the Fee Bump Secret Key). Security is the absolute highest priority.

- **No Logging of Secrets**: Never log the `FEE_BUMP_SECRET_KEY` or any part of a user's private key.
- **Sanitize Inputs**: Validate all incoming parameters from the bot before constructing XDR transactions to prevent injection attacks.
- **Limit Exposure**: Limit the capabilities of the Fee Bump account strictly to paying fees, not holding large balances.

## General Rules
- Keep route handlers thin; push logic into `services`.
- Use descriptive `TODO:` comments instead of Issue tags when scaffolding new features.
