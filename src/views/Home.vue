<script setup>
import { ref } from 'vue'
import mainUi from "../assets/main-ui.jpg"
import agentChat from "../assets/agent-chat.jpg"
import agentLogs from "../assets/agent-logs.jpg"
const emit = defineEmits(['open-auth'])
const openAuth = (type) => emit('open-auth', type)
</script>
⋮----
<template>
  <section class="hero">
    <div class="hero-content">
      <img src="../assets/ancs-logo.png" class="hero-logo">
      <h1>ANCS</h1>
      <h3>Autonomous Network Configuration & Orchestration System</h3>
      <p>
        ANCS is an AI-powered network automation platform that combines
        guided configuration generation, deep GNS3 integration, multi-vendor
        device management and an intelligent AI Copilot for modern network operations.
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

      <div class="stat-card">
        <h2>34+</h2>
        <p>AI Tools</p>
      </div>

      <div class="stat-card">
        <h2>Multi-Vendor</h2>
        <p>Cisco IOS & Huawei VRP</p>
      </div>

      <div class="stat-card">
        <h2>GNS3</h2>
        <p>Live Topology Discovery</p>
      </div>

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
    <h2>Technology Stack</h2>

    <div class="tech-icons">

      <div class="tech-card">🐍 Python</div>
      <div class="tech-card">💚 Vue.js</div>
      <div class="tech-card">🖥️ PySide6</div>
      <div class="tech-card">🗄️ SQLite</div>
      <div class="tech-card">🔗 GNS3</div>
      <div class="tech-card">🔌 REST API</div>
      <div class="tech-card">✨ Gemini AI</div>
      <div class="tech-card">🔐 Paramiko</div>
      <div class="tech-card">🔒 SSH</div>
      <div class="tech-card">📡 Telnet</div>
      <div class="tech-card">🌐 Cisco IOS</div>
      <div class="tech-card">⚙️ Huawei VRP</div>

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
  <section class="problem">
    <div class="container">
      <h2>The Problem We Solve</h2>
      <p>
        Traditional network configuration is slow, repetitive, and highly
        prone to human error. Studies indicate that approximately 80% of
        network outages are caused by configuration mistakes.

        ANCS reduces complexity by automating network deployment,
        validation, auditing and management through intelligent workflows,
        guided wizards, and AI-powered assistance.
      </p>
    </div>
  </section>

  <section class="features">
    <h2>Core Features</h2>

    <div class="feature-grid">

      <div class="feature-card">
        <h3>Guided Configuration Wizards</h3>
        <p>
          Generate complete Cisco IOS configurations for VLANs,
          OSPF, EIGRP, RIP, DHCP, ACLs and Inter-VLAN Routing
          from simple user inputs.
        </p>
      </div>

      <div class="feature-card">
        <h3>Deep GNS3 Integration</h3>
        <p>
          Discover network topologies automatically, manage nodes,
          synchronize configurations and interact directly with
          GNS3 through REST APIs.
        </p>
      </div>

      <div class="feature-card">
        <h3>AI Network Copilot</h3>
        <p>
          AI-powered assistant capable of network discovery,
          auditing, troubleshooting, deployment and
          connectivity tracing.
        </p>
      </div>

      <div class="feature-card">
        <h3>Multi-Protocol Communication</h3>
        <p>
          Support for SSH, Telnet and Serial connections with
          intelligent protocol handling.
        </p>
      </div>

      <div class="feature-card">
        <h3>Live Configuration Sync</h3>
        <p>
          Pull existing configurations from devices and
          automatically synchronize network state.
        </p>
      </div>

      <div class="feature-card">
        <h3>Bulk Deployment</h3>
        <p>
          Deploy configurations to multiple devices
          simultaneously with detailed reporting.
        </p>
      </div>

    </div>
  </section>

  <section class="copilot">
    <h2>Meet ANCS AI Copilot</h2>

    <p class="copilot-text">
      ANCS AI Copilot is an intelligent networking assistant powered
      by advanced Large Language Models. It can discover devices,
      generate configurations, audit networks, trace connectivity,
      and assist engineers in real-time operations.
    </p>

    <div class="copilot-grid">
      <div class="copilot-card">Network Discovery</div>
      <div class="copilot-card">Configuration Generation</div>
      <div class="copilot-card">Security Auditing</div>
      <div class="copilot-card">Connectivity Tracing</div>
      <div class="copilot-card">Deployment Assistance</div>
      <div class="copilot-card">Topology Analysis</div>
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
  <section class="why-ancs">
    <h2>Why Choose ANCS?</h2>

    <div class="adv-grid">

      <div class="adv-card">
        <h3>No-Code Automation</h3>
        <p>
          Generate complete configurations without writing
          Python scripts or YAML playbooks.
        </p>
      </div>

      <div class="adv-card">
        <h3>Educational Friendly</h3>
        <p>
          Designed for networking students and educational labs.
        </p>
      </div>

      <div class="adv-card">
        <h3>AI + Automation</h3>
        <p>
          Combines intelligent assistance with direct deployment.
        </p>
      </div>

      <div class="adv-card">
        <h3>Open Source</h3>
        <p>
          Free, extensible and accessible for everyone.
        </p>
      </div>

    </div>
  </section>

  <section class="preview">
    <h2>Inside ANCS Platform</h2>

    <p>
      Explore the core modules of ANCS, from network configuration
      management to AI-powered automation and intelligent topology analysis.
    </p>

    <div class="screenshots">

      <div class="screen-card">
        <img :src="mainUi" class="preview-img">

        <div class="screen-content">
          <h3>Main Network Manager</h3>

          <p>
            The central workspace for network engineers.
            Discover devices, generate configurations,
            deploy changes, manage templates, perform
            subnet calculations and monitor network operations
            from a unified dashboard.
          </p>
        </div>
      </div>

      <div class="screen-card">
        <img :src="agentChat" class="preview-img">

        <div class="screen-content">
          <h3>AI Copilot Assistant</h3>

          <p>
            ANCS AI Copilot connects directly to GNS3 projects
            and network devices. Engineers can interact using
            natural language to discover topology information,
            generate configurations, troubleshoot issues,
            audit security settings and automate deployments.
          </p>
        </div>
      </div>

      <div class="screen-card">
        <img :src="agentLogs" class="preview-img">

        <div class="screen-content">
          <h3>Execution Logs & Topology Intelligence</h3>

          <p>
            Monitor tool execution, AI reasoning workflows,
            structured events and real-time topology analysis.
            ANCS provides complete visibility into every
            operation performed by the AI agent.
          </p>
        </div>
      </div>

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
.stats { background: rgba(0,0,0,0.15);
backdrop-filter: blur(8px); }
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

.screenshots {
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-top: 50px;
}

.screen-card {
  background: var(--card-bg-solid);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,.4);
  transition: .3s;
}

.screen-card:hover {
  transform: translateY(-8px);
}

.preview-img {
  width: 100%;
  display: block;
}

.screen-content {
  padding: 30px;
}

.screen-content h3 {
  color: #42a5f5;
  font-size: 28px;
  margin-bottom: 15px;
}

.screen-content p {
  max-width: 900px;
  margin: auto;
  line-height: 1.8;
  font-size: 16px;
}
/* BOOK */
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

.problem,
.features,
.copilot,
.why-ancs {
  background: var(--body-bg);
}

.feature-grid,
.copilot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
  gap: 20px;
  margin-top: 40px;
}

.feature-card,
.copilot-card {
  background: var(--card-bg-solid);
  padding: 28px;
  border-radius: 14px;
  transition: .3s;
  color: var(--text-primary);
}

.feature-card:hover,
.copilot-card:hover {
  transform: translateY(-6px);
  background: var(--card-bg-hover);
}

.feature-card h3 {
  color: #42a5f5;
  margin-bottom: 12px;
}

.copilot-text {
  max-width: 800px;
  margin: auto;
  line-height: 1.8;
}

.problem p {
  max-width: 850px;
  margin: auto;
  line-height: 1.8;
}
[data-theme="dark"] .hero,
[data-theme="dark"] .overview,
[data-theme="dark"] .workflow,
[data-theme="dark"] .problem,
[data-theme="dark"] .features,
[data-theme="dark"] .copilot,
[data-theme="dark"] .why-ancs,
[data-theme="dark"] .platforms,
[data-theme="dark"] .tech,
[data-theme="dark"] .advantages,
[data-theme="dark"] .preview,
[data-theme="dark"] .cta {
  background: transparent !important;
}
</style>