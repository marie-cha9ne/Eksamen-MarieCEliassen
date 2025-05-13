import { randomMatchUrl } from "./Auth.js";
import { getMatchFromCrud } from "./GET-matches.js"

export async function deleteMatch(id){
try{
  const response = await axios.delete(`${randomMatchUrl}/${id}`);
  console.log("User unmatched:", response);

  getMatchFromCrud()
}catch(error){
  console.error("Error unmatching user", error);
}
}