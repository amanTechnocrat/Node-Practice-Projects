import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'
import Getaccess from '../Services/Getaccess'
import ss from '../Services/ss'
const Updateblog = () => {

    const loc = useLocation()
    const Navigate = useNavigate()
    const [blog, setblog] = useState([]);
    const [data, setdata] = useState();


    useEffect(() => {
        showdata()
    }, []);

    // const showdata = async () => {
    //     const res = await axios.get(`http://localhost:8888/getblogbyid/${loc.state.id}`, {
    //         headers: {
    //             authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
    //         }
    //     })
    //     if (res.data.msg === "Token has expired") {
    //         await Getaccess()
    //         const res = await axios.get(`http://localhost:8888/getblogbyid/${loc.state.id}`, {
    //             headers: {
    //                 authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
    //             }
    //         })
    //         await setblog(res.data[0])
    //         setdata({
    //             title: res.data[0].title,
    //             category: res.data[0].category,
    //             blogbody: res.data[0].body
    //         })

    //     } else {
    //         await setblog(res.data[0])
    //         setdata({
    //             title: res.data[0].title,
    //             category: res.data[0].category,
    //             blogbody: res.data[0].body
    //         })
    //     }
    // }

    const showdata = async () => {
        try {
            const response = await ss.callapi({
                methodName: ss.getMethod,
                api_url: ss.getblogbyid,
                params: loc.state.id
            });
            if (response) {
                await setblog(response.data[0])
                setdata({
                    title: response.data[0].title,
                    category: response.data[0].category,
                    blogbody: response.data[0].body
                })
            }
        } catch (error) {
            console.log(error);
        }
    };


    const stdata = (e) => {

        const name = e.target.name
        const value = e.target.value
        setdata({ ...data, [name]: value })
    }

    const updateblog = async (e) => {
        e.preventDefault();

        if (data.title.trim().length && data.category.trim().length && data.blogbody.trim().length > 0) {

            let senddata = {
                title: data.title,
                category: data.category,
                body: data.blogbody
            }
            uppp(senddata)
            // let res = await axios.put(`http://localhost:8888/upblog/${loc.state.id}`, senddata,
            //     {
            //         headers: {
            //             authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
            //         }
            //     })
            // if (res.data.msg === "Token has expired") {
            //     await Getaccess()
            //     let res = await axios.put(`http://localhost:8888/upblog/${loc.state.id}`, senddata,
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

    const uppp = async (data) => {
        try {
            const response = await ss.callapi({
                methodName: ss.putMethod,
                api_url: ss.upblog,
                body: data,
                params: loc.state.id
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
                <label className='centre'>Update Blog</label>
                <form onSubmit={updateblog}>
                    <div className="form-group">
                        <input type="text" className="form-control" defaultValue={blog.title} name='title' onChange={(e) => { stdata(e) }} placeholder="Title" />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" defaultValue={blog.category} name='category' onChange={(e) => { stdata(e) }} placeholder="Category" />
                    </div>

                    <div className="form-group">
                        <textarea type="text" rows="10" className="form-control" defaultValue={blog.body} name='blogbody' onChange={(e) => { stdata(e) }} placeholder="blog body" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Updateblog