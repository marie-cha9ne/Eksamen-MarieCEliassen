import { crudCrudUrl } from "./Auth.js";


export async function getUsers(){
  try{
    const response = await axios.get(crudCrudUrl);
    return response.data;
  }catch(error){
    console.error("Error getting users from crudcrud", error);
    return[];
  }
}