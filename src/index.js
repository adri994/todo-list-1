
import './styles.css';
import {Todo,TodoList} from "./classes/";
import {addTodoHtml} from "./js/componentes"

export const todoList = new TodoList();

todoList.todos.forEach(addTodoHtml);

