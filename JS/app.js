


function showUserInfo(){
  const userData = sessionStorage.getItem("userLoggedin");

  if(userData){
    const user = JSON.parse(userData);
    const userInfo = document.getElementById("user-info");

    const displayName = document.createElement("p");
    displayName.textContent = `Logged in as: ${user.name}`;

    userInfo.appendChild(displayName);
  }
}

showUserInfo()
