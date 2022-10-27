import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

type TodoSubTask = {
    id: string;
    text: string;
    done: boolean;
};

type TodoTask = {
    id: string;
    isDeleting: boolean,
    text: string;
    text2: string;
    done: boolean;
    subTasks: Array<TodoSubTask>;
};

const addTodo = (todos: TodoTask[], text: string): TodoTask[] => [
    ...todos,
    {
        id: uuidv4(),
        isDeleting: false,
        done: false,
        text,
        text2: "",
        subTasks: [],
    }
];

class Store {
    todoMap: Map<string, TodoTask> = new Map();
    todoIds: Array<string> = [];
    todoTasks: TodoTask[] = [];
    newTodo: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    public addTodoMap = () => {
        const id = uuidv4();
        this.todoMap.set(id, {
            id,
            isDeleting: false,
            done: false,
            text: this.newTodo,
            text2: "",
            subTasks: [],
        });
        this.todoIds.push(id);
        this.newTodo = "";
    };

    public changeToDoMap = (id: string, value: string) => {
        const todo = this.todoMap.get(id);
        if (!todo) {
            return;
        }
        todo.text = value;
        this.todoMap.set(id, todo);
        // console.info("ch map: ", this.todoMap);
    };

    public change2ToDoMap = (id: string, value: string) => {
        const todo = this.todoMap.get(id);
        if (!todo) {
            return;
        }
        todo.text2 = value;
        this.todoMap.set(id, todo);
        // console.info("ch map: ", this.todoMap);
    };

    public checkToDoMap = (id: string, value: boolean) => {
        const todo = this.todoMap.get(id);
        if (!todo) {
            return;
        }
        todo.done = value;
        this.todoMap.set(id, todo);
        // console.info("ck map: ", this.todoMap);
    };

    public editNewTodo = (val: string) => {
        this.newTodo = val;
    }

    public removeToDoMap = (id: string) => {
        this.todoMap.delete(id);
        const idx = this.todoIds.indexOf(id);
        if (idx === -1) {
            return;
        }
        this.todoIds.splice(idx, 1);
    };

    addTodo() {
        this.todoTasks = addTodo(this.todoTasks, this.newTodo);
        this.newTodo = "";
    }
}

const store = new Store();
export default store;