<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <div class="cursor-ring" ref="ring" :class="{ hover: hovering, label: !!label }">
      <span v-if="label" class="cursor-label">{{ label }}</span>
    </div>
    <div class="cursor-dot" ref="dot"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'CustomCursor',
  data() {
    return {
      enabled: window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      hovering: false,
      label: ''
    };
  },
  mounted() {
    if (!this.enabled) return;
    const { ring, dot } = this.$refs;
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, opacity: 0 });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1 });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1 });

    this.onMove = (e) => {
      gsap.to([ring, dot], { opacity: 1, duration: 0.3, overwrite: 'auto' });
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };
    this.onOver = (e) => {
      const labelled = e.target.closest('[data-cursor]');
      this.label = labelled ? labelled.dataset.cursor : '';
      this.hovering = !!e.target.closest('a, button, input, textarea, [data-cursor]');
    };
    this.onLeave = () => gsap.to([ring, dot], { opacity: 0, duration: 0.3 });

    window.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseover', this.onOver);
    document.documentElement.addEventListener('mouseleave', this.onLeave);
  },
  beforeUnmount() {
    if (!this.enabled) return;
    window.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseover', this.onOver);
    document.documentElement.removeEventListener('mouseleave', this.onLeave);
  }
};
</script>

<style scoped>
.cursor-ring,
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10001;
  border-radius: 50%;
}

.cursor-ring {
  width: 38px;
  height: 38px;
  border: 1.5px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.35s var(--ease-out), height 0.35s var(--ease-out),
    background 0.35s var(--ease-out), border-color 0.35s var(--ease-out);
}

.cursor-ring.hover {
  width: 60px;
  height: 60px;
  background: rgba(220, 38, 38, 0.08);
}

.cursor-ring.label {
  width: 92px;
  height: 92px;
  background: var(--primary);
  border-color: var(--primary);
}

.cursor-label {
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.cursor-dot {
  width: 6px;
  height: 6px;
  background: var(--primary);
}
</style>
