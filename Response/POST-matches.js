import { randomMatchUrl } from "./Auth.js";
import { getMatchFromCrud } from "./GET-matches.js";

export async function postMatch(match){
try{
  const response = await axios.post(randomMatchUrl, match);
  const data =  response.data;

  console.log("Match posted to crudcrud", data);
  getMatchFromCrud()
}catch(error){
  console.error("Error posting match to crudcrud", error);
}
}