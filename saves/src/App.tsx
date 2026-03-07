import React, { useState } from 'react';
import './App.css'

function App() {
  const [inputValue, setInput] = useState<string>('');
  const [todo, setTodo] = useState<string[]>([]);

  const onInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  const addItem = () => {
    setTodo( [...todo, inputValue] );
  }

  const deleteItem = (id : number) => {
    setTodo( todo.filter((v, i) => (i != id)) );
  }

  return (
    <div className="flex flex-col max-w-md mx-auto mt-10 border rounded-lg p-4 bg-gray-100">
  
  <div className="flex gap-2 mb-4">
    <input
      className="border p-2 flex-1 rounded"
      type="text"
      onChange={onInputChange}
      value={inputValue}
    />
    <button
      className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      onClick={addItem}
    >
      Add
    </button>
  </div>

  <div className="flex flex-col gap-2">
    {todo.map((val, idx) => (
      <div key={idx} className="flex justify-between bg-white p-2 rounded border">
        {val}
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => deleteItem(idx)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>

</div>
  )
}

export default App;