<template>
  <section id="about" class="section about">
    <div class="container">
      <SectionHeading index="01" label="À propos" title="Un développeur qui soigne les détails." highlight="détails" />

      <p class="statement" ref="statement" :aria-label="profile.statement">
        <span v-for="(w, i) in statementWords" :key="i" class="sw" aria-hidden="true">{{ w + ' ' }}</span>
      </p>

      <div class="about-grid">
        <div class="stat-card" v-for="(stat, i) in profile.stats" :key="stat.label" ref="stats">
          <span class="stat-number">
            <span :ref="'count' + i">0</span><em>{{ stat.suffix }}</em>
          </span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>

        <div class="fiche" ref="fiche">
          <div class="fiche-row">
            <span class="fiche-key">Basé à</span>
            <span class="fiche-val">{{ profile.location }}</span>
          </div>
          <div class="fiche-row">
            <span class="fiche-key">Formation</span>
            <span class="fiche-val">{{ formations[0].title }}</span>
          </div>
          <div class="fiche-row">
            <span class="fiche-key">Langues</span>
            <span class="fiche-val langs">
              <span v-for="lang in languages" :key="lang.name" class="lang">
                {{ lang.name }}
                <span class="dots">
                  <i v-for="n in 3" :key="n" :class="{ on: n <= lang.level }"></i>
                </span>
              </span>
            </span>
          </div>
          <div class="fiche-row">
            <span class="fiche-key">Intérêts</span>
            <span class="fiche-val">{{ interests.join(' · ') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import SectionHeading from './SectionHeading.vue';
import { profile, formations, languages, interests } from '../data/portfolio';

export default {
  name: 'AboutSection',
  components: { SectionHeading },
  data() {
    return { profile, formations, languages, interests };
  },
  computed: {
    statementWords() {
      return this.profile.statement.split(' ');
    }
  },
  mounted() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.profile.stats.forEach((s, i) => { this.countEl(i).textContent = s.value; });
      return;
    }

    this.ctx = gsap.context(() => {
      // Le texte s'illumine au rythme du scroll
      gsap.fromTo(this.$refs.statement.querySelectorAll('.sw'),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: this.$refs.statement, start: 'top 80%', end: 'bottom 45%', scrub: true }
        });

      gsap.from([...this.$refs.stats, this.$refs.fiche], {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'expo.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: this.$refs.fiche, start: 'top 88%', once: true }
      });

      this.profile.stats.forEach((stat, i) => {
        const el = this.countEl(i);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: stat.value,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = Math.round(counter.v); },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        });
      });
    }, this.$el);
  },
  beforeUnmount() {
    if (this.ctx) this.ctx.revert();
  },
  methods: {
    countEl(i) {
      const ref = this.$refs['count' + i];
      return Array.isArray(ref) ? ref[0] : ref;
    }
  }
};
</script>

<style scoped>
.statement {
  font-size: clamp(1.6rem, 3.6vw, 3rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
  max-width: 22em;
  margin-bottom: clamp(3rem, 7vw, 5.5rem);
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 1.6fr;
  gap: 1.25rem;
}

.stat-card,
.fiche {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}

.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.8rem;
  min-height: 220px;
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover);
}

.stat-number {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
}

.stat-number em {
  font-style: normal;
  color: var(--primary);
}

.stat-label {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.fiche {
  padding: 0.6rem 1.8rem;
}

.fiche-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.92rem;
}

.fiche-row:last-child {
  border-bottom: none;
}

.fiche-key {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--primary);
  padding-top: 0.2rem;
}

.fiche-val {
  font-weight: 600;
}

.langs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.2rem;
}

.lang {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.dots {
  display: inline-flex;
  gap: 3px;
}

.dots i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--border);
}

.dots i.on {
  background: var(--primary);
}

@media (max-width: 1100px) {
  .about-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .fiche {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stat-card {
    min-height: 160px;
    padding: 1.3rem;
  }

  .stat-card:nth-child(3) {
    grid-column: 1 / -1;
  }

  .fiche-row {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
}
</style>
