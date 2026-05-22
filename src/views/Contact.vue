<template>
  <section class="contact">
    <div class="container">
      <div class="contact-header">
        <h1>Get In Touch</h1>
        <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card">
            <i class="fas fa-envelope"></i>
            <h3>Email Us</h3>
            <a href="mailto:mohamedsharkawy078@gmail.com" target="_blank">
              mohamedsharkawy078@gmail.com
            </a>
          </div>
          <div class="info-card">
            <i class="fas fa-map-marker-alt"></i>
            <h3>Location</h3>
            <a href="https://maps.google.com" target="_blank">
              Cairo, Egypt
            </a>
          </div>
          <div class="info-card">
            <i class="fab fa-github"></i>
            <h3>GitHub</h3>
            <a href="https://github.com/MohamedBendari" target="_blank">
              github.com/MohamedBendari
            </a>
          </div>
        </div>
        <!-- لو مش logged in — gate -->
        <div v-if="!isLoggedIn" class="contact-gate">
          <div class="gate-icon"><i class="fas fa-lock"></i></div>
          <h3>Login Required</h3>
          <p>You need to be logged in with your account to send us a message.</p>
          <div class="gate-btns">
            <button @click="openAuth('login')" class="gate-btn primary">
              <i class="fas fa-sign-in-alt"></i> Login
            </button>
            <button @click="openAuth('signup')" class="gate-btn secondary">
              <i class="fas fa-user-plus"></i> Create Account
            </button>
          </div>
        </div>
        <form v-else class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Your Name</label>
            <input 
              type="text" 
              id="name"
              v-model="form.name" 
              placeholder="John Doe"
              required
              :disabled="isSubmitting"
            >
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              v-model="form.email" 
              placeholder="john@example.com"
              required
              :disabled="isSubmitting"
            >
          </div>
          <div class="form-group">
            <label for="purpose">Inquiry Purpose</label>
            <select id="purpose" v-model="form.purpose" required :disabled="isSubmitting">
             <option disabled value="">Select purpose</option>
             <option value="buy">Buy ANCS</option>
             <option value="support">Technical Support</option>
             <option value="question">General Question</option>
             <option value="partnership">Partnership</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message"
              v-model="form.message" 
              placeholder="Tell us more about your inquiry..."
              rows="5"
              required
              :disabled="isSubmitting"
            ></textarea>
          </div>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">
              <i class="fas fa-paper-plane"></i>
              Send Message
            </span>
            <span v-else class="loading">
              <i class="fas fa-spinner fa-spin"></i>
              Sending...
            </span>
          </button>
          <div v-if="submitStatus" class="status-message" :class="submitStatus.type">
            <i :class="submitStatus.icon"></i>
            {{ submitStatus.message }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
⋮----
<!-- لو مش logged in — gate -->
⋮----
{{ submitStatus.message }}
⋮----
<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
const emit = defineEmits(['open-auth'])
const openAuth = (type) => emit('open-auth', type)
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)
const form = ref({
  name: '',
  email: '',
  purpose: '',
  message: ''
})
const isSubmitting = ref(false)
const submitStatus = ref(null)
const submitForm = async () => {
  isSubmitting.value = true
  submitStatus.value = null
  try {
    const response = await fetch('https://ancs-website-backend-production.up.railway.app/api/messages/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(form.value)
})
    const data = await response.json()
    if (response.ok) {
      submitStatus.value = {
        type: 'success',
        icon: 'fas fa-check-circle',
        message: 'Message sent successfully! We\'ll get back to you soon.'
      }
      // Reset form fields
      form.value = { name: '', email: '', purpose: '', message: '' }
    } else {
      throw new Error(data.message || 'Something went wrong')
    }
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      icon: 'fas fa-exclamation-circle',
      message: error.message || 'Failed to send message. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
⋮----
<style scoped>
.contact {
  min-height: 100vh;
  padding: 120px 20px 60px;
  background: var(--page-bg-gradient);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.contact-header {
  text-align: center;
  margin-bottom: 60px;
}
.contact-header h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-primary);
}
.contact-header p {
  font-size: 18px;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}
.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  align-items: start;
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.info-card {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}
.info-card:hover {
  transform: translateY(-5px);
  background: var(--card-bg-hover);
  border-color: rgba(66, 165, 245, 0.3);
}
.info-card i {
  font-size: 32px;
  color: #42a5f5;
  margin-bottom: 15px;
}
.info-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.info-card a {
  font-size: 15px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.3s ease;
}
.info-card a:hover {
  color: #42a5f5;
}
.contact-gate {
  background: var(--card-bg);
  border: 1px solid rgba(66,165,245,0.15);
  border-radius: 20px;
  padding: 50px 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.contact-gate .gate-icon {
  width: 70px; height: 70px;
  background: rgba(66,165,245,0.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; color: #42a5f5;
  margin-bottom: 8px;
}
.contact-gate h3 { font-size: 22px; color: var(--text-primary); font-weight: 700; }
.contact-gate p { font-size: 15px; color: var(--text-secondary); max-width: 360px; }
.gate-btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
.gate-btn {
  padding: 12px 28px; border-radius: 10px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  font-family: inherit; display: flex; align-items: center; gap: 8px;
  transition: all 0.25s; border: none;
}
.gate-btn.primary { background: linear-gradient(135deg, #42a5f5, #0077b6); color: var(--text-primary); }
.gate-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,119,182,0.4); }
.gate-btn.secondary { background: rgba(66,165,245,0.1); border: 1px solid rgba(66,165,245,0.3); color: #42a5f5; }
.gate-btn.secondary:hover { background: rgba(66,165,245,0.2); }
.contact-form {
  background: var(--card-bg);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
}
.form-group {
  margin-bottom: 25px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 14px 18px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
}
.form-group select option {
  background: var(--card-bg-solid);
  color: var(--text-primary);
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42a5f5;
  background: var(--card-bg-hover);
}
.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #0077b6, #0096c7);
  color: var(--text-primary);
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 119, 182, 0.4);
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.status-message {
  margin-top: 20px;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}
.status-message.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
}
.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}
@media (max-width: 968px) {
  .contact-content { grid-template-columns: 1fr; }
  .contact-info { order: 2; flex-direction: row; flex-wrap: wrap; }
  .info-card { flex: 1; min-width: 250px; }
  .contact-form { order: 1; }
}
@media (max-width: 768px) {
  .contact-header h1 { font-size: 36px; }
  .contact-info { flex-direction: column; }
  .info-card { min-width: 100%; }
}
</style>