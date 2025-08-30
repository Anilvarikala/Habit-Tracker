import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Profile = () => {

  const [name, setname] = useState('')
  const [email, setEmail] = useState('') 
  const fetchProfile = async () => {
    const userId = localStorage.getItem('appId')
    const profile = await axios.post(`${process.env.Backend_Url}/api/auth/profile`, {
      userId : userId
    })
    setEmail(profile.data.email)
    setname(profile.data.name)
    console.log(profile)
  }
  useEffect(() => {
     fetchProfile()
  },[])
  return (
    <div>
       <h3>{name && name}</h3>
       <h3>{email && email}</h3>
    </div>
  )
}

export default Profile
