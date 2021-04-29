<template>
    <div class="bg-gray-50 rounded-md w-11/12 mx-auto m-1 shadow">
        <div
            :class="[show ? 'rounded-t-md' : 'rounded-md']"
            class="bg-white cursor-pointer p-2 flex justify-between"
            @click="show = !show"
        >
            <h3 v-text="episode.name"></h3>

            <div class="flex items-center">
                <icons v-if="show" key="chevron-up" icon="chevron-up"></icons>
                <icons v-else key="chevron-down" icon="chevron-down"></icons>
            </div>
        </div>

        <div v-show="show" class="p-2 border-gray-200 border-t">
            <div v-text="seasonAndEpisode"></div>
            <div v-text="numberOfCharacters"></div>
            <div v-text="episodeAired"></div>
        </div>
    </div>
</template>

<script>
import Icons from "@/components/Icons.vue";

export default {
    name: "EpisodeCard",

    components: {
        Icons,
    },

    props: {
        episode: Object,
    },

    data() {
        return {
            show: false,
        };
    },

    computed: {
        seasonAndEpisode() {
            const season = parseInt(this.episode.episode.match(/S(\d+)/).pop());
            const episode = parseInt(
                this.episode.episode.match(/E(\d+)/).pop()
            );

            return `Season ${season} · Episode ${episode}`;
        },

        numberOfCharacters() {
            return "Number of characters" + this.episode.characters.length;
        },

        episodeAired() {
            return "Episode aired" + this.episode.air_date;
        },
    },
};
</script>