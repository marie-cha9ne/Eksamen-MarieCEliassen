import { getUsers } from "../Response/GET-users.js";

const loginBtn = document.getElementById("login-btn");
const userName = document.getElementById("user-name");
const password = document.getElementById("password");
const infoTxt = document.getElementById("info-txt");

loginBtn.addEventListener("click", async (event)=>{
event.preventDefault();

const userInput = userName.value;
const passwrd = password.value;

const users = await getUsers();

const foundUsers = users.find(
  (user) => user.name === userInput && user.password === passwrd
);

if(foundUsers){
  sessionStorage.setItem("userLoggedin", JSON.stringify(foundUsers));
  alert(`Welcome ${foundUsers.name}, you are now logged in!`);

  setTimeout(()=>{
    window.location.href="./app.html"
  }, 1000);

}else{
  const nameExsists = users.find((user)=> user.name === userInput);
  const passwrdExsists = users.find((user)=> user.password === passwrd) ;

  if(!nameExsists){
  infoTxt.textContent="Incorrect username"
  infoTxt.style.color="red";
  }else if(!passwrdExsists){
  infoTxt.textContent="Incorrect password";
  infoTxt.style.color="red";
  }
}
})
