import { Fragment, memo } from "react";
import { Button , Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react";
import store from "../store";

type TodoItemProps = {
    onChange: Function,
    onChange2: Function,
    onCheck: Function,
    onRemove: Function,
    todoDone: boolean,
    todoId: string,
    todoText: string,
    todoText2: string,
};
const propsAreEqual = (prev: TodoItemProps, next: TodoItemProps) => {
    const isEqual = prev.todoId === next.todoId && 
        prev.todoText === next.todoText &&
        prev.todoText2 === next.todoText2 &&
        prev.todoDone === next.todoDone;
    if (!isEqual) {
        console.info("id prev: ", prev.todoId, ", next: ", next.todoId);
        if (prev.todoText !== next.todoText) {
            console.info("text prev: ", prev.todoText, ", next: ", next.todoText);
        }
        if (prev.todoText2 !== next.todoText2) {
            console.info("text2 prev: ", prev.todoText2, ", next: ", next.todoText2);
        }
        if (prev.todoDone !== next.todoDone) {
            console.info("done prev: ", prev.todoDone, ", next: ", next.todoDone);
        }
    }
    return isEqual;
}
const TodoItem = (props: TodoItemProps) => {
    return (
        <Flex pt={2}>
            <Checkbox onChange={(evt) => props.onCheck(props.todoId, evt.target.checked)} checked={props.todoDone} />
            <span>ONE</span>
            <Input mx={2} value={props.todoText} onChange={(evt) =>  props.onChange(props.todoId, evt.target.value)} />
            <span>TWO</span>
            <Input mx={2} value={props.todoText2} onChange={(evt) =>  props.onChange2(props.todoId, evt.target.value)} />
            <Button onClick={() => props.onRemove(props.todoId)}>Delete</Button>
        </Flex>
    );
};
const TodoItemMemorized = memo(TodoItem, propsAreEqual);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TodoItemObserver = observer(TodoItem);

const TodoListItems = () => {
    const handleChange = (id: string, value: string) => {
        // console.info("h ch", id, ", vl", value);
        store.changeToDoMap(id, value);
    };
    const handleChange2 = (id: string, value: string) => {
        // console.info("h ch", id, ", vl", value);
        store.change2ToDoMap(id, value);
    };
    const handleChecked = (id: string, value: boolean) => {
        // console.info("h ck", id, ", vl", value);
        store.checkToDoMap(id, value);
    };
    const handleRemove = (id: string) => {
        store.removeToDoMap(id);
    }
    return (
        <Fragment>
            {store.todoIds.map((id: string) => {
                const todo = store.todoMap.get(id);
                if (!todo) {
                    return null;
                }
                return (
                    <TodoItemMemorized
                        key={id}
                        onChange={handleChange}
                        onChange2={handleChange2}
                        onCheck={handleChecked}
                        onRemove={handleRemove}
                        todoDone={todo.done}
                        todoId={id}
                        todoText={todo.text}
                        todoText2={todo.text2}
                    />
                );
            })}
        </Fragment>
    );
};

const TodoListItemsObserver = observer(TodoListItems);

const TodoList = () => {
  return (
    <Fragment>
      <Heading>Todo List</Heading>
      <TodoListItemsObserver />
    </Fragment>
  );
};

export default TodoList;