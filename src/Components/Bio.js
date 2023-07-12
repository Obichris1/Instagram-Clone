import React,{useEffect, useState} from "react"
import getPhotoUrl from "get-photo-url"
import profileIcon from '../Assets/profileIcon.svg'
import  { db } from  '../dexie'


const Bio = () =>{

    const [showEditForm, setShowEditForm] = useState(false)
    
    const [userDetails, setUserDetails] = useState({
        name : 'Chukwunenye Obinna',
        about : 'Developer/Athlete'}
        )

    const [profilePhoto, setProfilePhoto] = useState(profileIcon)
     
    //calling async functions using useEffect hooks

    // useEffect loads immediately the page is rendered
    useEffect(() => {
        const getDataFromDb = async () => {
            const userDetailsFromDb = await db.bio.get('info')   //asynchronous function to get data from the DB with key info
            const profilePhotoFromDb = await db.bio.get('profilePhoto')
            userDetailsFromDb && setUserDetails(userDetailsFromDb) // conditional that checks if ther is data coming from the DB
            profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb)
        }
        
        

        getDataFromDb()

    })

    const editFormToggler = () => {
        setShowEditForm(true);  
    }

    const cancelHandler = () => {
        setShowEditForm(false);
    }

    
    const submitHandler = async (e) => {
        e.preventDefault();

        const objectData = {
            name : e.target.nameOfUser.value,
            about : e.target.aboutUser.value
        }

        setUserDetails(objectData)


        //  storing form data in the indexed db 
           await db.bio.put((objectData), 'info')
        setShowEditForm(false)
       

    }

 const updateProfilePhoto = async () => {
     
    //get selected photo
    const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')
    //update photo
    setProfilePhoto(newProfilePhoto)
    //set profile poto to DB
    await db.bio.put(newProfilePhoto,'profilePhoto')


 }


 const editForm = (
 <form className="edit-bio-form" onSubmit={submitHandler}>
    <input type="text" name='nameOfUser' placeholder="Enter Name"  />
    <input type="text" name='aboutUser' placeholder="About You" />
    <br/>
    <button className="cancel-button" onClick={cancelHandler}>Cancel</button>
    <button type='submit'>Save</button>

      </form>
        )

    

    return(
        <section className="bio">
            <input type="file" accept="image/*" id="profilePhotoInput" />
            <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
            <div className="profile-photo" role="button" title="Click to edit photo">
              <img src={profilePhoto} alt="profile" />

            </div>
            </label>

            <div className="profile-info">
            <p className="name">{userDetails.name}</p>
            <p className="about">{userDetails.about}</p>
            
           
            {showEditForm ? editForm :  <button onClick={editFormToggler}>Edit</button> }
             
            </div>


          

            


        </section>
    )
}

export default Bio