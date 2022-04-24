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

function getAssetHistory(coin_id) {
  // Tiempo actual
  const now = new Date();
  const end = now.getTime();

  // Tiempo hace 24 horas
  now.setDate(now.getDate() - 1);
  const start = now.getTime();

  return fetch(
    `${url}/assets/${coin_id}/history?interval=h1&start=${start}&end=${end}`
  )
    .then((respuesta) => respuesta.json())
    .then((respuesta) => respuesta.data);
}

function getMarkets(coin_id) {
  return fetch(`${url}/assets/${coin_id}/markets?limit=5`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => respuesta.data);
}

function getExchange(exchange_id) {
  return fetch(`${url}/exchanges/${exchange_id}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => respuesta.data);
}

export default {
  getAssets,
  getAsset,
  getMarkets,
  getExchange,
  getAssetHistory,
};
