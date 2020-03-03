const fetch = require("node-fetch");

const url = "https://swapi.co/api/people/";

// a)
function printPlanetforFirstSpeciesInFirstMovieForPerson(id) {
  fetch(url + id)
    .then(data => data.json())
    .then(person =>
      fetch(person.films[0])
        .then(data => data.json())
        .then(film =>
          fetch(film.species[0])
            .then(data => data.json())
            .then(species =>
              fetch(species.homeworld)
                .then(data => data.json())
                .then(homeworld => console.log(homeworld))
            )
        )
    );
}

//printPlanetforFirstSpeciesInFirstMovieForPerson(1);

// b)
async function getPlanetforFirstSpeciesInFirstMovieForPersonAsync(id) {
  const person = await (await fetch(url + id)).json();
  const film = await (await fetch(person.films[0])).json();
  const species = await (await fetch(film.species[0])).json();
  const homeworld = await (await fetch(species.homeworld)).json();
  return homeworld;
}

async function printPlanetforFirstSpeciesInFirstMovieForPersonAsync(id) {
  const homeworld = await getPlanetforFirstSpeciesInFirstMovieForPersonAsync(id);
  console.log(homeworld);
}

printPlanetforFirstSpeciesInFirstMovieForPersonAsync(1);
