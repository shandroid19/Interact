// import {useRef,useContext, useState} from 'react';
// import {AuthContext} from '../App';

// export default function Register()
// {
//     const context = useContext(AuthContext)
//     const [existerr,setexisterr] = useState(false)
//     async function handleSubmit(e)
//     {   
//         e.preventDefault();
//         const resp= await fetch('http://localhost:8000/auth/signup',{
//             method:'POST',
//             body: JSON.stringify({username:username,email:email,password:password}),
//             headers:{'Content-Type':'application/json','Accept':'application/json'}
//         })
//         if(resp.status==500 || resp.status==400)
//             setexisterr(true)
//         else{
//         const out = await resp.json()
//         localStorage.setItem('user', JSON.stringify(out.user))
//         console.log(out.user)
//         context.setuser(out.user)
//         setexisterr(false)
//         }
//     } 

//     const [username,setusername] = useState('')
//     const [password,setpassword] = useState('')
//     const [email,setemail] = useState('')
//     return (
//             <div className='container d-flex m-5 justify-content-center'>
//                 <div className='card p-5 col-5'>
//                     <h1>Pigeon</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className='form-group'>
//                     <div className='row d-flex justify-content-center'>
//                     <input onChange={(e)=>setusername(e.target.value)} className='col-5 form-control m-2' placeholder='username' type='text' ></input>
//                     </div>
//                     <div className='row d-flex justify-content-center'>
//                         <input onChange={(e)=>setemail(e.target.value)} className='col-5 form-control m-2' placeholder='email id' type='email'></input>
//                     </div>
//                     <div className='row d-flex justify-content-center'>
//                         <input onChange={(e)=>setpassword(e.target.value)} className='col-5 form-control m-2' placeholder='password' type='password'></input>
//                     </div>
//                     <div className='row d-flex justify-content-center'>
//                     <button className='btn btn-primary col-4 m-2' type='submit'>Login</button>
//                     </div>
//                     </div>
//                 </form>
//                 {existerr?<div className='jumbotron'>User already exists</div>:<></>}
//                 <p>already have an account? login </p><a href='http://localhost:3000/login'>here</a>

//                 </div>
//             </div>
//     )
// }
import {useContext, useRef, useState} from 'react';
import {AuthContext} from '../App';
import { Redirect,Link,useHistory} from 'react-router-dom'
export default function Login()
{
    const context = useContext(AuthContext)
    const [autherr,setautherr] = useState(false)
    let history = useHistory();
    async function handleSubmit(e)
    {   
        e.preventDefault();
        const resp= await fetch('http://localhost:8000/auth/signup',{
            method:'POST',
            body: JSON.stringify({username:username,email:email,password:password,profilePicture:dp,coverPicture:cover,city:city,bio:bio}),
            headers:{'Content-Type':'application/json'}
        })
        if (resp.status ===500 ){
            setautherr(true)
        }
        else{
        const out = await resp.json()
        // context.user=out.user
        localStorage.setItem('user', JSON.stringify(out.user))
        context.setuser(out.user)
        setautherr(false)
        history.push('/')
        }
        } 
    const [user,setuser] = useState(context.user)
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const [email,setemail] = useState('')
    const [bio,setbio] = useState('')
    const [dp,setdp] = useState('')
    const [cover,setcover] = useState('')
    const [city,setcity] = useState('')

    return (
            <div className='container d-flex m-5 justify-content-center'>
                <div className='card p-5 col-sm-6'style={{backgroundColor:'#53baf5',color:'white'}}>
                    <h1>Pigeon</h1>
                    {/* <h1>{context.user.username}</h1> */}
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                    <div className='row d-flex justify-content-center'>
                    <div className='col-sm-6'><input onChange={(e)=>setusername(e.target.value)} className=' form-control m-2' placeholder='username' type='text' ></input></div>

                    <div className='col-sm-6'><input onChange={(e)=>setpassword(e.target.value)} className=' form-control m-2' placeholder='password' type='password'></input></div>
                     </div>

                    <div className='row d-flex justify-content-center'>
                       <div className='col-12'> <input onChange={(e)=>setemail(e.target.value)} className='form-control m-2' placeholder='email' type='email'></input></div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                       <div className='col-12'> <input onChange={(e)=>setcity(e.target.value)} className='form-control m-2' placeholder='city' type='text'></input></div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                       <div className='col-12'> <textarea onChange={(e)=>setbio(e.target.value)} className='form-control m-2' placeholder='bio' type='area'></textarea></div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                       <div className='col-12'> <input onChange={(e)=>setdp(e.target.value)} className='form-control m-2' placeholder='display pic' type='text'></input></div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                       <div className='col-12'> <input onChange={(e)=>setcover(e.target.value)} className='form-control m-2' placeholder='cover' type='text'></input></div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                    <button className='btn btn-primary col-sm-4 m-2 ' type='submit'>Login</button>

                    </div>
                    </div>
                </form>
                {autherr?<div className='card' style={{backgroundColor:'#facfeb',border:'red'}}>user already exists</div>:<></>}
                <p>already hav an account? log in </p><a onClick={()=>history.push('/register')}>here</a>

                </div>
            </div>
    )
}