<template>
    <div>
        <character-attribute
            name="Name"
            :value="character.name"
        ></character-attribute>

        <character-attribute
            name="Status"
            :value="character.status"
        ></character-attribute>

        <character-attribute
            name="Species"
            :value="character.species"
        ></character-attribute>

        <character-attribute
            name="Type"
            :value="character.type"
        ></character-attribute>

        <character-attribute
            name="Gender"
            :value="character.gender"
        ></character-attribute>

        <character-attribute
            name="Origin"
            :value="character.origin.name"
        ></character-attribute>

        <character-attribute
            name="Location"
            :value="character.location.name"
        ></character-attribute>
    </div>
</template>

<script>
import CharacterAttribute from "./CharacterAttribute.vue";

export default {
    name: "CharacterAttributeList",

    components: {
        CharacterAttribute,
    },

    props: {
        character: Object,
    },
};
</script>