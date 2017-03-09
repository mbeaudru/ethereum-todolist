import React, { Component } from 'react';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import web3, { selectContractInstance } from './web3';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>The stored value is: {this.state.storageValue}</p>
        <p>The doubled value is: {this.state.doubleValue}</p>
      </div>
    );
  }

  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      doubleValue: 0
    };
  }

  async componentWillMount() {
    const mainAccount = web3.eth.accounts[0];
    const simpleStorage = await selectContractInstance(SimpleStorageContract);
    await simpleStorage.set(500, {from: mainAccount});

    const storageValue = await simpleStorage.get.call(mainAccount);
    const doubleValue = await simpleStorage.double(50);

    this.setState({
      doubleValue: doubleValue.toString(),
      storageValue: storageValue.toString()
    });
  }
}

export default App
