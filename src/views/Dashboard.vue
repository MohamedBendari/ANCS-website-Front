<template>
  <div class="dash-root" :class="[theme, { rtl: lang === 'ar' }]" :dir="lang === 'ar' ? 'rtl' : 'ltr'">

    <!-- ══════════════ SIDEBAR ══════════════ -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-logo">
        <img src="../assets/ancs-logo.png" alt="ANCS">
        <span class="logo-text">ANCS</span>
      </div>
      <!-- Back Button -->
      <button class="sidebar-back-btn" @click="router.push('/')">
        <i :class="lang === 'ar' ? 'fas fa-arrow-right' : 'fas fa-arrow-left'"></i>
        <span>Back</span>
      </button>
      <nav class="sidebar-nav">
        <button
          v-for="item in navItems" :key="item.id"
          class="nav-item"
          :class="{ active: activeSection === item.id }"
          @click="activeSection = item.id"
          :title="sidebarCollapsed ? t(item.label) : ''"
        >
          <i :class="item.icon"></i>
          <span class="nav-label">{{ t(item.label) }}</span>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </button>
      </nav>
      <div class="sidebar-user" @click="activeSection = 'profile'">
        <div class="user-avatar">
          <span>{{ userInitials }}</span>
          <div class="online-dot"></div>
        </div>
        <div class="user-meta">
          <span class="user-name">{{ username }}</span>
          <span class="user-role">Administrator</span>
        </div>
        <i class="fas fa-ellipsis-v more-icon"></i>
      </div>
      <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
        <i :class="sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
      </button>
    </aside>

    <!-- ══════════════ MAIN ══════════════ -->
    <div class="dash-main">

      <!-- TOPBAR -->
      <header class="topbar">
        <div class="topbar-left">
          <h1 class="page-title">{{ t(currentSectionLabel) }}</h1>
          <div class="breadcrumb">
            <span>ANCS</span>
            <i class="fas fa-chevron-right"></i>
            <span>{{ t(currentSectionLabel) }}</span>
          </div>
        </div>
        <div class="topbar-right">
          <div class="topbar-search" v-if="activeSection === 'messages'">
            <i class="fas fa-search"></i>
            <input v-model="search" :placeholder="t('search')" @input="fetchMessages()">
          </div>
          <button class="icon-btn" @click="toggleTheme" :title="theme === 'dark' ? t('lightMode') : t('darkMode')">
            <i :class="theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
          <button class="icon-btn lang-btn" @click="toggleLang">
            {{ lang === 'en' ? 'عربي' : 'EN' }}
          </button>
          <button class="icon-btn notif-btn" @click="showNotifs = !showNotifs">
            <i class="fas fa-bell"></i>
            <span class="notif-dot" v-if="notifications.length"></span>
          </button>
          <button class="logout-btn" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>{{ t('logout') }}</span>
          </button>
        </div>
      </header>

      <!-- ══════ CONTENT ══════ -->
      <main class="content-area">

        <!-- ── MESSAGES ── -->
        <section v-if="activeSection === 'messages'" class="section-content">
          <div class="stats-row">
            <div class="stat-box">
              <div class="stat-icon blue"><i class="fas fa-envelope"></i></div>
              <div class="stat-info">
                <span class="stat-num">{{ messages.length }}</span>
                <span class="stat-label">{{ t('totalMessages') }}</span>
              </div>
            </div>
            <div class="stat-box">
              <div class="stat-icon green"><i class="fas fa-shopping-cart"></i></div>
              <div class="stat-info">
                <span class="stat-num">{{ messages.filter(m => m.purpose === 'buy').length }}</span>
                <span class="stat-label">{{ t('buy') }}</span>
              </div>
            </div>
            <div class="stat-box">
              <div class="stat-icon orange"><i class="fas fa-headset"></i></div>
              <div class="stat-info">
                <span class="stat-num">{{ messages.filter(m => m.purpose === 'support').length }}</span>
                <span class="stat-label">{{ t('support') }}</span>
              </div>
            </div>
            <div class="stat-box">
              <div class="stat-icon purple"><i class="fas fa-question-circle"></i></div>
              <div class="stat-info">
                <span class="stat-num">{{ messages.filter(m => m.purpose === 'question').length }}</span>
                <span class="stat-label">{{ t('question') }}</span>
              </div>
            </div>
            <div class="stat-box">
  <div class="stat-icon teal">
    <i class="fas fa-handshake"></i>
  </div>
  <div class="stat-info">
    <span class="stat-num">
      {{ messages.filter(m => m.purpose === 'partnership').length }}
    </span>
    <span class="stat-label">{{ t('partnership') }}</span>
  </div>
</div>
          </div> 

          <div class="table-card">
            <div class="table-header">
              <h3>{{ t('allMessages') }}</h3>
              <div class="table-actions">
                <select v-model="filterPurpose" class="filter-select">
                  <option value="">{{ t('allTypes') }}</option>
                  <option value="buy">{{ t('buy') }}</option>
                  <option value="support">{{ t('support') }}</option>
                  <option value="question">{{ t('question') }}</option>
                  <option value="partnership">{{ t('partnership') }}</option>
                </select>
              </div>
            </div>

            <div v-if="isLoadingData" class="loading-state">
              <div class="skeleton-row" v-for="i in 5" :key="i"></div>
            </div>
            <div v-else-if="filteredMessages.length === 0" class="empty-state">
              <i class="fas fa-inbox"></i>
              <p>{{ t('noMessages') }}</p>
            </div>
            <div v-else class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{{ t('name') }}</th>
                    <th>{{ t('email') }}</th>
                    <th>{{ t('type') }}</th>
                    <th>{{ t('message') }}</th>
                    <th>{{ t('date') }}</th>
                    <th>{{ t('actions') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="msg in filteredMessages" :key="msg.id" class="table-row">
                    <td>
                      <div class="cell-user">
                        <div class="mini-avatar">{{ msg.name?.charAt(0) || '?' }}</div>
                        {{ msg.name }}
                      </div>
                    </td>
                    <td class="cell-email">{{ msg.email }}</td>
                    <td><span :class="['badge', msg.purpose]">{{ msg.purpose }}</span></td>
                    <td class="cell-msg">{{ msg.message?.slice(0, 60) }}{{ msg.message?.length > 60 ? '...' : '' }}</td>
                    <td class="cell-date">{{ formatDate(msg.created_at) }}</td>
                    <td>
                      <div class="action-btns">
                        <button class="act-btn view" @click.stop="openMessage(msg)" :title="t('view')">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="act-btn delete" @click.stop="deleteMessage(msg)" :title="t('delete')">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pagination" v-if="!isLoadingData && (next || previous)">
              <button @click="prevPage" :disabled="!previous" class="page-btn">
                <i class="fas fa-chevron-left"></i> {{ t('prev') }}
              </button>
              <span class="page-info">{{ t('page') }} {{ currentPage }}</span>
              <button @click="nextPage" :disabled="!next" class="page-btn">
                {{ t('next') }} <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>

        <!-- ── USERS ── -->
        <section v-else-if="activeSection === 'users'" class="section-content">

          <!-- Stats for users -->
          <div class="stats-row" style="margin-bottom:24px">
            <div class="stat-box">
              <div class="stat-icon blue"><i class="fas fa-users"></i></div>
              <div class="stat-info">
                <span class="stat-num">{{ users.length }}</span>
                <span class="stat-label">{{ t('totalUsers') }}</span>
              </div>
            </div>
            <div class="stat-box">
              <div class="stat-icon green"><i class="fas fa-user-check"></i></div>
              <div class="stat-info">
                <span class="stat-num">{{ users.filter(u => u.is_active).length }}</span>
                <span class="stat-label">{{ t('activeUsers') }}</span>
              </div>
            </div>
            <div class="stat-box">
              <div class="stat-icon orange"><i class="fas fa-user-shield"></i></div>
              <div class="stat-info">
                <span class="stat-num">{{ users.filter(u => u.role === 'admin').length }}</span>
                <span class="stat-label">{{ t('adminUsers') }}</span>
              </div>
            </div>
            <div class="stat-box">
              <div class="stat-icon purple"><i class="fas fa-user-times"></i></div>
              <div class="stat-info">
                <span class="stat-num">{{ users.filter(u => !u.is_active).length }}</span>
                <span class="stat-label">{{ t('inactiveUsers') }}</span>
              </div>
            </div>
          </div>

          <div class="table-card">
            <div class="table-header">
              <h3>{{ t('usersManagement') }}</h3>
              <button class="add-btn" @click="openAddModal">
                <i class="fas fa-plus"></i> {{ t('addUser') }}
              </button>
            </div>

            <div v-if="isLoadingUsers" class="loading-state">
              <div class="skeleton-row" v-for="i in 5" :key="i"></div>
            </div>
            <div v-else-if="users.length === 0" class="empty-state">
              <i class="fas fa-users"></i>
              <p>{{ t('noUsers') }}</p>
            </div>
            <div v-else class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{{ t('user') }}</th>
                    <th>{{ t('email') }}</th>
                    <th>{{ t('role') }}</th>
                    <th>{{ t('status') }}</th>
                    <th>{{ t('joined') }}</th>
                    <th>{{ t('actions') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id" class="table-row">
                    <td>
                      <div class="cell-user">
                        <div class="mini-avatar" :style="{ background: avatarColor(user.username) }">
                          {{ user.username.charAt(0).toUpperCase() }}
                        </div>
                        {{ user.username }}
                      </div>
                    </td>
                    <td class="cell-email">{{ user.email }}</td>
                    <td><span :class="['role-badge', user.role]">{{ user.role }}</span></td>
                    <td><span :class="['status-dot', user.is_active ? 'active' : 'inactive']">
                      ● {{ user.is_active ? 'active' : 'inactive' }}
                    </span></td>
                    <td class="cell-date">{{ formatDate(user.date_joined) }}</td>
                    <td>
                      <div class="action-btns">
                        <button class="act-btn edit" @click.stop="openEditModal(user)" :title="t('edit')">
                          <i class="fas fa-pen"></i>
                        </button>
                        <button class="act-btn delete" @click.stop="confirmDelete(user)" :title="t('delete')">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ── PROFILE ── -->
        <section v-else-if="activeSection === 'profile'" class="section-content">
          <div class="profile-grid">
            <div class="profile-card main-profile">
              <div class="profile-avatar-big">
                <span>{{ userInitials }}</span>
              </div>
              <h2 class="profile-name">{{ username }}</h2>
              <span class="profile-role-tag">Administrator</span>
              <p class="profile-bio">Network Automation Engineer managing ANCS configurations and deployments.</p>
              <div class="profile-stats">
                <div><span>{{ messages.length }}</span><p>{{ t('messages') }}</p></div>
                <div><span>{{ users.length }}</span><p>{{ t('users') }}</p></div>
                <div><span>24/7</span><p>Uptime</p></div>
              </div>
            </div>

            <div class="profile-card info-card">
              <h3><i class="fas fa-info-circle"></i> {{ t('accountInfo') }}</h3>
              <div class="info-row">
                <span class="info-label"><i class="fas fa-user"></i> {{ t('username') }}</span>
                <span class="info-val">{{ username }}</span>
              </div>
              <div class="info-row">
                <span class="info-label"><i class="fas fa-shield-alt"></i> {{ t('role') }}</span>
                <span class="info-val">Administrator</span>
              </div>
              <div class="info-row">
                <span class="info-label"><i class="fas fa-clock"></i> {{ t('lastLogin') }}</span>
                <span class="info-val">{{ new Date().toLocaleString() }}</span>
              </div>
              <div class="info-row">
                <span class="info-label"><i class="fas fa-globe"></i> {{ t('language') }}</span>
                <span class="info-val">{{ lang === 'en' ? 'English' : 'العربية' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label"><i class="fas fa-adjust"></i> {{ t('theme') }}</span>
                <span class="info-val">{{ theme === 'dark' ? t('darkMode') : t('lightMode') }}</span>
              </div>
              <div class="info-row">
                <span class="info-label"><i class="fas fa-envelope"></i> {{ t('totalMessages') }}</span>
                <span class="info-val">{{ messages.length }}</span>
              </div>
              <div class="info-row">
                <span class="info-label"><i class="fas fa-users"></i> {{ t('users') }}</span>
                <span class="info-val">{{ users.length }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- ── SETTINGS ── -->
        <section v-else-if="activeSection === 'settings'" class="section-content">
          <div class="settings-grid">
            <div class="settings-card">
              <div class="settings-card-header">
                <i class="fas fa-palette"></i>
                <h3>{{ t('appearance') }}</h3>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-name">{{ t('themeMode') }}</span>
                  <span class="setting-desc">{{ t('themeModeDesc') }}</span>
                </div>
                <div class="theme-toggle-group">
                  <button :class="['theme-opt', { active: theme === 'dark' }]" @click="setTheme('dark')">
                    <i class="fas fa-moon"></i> {{ t('dark') }}
                  </button>
                  <button :class="['theme-opt', { active: theme === 'light' }]" @click="setTheme('light')">
                    <i class="fas fa-sun"></i> {{ t('light') }}
                  </button>
                </div>
              </div>
            </div>

            <div class="settings-card">
              <div class="settings-card-header">
                <i class="fas fa-language"></i>
                <h3>{{ t('languageSettings') }}</h3>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-name">{{ t('interfaceLang') }}</span>
                  <span class="setting-desc">{{ t('interfaceLangDesc') }}</span>
                </div>
                <div class="lang-options">
                  <button :class="['lang-opt', { active: lang === 'en' }]" @click="setLang('en')">
                    <span class="lang-flag">🇺🇸</span> English
                  </button>
                  <button :class="['lang-opt', { active: lang === 'ar' }]" @click="setLang('ar')">
                    <span class="lang-flag">🇸🇦</span> العربية
                  </button>
                </div>
              </div>
            </div>

            <div class="settings-card">
              <div class="settings-card-header">
                <i class="fas fa-user-cog"></i>
                <h3>{{ t('accountSettings') }}</h3>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-name">{{ t('changePassword') }}</span>
                  <span class="setting-desc">{{ t('changePasswordDesc') }}</span>
                </div>
                <button class="settings-action-btn" @click="showPasswordModal = true">
                  <i class="fas fa-key"></i>
                  {{ t('change') }}
                </button>
              </div>
              <div class="setting-row danger-row">
                <div class="setting-info">
                  <span class="setting-name danger">{{ t('logout') }}</span>
                  <span class="setting-desc">{{ t('logoutDesc') }}</span>
                </div>
                <button class="settings-action-btn danger" @click="logout">
                  <i class="fas fa-sign-out-alt"></i> {{ t('logout') }}
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>

    <!-- ══════ MESSAGE DETAIL MODAL ══════ -->
    <Transition name="modal-fade">
      <div v-if="selectedMessage" class="msg-modal-overlay" @click.self="selectedMessage = null">
        <div class="msg-modal">
          <button class="msg-modal-close" @click="selectedMessage = null"><i class="fas fa-times"></i></button>
          <div class="msg-modal-header">
            <div class="modal-avatar">{{ selectedMessage.name?.charAt(0) }}</div>
            <div>
              <h3>{{ selectedMessage.name }}</h3>
              <a :href="`mailto:${selectedMessage.email}`">{{ selectedMessage.email }}</a>
            </div>
            <span :class="['badge', selectedMessage.purpose]">{{ selectedMessage.purpose }}</span>
          </div>
          <div class="msg-modal-body">
            <p>{{ selectedMessage.message }}</p>
          </div>
          <div class="msg-modal-footer">
            <span>{{ formatDate(selectedMessage.created_at) }}</span>
            <a :href="`mailto:${selectedMessage.email}`" class="reply-btn">
              <i class="fas fa-reply"></i> Reply
            </a>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══════ ADD USER MODAL ══════ -->
    <Transition name="modal-fade">
      <div v-if="showAddModal" class="msg-modal-overlay" @click.self="closeAddModal">
        <div class="msg-modal user-modal">
          <button class="msg-modal-close" @click="closeAddModal"><i class="fas fa-times"></i></button>
          <div class="user-modal-header">
            <div class="modal-avatar"><i class="fas fa-user-plus"></i></div>
            <div>
              <h3>{{ t('addUser') }}</h3>
              <p>{{ t('addUserDesc') }}</p>
            </div>
          </div>

          <div class="user-form">
            <div class="form-row">
              <label>{{ t('username') }}</label>
              <input v-model="userForm.username" :placeholder="t('username')" class="form-input">
            </div>
            <div class="form-row">
              <label>{{ t('email') }}</label>
              <input v-model="userForm.email" type="email" :placeholder="t('email')" class="form-input">
            </div>
            <div class="form-row">
              <label>{{ t('password') }}</label>
              <input v-model="userForm.password" type="password" :placeholder="t('password')" class="form-input">
            </div>
            <div class="form-row">
              <label>{{ t('role') }}</label>
              <select v-model="userForm.role" class="form-input">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div v-if="formError" class="form-error">
              <i class="fas fa-exclamation-circle"></i> {{ formError }}
            </div>
            <div v-if="formSuccess" class="form-success">
              <i class="fas fa-check-circle"></i> {{ formSuccess }}
            </div>

            <div class="form-actions">
              <button class="form-cancel-btn" @click="closeAddModal">{{ t('cancel') }}</button>
              <button class="form-submit-btn" @click="submitAddUser" :disabled="formLoading">
                <i v-if="formLoading" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-plus"></i>
                {{ formLoading ? t('loading') : t('addUser') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══════ EDIT USER MODAL ══════ -->
    <Transition name="modal-fade">
      <div v-if="showEditModal" class="msg-modal-overlay" @click.self="closeEditModal">
        <div class="msg-modal user-modal">
          <button class="msg-modal-close" @click="closeEditModal"><i class="fas fa-times"></i></button>
          <div class="user-modal-header">
            <div class="modal-avatar">{{ editForm.username?.charAt(0)?.toUpperCase() }}</div>
            <div>
              <h3>{{ t('editUser') }}</h3>
              <p>{{ editForm.username }}</p>
            </div>
          </div>

          <div class="user-form">
            <div class="form-row">
              <label>{{ t('username') }}</label>
              <input v-model="editForm.username" :placeholder="t('username')" class="form-input">
            </div>
            <div class="form-row">
              <label>{{ t('email') }}</label>
              <input v-model="editForm.email" type="email" :placeholder="t('email')" class="form-input">
            </div>
            <div class="form-row">
              <label>{{ t('role') }}</label>
              <select v-model="editForm.role" class="form-input">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="form-row">
              <label>{{ t('status') }}</label>
              <select v-model="editForm.is_active" class="form-input">
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </div>

            <div v-if="formError" class="form-error">
              <i class="fas fa-exclamation-circle"></i> {{ formError }}
            </div>
            <div v-if="formSuccess" class="form-success">
              <i class="fas fa-check-circle"></i> {{ formSuccess }}
            </div>

            <div class="form-actions">
              <button class="form-cancel-btn" @click="closeEditModal">{{ t('cancel') }}</button>
              <button class="form-submit-btn" @click="submitEditUser" :disabled="formLoading">
                <i v-if="formLoading" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-save"></i>
                {{ formLoading ? t('loading') : t('save') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══════ DELETE CONFIRM MODAL ══════ -->
    <Transition name="modal-fade">
      <div v-if="showDeleteModal" class="msg-modal-overlay" @click.self="showDeleteModal = false">
        <div class="msg-modal delete-modal">
          <div class="delete-icon"><i class="fas fa-trash-alt"></i></div>
          <h3>{{ t('confirmDelete') }}</h3>
          <p>{{ t('confirmDeleteDesc') }} <strong>{{ userToDelete?.username }}</strong>?</p>
          <div class="form-actions">
            <button class="form-cancel-btn" @click="showDeleteModal = false">{{ t('cancel') }}</button>
            <button class="form-submit-btn danger" @click="submitDelete" :disabled="formLoading">
              <i v-if="formLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-trash"></i>
              {{ formLoading ? t('loading') : t('delete') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══════ CHANGE PASSWORD MODAL ══════ -->
    <Transition name="modal-fade">
      <div v-if="showPasswordModal" class="msg-modal-overlay" @click.self="showPasswordModal = false">
        <div class="msg-modal user-modal">
          <button class="msg-modal-close" @click="showPasswordModal = false">
            <i class="fas fa-times"></i>
          </button>
          <div class="user-modal-header">
            <div class="modal-avatar">
              <i class="fas fa-key"></i>
            </div>
            <div>
              <h3>Change Password</h3>
              <p>Update your account password</p>
            </div>
          </div>

          <div class="user-form">
            <div class="form-row">
              <label>Current Password</label>
              <input v-model="passwordForm.old_password" type="password" class="form-input">
            </div>
            <div class="form-row">
              <label>New Password</label>
              <input v-model="passwordForm.new_password" type="password" class="form-input">
            </div>
            <div class="form-row">
              <label>Confirm Password</label>
              <input v-model="passwordForm.confirm_password" type="password" class="form-input">
            </div>

            <div v-if="formError" class="form-error">
              {{ formError }}
            </div>
            <div v-if="formSuccess" class="form-success">
              {{ formSuccess }}
            </div>

            <div class="form-actions">
              <button class="form-cancel-btn" @click="showPasswordModal = false">
                Cancel
              </button>
              <button type="button" class="form-submit-btn" @click.prevent="changePassword">
                <i class="fas fa-save"></i>
                Save Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router    = useRouter()
const authStore = useAuthStore()

const token = authStore.token
if (!token) router.push('/login')

const theme = ref(localStorage.getItem('dash-theme') || 'dark')
const lang  = ref(localStorage.getItem('dash-lang')  || 'en')

const username     = computed(() => authStore.username || 'Admin')
const userInitials = computed(() => username.value.slice(0, 2).toUpperCase())
const sidebarCollapsed = ref(false)
const activeSection    = ref('messages')
const search           = ref('')
const filterPurpose    = ref('')
const messages         = ref([])
const users            = ref([])
const next             = ref(null)
const previous         = ref(null)
const currentPage      = ref(1)
const isLoadingData    = ref(false)
const isLoadingUsers   = ref(false)
const selectedMessage  = ref(null)
const showNotifs       = ref(false)
const notifications    = ref([{ id: 1, text: 'New message received' }])

const showAddModal    = ref(false)
const showEditModal   = ref(false)
const showDeleteModal = ref(false)
const userToDelete    = ref(null)
const formLoading     = ref(false)
const formError       = ref('')
const formSuccess     = ref('')

const showPasswordModal = ref(false)

const passwordForm = ref({
  old_password: '',
  new_password: '',
  confirm_password: ''
})
const userForm = ref({ username: '', email: '', password: '', role: 'user' })
const editForm = ref({ id: null, username: '', email: '', role: 'user', is_active: true })

// ── i18n ──
const translations = {
  en: {
    messages: 'Messages', users: 'Users', profile: 'Profile', settings: 'Settings',
    totalMessages: 'Total Messages', partnerships: 'Partnerships', support: 'Support', purchases: 'Purchases',
    allMessages: 'All Messages', allTypes: 'All Types', noMessages: 'No messages found',
    name: 'Name', email: 'Email', type: 'Type', message: 'Message', date: 'Date',
    prev: 'Prev', next: 'Next', page: 'Page', search: 'Search messages...',
    usersManagement: 'Users Management', addUser: 'Add User', addUserDesc: 'Create a new user account',
    editUser: 'Edit User', totalUsers: 'Total Users', activeUsers: 'Active Users',
    adminUsers: 'Admins', inactiveUsers: 'Inactive', noUsers: 'No users found',
    user: 'User', role: 'Role', status: 'Status', joined: 'Joined', actions: 'Actions',
    edit: 'Edit', delete: 'Delete', view: 'View', save: 'Save Changes', cancel: 'Cancel', loading: 'Loading...',
    confirmDelete: 'Confirm Delete', confirmDeleteDesc: 'Are you sure you want to delete',
    password: 'Password', question: 'Question', buy: 'Buy',
    accountInfo: 'Account Information', username: 'Username', lastLogin: 'Last Login',
    language: 'Language', theme: 'Theme', darkMode: 'Dark Mode', lightMode: 'Light Mode',
    appearance: 'Appearance', themeMode: 'Theme Mode', themeModeDesc: 'Choose your preferred color scheme',
    dark: 'Dark', light: 'Light',
    languageSettings: 'Language', interfaceLang: 'Interface Language', interfaceLangDesc: 'Choose display language',
    accountSettings: 'Account', changePassword: 'Change Password', changePasswordDesc: 'Update your account password',
    change: 'Change', logout: 'Logout', logoutDesc: 'Sign out from your account',
    partnership: 'Partnership',
  },
  ar: {
    messages: 'الرسائل', users: 'المستخدمون', profile: 'الملف الشخصي', settings: 'الإعدادات',
    totalMessages: 'إجمالي الرسائل', partnerships: 'الشراكات', support: 'الدعم', purchases: 'المشتريات',
    allMessages: 'كل الرسائل', allTypes: 'كل الأنواع', noMessages: 'لا توجد رسائل',
    name: 'الاسم', email: 'البريد', type: 'النوع', message: 'الرسالة', date: 'التاريخ',
    prev: 'السابق', next: 'التالي', page: 'صفحة', search: 'ابحث...',
    usersManagement: 'إدارة المستخدمين', addUser: 'إضافة مستخدم', addUserDesc: 'إنشاء حساب مستخدم جديد',
    editUser: 'تعديل المستخدم', totalUsers: 'إجمالي المستخدمين', activeUsers: 'النشطون',
    adminUsers: 'المشرفون', inactiveUsers: 'غير النشطين', noUsers: 'لا يوجد مستخدمون',
    user: 'المستخدم', role: 'الدور', status: 'الحالة', joined: 'تاريخ الانضمام', actions: 'الإجراءات',
    edit: 'تعديل', delete: 'حذف', view: 'عرض', save: 'حفظ التغييرات', cancel: 'إلغاء', loading: 'جارٍ التحميل...',
    confirmDelete: 'تأكيد الحذف', confirmDeleteDesc: 'هل أنت متأكد من حذف',
    password: 'كلمة المرور', question: 'استفسار', buy: 'شراء',
    accountInfo: 'معلومات الحساب', username: 'اسم المستخدم', lastLogin: 'آخر تسجيل دخول',
    language: 'اللغة', theme: 'المظهر', darkMode: 'الوضع الداكن', lightMode: 'الوضع الفاتح',
    appearance: 'المظهر', themeMode: 'وضع المظهر', themeModeDesc: 'اختر نظام الألوان المفضل',
    dark: 'داكن', light: 'فاتح',
    languageSettings: 'اللغة', interfaceLang: 'لغة الواجهة', interfaceLangDesc: 'اختر لغة العرض',
    accountSettings: 'الحساب', changePassword: 'تغيير كلمة المرور', changePasswordDesc: 'تحديث كلمة مرور حسابك',
    change: 'تغيير', logout: 'تسجيل الخروج', logoutDesc: 'تسجيل الخروج من حسابك',
    partnership: 'شراكة',
  }
}
const t = (key) => translations[lang.value][key] || translations['en'][key] || key

const navItems = [
  { id: 'messages', label: 'messages', icon: 'fas fa-envelope', badge: null },
  { id: 'users',    label: 'users',    icon: 'fas fa-users',    badge: null },
  { id: 'profile',  label: 'profile',  icon: 'fas fa-user',     badge: null },
  { id: 'settings', label: 'settings', icon: 'fas fa-cog',      badge: null },
]

const currentSectionLabel = computed(() =>
  navItems.find(i => i.id === activeSection.value)?.label || 'messages'
)

const avatarColors = ['#42a5f5','#0077b6','#22c55e','#f59e0b','#8b5cf6','#ef4444','#06b6d4']
const avatarColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length]

const fetchMessages = async (url = 'https://ancs-website-backend-production.up.railway.app/api/messages/') => {
  isLoadingData.value = true
  let finalUrl = url
  if (search.value) finalUrl += (finalUrl.includes('?') ? '&' : '?') + `search=${search.value}`
  try {
    const res = await fetch(finalUrl, { headers: { Authorization: `Bearer ${authStore.token}` } })
    if (res.status === 401) return logout()
    const data = await res.json()
    messages.value = data.results || []
    next.value = data.next
    previous.value = data.previous
  } catch {
    messages.value = [
      { id: 1, name: 'Ahmed Hassan', email: 'ahmed@example.com', purpose: 'buy', message: 'I want to purchase ANCS for our company.', created_at: new Date().toISOString() },
      { id: 2, name: 'Sara Ali', email: 'sara@corp.com', purpose: 'support', message: 'Need help configuring GNS3 integration.', created_at: new Date(Date.now()-86400000).toISOString() },
      { id: 3, name: 'Omar Khaled', email: 'omar@tech.io', purpose: 'partnership', message: 'Would like to discuss a partnership.', created_at: new Date(Date.now()-172800000).toISOString() },
      { id: 4, name: 'Layla Mohamed', email: 'layla@uni.edu', purpose: 'question', message: 'Does ANCS support Juniper devices?', created_at: new Date(Date.now()-259200000).toISOString() },
    ]
  } finally {
    isLoadingData.value = false
  }
}

const fetchUsers = async () => {
  isLoadingUsers.value = true
  try {
    const res = await fetch('https://ancs-website-backend-production.up.railway.app/api/users/', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const data = await res.json()
    users.value = data
  } catch (err) {
    console.error('Users fetch error:', err)
  } finally {
    isLoadingUsers.value = false
  }
}

const filteredMessages = computed(() => {
  if (!filterPurpose.value) return messages.value
  return messages.value.filter(m => m.purpose === filterPurpose.value)
})

const nextPage = () => { if (next.value) { currentPage.value++; fetchMessages(next.value) } }
const prevPage = () => { if (previous.value) { currentPage.value--; fetchMessages(previous.value) } }
const openMessage = (msg) => { selectedMessage.value = msg }
const deleteMessage = (msg) => { console.log('Delete message:', msg) }
const formatDate = (d) => d ? new Date(d).toLocaleDateString(
  lang.value === 'ar' ? 'ar-EG' : 'en-US',
  { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
) : ''

const openAddModal = () => {
  userForm.value = { username: '', email: '', password: '', role: 'user' }
  formError.value = ''
  formSuccess.value = ''
  showAddModal.value = true
}
const closeAddModal = () => { showAddModal.value = false }

const submitAddUser = async () => {
  formError.value = ''
  formSuccess.value = ''
  if (!userForm.value.username || !userForm.value.password) {
    formError.value = 'Username and password are required.'
    return
  }
  formLoading.value = true
  try {
    const res = await fetch('https://ancs-website-backend-production.up.railway.app/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` },
      body: JSON.stringify({
        username: userForm.value.username,
        email:    userForm.value.email,
        password: userForm.value.password,
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.username?.[0] || data.email?.[0] || data.detail || 'Failed to create user')

    if (userForm.value.role === 'admin' && data.id) {
      await fetch(`https://ancs-website-backend-production.up.railway.app/api/users/${data.id}/update/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` },
        body: JSON.stringify({ role: 'admin' })
      })
    }

    formSuccess.value = 'User created successfully!'
    await fetchUsers()
    setTimeout(closeAddModal, 1200)
  } catch (err) {
    formError.value = err.message || 'Failed to create user.'
  } finally {
    formLoading.value = false
  }
}

const openEditModal = (user) => {
  editForm.value = {
    id:        user.id,
    username:  user.username,
    email:     user.email,
    role:      user.role,
    is_active: user.is_active,
  }
  formError.value = ''
  formSuccess.value = ''
  showEditModal.value = true
}
const closeEditModal = () => { showEditModal.value = false }

const submitEditUser = async () => {
  formError.value = ''
  formSuccess.value = ''

  if (!editForm.value.username) {
    formError.value = 'Username is required.'
    return
  }

  formLoading.value = true

  try {
    const res = await fetch(
      `https://ancs-website-backend-production.up.railway.app/api/users/${editForm.value.id}/update/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`
        },
        body: JSON.stringify({
          username: editForm.value.username,
          email: editForm.value.email,
          role: editForm.value.role,
          is_active: editForm.value.is_active,
        })
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Failed to update user')
    }

    formSuccess.value = 'User updated successfully!'

    await fetchUsers()

    setTimeout(() => {
      closeEditModal()
    }, 1200)

  } catch (err) {
    formError.value = err.message || 'Failed to update user.'
  } finally {
    formLoading.value = false
  }
}

const confirmDelete = (user) => {
  userToDelete.value = user
  formError.value = ''
  showDeleteModal.value = true
}

const submitDelete = async () => {
  formLoading.value = true
  try {
    const res = await fetch(`https://ancs-website-backend-production.up.railway.app/api/users/${userToDelete.value.id}/delete/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    if (!res.ok) throw new Error('Failed to delete user')
    showDeleteModal.value = false
    await fetchUsers()
  } catch (err) {
    formError.value = err.message || 'Failed to delete user.'
  } finally {
    formLoading.value = false
  }
}

const changePassword = async () => {
  formError.value = ''
  formSuccess.value = ''

  if (!passwordForm.value.old_password || !passwordForm.value.new_password || !passwordForm.value.confirm_password) {
    formError.value = 'All fields are required'
    return
  }

  if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
    formError.value = 'Passwords do not match'
    return
  }

  formLoading.value = true

  try {
    const res = await fetch(
      'https://ancs-website-backend-production.up.railway.app/api/change-password/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`
        },
        body: JSON.stringify({
          old_password: passwordForm.value.old_password,
          new_password: passwordForm.value.new_password
        })
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Failed to change password')
    }

    formSuccess.value = 'Password changed successfully'

    passwordForm.value = {
      old_password: '',
      new_password: '',
      confirm_password: ''
    }

    setTimeout(() => {
      logout()
      showPasswordModal.value = false
    }, 1200)

  } catch (err) {
    formError.value = err.message
  } finally {
    formLoading.value = false
  }
}

const setTheme    = (t) => { theme.value = t; localStorage.setItem('dash-theme', t) }
const setLang     = (l) => { lang.value  = l; localStorage.setItem('dash-lang',  l) }
const toggleTheme = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')
const toggleLang  = () => setLang(lang.value === 'en' ? 'ar' : 'en')
const logout      = () => { authStore.logout(); router.push('/') }

onMounted(() => {
  fetchMessages()
  fetchUsers()
})
</script>

<style scoped>
/* ══════════════ ROOT ══════════════ */
.dash-root {
  display: flex; min-height: 100vh;
  font-family: 'Sora', 'Inter', sans-serif;
  transition: background 0.3s, color 0.3s;
  padding-top: 0 !important;
}

/* DARK */
.dark {
  --bg: #070f1a; --bg2: #0d1b2a; --bg3: #112236;
  --border: rgba(255,255,255,0.07); --text: #e8edf2;
  --text2: rgba(255,255,255,0.5); --text3: rgba(255,255,255,0.3);
  --accent: #42a5f5; --accent2: #0077b6;
  --sidebar-bg: #060d16; --card-bg: rgba(255,255,255,0.03);
  --hover: rgba(255,255,255,0.05); --input-bg: rgba(255,255,255,0.05);
  --shadow: 0 4px 24px rgba(0,0,0,0.4);
}
/* LIGHT */
.light {
  --bg: #f0f4f8; --bg2: #ffffff; --bg3: #e8edf3;
  --border: rgba(0,0,0,0.09); --text: #1a2537;
  --text2: #4a5568; --text3: #9aa5b4;
  --accent: #0077b6; --accent2: #005f96;
  --sidebar-bg: #0d1b2a; --card-bg: #ffffff;
  --hover: rgba(0,0,0,0.03); --input-bg: rgba(0,0,0,0.04);
  --shadow: 0 4px 24px rgba(0,0,0,0.08);
}

/* ══════ SIDEBAR ══════ */
.sidebar {
  width: 260px; min-height: 100vh;
  background: var(--sidebar-bg);
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex; flex-direction: column; padding: 24px 16px;
  transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  position: relative; flex-shrink: 0;
}
.sidebar.collapsed { width: 72px; }
.sidebar.collapsed .logo-text,
.sidebar.collapsed .nav-label,
.sidebar.collapsed .nav-badge,
.sidebar.collapsed .user-meta,
.sidebar.collapsed .more-icon { display: none; }
.sidebar-logo { display: flex; align-items: center; gap: 12px; padding: 0 8px 28px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 20px; }
.sidebar-logo img { width: 36px; border-radius: 10px; flex-shrink: 0; }
.logo-text { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; background: linear-gradient(135deg, #42a5f5, #0096c7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; white-space: nowrap; }
.sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; border: none; background: none; color: var(--text2); font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; text-align: left; white-space: nowrap; overflow: hidden; position: relative; }
.rtl .nav-item { text-align: right; }
.nav-item i { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
.nav-item:hover { background: var(--hover); color: var(--text); }
.nav-item.active { background: linear-gradient(135deg, rgba(66,165,245,0.15), rgba(0,119,182,0.1)); color: var(--accent); border: 1px solid rgba(66,165,245,0.2); }
.nav-badge { margin-left: auto; background: var(--accent); color: #fff; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
.sidebar-user { display: flex; align-items: center; gap: 12px; padding: 14px 12px; border-radius: 12px; border-top: 1px solid rgba(255,255,255,0.06); margin-top: 12px; cursor: pointer; transition: background 0.2s; }
.sidebar-user:hover { background: var(--hover); }
.user-avatar { width: 38px; height: 38px; flex-shrink: 0; background: linear-gradient(135deg, #42a5f5, #0077b6); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; position: relative; }
.online-dot { position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px; background: #22c55e; border-radius: 50%; border: 2px solid var(--sidebar-bg); }
.user-meta { flex: 1; overflow: hidden; }
.user-name { display: block; font-size: 13.5px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role { display: block; font-size: 11.5px; color: var(--text3); }
.more-icon { color: var(--text3); font-size: 13px; }
.collapse-btn { position: absolute; bottom: 90px; right: -14px; width: 28px; height: 28px; border-radius: 50%; background: var(--bg3); border: 1px solid var(--border); color: var(--text2); font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 10; }
.collapse-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

/* ══════ MAIN ══════ */
.dash-main { flex: 1; display: flex; flex-direction: column; background: var(--bg); min-height: 100vh; overflow-x: hidden; }
.topbar { height: 70px; background: var(--bg2); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; box-shadow: var(--shadow); position: sticky; top: 0; z-index: 100; }
.topbar-left { display: flex; flex-direction: column; gap: 2px; }
.page-title { font-size: 18px; font-weight: 700; color: var(--text); line-height: 1.2; }
.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text3); }
.breadcrumb i { font-size: 9px; }
.topbar-right { display: flex; align-items: center; gap: 8px; }
.topbar-search { display: flex; align-items: center; gap: 10px; background: var(--input-bg); border: 1px solid var(--border); border-radius: 10px; padding: 8px 14px; }
.topbar-search i { color: var(--text3); font-size: 13px; }
.topbar-search input { background: none; border: none; color: var(--text); font-size: 13.5px; width: 200px; font-family: inherit; outline: none; }
.topbar-search input::placeholder { color: var(--text3); }
.icon-btn { width: 38px; height: 38px; border-radius: 10px; background: var(--input-bg); border: 1px solid var(--border); color: var(--text2); font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; position: relative; }
.icon-btn:hover { background: var(--hover); color: var(--accent); border-color: var(--accent); }
.lang-btn { font-size: 12px; font-weight: 700; font-family: inherit; width: auto; padding: 0 12px; }
.notif-dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 1.5px solid var(--bg2); }
.logout-btn { display: flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 10px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); color: #ef4444; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; }
.logout-btn:hover { background: #ef4444; color: #fff; }

/* ══════ CONTENT ══════ */
.content-area { flex: 1; padding: 28px 32px; overflow-y: auto; }
.section-content { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

/* STATS */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 28px; }
.stat-box { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; gap: 18px; transition: transform 0.2s, box-shadow 0.2s; }
.stat-box:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
.stat-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.stat-icon.blue { background: rgba(66,165,245,0.12); color: #42a5f5; }
.stat-icon.green { background: rgba(34,197,94,0.12); color: #22c55e; }
.stat-icon.orange { background: rgba(251,146,60,0.12); color: #fb923c; }
.stat-icon.purple { background: rgba(167,139,250,0.12); color: #a78bfa; }
.stat-icon.teal {background: rgba(20, 184, 166, 0.12);color: #14b8a6;}
.stat-info { display: flex; flex-direction: column; }
.stat-num { font-size: 26px; font-weight: 800; color: var(--text); line-height: 1.1; }
.stat-label { font-size: 12.5px; color: var(--text2); margin-top: 3px; }

/* TABLE */
.table-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
.table-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--border); }
.table-header h3 { font-size: 16px; font-weight: 700; color: var(--text); }
.table-actions { display: flex; align-items: center; gap: 10px; }
.filter-select { background: var(--input-bg); border: 1px solid var(--border); border-radius: 8px; color: var(--text); font-size: 13px; padding: 7px 12px; font-family: inherit; cursor: pointer; outline: none; }
.filter-select option { background: var(--bg); color: var(--text); }
.add-btn { display: flex; align-items: center; gap: 7px; background: var(--accent); border: none; border-radius: 10px; color: #fff; font-size: 13.5px; font-weight: 600; padding: 9px 18px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
.add-btn:hover { background: var(--accent2); transform: translateY(-1px); }
.loading-state { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.skeleton-row { height: 48px; background: linear-gradient(90deg, var(--hover) 25%, var(--input-bg) 50%, var(--hover) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 8px; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.empty-state { padding: 60px; text-align: center; color: var(--text3); }
.empty-state i { font-size: 40px; margin-bottom: 12px; display: block; }
.empty-state p { font-size: 14px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead tr { border-bottom: 1px solid var(--border); }
th { padding: 12px 20px; font-size: 12px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; text-align: left; white-space: nowrap; }
.rtl th { text-align: right; }
.table-row { border-bottom: 1px solid var(--border); transition: background 0.15s; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: var(--hover); }
td { padding: 14px 20px; font-size: 13.5px; color: var(--text); vertical-align: middle; }
.cell-user { display: flex; align-items: center; gap: 10px; font-weight: 500; }
.mini-avatar { width: 30px; height: 30px; border-radius: 8px; background: linear-gradient(135deg, #42a5f5, #0077b6); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
.cell-email { color: var(--text2); font-size: 13px; }
.cell-msg { color: var(--text2); max-width: 300px; }
.cell-date { color: var(--text3); font-size: 12.5px; white-space: nowrap; }

/* Badges */
.badge { padding: 4px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 700; text-transform: capitalize; }
.badge.buy { background: rgba(66,165,245,0.15); color: #42a5f5; }
.badge.support { background: rgba(251,146,60,0.15); color: #fb923c; }
.badge.question { background: rgba(167,139,250,0.15); color: #a78bfa; }
.badge.partnership { background: rgba(34,197,94,0.15); color: #22c55e; }
.role-badge { padding: 4px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 700; text-transform: capitalize; }
.role-badge.admin { background: rgba(239,68,68,0.15); color: #f87171; }
.role-badge.user { background: rgba(66,165,245,0.15); color: #42a5f5; }
.status-dot { font-size: 12.5px; font-weight: 600; }
.status-dot.active { color: #22c55e; }
.status-dot.inactive { color: var(--text3); }
.action-btns { display: flex; gap: 8px; }
.act-btn { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--border); background: var(--input-bg); cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.act-btn.edit { color: #42a5f5; }
.act-btn.edit:hover { background: rgba(66,165,245,0.15); border-color: #42a5f5; }
.act-btn.view { color: #22c55e; }
.act-btn.view:hover { background: rgba(34,197,94,0.15); border-color: #22c55e; }
.act-btn.delete { color: #ef4444; }
.act-btn.delete:hover { background: rgba(239,68,68,0.15); border-color: #ef4444; }

/* Pagination */
.pagination { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 18px 24px; border-top: 1px solid var(--border); }
.page-btn { display: flex; align-items: center; gap: 6px; padding: 8px 18px; border-radius: 10px; background: var(--input-bg); border: 1px solid var(--border); color: var(--text2); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; }
.page-btn:hover:not(:disabled) { background: var(--accent); border-color: var(--accent); color: #fff; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-info { font-size: 13px; color: var(--text3); }

/* ── PROFILE ── */
.profile-grid { display: grid; grid-template-columns: 340px 1fr; gap: 24px; }
.profile-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 32px; }
.main-profile { text-align: center; }
.profile-avatar-big { width: 90px; height: 90px; border-radius: 24px; background: linear-gradient(135deg, #42a5f5, #0077b6); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; color: #fff; margin: 0 auto 16px; border: 3px solid rgba(66,165,245,0.3); }
.profile-name { font-size: 22px; font-weight: 800; color: var(--text); margin-bottom: 8px; }
.profile-role-tag { display: inline-block; padding: 4px 14px; background: rgba(66,165,245,0.1); border: 1px solid rgba(66,165,245,0.25); border-radius: 20px; color: var(--accent); font-size: 12.5px; font-weight: 600; margin-bottom: 16px; }
.profile-bio { font-size: 13.5px; color: var(--text2); line-height: 1.6; margin-bottom: 24px; }
.profile-stats { display: flex; justify-content: center; gap: 32px; border-top: 1px solid var(--border); padding-top: 24px; }
.profile-stats > div { text-align: center; }
.profile-stats span { display: block; font-size: 22px; font-weight: 800; color: var(--text); }
.profile-stats p { font-size: 12px; color: var(--text3); margin-top: 2px; }
.info-card h3 { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
.info-card h3 i { color: var(--accent); }
.info-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border); }
.info-row:last-child { border-bottom: none; }
.info-label { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: var(--text2); }
.info-label i { color: var(--accent); width: 16px; text-align: center; }
.info-val { font-size: 13.5px; font-weight: 600; color: var(--text); }

/* ── SETTINGS ── */
.settings-grid { display: flex; flex-direction: column; gap: 20px; }
.settings-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 28px; }
.settings-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
.settings-card-header i { font-size: 18px; color: var(--accent); }
.settings-card-header h3 { font-size: 15px; font-weight: 700; color: var(--text); }
.setting-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border); gap: 20px; }
.setting-row:last-child { border-bottom: none; padding-bottom: 0; }
.danger-row { margin-top: 8px; }
.setting-info { flex: 1; }
.setting-name { display: block; font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.setting-name.danger { color: #ef4444; }
.setting-desc { font-size: 12.5px; color: var(--text3); }
.theme-toggle-group, .lang-options { display: flex; gap: 8px; }
.theme-opt, .lang-opt { display: flex; align-items: center; gap: 8px; padding: 9px 18px; border-radius: 10px; background: var(--input-bg); border: 1px solid var(--border); color: var(--text2); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; }
.theme-opt.active, .lang-opt.active { background: rgba(66,165,245,0.12); border-color: var(--accent); color: var(--accent); font-weight: 700; }
.lang-flag { font-size: 16px; }
.settings-action-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 10px; background: var(--input-bg); border: 1px solid var(--border); color: var(--text2); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap; }
.settings-action-btn:hover { background: var(--hover); color: var(--text); }
.settings-action-btn.danger { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); color: #ef4444; }
.settings-action-btn.danger:hover { background: #ef4444; color: #fff; }

/* ══════ MODALS ══════ */
.msg-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.msg-modal {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
  padding: 32px;
  box-shadow: 0 25px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03);
  position: relative;
  color: var(--text);
}
.msg-modal-close { position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border-radius: 10px; background: var(--hover); border: 1px solid var(--border); color: var(--text2); font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.msg-modal-close:hover { background: rgba(239,68,68,0.15); color: #ef4444; border-color: #ef4444; }

.msg-modal-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.modal-avatar { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, #42a5f5, #0077b6); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #fff; flex-shrink: 0; }
.msg-modal-header h3 { font-size: 17px; font-weight: 700; color: var(--text); }
.msg-modal-header a { font-size: 13px; color: var(--accent); text-decoration: none; }
.msg-modal-header .badge { margin-left: auto; }
.msg-modal-body { background: var(--input-bg); border: 1px solid var(--border); border-radius: 14px; padding: 20px; font-size: 14.5px; color: var(--text); line-height: 1.7; margin-bottom: 20px; }
.msg-modal-footer { display: flex; align-items: center; justify-content: space-between; }
.msg-modal-footer > span { font-size: 12.5px; color: var(--text3); }
.reply-btn { display: flex; align-items: center; gap: 8px; padding: 9px 20px; background: var(--accent); border-radius: 10px; color: #fff; text-decoration: none; font-size: 13.5px; font-weight: 600; transition: all 0.2s; }
.reply-btn:hover { background: var(--accent2); transform: translateY(-1px); }

.user-modal { max-width: 480px; }
.user-modal-header { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
.user-modal-header h3 { font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.user-modal-header p { font-size: 13px; color: var(--text3); }

.user-form { display: flex; flex-direction: column; gap: 16px; }
.form-row { display: flex; flex-direction: column; gap: 6px; }
.form-row label { font-size: 13px; font-weight: 600; color: var(--text2); }
.form-input {
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-size: 14px;
  padding: 13px 14px;
  font-family: inherit;
  outline: none;
  transition: all 0.25s;
  width: 100%;
}
.form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(66,165,245,0.1); }
.form-input option { background: var(--bg); color: var(--text); }

.form-error { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); border-radius: 10px; color: #fca5a5; font-size: 13px; }
.form-success { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); border-radius: 10px; color: #86efac; font-size: 13px; }

.form-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
.form-cancel-btn { padding: 10px 22px; border-radius: 10px; background: var(--input-bg); border: 1px solid var(--border); color: var(--text2); font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.2s; }
.form-cancel-btn:hover { background: var(--hover); color: var(--text); }
.form-submit-btn { display: flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 10px; background: var(--accent); border: none; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; }
.form-submit-btn:hover:not(:disabled) { background: var(--accent2); transform: translateY(-1px); }
.form-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.form-submit-btn.danger { background: #ef4444; }
.form-submit-btn.danger:hover:not(:disabled) { background: #dc2626; }

.delete-modal { max-width: 400px; text-align: center; padding: 40px 32px; }
.delete-icon { width: 70px; height: 70px; border-radius: 20px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); display: flex; align-items: center; justify-content: center; font-size: 28px; color: #ef4444; margin: 0 auto 20px; }
.delete-modal h3 { font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 12px; }
.delete-modal p { font-size: 14px; color: var(--text2); margin-bottom: 28px; line-height: 1.6; }
.delete-modal p strong { color: var(--text); }
.delete-modal .form-actions { justify-content: center; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; transform: scale(0.96); }

.rtl .nav-item { flex-direction: row-reverse; }
.rtl .cell-user { flex-direction: row-reverse; }
.rtl .topbar-left { text-align: right; }
.rtl .breadcrumb { flex-direction: row-reverse; }
.rtl .info-row { flex-direction: row-reverse; }
.rtl .info-label { flex-direction: row-reverse; }
.rtl .msg-modal-close { right: auto; left: 16px; }
.rtl .form-actions { justify-content: flex-start; }

.sidebar-back-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  margin-bottom: 18px;
  border: 1px solid rgba(66,165,245,0.2);
  border-radius: 12px;
  background: rgba(66,165,245,0.08);
  color: #42a5f5;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
  font-family: inherit;
}

.sidebar-back-btn:hover {
  background: #42a5f5;
  color: white;
  transform: translateX(-2px);
}

.sidebar-back-btn i {
  font-size: 13px;
}

@media (max-width: 1100px) { .stats-row { grid-template-columns: repeat(2, 1fr); } .profile-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .sidebar { display: none; } .content-area { padding: 20px 16px; } .topbar { padding: 0 16px; } .stats-row { grid-template-columns: repeat(2, 1fr); gap: 12px; } .topbar-search { display: none; } }
@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } .msg-modal-overlay { backdrop-filter: none !important; background: rgba(0,0,0,0.85) !important; } }
</style>