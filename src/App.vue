<template>
  <div id="app" :data-theme="themeStore.theme">

    <!-- ===== NAVBAR ===== -->
    <nav v-if="showLayout" class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="nav-container">
        <router-link to="/" class="logo" @click="closeMenu">
          <img src="./assets/ancs-logo.png" alt="ANCS Logo">
          <span>ANCS</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/features">Features</router-link>
          <router-link to="/ai-bot">AI Bot</router-link>
          <router-link to="/team">Team</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
        <div class="nav-actions">
          <button class="btn-theme" @click="themeStore.toggle()" :title="themeStore.isDark ? 'Light Mode' : 'Dark Mode'">
            <i :class="themeStore.isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
          <template v-if="!isLoggedIn">
            <button class="btn-login" @click="openAuth('login')">Login</button>
            <button class="btn-signup" @click="openAuth('signup')">Sign Up</button>
            <router-link to="/login" class="btn-admin-login" title="Admin Login">
              <i class="fas fa-shield-alt"></i> Admin
            </router-link>
            <router-link to="/download" class="btn-download">
              <i class="fas fa-download"></i> Download
            </router-link>
          </template>
          <template v-else>
            <template v-if="authStore.isAdmin">
              <router-link to="/dashboard" class="btn-dashboard">
                <i class="fas fa-tachometer-alt"></i> Dashboard
              </router-link>
            </template>
            <template v-else>
              <div class="user-avatar-nav" :title="authStore.username">
                {{ authStore.username?.charAt(0)?.toUpperCase() }}
              </div>
            </template>
            <router-link to="/download" class="btn-download">
              <i class="fas fa-download"></i> Download
            </router-link>
            <button class="btn-logout" @click="logout">Logout</button>
          </template>
        </div>
        <button class="mobile-toggle" @click="toggleMenu" :class="{ 'active': isMenuOpen }" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" :class="{ 'open': isMenuOpen }">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link to="/about" @click="closeMenu">About</router-link>
        <router-link to="/features" @click="closeMenu">Features</router-link>
        <router-link to="/ai-bot" @click="closeMenu">AI Bot</router-link>
        <router-link to="/team" @click="closeMenu">Team</router-link>
        <router-link to="/contact" @click="closeMenu">Contact</router-link>
        <div class="mobile-actions">
          <button class="mobile-theme-btn" @click="themeStore.toggle()">
            <i :class="themeStore.isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
            {{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}
          </button>
          <template v-if="!isLoggedIn">
            <button @click="openAuth('login'); closeMenu()">Login</button>
            <button @click="openAuth('signup'); closeMenu()">Sign Up</button>
            <router-link to="/login" class="mobile-admin-btn" @click="closeMenu">
              <i class="fas fa-shield-alt"></i> Admin Login
            </router-link>
          </template>
          <template v-else>
            <template v-if="authStore.isAdmin">
              <router-link to="/dashboard" @click="closeMenu">Dashboard</router-link>
            </template>
            <template v-else>
              <div class="mobile-user-info">
                <div class="mobile-avatar">{{ authStore.username?.charAt(0)?.toUpperCase() }}</div>
                <span>{{ authStore.username }}</span>
              </div>
            </template>
            <button @click="logout; closeMenu()">Logout</button>
          </template>
          <router-link to="/download" class="mobile-download" @click="closeMenu">Download</router-link>
        </div>
      </div>
    </nav>

    <!-- ===== AUTH MODAL ===== -->
    <Transition name="modal-fade">
      <div v-if="showLayout && showAuthModal" class="modal-overlay" @click.self="closeAuth">
        <div class="auth-modal">
          <button class="close-btn" @click="closeAuth"><i class="fas fa-times"></i></button>
          <div class="modal-tabs">
            <button :class="{ active: isLogin }"  @click="switchTab(true)">Login</button>
            <button :class="{ active: !isLogin }" @click="switchTab(false)">Sign Up</button>
          </div>

          <!-- LOGIN -->
          <div v-if="isLogin" class="modal-form">
            <div class="form-header">
              <h2>Welcome Back</h2>
              <p>Access your network automation tools</p>
            </div>
            <div class="google-wrap">
              <div v-if="googleLoading" class="google-loading">
                <i class="fas fa-spinner fa-spin"></i> Signing in with Google...
              </div>
              <button v-else class="google-btn" @click="startGoogleLogin" type="button">
                <svg class="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
            <div class="auth-divider"><span>or continue with username</span></div>
            <div class="form-group">
              <label>Username</label>
              <div class="input-wrap">
                <i class="fas fa-user"></i>
                <input type="text" v-model="loginData.username" placeholder="Enter your username" @keyup.enter="handleLogin" required>
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="input-wrap">
                <i class="fas fa-lock"></i>
                <input :type="showPassword ? 'text' : 'password'" v-model="loginData.password" placeholder="Enter your password" @keyup.enter="handleLogin" required>
                <button class="toggle-pass" @click="showPassword = !showPassword" type="button">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
            <div v-if="authStatus" class="status-msg" :class="authStatus.type">
              <i :class="authStatus.type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'"></i>
              {{ authStatus.message }}
            </div>
            <button class="submit-btn" @click="handleLogin" :disabled="isLoading">
              <span v-if="!isLoading">Login</span>
              <span v-else><i class="fas fa-spinner fa-spin"></i> Logging in...</span>
            </button>
            <p class="switch-text">Don't have an account? <button @click="switchTab(false)">Sign Up</button></p>
          </div>

          <!-- SIGNUP -->
          <div v-else class="modal-form">
            <div class="form-header">
              <h2>Create Account</h2>
              <p>Start your automation journey with ANCS</p>
            </div>
            <div class="google-wrap">
              <div v-if="googleLoading" class="google-loading">
                <i class="fas fa-spinner fa-spin"></i> Signing in with Google...
              </div>
              <button v-else class="google-btn" @click="startGoogleLogin" type="button">
                <svg class="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
            <div class="auth-divider"><span>or sign up with email</span></div>
            <div class="form-group">
              <label>Full Name</label>
              <div class="input-wrap">
                <i class="fas fa-user"></i>
                <input type="text" v-model="signupData.name" placeholder="Your full name" required>
              </div>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <div class="input-wrap">
                <i class="fas fa-envelope"></i>
                <input type="email" v-model="signupData.email" placeholder="your@email.com" required>
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="input-wrap">
                <i class="fas fa-lock"></i>
                <input :type="showPassword ? 'text' : 'password'" v-model="signupData.password" placeholder="Create a strong password" required>
                <button class="toggle-pass" @click="showPassword = !showPassword" type="button">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
            <div v-if="authStatus" class="status-msg" :class="authStatus.type">
              <i :class="authStatus.type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'"></i>
              {{ authStatus.message }}
            </div>
            <button class="submit-btn signup" @click="handleSignup" :disabled="isLoading">
              <span v-if="!isLoading">Join Now</span>
              <span v-else><i class="fas fa-spinner fa-spin"></i> Creating account...</span>
            </button>
            <p class="switch-text">Already have an account? <button @click="switchTab(true)">Login</button></p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===== PAGE CONTENT ===== -->
    <main class="page-content" :class="{ 'with-navbar': showLayout }">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" :key="$route.fullPath" @open-auth="openAuth" />
        </transition>
      </router-view>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer v-if="showLayout" class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <img src="./assets/ancs-logo.png" alt="ANCS Logo">
          <span>ANCS</span>
          <p>Automated Network Configuration System — automating the future of networking.</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4>Product</h4>
            <router-link to="/features">Features</router-link>
            <router-link to="/download">Download</router-link>
            <router-link to="/about">About</router-link>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <router-link to="/team">Team</router-link>
            <router-link to="/contact">Contact</router-link>
          </div>
          <div class="footer-col">
            <h4>Connect</h4>
            <a href="https://github.com/MohamedBendari" target="_blank"><i class="fab fa-github"></i> GitHub</a>
            <a href="mailto:mohamedsharkawy078@gmail.com"><i class="fas fa-envelope"></i> Email</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 ANCS. All rights reserved. Built with <i class="fas fa-heart"></i> by the ANCS Team.</p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'

const router     = useRouter()
const route      = useRoute()
const authStore  = useAuthStore()
const themeStore = useThemeStore()

const showLayout   = computed(() => !route.meta.hideLayout)
const isMenuOpen   = ref(false)
const isScrolled   = ref(false)
const toggleMenu   = () => { isMenuOpen.value = !isMenuOpen.value }
const closeMenu    = () => { isMenuOpen.value = false }
const handleScroll = () => { isScrolled.value = window.scrollY > 50 }

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  themeStore.applyTheme()
  loadGoogleSDK()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const isLoggedIn    = computed(() => authStore.isLoggedIn)
const showAuthModal = ref(false)
const isLogin       = ref(true)
const showPassword  = ref(false)
const isLoading     = ref(false)
const googleLoading = ref(false)
const authStatus    = ref(null)
const loginData     = ref({ username: '', password: '' })
const signupData    = ref({ name: '', email: '', password: '' })

// ══ Google OAuth ═══════════════════════════════════════════════
// نفس الـ Client ID الموجود في settings.py بالضبط
const GOOGLE_CLIENT_ID = '173099252661-1gipjpmpmtqkt70c45pdcuco8shsg2vu.apps.googleusercontent.com'

function loadGoogleSDK() {
  if (window.google?.accounts?.id) { initGoogleSDK(); return }
  if (!document.getElementById('google-gsi-script')) {
    const script  = document.createElement('script')
    script.id     = 'google-gsi-script'
    script.src    = 'https://accounts.google.com/gsi/client'
    script.async  = true
    script.defer  = true
    script.onload = initGoogleSDK
    document.head.appendChild(script)
  }
}

function initGoogleSDK() {
  if (!window.google?.accounts?.id) return
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    // handleGoogleCredential هيتكال تلقائياً من Google بعد اختيار الحساب
    // response.credential = ID Token جاهز يتبعت للـ Backend كـ { token: "..." }
    callback: handleGoogleCredential,
    auto_select: false,
    cancel_on_tap_outside: true,
  })
}

function startGoogleLogin() {
  if (!window.google?.accounts?.id) {
    authStatus.value = { type: 'error', message: 'Google is loading, please try again.' }
    return
  }
  // prompt() بيفتح Google popup
  // لما اليوزر يختار حسابه → Google يكال handleGoogleCredential تلقائياً
  window.google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      authStatus.value = {
        type: 'error',
        message: 'Google popup was blocked. Please allow popups for this site.'
      }
    }
  })
}

// Google بيكال الـ function دي تلقائياً — response.credential هو الـ ID Token
async function handleGoogleCredential(response) {
  googleLoading.value = true
  authStatus.value    = null
  try {
    // بنبعت { token: "eyJ..." } — بالظبط زي ما الـ Backend بيستقبل في google_login view
    const res = await fetch('https://ancs-website-backend-production.up.railway.app/api/auth/google/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ token: response.credential }),
    })
    const data = await res.json()

    if (!res.ok) throw new Error(data.error || 'Google login failed')

    // data.access = JWT | data.username = اسم اليوزر | data.role = "user"
    authStore.loginSuccess(data.access, data.username, data.role)
    closeAuth()
    // اليوزر يفضل على نفس الصفحة
  } catch (err) {
    authStatus.value = { type: 'error', message: err.message || 'Google login failed. Please try again.' }
  } finally {
    googleLoading.value = false
  }
}

// ══ Modal Controls ═════════════════════════════════════════════
const openAuth = (type) => {
  isLogin.value       = type === 'login'
  showAuthModal.value = true
  document.body.style.overflow = 'hidden'
  resetStatus()
}
const closeAuth = () => {
  showAuthModal.value = false
  document.body.style.overflow = 'auto'
  showPassword.value  = false
  resetStatus()
}
const switchTab   = (toLogin) => { isLogin.value = toLogin; showPassword.value = false; resetStatus() }
const resetStatus = () => { authStatus.value = null }

// ══ Normal Login ═══════════════════════════════════════════════
const handleLogin = async () => {
  if (!loginData.value.username || !loginData.value.password) {
    authStatus.value = { type: 'error', message: 'Please fill in all fields.' }
    return
  }
  isLoading.value = true
  resetStatus()
  try {
    const res = await fetch('https://ancs-website-backend-production.up.railway.app/api/login/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginData.value.username.trim(), password: loginData.value.password.trim() })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || data.detail || 'Invalid credentials')
    authStore.loginSuccess(data.access, data.username, data.role)
    closeAuth()
    if (data.role === 'admin') router.push('/dashboard')
  } catch (err) {
    authStatus.value = { type: 'error', message: err.message || 'Login failed.' }
  } finally { isLoading.value = false }
}

// ══ Signup ═════════════════════════════════════════════════════
const handleSignup = async () => {
  if (!signupData.value.name || !signupData.value.email || !signupData.value.password) {
    authStatus.value = { type: 'error', message: 'Please fill in all fields.' }
    return
  }
  isLoading.value = true
  resetStatus()
  try {
    const res = await fetch('https://ancs-website-backend-production.up.railway.app/api/register/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: signupData.value.name.trim(), email: signupData.value.email.trim(), password: signupData.value.password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.username?.[0] || data.email?.[0] || 'Signup failed')
    authStatus.value = { type: 'success', message: 'Account created! Please login.' }
    setTimeout(() => { switchTab(true) }, 1500)
  } catch (err) {
    authStatus.value = { type: 'error', message: err.message || 'Signup failed.' }
  } finally { isLoading.value = false }
}

const logout = () => { authStore.logout(); router.push('/') }
</script>

<style>
:root, [data-theme="dark"] {
  --nav-bg: rgba(11,28,44,0.7); --nav-bg-scroll: rgba(11,28,44,0.97);
  --body-bg: #0b1c2c; --text-primary: #e8edf2; --text-muted: rgba(255,255,255,0.6);
  --border-color: rgba(255,255,255,0.07); --card-bg: rgba(255,255,255,0.04);
  --footer-bg: #060f18; --modal-bg: linear-gradient(145deg, #16293d, #0f1f30);
  --input-bg: rgba(255,255,255,0.05); --input-border: rgba(255,255,255,0.1);
  --input-color: #fff; --placeholder: rgba(255,255,255,0.25);
}
[data-theme="light"] {
  --nav-bg: rgba(255,255,255,0.85); --nav-bg-scroll: rgba(255,255,255,0.98);
  --body-bg: #f0f5fa; --text-primary: #1a2537; --text-muted: #4a5568;
  --border-color: rgba(0,0,0,0.09); --card-bg: #ffffff; --footer-bg: #1a2537;
  --modal-bg: linear-gradient(145deg, #ffffff, #f0f5fa); --input-bg: rgba(0,0,0,0.04);
  --input-border: rgba(0,0,0,0.12); --input-color: #1a2537; --placeholder: rgba(0,0,0,0.3);
}
body { background: var(--body-bg); color: var(--text-primary); transition: background 0.3s ease, color 0.3s ease; }
.navbar { width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; background: var(--nav-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); transition: all 0.4s ease; }
.navbar.scrolled { background: var(--nav-bg-scroll); box-shadow: 0 4px 30px rgba(0,0,0,0.15); border-bottom-color: rgba(66,165,245,0.2); }
.nav-container { max-width: 1400px; margin: 0 auto; height: 72px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
.logo img { width: 38px; height: 38px; border-radius: 10px; object-fit: contain; }
.logo span { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; background: linear-gradient(135deg, #42a5f5, #0096c7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14.5px; font-weight: 500; padding: 6px 14px; border-radius: 8px; transition: all 0.25s ease; }
.nav-links a:hover { color: var(--text-primary); background: rgba(66,165,245,0.12); }
.nav-links a.router-link-exact-active { color: #42a5f5; background: rgba(66,165,245,0.1); }
.nav-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.btn-theme { width: 36px; height: 36px; border-radius: 10px; background: var(--input-bg); border: 1px solid var(--border-color); color: var(--text-muted); font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.25s; flex-shrink: 0; }
.btn-theme:hover { background: rgba(66,165,245,0.15); color: #42a5f5; border-color: #42a5f5; }
.btn-login { background: none; border: none; color: var(--text-muted); font-size: 14px; font-weight: 500; cursor: pointer; padding: 8px 16px; border-radius: 8px; transition: all 0.25s; font-family: inherit; }
.btn-login:hover { color: var(--text-primary); background: var(--input-bg); }
.btn-signup { background: rgba(66,165,245,0.1); border: 1px solid rgba(66,165,245,0.4); color: #42a5f5; font-size: 14px; font-weight: 600; cursor: pointer; padding: 8px 18px; border-radius: 8px; transition: all 0.25s; font-family: inherit; }
.btn-signup:hover { background: #42a5f5; color: #fff; }
.btn-admin-login { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); color: #f87171; text-decoration: none; font-size: 13px; font-weight: 600; padding: 7px 14px; border-radius: 8px; transition: all 0.25s; display: flex; align-items: center; gap: 6px; }
.btn-admin-login:hover { background: #ef4444; color: #fff; border-color: #ef4444; }
.btn-download { background: linear-gradient(135deg, #0077b6, #0096c7); color: #fff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 9px 20px; border-radius: 8px; transition: all 0.3s; display: flex; align-items: center; gap: 7px; }
.btn-download:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,119,182,0.4); }
.btn-dashboard { background: rgba(66,165,245,0.1); border: 1px solid rgba(66,165,245,0.3); color: #42a5f5; text-decoration: none; font-size: 14px; font-weight: 600; padding: 8px 16px; border-radius: 8px; transition: all 0.25s; display: flex; align-items: center; gap: 7px; }
.btn-dashboard:hover { background: #42a5f5; color: #fff; }
.btn-logout { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; font-size: 14px; font-weight: 500; cursor: pointer; padding: 8px 16px; border-radius: 8px; transition: all 0.25s; font-family: inherit; }
.btn-logout:hover { background: #ef4444; color: #fff; }
.user-avatar-nav { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #42a5f5, #0077b6); color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; cursor: default; border: 2px solid rgba(66,165,245,0.4); flex-shrink: 0; }
.mobile-user-info { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; background: rgba(66,165,245,0.08); border: 1px solid rgba(66,165,245,0.15); }
.mobile-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #42a5f5, #0077b6); color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.mobile-user-info span { font-size: 15px; color: #fff; font-weight: 500; }
.mobile-toggle { display: none; flex-direction: column; justify-content: center; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; width: 38px; height: 38px; }
.mobile-toggle span { width: 22px; height: 2px; background: var(--text-muted); border-radius: 2px; transition: all 0.3s ease; transform-origin: center; }
.mobile-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.mobile-toggle.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.mobile-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
.mobile-menu { display: none; position: absolute; top: 100%; left: 0; width: 100%; flex-direction: column; padding: 16px 24px 24px; gap: 4px; border-top: 1px solid var(--border-color); background: var(--nav-bg-scroll); transform: translateY(-10px); opacity: 0; pointer-events: none; transition: all 0.3s ease; }
.mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: all; }
.mobile-menu a { color: var(--text-muted); text-decoration: none; font-size: 16px; font-weight: 500; padding: 12px 16px; border-radius: 10px; transition: all 0.2s; }
.mobile-menu a:hover, .mobile-menu a.router-link-active { color: var(--text-primary); background: rgba(66,165,245,0.1); }
.mobile-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; padding-top: 16px; border-top: 1px solid var(--border-color); }
.mobile-actions button { background: var(--input-bg); border: 1px solid var(--border-color); color: var(--text-primary); font-size: 15px; font-weight: 500; padding: 12px; border-radius: 10px; cursor: pointer; font-family: inherit; transition: all 0.25s; }
.mobile-actions button:hover { background: rgba(66,165,245,0.15); border-color: #42a5f5; color: #42a5f5; }
.mobile-theme-btn { display: flex !important; align-items: center; gap: 10px; }
.mobile-admin-btn { background: rgba(239,68,68,0.08) !important; border: 1px solid rgba(239,68,68,0.2) !important; color: #f87171 !important; text-decoration: none; font-size: 15px; font-weight: 600; padding: 12px 16px !important; border-radius: 10px; display: flex; align-items: center; gap: 8px; transition: all 0.25s; }
.mobile-download { background: linear-gradient(135deg, #0077b6, #0096c7) !important; color: #fff !important; text-align: center; padding: 12px !important; border-radius: 10px; font-weight: 600 !important; text-decoration: none; display: block; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
.auth-modal { background: var(--modal-bg); width: 100%; max-width: 440px; border-radius: 28px; padding: 40px; position: relative; border: 1px solid rgba(66,165,245,0.15); box-shadow: 0 25px 60px rgba(0,0,0,0.4); max-height: 90vh; overflow-y: auto; }
.close-btn { position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-muted); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.close-btn:hover { background: rgba(239,68,68,0.2); border-color: #ef4444; color: #ef4444; }
.modal-tabs { display: flex; background: var(--input-bg); border-radius: 14px; padding: 5px; margin-bottom: 28px; border: 1px solid var(--border-color); }
.modal-tabs button { flex: 1; padding: 11px; border: none; background: none; color: var(--text-muted); font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 10px; transition: all 0.25s; font-family: inherit; }
.modal-tabs button.active { background: #42a5f5; color: #fff; }
.form-header { margin-bottom: 20px; }
.form-header h2 { font-size: 26px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
.form-header p { font-size: 14px; color: var(--text-muted); }
.google-wrap { margin-bottom: 8px; }
.google-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 13px 20px; background: #fff; border: 1.5px solid #dadce0; border-radius: 12px; font-size: 15px; font-weight: 600; color: #3c4043; cursor: pointer; font-family: inherit; transition: all 0.25s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.12); }
.google-btn:hover { background: #f8f9fa; border-color: #c6c6c6; box-shadow: 0 3px 12px rgba(0,0,0,0.18); transform: translateY(-1px); }
.google-btn:active { transform: translateY(0); box-shadow: 0 1px 4px rgba(0,0,0,0.12); }
.google-icon { width: 20px; height: 20px; flex-shrink: 0; }
.google-loading { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 13px; color: var(--text-muted); font-size: 14px; background: var(--input-bg); border-radius: 12px; border: 1px solid var(--border-color); }
.auth-divider { display: flex; align-items: center; gap: 12px; margin: 16px 0; }
.auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: var(--border-color); }
.auth-divider span { font-size: 12px; color: var(--text-muted); white-space: nowrap; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; }
.input-wrap { position: relative; display: flex; align-items: center; }
.input-wrap > i:first-child { position: absolute; left: 15px; color: var(--text-muted); font-size: 14px; pointer-events: none; opacity: 0.5; }
.input-wrap input { width: 100%; padding: 13px 44px 13px 40px; background: var(--input-bg); border: 1px solid var(--input-border); border-radius: 12px; color: var(--input-color); font-size: 14.5px; transition: all 0.25s; font-family: inherit; }
.input-wrap input::placeholder { color: var(--placeholder); }
.input-wrap input:focus { outline: none; border-color: #42a5f5; box-shadow: 0 0 0 3px rgba(66,165,245,0.12); }
.toggle-pass { position: absolute; right: 14px; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px; padding: 4px; opacity: 0.5; }
.toggle-pass:hover { opacity: 1; }
.status-msg { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 12px 16px; border-radius: 10px; margin-bottom: 14px; }
.status-msg.error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #fca5a5; }
.status-msg.success { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); color: #86efac; }
.submit-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #42a5f5, #0077b6); border: none; border-radius: 12px; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s; font-family: inherit; margin-bottom: 18px; }
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,119,182,0.4); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.submit-btn.signup { background: linear-gradient(135deg, #0077b6, #005f8f); }
.switch-text { text-align: center; font-size: 13px; color: var(--text-muted); }
.switch-text button { background: none; border: none; color: #42a5f5; cursor: pointer; font-weight: 600; font-size: 13px; font-family: inherit; margin-left: 4px; }
.footer { background: var(--footer-bg); border-top: 1px solid var(--border-color); padding: 60px 40px 0; margin-top: auto; }
.footer-container { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; gap: 60px; flex-wrap: wrap; padding-bottom: 50px; }
.footer-brand { display: flex; flex-direction: column; gap: 10px; max-width: 260px; }
.footer-brand img { width: 42px; border-radius: 10px; }
.footer-brand span { font-size: 22px; font-weight: 800; color: #42a5f5; }
.footer-brand p { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.6; }
.footer-links { display: flex; gap: 60px; flex-wrap: wrap; }
.footer-col { display: flex; flex-direction: column; gap: 12px; }
.footer-col h4 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
.footer-col a { color: rgba(255,255,255,0.65); text-decoration: none; font-size: 14px; transition: color 0.25s; display: flex; align-items: center; gap: 8px; }
.footer-col a:hover { color: #42a5f5; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding: 20px 0; text-align: center; max-width: 1400px; margin: 0 auto; }
.footer-bottom p { font-size: 13px; color: rgba(255,255,255,0.3); }
.footer-bottom .fa-heart { color: #ef4444; font-size: 11px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; transform: scale(0.96); }
@media (max-width: 900px) { .nav-links, .nav-actions { display: none; } .mobile-toggle { display: flex; } .mobile-menu { display: flex; } }
.page-content { width: 100%; flex: 1 1 auto; }
.page-content.with-navbar { padding-top: 72px; }
@media (max-width: 600px) { .nav-container { padding: 0 20px; } .auth-modal { padding: 28px 20px; border-radius: 20px; } .footer { padding: 40px 24px 0; } .footer-container { flex-direction: column; gap: 32px; } .footer-links { gap: 32px; } }
</style>
