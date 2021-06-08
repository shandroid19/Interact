import {useParams} from 'react-router-dom'
import React, {useRef,useState,useEffect, useContext} from "react";
import {AuthContext} from '../App'
import {useGoogleLogin} from 'react-google-login'
import Post from './posts'
 function Feed()
{
    const [page, setPage] = useState(0);
    const [max,setmax] = useState(0)
    const {id} = useParams();
    const link = id?'http://localhost:8000/posts/'+id+'/posts?p='+page:'http://localhost:8000/posts?p='+page
    const clientId='504774353232-i4ctofb91259kii33088t50e8cl2c2si.apps.googleusercontent.com'
const {signIn} = useGoogleLogin({client_id:clientId})
    const [posts,setposts] = useState([])
    const context = useContext(AuthContext)
    useEffect(()=>{
        if(!window.gapi)
           signIn()
     },[window.gapi])


     const loader = useRef(null);
 
     useEffect(() => {
          var options = {
             root: null,
             rootMargin: "20px",
             threshold: 1.0
          };
         // initialize IntersectionObserver
         // and attaching to Load More div
          const observer = new IntersectionObserver(handleObserver, options);
          if (loader.current) {
             observer.observe(loader.current)
          }
 
     }, []);
 
 
     useEffect(() => {
         // here we simulate adding new posts to List
         console.log(page)

         fetch(link,{
            method:'GET',
            headers:{'Content-Type':'application/json','Authorization':context.tok}
        }).then((res)=>{
            return res.json()
        }).then((response)=>{
            console.log(response)
            setposts(posts.concat(response.posts))
            setmax(response.pages)
        })
     }, [page])
     const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && page>max) {  
            setPage((page) => page + 1)
        }
    }

    // useEffect(()=>{
    //     fetch(link,{
    //         method:'GET',
    //         headers:{'Content-Type':'application/json','Authorization':context.tok}
    //     }).then((res)=>{
    //         return res.json()
    //     }).then((response)=>{
    //         setposts(response)
    //     })
    // },[context.details])
    const post = posts.map((pos,index)=>{

       return (<div key={index} className='row d-flex justify-content-center'><div className='col-6 my-4'><Post post={pos} ind={index}></Post></div></div>)
    })
    return (<>{post}
                <div className="loading" ref={loader}>
           </div></>)
    
}
export default Feed;

// import React, {Component,useRef,useState,useMemo, useContext} from "react";
// import AuthContext from '../App'
// class Feed extends React.Component
// {
//     // static context = AuthContext;
//     constructor(props) {
        
//         super(props);
//         this.state = {post:[]};
//       }
//     componentDidMount(){
//         console.log(this.context)
//         console.log(this.props)
//         // const resp= fetch('http://localhost:8000/posts/'+user._id,{
//         //     method:'GET',
//         //     headers:{'Content-Type':'application/json'}
//         // }).then((resp)=>{return resp.json()}).then(resp=>this.state.setposts(resp))
        
//             fetch('http://localhost:8000/posts'+this.props.link,{headers:{'Authorization':'bearer '+this.props.tok}})
//               .then(response => response.json())
//               .then(data =>{ this.setState({ post:data });console.log(this.state)});
          
//               console.log(this.state)
//     }


//     render(){
//     const posts = this.state.post.map((p)=>{
    
//         return(
//         <div key={p._id} className='row justify-content-center d-flex m-5'>
//             <div className = 'card postcard p-2'>
//                 <div className='card-header'><img className='dp'src={p.profilePicture}/>
//                 {p.username}</div>
//                 <img className = 'col-12'src={p.img}></img>
//                 <div className='card-body'>{p.caption}</div>
//                 </div>
//             </div>)
//     })
//     return (<div>{this.state.post.length?posts:<h1>no posts</h1>}</div>)
//     }
// }
// Feed.context = AuthContext;
// export default Feed;

