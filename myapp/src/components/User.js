import React, {useRef,useState, useContext, useEffect} from "react";
// import {Link} from 'react-dom'
import Addpost from './Addpost'
import {useParams } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import {AuthContext} from '../App'

function User()
{
    const {id} = useParams()

    const context = useContext(AuthContext)
    const [details,setdetails ] = useState(null)
    const eyed = id?id:context.user.googleId
    useEffect(()=>{
        fetch('http://localhost:8000/user/'+eyed+'/get',
        {
            method:'GET',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{return resp.json()}).then((res)=>{setdetails(res)})
    },[])
    const follow = ()=>{
        fetch('http://localhost:8000/user/'+eyed+'/follow',
        {
            method:'PUT',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{console.log(resp.json())})
        window.location.reload()
    }
    const unfollow = ()=>{
        fetch('http://localhost:8000/user/'+eyed+'/unfollow',
        {
            method:'PUT',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{console.log(resp.json())})
        window.location.reload()
    }
    return(<>
        <div>{details!==null?<div className='card p-3 mx-5'>
        <div className='row d-flex align-items-center'>
            <div className='col-1 align-item-center'><img className='col-12' style={{borderRadius:'50%'}}src={details.profilePicture}/></div>
            <div className='col-9'>
            <div className='row'>
                <div className='col-4'><h4 style={{display:'inline'}}>{details.username}</h4></div><div className='col-8'></div>
            </div>
            <div className='row'>
                <div className='col-2'><p style={{display:'inline'}}>Followers: </p><h5 style={{display:'inline'}}>{details.followers.length-1}</h5>
                </div>
                <div className='col-9'><p style={{display:'inline'}}>Following: </p><h5 style={{display:'inline'}}>{details.followings.length-1}</h5>
            </div>
            </div>
            <div className='row'>
                <p>City: {details.city}</p>
            </div>
            <div className='row'>
                <p>Bio: {details.bio}</p>
            </div>
            <div className='row'>
            <Grid>
                {context.user.googleId===eyed?<></>:
            details.followers.indexOf(context.user.googleId)===-1?<Button onClick={follow} variant="contained" color="primary">
                Follow
            </Button>:
            <Button onClick={unfollow} variant="contained" color="secondary">
                Unfollow
            </Button>}
            </Grid>
            </div>
            </div>
        </div>
    </div>:<LinearProgress />}</div>
    {eyed===context.details.userId?<Addpost/>:<></>}
    </>
    )
    
}
export default User;