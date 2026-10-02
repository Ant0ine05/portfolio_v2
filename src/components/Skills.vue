<template>
  <section id="skills" class="section skills">
    <div class="container">
      <SectionHeading
        index="02"
        label="Compétences"
        title="Ma boîte à outils."
        highlight="outils."
        subtitle="Du front-end au mobile, en passant par la donnée : les technologies que j'utilise au quotidien."
      />

      <div class="bento" ref="bento">
        <article
          v-for="group in skillGroups"
          :key="group.key"
          class="cell card"
          :class="'cell-' + group.key"
          @mousemove="spotlight"
        >
          <span class="icon" v-html="icons[group.icon]"></span>
          <h3>{{ group.title }}</h3>
          <p>{{ group.text }}</p>
          <div class="pills">
            <span v-for="item in group.items" :key="item" class="pill">{{ item }}</span>
          </div>
        </article>

        <article class="cell cell-code" @mousemove="spotlight">
          <div class="code-top">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            <span class="file">antoine.js</span>
          </div>
          <pre class="code" ref="code"><code><span
            v-for="(line, li) in codeLines"
            :key="li"
            class="code-line"
          ><span class="ln">{{ li + 1 }}</span><span class="typed"><span
            v-for="(tok, ti) in line"
            :key="ti"
            :class="tok[1]"
          >{{ tok[0] }}</span></span>
</span><span class="caret"></span></code></pre>
        </article>

        <article class="cell cell-certif card" @mousemove="spotlight">
          <span class="icon" v-html="icons.award"></span>
          <h3>Certifications</h3>
          <ul class="certifs">
            <li v-for="c in certifications" :key="c"><span>+</span>{{ c }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import SectionHeading from './SectionHeading.vue';
import { skillGroups, certifications } from '../data/portfolio';

const svg = (path) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

export default {
  name: 'SkillsSection',
  components: { SectionHeading },
  data() {
    return {
      skillGroups,
      certifications,
      icons: {
        code: svg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
        database: svg('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>'),
        mobile: svg('<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>'),
        award: svg('<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>')
      },
      codeLines: [
        [['const ', 'k'], ['antoine', 'v'], [' = {', 'p']],
        [['  role', 'v'], [': ', 'p'], ["'Full-Stack'", 's'], [',', 'p']],
        [['  stack', 'v'], [': [', 'p'], ["'Vue'", 's'], [', ', 'p'], ["'Ionic'", 's'], [', ', 'p'], ["'Mongo'", 's'], ['],', 'p']],
        [['  curieux', 'v'], [': ', 'p'], ['true', 'k'], [',', 'p']],
        [['};', 'p']],
        [['', 'p']],
        [['await ', 'k'], ['antoine', 'v'], ['.', 'p'], ['ship', 'f'], ['(', 'p'], ["'votre projet'", 's'], [');', 'p']]
      ]
    };
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.ctx = gsap.context(() => {
      gsap.from(this.$refs.bento.querySelectorAll('.cell'), {
        y: 80,
        opacity: 0,
        scale: 0.94,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: this.$refs.bento, start: 'top 80%', once: true }
      });

      // Effet "machine à écrire" sur l'éditeur
      const lines = this.$refs.code.querySelectorAll('.typed');
      gsap.set(lines, { clipPath: 'inset(0 100% 0 0)' });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: this.$refs.code, start: 'top 85%', once: true },
        delay: 0.3
      });
      lines.forEach((line) => {
        const len = Math.max(line.textContent.length, 1);
        tl.to(line, { clipPath: 'inset(0 0% 0 0)', duration: len * 0.022, ease: `steps(${len})` });
      });
    }, this.$el);
  },
  beforeUnmount() {
    if (this.ctx) this.ctx.revert();
  },
  methods: {
    spotlight(e) {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
  }
};
</script>

<style scoped>
.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(240px, auto);
  gap: 1.25rem;
}

.cell {
  position: relative;
  border-radius: var(--radius-lg);
  padding: 2rem;
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
}

.cell::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(220, 38, 38, 0.12), transparent 60%);
}

.cell:hover::before {
  opacity: 1;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover);
}

.cell-front { grid-column: 1 / 3; grid-row: 1; }
.cell-code { grid-column: 3 / 5; grid-row: 1 / 3; }
.cell-back { grid-column: 5 / 7; grid-row: 1; }
.cell-mobile { grid-column: 1 / 3; grid-row: 2; }
.cell-certif { grid-column: 5 / 7; grid-row: 2; }

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--primary);
  color: #fff;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 24px -6px rgba(220, 38, 38, 0.5);
  transition: transform 0.5s var(--ease-out);
}

.icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.card:hover .icon {
  transform: rotate(-8deg) scale(1.08);
}

.cell h3 {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.cell p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

/* Éditeur de code */
.cell-code {
  background: var(--ink);
  color: #e8e6e3;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 60px -25px rgba(23, 23, 26, 0.6);
}

.cell-code::before {
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(220, 38, 38, 0.25), transparent 60%);
}

.code-top {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding-bottom: 1.2rem;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.code-top .dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.code-top .dot:first-child {
  background: var(--primary);
}

.file {
  margin-left: auto;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
}

.code {
  flex: 1;
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  font-size: clamp(0.78rem, 1.15vw, 0.95rem);
  line-height: 2;
  white-space: normal;
  overflow-x: auto;
}

.code-line {
  display: block;
  white-space: nowrap;
}

.ln {
  display: inline-block;
  width: 2em;
  color: rgba(255, 255, 255, 0.22);
  user-select: none;
}

.typed {
  display: inline-block;
  white-space: pre;
  vertical-align: top;
}

.k { color: #ff7b7b; }
.v { color: #f4f1ec; }
.s { color: #fcd9a1; }
.f { color: #f6a1a1; }
.p { color: rgba(255, 255, 255, 0.55); }

.caret {
  display: inline-block;
  width: 9px;
  height: 1.1em;
  margin-left: 2em;
  background: var(--primary);
  vertical-align: middle;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.certifs {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: auto;
  font-weight: 600;
}

.certifs span {
  color: var(--primary);
  font-weight: 800;
  margin-right: 0.6rem;
}

@media (max-width: 1000px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
  }

  .cell-front,
  .cell-back,
  .cell-mobile,
  .cell-certif {
    grid-column: span 1;
    grid-row: auto;
  }

  .cell-code {
    grid-column: 1 / -1;
    grid-row: auto;
    order: -1;
  }
}

@media (max-width: 600px) {
  .bento {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }

  .cell {
    padding: 1.6rem;
  }
}
</style>
