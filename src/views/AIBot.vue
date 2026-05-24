<template>
  <section class="chatgpt-page">
    <div class="chat-wrapper">

      <!-- HEADER -->
      <header class="chat-topbar">
        <div class="chat-logo">
          <div class="chat-logo-icon">
            <i class="fas fa-robot"></i>
          </div>
          <span>ANCS AI</span>
        </div>
      </header>

      <!-- NOT LOGGED IN -->
      <template v-if="!isLoggedIn">
        <div class="auth-gate">
          <div class="gate-icon"><i class="fas fa-lock"></i></div>
          <h2>Login Required</h2>
          <p>You need to be logged in to access ANCS AI — just like the download page.</p>
          <div class="gate-actions">
            <button class="gate-btn primary" @click="openAuth('login')">
              <i class="fas fa-sign-in-alt"></i> Login
            </button>
            <button class="gate-btn secondary" @click="openAuth('signup')">
              <i class="fas fa-user-plus"></i> Sign Up
            </button>
          </div>
        </div>
      </template>

      <!-- CHAT -->
      <template v-else>
        <main class="messages" ref="chatContainer">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['msg-row', message.role]"
          >
            <div :class="['avatar', message.role]">
              <i :class="message.role === 'assistant' ? 'fas fa-robot' : 'fas fa-user'"></i>
            </div>
            <div class="msg-content">{{ message.text }}</div>
          </div>

          <!-- Typing -->
          <div v-if="isLoading" class="typing-row">
            <div class="avatar assistant"><i class="fas fa-robot"></i></div>
            <div class="typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </main>

        <!-- INPUT -->
        <footer class="input-area">
          <div class="input-box">
            <textarea
              v-model="prompt"
              @keydown="handleKeydown"
              placeholder="Type your question here and press Enter to send..."
              rows="1"
            ></textarea>
            <button @click="sendMessage" :disabled="isLoading || !prompt.trim()">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <p class="input-note">ANCS AI may make mistakes. Double-check important info.</p>
        </footer>
      </template>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth'

const emit       = defineEmits(['open-auth'])
const openAuth   = (type) => emit('open-auth', type)
const authStore  = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const prompt        = ref('')
const isLoading     = ref(false)
const chatContainer = ref(null)

const messages = ref([
  { role: 'assistant', text: 'Hello 👋 I am ANCS AI. I can help you with network configuration, routing protocols, GNS3 setups, and any other questions. How can I help you today?' }
])

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight
}

const appendMessage = async (role, text) => {
  messages.value.push({ role, text })
  await scrollToBottom()
}
  
const sendMessage = async () => {
  const text = prompt.value.trim()
  if (!text || isLoading.value) return
  await appendMessage('user', text)
  prompt.value = ''
  isLoading.value = true
  try {
    const token = localStorage.getItem('access')

const response = await fetch('https://ancs-website-backend-production.up.railway.app/api/ai/chat/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    message: text
  })
})

if (!response.ok) {
  throw new Error('AI request failed')
}

const data = await response.json()

await appendMessage('assistant', data.reply)
  } catch (error) {
    await appendMessage('assistant', 'An error occurred while connecting to the AI. Please try again.')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}
</script>

<style scoped>
/* ══ ROOT ══ */
.chatgpt-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--chat-bg);
  color: var(--text-primary);
  padding-top: 72px; /* navbar height */
}

/* ── Dark ── */
:root, [data-theme="dark"] {
  --chat-bg:         #1e2d3d;
  --chat-topbar-bg:  #16243a;
  --chat-topbar-border: rgba(255,255,255,0.07);
  --msg-user-bg:     #1e2d3d;
  --msg-ai-bg:       #16243a;
  --input-area-bg:   #16243a;
  --input-box-bg:    #1e2d3d;
  --input-box-border: rgba(255,255,255,0.1);
  --input-color:     #e8edf2;
  --input-placeholder: rgba(255,255,255,0.3);
  --avatar-ai-bg:    #0077b6;
  --avatar-user-bg:  #5436da;
  --send-btn-bg:     #0096c7;
  --send-btn-hover:  #0077b6;
  --typing-dot:      rgba(255,255,255,0.4);
  --note-color:      rgba(255,255,255,0.3);
  --gate-bg:         rgba(255,255,255,0.03);
}

/* ── Light ── */
[data-theme="light"] {
  --chat-bg:         #f0f5fa;
  --chat-topbar-bg:  #ffffff;
  --chat-topbar-border: rgba(0,0,0,0.08);
  --msg-user-bg:     #f0f5fa;
  --msg-ai-bg:       #ffffff;
  --input-area-bg:   #ffffff;
  --input-box-bg:    #f0f5fa;
  --input-box-border: rgba(0,0,0,0.1);
  --input-color:     #1a2537;
  --input-placeholder: rgba(0,0,0,0.35);
  --avatar-ai-bg:    #0077b6;
  --avatar-user-bg:  #5436da;
  --send-btn-bg:     #0096c7;
  --send-btn-hover:  #0077b6;
  --typing-dot:      #94a3b8;
  --note-color:      #94a3b8;
  --gate-bg:         rgba(0,0,0,0.02);
}

.chat-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ══ TOPBAR ══ */
.chat-topbar {
  height: 56px;
  background: var(--chat-topbar-bg);
  border-bottom: 1px solid var(--chat-topbar-border);
  display: flex; align-items: center;
  padding: 0 24px; flex-shrink: 0;
  box-shadow: 0 1px 8px rgba(0,0,0,0.08);
}
.chat-logo {
  display: flex; align-items: center; gap: 12px;
  font-size: 17px; font-weight: 700; color: var(--text-primary);
}
.chat-logo-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, #42a5f5, #0077b6);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; color: #fff;
}

/* ══ AUTH GATE ══ */
.auth-gate {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 40px 20px; text-align: center;
  background: var(--gate-bg);
}
.gate-icon {
  width: 72px; height: 72px; border-radius: 50%;
  background: rgba(66,165,245,0.1); border: 1px solid rgba(66,165,245,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; color: #42a5f5; margin-bottom: 20px;
}
.auth-gate h2 { font-size: 26px; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; }
.auth-gate p { font-size: 15px; color: var(--text-muted); max-width: 480px; line-height: 1.7; margin-bottom: 28px; }
.gate-actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.gate-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 13px 28px; border-radius: 12px;
  font-size: 15px; font-weight: 600; cursor: pointer;
  font-family: inherit; border: none; transition: all 0.25s;
}
.gate-btn.primary {
  background: linear-gradient(135deg, #42a5f5, #0077b6); color: #fff;
  box-shadow: 0 4px 15px rgba(0,119,182,0.35);
}
.gate-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,119,182,0.5); }
.gate-btn.secondary {
  background: var(--input-box-bg); border: 1px solid var(--input-box-border);
  color: var(--text-primary);
}
.gate-btn.secondary:hover { border-color: #42a5f5; color: #42a5f5; }

/* ══ MESSAGES ══ */
.messages {
  flex: 1; overflow-y: auto; scroll-behavior: smooth;
}
.messages::-webkit-scrollbar { width: 5px; }
.messages::-webkit-scrollbar-thumb { background: rgba(66,165,245,0.3); border-radius: 20px; }

.msg-row {
  width: 100%; display: flex; gap: 16px;
  padding: 20px max(16px, calc((100% - 820px) / 2));
  transition: background 0.2s;
}
.msg-row.user      { background: var(--msg-user-bg); }
.msg-row.assistant { background: var(--msg-ai-bg); }

.avatar {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; color: #fff;
}
.avatar.assistant { background: var(--avatar-ai-bg); }
.avatar.user      { background: var(--avatar-user-bg); }

.msg-content {
  font-size: 15px; line-height: 1.85;
  white-space: pre-wrap; word-break: break-word;
  color: var(--text-primary); flex: 1; padding-top: 6px;
}

/* Typing */
.typing-row {
  display: flex; align-items: center; gap: 16px;
  padding: 20px max(16px, calc((100% - 820px) / 2));
  background: var(--msg-ai-bg);
}
.typing {
  display: flex; align-items: center; gap: 5px; padding-top: 6px;
}
.typing span {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--typing-dot);
  animation: bounce 1.4s infinite ease-in-out;
}
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.5); opacity: 0.5; }
  40%            { transform: scale(1);   opacity: 1; }
}

/* ══ INPUT ══ */
.input-area {
  background: var(--input-area-bg);
  border-top: 1px solid var(--chat-topbar-border);
  padding: 16px 20px 12px; flex-shrink: 0;
}
.input-box {
  max-width: 820px; margin: 0 auto;
  display: flex; align-items: flex-end; gap: 12px;
  background: var(--input-box-bg);
  border: 1px solid var(--input-box-border);
  border-radius: 16px; padding: 12px 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-box:focus-within {
  border-color: rgba(66,165,245,0.5);
  box-shadow: 0 0 0 3px rgba(66,165,245,0.08);
}
.input-box textarea {
  flex: 1; background: transparent; border: none; outline: none; resize: none;
  color: var(--input-color); font-size: 15px; line-height: 1.7;
  max-height: 200px; min-height: 24px; font-family: inherit;
}
.input-box textarea::placeholder { color: var(--input-placeholder); }
.input-box button {
  width: 40px; height: 40px; border: none; border-radius: 10px;
  background: var(--send-btn-bg); color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; transition: all 0.2s; flex-shrink: 0;
}
.input-box button:hover:not(:disabled) {
  background: var(--send-btn-hover); transform: scale(1.05);
}
.input-box button:disabled { opacity: 0.45; cursor: not-allowed; }
.input-note {
  text-align: center; font-size: 11.5px; color: var(--note-color);
  margin: 8px 0 0; max-width: 820px; margin-left: auto; margin-right: auto;
}

/* ══ RESPONSIVE ══ */
@media (max-width: 768px) {
  .chatgpt-page { padding-top: 72px; }
  .msg-row, .typing-row { padding: 16px; }
  .input-area { padding: 12px; }
  .msg-content { font-size: 14px; }
}
</style>