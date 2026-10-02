<template>
  <div class="marquee-zone" ref="root" aria-label="Technologies">
    <div class="band band-red">
      <div class="track" ref="trackA">
        <span v-for="n in 2" :key="'a' + n" class="group">
          <span v-for="item in stack" :key="item" class="item">{{ item }}<i>✦</i></span>
        </span>
      </div>
    </div>
    <div class="band band-ink" aria-hidden="true">
      <div class="track" ref="trackB">
        <span v-for="n in 2" :key="'b' + n" class="group">
          <span v-for="word in words" :key="word" class="item">{{ word }}<i>✦</i></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stack } from '../data/portfolio';

export default {
  name: 'MarqueeBand',
  data() {
    return {
      stack,
      words: ['Web', 'Mobile', 'Data', 'UX / UI', 'API', 'Full-Stack', 'Responsive']
    };
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.ctx = gsap.context(() => {
      const a = gsap.to(this.$refs.trackA, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
      const b = gsap.fromTo(this.$refs.trackB, { xPercent: -50 }, { xPercent: 0, duration: 44, ease: 'none', repeat: -1 });

      // La vitesse du bandeau suit la vitesse de scroll
      ScrollTrigger.create({
        trigger: this.$refs.root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
          [a, b].forEach((t) => {
            gsap.to(t, { timeScale: boost, duration: 0.2, overwrite: true });
            gsap.to(t, { timeScale: 1, duration: 1.2, delay: 0.2, ease: 'power2.out' });
          });
        }
      });
    }, this.$el);
  },
  beforeUnmount() {
    if (this.ctx) this.ctx.revert();
  }
};
</script>

<style scoped>
.marquee-zone {
  position: relative;
  z-index: 5;
  padding: 3rem 0;
  overflow: hidden;
}

.band {
  width: 110%;
  margin-left: -5%;
  overflow: hidden;
  padding: 1.1rem 0;
}

.band-red {
  background: var(--primary);
  color: #fff;
  transform: rotate(-2.5deg);
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 40px -20px rgba(220, 38, 38, 0.6);
}

.band-ink {
  background: var(--ink);
  color: #fff;
  transform: rotate(2deg);
  margin-top: -2.6rem;
}

.track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.group {
  display: flex;
}

.item {
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding-right: 1.6rem;
  font-size: clamp(1.4rem, 3.2vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  white-space: nowrap;
}

.item i {
  font-style: normal;
  font-size: 0.6em;
  opacity: 0.7;
}

.band-ink .item i {
  color: var(--primary);
  opacity: 1;
}
</style>
