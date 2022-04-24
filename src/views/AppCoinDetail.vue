<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>

    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            class="w-20 h-20 mr-5"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>

      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="
          history.map((obj) => [obj.date, parseFloat(obj.priceUsd).toFixed(2)])
        "
      />

      <table>
        <tr
          v-for="market in markets"
          :key="`${market.exchangeId}-${market.priceUsd}`"
          class="border-b"
        >
          <td>
            <b>{{ market.exchangeId }}</b>
          </td>
          <td>{{ market.priceUsd | dollar }}</td>
          <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
          <td>
            <a class="hover:underline text-green-600" target="_blank"></a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "AppCoinDetail",

  data() {
    return {
      isLoading: false,
      asset: {},
      history: [],
      markets: [],
    };
  },

  created() {
    this.getCoin();
  },

  computed: {
    min() {
      return Math.min(
        // A la función que calculará el valor mínimo - Math.min() - se le tiene
        // que pasar un array de números. Esto lo conseguimos destructurando el
        // array 'history' y, por cada uno de los objetos que contiene (en total
        // 24 que representan el valor de la criptomoneda a intervalos de una
        // hora, de las últimas 24 horas) transformar cada uno de esos objetos
        // en un número, que será el atributo priceUsd correspondiente al precio
        // en esa hora de la criptomoneda (desechando otros atributos del objeto).
        ...this.history.map((h) => parseFloat(h.priceUsd))
      );
    },

    max() {
      return Math.max(...this.history.map((h) => parseFloat(h.priceUsd)));
    },

    avg() {
      return Math.abs(...this.history.map((h) => parseFloat(h.priceUsd)));
    },
  },

  methods: {
    getCoin() {
      const id = this.$route.params.id;
      this.isLoading = true;

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
