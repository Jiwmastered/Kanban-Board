import React, { useState } from 'react';
import Card, { type CardProps } from './components/Card';
import './App.css'
import Column, {type ColumnProps } from './components/Column';
import { columnData, sampleCol, handleAddCol} from './controllers/Board'


function App() {
  const [cols, setCols] = useState<ColumnProps[]>([
    {...sampleCol, uid: crypto.randomUUID(), items:[], name:"Planned"},
    {...sampleCol, uid: crypto.randomUUID(), items:[], name:"Working"},
    {...sampleCol, uid: crypto.randomUUID(), name:"Done"}
  ]);
  columnData.cols = cols;
  columnData.setCols = setCols;

  return (
    <>
      <h1 className='text-lg mb-2'>Kanban Board by Jiwnasted OWO</h1>
      <div className={`bg-slate-200 rounded p-2 flex gap-2 w-full min-w-full min-h-screen overflow-scroll`}>
          {cols.map( (v, i)=>(
            <Column key={v.uid} uid={v.uid} name={v.name} items={v.items}/>
          ) )}
          <button onClick={handleAddCol}>Add Column</button>
      </div>
    </>
  )
}

export default App;