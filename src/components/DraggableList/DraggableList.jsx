import React,{useState,useEffect} from 'react'
import "./DraggableList.css"
export default function DraggableList() {
const [draggedItem, setDraggedItem]=useState(null);

const [state,setState]=useState([{
    id:1,
    task:'Do a bath',
    order:1
},{
    id:2,
    task:'Travel',
    order:2
},{
    id:3,
    task:'Eat food',
    order:3
},{
    id:4,
    task:'Code',
    order:4
},{
    id:5,
    task:'Sleep',
    order:5
}]);


const handleDrag=(event,task)=>{
    setDraggedItem(task)
}

const handleDragOver=(event,task)=>{
    event.preventDefault();
}


const handleDrop=(event,droppedArea)=>{
    event.preventDefault();
   sortState(droppedArea);
}

const sortState=(droppedArea)=>{
    if(draggedItem!==null&&droppedArea!==null){
        var taskList=state;
        var oldPosition=draggedItem.order;
        var newPosition=droppedArea.order;
        taskList.forEach((task)=>{
        if(newPosition<oldPosition){
            //When Item dragged from Bottom to Up
           
                if(task.order<oldPosition&&task.order>=newPosition)
                {
                    //Items in the middle should be moved down. order++
                    task.order++;
                }
            else{
                if(task.order===oldPosition){
                     //Dragged item needs to get the order of dropped area item
                     task.order=newPosition;
                }
                else{
                   //No change
                }
            }
     
        }
        else if(newPosition>oldPosition){
            //When Item dragged from Top to Down
          
                if(task.order>oldPosition&&task.order<=newPosition)
                {
                    //Items in the middle should be moved up. order--
                    task.order--;
                }
            else{
                if(task.order===oldPosition){
                    //Dragged item needs to get the order of dropped area item
                    task.order=newPosition;
        
                }
                else{
                    //No change
                }
            }
        }
        else{
            console.log("Same element");
        }
    });
}
setDraggedItem(null);
    taskList.sort((a,b)=>(a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
}

useEffect(()=>{
    var taskList=state;
    taskList.sort((a,b)=>(a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
    setState(taskList);
},[state]);


const handleTouchEnd=(event,task)=>{
    console.log(task.task+ ' end');
    event.preventDefault();
    var changedTouch = event.changedTouches[0];
    var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    if(elem!==null){

        var dropTargetOrder=parseInt(elem.id.substring(5))+1;
        var dropTarget=state.find(element=>element.order===dropTargetOrder);
        if(dropTarget!==undefined){
            console.log(dropTarget);
            sortState(dropTarget);
        }
    }
}

const handleTouchStart=(event,task)=>{
    console.log(task.task);
    setDraggedItem(task);
}

const listItems= state.map((task,index)=>{
        return (
            <tr
              key={index} draggable="true" 
              onDrop={(event)=>handleDrop(event,task)} 
              onDragStart={(event)=>handleDrag(event,task)} 
              onDragOver={(event)=>handleDragOver(event,task)}
              onTouchEnd={(event)=>handleTouchEnd(event,task)}
              onTouchStart={(event)=>handleTouchStart(event,task)}
              > 
                <td>{task.order}</td>
                <td id={'block'+index}>
                    {task.task}
                </td>
                <td>
                    {task.id}
                </td>
            </tr>
    )
});

    return (
        <div>
            <div className="main">
            <table>
                <thead>
                <tr>
                    <th>ORDER</th>
                    <th>TASK</th>
                    <th>ID</th>
                </tr>
                </thead>
            <tbody>
        {listItems}
            </tbody>
            </table>
    </div>
        </div>
    )
}
