import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Getaccess from '../Services/Getaccess'
import ss from '../Services/ss'

const Blog = () => {
    const navigate = useNavigate()
    const [blog, setblog] = useState([]);
    const [flag, setFlag] = useState(true);

    // const showdata = async () => {

    //     let res = await axios.get(`http://localhost:8888/getblog`, {
    //         headers: {
    //             authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
    //         }
    //     })

    //     if (res.data.msg === "Token has expired") {
    //         await Getaccess()
    //         let res = await axios.get(`http://localhost:8888/getblog`, {
    //             headers: {
    //                 authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
    //             }
    //         })
    //         setblog(res.data)
    //     }else{
    //         setblog(res.data)
    //     }
    // }

    const showdata = async () => {
        try {
            const response = await ss.callapi({
                methodName: ss.getMethod,
                api_url: ss.getblog
            });
            if (response) {
                setblog(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteblog = async (id) => {
        try {
            const response = await ss.callapi({
                methodName: ss.deleteMethod,
                api_url: ss.deleteblog,
                params: id
            });
            if (response) {
                setFlag(!flag)
            }
        } catch (error) {
            console.log(error);
        }

        // let res = await axios.delete(`http://localhost:8888/deleteblog/${id}`, {
        //     headers: {
        //         authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
        //     }
        // })
        // if (res.data.msg === "Token has expired") {
        //     await Getaccess()
        //     let res = await axios.delete(`http://localhost:8888/deleteblog/${id}`, {
        //         headers: {
        //             authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
        //         }
        //     })
        //     setFlag(!flag)
        // } else {
        //     setFlag(!flag)
        // }
    }

    useEffect(() => {
        showdata()
    }, [flag]);

    return (
        <>
            <div className='container my-2'>
                <h1 className='card-title mt-1 text-center'>Blogger</h1>
                <div className="row">
                    {blog.map((val) => {
                        return (<>
                            <div className="col-md-4">
                                <div className="card my-4">
                                    <div className="card-body">
                                        <h5 className="card-title">{val.title}</h5>
                                        <p className="card-text">{val.body}</p>
                                        <small className="text-muted">{val.category}</small><br />
                                        <a className="btn btn-sm btn-primary">Read More</a>
                                        {localStorage.getItem("ID") == val.userid && <>
                                            <button className="btn btn-sm btn-primary m-1" onClick={() => {
                                                navigate('/updateblog', { state: { id: val.ID } })
                                            }} >Edit</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => deleteblog(val.ID)}>Delete</button>
                                        </>}
                                    </div>
                                </div>
                            </div>
                        </>)
                    })}

                </div>
            </div>
        </>
    )
}

export default Blog