<template>
  <div class="preloader" ref="root" aria-hidden="true">
    <div class="layer layer-red" ref="red"></div>
    <div class="layer layer-ink" ref="ink">
      <div class="pre-inner">
        <p class="pre-name">
          <span class="line-mask"><span ref="first">{{ profile.firstName }}</span></span>
          <span class="line-mask"><span ref="last">{{ profile.lastName }}<em>.</em></span></span>
        </p>
        <div class="pre-bottom">
          <span class="pre-role" ref="role">{{ profile.role }}</span>
          <span class="pre-count" ref="count">{{ count }}</span>
        </div>
        <div class="pre-bar"><span ref="bar"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { profile } from '../data/portfolio';

export default {
  name: 'PreloaderIntro',
  emits: ['reveal', 'done'],
  data() {
    return { profile, count: 0 };
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.$emit('reveal');
      this.$emit('done');
      return;
    }

    const counter = { v: 0 };
    this.tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    this.tl
      .from([this.$refs.first, this.$refs.last], { yPercent: 110, duration: 1.1, stagger: 0.12 })
      .from(this.$refs.role, { opacity: 0, y: 10, duration: 0.8 }, 0.3)
      .to(counter, {
        v: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => { this.count = Math.round(counter.v); }
      }, 0.1)
      .fromTo(this.$refs.bar, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0.1)
      .to([this.$refs.first, this.$refs.last], { yPercent: -110, duration: 0.7, ease: 'expo.in', stagger: 0.05 }, '+=0.15')
      .to([this.$refs.role, this.$refs.count], { opacity: 0, duration: 0.3 }, '<')
      .add(() => this.$emit('reveal'))
      .to(this.$refs.ink, { yPercent: -100, duration: 1, ease: 'expo.inOut' })
      .to(this.$refs.red, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '<0.12')
      .add(() => this.$emit('done'));
  },
  beforeUnmount() {
    if (this.tl) this.tl.kill();
  }
};
</script>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  pointer-events: none;
}

.layer {
  position: absolute;
  inset: 0;
}

.layer-red {
  background: var(--primary);
}

.layer-ink {
  background: var(--ink);
  color: #fff;
  pointer-events: all;
}

.pre-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--padding);
}

.pre-name {
  font-size: clamp(3rem, 12vw, 9.5rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.pre-name em {
  font-style: normal;
  color: var(--primary);
}

.pre-bottom {
  position: absolute;
  left: var(--padding);
  right: var(--padding);
  bottom: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.pre-role {
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.pre-count {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.pre-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
}

.pre-bar span {
  display: block;
  height: 100%;
  background: var(--primary);
  transform-origin: left;
}
</style>
