import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'

gsap.registerPlugin(ScrollTrigger)

const finePointer = window.matchMedia('(pointer: fine)').matches
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// v-magnetic : l'élément est légèrement attiré par le curseur
const magnetic = {
  mounted(el, binding) {
    if (!finePointer || reducedMotion) return
    const strength = binding.value || 0.35
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    el._magMove = (e) => {
      const rect = el.getBoundingClientRect()
      xTo((e.clientX - rect.left - rect.width / 2) * strength)
      yTo((e.clientY - rect.top - rect.height / 2) * strength)
    }
    el._magLeave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('mousemove', el._magMove)
    el.addEventListener('mouseleave', el._magLeave)
  },
  unmounted(el) {
    if (el._magMove) el.removeEventListener('mousemove', el._magMove)
    if (el._magLeave) el.removeEventListener('mouseleave', el._magLeave)
  }
}

createApp(App).directive('magnetic', magnetic).mount('#app')
