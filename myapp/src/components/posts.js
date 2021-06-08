import React, { useContext,useRef,useState} from "react";
import {AuthContext} from '../App'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
// import { faCheckCircle as faSolid } from '@fortawesome/free-regular-svg-icons'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
export default function Post({post,ind})
{
    const context = useContext(AuthContext)
    const add = post.likes.indexOf(context.user.googleId)===-1
    const [likes,setlikes] = useState(!add)
    const [open,setopen] = useState(false)
    const number = add?post.likes.length:post.likes.length-1
    const comm = useRef('')
    const handleClose =()=>{
        setopen(false)
    }
    const handleOpen =()=>{
        setopen(true)
    }
    const like = ()=>
    {
        fetch('http://localhost:8000/posts/'+post.userId+'/'+post._id+'/like',
        {
            method:'PUT',
            headers:{'Content-Type':'application/json','Authorization':context.tok},
        })
        setlikes(!likes)
        // setadd(add==1?0:1)
    }
    const deletepost = ()=>
    {
        fetch('http://localhost:8000/posts/'+post._id,
        {
            method:'DELETE',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        })
        setopen(false)
        window.location.reload()
    }

    const postcomment = ()=>{
      // console.log(post.userId,post._id)
      fetch('http://localhost:8000/posts/'+post.userId+'/'+post._id+'/comment',
      {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':context.tok},
      body: JSON.stringify({
        comment:comm.current.value,
        username:context.details.username,
        profilePicture:context.details.profilePicture
      })
      })
      window.location.reload()
    }



    const comments = post.comments.map((comment)=>{

      const deletecomment = ()=>{
        // console.log(post.userId,post._id)
        fetch('http://localhost:8000/posts/'+post.userId+'/'+post._id+'/comment/'+comment._id,
        {
        method:'DELETE',
        headers:{'Content-Type':'application/json','Authorization':context.tok},
        })
        window.location.reload()
      }
      return(<Card>
        <CardHeader style={{paddingBottom:'0',width:"100%"}} avatar={<img width='50rem' height='50rem' style={{borderRadius:'50%'}} src={comment.profilePicture}></img>}
        title={<><b>{comment.username}</b><p>{comment.comment}</p></>}
        action={(comment.userId===context.user.googleId || context.user.googleId===post.userId)?
          <IconButton onClick={deletecomment}>
        <DeleteForeverOutlined/>
          </IconButton>:null
        }
        >
        </CardHeader>
          </Card>)
    })

    return(
        <>

        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Confirm</DialogTitle>
        <DialogContent>
            <p>Are you sure you want to delete this post? This cannot be undone.</p>
            <Button onClick={deletepost}>Yes</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogContent>        
      </Dialog>
     {/* <div>
         <div className='card'>
             <div className='card-header text-white bg-dark p-2'>
             <div className='row align-items-center'>
                 <div className='col-2'><img width='50rem' height='50rem' style={{borderRadius:'50%'}} src={context.details.profilePicture}></img></div>
    
                 <div className='col-10'><h5>{context.details.username}</h5></div>
             </div>
             </div>
                 <div style={{backgroundColor:'black'}}>{post.img?<img style={{objectFit:'contain',maxHeight:'30rem'}} className='card-img-top vh-100' src={post.img}/>:<></>}</div>
                 <div className='m-3'>
                 <p>{post.caption}</p>
                 <p><button onClick={like} class='btn'>{likes?<FontAwesomeIcon size='lg' icon={faSolid} />:<FontAwesomeIcon size='lg' icon={faCheckCircle} />}</button>
                <b>  likes: {number+likes?0:1}</b></p>
             </div>
                </div>
                </div> */}
                        <Accordion >
          <AccordionSummary style={{padding:'0'}}>
    <Card style={{width:'100%'}}>
      <CardHeader
        avatar={
            <img width='50rem' height='50rem' style={{borderRadius:'50%'}} src={post.profilePicture}></img>
        }
        action={post.userId===context.user.googleId?
          <IconButton aria-label="settings" onClick={handleOpen} >
        <DeleteForeverOutlined/>
          </IconButton>:null
        }
        title={<h5>{post.username}</h5>}
        subheader="September 14, 2016"
      />
    <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
     <img style={{objectFit:'contain',maxHeight:'30rem'}} src={post.img}/>
    </div>
      <CardContent >
        <Typography variant="body2" color="textSecondary" component="p">
            <b>{post.caption}</b>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={like}>
        {likes?<CheckCircle/>:<CheckCircleOutlinedIcon/>}
        </IconButton>
        <b>Likes: {likes?number+1:number}&nbsp;</b>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <b>&nbsp; comments </b><IconButton
        //   onClick={handleExpandClick}
        //   aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
    </AccordionSummary>
    <AccordionDetails>
    <Grid container >
        <div style={{width:'100%'}}>{comments}</div>
        <div style={{width:'100%'}}>
          
        <Card>
        <CardHeader style={{paddingBottom:'0',width:"100%"}} avatar={<img width='50rem' height='50rem' style={{borderRadius:'50%'}} src={context.details.profilePicture}></img>}
        title={<><b>{context.details.username}</b>
                  <Grid container>
                    
          <Grid item xs={10}>
          <TextField style={{marginBottom:'1rem'}}
          inputRef = {comm}
          fullWidth
          label="comment"
          placeholder="Type your comment"
          multiline
          rowsMax={6}
        /></Grid>
        <Grid item xs={2}>
          <Button variant='contained' color='primary' onClick={postcomment}>
            Comment
          </Button></Grid>
        </Grid>
        </>}>
        </CardHeader>
          </Card>
</div>
</Grid>

    </AccordionDetails>
    </Accordion>
    </>
)
}