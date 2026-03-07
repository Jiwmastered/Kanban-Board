import React, { useState } from "react"
import Card from "./Card"

import { handleAddCard, handleCardDragStart, handleDeleteCard, handleEditCard, getCol, handleDrop, handleDragOver, handleRenameCol, handleDeleteCol } from '../controllers/Board'
import type { CardProps } from "./Card"

export interface ColumnProps {
    uid : string,
    name : string,
    items : CardProps[]
    color : string
}

export default function Column(props : ColumnProps) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleTitleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const handleDescChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(event.target.value);
    }

    return (
        <div className="bg-slate-300 rounded p-2 w-72 min-w-72 flex flex-col gap-4 text-black font-bold"
                // onDrop={(e)=> {handleDrop(e, getCol(props.uid)[1])}}
                // onDragOver={(e)=> {handleDragOver(e, getCol(props.uid)[1])}}
        >
            <div className="flex flex-row items-center gap-2">
                <input type="text" className="w-full text-start text-sm" value={props.name} onChange={(e) => {handleRenameCol(props.uid, e.target.value)}} />
                <button className="warning" onClick={(e) => {handleDeleteCol(props.uid)} }>Delete</button>
            </div>
            <div className="bg-slate-200 rounded flex flex-col text-sm p-2 gap-1">
                <input className="text-input" type="text" onChange={handleTitleChange} value={title}/>
                <textarea className="text-input" onChange={handleDescChange} value={desc}/>
                <button onClick={()=> { handleAddCard(props.uid, title, desc) }} className="w-full">Add Card</button>
            </div>
            {props.items.map( (card, i) => (
                <div key={card.uid}  draggable="true" onDrop={(e)=> {handleDrop(e, getCol(props.uid)[1], i)}}
                onDragOver={(e)=> {handleDragOver(e, getCol(props.uid)[1])}} onDragStart={(e)=>{ handleCardDragStart(e, card, getCol(props.uid)[1]) }}>
                    <Card
                        uid={card.uid}
                        title={card.title} 
                        desc={card.desc}
                        tag={card.tag}
                        onAddTag={() => {}} 
                        onDelete={() => { handleDeleteCard(props.uid, card.uid) }}
                        onEdit={(prop, value) => { handleEditCard(props.uid, card.uid, prop, value) }} 
                    />
                </div>
            ) )}
            <div 
                className='rounded 
                    flex flex-col align-center justify-center w-full h-32
                    bg-blue-100 p-2 gap-1
                    text-black'
                onDrop={(e) => {handleDrop(e, getCol(props.uid)[1], props.items.length)}}
                onDragOver={(e) => {handleDragOver(e, getCol(props.uid)[1])}}
            >Add or Drag here
            </div>
        </div>
    )
}