import { Todo } from "./index"
export class TodoList{


    constructor(){
        this.loadLocalStorage()
    }

    addtask(task){
        this.todos.push(task)
        this.saveLocalStorage()
    }

    deleteTask(id){
        this.todo = this.todos.filter( todo=> todo.id != id)
        this.saveLocalStorage()
    }

    isCompleted(id){
        for(let todo of this.todos){
            
            if(todo.id == id){
                todo.completed = !todo.completed
                this.saveLocalStorage()
                break
            }

        }
    }

    deleteComplete(){
        this.todo = this.todos.filter( todo=> !todo.completed)

        this.saveLocalStorage()
    }

    saveLocalStorage(){
        localStorage.setItem("todo", JSON.stringify(this.todos))
    }

    deleteLocalStorage(){

    }

    loadLocalStorage(){
        this.todos = localStorage.getItem('todo') ? 
            this.todos = JSON.parse(localStorage.getItem('todo'))
            :
            []
        //Para que aplique la instancia y use los metodos de la clases    
        this.todos = this.todos.map(Todo.fromJson); 
    }
}