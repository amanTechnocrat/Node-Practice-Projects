import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Editable = ({ back, tempvalue , id}) => {

    const [data, setdata] = useState(tempvalue);

    const stdata = (e) => {
        const name = e.target.name
        const value = e.target.value
        setdata({ ...data, [name]: value })
    }

    const update = async(id) => {
        if(data.firstName.trim().length && data.lastName.trim().length && data.email.trim().length && data.password.trim().length > 0){
        
         let updatedlist = {
            firstName: data.firstName,
            lastName: data.lastName,
            phonenumber:data.phonenumber,
            email: data.email,
            password: data.password,
        }
         await axios.put(`http://localhost:8888/updateuser/${id}`,updatedlist,
         {headers: {
            authorization:`Bearer ${JSON.parse(localStorage.getItem("auth"))}`
          }
         })
         back()
    }
    else{
        alert("Fields cant be empty")
    }
    }

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    return (
        <>
            <tbody>
                <tr>
                    <td>
                        <input type="text" value={data.firstName} onChange={(e) => { stdata(e) }} placeholder='Enter' required="required" name='firstName' />
                    </td>
                    <td>
                        <input type="text" value={data.lastName} onChange={(e) => { stdata(e) }} placeholder='Enter' required="required" name='lastName' />
                    </td>
                    <td>
                        <input type="text" value={data.email} onChange={(e) => { stdata(e) }} placeholder='Enter' required="required" name='email' />
                    </td>
                    <td>
                        <input type="text" value={data.phonenumber} onChange={(e) => { stdata(e) }} placeholder='Enter' required="required" name='phonenumber' />
                    </td>
                    <td>
                        <input type="text" value={data.password} onChange={(e) => { stdata(e) }} placeholder='Enter' required="required" name='password' />
                    </td>
                    <td>
                    <button className='btn btn-primary' onClick={()=>update(id)}>Save</button>
                    <button className='btn btn-primary ml-2' onClick={()=>back()}>Cancel</button>
                    </td>
                </tr>
            </tbody>
        </>
    )
}

export default Editable