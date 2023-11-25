import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import {useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/joy/Input';
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Task from './Task';
import { Tooltip } from '@mui/material';
import { v4 as uuidv4 } from "uuid";
import { useEffect } from 'react';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import CustomizedSnackbars from './Snackbar';
import Header from './Header';
import AlertInvertedColors from "./AlertNotask";
import SchoolIcon from '@mui/icons-material/School';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useContext } from 'react';
import TaskContext from '../Context/taskContext';
import Grid from '@mui/material/Grid';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius:"10px",
  boxShadow: 24,
  p: 4,
};
export default function  All(){
  const MyTaskContext = useContext(TaskContext)
  const {Alltask=[],setAddtask}= MyTaskContext

  const [idfromChild,setidFromchild]=useState('');
  const [open3, setOpen3] = useState(false);
  const [message,setmessage]=useState('')
  // state for Model Add task
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // state for input add task
  const [taskInput,settaskInput]=useState('');
  // states for Model edit
const [open2, setOpen2] = useState(false);
const handleOpen2 = () => setOpen2(true);
const handleClose2 = () => setOpen2(false);
// data from inout that i use to update task
const [inputData,setinputData] = useState('');
// const [inputData,setinputData] = useState('');
// state for Model edit 
  const dataRadio = [
    { value: 'Study', option: 'Study' },
    { value: 'Work', option: 'Work' },
    { value: 'Sport', option: 'Sport' }
  ];
// state of Radio
  const [option, setOption] = useState('');
  const Radios = dataRadio.map((item) => (
    <FormControlLabel
      key={item.value}  // Add a key prop
      checked={option === item.value}
      onChange={() => {setOption(item.value)}}
      value={item.value} control={<Radio />}
      label={item.option}
    />
  )); 
  const date = new Date()
  function dateCreateTtsak(){
    const formattedTime = date 
    return formattedTime
  }
  const caruntTime= dateCreateTtsak()

      // const [Alltask,setAddtask]=useState(taskData);
      function handleClickToAddTask() {
        // Update the state first
        const newTask = {
          taskID: uuidv4(),
          task: taskInput,
          type: option,
          date: caruntTime,
          done: false,
        };
      
        setAddtask([...Alltask, newTask]);
      
        // Now, save the updated state to localStorage
        localStorage.setItem('Mytasks', JSON.stringify([...Alltask, newTask]));
        setOpen3(true)
        setmessage('you Add New task ')
        handleClose();
      }
      

  
    function handlOpenModulsEdit(id){
      const data= Alltask.find((item) => item.taskID === idfromChild )?.task
      setidFromchild(id)
      setinputData( data );
      handleOpen2();
      
    }
    function deletefn(id){
      let deletTask =Alltask.filter((task)=>{
        return  task.taskID!==id
      })
      setAddtask(deletTask)
      setOpen3(true)
      setmessage('Delte has been successfuly')
      localStorage.setItem('Mytasks',JSON.stringify(deletTask))
  
    }
    function Edittask(Myid) {
   
      let tasktoUpdate = Alltask.map((item) =>{
        if (item.taskID === Myid) {
          return {
            ...item,
            task: inputData, 
          };
        }
        return item;
      });
      // Update the state with the new array of tasks
      ; // Set the input value
      localStorage.setItem('Mytasks', JSON.stringify(tasktoUpdate));
      setAddtask(tasktoUpdate);
      setOpen3(true);
      handleClose2();
      setmessage('Edit has been successfuly')
    }
    
  
      // update code
      
      useEffect(() => {
        // Check if there is data in local storage
        const storedTasks = localStorage.getItem('Mytasks');
      
        if (storedTasks) {
          // If data exists, parse and set it as the initial state
          let dd =JSON.parse(storedTasks)
          setAddtask(...[dd]);
        }
      }, []);

   // udate code 
  //  ALl function from Header  component

const [todotobebisivle,settodotobebisivle] =useState('all');
const [alerttype,setaltertype]=useState({type:'',description:'',open:false,color:'',botton:'',icon:''});

const OnlyStudy = useMemo(() => {
  if(Alltask!==null && Alltask!==undefined ){
  return Alltask.filter((task) => {
    return task.type === 'Study';
  });}
}, [Alltask]);
let OnlyDone = useMemo(()=>{
  if(Alltask!==null && Alltask!==undefined ){
  return Alltask.filter((t) => {
    return t.done===true;
  });}
},[Alltask]);
// use Effect to done
useEffect(() => {

  if (OnlyDone.length === 0 && todotobebisivle === 'done') {
    setaltertype({
      description: 'No done tasks found!',
      type: 'done',
      open: 'block',
      color: 'warning',
      button: 'go to do something',
      icon: <PublishedWithChangesIcon />
    });
  } else {
    setaltertype({ open: 'none' });
  }
}, [OnlyDone, todotobebisivle]);
let OnlyWork = useMemo(()=>{
  if(Alltask!==null && Alltask!==undefined ){
  return Alltask.filter((t) => {
    return t.type==='Work';
  });}
},[Alltask]);
// use Effect for work
useEffect(()=>{

  if(OnlyWork.length===0 && todotobebisivle==='work'){
    setaltertype({
      description:'not Work task found !',
      type:'work',
      open:'block',
      color:'success',
      botton:'Add Work task',
      icon:<SchoolIcon/>
    });
  }else{
    setaltertype({open:'none'});

  }

},[todotobebisivle,OnlyWork])
// useEffect for study
useEffect(() => {

  if (OnlyStudy.length === 0 && todotobebisivle === 'study') {
    setaltertype({
      description: 'No study tasks found!',
      type: 'study',
      open: 'block',
      color: 'warning',
      botton: 'Add Study task',
      icon: <SchoolIcon />
    });
  } else {
    setaltertype({ open: 'none' });
  
}
}, [todotobebisivle, OnlyStudy]);
let OnlySport = useMemo(()=>{
  if(Alltask!==null && Alltask!==undefined ){
  return Alltask.filter((t) => {
    return t.type==='Sport';
  });}
},[Alltask]);
let OnlyLater = useMemo(()=>{
  if(Alltask!==null&& Alltask!==undefined ){
  return Alltask.filter((t) => {
    return t.dona===false;
  });}
},[Alltask]);

function all(){
  settodotobebisivle('all')
}
function study(){
  settodotobebisivle('study')

}
function sport(){
  settodotobebisivle('sport');
  setaltertype({...alerttype,type:'sport'});

}
function work(){
  settodotobebisivle('work');
  setaltertype({...alerttype,type:'work'});

}
function done(){
  settodotobebisivle('done');
  setaltertype({...alerttype,type:'done'});
}
function later(){
  settodotobebisivle('later');
  setaltertype({...alerttype,type:'later'});
}
let displayedTodosType
if( todotobebisivle === 'study'){
  displayedTodosType=OnlyStudy;
}
else if (todotobebisivle === 'done') {
  displayedTodosType=OnlyDone;
} else if(todotobebisivle === 'work'){
  displayedTodosType=OnlyWork
}
else if(todotobebisivle === 'sport'){
  displayedTodosType=OnlySport
}else if(todotobebisivle === 'later'){
  displayedTodosType=OnlyLater
}
else{
  displayedTodosType=Alltask
}
if(Alltask!==null && Alltask!==undefined ){
let finalTasksJSX = displayedTodosType.map((item,index) => {
  return( 
  <Task 
    
     key={index}
     done={item.done}
     deletefn={deletefn}
     handlOpenModulsEdit={handlOpenModulsEdit}
     id={item.taskID}
     date={item.date}
     type={item.type} 
     description={item.task}
      />
    )
});
return(
  <div>
  <Header all={all} done={done} study={study} work={work} sport={sport} later={later}/>
  {finalTasksJSX} 
  <div>

      {/* Model for add task */}
      <Grid container spacing={2}>
        <Grid item xs={3} sm={6}>
          <Modal
            
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                <BeenhereTwoToneIcon style={{ color: '#07b761' }} />
                Add your task
              </Typography>
              <form>
                <Input className='inputModel' type='text' value={taskInput.task} onChange={(ev) => { settaskInput(ev.target.value) }} placeholder='Add your task' variant='soft' size='sm' />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="" // Set to an appropriate initial value
                    name="radio-buttons-group"
                  >
                    {Radios}
                  </RadioGroup>
                </FormControl>
                <br />
                <Button
                  onClick={handleClickToAddTask}
                  color='success'
                  style={{ marginTop: "10px" }} variant="outlined">Add
                </Button>
              </form>
            </Box>
          </Modal>
        </Grid>
      </Grid>
      {/* Model for edit task */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h4">
                <DrawTwoToneIcon style={{ fontSize: '40px' }} color="success" />Edit your task
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Input className='inputModel' color="success" value={inputData} onChange={(ev) => { setinputData(ev.target.value) }} placeholder="Edit ..." size="md" variant="outlined" />
                <Button color="success" style={{ marginTop: '15px' }} onClick={() => { Edittask(idfromChild) }} variant="soft"><DrawTwoToneIcon color="success" />Edit</Button>
              </Typography>
            </Box>
          </Modal>
        </Grid>
      </Grid>
<AlertInvertedColors
   openn={alerttype.open}
  color={alerttype.color}
  icon={alerttype.icon}
  text={alerttype.description}
  botton={alerttype.botton}
/>
<CustomizedSnackbars open3={open3} setOpen3={setOpen3}  message={message}/>
  </div>
  <footer>
               <Tooltip title='Select All'>
               </Tooltip>
               <Tooltip title='Add Task'>
               <button className='AddTasck footerButtons '
                      onClick={handleOpen}>
                      <AddBoxOutlinedIcon className='iconFooter'
                      style={{color:'#5563b7',fontSize:'30px'}} />     
              </button>
      </Tooltip >
      <Tooltip title='Delete All'>

      </Tooltip>
  </footer>
  </div>
)
}   
}

