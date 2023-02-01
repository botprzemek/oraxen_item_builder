<template>
  <section>
    <label>Display Name</label>
    <input name="displayName" ref="displayName" type="text" v-model="displayName">
    <label>Lore</label>
    <textarea name="lore" ref="lore" v-model="lore"></textarea>
    <section>
      <h2>Choose Type</h2>
      <p>Selected {{ type }}</p>
      <input id="misc" value="Miscellaneous" name="type" type="radio" v-model="type">
      <label for="misc">Misc</label>
      <input id="weapon" value="Weapon" name="type" type="radio" v-model="type">
      <label for="weapon">Weapon</label>
      <input id="armor" value="Armor" name="type" type="radio" v-model="type">
      <label for="armor">Armor</label>
    </section>
    <section v-if="type === 'Armor'">
      <h2>Choose Rarity</h2>
      <p>Selected {{ rarity }}</p>
      <input id="common" value="Common" name="rarity" type="radio" v-model="rarity">
      <label for="common">Common</label>
      <input id="rare" value="Rare" name="rarity" type="radio" v-model="rarity">
      <label for="rare">Rare</label>
      <input id="epic" value="Epic" name="rarity" type="radio" v-model="rarity">
      <label for="epic">Epic</label>
      <input id="legendary" value="Legendary" name="rarity" type="radio" v-model="rarity">
      <label for="legendary">Legendary</label>
    </section>
    <section>
      <h2>Choose Rarity</h2>
      <p>Selected {{ rarity }}</p>
      <input id="common" value="Common" name="rarity" type="radio" v-model="rarity">
      <label for="common">Common</label>
      <input id="rare" value="Rare" name="rarity" type="radio" v-model="rarity">
      <label for="rare">Rare</label>
      <input id="epic" value="Epic" name="rarity" type="radio" v-model="rarity">
      <label for="epic">Epic</label>
      <input id="legendary" value="Legendary" name="rarity" type="radio" v-model="rarity">
      <label for="legendary">Legendary</label>
    </section>
    <section v-if="this.type === 'Armor'">
      <input id="color" name="color" type="color" v-model="color">
      <label for="color">Choose color</label>
    </section>
    <button @click="addItem">Add Item</button>
  </section>
</template>

<script>
import { Misc, Weapon, Armor } from '@/methods/Item.js';

export default {
  name: 'ItemCreator',
  props: ['itemData', 'items'],
  data() {
    return {
      item: {},
      usedOraxenID: null,
      lore: 'Test\nLore',
      displayName: 'Test Item',
      type: 'Miscellaneous',
      rarity: 'Common',
      color: null,
    }
  },
  methods: {
    createItem(itemData) {
      let lore = this.transformLore();

      switch (this.type) {
        case 'Miscellaneous':
          this.item = new Misc(itemData.oraxenID, `<white>${this.displayName}`);
          break;
        case 'Weapon':
          this.item = new Weapon(itemData.oraxenID, `<white>${this.displayName}`, 'SWORD');
          break;
        case 'Armor':
          this.item = new Armor(itemData.oraxenID, `<white>${this.displayName}`, );
          break;
        default:
          this.item = new Misc(itemData.oraxenID, `<white>${this.displayName}`);
          break;
      }

      this.item.setLore(lore);
      this.item.setCustomModelData(itemData.modelID);
      this.item.setTextures(itemData.directory);

      if (this.color != null) this.item.setColor(this.color);
      if (this.rarity != null) this.item.setRarity(this.rarity);

      return this.item;
    },
    addItem() {
      if (this.$props.itemData.oraxenID === null || this.$props.itemData.directory == null || this.$props.itemData.modelID == null) return;
      if (this.usedOraxenID === this.$props.itemData.oraxenID) return;

      this.$props.items[this.$props.itemData.oraxenID] = this.createItem(this.$props.itemData);
      this.$props.itemData.modelID++;
      this.usedOraxenID = this.$props.itemData.oraxenID;
    },
    transformLore() {
      return this.lore.replace(/\r\n/g,"\n").split("\n");
    }
  },
}
</script>

<style scoped>

</style>