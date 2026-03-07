import React, { useState } from "react"
import Card from "./Card"
import type { CardProps } from "./Card"

export interface ColumnProps {
    id : number,
    name : string,
    items : CardProps[],
    onAddCard : (title: string, desc:string)=> void,
    onRename : (event : React.ChangeEvent<HTMLInputElement>)=> void,
    onDelete : ()=> void,
    onDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardProps, id:number) => void,
    onDragOver: (e: React.DragEvent<HTMLDivElement>, id:number) => void,
    onDragDrop: (e: React.DragEvent<HTMLDivElement>, id:number) => void,
    onEditCard: (id:number, uid:string, prop:string, value:any) => void,
    onDeleteCard: (id:number, uid:string) => void
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
        <div className="bg-slate-300 rounded p-2 w-72 flex flex-col gap-4 text-black font-bold"
            onDrop={(e)=> {props.onDragDrop(e, props.id)}}
            onDragOver={(e)=> {props.onDragOver(e, props.id)}}>
            <div className="flex flex-row items-center gap-2">
                <input type="text" className="w-full text-start text-sm" 
                    value={props.name}
                    onChange={props.onRename} />
                <button className="warning" onClick={props.onDelete}>Delete</button>
            </div>
            <div className="bg-slate-200 rounded flex flex-col text-sm p-2 gap-1">
                <input className="text-input" type="text" 
                    onChange={handleTitleChange}
                    value={title}/>
                <textarea className="text-input" 
                    onChange={handleDescChange}
                    value={desc}/>
                <button onClick={ ()=> {
                    props.onAddCard(title, desc);
                } } className="w-full">Add Card</button>
            </div>
            {props.items.map( (val, i) => (
                <div key={i}  draggable="true" onDragStart={(e)=>{
                    props.onDragStart(e, val, props.id);
                }}>
                    <Card
                        id={val.id}
                        title={val.title} 
                        desc={val.desc}
                        tag={val.tag}
                        onAddTag={val.onAddTag} 
                        onDelete={() => {props.onDeleteCard(props.id, val.id)}}
                        onEdit={(prop, value) => {props.onEditCard(props.id, val.id, prop, value)}} 
                    />
                </div>
            ) )}

            
        </div>
    )
}