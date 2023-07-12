import Dexie from "dexie";

export const db = new Dexie('myInsta')
db.version(1).stores({
    bio: ',name,about',
    gallery:'++id,url'    //++ signifies that we are incremnrting id which is the primary key 
})