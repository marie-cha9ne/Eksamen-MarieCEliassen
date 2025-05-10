import {crudCrudUrl} from "./Auth.js";

export async function updateUserEdits(userId, updatedUser){
  try{
    const response = await axios.put(`${crudCrudUrl}/${userId}`, updatedUser);
    console.log("User info edited", response);
  }catch(error){
    console.error("Error editing user info", error);
  }
}