//Legg ved pages og batchsize for å kontrollere antall visninger i url i variabler se GIT ??

// legger inn results=20 for å ikke overbelaste crudcrud for fort
export const randomUserUrl =`https://randomuser.me/api/?results=500`;

const crudKey = "e49bdf7d044048aaa99fba7cd9724295";
export const crudCrudUrl=`https://crudcrud.com/api/${crudKey}/users`;
export const randomMatchUrl=`https://crudcrud.com/api/${crudKey}/matches`;