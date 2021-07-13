const supportedChains = [
  {
    name: "HECO Mainnet",
    short_name: "heco-mainnet",
    chain: "HECO",
    network: "heco-mainnet",
    chain_id: 128,
    network_id: 128,
    rpc_url: "https://http-mainnet-node.huobichain.com",
    native_currency: {
      symbol: "HT",
      name: "Huobi ECO Chain",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  },
  {
    name: "HECO Testnet",
    short_name: "heco-testnet",
    chain: "HECO",
    network: "heco-testnet",
    chain_id: 256,
    network_id: 256,
    rpc_url: "https://http-testnet.hecochain.com",
    native_currency: {
      symbol: "HT",
      name: "Huobi ECO Chain",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  }
];

function getChainData(chainId: number) {
  const chainData = supportedChains.filter(
    chain => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = process.env.VUE_APP_INFURA_ID;

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl
    };
  }

  return chainData;
}

// 获取网络配置 OK
export function getNetwork(chainId: number) {
  const { network } = getChainData(chainId);
  return network;
}
