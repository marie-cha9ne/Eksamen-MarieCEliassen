import { randomUserUrl, randomMatchUrl } from "./Auth.js";
import { addSavedFilter, displaySavedMatch, updateAgeFilterInStorage } from "../JS/app.js";

export let allUsers = [];

export async function getRandomUsers(){
  try{
    let savedUsers = sessionStorage.getItem("matches");

    if(!savedUsers){
      const response = await axios.get(randomUserUrl);
      const users = response.data.results;
      
      sessionStorage.setItem("matches", JSON.stringify(users));

      allUsers = users;
    }else{
      try{
      allUsers = JSON.parse(savedUsers);
      console.log("Loaded saved users from sessionStorage", allUsers)
      }catch(error){
        console.error("Error parsing sessionStorage data", error);
        allUsers = []; 
      }
    }
    console.log("Managed to get from randomuser api", allUsers);
    
    updateAgeFilterInStorage()
    addSavedFilter()
  }catch(error){
    console.error("Error getting random users from api", error);
  }
}


export async function getMatchFromCrud(){
  try{
    const response = await axios.get(randomMatchUrl);
    const data = response.data;

    console.log("Match loaded from crudcrud", data)
    displaySavedMatch(data)
  }catch(error){
    console.error("Error loading match from crudcrud", error);
  }
}
getMatchFromCrud()
getRandomUsers()
