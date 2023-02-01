export class Material {
    constructor(name) {
        this.name = name;
    }

    setModel(model) {
        this.model = model;
        return this;
    }
}

export class Item {
    oraxenID;
    displayname;
    material;
    type;
    lore = [];
    Pack;
    AttributeModifiers;

    constructor(oraxenID, displayName) {
        this.oraxenID = oraxenID;
        this.displayname = displayName;
    }

    setId(oraxenID) {
        this.oraxenID = oraxenID;
        return this;
    }

    setDisplayName(displayName) {
        this.displayName = `<white>${displayName}`;
        return this;
    }

    setLore(loreArray) {
        if (typeof loreArray === 'string') this.lore.push(loreArray);
        else loreArray.forEach(loreLine => this.lore.push(loreLine));
        return this;
    }

    setRarity(rarity) {
        this.lore.push(`<glyph:blank>`,`<glyph:${rarity.toLowerCase()}>`);
        return this;
    }

    setFlags(flags) {
        this.ItemFlags = flags;
        return this;
    }

    setTextures(path) {

        if (!this.oraxenID.includes('_')) path += `/${this.oraxenID}/${this.oraxenID}`;
        else path += `/${this.oraxenID.slice(0, this.oraxenID.indexOf("_"))}/${this.oraxenID}`;

        let pathArray = (this.armorPiece !== undefined) ? [path, path] : [path];

        this.Pack.generate_model = true;
        this.Pack.textures = pathArray;

        return this;
    }

    setCustomModelData(customModelData) {
        this.Pack.custom_model_data = customModelData;
        return this;
    }

    setAttributes(attributes) {
        attributes.forEach(attribute => this.attributes.push(attribute));
        return this;
    }

    setColor(hex) {
        this.color = this.parseHex(hex);
        return this;
    }

    parseHex(hex) {
        hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => { return (r + r + g + g + b + b) });
        let res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return res ? `${parseInt(res[1], 16)}, ${parseInt(res[2], 16)}, ${parseInt(res[3], 16)}` : null;
    }
}

export class Misc extends Item {

    constructor(oraxenID, displayName) {
        super(oraxenID, displayName);
        this.type = new Material("RABBIT_FOOT").setModel("item/generated");
        this.material = this.type.name;
        this.Pack = {};
        this.Pack.model = this.type.model;
    }
}

export class Weapon extends Item {

    constructor(oraxenID, displayName, weapon) {
        super(oraxenID, displayName);
        this.weapon = weapon;
        this.type = new Material("WOODEN_" + weapon.toUpperCase()).setModel("item/handheld");
        this.material = this.type.name;
        this.Pack = {};
        this.Pack.model = this.type.model;
    }
}

export class Armor extends Item {

    constructor(oraxenID, displayName, armorPiece) {
        super(oraxenID, displayName);
        this.armorPiece = armorPiece;
        this.type = new Material("LEATHER_" + armorPiece.toUpperCase()).setModel("item/generated");
        this.material = this.type.name;
        this.Pack = {};
        this.Pack.model = this.type.model;
    }
}