<template>
  <div>
  <header class="nav-wrap" :class="{ hidden: hidden && !menuOpen, scrolled }" ref="nav">
    <div class="progress" :style="{ transform: `scaleX(${progress})` }"></div>
    <nav class="nav container" aria-label="Navigation principale">
      <a href="#home" class="logo" @click="closeMenu">
        {{ profile.firstName }} <strong>{{ profile.lastName }}</strong><span>.</span>
      </a>

      <ul class="links" ref="links">
        <li class="indicator" aria-hidden="true" :style="indicatorStyle"></li>
        <li v-for="link in links" :key="link.id">
          <a
            :href="'#' + link.id"
            :ref="'link-' + link.id"
            :class="{ active: active === link.id }"
          >{{ link.label }}</a>
        </li>
      </ul>

      <a href="#contact" class="btn btn-primary nav-cta" v-magnetic>Me contacter</a>

      <button
        class="burger"
        :class="{ open: menuOpen }"
        :aria-expanded="menuOpen"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <span></span><span></span>
      </button>
    </nav>
  </header>

    <div class="mobile-menu" :class="{ open: menuOpen }" ref="mobile">
      <ul>
        <li v-for="(link, i) in links" :key="link.id" class="line-mask">
          <a :href="'#' + link.id" class="m-link" @click="closeMenu">
            <span class="m-index">0{{ i + 1 }}</span>{{ link.label }}
          </a>
        </li>
      </ul>
      <div class="m-footer">
        <a :href="'mailto:' + profile.email">{{ profile.email }}</a>
        <div>
          <a :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a :href="profile.github" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { profile } from '../data/portfolio';

export default {
  name: 'NavBarre',
  props: { ready: Boolean },
  data() {
    return {
      profile,
      links: [
        { id: 'about', label: 'À propos' },
        { id: 'skills', label: 'Compétences' },
        { id: 'parcours', label: 'Parcours' },
        { id: 'portfolio', label: 'Projets' },
        { id: 'contact', label: 'Contact' }
      ],
      active: '',
      progress: 0,
      hidden: false,
      scrolled: false,
      menuOpen: false,
      indicatorStyle: { opacity: 0 }
    };
  },
  watch: {
    ready(val) {
      if (val) gsap.fromTo(this.$refs.nav, { yPercent: -120 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', delay: 0.5, clearProps: 'transform' });
    },
    active() {
      this.$nextTick(this.moveIndicator);
    }
  },
  mounted() {
    if (!this.ready) gsap.set(this.$refs.nav, { yPercent: -120 });

    this.lastY = window.scrollY;
    this.onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      this.progress = max > 0 ? y / max : 0;
      this.scrolled = y > 20;
      this.hidden = y > 400 && y > this.lastY;
      this.lastY = y;
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.moveIndicator);

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) this.active = entry.target.id === 'home' ? '' : entry.target.id;
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', ...this.links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.moveIndicator);
    if (this.observer) this.observer.disconnect();
    document.documentElement.classList.remove('lock-scroll');
  },
  methods: {
    moveIndicator() {
      const ref = this.$refs['link-' + this.active];
      const el = Array.isArray(ref) ? ref[0] : ref;
      if (!el) {
        this.indicatorStyle = { ...this.indicatorStyle, opacity: 0 };
        return;
      }
      this.indicatorStyle = {
        opacity: 1,
        width: el.offsetWidth + 'px',
        transform: `translateX(${el.offsetLeft}px)`
      };
    },
    toggleMenu() {
      this.menuOpen ? this.closeMenu() : this.openMenu();
    },
    openMenu() {
      this.menuOpen = true;
      document.documentElement.classList.add('lock-scroll');
      gsap.fromTo(
        this.$refs.mobile.querySelectorAll('.m-link'),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.2 }
      );
    },
    closeMenu() {
      if (!this.menuOpen) return;
      this.menuOpen = false;
      document.documentElement.classList.remove('lock-scroll');
    }
  }
};
</script>

<style scoped>
.nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: transform 0.5s var(--ease-out), background 0.3s, box-shadow 0.3s;
}

.nav-wrap.hidden {
  transform: translateY(-110%);
}

.nav-wrap.scrolled {
  background: rgba(242, 239, 233, 0.78);
  backdrop-filter: saturate(160%) blur(16px);
  -webkit-backdrop-filter: saturate(160%) blur(16px);
  box-shadow: 0 1px 0 var(--border);
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--primary);
  transform-origin: left;
  transform: scaleX(0);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  height: 76px;
}

.logo {
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 2;
}

.logo strong {
  font-weight: 800;
}

.logo span {
  color: var(--primary);
  font-weight: 800;
}

.links {
  position: relative;
  display: flex;
  list-style: none;
  padding: 0.35rem;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid var(--border);
  border-radius: 999px;
  box-shadow: var(--shadow-card);
}

.indicator {
  position: absolute;
  top: 0.35rem;
  bottom: 0.35rem;
  left: 0;
  background: var(--ink);
  border-radius: 999px;
  transition: transform 0.5s var(--ease-out), width 0.5s var(--ease-out), opacity 0.3s;
}

.links a {
  position: relative;
  display: block;
  padding: 0.5rem 1.05rem;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--text-secondary);
  border-radius: 999px;
  transition: color 0.3s;
}

.links a:hover {
  color: var(--ink);
}

.links a.active {
  color: #fff;
}

.nav-cta {
  padding: 0.7rem 1.3rem;
  font-size: 0.88rem;
}

/* Burger */
.burger {
  display: none;
  position: relative;
  z-index: 2;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--ink);
  cursor: pointer;
}

.burger span {
  position: absolute;
  left: 15px;
  right: 15px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: transform 0.4s var(--ease-out);
}

.burger span:first-child { transform: translateY(-4px); }
.burger span:last-child { transform: translateY(4px); }
.burger.open span:first-child { transform: rotate(45deg); }
.burger.open span:last-child { transform: rotate(-45deg); }

/* Menu mobile */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--bg-dark);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 110px var(--padding) 2.5rem;
  clip-path: circle(0% at calc(100% - 3rem) 2.4rem);
  transition: clip-path 0.8s var(--ease-out);
  pointer-events: none;
}

.mobile-menu.open {
  clip-path: circle(150% at calc(100% - 3rem) 2.4rem);
  pointer-events: all;
}

.mobile-menu ul {
  list-style: none;
}

.m-link {
  display: inline-flex;
  align-items: baseline;
  gap: 0.8rem;
  font-size: clamp(2.2rem, 11vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  text-decoration: none;
}

.m-index {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  letter-spacing: 0;
}

.m-footer {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.m-footer div {
  display: flex;
  gap: 1.5rem;
}

.m-footer a {
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 960px) {
  .links,
  .nav-cta {
    display: none;
  }

  .burger {
    display: block;
  }
}
</style>
