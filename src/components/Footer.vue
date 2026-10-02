<template>
  <footer class="footer" ref="root">
    <div class="container">
      <div class="top">
        <p class="cta">
          Une idée en tête ?<br>
          <a href="#contact" class="cta-link">Parlons-en <span class="arrow">→</span></a>
        </p>
        <a href="#home" class="to-top" v-magnetic="0.5" aria-label="Retour en haut">↑</a>
      </div>

      <div class="giant" aria-hidden="true" ref="giant">
        <span v-for="(c, i) in giantChars" :key="i" class="g-char">{{ c }}</span><span class="g-char dot">.</span>
      </div>

      <div class="bottom">
        <span>© {{ year }} {{ profile.firstName }} {{ profile.lastName }}</span>
        <nav class="socials" aria-label="Réseaux">
          <a :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a :href="profile.github" target="_blank" rel="noopener">GitHub</a>
          <a :href="'mailto:' + profile.email">Email</a>
        </nav>
        <span class="made">Vue.js · Three.js · GSAP</span>
      </div>
    </div>
  </footer>
</template>

<script>
import { gsap } from 'gsap';
import { profile } from '../data/portfolio';

export default {
  name: 'SiteFooter',
  data() {
    return {
      profile,
      year: new Date().getFullYear(),
      giantChars: profile.lastName.split('')
    };
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.ctx = gsap.context(() => {
      gsap.from(this.$refs.giant.querySelectorAll('.g-char'), {
        yPercent: 100,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: { trigger: this.$refs.giant, start: 'top bottom', end: 'bottom bottom', scrub: 1 }
      });
    }, this.$el);
  },
  beforeUnmount() {
    if (this.ctx) this.ctx.revert();
  }
};
</script>

<style scoped>
.footer {
  background: var(--ink);
  color: #fff;
  padding-top: clamp(4rem, 8vw, 6rem);
  overflow: hidden;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cta {
  font-size: clamp(1.6rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.cta-link {
  color: var(--primary-light);
  text-decoration: none;
}

.cta-link .arrow {
  display: inline-block;
  transition: transform 0.4s var(--ease-out);
}

.cta-link:hover .arrow {
  transform: translateX(8px);
}

.to-top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  font-size: 1.4rem;
  text-decoration: none;
  transition: background 0.3s, border-color 0.3s;
}

.to-top:hover {
  background: var(--primary);
  border-color: var(--primary);
}

.giant {
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding-top: 1.5rem;
  font-size: clamp(3.5rem, 17vw, 17rem);
  font-weight: 800;
  line-height: 0.85;
  letter-spacing: -0.06em;
  user-select: none;
}

.g-char {
  display: inline-block;
}

.g-char.dot {
  color: var(--primary);
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1.8rem 0 2rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.socials {
  display: flex;
  gap: 1.5rem;
}

.socials a {
  text-decoration: none;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s;
}

.socials a:hover {
  color: var(--primary-light);
}

@media (max-width: 640px) {
  .bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
