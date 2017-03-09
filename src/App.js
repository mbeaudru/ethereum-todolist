import React, { Component } from 'react';
import TodoListContract from '../build/contracts/TodoList.json';
import web3, { selectContractInstance, setDefaultAccount } from './web3';

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
    // The default account is the one the transactions & call are made from.
    // It can be overwritten with the "from" option.
    await setDefaultAccount(web3.eth.accounts[0]);

    const todoList = await selectContractInstance(TodoListContract);
  }
}

export default App
