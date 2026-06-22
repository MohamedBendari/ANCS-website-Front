<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
const emit = defineEmits(['open-auth'])
const openAuth = (type) => emit('open-auth', type)
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)
</script>

<template>
  <section class="download">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Get Started</span>
        <h1>Download ANCS</h1>
        <p>Choose your platform and start automating your network configuration today</p>
      </div>
      <div class="download-content">
        <!-- Main Download Card -->
        <div class="main-download">
          <div class="download-card featured">
            <div class="card-badge">Latest Release</div>
            <div class="platform-icon">
              <i class="fas fa-laptop-code"></i>
            </div>
            <h2>ANCS v1.0.0</h2>
            <p class="version-info">Stable Release • Released March 2026</p>
            <div class="system-requirements">
              <h4>System Requirements:</h4>
              <ul>
                <li><i class="fas fa-check"></i> Windows 10/11 or Linux Ubuntu 20.04+</li>
                <li><i class="fas fa-check"></i> 4GB RAM minimum (8GB recommended)</li>
                <li><i class="fas fa-check"></i> Python 3.8+ & Node.js 18+</li>
                <li><i class="fas fa-check"></i> GNS3 (optional but recommended)</li>
              </ul>
            </div>
            <div class="download-buttons">
              <!-- لو مش logged in — يطلب login -->
              <div v-if="!isLoggedIn" class="login-gate">
                <div class="gate-icon"><i class="fas fa-lock"></i></div>
                <p>You need to be logged in to download ANCS</p>
                <button @click="openAuth('login')" class="btn primary gate-btn">
                  <i class="fas fa-sign-in-alt"></i> Login to Download
                </button>
                <button @click="openAuth('signup')" class="btn secondary gate-btn">
                  <i class="fas fa-user-plus"></i> Create Account
                </button>
              </div>
              <!-- لو logged in — يظهر أزرار التحميل -->
              <template v-else>
                <a href="https://raw.githubusercontent.com/MOHAmED3467/ANCS-website/main/public/ANCS.exe" class="btn primary" download>
                  <i class="fab fa-windows"></i>
                  Download for Windows
                </a>
                <a href="#" class="btn secondary">
                  <i class="fab fa-linux"></i>
                  Download for Linux
                </a>
              </template>
            </div>
          </div>
        </div>
        <!-- Alternative Downloads -->
        <div class="alt-downloads">
          <h3>Other Download Options</h3>
          <div class="alt-grid">
            <a href="https://github.com/MOHAmED3467/ANCS-website" target="_blank" class="alt-card">
              <div class="alt-icon">
                <i class="fab fa-github"></i>
              </div>
              <div class="alt-info">
                <h4>Source Code</h4>
                <p>Clone from GitHub repository</p>
              </div>
              <i class="fas fa-arrow-right"></i>
            </a>
            <div class="alt-card">
              <div class="alt-icon docker">
                <i class="fab fa-docker"></i>
              </div>
              <div class="alt-info">
                <h4>Docker Image</h4>
                <p>Coming Soon</p>
              </div>
              <span class="badge">Soon</span>
            </div>
            <div class="alt-card">
              <div class="alt-icon docs">
                <i class="fas fa-book"></i>
              </div>
              <div class="alt-info">
                <h4>Documentation</h4>
                <p>Setup guide & API reference</p>
              </div>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
        <!-- Installation Steps -->
        <div class="installation-guide">
          <h3>Quick Installation Guide</h3>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Download</h4>
                <p>Download the installer for your operating system</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Install Dependencies</h4>
                <p>Run <code>pip install -r requirements.txt</code> and <code>npm install</code></p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Configure</h4>
                <p>Edit config.json with your network settings</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Launch</h4>
                <p>Run <code>npm run dev</code> to start the application</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Support -->
        <div class="support-section">
          <div class="support-card">
            <i class="fas fa-headset"></i>
            <h3>Need Help?</h3>
            <p>If you encounter any issues during installation or usage, our team is here to help.</p>
            <router-link to="/contact" class="btn outline">
              Contact Support
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.download {
  min-height: 100vh;
  padding: 120px 20px 80px;
  background: transparent;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
}
.section-header {
  text-align: center;
  margin-bottom: 60px;
}
.subtitle {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(66, 165, 245, 0.1);
  border: 1px solid rgba(66, 165, 245, 0.3);
  border-radius: 50px;
  color: #42a5f5;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.section-header h1 {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  color: var(--text-primary);
}
.section-header p {
  font-size: 20px;
  color: var(--text-muted);
}
.download-content {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
/* Main Download Card */
.main-download {
  display: flex;
  justify-content: center;
}
.download-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 50px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  transition: all 0.4s ease;
}
.download-card:hover {
  background: var(--card-bg);
  border-color: rgba(66, 165, 245, 0.2);
  transform: translateY(-5px);
}
.card-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px 16px;
  background: linear-gradient(135deg, #4caf50, #388e3c);
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
}
.platform-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #42a5f5, #0077b6);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 40px;
  color: var(--text-primary);
  box-shadow: 0 15px 40px rgba(66, 165, 245, 0.3);
}
.download-card h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-primary);
}
.version-info {
  color: var(--text-secondary);
  font-size: 15px;
  margin-bottom: 30px;
}
.system-requirements {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 30px;
  text-align: left;
}
.system-requirements h4 {
  font-size: 16px;
  margin-bottom: 15px;
  color: var(--text-primary);
}
.system-requirements ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.system-requirements li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-muted);
}
.system-requirements li i {
  color: #4caf50;
  font-size: 12px;
}
.download-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.login-gate {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 30px 20px;
  background: rgba(66,165,245,0.05);
  border: 1px solid rgba(66,165,245,0.15);
  border-radius: 16px;
  text-align: center;
}
.gate-icon {
  width: 60px;
  height: 60px;
  background: rgba(66,165,245,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #42a5f5;
}
.login-gate p {
  color: var(--text-muted);
  font-size: 15px;
  margin: 0;
}
.gate-btn {
  width: 100%;
  justify-content: center;
}
.btn {
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}
.btn.primary {
  background: linear-gradient(135deg, #0077b6, #0096c7);
  color: var(--text-primary);
  box-shadow: 0 4px 15px rgba(0, 119, 182, 0.4);
}
.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 119, 182, 0.5);
}
.btn.secondary {
  background: rgba(192, 174, 174, 0.1);
  color: var(--text-secondary);
  border: 2px solid rgba(255, 255, 255, 0.2);
}
.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(228, 210, 210, 0.4);
}
.btn.outline {
  background: transparent;
  color: #42a5f5;
  border: 2px solid #42a5f5;
}
.btn.outline:hover {
  background: rgba(66, 165, 245, 0.1);
}
/* Alternative Downloads */
.alt-downloads h3 {
  font-size: 24px;
  margin-bottom: 25px;
  color: var(--text-primary);
  text-align: center;
}
.alt-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.alt-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
}
.alt-card:hover {
  background: var(--card-bg-hover);
  border-color: rgba(66, 165, 245, 0.2);
  transform: translateY(-3px);
}
.alt-icon {
  width: 50px;
  height: 50px;
  background: rgba(66, 165, 245, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #42a5f5;
  flex-shrink: 0;
}
.alt-icon.docker {
  color: #2496ed;
  background: rgba(36, 150, 237, 0.1);
}
.alt-icon.docs {
  color: #ff9800;
  background: rgba(255, 152, 0, 0.1);
}
.alt-info {
  flex: 1;
}
.alt-info h4 {
  font-size: 16px;
  margin-bottom: 5px;
}
.alt-info p {
  font-size: 13px;
  color: var(--text-secondary);
}
.alt-card > i {
  color: #42a5f5;
  font-size: 14px;
}
.badge {
  padding: 4px 12px;
  background: rgba(255, 152, 0, 0.2);
  border: 1px solid rgba(255, 152, 0, 0.3);
  border-radius: 50px;
  font-size: 12px;
  color: #ff9800;
}
/* Installation Guide */
.installation-guide h3 {
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--text-primary);
  text-align: center;
}
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.step {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  transition: all 0.3s ease;
}
.step:hover {
  background: var(--card-bg-hover);
  transform: translateY(-5px);
}
.step-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #42a5f5, #0077b6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 auto 20px;
}
.step-content h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--text-primary);
}
.step-content p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}
.step-content code {
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #4caf50;
}
/* Support Section */
.support-section {
  display: flex;
  justify-content: center;
}
.support-card {
  background: linear-gradient(135deg, rgba(66, 165, 245, 0.1), rgba(0, 119, 182, 0.1));
  border: 1px solid rgba(66, 165, 245, 0.2);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
}
.support-card > i {
  font-size: 48px;
  color: #42a5f5;
  margin-bottom: 20px;
}
.support-card h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-primary);
}
.support-card p {
  font-size: 15px;
  color: var(--text-muted);
  margin-bottom: 25px;
}
/* Responsive */
@media (max-width: 968px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
  .alt-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .section-header h1 {
    font-size: 36px;
  }
  .download-card {
    padding: 30px 20px;
  }
  .steps {
    grid-template-columns: 1fr;
  }
  .download-buttons .btn {
    font-size: 14px;
  }
}
</style>
