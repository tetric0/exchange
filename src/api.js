const url = "https://api.coincap.io/v2";

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => respuesta.data);
}

function getAsset(coin_id) {
  return fetch(`${url}/assets/${coin_id}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => respuesta.data);
}

export default {
  getAssets,
  getAsset,
};
