import { addNewUser } from "../Response/POST-users.js";

const createBtn = document.getElementById("create-btn");
const infoRegTxt = document.getElementById("info-reg-txt");

const userNameInput = document.getElementById("user-name");
const passwordInput = document.getElementById("password");

async function regNewUser(){
  const usrName = userNameInput.value;
  const passwrd = passwordInput.value;

  const newUser = {
    name: usrName,
    password: passwrd
  }

  const savedUser = await addNewUser(newUser);

  if(savedUser){
    sessionStorage.setItem("userLoggedin", JSON.stringify(savedUser));
  }
  userNameInput.value="";
  passwordInput.value="";
}

createBtn.addEventListener("click", function(event){
event.preventDefault();

if(!userNameInput.value){
  infoRegTxt.textContent="Please create a user name.";
  infoRegTxt.style.color="red";
  return;
}else if(!passwordInput.value){
  infoRegTxt.textContent="Please create a password.";
  infoRegTxt.style.color="red";
  return;
}

regNewUser();

infoRegTxt.textContent="New account made, you can now login!";
infoRegTxt.style.color="darkGreen";
});
