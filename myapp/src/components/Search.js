

import CardHeader from '@material-ui/core/CardHeader'
import ButtonBase from '@material-ui/core/ButtonBase'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { useEffect, useState } from 'react'
import InputBase from '@material-ui/core/TextField'
import {makeStyles,fade} from '@material-ui/core/Styles'
import Search from '@material-ui/icons/Search'
import {useHistory} from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.1),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.2),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(2em + ${theme.spacing(5)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
  }));
export default function SearchComponent()
{
    const history = useHistory()
      const classes = useStyles()

    const [user,setuser] = useState('')
    const [users,setusers] = useState([])

    useEffect(()=>{
        console.log(user)
        
        fetch('https://interact-9535.herokuapp.com/user/get?key='+user,{
        method:'GET',
        headers:{'Content-Type':'application/json'}
    }).then((resp)=>{return resp.json()}).then((res)=>setusers(res))
    
},[user])
    const objects = users?.map((object)=>{return(object)})
    return(<div >
        <Autocomplete
    id="autocmplete-clickable"
    style={{ color:'white' }}
    options={objects}

    autoHighlight
    getOptionLabel={(option) => option.username}
    renderOption={(object) => (
        <ButtonBase style={{padding:0,height:'100%',width:'100%'}} onClick={()=>{
          history.push('/users/'+object.userId);
          // window.location.reload()
          }}>
        <CardHeader style={{padding:0}} avatar={ <img width='30rem' height='30rem' style={{borderRadius:'50%'}} src={object.profilePicture}></img>} title={object.username}>
        </CardHeader>
        </ButtonBase>
    )}
    renderInput={(params) => (
      <div  className = {classes.search}>
         <div className={classes.searchIcon}>
      <Search/>
     </div>
        <InputBase
           placeholder="Search…"
           style={{paddingLeft:'3rem',color:'white'}}
           onChange={(e)=>{console.log(user)
            setuser(e.target.value)}}
         {...params}
        inputProps={{
          ...params.inputProps,
        
           // disable autocomplete and autofill
        }}
       />
      </div>

    )}
  />
    </div>)
}