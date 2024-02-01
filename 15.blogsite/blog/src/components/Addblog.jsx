import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Getaccess from '../Services/Getaccess'
import ss from '../Services/ss'

const Addblog = () => {
    const Navigate = useNavigate()
    const [data, setdata] = useState("");

    const stdata = (e) => {
        const name = e.target.name
        const value = e.target.value
        setdata({ ...data, [name]: value })
    }

    const sendblog = async (e) => {
        const userid = localStorage.getItem("ID")
        e.preventDefault();
        if (data.title.trim().length && data.category.trim().length && data.blogbody.trim().length > 0) {

            let senddata = {
                title: data.title,
                category: data.category,
                body: data.blogbody,
                userid: userid
            }
            adddd(senddata)
            // let res = await axios.post(`http://localhost:8888/addblog`, senddata,
            //     {
            //         headers: {
            //             authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
            //         }
            //     })
            // if (res.data.msg === "Token has expired") {
            //     await Getaccess()
            //     let res = await axios.post(`http://localhost:8888/addblog`, senddata,
            //         {
            //             headers: {
            //                 authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
            //             }
            //         })
            //         Navigate('/home')
            // } else {
            //     Navigate('/home')
            // }
        }
        else {
            alert("Fields cant be empty")
        }
    }

    const adddd = async(data)=>{
        try {
            const response = await ss.callapi({
                methodName: ss.postMethod,
                api_url: ss.addblog,
                body: data
            });
            if (response) {
                Navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='container'>
                <label className='centre'>ADD Blog</label>
                <form onSubmit={sendblog}>

                    <div className="form-group">
                        <input type="text" className="form-control" name='title' onChange={(e) => { stdata(e) }} placeholder="Title" />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" name='category' onChange={(e) => { stdata(e) }} placeholder="Category" />
                    </div>

                    <div className="form-group">
                        <textarea type="text" rows="10" className="form-control" name='blogbody' onChange={(e) => { stdata(e) }} placeholder="blog body" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Addblog