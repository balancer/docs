# Emergency subDAO

## Concept

The [Emergency DAO](https://dao.curve.fi/emergencymembers) is an idea pioneered by Curve that empowers a small group to “kill” pools and gauges in the event of malicious activity and/or potential loss of funds. The Balancer emergency subDAO was established after the following [vote](https://vote.balancer.fi/#/proposal/0x63fab7ab9ef5b9579dabb82058b8ea309e39c766d435438b55fff8db7c1f69fd).

## Members

aThe Balancer Emergency subDAO is a 4-of-7 multisig with the following members as appointed by [this vote](https://forum.balancer.fi/t/form-the-emergency-subdao/3197):

| Person     | Address                                      |
| :--------- | :------------------------------------------- |
| Solarcurve | `0x512fce9B07Ce64590849115EE6B32fd40eC0f5F3` |
| Mike B     | `0xF01Cc7154e255D20489E091a5aEA10Bc136696a8` |
| Zekraken   | `0xafFC70b81D54F229A5F50ec07e2c76D2AAAD07Ae` |
| Zen Dragon | `0x7c2eA10D3e5922ba3bBBafa39Dc0677353D2AF17` |
| Markus     | `0x6bB4720473d4D7133f944785e5EE1A650C07f34e` |
| Fernando   | `0xbbF0Ae5195444264364CA7eb7E3BB1971B4c3eCb` |
| Nico       | `0x815d654E930E840D0E0Ee1B18FFc8Fb4ddA4c6B3` |

## Multisigs

The Balancer Emergency subDAO operates through the following multsigs which are authorized to kill gauges.

| Gauge      | Address                                                                                                                                                             |
|:-----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Ethereum   | <span class="address-link">[0xA29F61256e948F3FB707b4b3B138C5cCb9EF9888](https://etherscan.io/address/0xA29F61256e948F3FB707b4b3B138C5cCb9EF9888)</span>             |
| Polygon    | <span class="address-link">[0x3c58668054c299bE836a0bBB028Bee3aD4724846](https://polygonscan.com/address/0x3c58668054c299bE836a0bBB028Bee3aD4724846)</span>          |
| Arbitrum   | <span class="address-link">[0xf404C5a0c02397f0908A3524fc5eb84e68Bbe60D](https://arbiscan.io/address/0xf404C5a0c02397f0908A3524fc5eb84e68Bbe60D)</span>              |
| Optimism   | <span class="address-link">[0xd4c87b33afcE39F1E3F4aF1ce8fFFF7241d9128B](https://optimistic.etherscan.io/address/0xd4c87b33afcE39F1E3F4aF1ce8fFFF7241d9128B)</span>  |
 | Gnosis     | <span class="address-link">[0xd6110A7756080a4e3BCF4e7EBBCA8E8aDFBC9962](https://app.safe.global/gno:0xd6110A7756080a4e3BCF4e7EBBCA8E8aDFBC9962/home)</span>         |

## Specifications

As per [this vote](https://forum.balancer.fi/t/form-the-emergency-subdao/3197)

| Call          | Contract(s)                                                                                      | Purpose                                                                              |
| :------------ | :----------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| killGauge     | Gauge contracts                                                                                  | To stop all distribution of BAL to a gauge.                                          |
| denylistToken | [ProtocolFeeWithdrawer](https://etherscan.io/address/0x5ef4c5352882b10893b70DbcaA0C000965bd23c5) | Instructs the ProtocolFeeWithdrawer to blacklist fee collection of a specific token. |

As per [BIP-139](https://forum.balancer.fi/t/bip-139-update-emergency-subdao-permissions/4174)
The Emergency DAO Multsigis are authorized to make the following calls to protocol contracts:

| Call               | Contract(s)            | Purpose                                                                                                                               |
| :----------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| enableRecoveryMode | Pool contracts         | for Pools to provide a simple way to exit pools proportionally at the cost of disabling protocol fees(swaps, joins, etc. still work). |
| disable            | Pool factory contracts | to shutdown pool factories. This is to prevent further pools from being created, existing pools remain unaffected.                    |
