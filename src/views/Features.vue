<template>
  <section class="features">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">What We Offer</span>
        <h1>Powerful Features</h1>
        <p>Everything you need to manage and configure your network infrastructure efficiently</p>
      </div>
      <div class="features-grid">
        <!-- Device Management -->
        <div class="feature-card">
          <div class="card-icon">
            <i class="fas fa-server"></i>
          </div>
          <h3>Device Management</h3>
          <p>Complete control over your network devices with intuitive interface</p>
          <ul class="feature-list">
            <li><i class="fas fa-check"></i> Add new devices (Name, Type, IP, Login Info)</li>
            <li><i class="fas fa-check"></i> Edit / Delete devices from list</li>
            <li><i class="fas fa-check"></i> Auto Scan for GNS3 & Local Network devices</li>
          </ul>
        </div>
        <!-- Configuration Management -->
        <div class="feature-card">
          <div class="card-icon blue">
            <i class="fas fa-cogs"></i>
          </div>
          <h3>Configuration Management</h3>
          <p>Streamlined configuration workflow for network engineers</p>
          <ul class="feature-list">
            <li><i class="fas fa-check"></i> Write CLI Commands for specific devices</li>
            <li><i class="fas fa-check"></i> Edit existing configurations</li>
            <li><i class="fas fa-check"></i> Save to Database or .txt files</li>
            <li><i class="fas fa-check"></i> Auto-apply via SSH/Telnet</li>
            <li><i class="fas fa-check"></i> Backup & Restore configs</li>
          </ul>
        </div>
        <!-- AI Assistant -->
        <div class="feature-card">
          <div class="card-icon purple">
            <i class="fas fa-brain"></i>
          </div>
          <h3>AI Assistant</h3>
          <p>Smart troubleshooting with artificial intelligence</p>
          <ul class="feature-list">
            <li><i class="fas fa-check"></i> AI Troubleshooter analyzes device logs</li>
            <li><i class="fas fa-check"></i> Smart suggestions (e.g., "Check VLAN 10 mismatch")</li>
            <li><i class="fas fa-check"></i> Recommendation System for device types</li>
          </ul>
        </div>
        <!-- Security & Monitoring -->
        <div class="feature-card">
          <div class="card-icon green">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>Security & Monitoring</h3>
          <p>Enterprise-grade security for your network infrastructure</p>
          <ul class="feature-list">
            <li><i class="fas fa-check"></i> Encrypted credentials (Hash + Encryption)</li>
            <li><i class="fas fa-check"></i> Complete operation logs</li>
            <li><i class="fas fa-check"></i> Track configuration changes</li>
          </ul>
        </div>
        <!-- Automation -->
        <div class="feature-card">
          <div class="card-icon orange">
            <i class="fas fa-robot"></i>
          </div>
          <h3>Automation</h3>
          <p>Automate repetitive tasks and save time</p>
          <ul class="feature-list">
            <li><i class="fas fa-check"></i> Auto Backup every 24 hours</li>
            <li><i class="fas fa-check"></i> Scheduled configuration tasks</li>
            <li><i class="fas fa-check"></i> Batch device updates</li>
          </ul>
        </div>
        <!-- AI Log Analysis -->
        <div class="feature-card">
          <div class="card-icon red">
            <i class="fas fa-chart-line"></i>
          </div>
          <h3>AI Log Analysis</h3>
          <p>Advanced anomaly detection using machine learning</p>
          <ul class="feature-list">
            <li><i class="fas fa-check"></i> Store logs in Database/Files</li>
            <li><i class="fas fa-check"></i> scikit-learn IsolationForest model</li>
            <li><i class="fas fa-check"></i> Learn normal patterns</li>
            <li><i class="fas fa-check"></i> Detect unusual behavior</li>
            <li><i class="fas fa-check"></i> Real-time alerts: "⚠️ Unusual config detected"</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
⋮----
<!-- Device Management -->
⋮----
<!-- Configuration Management -->
⋮----
<!-- AI Assistant -->
⋮----
<!-- Security & Monitoring -->
⋮----
<!-- Automation -->
⋮----
<!-- AI Log Analysis -->
⋮----
<style scoped>
.features {
  min-height: 100vh;
  padding: 120px 20px 80px;
  background: transparent;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
}
.section-header {
  text-align: center;
  margin-bottom: 80px;
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
  max-width: 600px;
  margin: 0 auto;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 40px 30px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #42a5f5, transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.feature-card:hover {
  transform: translateY(-10px);
  background: var(--card-bg-hover);
  border-color: rgba(66, 165, 245, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
.feature-card:hover::before {
  transform: scaleX(1);
}
.card-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #42a5f5, #0077b6);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  font-size: 28px;
  color: var(--text-primary);
  box-shadow: 0 10px 30px rgba(66, 165, 245, 0.3);
}
.card-icon.blue {
  background: linear-gradient(135deg, #2196f3, #1976d2);
  box-shadow: 0 10px 30px rgba(33, 150, 243, 0.3);
}
.card-icon.purple {
  background: linear-gradient(135deg, #9c27b0, #7b1fa2);
  box-shadow: 0 10px 30px rgba(156, 39, 176, 0.3);
}
.card-icon.green {
  background: linear-gradient(135deg, #4caf50, #388e3c);
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
}
.card-icon.orange {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  box-shadow: 0 10px 30px rgba(255, 152, 0, 0.3);
}
.card-icon.red {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3);
}
.feature-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--text-primary);
}
.feature-card > p {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 25px;
  line-height: 1.6;
}
.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
}
.feature-list li i {
  color: #4caf50;
  margin-top: 3px;
  font-size: 12px;
}
/* Responsive */
@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .section-header h1 {
    font-size: 36px;
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
  .feature-card {
    padding: 30px 25px;
  }
}
@media (max-width: 600px) {
  .features {
    padding: 90px 20px 60px;
  }
  .section-header {
    margin-bottom: 40px;
  }
  .section-header h1 {
    font-size: 28px;
  }
  .section-header p {
    font-size: 16px;
  }
  .feature-card {
    padding: 20px 16px;
  }
  .card-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  .feature-card h3 {
    font-size: 16px;
  }
  .feature-card p {
    font-size: 13px;
  }
  .feature-list li {
    font-size: 12px;
  }
}
</style>