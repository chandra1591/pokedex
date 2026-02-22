import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';


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

export default function DetailsScreen() {
    const parms = useLocalSearchParams();
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

    console.log('pokemonData', pokemonData);

    console.log('parms', parms);

    useEffect(() => {
        fetchPokemnaDetails()
    }, []);

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


    return (
        <>
            <Stack.Screen  options={{ title: (typeof parms.name === 'string' ? parms.name.charAt(0).toUpperCase() + parms.name.slice(1) : '') } } />
            <ScrollView
                contentContainerStyle={{
                    gap: 16,
                    padding: 16,
                    backgroundColor: colorBaseType[pokemonData?.types[0].type.name as keyof typeof colorBaseType] + '50',
                }}>
                <View style={styles.container}>
                    <Text style={styles.name}>{(typeof parms.name === 'string' ? parms.name.charAt(0).toUpperCase() + parms.name.slice(1) : '')}</Text>
                     <Text style={styles.type}>{pokemonData?.types[0].type.name}</Text>
                    <View style={styles.imageView}>
                        <Image source={{ uri: pokemonData?.image }} style={styles.image} />
                        <Image source={{ uri: pokemonData?.imageBack }} style={styles.image} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    imageView: {
        flexDirection: 'row',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
     type: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
});