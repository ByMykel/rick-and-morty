<template>
    <div>
        <CharacterAttribute name="Status" :value="character.status" />
        <CharacterAttribute name="Species" :value="character.species" />
        <CharacterAttribute name="Type" :value="character.type" />
        <CharacterAttribute name="Gender" :value="character.gender" />
        <CharacterAttribute name="Origin" :value="character.origin.name" />
        <CharacterAttribute name="Location" :value="character.location.name" />
    </div>
</template>

<script>
import CharacterAttribute from "@/components/CharacterAttribute.vue";

export default {
    name: "CharacterAttributeList",
    props: {
        character: Object,
    },
    components: {
        CharacterAttribute,
    },
};
</script>