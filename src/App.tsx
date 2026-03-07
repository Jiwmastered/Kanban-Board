import React, { useState } from 'react';
import Card, { type CardProps } from './components/Card';
import './App.css'
import Column, {type ColumnProps } from './components/Column';

function getTestCard () : CardProps {
  return {
    id: crypto.randomUUID(),
    title : "Test",
    desc : "Test desc",
    tag : ["TestTag", "Hola"],
    onEdit : () => {},
    onDelete : () => {},
    onAddTag : () => {}
  }
}

const sampleCol : ColumnProps = {
  id: 0,
  name:"Untitled", 
  items:[getTestCard(), getTestCard()],
  onAddCard: ()=>{},
  onDelete: ()=>{},
  onRename: ()=>{},
  onDragDrop: ()=>{},
  onDragOver: ()=>{},
  onDragStart: ()=>{},
  onDeleteCard: ()=>{},
  onEditCard: ()=>{},
}

function App() {
  const [cols, setCols] = useState<ColumnProps[]>([
    sampleCol,
    {...sampleCol, items:[]},
    {...sampleCol, name:"Hellowolrd"}
  ]);
 
  const handleAddCol = () => {
    const newCols = [...cols, {...sampleCol, id: cols.length, items:[]}]
    setCols(newCols);
  }

  const handleDeleteCol = (id : number) => {
    const newCols = [...cols.filter((v, i)=>(id != i))]
    setCols(newCols);
  }

  const handleRenameCol = (id : number, value: string) => {
    const newCols = [...cols.map((v, i)=>{
      if (i == id) {
        return {...v, name:value}
      } else {
        return v;
      } 
    })]
    setCols(newCols);
  }

  const handleAddCard = (id : number, title: string, desc: string) => {
    // console.log(id)
    const newCols = [...cols];
    const thisCol = cols[id];
    const newCard: CardProps = {
      id: crypto.randomUUID(),
      title,
      desc,
      tag: [],
      onAddTag: ()=>{},
      onDelete: ()=>{},
      onEdit: ()=>{}
    }
    thisCol.items.unshift(newCard);
    newCols[id] = thisCol;
    setCols(newCols);
  }

  const handleEditCard = (id:number, uid:string, prop:string, value:any) => {
    let newCols = [...cols];
    newCols[id].items = [...newCols[id].items.map( (v)=>
    {
      if (v.id == uid) {
        return {...v, [prop]:value};
      } else {
        return v;
      }
    }
    )];
    setCols(newCols);
  }

  const handleDeleteCard = (id:number, uid:string) => {
    let newCols = [...cols];
    newCols[id].items = [...newCols[id].items.filter( (v)=> (v.id != uid)) ];
    setCols(newCols);
  }

  const handleCardDragStart = (e : React.DragEvent<HTMLDivElement>, card: CardProps, colId:number) => {
    const cardString = JSON.stringify(card);
    e.dataTransfer.setData('cardData', cardString);
    e.dataTransfer.setData('columnId', colId.toString());
  }

  const handleDragOver = (e : React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
  }

  const handleDrop = (e : React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    const cardData: CardProps = JSON.parse(e.dataTransfer.getData("cardData"));
    const prevId = parseInt(e.dataTransfer.getData("columnId"));

    if (prevId == id) return;
    
    const allCols = [...cols];
    let prevCol = cols[prevId];
    let newCol = cols[id];
    // console.log(cardData, prevCol.items.filter( (v) => (v.id != cardData.id) ));
    prevCol = {...prevCol, items:[...prevCol.items.filter( (v) => (v.id != cardData.id))]};
    newCol = {...newCol, items:[...newCol.items, cardData]};
    allCols[prevId] = prevCol;
    allCols[id] = newCol;

    console.log(allCols)
    setCols(allCols);  
  }

  return (
    <div>
      <h1 className='text-lg mb-2'>Kanban Board by Jiwnasted OWO</h1>
      <div className={`bg-slate-200 rounded p-2 flex gap-2`}>
        {cols.map( (v, i)=>(
          <Column key={i} id={i} name={v.name} items={v.items} 
            onAddCard={(title, desc)=>{handleAddCard(i, title, desc)}} 
            onDelete={()=>{handleDeleteCol(i)}} 
            onRename={(event)=>{handleRenameCol(i, event.target.value)}}
            onDragDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragStart={handleCardDragStart}
            onEditCard={handleEditCard}
            onDeleteCard={handleDeleteCard}
            />
        ) )}
        <button onClick={handleAddCol}>Add Column</button>
      </div>
    </div>
  )
}

export default App;