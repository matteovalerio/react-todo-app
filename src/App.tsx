import { useState } from "react";

type Todo = {
  name: string;
  completed: boolean;
};

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-xl">TODO list</div>
          <div className="ml-auto" />
          <button
              type="button"
              onClick={() => setTodos((prev) => [...prev, { name: "", completed: false }])}
          >
            Add
          </button>
        </div>
        {todos.map((todo, index) => (
            <TodoItem
                key={index}
                todo={todo}
                onChange={(updatedTodo) =>
                    setTodos((prev) => prev.map((t, i) => (i === index ? updatedTodo : t)))
                }
                onDelete={() => setTodos((prev) => prev.filter((_, i) => i !== index))}
            />
        ))}
        <button type="button" onClick={() => console.log(todos)}>Save</button>
      </div>
  );
}

function TodoItem({ todo, onChange, onDelete }: { todo: Todo; onChange: (todo: Todo) => void; onDelete: () => void }) {
  return (
      <div className="flex flex-col gap-2 border border-gray-200 p-2 rounded-lg">
        <div className="flex gap-2 items-center">
          <label htmlFor="name">Name</label>
          <input
              type="text"
              required
              placeholder="Enter task name..."
              value={todo.name}
              onChange={(e) => onChange({ ...todo, name: e.target.value })}
              name="name"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="isCompleted">Is completed</label>
          <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onChange({ ...todo, completed: !todo.completed })}
              name="completed"
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="ml-auto" />
          <button type="button" onClick={onDelete} className="bg-red-500 text-white p-1 rounded">
            Delete
          </button>
        </div>
      </div>
  );
}
