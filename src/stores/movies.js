import { defineStore } from "pinia";
import api from "../api";

export const useMovieStore = defineStore("movies", {
    state: () => ({
        movies: [],
        loading: false,
        loaded: false
    }),
    getters: {
        getById: (state) => (id) => state.movies.find((m) => (m._id || m.id) === id)
    },
    actions: {
        async fetchMovies({ force = false } = {}) {
            if (this.loaded && !force) return;
            this.loading = true;
            try {
                const res = await api.get("/movies/getMovies");
                this.movies = res.data?.movies || res.data || [];
                this.loaded = true;
            } catch (err) {
                console.error("Failed to fetch movies:", err);
            } finally {
                this.loading = false;
            }
        },
        async addMovie(movie) {
            const res = await api.post("/movies/addMovie", movie);
            const created = res.data?.movie || res.data;
            if (created && typeof created === "object") {
                this.movies.unshift(created);
            } else {
                await this.fetchMovies({ force: true });
            }
            return created;
        },
        async updateMovie(movieId, updates) {
            const res = await api.patch("/movies/updateMovie", { movieId, ...updates });
            const updated = res.data?.movie || res.data;
            if (updated && typeof updated === "object") {
                const idx = this.movies.findIndex((m) => (m._id || m.id) === movieId);
                if (idx !== -1) this.movies[idx] = updated;
            } else {
                await this.fetchMovies({ force: true });
            }
            return updated;
        },
        async deleteMovie(movieId) {
            await api.delete("/movies/deleteMovie", { data: { movieId } });
            this.movies = this.movies.filter((m) => (m._id || m.id) !== movieId);
        }
    }
});