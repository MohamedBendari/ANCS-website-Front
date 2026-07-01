<template>
  <nav class="bottom-nav">

    <button class="nav-item" @click="go('/')">
      <HomeIcon class="icon" />
      <span>Home</span>
    </button>

    <button class="nav-item" @click="go('/about')">
      <InformationCircleIcon class="icon" />
      <span>About</span>
    </button>

    <button class="nav-item" @click="go('/features')">
      <SparklesIcon class="icon" />
      <span>Features</span>
    </button>

    <button class="nav-item" @click="go('/contact')">
      <EnvelopeIcon class="icon" />
      <span>Contact</span>
    </button>

    <button class="nav-item" @click="go('/download')">
      <ArrowDownTrayIcon class="icon" />
      <span>Download</span>
    </button>

    <!-- Dashboard يظهر للأدمن فقط -->
    <button
      v-if="authStore.isAdmin"
      class="nav-item"
      @click="go('/dashboard')"
    >
      <Squares2X2Icon class="icon" />
      <span>Dashboard</span>
    </button>

    <!-- Menu -->
    <button class="nav-item" @click="emit('toggle-menu')">
      <Bars3Icon class="icon" />
      <span>Menu</span>
    </button>

  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import {
  HomeIcon,
  InformationCircleIcon,
  SparklesIcon,
  EnvelopeIcon,
  ArrowDownTrayIcon,
  Bars3Icon,
  Squares2X2Icon
} from '@heroicons/vue/24/solid'

const router = useRouter()
const authStore = useAuthStore()
const emit = defineEmits(['toggle-menu'])


const go = (path) => {
  router.push(path)
}
</script>

<style scoped>
.bottom-nav{
  position:fixed;
  left:50%;
  bottom: max(18px, env(safe-area-inset-bottom));  transform:translateX(-50%);
  animation: floatingNav 3s ease-in-out infinite;

  width:calc(100% - 24px);
  max-width:520px;


  display:flex;
  justify-content:space-around;
  align-items:center;

  padding:10px 14px;

  border-radius:24px;

  background:var(--nav-bg);

  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);

  border:1px solid var(--border-color);

  box-shadow:0 8px 30px rgba(0,0,0,.25);

  z-index:3000;
}

.nav-item{
  background:none;
  border:none;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  gap:4px;

  cursor:pointer;

  color:var(--text-muted);

  transition:.25s;

  min-width:52px;
}

.nav-item:hover{
  color:#42A5F5;
}

.icon{
  width:24px;
  height:24px;
}

.nav-item span{
  font-size:11px;
  font-weight:600;
}

@media (min-width:901px){
  .bottom-nav{
    display:none;
  }
}
@keyframes floatingNav {
  0% {
    transform: translateX(-50%) translateY(0px);
  }

  50% {
    transform: translateX(-50%) translateY(-10px);
  }

  100% {
    transform: translateX(-50%) translateY(0px);
  }
}
</style>