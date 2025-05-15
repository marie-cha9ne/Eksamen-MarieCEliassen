import { updateUserEdits } from "../Response/PUT.js";
import { allUsers } from "../Response/GET-matches.js";
import { postMatch } from "../Response/POST-matches.js";
import { deleteMatch } from "../Response/DELETE.js";

const userInfo = document.getElementById("user-info");

function showUserInfo() {
  const userData = sessionStorage.getItem("userLoggedin");

  if (userData) {
    const user = JSON.parse(userData);
    userInfo.innerHTML = "";

    const displayName = document.createElement("p");
    displayName.textContent = `Logged in as: ${user.name}`;

    userInfo.append(displayName);

    displayUserEdits(user);
  }
}

showUserInfo();

// Tilleggsfunksjonalitet loggut:
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    const currentUser = sessionStorage.getItem("userLoggedin");

    if (currentUser) {
      const user = JSON.parse(currentUser);

      userName = user.name;
    }
    sessionStorage.removeItem("userLoggedin");
  });
}

async function editUserInfo(user) {
  userInfo.innerHTML = "";

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Edit user name:";

  const nameInput = document.createElement("input");
  nameInput.value = user.name;

  // tilleggsfunksjonalitet bruker informasjon. Mulighet til å legge til alder:
  const ageLabel = document.createElement("label");
  ageLabel.textContent = "Select you age:";
  const ageEdit = document.createElement("select");

  for (let i = 18; i <= 80; i++) {
    const ageOpt = document.createElement("option");
    ageOpt.value = i;
    ageOpt.textContent = i;

    ageEdit.appendChild(ageOpt);
  }

  if (user.age) {
    ageEdit.value = user.age;
  }

  // tilleggsfunksjonalitet bruker informasjon. Mulighet til å legge til kjønn:
  const genLabel = document.createElement("label");
  genLabel.textContent = "Choose a gender:";

  const genSelect = document.createElement("select");

  const femaleOpt = document.createElement("option");
  femaleOpt.value = "Female";
  femaleOpt.textContent = "Female";

  const maleOpt = document.createElement("option");
  maleOpt.value = "Male";
  maleOpt.textContent = "Male";

  const passLabel = document.createElement("label");
  passLabel.textContent = "Change password:";

  const editPasswrd = document.createElement("input");
  editPasswrd.value = user.password;

  userInfo.style.display = "flex";
  userInfo.style.flexDirection = "column";
  userInfo.style.gap = "5px";

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("save-btn");
  saveBtn.textContent = "Save";

  saveBtn.addEventListener("click", async () => {
    const updatedUser = {
      name: nameInput.value,
      age: ageEdit.value,
      gender: genSelect.value,
      password: editPasswrd.value,
    };

    await updateUserEdits(user._id, updatedUser);

    updatedUser._id = user._id;
    sessionStorage.setItem("userLoggedin", JSON.stringify(updatedUser));

    showUserInfo();
  });

  genSelect.append(femaleOpt, maleOpt);
  userInfo.append(
    nameLabel,
    nameInput,
    ageLabel,
    ageEdit,
    genLabel,
    genSelect,
    passLabel,
    editPasswrd,
    saveBtn
  );
}

function displayUserEdits(user) {
  userInfo.innerHTML = "";

  const nameTag = document.createElement("p");
  nameTag.textContent = `Name: ${user.name}`;

  // tilleggsfunksjonalitet bruker informasjon.
  const ageTag = document.createElement("p");
  ageTag.textContent = `Age: ${user.age || ""}`;

  const genTag = document.createElement("p");
  genTag.textContent = `Gender: ${user.gender || ""}`;

  if (user.gender === "Female") {
    userInfo.style.border = "5px solid pink";
  } else if (user.gender === "Male") {
    userInfo.style.border = "5px solid darkBlue";
  }

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "Edit profile";

  editBtn.addEventListener("click", () => {
    editUserInfo(user);
  });

  userInfo.append(nameTag, ageTag, genTag, editBtn);
}

function userCardSetup(user) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card-div");

  const profilePic = document.createElement("img");
  profilePic.src = `${user.picture.medium}`;

  const matchName = document.createElement("h3");
  matchName.textContent = `${user.name.first} ${user.name.last}`;

  // Kjønn Tillegg:
  const matchGender = document.createElement("p");
  matchGender.textContent = `Gender: ${user.gender}`;

  if (user.gender == "female") {
    cardDiv.style.border = "5px solid pink";
  } else {
    cardDiv.style.border = "5px solid darkBlue";
  }

  const matchAge = document.createElement("p");
  matchAge.textContent = `Age:${user.dob.age}`;

  const matchCity = document.createElement("p");
  matchCity.textContent = `${user.location.city}, ${user.location.state}, ${user.location.country}`;

  cardDiv.append(profilePic, matchName, matchGender, matchAge, matchCity);

  return cardDiv;
}

export async function showRandomUser(userList) {
  const matchContainer = document.getElementById("match-container");
  matchContainer.innerHTML = "";

  if (!userList.length) {
    matchContainer.innerHTML =
      "<p>No matches found for that age, edit filters and try again.</p>";
    return;
  }

  let currentIndex = parseInt(sessionStorage.getItem("currentCard"), 10);
  if (isNaN(currentIndex) || currentIndex < 0) currentIndex = 0;

  let user = userList[currentIndex];

  const cardDiv = userCardSetup(user);
  const likeBtn = createLikeBtn(user, userList);
  const dislikeBtn = createDislikeBtn(userList);

  cardDiv.append(likeBtn, dislikeBtn);
  matchContainer.appendChild(cardDiv);
}

function createLikeBtn(user, userList) {
  const btn = document.createElement("button");
  btn.classList.add("like-btn");
  btn.textContent = "Yes ❤️";

  btn.addEventListener("click", async function () {
    nextCard(userList);

    console.log("Post user:", user);
    await postMatch(user);
  });
  return btn;
}

function createDislikeBtn(userList) {
  const disBtn = document.createElement("button");
  disBtn.classList.add("dislike-btn");
  disBtn.textContent = "No 💔";

  disBtn.addEventListener("click", () => {
    nextCard(userList);
  });
  return disBtn;
}

function nextCard(userList) {
  let currentIndex = parseInt(sessionStorage.getItem("currentCard"), 10) || 0;

  currentIndex++;

  if (currentIndex >= userList.length) {
    matchContainer.innerHTML = "<p>No more matches Available</p>";
    return;
  }
  sessionStorage.setItem("currentCard", currentIndex.toString());
  showRandomUser(userList);
}

function genderFilter(users, gender) {
  return users.filter((user) => user.gender === gender);
}

const filterFemalesBtn = document.getElementById("filter-females");

if (filterFemalesBtn) {
  filterFemalesBtn.addEventListener("click", () => {
    const filteredFe = genderFilter(allUsers, "female");
    sessionStorage.setItem("genderFilter", "female");
    sessionStorage.setItem("currentCard", 0);

    showRandomUser(filteredFe);
  });
}

const filterMalesBtn = document.getElementById("filter-males");

if (filterMalesBtn) {
  filterMalesBtn.addEventListener("click", () => {
    const filteredMa = genderFilter(allUsers, "male");
    sessionStorage.setItem("genderFilter", "male");
    sessionStorage.setItem("currentCard", 0);

    showRandomUser(filteredMa);
  });
}

const filterAllBtn = document.getElementById("filter-all");
if (filterAllBtn) {
  filterAllBtn.addEventListener("click", () => {
    sessionStorage.removeItem("genderFilter");
    sessionStorage.setItem("currentCard", 0);

    showRandomUser(allUsers);
  });
}

function ageFilter(users, minAge, maxAge) {
  return users.filter((user) => {
    const age = user.dob.age;
    return age >= minAge && age <= maxAge;
  });
}

export function addSavedFilter() {
  const gender = sessionStorage.getItem("genderFilter");
  const minAge = parseInt(sessionStorage.getItem("minAge")) || 18;
  const maxAge = parseInt(sessionStorage.getItem("maxAge")) || 80;

  let filtered = allUsers;

  if (gender) {
    filtered = genderFilter(filtered, gender);
  }

  filtered = ageFilter(filtered, minAge, maxAge);

  showRandomUser(filtered);
}

const addBtn = document.getElementById("add-btn");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    const minAge = parseInt(document.getElementById("min-age").value);
    const maxAge = parseInt(document.getElementById("max-age").value);

    if (minAge > maxAge) {
      alert("Minimum age cannot be higher than maximum age.");
      return;
    }

    sessionStorage.setItem("minAge", minAge);
    sessionStorage.setItem("maxAge", maxAge);

    sessionStorage.setItem("currentCard", 0);
    addSavedFilter();
  });
}

export function updateAgeFilterInStorage() {
  const minAge = sessionStorage.getItem("minAge");
  const maxAge = sessionStorage.getItem("maxAge");

  if (minAge) {
    document.getElementById("min-age").value = minAge;
  }

  if (maxAge) {
    document.getElementById("max-age").value = maxAge;
  }
}

function unMatcUser(userId) {
  const unMatch = document.createElement("button");
  unMatch.textContent = "Unmatch 🥀";
  unMatch.classList.add("unmatch-btn");

  unMatch.addEventListener("click", () => {
    console.log("Deleting match:", userId);
    deleteMatch(userId);
  });
  return unMatch;
}

export function displaySavedMatch(users) {
  const savedMatchDiv = document.getElementById("saved-matches");
  savedMatchDiv.innerHTML = "";

  users.forEach((user) => {
    const cardDiv = userCardSetup(user);

    const UnmatchBtn = unMatcUser(user._id);

    const winkBtn = createWinkBtn();

    cardDiv.append(UnmatchBtn, winkBtn);

    savedMatchDiv.appendChild(cardDiv);
  });
}

// Tilleggsfunksjonalitet "Wink":

const comments = [
  "What a beautiful name you have, {name} 😍",
  "Thanks for the wink {name} 😉",
  "Do you come to this page often?😏",
  "Do you like StarWars? Because Yoda one for me!",
  "Wink wink, heres a rose just for you {name}🌹",
  "You seem friendly!",
  "Well here I am, what are your other two wishes?😉",
  "Hope you have a nice day!",
];

function createWinkBtn() {
  const winkBtn = document.createElement("button");
  winkBtn.classList.add("wink-btn");
  winkBtn.textContent = "Send a wink😉";

  winkBtn.addEventListener("click", () => {
    const currentUser = JSON.parse(
      sessionStorage.getItem("userLoggedin") || "{}"
    );
    const currentUserName = currentUser.name;
    const text = comments[Math.floor(Math.random() * comments.length)];

    const message = text.replace("{name}", currentUserName);

    alert(message);
  });
  return winkBtn;
};
