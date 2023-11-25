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
// import Popap from './Model';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/joy/Input';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import Button from '@mui/joy/Button';
import CheckboxContext from '../Context/CheckboxContext';
import { useState } from 'react';
// import ActionAlerts from './AlertNotask'
// notifay 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  border:'none',
  borderRadius:"10px",

};
// Model


function TypeTaskIcon(array){
  if(array.type==='Sport'){
    return <><EmojiEventsTwoToneIcon style={{color:'#6298fe'}}/>Sport</>
  }else{
    if(array.type==='Study'){
      return<><SchoolIcon style={{color:'#ffac3a',hover:'white'}}/>Study</>
    }else{
      return <><BusinessCenterTwoToneIcon style={{color:'#00f78a'}}/>Work</>
    }
  }
}
// the mane function 
export default function Tasks(dataTask) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputData,setinputData] =React.useState({data:'',indexx:''});
 

  const [checkedStates, setCheckedStates] = React.useState(Array(dataTask.length).fill(false));
  console.log(checkedStates);

  const handleCheckboxChange = (index) => {
    setCheckedStates((prevCheckedStates) => {
      const updatedCheckedStates = [...prevCheckedStates];
      updatedCheckedStates[index] = !updatedCheckedStates[index];
      return updatedCheckedStates;
    });
  
    // Use the updated checkedStates value here
    let datafromLocalstorage = JSON.parse(localStorage.getItem('Mytasks'));
    datafromLocalstorage[index].done = !datafromLocalstorage[index].done; // Toggle the value
    localStorage.setItem('Mytasks', JSON.stringify(datafromLocalstorage));
    console.log('===>1' + datafromLocalstorage[index].done);
    console.log('===>2' + checkedStates[index]);
  };
  function Edit(index){
    let data = JSON.parse(localStorage.getItem('Mytasks'));
    let value = data[index].task
      setinputData({indexx:index,data:value});
      
      handleOpen()
      
      
  }
 

  function handleNotifay(){
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.min = '2023-06-07T00:00';
    dateInput.max = '2023-12-31T00:00';
   
    
    document.body.appendChild(dateInput);
    const dateValue = dateInput.value;
    const milliseconds = Date.parse(dateValue);
    console.log(dateValue)
  
    const notify = () => toast("its time of your task number !");
    setTimeout(()=>{

      notify()
    },milliseconds)

  }
  function Edit1(i){
    let data = JSON.parse(localStorage.getItem('Mytasks'));
    data[i].task=inputData.data;
    localStorage.setItem('Mytasks',JSON.stringify(data));
  
  }
  function deletee(index){
    let data = JSON.parse(localStorage.getItem('Mytasks'));
    data.splice(index,1);
    localStorage.setItem('Mytasks',JSON.stringify(data))
    window.location.reload();
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
  // 
if(dataTask !==null){
  let doneFromLocalStorage = JSON.parse(localStorage.getItem('Mytasks'));
  let TasksArray = dataTask.map((item, index) => (
    
     <div className={ doneFromLocalStorage[index].done ? 'objcheck' : 'task'}
     key={index} >
{      console.log('====>3'+doneFromLocalStorage[index].done)
}      <div className='taskDescription'>
      <CheckboxContext.Provider  value={checkedStates[index]}>
           <Checkbox id='index' 
           checked={doneFromLocalStorage[index].done}
           onChange={() => handleCheckboxChange(index)}
           style={{color:'#2196f3'}}   
           />
           </CheckboxContext.Provider>
           <p className={doneFromLocalStorage[index].done?'strikethrough ':''} style={{paddingLeft:"15px"}}>{item.task}</p>
      </div>
      <div className='taskFooter' >
          {/* time */}
          <span>
            <Tooltip title='Date' placement='left'>
              <IconButton >
                <span  style={{ color:'#3d5afe',paddingRight:'8px', fontSize:"16px"}}> {formatDate(item.date)}</span>
                 <AccessAlarmOutlinedIcon style={{color:'#e8eaf6'}}/>
              </IconButton>
            </Tooltip>
          </span>
          {/* notification */}
          <span>
            <Tooltip title='Remainder'  placement='left'>
               <IconButton>
                  <NotificationsActiveOutlinedIcon onClick={()=>{handleNotifay()}} style={{color:'#e8eaf6'}}/>
                 
                  <ToastContainer />
     
               </IconButton>
            </Tooltip>
          </span>
          {/* Edit */}
          <span>
            <Tooltip title='Edit'  placement='left'>
            <IconButton onClick={() => (!doneFromLocalStorage[index].done ? Edit(index) : '')}>

                  <ModeEditOutlineTwoToneIcon  color='primary' />
                  </IconButton>
            </Tooltip>
          </span>
          {/* Delete */}
          <span>
            <Tooltip title='Delete'  placement='left'>
                <IconButton onClick={() => (!doneFromLocalStorage[index].done ? deletee(index) : '')} aria-label="delete">
                  <DeleteIcon color="error"  /> 
                </IconButton>
            </Tooltip>
          </span>
          {/* Icon Type task */}
          <span>{TypeTaskIcon(item)}</span>
      </div>
    </div>

  ));

  return (
    <div className={
      doneFromLocalStorage.length > 4 && doneFromLocalStorage.length <= 10
        ? 'displayWay'
        : doneFromLocalStorage.length > 10
        ? 'displayWay1'
        : ''
    }>
      {TasksArray}
      <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <Typography id="modal-modal-title" variant="h5" component="h4">
    <DrawTwoToneIcon style={{fontSize:'40px'}}  color="success"/>Edit your task
  </Typography>
  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
  <Input color="success" value={inputData.data} onChange={(ev)=>{setinputData({...inputData,data:ev.target.value})}} placeholder="Edit ..." size="md" variant="outlined"/>
  <span style={{width:'fit-content'}} onClick={()=>{handleClose()} }>  
  <Button color="success" style={{marginTop:'15px'}} onClick={()=>{Edit1(inputData.indexx)}}   variant="soft"><DrawTwoToneIcon  color="success"/>Edit</Button>

</span>
  </Typography>
</Box>
      </Modal>
    </div>
  );
}
}
 
  