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

  componentWillMount() {
    const mainAccount = web3.eth.accounts[0];
    let simpleStorage = {};
    selectContractInstance(SimpleStorageContract)
      .then(instance => {
        simpleStorage = instance;
        return instance;
      })
      .then(() => simpleStorage.set(500, {from: mainAccount}))
      .then(() => simpleStorage.get.call(mainAccount))
      .then(result => this.setState({ storageValue: result.toString() }));

    selectContractInstance(SimpleStorageContract)
      .then(i => { simpleStorage = i; return i; })
      .then(() => simpleStorage.double(500))
      .then(result => this.setState({ doubleValue: result.toString() }));
  }
}

export default App
