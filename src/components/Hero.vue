<template>
  <section class="hero" id="home" ref="root">
    <div class="hero-bg" ref="bg">
      <Background />
      <Hero3D />
    </div>

    <div class="container hero-inner" ref="inner">
      <p class="eyebrow" ref="eyebrow">
        <span class="status-dot"></span>
        {{ profile.role }} · {{ profile.location }}
      </p>

      <h1 class="hero-title" :aria-label="profile.firstName + ' ' + profile.lastName">
        <span class="row" aria-hidden="true">
          <span class="line-mask"><span v-for="(c, i) in firstChars" :key="'f' + i" class="char">{{ c }}</span></span>
          <span
            class="capsule"
            ref="capsule"
            @mousemove="onCapsuleMove"
            @mouseleave="onCapsuleLeave"
          >
            <img :src="profile.photo" :alt="profile.firstName + ' ' + profile.lastName" ref="photo">
          </span>
        </span>
        <span class="row row-2" aria-hidden="true">
          <span class="line-mask"><span v-for="(c, i) in lastChars" :key="'l' + i" class="char">{{ c }}</span><span class="char dot">.</span></span>
        </span>
      </h1>

      <div class="hero-bottom">
        <p class="tagline" ref="tagline">{{ profile.tagline }}</p>
        <div class="hero-buttons" ref="buttons">
          <a href="#portfolio" class="btn btn-primary" v-magnetic>Voir mes projets <span class="arrow">→</span></a>
          <a href="#contact" class="btn btn-secondary" v-magnetic>Me contacter</a>
        </div>
      </div>
    </div>

    <a href="#about" class="scroll-hint" ref="hint" aria-label="Défiler vers la suite">
      <span class="scroll-line"></span>
      <span>Scroll</span>
    </a>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import Background from './Background.vue';
import Hero3D from './Hero3D.vue';
import { profile } from '../data/portfolio';

export default {
  name: 'HeroSection',
  components: { Background, Hero3D },
  props: { ready: Boolean },
  data() {
    return {
      profile,
      firstChars: profile.firstName.split(''),
      lastChars: profile.lastName.split('')
    };
  },
  watch: {
    ready(val) {
      if (val) this.playIntro();
    }
  },
  mounted() {
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reduced) return;

    this.ctx = gsap.context(() => {
      gsap.set(this.$el.querySelectorAll('.char'), { yPercent: 115 });
      gsap.set([this.$refs.eyebrow, this.$refs.tagline, this.$refs.buttons, this.$refs.hint], { opacity: 0, y: 24 });
      gsap.set(this.$refs.capsule, { clipPath: 'inset(0 50% 0 50% round 999px)' });
      gsap.set(this.$refs.photo, { scale: 1.4 });

      // Parallax de sortie au scroll
      gsap.timeline({
        scrollTrigger: { trigger: this.$refs.root, start: 'top top', end: 'bottom top', scrub: true }
      })
        .to(this.$refs.inner, { yPercent: -18, opacity: 0.15, ease: 'none' }, 0)
        .to(this.$refs.bg, { yPercent: 25, scale: 1.08, ease: 'none' }, 0);
    }, this.$el);

    if (this.ready) this.playIntro();
  },
  beforeUnmount() {
    if (this.ctx) this.ctx.revert();
  },
  methods: {
    playIntro() {
      if (this.reduced || this.played) return;
      this.played = true;
      this.ctx.add(() => {
        gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
          .to(this.$el.querySelectorAll('.char'), { yPercent: 0, duration: 1.3, stagger: 0.035 })
          .to(this.$refs.capsule, { clipPath: 'inset(0 0% 0 0% round 999px)', duration: 1.3, ease: 'expo.inOut' }, 0.35)
          .to(this.$refs.photo, { scale: 1, duration: 1.6 }, 0.35)
          .to(this.$refs.eyebrow, { opacity: 1, y: 0, duration: 1 }, 0.5)
          .to([this.$refs.tagline, this.$refs.buttons], { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.7)
          .to(this.$refs.hint, { opacity: 1, y: 0, duration: 1 }, 1);
      });
    },
    onCapsuleMove(e) {
      if (this.reduced) return;
      const rect = this.$refs.capsule.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(this.$refs.photo, { xPercent: x * 10, yPercent: y * 10, scale: 1.12, duration: 0.6, ease: 'power3.out' });
    },
    onCapsuleLeave() {
      gsap.to(this.$refs.photo, { xPercent: 0, yPercent: 0, scale: 1, duration: 0.8, ease: 'power3.out' });
    }
  }
};
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 120px 0 90px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  will-change: transform;
}

.hero-inner {
  position: relative;
  z-index: 10;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  backdrop-filter: blur(8px);
}

.status-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
}

.status-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  animation: ping 2s var(--ease-out) infinite;
}

@keyframes ping {
  from { transform: scale(0.6); opacity: 1; }
  to { transform: scale(2); opacity: 0; }
}

.hero-title {
  font-size: clamp(3.4rem, 13vw, 11.5rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.055em;
}

.row {
  display: flex;
  align-items: center;
  gap: 0.15em;
}

.row-2 {
  justify-content: flex-end;
  padding-right: 0.05em;
}

.char {
  display: inline-block;
  will-change: transform;
}

.char.dot {
  color: var(--primary);
}

.capsule {
  display: inline-block;
  flex-shrink: 0;
  width: 1.55em;
  height: 0.78em;
  margin-top: 0.06em;
  border-radius: 999px;
  overflow: hidden;
  background: var(--ink);
  box-shadow: var(--shadow-card-hover);
}

.capsule img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-top: clamp(2rem, 5vw, 3.5rem);
}

.tagline {
  max-width: 440px;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  color: var(--text-secondary);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  z-index: 10;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-secondary);
}

.scroll-line {
  position: relative;
  width: 1.5px;
  height: 44px;
  background: var(--border);
  overflow: hidden;
}

.scroll-line::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 40%;
  background: var(--primary);
  animation: scrollLine 1.8s var(--ease-out) infinite;
}

@keyframes scrollLine {
  from { transform: translateY(-100%); }
  to { transform: translateY(260%); }
}

@media (max-width: 860px) {
  .hero-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .row-2 {
    justify-content: flex-start;
  }
}

@media (max-width: 520px) {
  .hero-buttons {
    width: 100%;
  }

  .hero-buttons .btn {
    flex: 1;
  }

  .scroll-hint {
    display: none;
  }
}
</style>
