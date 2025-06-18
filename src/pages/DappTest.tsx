import { InfoContract, InfoContract__factory } from '@/types/ethers-contracts';
import InfoContractABI from '@abis/InfoContract.json';
import { BrowserProvider, Contract } from 'ethers';
import { useEffect, useState } from 'react';
const CONTRACT_ADDRESS = InfoContractABI.networks['5777'].address;
console.log(CONTRACT_ADDRESS, '❀');

declare global {
  interface Window {
    ethereum?: any;
  }
}

const DappTest = () => {
  const [contract, setContract] = useState<InfoContract | null>(null);
  // const contractInstance = new Contract(
  //   CONTRACT_ADDRESS,
  //   InfoContractABI.abi,
  //   signer,
  // ) as unknown as InfoContract;

  useEffect(() => {
    const provider = new BrowserProvider(window.ethereum);
    provider
      .getSigner()
      .then(signer => {
        const contractInstance = InfoContract__factory.connect(CONTRACT_ADDRESS, signer);
        setContract(contractInstance);
      })
      .catch(error => {
        console.error('error', error);
      });
  }, []);

  useEffect(() => {
    if (contract) {
      contract.setInfo('hello dapp', 2);
    }
  }, [contract]);
  return (
    <>
      <h1>DappTest</h1>
    </>
  );
};
export default DappTest;
