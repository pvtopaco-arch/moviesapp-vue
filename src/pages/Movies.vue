<template>
    <div class="container py-5">
        <div class="d-flex align-items-end justify-content-between mb-4 flex-wrap gap-3">
            <div>
                <div class="section-eyebrow mb-1">The catalog</div>
                <h2 class="font-display" style="font-size: 2.2rem; letter-spacing: 0.03em;">
                 MOVIES
                </h2>
            </div>
            <input
                v-model="search"
                type="text"
                class="form-control form-control-cine"
                style="max-width: 280px;"
                placeholder="Search by title or director..."
            />
        </div>
        <div v-if="store.loading" class="text-muted">Loading movies...</div>
        <div v-else-if="loadError" class="empty-state">
            <i class="bi bi-exclamation-triangle fs-3 d-block mb-2"></i>
            Couldn't load the catalog right now. {{ loadError }}
            <div class="mt-3">
                <button class="btn btn-outline-gold btn-sm" @click="load">Try again</button>
            </div>
        </div>
        <div v-else-if="filteredMovies.length === 0" class="empty-state">
            <i class="bi bi-film fs-3 d-block mb-2"></i>
            No movies match your search yet.
        </div>
        <div v-else class="row g-4">
            <div class="col-6 col-md-4 col-lg-3" v-for="(movie, index) in filteredMovies" :key="movie._id || movie.id">
                <MovieCard :movie="movie" :index="index" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useMovieStore } from "../stores/movies";
import MovieCard from "../components/MovieCard.vue";
const store = useMovieStore();
const search = ref("");
const loadError = ref("");
async function load() {
    loadError.value = "";
    try {
        await store.fetchMovies({ force: true });
    } catch (err) {
        loadError.value = err.response?.data?.message || "Please try again in a moment.";
    }
}
onMounted(() => {
    if (!store.loaded) load();
});
const filteredMovies = computed(() => {
    const term = search.value.trim().toLowerCase();
    if (!term) return store.movies;
    return store.movies.filter(
        (m) =>
            m.title?.toLowerCase().includes(term) ||
            m.director?.toLowerCase().includes(term) ||
            m.genre?.toLowerCase().includes(term)
    );
});
</script>