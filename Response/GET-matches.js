import { randomUserUrl } from "./Auth.js";
import { addSavedFilter, updateAgeFilterInStorage } from "../JS/app.js";

export let allUsers = []; //legger inn allUser globalt for enklere gjenbruk av data

export async function getRandomUsers(){
  try{
    const response = await axios.get(randomUserUrl);
    allUsers = response.data.results;
    console.log("Managed to get from randomuser api", allUsers);

    updateAgeFilterInStorage()//Oppdaterer inputfelt visuelt på siden.
    addSavedFilter() //Viser karakterkort og filtrerer etter ønsket visning
  }catch(error){
    console.error("Error getting random users from api", error);
  }
}

getRandomUsers()