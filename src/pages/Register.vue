<template>
    <div class="auth-shell">
        <div class="auth-card">
            <h1>JOIN CINEMATIC</h1>
            <p class="text-muted mb-4">Just three fields to get started.</p>

            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label class="form-label text-muted small">Email</label>
                    <input v-model="email" type="email" class="form-control form-control-cine" required />
                </div>
                <div class="mb-3">
                    <label class="form-label text-muted small">Password</label>
                    <input v-model="password" type="password" class="form-control form-control-cine" minlength="8" required />
                </div>
                <div class="mb-3">
                    <label class="form-label text-muted small">Confirm password</label>
                    <input v-model="confirmPassword" type="password" class="form-control form-control-cine" minlength="8" required />
                </div>

                <div class="alert alert-danger py-2 small" v-if="error">{{ error }}</div>
                <div class="alert alert-success py-2 small" v-if="success">{{ success }}</div>

                <button type="submit" class="btn btn-gold w-100 mt-2" :disabled="loading">
                    {{ loading ? "Creating account..." : "Sign up" }}
                </button>
            </form>

            <p class="text-muted small mt-4 mb-0">
                Already have an account? <router-link :to="{ name: 'Login' }">Log in</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);

const auth = useAuthStore();
const router = useRouter();

async function handleSubmit() {
    error.value = "";
    success.value = "";

    if (password.value !== confirmPassword.value) {
        error.value = "Passwords don't match.";
        return;
    }

    loading.value = true;
    try {
        await auth.register({ email: email.value, password: password.value });
        success.value = "Account created. Redirecting to login...";
        setTimeout(() => router.push({ name: "Login" }), 1200);
    } catch (err) {
        error.value = err.response?.data?.message || "Couldn't create the account. Try a different email.";
    } finally {
        loading.value = false;
    }
}
</script>
