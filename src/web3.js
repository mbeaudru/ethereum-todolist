import Web3 from 'web3';
import contract from 'truffle-contract';
import _ from 'lodash';

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

export const mapReponseToJSON = (contractResponse, parameters, type) => {
  switch (type) {
    case 'arrayOfObject': {
      const result = [];
      contractResponse.forEach((paramValues, paramIndex) => {
        const paramName = parameters[paramIndex];
        paramValues.forEach((paramValue, itemIndex) => {
          const item = _.merge({}, _.get(result, [itemIndex], {}));
          if (typeof paramValue === 'string') {
            paramValue = web3.toUtf8(paramValue).trim();
          }
          item[paramName] = paramValue;
          result[itemIndex] = item;
        })
      });

      return result;
    }
    default:
      return contractResponse;
  }
}