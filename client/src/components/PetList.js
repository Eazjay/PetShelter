import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from '@reach/router';

const PetList = props =>{
    const [pets, setPets] = useState([]);
    const [deleteClicked, setDeleteClicked] = useState(false)
    useEffect(()=>{
        axios.get('http://localhost:8000/api/pets')
            .then(response=>{
                console.log(response)
                setPets(response.data.Pets)
            })
            .catch(err=>console.log(err))
    },[deleteClicked])
    const deleteHandler = (e, petId)=>{
        axios.delete(`http://localhost:8000/api/pets/${petId}/delete`)
            .then(response=>{
                console.log("Response: ", response)
                setDeleteClicked(!deleteClicked)
            })
            .catch(err=>console.log("Error: ", err))
    }
    return(
        <div className="container mt-3">
            <Link to="/pet/new" className="btn btn-outline-primary float-end">Add a pet to the shelter</Link>
            <h1 className="text-center">Pet Shelter</h1>
            <h4 className="mt-3">These pets are looking for a good home</h4>
            <table className="table table-striped border mt-3">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {pets.filter(pet => pet.type).map((pet, index)=>{
                        return <tr key={index}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>{pet.desc}</td>
                            <td>
                                <Link to={`/pet/${pet._id}`} className="text-decoration-none">Details</Link>
                                <Link to={`/pet/${pet._id}/update`} className="text-decoration-none m-3">Edit</Link>
                                <Link onClick={(e)=>deleteHandler(e, pet._id)} to="" className="text-danger text-decoration-none m-3">Remove</Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default PetList;