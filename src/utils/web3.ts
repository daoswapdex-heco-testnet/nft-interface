import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getNetwork } from "@/utils/chain";

const CHAIN_ID = 256;
const INFURA_ID = ''; // '3cf2b1ad66f842fd9b45cbd51f945b84';


// 监听钱包事件 OK
async function subscribeProvider(provider: any, web3: Web3, web3Modal: Web3Modal) {
  if (!provider.on) {
    return;
  }
  provider.on("accountsChanged", async () => {
    window.location.reload();
  });
  provider.on("chainChanged", () => {
    window.location.reload();
  });
  provider.on("connect", (info: { chainId: number }) => {
    console.log(info);
  });
  provider.on("disconnect", async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    web3Modal.clearCachedProvider();
  });
}

// 获取Provider配置 OK
function getProviderOptions() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      }
    }
  };
  return providerOptions;
}

// 初始化web3 OK
function initWeb3(provider: any) {
  const web3 = new Web3(provider);

  // web3.eth.extend({
  //   methods: [
  //     {
  //       name: "chainId",
  //       call: "eth_chainId",
  //       outputFormatter: web3.utils.hexToNumber
  //     }
  //   ]
  // });

  return web3;
}

// 实例化Web3Modal
function getWeb3Modal() {
  return new Web3Modal({
    network: getNetwork(CHAIN_ID),
    cacheProvider: true,
    providerOptions: getProviderOptions()
  });
}

/**
 * 初始化 web3
 * @returns new Web3
 */
export async function initConnect() {
  const web3Modal = getWeb3Modal();
  const provider = await web3Modal.connect();
  const web3 = initWeb3(provider);
  await subscribeProvider(provider, web3, web3Modal);
  const accounts = await web3.eth.getAccounts();
  const account = Web3.utils.toChecksumAddress(accounts[0]);
  return {
    web3,
    web3Modal,
    account
  };
}

/**
 * 格式化Token
 * @returns token
 */
export function toChecksumAddress(token: string) {
  return Web3.utils.toChecksumAddress(token);
}

/**
 * 检查Token
 * @returns token
 */
export function checkAddressChecksum(token: string) {
  return Web3.utils.checkAddressChecksum(token);
}

/**
 * 获取合约
 * @returns contract
 */
export function getContract(contractJson: any, token: string, web3: Web3) {
  return getContractByABI(contractJson.abi, token, web3);
}

/**
 * 获取合约
 * @returns contract
 */
export function getContractByABI(contractABI: any, token: string, web3: Web3) {
  if (!token) {
    return new web3.eth.Contract(contractABI);
  } 
    return new web3.eth.Contract(contractABI, toChecksumAddress(token));
  
}

/**
 * 格式化Wei To Ether
 * @returns etherValue
 */
export function weiToEther(amount: number, decimals: number) {
  const decimalsVal = decimals || 18;
  // eslint-disable-next-line no-restricted-properties
  return amount / Math.pow(10, decimalsVal);
}

/**
 * 格式化Ether To Wei
 * @returns weiValue
 */
export function etherToWei(amount: number, web3: Web3) {
  return web3.utils.toWei(amount.toString(), "ether");
}
