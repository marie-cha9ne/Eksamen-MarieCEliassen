import { crudCrudUrl, randomUserUrl } from "./Auth.js";
import { showRandomUser } from "../JS/app.js";

export async function getUsers(){
  try{
    const response = await axios.get(crudCrudUrl);

    console.log("Managed to get users from crudcrud", response);
    return response.data;
    }catch(error){
    console.error("Error getting users from crudcrud", error);
    return[];
  }
}

export async function getRandomUsers(){
  try{
    const response = await axios.get(randomUserUrl);
    const data = response.data.results
    console.log("Managed to get from randomuser api", data);

    showRandomUser(data)
  }catch(error){
    console.error("Error getting random users from api", error);
  }
}

getRandomUsers()