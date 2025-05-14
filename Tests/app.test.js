/**
 * @jest-environment jsdom
 */
 
import { expect } from "@jest/globals";
import { ageFilter, genderFilter, nextCard} from "../JS/app.js";


describe("funksjoner i app.js", ()=>{
test("testen sjekker om genderFilter returnerer brukere med riktig kjønn", ()=>{

  const matches = [
    {name: "Clara", gender: "female"},
    {name: "John", gender: "male"},
    {name: "Stella", gender:"female"}
  ];
  const result = genderFilter(matches, "female");
 
  expect(result).toEqual([
    {name:"Clara", gender: "female"},
    {name:"Stella", gender:"female"}
  ]);
});
test("Testen sjekker at ageFilter returnerer brukere mellom 25 og 35", ()=>{
  const users = [
    {dob: {age: 50}},
    {dob: {age: 30}},
    {dob: {age: 20}}
  ];
  expect(ageFilter(users, 25, 35)).toEqual([
    {dob: {age: 30}}
  ]);
});
});
