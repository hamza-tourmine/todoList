import './App.css';
import Container from '@mui/material/Container';
import All from './Components/All';
import TaskContext from './Context/taskContext';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {
  let taskData =[ {
    taskID:uuidv4(),
    task:'for test',
    type:'',
    date:'',
    done:false
}];
    const [Alltask,setAddtask]=useState(taskData);
  return (
    <TaskContext.Provider value={{Alltask:Alltask,setAddtask:setAddtask,taskData:taskData}} >
<div className="App">
     <Container maxWidth="lg">
     {/* <Header /> */}
     <All/>
     </Container>
   
    </div>
    </TaskContext.Provider>
  );
}

export default App;
