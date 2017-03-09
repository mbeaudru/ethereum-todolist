import React, { Component } from 'react';
import TodoListContract from '../build/contracts/TodoList.json';
import web3, {
  selectContractInstance, setDefaultAccount, mapReponseToJSON
} from './web3';
import styled, { injectGlobal } from 'styled-components';

class TodoList extends Component {
  render() {
    return (
      <Container>
        <Header>
          <H1>Ethereum TodoList</H1>
          <H2>Let's get started in developping blockchain-based apps</H2>
        </Header>
        <InputText
          value={this.state.newItem}
          placeholder="Type in a new item"
          onChange={e => this.setState({ newItem: e.target.value })}
          onKeyDown={this.handleSubmit}
        />
        <List>
          {this.state.todoItems.map((item, itemIndex) =>
            <TodoItem
              key={itemIndex}
              onClick={() => this.deleteTodoItem(itemIndex)}
            >
              {item.value}
            </TodoItem>
          )}
        </List>
      </Container>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      todoItems: [],
      newItem: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
  }

  async componentWillMount() {
    // The default account is the one the transactions & call are made from.
    // It can be overwritten with the "from" option.
    await setDefaultAccount(web3.eth.accounts[0]);

    this.todoList = await selectContractInstance(TodoListContract);

    const todoItems = await this.getTodoItems();
    this.setState({ todoItems });
  }

  async handleSubmit({ key }) {
    if (key !== 'Enter') return;
    const todoList = await selectContractInstance(TodoListContract);
    await todoList.addTodoItem(this.state.newItem);
    const todoItems = await this.getTodoItems();

    this.setState({ todoItems, newItem: '' });
  }

  async getTodoItems() {
    const todoItemsResp = await this.todoList.getTodoItems.call();
    const todoItems = mapReponseToJSON(
      todoItemsResp, ['value', 'active'], 'arrayOfObject'
    );

    return todoItems;
  }

  async deleteTodoItem(position) {
    await this.todoList.deleteTodoItem(position);
    const todoItems = await this.getTodoItems();

    this.setState({ todoItems });
  }
}

export default TodoList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
  color: white;
  font-size: 55pt;
  margin-bottom: 0;
`;

const H2 = styled.h2`
  color: white;
  font-size: 30pt;
`;

const InputText = styled.input`
  padding: 15px 20px 15px 20px;
  width: 400px;
  border-radius: 50px;
  border-width: 0;
  margin-bottom: 10px;

  &:focus {
    outline: none;
  }
`;

const List = styled.ul`
  width: 440px;
  list-style-type: none;
  padding: 0;
`;

const TodoItem = styled.li`
  padding: 15px;
  padding-left: 30px;
  border-bottom: 1px solid #f3f3f3;
  cursor: pointer;
  background-color: white;

  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-child {
    border-bottom: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:hover {
    background-color: #f3f3f3;
  }
`;

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  body {
    background-color: #3b7caf;
    font-family: 'Roboto', sans-serif;
  }
`