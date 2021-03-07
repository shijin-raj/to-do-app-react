import React,{useState,useEffect} from 'react';
import "./DraggableList.css";
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
export default function DraggableList() {
const [draggedItem, setDraggedItem]=useState(null);
const [listLoaded,setListLoaded]=useState(false);
const [task,setTask]=useState('');
const [state,setState]=useState([]);
const [status,setStatus]=useState('Drag and Drop to Arrange List');
const url='https://shijinraj0-api-node.herokuapp.com/';
//const url='http://localhost:3001/';

const getList=()=>{
    setTimeout(()=>{
    axios.get(url+'getList').then((response)=>{
        console.log(response.data);

        setState(response.data)
        setListLoaded(true);
    }).catch((err)=>{
        console.error(err);
    })
},300);
setTask('');
}
const updateList=()=>{
    axios.post(url+'updateList',{todo:state}).then((response)=>{
        console.log(response.data);
        setState(response.data);
    }).catch((err)=>{
        console.error(err);
    })
}

const handleDrag=(event,task)=>{
    setDraggedItem(task)
    setStatus('Dragging '+task.task);
}

const handleDragOver=(event,task)=>{
    event.preventDefault();
}

const handleDrop=(event,droppedArea)=>{
    event.preventDefault();
    setStatus('Dropped over '+droppedArea.task);
   sortState(droppedArea);
}

const sortState=(droppedArea)=>{
    var taskList=state;
    if(draggedItem!==null&&droppedArea!==null&&taskList!==[]){
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
updateList();
}

useEffect(()=>{
   // var taskList=state;
    // taskList.sort((a,b)=>(a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
    // setState(taskList);
    getList();
},[]);


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

const  handleClick =()=>{
    if(task==='')
    {
        setStatus('Task cannot be blank');
        alert('Task cannot be blank')
    }
    else{
    setListLoaded(false);
    axios.post(url+'addToList',{todo:task})
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        setStatus('Server not reachable');
        console.log(error)
    });
    getList();
}
}

const  handleChange =(event)=>{
     setTask(event.target.value);
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

if(listLoaded){
    return (
        <div>
                <div className='title' >{status}</div>
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
    <div className='control-panel'>
            <input onChange={handleChange}/>
            <button onClick={handleClick}>ADD TO LIST</button>
        </div>
        </div>
    )
}
else{
    return <LoadingScreen />
}
}
