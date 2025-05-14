/**
* @jest-environment jsdom
*/

import { beforeEach, describe, expect, jest } from '@jest/globals';

// TESTER REGISTRERING SIDE 1:
describe("register.js - validering", ()=>{

    const html =`
    <button id="create-btn">Create</button>
    <div id="info-reg-txt"></div>
    <input id="user-name"/>
    <input id="password"/>
    `;

    beforeEach(async ()=>{
    jest.resetModules();
    document.body.innerHTML = html;
    await import("../JS/register.jS");
    sessionStorage.clear()
  });


  test("Vis feilmelding når brukernavn mangler", async ()=>{
    document.getElementById("password").value ="passwrd";

    document.getElementById("create-btn").click();

    const info = document.getElementById("info-reg-txt");
    expect(info.textContent).toBe("Please create a user name.");
    expect(info.style.color).toBe("red");
  });

  test("Hvis passord mangler, vis feilmelding",async ()=>{
    document.getElementById("user-name").value = "Kari";

    document.getElementById("create-btn").click();

    const info = document.getElementById("info-reg-txt");
    expect(info.textContent).toBe("Please create a password.");
    expect(info.style.color).toBe("red");
  });
});

// TESTER LOGIN SIDE 1:

jest.unstable_mockModule("../Response/GET-users.js", ()=>({
  getUsers: ()=> Promise.resolve([
    {name:"Kari", password:"nord2"}
  ])
}));

describe("login.js - validering", ()=>{
  const htmlLogin = `
  <button id="login-btn">Login</button>
  <input id="user-name"/>
  <input id="password"/>
  <div id="info-txt"></div>
  `;

   beforeEach(async ()=>{
    jest.resetModules();
    sessionStorage.clear();
    document.body.innerHTML = htmlLogin;
    await import("../JS/login.js");
  });

  test("Testen lykkes når bruker navn og passord stemmer", async ()=>{
    await import("../JS/login.js");
    document.getElementById("user-name").value="Kari";
    document.getElementById("password").value="nord2";
    document.getElementById("login-btn").click();
    await Promise.resolve();
    const saved = JSON.parse(sessionStorage.getItem("userLoggedin"));
    expect(saved).toEqual({name:"Kari", password:"nord2"})
  });

  test("Viser feilmelding ved feil brukernavn", async ()=>{
    document.getElementById("user-name").value = "Ola";
    document.getElementById("password").value = "nord2";
    document.getElementById("login-btn").click();
    await Promise.resolve();
    const info = document.getElementById("info-txt");
    expect(info.textContent).toBe("Incorrect username");
    expect(info.style.color).toBe("red");
  })
});