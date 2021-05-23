import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

const PetDetail = props => {
    const [pet, setPet] = useState({})
    const [liked, setLiked] = useState(0)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${props.id}`)
            .then(response => {
                console.log(response)
                setPet(response.data.Pet)
            })
            .catch(err=> console.log(err))
    },[props.id], [liked])
    const adoptHandler = ()=>{
        axios.delete(`http://localhost:8000/api/pets/${props.id}/delete`)
            .then(response=>{
                console.log("Response: ", response)
                navigate('/')
            })
            .catch(err=>console.log("Error: ", err))
    }
    const grantLikes = (e, pet)=>{
        setLiked(liked+1)
        pet.likes += 1;
        axios.put(`http://localhost:8000/api/pets/${pet._id}/update`)
            .then(response=>{
                console.log(response);
            })
            .catch(err=>console.log(err))
    }
    return (
        <div className="container mt-5">
            <Link to="/" className="text-decoration-none float-end">Back to home</Link>
            <div className="mt-3">
                <h4>Details about: {pet.name} <button onClick={adoptHandler} className="btn btn-danger m-5">Adopt {pet.name}</button></h4>
                <p><b>Pet Type: </b>{pet.type}</p>
                <p><b>Description: </b>{pet.desc}</p>
                <p><b>Skills: </b>
                    <ul className="list-style-type-none">
                        <li>{pet.skill1}</li>
                        <li>{pet.skill2}</li>
                        <li>{pet.skill3}</li>
                    </ul>
                </p>
            </div>
            <p className="mt-3"><button onClick={(e)=>grantLikes(e, pet)} className="btn btn-success btn-sm">Like {pet.name}</button> {pet.likes} like(s)</p>
        </div>
    )
}
export default PetDetail;

