export type FeaturedArtifactData = {
    url: string;
    description: string;
    imgSrc?: string;
}

export const featuredArtifacts: FeaturedArtifactData[] = [
  {
    url: 'https://raw.githubusercontent.com/fuji-money/tapscripts/main/artifacts/alpha/fuji.ionio.json',
    description:
      'Synthetic assets are collateral-backed assets whose value fluctuates depending on a reference price. The reference price is determined by an oracle.',
  },
  {
    url: 'https://raw.githubusercontent.com/louisinger/vault-calculator/master/src/calculator.json',
    description:
      'Lock your coin with a simple public addition + a wallet signature.',
  },
  {
    url: 'https://raw.githubusercontent.com/ionio-lang/ionio/master/examples/apps/src/artifacts/single_hop_vault.json',
    description: 'Cold storage vault with a delayed hot key path.',
  },
  {
    url: 'https://raw.githubusercontent.com/ionio-lang/ionio/master/examples/marina-app/src/transfer_with_timelock.json',
    description: 'Lock your coin with a signature and a timelock.',
  },
];
