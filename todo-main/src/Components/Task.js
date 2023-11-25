import Checkbox from '@mui/material/Checkbox';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { Tooltip } from '@mui/material';
import * as React from 'react';
import { useContext } from 'react';
import TaskContext from '../Context/taskContext';
// notifay 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Task({description,date,type,handlOpenModulsEdit,id,deletefn}){

  const MyTaskContext = useContext(TaskContext)
  const {Alltask = [],setAddtask}= MyTaskContext


const [checkstate,setCheckedStates]=React.useState(false)
    // functions
    let border_left
    function TypeTaskIcon(type){
        if(type==='Sport'){
          border_left = {borderLeft: '6.22px solid #489cfe'}
          return <><EmojiEventsTwoToneIcon style={{color:'#6298fe'}}/>Sport</>
        }else{
          if(type==='Study'){
            border_left = {borderLeft: '6.22px solid #ffac36'}
            return<><SchoolIcon style={{color:'#ffac3a',hover:'white'}}/>Study</>
          }else{
            border_left = {borderLeft: '6.22px solid #17fb9e'}
            return <><BusinessCenterTwoToneIcon style={{color:'#32fca9'}}/>Work</>
          }
        }
      }
      const handleCheckboxChange = (id) => {
        const updatedTasks = Alltask.map((task) => {
          if (task.taskID === id) {
            return { ...task, done: !task.done };
          }
          return task;
        });
        setCheckedStates(!checkstate)
        // Update the state with the new array of tasks
        setAddtask(updatedTasks);
      
        // Save the updated state to localStorage
        localStorage.setItem('Mytasks', JSON.stringify(updatedTasks));
      };
      
      function handleNotifay(){
        // const dateInput = document.createElement('input');
        // dateInput.type = 'date';
        // dateInput.min = '2023-06-07T00:00';
        // dateInput.max = '2023-12-31T00:00';
        // document.body.appendChild(dateInput);
        // const dateValue = dateInput.value;
        // const milliseconds = Date.parse(dateValue);
        // console.log(dateValue)
        // const notify = () => toast("its time of your task number !");
        // setTimeout(()=>{
        //   notify()
        // },milliseconds)
      }
      
    function formatDate(taskCreationDate) {
      const currentDate = new Date();
      const taskDate = new Date(taskCreationDate);
      const timeDifference = currentDate.getTime() - taskDate.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      if (hoursDifference <= 24) {
        return 'Today';
      } else if (hoursDifference <= 48) {
        return 'Yesterday';
      } else {
        const year = taskDate.getFullYear();
        const month = taskDate.getMonth() + 1; 
        const day = taskDate.getDate();
        return `${year}/${month}/${day}`;
      }
    }
    let condition=Alltask.find((task) => task.taskID === id)?.done||false
    TypeTaskIcon(type)
    return(
        <div style={border_left} className={condition?"objcheck":"task"} >
     <div className='taskDescription'>
           <Checkbox  style={{color:'#2196f3'} } 
           checked={condition}
           onChange={() => handleCheckboxChange(id)} 
           />
           <p className={condition?'strikethrough':''} >{description}</p>
      </div>
      <div className='taskFooter' >
          {/* time */}
          <span>
            <Tooltip title='Date' placement='left'>
              <IconButton >
                <span  style={{ color:'#3d5afe',paddingRight:'8px', fontSize:"16px"}}> {formatDate(date)}</span>
                 <AccessAlarmOutlinedIcon style={{color:'#e8eaf6'}}/>
              </IconButton>
            </Tooltip>
          </span>
          {/* notification */}
          <span>
            <Tooltip title='Remainder'  placement='left'>
               <IconButton onClick={()=>{handleNotifay()}}>
                  <NotificationsActiveOutlinedIcon  style={{color:'#e8eaf6'}}/>
                 
                  <ToastContainer />
     
               </IconButton>
            </Tooltip>
          </span>
          {/* Edit */}
          <span>
            <Tooltip title='Edit'  placement='left'>
            <IconButton onClick={() => { if (!condition)handlOpenModulsEdit(id); }}>
                  <ModeEditOutlineTwoToneIcon  color='primary' />
                  </IconButton>
            </Tooltip>
          </span>
          {/* Delete */}
          <span>
            <Tooltip title='Delete'  placement='left'>
                <IconButton onClick={() => { if (!condition) deletefn(id); }}aria-label="delete">
                  <DeleteIcon color="error"  /> 
                </IconButton>
            </Tooltip>
          </span>
          {/* Icon Type task */}
          <span>{TypeTaskIcon(type)}</span>
      </div>
          </div>
    )
}