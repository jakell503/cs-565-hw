/**
 This application retrieves information from the rick and morty api. The app displays information
 on the characters including a photo, species, and locations. **/

import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'https://rickandmortyapi.com/api';

// SECTION 1: API REQUESTS

async function getAllCharacters() {
  const characters = []; // Store the characters

  let url = `${API_URL}/character`; //info.next which is the url to the next character. Will be null for the last character.

  while (url) {
    // Continue until info.next = null
    const response = await fetch(url); // Send the request and await arrival
    if (!response.ok) {
      // Error incase something fails
      throw new Error('Could not get characters');
    }

    const data = await response.json(); // Convert the response into a json
    characters.push(...data.results); // Add the current characters results to the array
    url = data.info.next; // URL to the next character if it exists. null if not
  }

  return characters;
}


async function getAllLocations() {
  const locations = [];
  let url = `${API_URL}/location`;

  while (url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Could not get locations');
    }

    const data = await response.json();
    locations.push(...data.results);
    url = data.info.next;
  }

  return locations;
}

// SECTION 2: COMPONENTS

// This is the Home page.
function Home() {
  // This is the page shown when the URL is /home or an unknown path.
  return (
    <div>
      <h1>Welcome to my Rick and Morty App</h1>
      <p>Use the links above to view characters, species, and locations.</p>
    </div>
  );
}

// This is the Characters page. It displays a table of the first 100 characters from the API. For each character,
// it shows the name, picture, species, and status.
function Characters() {
  const [characters, setCharacters] = useState([]); // Update characters after the API responds.
  const [error, setError] = useState(''); // Keep track of any errors.

  // This runs after the first page appears
  useEffect(() => {
    getAllCharacters()
      .then((allCharacters) => setCharacters(allCharacters.slice(0, 100))) // Filter to the first 100 characters and save them in state.
      .catch((requestError) => setError(requestError.message));
  }, []); //[] array means that useEffect doesn't have any dependencies on any state variables. It will only run once when the page first appears/renders.

  // Show the error instead of the table if the request failed.
  if (error) {
    return <p>{error}</p>;
  }
  // Return a table of characters.
  return (
    <div>
      <h1>Characters</h1>
      <p>First 100 characters from the Rick and Morty API.</p>
      {/* Show Loading until the characters have arrived. */}
      {characters.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Species</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Make one table row for each character. */}
            {characters.map((character) => (
              <tr key={character.id}>
                <td>{character.name}</td>
                <td>
                  <img src={character.image} alt={character.name} />
                </td>
                <td>{character.species}</td>
                <td>{character.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// This is the Species page. It displays a list of all species and the characters that belong to each.
function Species() {
  // This object will eventually group character names by species.
  const [species, setSpecies] = useState({});
  const [error, setError] = useState('');

  // Load all characters when this page first appears.
  useEffect(() => {
    getAllCharacters()
      .then((characters) => {
        // Container for the grouped data. Each property will be a species and its value will be a list of character names.
        const speciesGroups = {};

        characters.forEach((character) => {
          // Create an empty list the first time we see a species.
          if (!speciesGroups[character.species]) {
            speciesGroups[character.species] = [];
          }
          // Add this character's name to that species' list.
          speciesGroups[character.species].push(character.name);
        });

        // Save the grouped data so React can display it.
        setSpecies(speciesGroups);
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Species</h1>
      {/* Object.keys gives us the list of species names. */}
      {Object.keys(species).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {/* Make one list item for each species. */}
          {Object.keys(species).map((speciesName) => (
            <li key={speciesName}>
              <strong>{speciesName}</strong> ({species[speciesName].length}):{' '}
              {species[speciesName].join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
// This is the Locations page. It displays a list of all location types and the number of locations for each type.
function Locations() {
  // This object will store how many locations have each type.
  const [locationTypes, setLocationTypes] = useState({});
  const [error, setError] = useState('');

  // Load all locations when this page first appears.
  useEffect(() => {
    getAllLocations()
      .then((locations) => {
        // Container for the grouped data. Each property will be a location type and its value will be a count.
        const types = {};

        locations.forEach((location) => {
          // Use "Unknown" when a location does not have a type.
          const type = location.type || 'Unknown';
          // Increase this type's count by one.
          types[type] = (types[type] || 0) + 1;
        });

        // Save the counts so React can display them.
        setLocationTypes(types);
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Locations</h1>
      {/* Show Loading until the location counts have been created. */}
      {Object.keys(locationTypes).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {/* Make one list item for each location type. */}
          {Object.keys(locationTypes).map((type) => (
            <li key={type}>
              {type}: {locationTypes[type]} locations
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Section 3: APP
function App() {
  // Read the url
  const path = window.location.pathname;
  // Make Home the default
  let page = <Home />;

  // Render the component based on the url.
  if (path === '/characters') {
    page = <Characters />;
  } else if (path === '/species') {
    page = <Species />;
  } else if (path === '/locations') {
    page = <Locations />;
  }
  // Return the navigation bar and the currently selected page/component.
  return (
    <div className="app">
      <nav>
        {/* These links change the URL and choose a different page. */}
        <a href="/home">Home</a>
        <a href="/characters">Characters</a>
        <a href="/species">Species</a>
        <a href="/locations">Locations</a>
      </nav>
      {page}
    </div>
  );
}

export default App;
