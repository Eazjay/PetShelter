import React, {useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

const PetForm = props =>{
    const [formInfo, setFormInfo] = useState({
        name: "",
        type: "",
        desc: "",
        likes: 0
    });
    const [errors, setErrors] = useState({})
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/pets/new', formInfo)
            .then(response=>{
                console.log("Response: ", response)
                if(response.data.Pet){
                    navigate('/')
                } 
                else{
                    setErrors(response.data.errors)
                }
            })
            .catch(err=>console.log("Error: ", err))
    }
    const changeHandler = (e) =>{
        console.log(e)
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        });
    }
    return(
        <div className="container mt-5">
            <Link to="/" className="text-decoration-none float-end">Back to home</Link>
            <h1 className="text-center">Know a pet needing a home?</h1>
            <form onSubmit={submitHandler} className="w-50 mx-auto mt-3">
                <div>
                    <label htmlFor="">Pet Name:</label>
                    <input type="text" onChange={changeHandler} name="name" className="form-control"/>
                    {errors.name? <p className="text-danger">{errors.name.message}</p>: ""}
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Pet Type:</label>
                    <input type="text" onChange={changeHandler} name="type" className="form-control"/>
                    {errors.type? <p className="text-danger">{errors.type.message}</p>: ""}
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Pet Description:</label>
                    <input type="text" onChange={changeHandler} name="desc" className="form-control"/>
                    {errors.desc? <p className="text-danger">{errors.desc.message}</p>: ""}
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Skill 1:</label>
                    <input type="text" onChange={changeHandler} name="skill1" className="form-control"/>
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Skill 2:</label>
                    <input type="text" onChange={changeHandler} name="skill2" className="form-control"/>
                </div>
                <div>
                    <label htmlFor="" className="mt-3">Skill 3:</label>
                    <input type="text" onChange={changeHandler} name="skill3" className="form-control"/>
                </div>
                <Link to="/" className="btn btn-primary">Cancel</Link>
                <input type="submit" className="btn btn-primary m-3" value="Add Pet" />
            </form>
        </div>
    )
}
export default PetForm;