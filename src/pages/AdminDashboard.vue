<template>
    <div class="container py-5">
        <div class="d-flex align-items-end justify-content-between mb-4 flex-wrap gap-3">
            <div>
                <div class="section-eyebrow mb-1">Admin</div>
                <h2 class="font-display" style="font-size: 2.2rem; letter-spacing: 0.03em;">
                 DASHBOARD
                </h2>
            </div>
            <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-gold" @click="openAddForm">
                    <i class="bi bi-plus-lg me-1"></i> {{ showForm && !editingId ? "Close" : "Add Movie" }}
                </button>
            </div>
        </div>

        <div class="row g-3 mb-4">
            <div class="col-6 col-md-3">
                <div class="stat-pill">
                    <div class="num">{{ store.movies.length }}</div>
                    <div class="label">Total movies</div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="stat-pill">
                    <div class="num">{{ genreCount }}</div>
                    <div class="label">Genres</div>
                </div>
            </div>
        </div>

        <div v-if="feedback" class="alert py-2 small" :class="feedback.type === 'error' ? 'alert-danger' : 'alert-success'">
            {{ feedback.text }}
        </div>

        <div class="table-responsive" v-if="store.movies.length">
            <table class="table table-cine align-middle">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Comments</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="movie in store.movies" :key="movie._id || movie.id">
                        <td>{{ movie.title }}</td>
                        <td>{{ movie.director }}</td>
                        <td>{{ movie.year }}</td>
                        <td><span class="genre-chip">{{ movie.genre }}</span></td>
                        <td class="text-muted">{{ (movie.comments || []).length }}</td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-ghost me-2" @click="openEditForm(movie)">
                                <i class="bi bi-pencil me-1"></i> Edit
                            </button>
                            <button
                                class="btn btn-sm btn-outline-danger"
                                @click="handleDeleteMovie(movie)"
                                :disabled="deletingId === (movie._id || movie.id)"
                            >
                                <i class="bi bi-trash me-1"></i>
                                {{ deletingId === (movie._id || movie.id) ? "Deleting..." : "Delete" }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="empty-state">
            <i class="bi bi-film fs-3 d-block mb-2"></i>
            No movies in the catalog yet. Add one to get started.
        </div>

        <!-- Inline Add/Edit Movie form (shown below the movies list when toggled) -->
        <div class="card-cine mt-4" v-if="showForm">
            <div class="p-4">
                <h5 class="font-display mb-4" style="letter-spacing: 0.03em;">
                    {{ editingId ? "EDIT MOVIE" : "ADD MOVIE" }}
                </h5>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label class="form-label text-muted small">Title</label>
                        <input v-model="form.title" class="form-control form-control-cine" required />
                    </div>
                    <div class="row">
                        <div class="col-8 mb-3">
                            <label class="form-label text-muted small">Director</label>
                            <input v-model="form.director" class="form-control form-control-cine" required />
                        </div>
                        <div class="col-4 mb-3">
                            <label class="form-label text-muted small">Year</label>
                            <input v-model.number="form.year" type="number" class="form-control form-control-cine" required />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label text-muted small">Genre</label>
                        <input v-model="form.genre" class="form-control form-control-cine" placeholder="" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label text-muted small">Description</label>
                        <textarea v-model="form.description" class="form-control form-control-cine" rows="3" required></textarea>
                    </div>

                    <div class="alert alert-danger py-2 small" v-if="formError">{{ formError }}</div>

                    <div class="d-flex justify-content-end gap-2">
                        <button type="button" class="btn btn-ghost" @click="cancelForm">Cancel</button>
                        <button type="submit" class="btn btn-gold" :disabled="submitting">
                            {{ submitting ? "Saving..." : (editingId ? "Update movie" : "Save movie") }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useMovieStore } from "../stores/movies";

const store = useMovieStore();
const submitting = ref(false);
const formError = ref("");
const feedback = ref(null);
const showForm = ref(false);
const editingId = ref(null);
const deletingId = ref(null);

const form = reactive({
    title: "",
    director: "",
    year: new Date().getFullYear(),
    genre: "",
    description: ""
});

onMounted(() => {
    if (!store.loaded) store.fetchMovies();
});

const genreCount = computed(() => new Set(store.movies.map((m) => m.genre).filter(Boolean)).size);

function resetForm() {
    form.title = "";
    form.director = "";
    form.year = new Date().getFullYear();
    form.genre = "";
    form.description = "";
}

function openAddForm() {
    if (showForm.value && !editingId.value) {
        // form is already open in "add" mode, so this click closes it
        showForm.value = false;
        resetForm();
        return;
    }
    editingId.value = null;
    resetForm();
    formError.value = "";
    showForm.value = true;
}

function openEditForm(movie) {
    editingId.value = movie._id || movie.id;
    form.title = movie.title || "";
    form.director = movie.director || "";
    form.year = movie.year || new Date().getFullYear();
    form.genre = movie.genre || "";
    form.description = movie.description || "";
    formError.value = "";
    showForm.value = true;
}

function cancelForm() {
    showForm.value = false;
    editingId.value = null;
    formError.value = "";
    resetForm();
}

async function handleSubmit() {
    formError.value = "";
    submitting.value = true;
    try {
        if (editingId.value) {
            await store.updateMovie(editingId.value, { ...form });
            feedback.value = { type: "success", text: `"${form.title}" was updated.` };
        } else {
            await store.addMovie({ ...form });
            feedback.value = { type: "success", text: `"${form.title}" was added to the catalog.` };
        }
        resetForm();
        showForm.value = false;
        editingId.value = null;
    } catch (err) {
        formError.value = err.response?.data?.message || "Couldn't save that movie. Please try again.";
    } finally {
        submitting.value = false;
    }
}

async function handleDeleteMovie(movie) {
    const id = movie._id || movie.id;
    if (!window.confirm(`Delete "${movie.title}"? This can't be undone.`)) return;

    deletingId.value = id;
    feedback.value = null;
    try {
        await store.deleteMovie(id);
        feedback.value = { type: "success", text: `"${movie.title}" was deleted.` };
        // If the movie being edited was just deleted, close the form
        if (editingId.value === id) {
            cancelForm();
        }
    } catch (err) {
        feedback.value = { type: "error", text: err.response?.data?.message || "Couldn't delete that movie." };
    } finally {
        deletingId.value = null;
    }
}
</script>