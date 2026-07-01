# Local Setup Guide

## 1. Environment Variables

Copy the `.env.example` file:
```bash
cp .env.example .env
```
Fill in the `FEE_BUMP_SECRET_KEY` with a funded testnet account key. You can generate and fund a testnet account using the Stellar Laboratory.

## 2. Stellar Testnet Connection

By default, the application is configured to use the public Soroban Testnet RPC (`https://soroban-testnet.stellar.org`).
If you need to test against a local network (like Stellar Quickstart), change the `RPC_URL` in your `.env` file to `http://localhost:8000/soroban/rpc`.

## 3. Running the Service

Install dependencies:
```bash
npm install
```
Start the local server:
```bash
npm run dev
```
Use tools like Postman to hit the `POST /submit-escrow` endpoint to simulate the bot sending a request.
