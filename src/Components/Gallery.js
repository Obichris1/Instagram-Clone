import { useLiveQuery } from "dexie-react-hooks"
import getPhotoUrl from "get-photo-url"
import { db } from "../dexie"








const Gallery = () => {

    const allPhotos = useLiveQuery(() => db.gallery.toArray(),[])

    const addPhoto = async () =>{

        db.gallery.add({
            url : await getPhotoUrl('#addPhotoInput'),       // obtained using Javascript file reader method
        })
           
        }
        
      const deletePhoto = (id) =>{

        db.gallery.delete(id)


      }

    return(
        <>
            <input type="file" name="photo" accept="image/*" id="addPhotoInput"  />
            <label htmlFor="addPhotoInput" onClick={addPhoto}>
               <i className="add-photo-button fas fa-plus-square"></i> 
            </label>

            <section className='gallery'>
                {!allPhotos && <p>Loading.....</p>}
                {allPhotos?.map((photo) => 
                     <div className="item" key={photo.id}>
                     <img src={photo.url} alt="" className="item-image" />
                     <button className="delete-button" onClick={() => deletePhoto(photo.id)}>Delete</button>
                 </div>)}
               
                

            </section>
        </>
    )
}

export default Gallery