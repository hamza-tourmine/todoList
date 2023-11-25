import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import AccessAlarmTwoToneIcon from '@mui/icons-material/AccessAlarmTwoTone';



export default function Header({all ,done ,study,work,sport,later,searchValue,handleChenge,}){
    
    return(
        <div>
            <Stack direction="row" spacing={2}>
                <Button variant="text" onClick={()=>{all()}}>ALL </Button>
                <Button variant="text" onClick={()=>{done()}} > <CheckCircleTwoToneIcon style={{color:'#07b761'}}/>Done</Button>
                <Button variant="text" onClick={()=>{study()}}><SchoolIcon style={{color:'#ffac3a',hover:'white'}}/>Study </Button>
                <Button variant="text"  onClick={()=>{sport()}}> <EmojiEventsTwoToneIcon style={{color:'#6298fe'}}/>Sport </Button>
                <Button variant="text" onClick={()=>{work()}}> <BusinessCenterTwoToneIcon style={{color:'#00f78a'}}/>Work </Button>
                <Button variant="text" onClick={()=>{later()}} > <AccessAlarmTwoToneIcon style={{color:'#ffac3a'}}/>Later </Button>
               
                  {/* <Button> */}
                    {/* <Input placeholder='Search...'value={searchValue} onChange={(ev)=>{handleChenge(ev.target.value)}}/>
                    <SearchSharpIcon onClick={Search()}/> */}
                    {/* </Button> */}
                {/* </Stack> */}
            </Stack>
        </div>
    )
}