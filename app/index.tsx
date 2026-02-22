import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';


import { Link } from 'expo-router';
import { useEffect, useState } from 'react';


interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorBaseType = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  bug: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  fighting: '#C22E28',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export default function HomeScreen() {

  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  console.log('pokemonData', JSON.stringify(pokemonData, null, 2));

  useEffect(() => {
    fetchData()
  }, []);


  async function fetchData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
      const data = await response.json();


      const detailsPokeman = await Promise.all(
        data.results.map(async (pokemon: any) => {
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


  return (
    <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16
        }}
      >
        {pokemonData.map((pokemon) => (
          <Link 
            key={pokemon.name}
            href={{
              pathname: '/details',
              params: {
                name: pokemon.name
              }
            }}
            style={
              {
                flex: 1,
                backgroundColor: colorBaseType[pokemon.types[0].type.name as keyof typeof colorBaseType] + '50',
                borderRadius: 20,
                padding: 20,
              }
            }
          >
            <View>
              <Text style={styles.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
              <Text style={styles.type}>{pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)}</Text>
              <View style={styles.imageView}>
                <Image source={{ uri: pokemon.image }} style={styles.image} />
                <Image source={{ uri: pokemon.imageBack }} style={styles.image} />
              </View>

            </View>
          </Link>
        ))}
      </ScrollView>

  );
}

const styles = StyleSheet.create({

  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
  imageView: {
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
  }
});

