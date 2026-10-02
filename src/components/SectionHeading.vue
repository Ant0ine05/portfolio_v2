<template>
  <header class="section-heading" :class="{ light }">
    <div class="eyebrow-row">
      <span class="badge">{{ index }}</span>
      <span class="label">{{ label }}</span>
      <span class="rule" ref="rule"></span>
    </div>
    <h2 class="title" :aria-label="title">
      <span
        v-for="(word, i) in words"
        :key="i"
        class="line-mask word-mask"
        aria-hidden="true"
      ><span class="word" :class="{ hl: isHighlight(word) }">{{ word }}</span></span>
    </h2>
    <p v-if="subtitle" class="subtitle" ref="subtitle">{{ subtitle }}</p>
  </header>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'SectionHeading',
  props: {
    index: { type: String, required: true },
    label: { type: String, required: true },
    title: { type: String, required: true },
    highlight: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    light: Boolean
  },
  computed: {
    words() {
      return this.title.split(' ');
    }
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: this.$el, start: 'top 82%', once: true }
      });
      tl.from(this.$el.querySelectorAll('.badge, .label'), { opacity: 0, y: 14, duration: 0.7, stagger: 0.08, ease: 'power3.out' })
        .from(this.$refs.rule, { scaleX: 0, duration: 1.2, ease: 'expo.out' }, 0.1)
        .from(this.$el.querySelectorAll('.word'), { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.06, ease: 'expo.out' }, 0.15);
      if (this.$refs.subtitle) {
        tl.from(this.$refs.subtitle, { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out' }, 0.45);
      }
    }, this.$el);
  },
  beforeUnmount() {
    if (this.ctx) this.ctx.revert();
  },
  methods: {
    isHighlight(word) {
      return !!this.highlight && word.replace(/[.,!?]/g, '') === this.highlight;
    }
  }
};
</script>

<style scoped>
.section-heading {
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.4rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--primary);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
}

.label {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.rule {
  flex: 1;
  height: 1px;
  background: var(--border);
  transform-origin: left;
}

.title {
  font-size: clamp(2.3rem, 6vw, 4.6rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.04em;
  max-width: 14em;
}

.word-mask {
  display: inline-block;
  margin-right: 0.22em;
  vertical-align: top;
}

.word {
  display: inline-block;
  transform-origin: left bottom;
}

.word.hl {
  color: var(--primary);
}

.subtitle {
  margin-top: 1.2rem;
  max-width: 520px;
  font-size: 1.08rem;
  color: var(--text-secondary);
}

.light .label,
.light .title {
  color: #fff;
}

.light .rule {
  background: rgba(255, 255, 255, 0.15);
}

.light .subtitle {
  color: rgba(255, 255, 255, 0.6);
}
</style>
