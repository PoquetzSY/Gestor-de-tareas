import { useAuthStore } from '@/stores/authStore'

export default class RouterFacade {
  static isAuthenticated() {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      authStore.loadSession()
    }
    return authStore.isAuthenticated
  }
}
