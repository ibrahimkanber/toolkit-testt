export interface Todo {
  id: string;
  desc: string;
  isCompleted: boolean;
}

export interface State {
  todos: Todo[];
  selectedTodo: string | null;
  counter: number;
}
