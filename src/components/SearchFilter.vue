<template>
  <div
    class="w-5/6 mx-auto bg-white shadow-md mt-2 rounded-md flex flex-col items-center max-w-6xl"
  >
    <div class="md:flex">
      <div class="text-center px-3">
        <h1>Status</h1>
        <div class="block">
          <FilterTag
            v-for="(tag, index) in ['alive', 'dead', 'unknown']"
            :key="index"
            :selected="selectedStatus"
            :name="tag"
            event="statusChanged"
            bgcolor="bg-red-500"
            >{{ tag }}</FilterTag
          >
        </div>
      </div>
      <div class="text-center">
        <h1>Gender</h1>
        <div class="block">
          <FilterTag
            v-for="(tag, index) in ['female', 'male', 'genderless', 'unknown']"
            :key="index"
            :selected="selectedGender"
            :name="tag"
            event="genderChanged"
            bgcolor="bg-blue-500"
            >{{ tag }}</FilterTag
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterTag from "@/components/FilterTag.vue";

export default {
  name: "SearchFilter",
  components: {
    FilterTag,
  },
  props: {
    selectedStatus: String,
    selectedGender: String,
  },
};
</script>