/**
 * @jest-environment jsdom
 */

// TESTER SIDE 1 
// Register:
describe("register.js -DOM validering", ()=>{
  beforeEach(()=>{
    document.body.innerHTML=`
    <input id="user-name" />
    <input id="password" />
    <div id="info-reg-txt"></div>
    <button id="create-btn">Create</button>
    `;

  });

  test("Viser feimelding når brukernavn mangler", ()=>{
    const passwrdInput = document.getElementById("password");
    const infoRegTxt = document.getElementById("info-reg-txt");
    const userNameInput = document.getElementById("user-name");

    passwrdInput.value = "Hemmelig";

    if(!userNameInput.value){
      infoRegTxt.textContent = "Please create a user name.";
      infoRegTxt.style.color = "red";
    }

    expect(infoRegTxt.textContent).toBe("Please create a user name.");
    expect(infoRegTxt.style.color).toBe("red");
  });


  test("Viser feilmelding når passord mangler", ()=>{
    const passwrdInput = document.getElementById("password");
    const infoRegTxt = document.getElementById("info-reg-txt");
    const userNameInput = document.getElementById("user-name");

    userNameInput.value = "Kari";

    if(!passwrdInput.value){
      infoRegTxt.textContent = "Please create a password.";
      infoRegTxt.style.color = "red";
    };

    expect(infoRegTxt.textContent).toBe("Please create a password.");
    expect(infoRegTxt.style.color).toBe("red");
  })
});

test("Lagrer bruker til sessionStorage etter registrering av bruker", ()=>{
  document.body.innerHTML=`
    <input id="user-name" value="Violet" />
    <input id="password" value="hello1"/>
  `;

  const userNameInput = document.getElementById("user-name");
  const passwrdInput = document.getElementById("password");

  const saveUser = () => {
    const newUser = {
      name: userNameInput.value,
      password: passwrdInput.value
    };
    sessionStorage.setItem("userLoggedin", JSON.stringify(newUser));
  };

  saveUser();

  const savedUser = JSON.parse(sessionStorage.getItem("userLoggedin"));

  expect(savedUser).toEqual({name: "Violet", password: "hello1"});
});

// Login:

test("Viser feilmelding ved feil passord i login", ()=>{
  document.body.innerHTML=`
  <input id="user-name" />
  <input id="password" />
  <div id="info-txt"></div>
  `;

  const userNameInput = document.getElementById("user-name");
  const passwrdInput = document.getElementById("password");  
  const infoTxt = document.getElementById("info-txt");

  userNameInput.value = "CorrectUsr";
  passwrdInput.value = "WrongPass";

  const users = [{ name: "CorrectUsr", password: "CorrectPass"}];

  const foundUsr = users.find(
    (user) => user.name === userNameInput.value && user.password === passwrdInput.value
  );

  if(!foundUsr){
    const nameExists = users.find((user)=> user.name === userNameInput.value);
    const passExists = users.find((user)=> user.password === passwrdInput.value);

    if(nameExists && !passExists){
      infoTxt.textContent = "Incorrect password";
      infoTxt.style.color = "red";
    }
  }

  expect(infoTxt.textContent).toBe("Incorrect password");
  expect(infoTxt.style.color).toBe("red");
})