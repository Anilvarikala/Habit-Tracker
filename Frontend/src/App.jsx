import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/HomePage/Home'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Profile from './components/Profile/Profile'

const App = () => {  

  const [authenticated, setauthenticated] = useState(false)
  
  // useEffect(async () => {

  //   if(localStorage.getItem("AnilToken")){
  //     setauthenticated(true)
  //   }
  //     //  const result = await axios.get("http://localhost:3000/api/auth/isauthenticated",{
  //     //   headers : {
  //     //     token : localStorage.getItem("AnilToken") || ""
  //     //   }
  //     //  })
  //     //  console.log(result)
       
  // },[])

  return (
    <Router>
      <Routes>
         <Route path='/' element={<Home/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/signup' element={<Signup/>}></Route>
         
      </Routes>
    </Router>
  )
}

export default App
