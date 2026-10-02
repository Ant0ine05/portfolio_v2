<template>
  <section id="parcours" class="parcours">
    <div class="panel" ref="panel">
      <div class="container section">
        <SectionHeading
          index="03"
          label="Parcours"
          title="Expériences & formations."
          highlight="formations."
          light
        />

        <div class="columns">
          <div v-for="col in columns" :key="col.key" class="col">
            <h3 class="col-title">
              <span class="col-icon" v-html="col.icon"></span>{{ col.title }}
            </h3>
            <div class="timeline" :ref="'tl-' + col.key">
              <span class="tl-track"></span>
              <span class="tl-progress"></span>
              <article v-for="item in col.items" :key="item.title + item.date" class="tl-item">
                <span class="tl-dot"></span>
                <div class="tl-head">
                  <h4>{{ item.title }}</h4>
                  <span class="tl-date">{{ item.date }}</span>
                </div>
                <p class="tl-place">{{ item.place }}</p>
                <ul v-if="item.points" class="tl-points">
                  <li v-for="pt in item.points" :key="pt"><span>+</span>{{ pt }}</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading.vue';
import { experiences, formations } from '../data/portfolio';

const svg = (path) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

export default {
  name: 'ParcoursSection',
  components: { SectionHeading },
  data() {
    return {
      columns: [
        {
          key: 'exp',
          title: 'Expériences professionnelles',
          icon: svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
          items: experiences
        },
        {
          key: 'form',
          title: 'Formations',
          icon: svg('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'),
          items: formations
        }
      ]
    };
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.$el.querySelectorAll('.tl-item').forEach((el) => el.classList.add('active'));
      return;
    }

    this.ctx = gsap.context(() => {
      // Le panneau sombre s'élargit en entrant dans l'écran
      gsap.fromTo(this.$refs.panel,
        { clipPath: 'inset(6% 4% 0% 4% round 48px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: this.$refs.panel, start: 'top 95%', end: 'top 20%', scrub: true }
        });

      this.columns.forEach((col) => {
        const ref = this.$refs['tl-' + col.key];
        const tl = Array.isArray(ref) ? ref[0] : ref;

        gsap.fromTo(tl.querySelector('.tl-progress'), { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: tl, start: 'top 65%', end: 'bottom 65%', scrub: true }
        });

        tl.querySelectorAll('.tl-item').forEach((item) => {
          gsap.from(item, {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: item, start: 'top 88%', once: true }
          });
          ScrollTrigger.create({ trigger: item, start: 'top 65%', toggleClass: 'active' });
        });
      });
    }, this.$el);
  },
  beforeUnmount() {
    if (this.ctx) this.ctx.revert();
  }
};
</script>

<style scoped>
.panel {
  background: var(--ink);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.panel::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.25), transparent 65%);
  pointer-events: none;
}

.columns {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(2.5rem, 6vw, 5rem);
}

.col-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}

.col-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--primary);
  color: #fff;
}

.col-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.timeline {
  position: relative;
  padding-left: 2.2rem;
}

.tl-track,
.tl-progress {
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  border-radius: 2px;
}

.tl-track {
  background: rgba(255, 255, 255, 0.1);
}

.tl-progress {
  background: var(--primary);
  transform-origin: top;
  box-shadow: 0 0 16px rgba(220, 38, 38, 0.6);
}

.tl-item {
  position: relative;
  padding: 1.4rem 1.5rem;
  margin-bottom: 1.1rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: background 0.5s var(--ease-out), border-color 0.5s var(--ease-out);
}

.tl-item:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(220, 38, 38, 0.4);
}

.tl-dot {
  position: absolute;
  left: calc(-2.2rem + 1px);
  top: 1.75rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--ink);
  border: 2px solid rgba(255, 255, 255, 0.25);
  transition: background 0.4s, border-color 0.4s, box-shadow 0.4s, transform 0.4s var(--ease-out);
}

.tl-item.active .tl-dot {
  background: var(--primary);
  border-color: var(--primary);
  box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.2);
  transform: scale(1.1);
}

.tl-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.tl-head h4 {
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.tl-date {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--primary-light);
  white-space: nowrap;
}

.tl-place {
  font-size: 0.9rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.2rem;
}

.tl-points {
  list-style: none;
  margin-top: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.78);
}

.tl-points span {
  color: var(--primary-light);
  font-weight: 800;
  margin-right: 0.55rem;
}

@media (max-width: 960px) {
  .columns {
    grid-template-columns: 1fr;
  }
}
</style>
