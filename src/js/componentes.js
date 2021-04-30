import { Todo,TodoList } from "../classes";
import { todoList } from "../index"

//Referencia
const divTodoList = document.querySelector(".todo-list")
const input = document.querySelector(".new-todo");
const btnButton = document.querySelector(".clear-completed");
const filter = document.querySelector(".filters");

export const addTodoHtml = (todo) =>{
    
    const htmlTodo =`
    <li class="${ todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.completed ? 'checked' : ''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo

    divTodoList.appendChild(div.firstElementChild) //lo uqe queremos es poner el li y no el div sino se mete con un div no sale

    return div
}

input.addEventListener('keyup',(e)=>{
    if( e.keyCode === 13 && input.value.length > 0){
        const nuevoTodo = new Todo(input.value);
        todoList.addtask(nuevoTodo);
        addTodoHtml(nuevoTodo);
        input.value = ""
    }
})

divTodoList.addEventListener("click",(e)=>{
    
    const nameElement = e.target.localName; //te dice que etiqueta es
    const todoElement = e.target.parentElement.parentElement;

    const todoId = todoElement.dataset.id;

    if( nameElement.includes("input")){
        todoList.isCompleted(todoId);
        todoElement.classList.toggle("completed");
    } else if(nameElement.includes("button")){
        todoList.deleteTask(todoId);
        divTodoList.removeChild(todoElement)
    }

})

btnButton.addEventListener('click',()=>{
    const tasks = document.querySelectorAll(".todo-list li");
    todoList.deleteComplete();
    
    tasks.forEach(task=>{
        if( task.classList.contains("completed")){
            task.remove();
        }
    })
})

filter.addEventListener('click',(e)=>{

    if(!e.target.text) return;
    const childrenDiv =[...divTodoList.children];
    console.log(childrenDiv)


    childrenDiv.forEach(li => {
        li.classList.remove('hidden');
        const iscompleted = li.classList.contains("completed") 
        
        switch (e.target.text) {
            case "Pendientes":
                if(!iscompleted){
                    li.classList.add("hidden")
                }
                
                break;
            case "Complete":
                if(iscompleted){
                    li.classList.add("hidden")
                }
                    
            break;
        }
    });
})