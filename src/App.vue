<template>
  <main class="grid place-items-center w-full h-full">
    <img class="p-2 rounded size" src="./assets/item.png" style="image-rendering: pixelated;" alt="Sword">
    <section class="grid place-items-center">
      <h2 class="font-bold text-3xl">Global settings</h2>
      <label for="oraxenID">Oraxen ID</label>
      <input id="oraxenID" name="oraxenID" ref="oraxenID" type="text" v-model="itemData.oraxenID">
      <label for="directory">Directory</label>
      <input id="directory" name="directory" ref="directory" type="text" v-model="itemData.directory">
      <label for="modelID">Starting Model ID</label>
      <input class="mt-1 flex rounded-md shadow-sm" id="modelID" name="modelID" ref="modelID" type="number" v-model.number="itemData.modelID">
    </section>
    <ItemCreator v-bind:itemData="itemData" v-bind:items="items"></ItemCreator>
    <button v-if="Object.keys(items).length !== 0" @click="parseData">Generate items</button>
    <pre>{{ parsedData }}</pre>
  </main>
</template>

<script>
import '@/main.css';
import ItemCreator from '@/components/ItemCreator';
import { stringify } from 'yaml';

export default {
  name: 'App',
  components: {
    ItemCreator,
  },
  data() {
    return {
      startingModelID: 1001,
      itemData: {
        oraxenID: 'test_item',
        directory: 'items/test',
        modelID: 0,
      },
      items: {},
      parsedData: null,
    }
  },
  methods: {
    parseData() {
      this.cleanUp();
      this.parsedData = stringify(this.items);
    },
    cleanUp() {
      for (let item in this.items) {
        delete this.items[item].weapon;
        delete this.items[item].armorPiece;
        delete this.items[item].type;
        delete this.items[item].oraxenID;
      }
    }
  },
  beforeMount() {
    this.itemData.modelID = this.startingModelID;
  }
}
</script>

<style>
</style>