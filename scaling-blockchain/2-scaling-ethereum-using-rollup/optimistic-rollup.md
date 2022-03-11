---
description: '[e.g., Optimism, Arbitrum] Same principle as zkRollup, but no SNARK proof'
---

# Optimistic Rollup

Instead: coordinator posts Tx data on chain without a proof

* Then give a few days for validators to complain:
  * If a posted Tx is invalid =>
    * anyone can submit a fraud proof and win a reward,
    * Rollup server gets slashed.
