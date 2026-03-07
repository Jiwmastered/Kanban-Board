import type { ColumnProps } from "../components/Column";
import type { CardProps } from "../components/Card";
import { useId } from "react";


export function getTestCard () : CardProps {
  return {
    uid: crypto.randomUUID(),
    title : "Test",
    desc : "Test desc",
    tag : ["TestTag", "Hola"],
    onEdit : () => {},
    onDelete : () => {},
    onAddTag : () => {}
  }
}

export const sampleCol : ColumnProps = {
  uid: '0',
  name:"Untitled", 
  items:[getTestCard(), getTestCard()]
//   onAddCard: ()=>{},
//   onDelete: ()=>{},
//   onRename: ()=>{},
//   onDragDrop: ()=>{},
//   onDragOver: ()=>{},
//   onDragStart: ()=>{},
//   onDeleteCard: ()=>{},
//   onEditCard: ()=>{},
}

export const columnData : {
    cols : ColumnProps[],
    setCols : any
} = {
    cols: [], 
    setCols:null
};

//======================== COLUMN ================================//

// Get column ColUID
export const getCol = (uid : string) : [ColumnProps, number] => {
    const idx = columnData.cols.findIndex(col => col.uid === uid);
    const col = [...columnData.cols][idx];
    return [col, idx];
}

// Get card with CardUID in column ColUID
export const getCard = (colUid: string, cardUid: string) : [CardProps, number] => {
    const [col, colIdx] = getCol(colUid);
    const idx = col.items.findIndex(card => card.uid === cardUid);
    const card = col.items[idx];

    return [card, idx];
}

// Add new column at the end 
export const handleAddCol = () => {
    const newCols = [...columnData.cols, {...sampleCol, uid:crypto.randomUUID(), items:[]}]
    columnData.setCols(newCols);
}

// Delete Column (call inside a column) 
export const handleDeleteCol = (uid: string) => {
    const newCols = [...columnData.cols.filter((col, i)=>(col.uid != uid))]
    columnData.setCols(newCols);
} 

// Rename Column
export const handleRenameCol = (uid: string, value: string) => {
    const newCols = [...columnData.cols.map((col, i)=>{
      if (col.uid == uid) {
        return {...col, name:value}
      } else {
        return col;
      } 
    })]
    columnData.setCols(newCols);
}

//======================== CARD ================================//

// Edit card property (title, desc) by colUid and cardUid
export const handleEditCard = (colUid:string, cardUid:string, prop:string, value:any) => {
    let newCols = [...columnData.cols];
    const [targCol, colIdx] = getCol(colUid);
    newCols[colIdx].items = [...newCols[colIdx].items.map( (card)=>
    {
      if (card.uid == cardUid) {
        return {...card, [prop]:value}; // Set prop = value
      } else {
        return card;
      }
    }
    )];
    columnData.setCols(newCols);
}

// Delete card
export const handleDeleteCard = (colUid: string, cardUid: string) => {
    let newCols = [...columnData.cols];
    const [col, colIdx] = getCol(colUid);
    newCols[colIdx].items = [...newCols[colIdx].items.filter( (card)=> (card.uid != cardUid)) ];
    columnData.setCols(newCols);
}


// Add card to column by col's UID
export const handleAddCard = (uid : string, title: string, desc: string) => {
    const newCols = [...columnData.cols];
    const [thisCol, colIdx] = getCol(uid);

    const newUid = crypto.randomUUID();
    const newCard: CardProps = {
      uid: newUid,
      title,
      desc,
      tag: [],
      onAddTag: () => {},
      onDelete: () => { handleDeleteCard(uid, newUid); },
      onEdit: (prop, value) =>{ handleEditCard(uid, newUid, prop, value); }
    }

    // thisCol.items.unshift(newCard);
    newCols[colIdx] = {...thisCol, items: [newCard, ...thisCol.items]};

    columnData.setCols(newCols);
}


// On Drag Start
export const handleCardDragStart = (e : React.DragEvent<HTMLDivElement>, card: CardProps, colId:number) => {
    const cardString = JSON.stringify(card);
    e.dataTransfer.setData('cardData', cardString);
    e.dataTransfer.setData('columnId', colId.toString());
}

// On Drag Over
export const handleDragOver = (e : React.DragEvent<HTMLDivElement>, colId: number) => {
    e.preventDefault();
} 

// On Drop
export const handleDrop = (e : React.DragEvent<HTMLDivElement>, colId: number, cardIdx?: number) => {
    e.preventDefault();
    const cardData: CardProps = JSON.parse(e.dataTransfer.getData("cardData"));
    const prevId = parseInt(e.dataTransfer.getData("columnId"));

    
    const allCols = [...columnData.cols];
    let prevCol = columnData.cols[prevId];
    prevCol = {...prevCol, items:[...prevCol.items.filter( (card) => (card.uid != cardData.uid))]};
    let newCol = columnData.cols[colId];
    if (prevId == colId) {
        newCol = prevCol
    }

    // console.log(cardData, prevCol.items.filter( (v) => (v.id != cardData.id) ));
    // 

    if (cardIdx != undefined) {
        let newItems: CardProps[] = [];
        if (newCol.items.length == 0 || newCol.items.length <= cardIdx) {
            newItems = [...newCol.items];
            // console.log(cardIdx);
            newItems.push(cardData);
        } else {
            newCol.items.forEach((val, idx) => {
                if (idx == cardIdx) {
                    newItems.push(cardData);
                }
                newItems.push(val);
            })

        }
        // console.log(newCol.items.splice(cardIdx, 0, cardData))
        console.log(newCol);
        newCol = {...newCol, items: newItems};
    }

    allCols[prevId] = prevCol;
    allCols[colId] = newCol;

    // console.log(newCol)
    columnData.setCols(allCols);
}