import { Fragment } from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";

const TodoListItems = () => {
  return (
    <Fragment>
      {[].map((todo: { id: number; text: string }) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox />
          <Input mx={2} value={todo.text} />
          <Button>Delete</Button>
        </Flex>
      ))}
    </Fragment>
  );
};

const TodoList = () => {
  return (
    <Fragment>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </Fragment>
  );
};

export default TodoList;