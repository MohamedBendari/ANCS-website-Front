<script setup>
import { ref } from 'vue'
import preview from "../assets/ancs-app.png"
const emit = defineEmits(['open-auth'])
const openAuth = (type) => emit('open-auth', type)
</script>
⋮----
<template>
  <section class="hero">
    <div class="hero-content">
      <img src="../assets/ancs-logo.png" class="hero-logo">
      <h1>ANCS</h1>
      <h3>Automated Network Configuration System</h3>
      <p>
        A modern platform that helps network engineers automate
        router and switch configuration using intelligent tools.
      </p>
      <div class="buttons">
        <router-link to="/download" class="btn primary">Download</router-link>
        <router-link to="/team" class="btn secondary">Meet Our Team</router-link>
        <router-link to="/about" class="btn ghost">Learn More</router-link>
      </div>
    </div>
  </section>
  <section class="stats">
    <div class="stats-grid">
      <div class="stat-card"><h2>10x</h2><p>Faster Configuration</p></div>
      <div class="stat-card"><h2>AI</h2><p>Powered Analysis</p></div>
      <div class="stat-card"><h2>24/7</h2><p>Automation</p></div>
    </div>
  </section>
  <section class="platforms">
    <h2>Works With</h2>
    <div class="platform-grid">
      <div class="platform">🪟 Windows</div>
      <div class="platform">🐧 Linux</div>
      <div class="platform">🌐 Cisco</div>
      <div class="platform">⚙️ GNS3</div>
      <div class="platform">🔐 SSH</div>
      <div class="platform">📡 Telnet</div>
    </div>
  </section>
  <section class="tech">
    <h2>Built With Modern Technologies</h2>
    <div class="tech-icons">
      <div class="tech-card">Python</div>
      <div class="tech-card">Vue.js</div>
      <div class="tech-card">Netmiko</div>
      <div class="tech-card">Machine Learning</div>
      <div class="tech-card">PostgreSQL</div>
    </div>
  </section>
  <section class="overview">
    <div class="container">
      <h2>What is ANCS?</h2>
      <p>
        ANCS is a network automation platform designed to simplify
        configuration management for routers and switches.
        Engineers can generate configurations automatically,
        detect errors before deployment, and manage multiple
        network devices from one centralized interface.
      </p>
    </div>
  </section>
  <section class="advantages">
    <h2>Why Engineers Use ANCS</h2>
    <div class="adv-grid">
      <div class="adv-card"><h3>Automation</h3><p>Automate repetitive network configuration tasks.</p></div>
      <div class="adv-card"><h3>AI Analysis</h3><p>Machine learning detects abnormal network behaviour.</p></div>
      <div class="adv-card"><h3>Secure</h3><p>Encrypted credentials and safe SSH/Telnet execution.</p></div>
      <div class="adv-card"><h3>Centralized</h3><p>Manage all devices from a single dashboard.</p></div>
    </div>
  </section>
  <section class="workflow">
    <h2>How ANCS Works</h2>
    <div class="steps">
      <div class="step"><span>1</span><p>Discover Network Devices</p></div>
      <div class="step"><span>2</span><p>Create Configurations</p></div>
      <div class="step"><span>3</span><p>AI Validation</p></div>
      <div class="step"><span>4</span><p>Deploy Securely</p></div>
    </div>
  </section>
  <section class="preview">
    <h2>Application Preview</h2>
    <p>Experience the intuitive ANCS interface</p>
    <div class="preview-box">
      <img :src="preview" class="preview-img">
    </div>
  </section>
  <section class="cta">
    <h2>Start Automating Your Network Today</h2>
    <div class="cta-buttons">
      <router-link to="/download" class="btn primary">Download ANCS</router-link>
      <button @click="openAuth('signup')" class="btn secondary">Create Free Account</button>
    </div>
  </section>
</template>
⋮----
<style scoped>
section { padding: 100px 20px; text-align: center; }
h2 { font-size: clamp(28px, 5vw, 42px); margin-bottom: 30px; color: var(--text-primary, #fff); }
p { color: var(--text-muted, #cbd5e1); }
/* HERO */
.hero {
  
  min-height: 100vh;
  padding: 140px 20px 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--hero-bg-gradient);
  color: #fff; display: flex; justify-content: center; align-items: center;
}
.hero-content {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; max-width: 700px; width: 100%; padding: 20px 0;
}
.hero-logo {
  width: clamp(85px, 15vw, 120px);

  padding: 8px;

  border-radius: 28px;

  background:
    linear-gradient(var(--body-bg), var(--body-bg)) padding-box,
    linear-gradient(135deg, #42a5f5, #0077b6, #00c6ff) border-box;

  border: 3px solid transparent;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.12);

  transition: all 0.35s ease;
}
.hero-logo:hover {
  transform: translateY(-4px) scale(1.03);

  box-shadow:
    0 18px 40px rgba(66,165,245,0.22);
}
.hero h1 {
  font-size: clamp(42px, 10vw, 72px);
  font-weight: 900;
  line-height: 1.1;
  color: var(--text-primary);
}.hero h3 { font-size: clamp(14px, 3.5vw, 20px); color: #42a5f5; margin: 12px 0 16px; font-weight: 500; }
.hero > .hero-content > p { font-size: clamp(14px, 3vw, 17px); max-width: 560px; color: var(--text-muted); }
.buttons { margin-top: 30px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn { padding: 13px 26px; border-radius: 10px; text-decoration: none; font-weight: 600; transition: 0.3s; font-family: inherit; cursor: pointer; font-size: clamp(13px, 3vw, 15px); }
.primary { 
  background: #0077b6; 
  color: white; 
  border: none; 
}
.primary:hover { background: #0096c7; transform: translateY(-3px); }
.secondary { border: 1px solid rgba(66,165,245,0.5); color: #42a5f5; background: rgba(66,165,245,0.08); }
.secondary:hover { background: rgba(66,165,245,0.2); transform: translateY(-3px); }
.ghost { border: 1px solid rgba(255,255,255,0.25); color: var(--text-muted); background: none; }
.ghost:hover { border-color: var(--text-secondary); color: var(--text-primary); }
/* STATS */
.stats { background: var(--body-bg); }
.stats-grid { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; }
.stat-card { background: var(--card-bg-solid); padding: 30px 40px; border-radius: 10px; transition: 0.3s; min-width: 140px; }
.stat-card h2 { color: #42a5f5; }
.stat-card:hover { transform: translateY(-6px) scale(1.05); background: var(--card-bg-hover); }
/* PLATFORMS */
.platforms { background: var(--section-alt-bg); color: var(--text-primary); }
.platform-grid { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
.platform { background: var(--card-bg-solid); padding: 14px 22px; border-radius: 12px; font-size: clamp(14px, 3vw, 18px); transition: 0.3s; color: var(--text-primary); }
.platform:hover { transform: translateY(-6px); background: var(--card-bg-hover); }
/* TECH */
.tech { background: var(--section-alt-bg); color: var(--text-primary); }
.tech-icons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.tech-card { background: var(--card-bg-solid); padding: 16px 24px; border-radius: 10px; transition: 0.3s; font-size: clamp(13px, 3vw, 16px); color: var(--text-primary); }
.tech-card:hover { transform: translateY(-5px); background: var(--card-bg-hover); }
/* OVERVIEW */
.overview { background: var(--body-bg); }
.overview p { max-width: 700px; margin: auto; line-height: 1.7; color: var(--text-muted); }
/* ADVANTAGES */
.advantages { background: var(--section-alt-bg); }
.adv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.adv-card { background: var(--card-bg-solid); padding: 28px; border-radius: 12px; transition: 0.3s; }
.adv-card h3 { color: #42a5f5; margin-bottom: 10px; }
.adv-card p { color: var(--text-muted); }
.adv-card:hover { transform: translateY(-6px); background: var(--card-bg-hover); }
/* WORKFLOW */
.workflow { background: var(--body-bg); }
.steps { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.step { background: var(--card-bg-solid); padding: 25px; border-radius: 10px; width: clamp(140px, 40vw, 200px); transition: 0.3s; }
.step:hover { transform: translateY(-6px); }
.step span { font-size: 30px; font-weight: bold; color: #42a5f5; display: block; margin-bottom: 8px; }
.step p { color: var(--text-muted); }
/* PREVIEW */
.preview { background: var(--section-alt-bg); }
.preview-box {
  margin-top: 40px; background: var(--body-bg); padding: 16px;
  border-radius: 15px; box-shadow: 0 25px 50px rgba(0,0,0,0.6);
  display: inline-block; animation: float 6s ease-in-out infinite;
  max-width: 100%; overflow: hidden;
}
.preview-img { width: 900px; max-width: 100%; border-radius: 10px; display: block; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
/* CTA */
.cta { background: var(--hero-bg-gradient); }
.cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
/* MOBILE */
@media (max-width: 600px) {
  section { padding: 80px 16px; }
  .hero { padding: 88px 16px 60px; }
  .buttons { flex-direction: column; align-items: center; width: 100%; }
  .buttons .btn { width: 100%; max-width: 300px; text-align: center; }
  .cta-buttons { flex-direction: column; align-items: center; }
  .cta-buttons .btn { width: 100%; max-width: 300px; text-align: center; }
  .stats-grid { gap: 16px; }
  .stat-card { padding: 20px 30px; width: 100%; max-width: 280px; }
  .step { width: 100%; max-width: 280px; }
}
</style>