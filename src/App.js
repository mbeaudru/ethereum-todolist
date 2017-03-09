import React, { Component } from 'react';
import TodoListContract from '../build/contracts/TodoList.json';
import web3, {
  selectContractInstance, setDefaultAccount, mapReponseToJSON
} from './web3';

class App extends Component {
  render() {
    return (
      <div>
        <input
          value={this.state.newItem}
          placeholder="Type in a new item"
          onChange={e => this.handleInputChange(e)}
          onKeyDown={this.handleSubmit}
        />
        <ul>
          {this.state.todoItems.map((item, key) =>
            <li key={key}>{item.value}</li>
          )}
        </ul>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      todoItems: [],
      newItem: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    // The default account is the one the transactions & call are made from.
    // It can be overwritten with the "from" option.
    await setDefaultAccount(web3.eth.accounts[0]);

    this.todoList = await selectContractInstance(TodoListContract);
    const todoItemsResp = await this.todoList.getTodoItems.call();
    const todoItems = mapReponseToJSON(
      todoItemsResp, ['value', 'active'], 'arrayOfObject'
    );

    this.setState({ todoItems });
  }

  handleInputChange(e) {
    this.setState({ newItem: e.target.value });
  }

  async handleSubmit({ key }) {
    if (key !== 'Enter') return;
    await this.todoList.addTodoItem(this.state.newItem);
    const todoItemsResp = await this.todoList.getTodoItems.call();
    const todoItems = mapReponseToJSON(
      todoItemsResp, ['value', 'active'], 'arrayOfObject'
    );

    this.setState({
      todoItems,
      newItem: ''
    });
  }
}

export default App
