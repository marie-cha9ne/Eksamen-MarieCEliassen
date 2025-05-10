import { randomUserUrl } from "./Auth.js";
import { showRandomUser } from "../JS/app.js";

export async function getRandomUsers(){
  try{
    const response = await axios.get(randomUserUrl);
    const data = response.data.results;
    console.log("Managed to get from randomuser api", data);

    showRandomUser(data)
  }catch(error){
    console.error("Error getting random users from api", error);
  }
}

getRandomUsers()