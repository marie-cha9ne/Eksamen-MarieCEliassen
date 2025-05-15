/**
* @jest-environment jsdom
*/

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
})