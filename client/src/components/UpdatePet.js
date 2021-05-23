import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, navigate} from '@reach/router';

const UpdatePet = props =>{
    const [petInfo, setPetInfo] = useState({
        name: "",
        type: "",
        desc: "",
        skill1: "",
        skill2: "",
        skill3: ""
    })
    const [errors, setErrors] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${props.id}`)
        .then(response=>{
            console.log(response)
            if(response.data.Pet){
                setPetInfo(response.data.Pet)
            }
            else{
                console.log("This Pet does not exist")
                navigate("/pet/new")
            }
        })
        .catch(err=>console.log(err))
    },[props.id])
    const updateHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pets/${props.id}/update`, petInfo)
            .then(response=>{
                console.log(response)
                if(response.data.Pet){
                    navigate('/')
                }
                else{
                    setErrors(response.data.errors)
                }
            })
            .catch(err=>console.log(err))
    }
    const changeHandler = (e)=>{
        setPetInfo({
            ...petInfo,
            [e.target.name]: e.target.value
        })
    }
    return(
        <div className="container mt-5">
            <Link to="/" className="text-decoration-none float-end">Home</Link>
            <h1 className="text-center">Edit {petInfo.name}</h1>
            <form onSubmit={updateHandler} className="w-50 mx-auto mt-3">
                <div>
                    <label htmlFor="">Pet Name:</label>
                    <input type="text" onChange={changeHandler} name="name" value={petInfo.name} className="form-control"/>
                    {errors.name? <p className="text-danger">{errors.name.message}</p>: ""}
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Pet Type:</label>
                    <input type="text" onChange={changeHandler} name="type" value={petInfo.type} className="form-control"/>
                    {errors.type? <p className="text-danger">{errors.type.message}</p>: ""}
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Pet Description:</label>
                    <input type="text" onChange={changeHandler} name="desc" value={petInfo.desc} className="form-control"/>
                    {errors.desc? <p className="text-danger">{errors.desc.message}</p>: ""}
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Skill 1:</label>
                    <input type="text" onChange={changeHandler} name="skill1" value={petInfo.skill1} className="form-control"/>
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Skill 2:</label>
                    <input type="text" onChange={changeHandler} name="skill2" value={petInfo.skill2} className="form-control"/>
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Skill 3:</label>
                    <input type="text" onChange={changeHandler} name="skill3" value={petInfo.skill3} className="form-control"/>
                </div>
                <Link to="/" className="btn btn-primary">Cancel</Link>
                <input type="submit" className="btn btn-primary m-3" value="Update Pet"/>
            </form>
        </div>
    )
}
export default UpdatePet;