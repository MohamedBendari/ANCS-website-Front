<template>
  <div class="auth-page">

    <!-- Left Panel -->
    <div class="auth-left">
      <div class="left-content">
        <router-link to="/" class="back-home">
          <i class="fas fa-arrow-left"></i> Back to Home
        </router-link>

        <div class="brand">
          <img src="../assets/ancs-logo.png" alt="ANCS" class="brand-logo">
          <h1>ANCS</h1>
          <p>Automated Network Configuration System</p>
        </div>

        <div class="features-list">
          <div class="feat-item">
            <div class="feat-icon"><i class="fas fa-robot"></i></div>
            <div>
              <h4>AI-Powered Automation</h4>
              <p>Automate complex network configurations intelligently</p>
            </div>
          </div>
          <div class="feat-item">
            <div class="feat-icon"><i class="fas fa-shield-alt"></i></div>
            <div>
              <h4>Enterprise Security</h4>
              <p>AES-encrypted credentials and secure SSH tunnels</p>
            </div>
          </div>
          <div class="feat-item">
            <div class="feat-icon"><i class="fas fa-tachometer-alt"></i></div>
            <div>
              <h4>Real-time Dashboard</h4>
              <p>Monitor and manage all your devices from one place</p>
            </div>
          </div>
        </div>
      </div>
      <div class="left-glow"></div>
    </div>

    <!-- Right Panel — Admin Login Only -->
    <div class="auth-right">
      <div class="auth-box">

        <!-- Header -->
        <div class="admin-badge">
          <i class="fas fa-shield-alt"></i>
          <span>Admin Access</span>
        </div>

        <div class="form-header">
          <h2>Admin Login</h2>
          <p>Sign in to access the ANCS dashboard</p>
        </div>

        <div class="form-group">
          <label>Username</label>
          <div class="input-wrap" :class="{ focused: focused === 'username', error: errors.username }">
            <i class="fas fa-user"></i>
            <input
              type="text"
              v-model="loginData.username"
              placeholder="Admin username"
              @focus="focused = 'username'"
              @blur="focused = ''"
              @keyup.enter="handleLogin"
            >
          </div>
          <span class="err-msg" v-if="errors.username">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-wrap" :class="{ focused: focused === 'password', error: errors.password }">
            <i class="fas fa-lock"></i>
            <input
              :type="showPass ? 'text' : 'password'"
              v-model="loginData.password"
              placeholder="Admin password"
              @focus="focused = 'password'"
              @blur="focused = ''"
              @keyup.enter="handleLogin"
            >
            <button class="eye-btn" @click="showPass = !showPass" type="button">
              <i :class="showPass ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <span class="err-msg" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div v-if="serverError" class="server-error">
          <i class="fas fa-exclamation-triangle"></i> {{ serverError }}
        </div>

        <button class="submit-btn" @click="handleLogin" :disabled="isLoading">
          <span v-if="!isLoading"><i class="fas fa-sign-in-alt"></i> Sign In as Admin</span>
          <span v-else class="loader-wrap"><span class="spinner"></span> Signing in...</span>
        </button>

        <router-link to="/" class="back-link">
          <i class="fas fa-arrow-left"></i> Back to main site
        </router-link>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router    = useRouter()
const authStore = useAuthStore()

const focused     = ref('')
const showPass    = ref(false)
const isLoading   = ref(false)
const serverError = ref('')
const errors      = ref({})
const loginData   = ref({ username: '', password: '' })

const validateLogin = () => {
  errors.value = {}
  if (!loginData.value.username) errors.value.username = 'Username is required'
  if (!loginData.value.password) errors.value.password = 'Password is required'
  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  if (!validateLogin()) return
  isLoading.value = true
  serverError.value = ''
  try {
     const res = await fetch('https://ancs-website-backend-production.up.railway.app/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: loginData.value.username.trim(),
        password: loginData.value.password.trim()
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || data.detail || 'Invalid credentials')

    if (data.role !== 'admin') {
      throw new Error('Access denied. Admin accounts only.')
    }

    authStore.loginSuccess(data.access, data.username, data.role)
    router.push('/dashboard')
  } catch (err) {
    serverError.value = err.message || 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  background: #0b1c2c;
  padding-top: 0;
}

/* LEFT PANEL */
.auth-left {
  width: 45%;
  background: linear-gradient(145deg, #0d2137, #071525);
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(66,165,245,0.1);
}
.left-glow {
  position: absolute;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(66,165,245,0.12) 0%, transparent 70%);
  bottom: -100px; left: -100px;
  pointer-events: none;
}
.back-home {
  display: inline-flex; align-items: center; gap: 8px;
  color: rgba(255,255,255,0.5); text-decoration: none;
  font-size: 14px; font-weight: 500;
  transition: color 0.25s; margin-bottom: 60px;
}
.back-home:hover { color: #42a5f5; }
.brand { margin-bottom: 60px; }
.brand-logo { width: 56px; border-radius: 14px; margin-bottom: 16px; }
.brand h1 {
  font-size: 40px; font-weight: 900; letter-spacing: -1px;
  background: linear-gradient(135deg, #42a5f5, #0096c7);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  color: #42a5f5; margin-bottom: 8px;
}
.brand > p { font-size: 15px; color: rgba(255,255,255,0.45); }
.features-list { display: flex; flex-direction: column; gap: 28px; }
.feat-item { display: flex; align-items: flex-start; gap: 18px; }
.feat-icon {
  width: 44px; height: 44px; flex-shrink: 0;
  background: rgba(66,165,245,0.1); border: 1px solid rgba(66,165,245,0.2);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: #42a5f5; font-size: 18px;
}
.feat-item h4 { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.feat-item p { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.5; }

/* RIGHT PANEL */
.auth-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  background: #0b1c2c;
}
.auth-box { width: 100%; max-width: 420px; }

.admin-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25);
  color: #f87171; font-size: 13px; font-weight: 700;
  padding: 7px 16px; border-radius: 20px;
  margin-bottom: 28px; letter-spacing: 0.3px;
}

.form-header { margin-bottom: 32px; }
.form-header h2 { font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 6px; }
.form-header p { font-size: 14px; color: rgba(255,255,255,0.45); }

.form-group { margin-bottom: 20px; }
.form-group label {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.65); margin-bottom: 8px;
}
.input-wrap {
  position: relative; display: flex; align-items: center;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; transition: all 0.25s;
}
.input-wrap.focused { border-color: #42a5f5; background: rgba(66,165,245,0.05); box-shadow: 0 0 0 3px rgba(66,165,245,0.1); }
.input-wrap.error { border-color: #ef4444; background: rgba(239,68,68,0.04); }
.input-wrap > i:first-child { position: absolute; left: 15px; color: rgba(255,255,255,0.25); font-size: 14px; pointer-events: none; }
.input-wrap input {
  width: 100%; padding: 14px 44px 14px 42px;
  background: none; border: none; color: #fff;
  font-size: 14.5px; font-family: inherit; outline: none;
}
.input-wrap input::placeholder { color: rgba(255,255,255,0.2); }
.eye-btn { position: absolute; right: 14px; background: none; border: none; color: rgba(255,255,255,0.25); cursor: pointer; font-size: 14px; padding: 6px; transition: color 0.2s; }
.eye-btn:hover { color: rgba(255,255,255,0.6); }
.err-msg { display: block; font-size: 12px; color: #fca5a5; margin-top: 6px; }

.server-error {
  display: flex; align-items: center; gap: 8px;
  background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);
  border-radius: 10px; padding: 12px 16px; color: #fca5a5; font-size: 13px; margin-bottom: 20px;
}

.submit-btn {
  width: 100%; padding: 15px;
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  border: none; border-radius: 12px; color: #fff;
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 0.3s; font-family: inherit; margin-bottom: 20px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(239,68,68,0.35); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.loader-wrap { display: flex; align-items: center; gap: 10px; }
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

.back-link {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  color: rgba(255,255,255,0.4); text-decoration: none;
  font-size: 13.5px; font-weight: 500; transition: color 0.25s;
}
.back-link:hover { color: #42a5f5; }

@media (max-width: 900px) {
  .auth-left { display: none; }
  .auth-right { padding: 40px 24px; }
}
</style>
