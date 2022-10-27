import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

type TodoSubTask = {
    id: string;
    text: string;
    done: boolean;
};

type TodoTask = {
    id: string;
    text: string;
    done: boolean;
    subTasks: Array<TodoSubTask>;
};

const addTodo = (todos: TodoTask[], text: string): TodoTask[] => [
    ...todos,
    {
        id: uuidv4(),
        done: false,
        text,
        subTasks: [],
    }
];

class Store {
    todoTasks: TodoTask[] = [];
    newTodo: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    addTodo() {
        this.todoTasks = addTodo(this.todoTasks, this.newTodo);
        this.newTodo = "";
    }
}

const store = new Store();
export default store;