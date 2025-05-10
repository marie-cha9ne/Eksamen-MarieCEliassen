import { updateUserEdits } from "../Response/PUT.js";

 const userInfo = document.getElementById("user-info");

  function showUserInfo(){
  const userData = sessionStorage.getItem("userLoggedin");

  if(userData){
    const user = JSON.parse(userData);
    userInfo.innerHTML="";

    const displayName = document.createElement("p");
    displayName.textContent = `Logged in as: ${user.name}`;

    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit profile";

    editBtn.addEventListener("click", ()=>{
    editUserInfo(user);
     });

    userInfo.append(displayName, editBtn);
  }
}

showUserInfo()

async function editUserInfo(user){
userInfo.innerHTML="";

const nameLabel = document.createElement("label");
nameLabel.textContent="Edit user name";

const nameInput = document.createElement("input");
nameInput.value= user.name;

// tilleggsfunksjonalitet?
const ageLabel = document.createElement("label")
ageLabel.textContent="Select you age:";
const ageEdit  = document.createElement("select");

for (let i = 18; i <=  80; i++){
  const ageOpt = document.createElement("option");
  ageOpt.value = i;
  ageOpt.textContent= i;

  ageEdit.appendChild(ageOpt);
}

if(user.age){
  ageEdit.value = user.age;
}

const genLabel = document.createElement("label");
genLabel.textContent="Choose a gender:";

const genSelect = document.createElement("select");

const femaleOpt = document.createElement("option");
femaleOpt.value="Female";
femaleOpt.textContent="Female";

const maleOpt = document.createElement("option");
maleOpt.value="Male";
maleOpt.textContent="Male";

const saveBtn = document.createElement("button");
saveBtn.textContent="Save";

saveBtn.addEventListener("click", async ()=>{
  const updatedUser = {
    name: nameInput.value,
    age: ageEdit.value,
    gender: genSelect.value
  }

  await updateUserEdits(user._id, updatedUser)

  updatedUser._id = user._id;
  sessionStorage.setItem("userLoggedin", JSON.stringify(updatedUser));

  showUserInfo()
})

genSelect.append(femaleOpt, maleOpt)
userInfo.append(nameLabel, nameInput, ageLabel, ageEdit, genLabel, genSelect, saveBtn);
}