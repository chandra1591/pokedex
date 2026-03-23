# 📱 Pokédex App
A simple Pokédex mobile/web app that displays a list of Pokémon and allows users to view detailed information about each Pokémon.

# 📖 About

This project fetches data from the PokéAPI and presents it in a clean UI with two main screens:

- Home Screen (Pokémon List)
- Details Screen (Selected Pokémon Info)

  # 🚀 Features
- 🔍 Fetch and display Pokémon list
- 🖼️ Show Pokémon images (front & back)
- 🧬 Display Pokémon types
- 📄 View detailed Pokémon information
- ⚡ Async data fetching using API

  # 📱 Screens
- 🏠 Home Screen (Pokémon List)
- Displays a list of Pokémon (limit: 20)
- Each item shows:
   - Name
   - Front image
   - Types

- Data is fetched from:https://pokeapi.co/api/v2/pokemon/?limit=20
- Additional details are fetched per Pokémon:
   - Front image
   - Back image
   - Types

# 🛠️ Tech Stack
- JavaScript / TypeScript
- React / React Native (based on your implementation)
- Fetch API
- PokéAPI

# 🔧 Core Logic
# Fetch Pokémon List
```
async function fetchData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
    const data = await response.json();

    const detailsPokeman = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const resData = await res.json();
        return {
          name: pokemon.name,
          image: resData.sprites.front_default,
          imageBack: resData.sprites.back_default,
          types: resData.types
        };
      })
    );

    setPokemonData(detailsPokeman);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

# Fetch Pokémon Details
```
async function fetchPokemnaDetails() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${parms.name}`);
    const data = await response.json();

    const detailsPokeman = {
      name: data.name,
      image: data.sprites.front_default,
      imageBack: data.sprites.back_default,
      types: data.types,
    };

    setPokemonData(detailsPokeman);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

# 📦 Installation
- git clone https://github.com/chandra1591/pokedex.git
- cd pokedex
- npm install

# ▶️ Run the Project
- npm start

# 🌐 API Used
https://pokeapi.co/

# Screens

<img width="320" height="568" alt="Simulator Screenshot - iPhone 16 Pro - 2026-02-22 at 22 32 44" src="https://github.com/user-attachments/assets/f3c9b72c-b0eb-4cca-8de6-9131c97c5088" />

<img width="320" height="568" alt="Simulator Screenshot - iPhone 16 Pro - 2026-02-22 at 22 32 51" src="https://github.com/user-attachments/assets/51b9254d-f7c6-4c19-b9a6-169a97c98b9b" />

