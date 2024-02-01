import React, { useState, useEffect } from 'react'

import Readonly from './Readonly'
import Editable from './Editable'

import axios from 'axios'

const Showinfo = () => {
  const [data, setdata] = useState([]);
  const [flag, setFlag] = useState(true);
  const [edit, setedit] = useState(null);
  const [temval, settemval] = useState();


  const showdata = async () => {
    let res = await axios.get(`http://localhost:8888/getdata`,{
      headers: {
      authorization:`Bearer ${JSON.parse(localStorage.getItem("auth"))}`
    }
  })
    setdata(res.data)
  }

  const delelist = async(id)=>{
     await axios.delete(`http://localhost:8888/deleteuser/${id}`,{
      headers: {
        authorization:`Bearer ${JSON.parse(localStorage.getItem("auth"))}`
      }
     })
    setFlag(!flag)
  }
  const back = () =>{
    setedit("")
  }
  const uplist=  async(data,id)=>{
    // setFlag(!flag)
    setedit(id)
    settemval(data)
  }

  useEffect(() => { showdata() }, [flag,edit]);

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone-No</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        {data.map((val) => {
          return (<>
            {edit === val.id ? <Editable back={back} tempvalue={temval} id={edit} /> : <Readonly val={val} uplist={uplist} delelist={delelist} />}
            </>
            )})}
      </table>
    </>
  )
}

export default Showinfo