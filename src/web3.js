import Web3 from 'web3';
import contract from 'truffle-contract';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');

const web3 = new Web3(provider);
export default web3;

export const selectContractInstance = (contractBuild) => {
  return new Promise(res => {
    const myContract = contract(contractBuild);
    myContract.setProvider(provider);
    myContract
      .deployed()
      .then(instance => res(instance));
  })
}

export const setDefaultAccount = (account) => Promise.resolve(
  web3.eth.defaultAccount = account
);
