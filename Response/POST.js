import { crudCrudUrl } from "./Auth.js"

export async function addNewUser(user){
  try{
    const response = await axios.post(crudCrudUrl, user);
    const data = response.data;
    console.log("New user added!", data);
  }catch(error){
    console.error("Error adding new user", error);
  }
}