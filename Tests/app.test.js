/**
 * @jest-environment jsdom
 */

// TESTER SIDE 2

describe("app.js - DOM relatert testing", ()=>{
  test("Tester at genderfilter filtrerer ut riktig kjønn", ()=>{
    const users = [
      {name: "Stella", gender: "female"},
      {name: "Hans", gender:"male"},
      {name: "Violet", gender:"female"}
    ];

    const results = users.filter(user => user.gender === "female");

    expect(results).toEqual([
      {name: "Stella", gender: "female"},
      {name: "Violet", gender: "female"}
    ]);
  });

  test("Tester at et kort element blir laget i DOM", ()=>{
    const fakeUser ={
      picture: {medium: "https://fake.image"},
      name: {first: "Violet", last: "Sorrengail"},
      gender: "female",
      dob: { age: 23},
      location: {city: "Oslo", state:"Oslo", country: "Norway"}
    };

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-div");

    const profilePic = document.createElement("img");
    profilePic.src = fakeUser.picture.medium;

    const nameTag = document.createElement("h3");
    nameTag.textContent = `${fakeUser.name.first} ${fakeUser.name.last}`;

    cardDiv.append(profilePic, nameTag);

    expect(cardDiv.tagName).toBe("DIV");
    expect(cardDiv.classList.contains("card-div")).toBe(true);
    expect(cardDiv.querySelector("h3").textContent).toBe("Violet Sorrengail");
    expect(cardDiv.querySelector("img").getAttribute("src")).toBe("https://fake.image");
  });
});

test("Ved trykk av filter-knapp resettes 'currentCard i sessionStorage", ()=>{
  document.body.innerHTML=`
  <button id="filter-females">Filter Females</button>
  `;

  sessionStorage.setItem("currentCard", "5");

  const filterBtn = document.getElementById("filter-females");

  filterBtn.addEventListener("click", ()=>{
    sessionStorage.setItem("currentCard", "0");
  });

  filterBtn.click();

  expect(sessionStorage.getItem("currentCard")).toBe("0");
});

test("Oppdaterer inputfeltene fra sessionStorage med minAge og maxAge", ()=>{
  document.body.innerHTML=`
  <input id="min-age"/>
  <input id="max-age"/>
  `;

  sessionStorage.setItem("minAge", "24");
  sessionStorage.setItem("maxAge", "35");

  const updateAgeFilterInStorage = () => {
    const minAge = sessionStorage.getItem("minAge");
    const maxAge = sessionStorage.getItem("maxAge");

    if(minAge){
      document.getElementById("min-age").value = minAge;
    }

    if(maxAge){
      document.getElementById("max-age").value = maxAge;
    }
  };

  updateAgeFilterInStorage();

  expect(document.getElementById("min-age").value).toBe("24");
  expect(document.getElementById("max-age").value).toBe("35");
})