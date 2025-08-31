"use client";

import {
  Asset,
  BASE_FEE,
  Horizon,
  Networks,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

/**
 * Sends native XLM from `senderPubKey` to `destPubKey` on TESTNET.
 * `amount` must be a string with up to 7 decimals (SDK requirement).
 */
export async function sendTestnetPayment({
  senderPubKey,
  destPubKey,
  amount,
}: {
  senderPubKey: string;
  destPubKey: string;
  amount: string;
}) {
  const HORIZON = "https://horizon-testnet.stellar.org";
  const server = new Horizon.Server(HORIZON);

  // 1) Load source account state (sequence, etc.)
  const source = await server.loadAccount(senderPubKey);

  // 2) Build an unsigned transaction
  const tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: destPubKey,
        asset: Asset.native(), // XLM
        amount,                // string!
      })
    )
    .setTimeout(60)
    .build();

  // 3) Ask Freighter to sign (enforce TESTNET to avoid mismatch)
  const { signedTxXdr, error } = await signTransaction(tx.toXDR(), {
    networkPassphrase: Networks.TESTNET,
    address: senderPubKey,
  });
  if (error) throw new Error(error);

  // 4) Submit the signed XDR to Horizon
  const signedTx = TransactionBuilder.fromXDR(signedTxXdr, Networks.TESTNET);
  return server.submitTransaction(signedTx);
}
