import { randomUserUrl } from "./Auth.js";
import { addSavedFilter, updateAgeFilterInStorage } from "../JS/app.js";

export let allUsers = []; //legger inn allUser globalt for enklere gjenbruk av data

export async function getRandomUsers(){
  try{
    let savedUsers = sessionStorage.getItem("matches");

    // Hvis ingen brukere er lagret hent de fra api'et
    if(!savedUsers){
      const response = await axios.get(randomUserUrl);
      const users = response.data.results;
      
      // lagrer de 50 første brukerne i sessionStorage
      sessionStorage.setItem("matches", JSON.stringify(users));

      // vi bruker disse 50 første brukerne
      allUsers = users;
    }else{
      try{
      // bruk lagrede brukerne fra session
      allUsers = JSON.parse(savedUsers);
      console.log("Loaded saved users from sessionStorage", allUsers)
      }catch(error){
        console.error("Error parsing sessionStorage data", error);
        allUsers = []; //dersom parsing feiler legges de i et tomt array
      }
    }
    console.log("Managed to get from randomuser api", allUsers);
    
    updateAgeFilterInStorage()//Oppdaterer inputfelt visuelt på siden.
    addSavedFilter() //Viser karakterkort og filtrerer etter ønsket visning
  }catch(error){
    console.error("Error getting random users from api", error);
  }
}

getRandomUsers()