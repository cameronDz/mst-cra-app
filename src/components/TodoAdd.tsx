import { Button, Input, Grid } from "@chakra-ui/react";
import { observer } from "mobx-react";
import store from "../store";

const TodoAdd = () => {
  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input
        onChange={(evt) => store.editNewTodo(evt.target.value)}
        placeholder="New todo"
        value={store.newTodo} />
      <Button onClick={() => store.addTodoMap()}>Add Todo</Button>
    </Grid>
  );
}

export default observer(TodoAdd);