import type React from 'react'
import '../App.css'
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface CardProps {
    uid : string,
    title : string,
    desc : string,
    tag : string[],
    onEdit : (prop:string, value:any) => void,
    onDelete : () => void,
    onAddTag : () => void,
}

export default function Card({uid, title, desc, tag, onEdit, onDelete, onAddTag } : CardProps) {
    const [titleInput, setTitleInput] = useState(title);
    const [descInput, setDescInput] = useState(desc);
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value);
        onEdit('title', e.target.value);
    }

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescInput(e.target.value);
        onEdit('desc', e.target.value);
    }

    return (
        <div className='border rounded 
        flex flex-col w-full 
        bg-blue-100 p-2 gap-1
        text-black
        hover:p-4 transition-all'
        >
            <input type="text" value={titleInput} onChange={handleTitleChange}  className='w-full text-left'/>
            <textarea value={descInput} onChange={handleDescChange} className='w-full text-left' />
            <div className='flex flex-row gap-1'>
                {tag.map( (v, i)=>(
                    <div className='tag' key={i}>{v}</div>
                ) )}
                <button onClick={onAddTag}>+</button>
            </div>
            <div className='flex flex-row gap-1'>
                <button className='warning' onClick={onDelete}>delete</button>
            </div>
        </div>
    );
}