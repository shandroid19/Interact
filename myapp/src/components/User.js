import React, {useRef,useState, useContext, useEffect} from "react";
import Addpost from './Addpost'
import {useParams,useHistory } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'


import {AuthContext} from '../App'
import { Typography,Switch,DialogContent,Dialog,DialogTitle,CardHeader,CardContent,Card,Grid,CircularProgress,InputBase,TextField,ButtonBase,Avatar } from "@material-ui/core";

function User()
{
    const {id} = useParams()
    const context = useContext(AuthContext)
    const [details,setdetails ] = useState(null)
    var eyed = id
    const [edit,setedit] = useState(false)
    const [loading,setloading] = useState(false)


    // const [cover,setcover]= useState(context.details.cover)
    const [dp,setdp]= useState(null)
    const [openfollowers,setopenfollowers] = useState(false)
    const [openfollowings,setopenfollowings] = useState(false)
    const [followers,setfollowers] = useState([])
    const [followings,setfollowings] = useState([])
    const username = useRef(context.details.username)
    const bio = useRef(context.details.bio)
    const city = useRef(context.details.city)
    const name = useRef(context.details.name)
    const [priv,setpriv] = useState(context.details.private)
    const [dark,setdark] = useState(context.details.darkmode)
    const followingsloader = useRef(null);
const [followingspage,setfollowingspage] = useState(1)
const [followingsmax,setfollowingsmax] = useState(1)
const followerloader = useRef(null);
const [followerpage,setfollowerpage] = useState(1)
const [followermax,setfollowermax] = useState(1)
    const history = useHistory()
    useEffect(()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+id+'/get',
        {
            method:'GET',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{return resp.json()}).then((res)=>{setdetails(res);})
    },[id])
    useEffect(()=>{if(details)setdp(details.profilePicture)},[details])
    const setEdit = ()=>{setedit(true);setdark(details.darkmode);setpriv(details.private)}
    const follow = ()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+eyed+'/follow',
        {
            method:'PUT',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{console.log(resp.json())})
        window.location.reload()
    }
    const unfollow = ()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+eyed+'/unfollow',
        {
            method:'PUT',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{console.log(resp.json())})
        window.location.reload()
    }

    const sendrequest = ()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+eyed+'/sendrequest',
        {
            method:'POST',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{console.log(resp.json())})
        window.location.reload()
    }

    const cancelrequest = ()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+eyed+'/cancelrequest',
        {
            method:'DELETE',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{console.log(resp.json())})
        window.location.reload()
    }

    const rejectrequest = ()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+eyed+'/rejectrequest',
        {
            method:'DELETE',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{console.log(resp.json())})
        window.location.reload()
    }
    const acceptrequest = ()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+eyed+'/acceptrequest',
        {
            method:'POST',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((resp)=>{console.log(resp.json())})
        window.location.reload()
    }
    const uploadImage = async e=> {
        setloading(true)
        const files = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset','pigeon')
        let filname=files[0].name.toLowerCase();
        if(!(filname.endsWith('.jpg')||filname.endsWith('.png')||filname.endsWith('.jpeg')))
          {
            alert("Only '.png' , '.jpg' and '.jpeg' formats supported!");
            return;
          }          
        const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
        {
            method: 'POST',
            body:data
        })
        const file = await res.json()
        setdp(file.secure_url);
        setloading(false)
    }

    async function handleSubmit(e)
    {   
        e.preventDefault();
        console.log(context.tok)
        fetch('https://interact-9535.herokuapp.com/user',{
            method:'PUT',
            headers:{'Content-Type':'application/json','Authorization':context.tok},
            body: JSON.stringify({username:username.current.value,name:name.current.value,profilePicture:dp,city:city.current.value,bio:bio.current.value,darkmode:dark,private:priv}),
        }).then(()=>{window.location.reload()})
        } 

    const getfollowers = ()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+details.userId+'/followers?p=1',{
            method:'GET',
            headers:{'Content-Type':'application/json','Authorization':context.tok},
            
        }).then((res)=>{return res.json()})
        .then((resp)=>{
            console.log(resp)
            setfollowers(resp.followers)
            setfollowermax(resp.pages)
        }).then(()=>setopenfollowers(true))
    } 


    const getfollowings = ()=>{
        fetch('https://interact-9535.herokuapp.com/user/'+details.userId+'/followings?p=1',{
            method:'GET',
            headers:{'Content-Type':'application/json','Authorization':context.tok},
            
        }).then((res)=>{return res.json()})
        .then((resp)=>{
            console.log(resp)
            setfollowings(resp.followings)
            setfollowingsmax(resp.pages)
        }).then(()=>setopenfollowings(true))
    } 

    const pushconversation = ()=>{
        history.push('/chat?id='+details.userId)
    }

//followers handler  

const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && followerpage<followermax) {  
        setfollowerpage((followerpage) => followerpage + 1)
    }
    
}

useEffect(()=>{
    if(details){
    fetch('https://interact-9535.herokuapp.com/user/'+details?.userId+'/followers?p='+followerpage,{
        method:'GET',
        headers:{'Content-Type':'application/json','Authorization':context.tok},
    }).then((res)=>{return res.json()})
    .then((resp)=>{
        setfollowers(followers.concat(resp.followers))
        setfollowermax(resp.pages)
    }).then(()=>setopenfollowers(true))
    }
},[followerpage])

useEffect(() => {

     var options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0
     };


     const observer = new IntersectionObserver(handleObserver, options);
     if (followerloader.current) {
        observer.observe(followerloader.current)
     }

}, [followers,followermax]);

// const followersdialog =<Dialog open={openfollowers} onClose={()=>setopenfollowers(false)}>
// <DialogTitle style={{paddingBottom:0}}><Typography>Followers</Typography></DialogTitle>
// <DialogContent style={{height:'60vh'}}>
// { followers.map((user,index)=>{return <ButtonBase style={{width:'100%'}} onClick={()=>history.push(user.userId)}><CardHeader key={index} avatar={<Avatar src={user.profilePicture}></Avatar>} title={user.username}>
// </CardHeader></ButtonBase>})}
// <div ref={followerloader}></div>
// </DialogContent>
// </Dialog>
const followersdialog =<Dialog  open={openfollowers} onClose={()=>setopenfollowers(false)}>
<DialogTitle style={{paddingBottom:0}}><Typography>Followers</Typography></DialogTitle>
<DialogContent style={{height:'60vh'}}>
{ followers.map((user,index)=>{return <ButtonBase style={{width:'100%'}} onClick={()=>history.push(user.userId)}><CardHeader  key={index} avatar={<Avatar src={user.profilePicture}></Avatar>} title={user.username}>
</CardHeader></ButtonBase>})}
<div ref={followerloader}></div>
</DialogContent>
</Dialog>

//follower handler ends here

//following handler starts here

const handleobserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && followingspage<followingsmax) {  
        setfollowerpage((followingspage) => followingspage + 1)
    }
    
}

useEffect(()=>{
    if(details){
    fetch('https://interact-9535.herokuapp.com/user/'+details.userId+'/followings?p='+followingspage,{
        method:'GET',
        headers:{'Content-Type':'application/json','Authorization':context.tok},
    }).then((res)=>{return res.json()})
    .then((resp)=>{
        setfollowings(followings.concat(resp.followings))
        setfollowingsmax(resp.pages)
    }).then(()=>setopenfollowings(true))
}
},[followingspage])

useEffect(() => {

     var options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0
     };


     const observer = new IntersectionObserver(handleobserver, options);
     if (followingsloader.current) {
        observer.observe(followingsloader.current)
     }

}, [followings,followingsmax]);

const followingsdialog =<Dialog  open={openfollowings} onClose={()=>setopenfollowings(false)}>
<DialogTitle style={{paddingBottom:0}}><Typography>Following</Typography></DialogTitle>
<DialogContent style={{height:'60vh'}}>
{ followings.map((user,index)=>{return <ButtonBase style={{width:'100%'}} onClick={()=>history.push(user.userId)}><CardHeader  key={index} avatar={<Avatar src={user.profilePicture}></Avatar>} title={user.username}>
</CardHeader></ButtonBase>})}
<div ref={followingsloader}></div>
</DialogContent>
</Dialog>
//following handler ends here


    return(<>
       
        <div>{details?
        <div>
        {edit?<>
        
        <Grid container justify='center' alignItems='center'>
  <Grid item item lg={7} md={9} sm={10}>
  <Box boxShadow={20} style={{margin:'1rem'}}  boxshadow={20}>
  <Card >
      <CardContent>
          <Grid container container justify='center' alignItems='center' spacing={4}>
                 <Grid item xs={3} md={2}>
                 {loading?<CircularProgress/>:<img style={{width:'100%'}} src={dp}/>}
               <input  onChange={uploadImage} accept="image/*" id='inputpic' type='file' hidden/> 
                 <label htmlFor='inputpic'>       
               <Button variant='contained' style={{marginTop:'1rem'}} color='primary' component='span'>upload</Button>
                </label>

                </Grid>
      <Grid item xs={9} md={10}>
      <Grid container direction='column' spacing={1}>
              <Grid item sm={8}>
                 <TextField inputRef={username} fullWidth variant='standard' label='Username' defaultValue={details.username} />
              </Grid>
              <Grid item sm={12}>
              <TextField inputRef={name} fullWidth variant='standard' label='name' defaultValue={details.name} />
              </Grid>
              <Grid item sm={8}>
              <TextField inputRef={city} fullWidth variant='standard' label='City' defaultValue={details.city} />
              </Grid>
              <Grid item sm={8}>
              <TextField inputRef={bio} fullWidth rows={4} multiline variant='filled' label='Bio' defaultValue={details.bio} />
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={6}>
                    <label>Dark theme</label>
                    <Switch  checked={dark} onChange={()=>{setdark(!dark);console.log(dark)}}></Switch>
                    </Grid>
                    <Grid item xs={6}>
                    <label>Private</label>
                    <Switch   checked={priv} onChange={()=>setpriv(!priv)}></Switch>
                    </Grid>
                </Grid>
                </Grid>
              <Grid item sm={4}>
                  {/* {context.user.googleId===id?edit?<div><Button onClick={handleSubmit} variant='primary'>save</Button> <Button onClick={()=>{setedit(false)}}>close</Button></div>:<Button variant='outlined' color='primary' onClick={setEdit}>Edit profile</Button>:  
      details.followers.indexOf(context.user.googleId)===-1?<Button onClick={follow} variant="contained" color="primary">
      Follow</Button>:
  <Button onClick={unfollow} variant="contained" color="secondary">Unfollow</Button>} */}
                <Grid container>
                    <Grid item xs={6}>
                    <Button onClick={handleSubmit} variant='outlined'>save</Button>
                    </Grid>
                    <Grid item xs={6}>
                    <Button onClick={()=>{setedit(false)}} variant='outlined' >close</Button>
                    </Grid>
                </Grid>
              </Grid>
          </Grid>

      </Grid>
      </Grid>
      </CardContent>
  </Card>
  </Box>
  </Grid>
</Grid>
        </>:
        <>
        {followersdialog}
        {followingsdialog}
        <Grid container justify='center' alignItems='center'>
  <Grid item lg={7} md={9} sm={10}>
 <Box boxShadow={20} style={{margin:'1rem'}}> 

  <Card >
    {/* <Card style={{background:'linear-gradient(45deg, #8F00FF 30%, #d4bdff 90%)'}}> */}
    {/* <Card style={{background:'linear-gradient(45deg, #c3dcfa 30%, #509ffa 90%)'}}> */}

      <CardContent>
          <Grid  container justify='center' alignItems='center' spacing ={4}>
          <Grid item xs={3} md={2}>
              <img style={{width:'100%'}} src={details.profilePicture}/>
          </Grid>
      <Grid item xs={9} md={10}>
          <Grid container >
              <Grid item xs={12}>
                 <Typography variant='h6'>{details.username}</Typography>
              </Grid>
              <Grid item xs={12}>
              <Typography>{details.name}</Typography>
              </Grid>
              <Grid item xs={12}>
              <Typography>{details.city}</Typography>
              </Grid>
              <Grid item  sm={5} xs={12}>
                <a onClick={getfollowers}><Typography>Followers : {details.followers.length-1}</Typography></a>
              </Grid>
              <Grid item sm={5} xs={12}>
                <a onClick={getfollowings}><Typography>Following : {details.followings.length-1}</Typography></a>
              </Grid>
              <Grid item xs={12}>
                <Typography>{details.bio}</Typography>
              </Grid>
              <Grid item xs={6} style={{marginTop:'1rem'}}>
                  <Grid container>
<div style={{width:'100%'}}>{
context.user.googleId===id?<Grid item xs={6}><Button variant='outlined' onClick={setEdit}>Edit profile</Button></Grid>:  
<div >
        
{ details.requests.indexOf(context.user.googleId)===-1?
      <Grid item xs={3}>{details.followers.indexOf(context.user.googleId)===-1?
    <Button onClick={sendrequest} variant="contained" color="primary">
      Follow
  </Button>:
  <Button onClick={unfollow} variant="contained" color="secondary">
      Unfollow
  </Button>}</Grid>:    <Grid item xs={3}>
    <Button onClick={cancelrequest} variant="contained" color="secondary">
    Requested
</Button></Grid>}
<Grid item xs={3}><Button onClick={pushconversation} style={{marginTop:'1rem'}} variant='outlined'>Chat</Button></Grid>
  {details.requested.indexOf(context.details.userId)===-1?<></>:
        <Grid item xs={12} style={{marginTop:'1rem'}}>
        <Grid container>
            <Grid item xs={6}>
        <Button color='secondary' variant='contained' onClick={acceptrequest}>Accept</Button>
            </Grid>
            <Grid item xs={6}>
        <Button style={{backgroundColor:'red'}} variant='contained' onClick={rejectrequest}>Reject</Button>
            </Grid>
        </Grid>
        </Grid>
    }
  </div>
  }</div>
</Grid>
    </Grid>

    </Grid>
 
      </Grid>
      </Grid>
      </CardContent>
  </Card>
  </Box>
  </Grid>
</Grid>
        </>}</div>
  
    :<LinearProgress />}</div>
    {eyed===context.user.googleId?<Addpost/>:<></>}
    </>
    )
    
}
export default User;

