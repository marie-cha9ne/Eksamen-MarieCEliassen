# Eksamen - Marie Chanine Eliassen
Dette prosjektet er min besvarelse på eksamen i "Javascript Api". Dette er en enkel dating-app som viser brukerprofiler, lar deg filtrere på alder og kjønn, samt lagre matcher. 

## Hvordan fungerer appen?
- Brukere kan registrere seg og logge inn.
- Man kan se profiler (bruker-kort) fra ramdomuser.me api.
- Profilene kan man "swipe" på med knappe trykk Yes/No. 
- Det er mulig å filtrere profiler etter alder og kjønn.
- Matcher lagres i sessionStorage, samt post og get requester til crudcrud.
- Brukeren kan redigere egen profil.
- Brukerens likte matcher kan man sende "wink" til og få en tilfeldig generert kommentar tilbake.

## Hvordan kjører prosjektet?
1. Åpne "login.html".
2. For å kjøre tester: kjør "npm install" og deretter "npm test".

## Feillhåndtering og edge cases:
- Ved feil brukernavn og/eller passord vises tydelig tilbakemelding.
- Ved ugyldig input i aldersfiltrering får brukeren feilmelding.
- Dersom ingen matcher finnes etter filtrering vises melding

## Kilder brukt:
- Jest documentation: resetModules (for ESM + dynamic imports)
https://jestjs.io/docs/jest-object#jestresetmodules

-MDN Web Docs: Promise.resolve (for async testing)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

- Veileding fra ChatGPT (Generativ AI) for hjelp av syntax og debugging.