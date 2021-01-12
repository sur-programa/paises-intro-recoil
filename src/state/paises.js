import { atom, selector } from 'recoil';

const apiUrl = process.env.REACT_APP_API_URL;

async function getJsonFromApi(path) {
  const response = await fetch(`${apiUrl}/${path}`);
  return response.json();
}

export const todosLosPaisesState = selector({
  key: 'todosLosPaises',
  get: () => getJsonFromApi('all'),
});

export const paisSeleccionadoState = atom({
  key: 'paisSeleccionado',
  default: null,
});
