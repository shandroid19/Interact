import {useParams} from 'react-router-dom'
import React, {useRef,useState,useEffect, useContext} from "react";
import {AuthContext} from '../App'
import {useGoogleLogin} from 'react-google-login'
import Post from './posts'
import {Typography,Grid,Card,CardContent} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';

 function Feed()
{
    const [page, setPage] = useState(1);
    const [max,setmax] = useState(1)
    const {id} = useParams();
    const clientId='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
    const {signIn} = useGoogleLogin({client_id:clientId})
    const [posts,setposts] = useState([])
    const [prev,setprev] = useState('')
    const [loading,setloading] = useState(false)
    const context = useContext(AuthContext)
    useEffect(()=>{
        if(!window.gapi)
           signIn()
     },[window.gapi])


     const loader = useRef(null);
 
     useEffect(() => {
         if(id!==prev)
         {
            console.log("calling")
            const link = id?'https://interact-9535.herokuapp.com/posts/'+id+'/posts?p='+page:'https://interact-9535.herokuapp.com/posts?p='+page

            if(max>=page){fetch(link,{
               method:'GET',
               headers:{'Content-Type':'application/json','Authorization':context.tok}
           }).then((res)=>{ 
               return res.json()
           }).then((response)=>{
            setposts(posts=>response.posts)
            setmax(response.pages)     
           })
        }

            setprev(prev=>id)
         }
         console.log(id,prev)
         console.log(posts)
         setloading(true)
         setTimeout(()=>setloading(false),2000)
          var options = {
             root: null,
             rootMargin: "20px",
             threshold: 1.0
          };


          const observer = new IntersectionObserver(handleObserver, options);
          if (loader.current) {
             observer.observe(loader.current)
          }
 
     }, [posts,max]);
 
     useEffect(()=>{
        setmax(1);
        setPage(1);
     },[id])

     useEffect(() => { 
        // page==1 && setposts([])
        // console.log(page)
        const link = id?'https://interact-9535.herokuapp.com/posts/'+id+'/posts?p='+page:'https://interact-9535.herokuapp.com/posts?p='+page
         if(max>=page){fetch(link,{
            method:'GET',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((res)=>{
            
            return res.json()
        }).then((response)=>{
        // if(id){
        //     console.log(prev,id)

        //     if(id !== prev && id!='')
        //         console.log(id,prev)
        //     // window.location.reload();
        //     // {
        //     //     // const myPromise = new Promise
        //     // setposts([])
        //     //  setprev(id)
        //     //  console.log(id,prev)
        //     // }
        //     // {
        //      setposts(posts=>posts.concat(response.posts))
        //     setmax(response.pages)
        //     // }
        // }
        // else
        if(id==prev)
        {
            setposts(posts=>posts.concat(response.posts))
            setmax(response.pages)
        }
        })
    }
     }, [page,id])
     const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && page<max) {  
            
            setPage((page) => page + 1)
            
        }
    }


    const post = posts.map((pos,index)=>{
       return (<div key={index}><Grid container  justify='center'>
           <Grid style={{width:'100%'}} item sm={10} md={8} lg={6} xs={12}><Post post={pos}></Post></Grid>
           </Grid></div>)
    }) 
    return (<>
    {post.length?post:<div><Grid style={{marginTop:'2rem',marginBottom:'3rem'}} container justify='center'>
          <Grid item xs={6}>
              <Card>
                  <CardContent>
                      {loading?<>
              <Skeleton variant="text" />
                <Skeleton variant="circle" width={60} height={60} />
                 <Skeleton variant="rect" height={118} /></>:<Grid container justify='center'><Grid item><Typography>No visible posts</Typography></Grid></Grid>
                      }
                 </CardContent>     
            </Card>
            </Grid>
        </Grid></div>}
            <div className="loading" ref={loader}>
           </div>
           </>)
    
}
export default Feed;

