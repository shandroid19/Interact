// import React, {useRef,useState,useMemo, useContext} from "react";
// import {AuthContext} from '../App'
// import User from './User'
// import {
//   useRouteMatch,
//   useHistory,
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
//   Link
// } from "react-router-dom";
// import Feed from './Feed'

//  function Body()
// {
//   const {path,url} = useRouteMatch();
//   const context = useContext(AuthContext)
//   var history = useHistory();
//   console.log(context.user)
//   // const logout = async ()=>{await fetch('http://localhost:8000/auth/logout',{
//   //   method:'GET',headers:{'Content-Type':'application/json'}})
//   // localStorage.clear();
//   // history.push('/login')
//   // context.setuser({})
//   // }
//   const user = context.user;
//   return (

//         // <Router>
//         <div>
          
//           {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//             <h1 className=' m-5 navbar-brand'>Pigeon</h1>
//           <ul className="navbar-nav mr-auto">
//             <li><Link to={`${url}/feed`} className="nav-link m-2"> Feed </Link></li>
//             <li><Link to={`${url}/about`} className="nav-link m-2">About</Link></li>
//           </ul>

          
//             <div className='row align-items-center mr-5 ms-auto'> 

//       <div className='col-4'><input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/></div>
//       <div className='col-2'><button className="btn btn-outline-success " type="submit">Search</button></div>
             
    
//           {user?<div className='col-6'><div className='row'><div className='col-6 m-3'><Link className='btn btn-secondary' to={'/user'}><h4 className = 'col-6'style={{color:'floralwhite'}}>{user.username}</h4></Link></div><div className ='col-5 m-3'><button className="btn btn-danger" onClick={logout}>logout</button></div></div></div>
//           : <div className='col-6'><button onClick={()=>history.push('/login')} className="btn btn-success m-4">login</button></div>}
//          </div>
      
//           </nav> */}
//           {/* <Switch>
//               <Route path={`${path}/feed`}><Feed/></Route>
//               <Route path={`${path}/user`}><User/></Route>

//           </Switch> */}
//         </div>
//       // </Router>
    
//       );
    
// }
// export default Body;