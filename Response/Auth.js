//Legg ved pages og batchsize for å kontrollere antall visninger i url i variabler se GIT ??

// legger inn results=20 for å ikke overbelaste crudcrud for fort
export const randomUserUrl =`https://randomuser.me/api/?results=50`;

const crudKey = "e8ec7c3a99d24bc2ba010a7a2f14fd9f";
export const crudCrudUrl=`https://crudcrud.com/api/${crudKey}/users`;
export const randomMatchUrl=`https://crudcrud.com/api/${crudKey}/matches`;