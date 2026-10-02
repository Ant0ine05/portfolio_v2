<template>
  <div class="app" :class="{ 'is-loading': !loaded }">
    <Preloader v-if="!preloaderGone" @reveal="onReveal" @done="preloaderGone = true" />
    <CustomCursor />
    <Navbarre :ready="loaded" />

    <main>
      <Hero :ready="loaded" />
      <Marquee />
      <About />
      <Skills />
      <Parcours />
      <Projet :projets="projects" />
      <Contact />
    </main>

    <Footer />
  </div>
</template>

<script>
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader.vue';
import CustomCursor from './components/CustomCursor.vue';
import Navbarre from './components/Navbarre.vue';
import Hero from './components/Hero.vue';
import Marquee from './components/Marquee.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Parcours from './components/Parcours.vue';
import Projet from './components/Projet.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';
import { projects } from './data/portfolio';

export default {
  name: 'App',
  components: {
    Preloader,
    CustomCursor,
    Navbarre,
    Hero,
    Marquee,
    About,
    Skills,
    Parcours,
    Projet,
    Contact,
    Footer
  },
  data() {
    return {
      projects,
      loaded: false,
      preloaderGone: false
    };
  },
  mounted() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.classList.add('lock-scroll');
    window.addEventListener('load', this.refresh);
  },
  beforeUnmount() {
    window.removeEventListener('load', this.refresh);
  },
  methods: {
    onReveal() {
      this.loaded = true;
      document.documentElement.classList.remove('lock-scroll');
      this.$nextTick(this.refresh);
    },
    refresh() {
      ScrollTrigger.refresh();
    }
  }
};
</script>

<style>
/* ======= DESIGN TOKENS — identité du CV ======= */
:root {
  --primary: #dc2626;
  --primary-dark: #b91c1c;
  --primary-light: #ef4444;
  --primary-soft: #fde4e4;
  --accent: #f6a1a1;

  --bg-dark: #f2efe9;
  --bg-card: #ffffff;
  --bg-light: #ffffff;
  --bg-highlight: #ece8e0;
  --ink: #17171a;
  --text-primary: #17171a;
  --text-secondary: #6b6f76;
  --border: #e6e1d8;

  --container-width: 1320px;
  --padding: clamp(1.25rem, 5vw, 4rem);
  --radius-lg: 28px;
  --radius-md: 20px;
  --radius-sm: 12px;
  --shadow-card: 0 2px 8px rgba(23, 23, 26, 0.04), 0 16px 40px -12px rgba(23, 23, 26, 0.08);
  --shadow-card-hover: 0 8px 20px rgba(220, 38, 38, 0.08), 0 30px 60px -20px rgba(23, 23, 26, 0.18);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

html.lock-scroll,
html.lock-scroll body {
  overflow: hidden;
}

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-dark);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::selection {
  background: var(--primary);
  color: #fff;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
}

button {
  font-family: inherit;
}

:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
  border-radius: 6px;
}

/* ======= LAYOUT ======= */
.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--padding);
}

section {
  position: relative;
  scroll-margin-top: 80px;
}

.section {
  padding: clamp(5rem, 12vw, 9rem) 0;
}

/* ======= BOUTONS ======= */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem 1.9rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.98rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background 0.3s var(--ease-out), color 0.3s var(--ease-out),
    border-color 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
  position: relative;
  overflow: hidden;
  isolation: isolate;
  white-space: nowrap;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 12px 30px -8px rgba(220, 38, 38, 0.55);
}

.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--ink);
  transform: translateY(101%);
  border-radius: inherit;
  transition: transform 0.5s var(--ease-out);
  z-index: -1;
}

.btn-primary:hover::after {
  transform: translateY(0);
}

.btn-secondary {
  background: #fff;
  color: var(--ink);
  border-color: var(--border);
}

.btn-secondary:hover {
  border-color: var(--ink);
}

.btn .arrow {
  display: inline-block;
  transition: transform 0.4s var(--ease-out);
}

.btn:hover .arrow {
  transform: translateX(4px) rotate(-45deg);
}

/* ======= PILLS (comme les compétences du CV) ======= */
.pill {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.9rem;
  border: 1.5px solid var(--primary);
  border-radius: 999px;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: #fff;
}

/* ======= MASQUES POUR REVEALS ======= */
.line-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}

.line-mask > span {
  display: inline-block;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
