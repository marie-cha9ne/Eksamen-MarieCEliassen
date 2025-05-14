/**
 * @jest-environment jsdom
 */

import { expect } from "@jest/globals";
import {
  ageFilter,
  genderFilter,
  unMatcUser,
  userCardSetup,
} from "../JS/app.js";

describe("funksjoner i app.js", () => {
  test("testen sjekker om genderFilter returnerer brukere med riktig kjønn", () => {
    const matches = [
      { name: "Clara", gender: "female" },
      { name: "John", gender: "male" },
      { name: "Stella", gender: "female" },
    ];
    const result = genderFilter(matches, "female");

    expect(result).toEqual([
      { name: "Clara", gender: "female" },
      { name: "Stella", gender: "female" },
    ]);
  });

  test("Testen sjekker at ageFilter returnerer brukere mellom 25 og 35", () => {
    const users = [
      { dob: { age: 50 } },
      { dob: { age: 30 } },
      { dob: { age: 20 } },
    ];
    expect(ageFilter(users, 25, 35)).toEqual([{ dob: { age: 30 } }]);
  });
});

test("unMatchUser lager en knapp med riktig tekst og klasse", () => {
  const btn = unMatcUser("fakeId");

  expect(btn.tagName).toBe("BUTTON");
  expect(btn.textContent).toBe("Unmatch 🥀");
  expect(btn.classList.contains("unmatch-btn")).toBe(true);
});

test("testen sjekker at userCardSetup lager kort med riktig innhold", () => {
  const fakeUser = {
    picture: { medium: "https://fake.image" },
    name: { first: "Clara", last: "Klok" },
    gender: "female",
    dob: { age: 28 },
    location: { city: "Oslo", state: "Oslo", country: "Norway" },
  };

  const card = userCardSetup(fakeUser);

  expect(card.tagName).toBe("DIV");
  expect(card.classList.contains("card-div")).toBe(true);

  expect(card.style.border).toBe("5px solid pink");

  expect(card.children.length).toBe(5);

  const img = card.querySelector("img");
  expect(img.src).toBe("https://fake.image/");

  const name = card.querySelector("h3");
  expect(name.textContent).toBe("Clara Klok");

  const gender = card.querySelectorAll("p")[0];
  expect(gender.textContent).toBe("Gender: female");

  const age = card.querySelectorAll("p")[1];
  expect(age.textContent).toBe("Age:28");

  const city = card.querySelectorAll("p")[2];
  expect(city.textContent).toBe("Oslo, Oslo, Norway");
});
