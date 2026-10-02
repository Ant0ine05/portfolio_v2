<template>
  <section id="contact" class="section contact">
    <div class="container">
      <SectionHeading
        index="05"
        label="Contact"
        title="Travaillons ensemble."
        highlight="ensemble."
        subtitle="Un projet, une opportunité, une question ? Écrivez-moi, je réponds rapidement."
      />

      <div class="contact-grid" ref="grid">
        <div class="side">
          <button class="mail-card" type="button" @click="copyEmail" data-cursor="Copier">
            <span class="mail-label">{{ copied ? 'Adresse copiée ✓' : 'Écrivez-moi directement' }}</span>
            <span class="mail-value">{{ profile.email }}</span>
            <span class="mail-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </span>
          </button>

          <component
            :is="link.href ? 'a' : 'div'"
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            :target="link.href ? '_blank' : null"
            :rel="link.href ? 'noopener' : null"
            class="link-card"
            :class="{ static: !link.href }"
          >
            <span class="link-icon" v-html="link.icon"></span>
            <span class="link-text">
              <span class="link-label">{{ link.label }}</span>
              <span class="link-value">{{ link.value }}</span>
            </span>
            <span v-if="link.href" class="link-arrow" aria-hidden="true">↗</span>
          </component>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="row-2">
            <div class="field">
              <input id="name" v-model="form.name" type="text" placeholder=" " required autocomplete="name">
              <label for="name">Nom complet</label>
            </div>
            <div class="field">
              <input id="email" v-model="form.mail" type="email" placeholder=" " required autocomplete="email">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="field">
            <input id="objet" v-model="form.objet" type="text" placeholder=" " required>
            <label for="objet">Objet</label>
          </div>
          <div class="field">
            <textarea id="message" v-model="form.message" placeholder=" " required rows="6"></textarea>
            <label for="message">Votre message</label>
          </div>

          <div class="form-foot">
            <p class="status" :class="status" role="status" aria-live="polite">{{ statusText }}</p>
            <button type="submit" class="btn btn-primary" :disabled="status === 'sending'" v-magnetic>
              {{ status === 'sending' ? 'Envoi…' : 'Envoyer le message' }} <span class="arrow">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com';
import { gsap } from 'gsap';
import SectionHeading from './SectionHeading.vue';
import { profile } from '../data/portfolio';

const svg = (path) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

export default {
  name: 'ContactSection',
  components: { SectionHeading },
  data() {
    return {
      profile,
      copied: false,
      status: '',
      form: { name: '', objet: '', mail: '', message: '' },
      links: [
        {
          label: 'LinkedIn',
          value: 'Antoine Dalstein',
          href: profile.linkedin,
          icon: svg('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>')
        },
        {
          label: 'GitHub',
          value: '@Ant0ine05',
          href: profile.github,
          icon: svg('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>')
        },
        {
          label: 'Localisation',
          value: profile.location,
          href: null,
          icon: svg('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>')
        }
      ]
    };
  },
  computed: {
    statusText() {
      if (this.status === 'success') return 'Message envoyé, merci ! Je reviens vers vous rapidement.';
      if (this.status === 'error') return "Oups, l'envoi a échoué. Réessayez ou écrivez-moi directement.";
      return '';
    }
  },
  mounted() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.ctx = gsap.context(() => {
      gsap.from(this.$refs.grid.querySelectorAll('.mail-card, .link-card, .contact-form'), {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'expo.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: this.$refs.grid, start: 'top 82%', once: true }
      });
    }, this.$el);
  },
  beforeUnmount() {
    if (this.ctx) this.ctx.revert();
    clearTimeout(this.copyTimer);
  },
  methods: {
    async copyEmail() {
      try {
        await navigator.clipboard.writeText(this.profile.email);
        this.copied = true;
        clearTimeout(this.copyTimer);
        this.copyTimer = setTimeout(() => { this.copied = false; }, 2200);
      } catch (e) {
        window.location.href = 'mailto:' + this.profile.email;
      }
    },
    handleSubmit() {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const dateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

      const templateParams = {
        name: this.form.name,
        email: this.form.mail,
        objet: this.form.objet,
        message: this.form.message,
        date: dateTime
      };

      this.status = 'sending';
      emailjs
        .send('service_syq6n4c', 'template_u7hfoon', templateParams, '8NymLaHCgqhEfQTGg')
        .then(() => {
          this.status = 'success';
          Object.keys(this.form).forEach((key) => { this.form[key] = ''; });
        })
        .catch((error) => {
          console.error('Erreur EmailJS:', error);
          this.status = 'error';
        });
    }
  }
};
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 1.25rem;
  align-items: start;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mail-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  padding: 2rem;
  text-align: left;
  border: none;
  border-radius: var(--radius-lg);
  background: var(--primary);
  color: #fff;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 25px 50px -20px rgba(220, 38, 38, 0.6);
}

.mail-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--ink);
  transform: translateY(101%);
  transition: transform 0.6s var(--ease-out);
  z-index: -1;
}

.mail-card:hover::after {
  transform: translateY(0);
}

.mail-label {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.85;
}

.mail-value {
  font-size: clamp(1.15rem, 2.2vw, 1.7rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  word-break: break-all;
}

.mail-icon {
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 22px;
  height: 22px;
  opacity: 0.8;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.3rem;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  text-decoration: none;
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
}

.link-card:not(.static):hover {
  transform: translateX(6px);
  box-shadow: var(--shadow-card-hover);
}

.link-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--primary);
  color: #fff;
}

.link-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.link-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.link-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.link-value {
  font-weight: 700;
}

.link-arrow {
  font-size: 1.2rem;
  color: var(--text-secondary);
  transition: color 0.3s, transform 0.4s var(--ease-out);
}

.link-card:hover .link-arrow {
  color: var(--primary);
  transform: translate(3px, -3px);
}

/* Formulaire */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
}

.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  position: relative;
}

.field input,
.field textarea {
  width: 100%;
  padding: 1.55rem 1.1rem 0.6rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-dark);
  color: var(--ink);
  font: inherit;
  font-size: 0.98rem;
  resize: vertical;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
}

.field textarea {
  min-height: 160px;
}

.field label {
  position: absolute;
  left: 1.1rem;
  top: 1.05rem;
  font-size: 0.98rem;
  color: var(--text-secondary);
  pointer-events: none;
  transform-origin: left top;
  transition: transform 0.35s var(--ease-out), color 0.3s;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
}

.field input:focus + label,
.field input:not(:placeholder-shown) + label,
.field textarea:focus + label,
.field textarea:not(:placeholder-shown) + label {
  transform: translateY(-0.6rem) scale(0.74);
  color: var(--primary);
  font-weight: 600;
}

.form-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
}

.status {
  font-size: 0.9rem;
  font-weight: 600;
}

.status.success {
  color: #15803d;
}

.status.error {
  color: var(--primary);
}

.btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .row-2 {
    grid-template-columns: 1fr;
  }

  .form-foot {
    flex-direction: column-reverse;
    align-items: stretch;
  }
}
</style>
