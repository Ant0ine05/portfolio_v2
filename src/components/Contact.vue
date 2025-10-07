<template>
    <div>
        <section id="contact">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">Contact</span>
                    <h2 class="section-title">Travaillons ensemble</h2>
                    <p class="section-subtitle">N'hésitez pas à me contacter pour discuter de votre projet</p>
                </div>
                <div class="contact-content">
                    <div class="contact-info">
                        <div class="contact-item">
                            <div class="contact-icon">📧</div>
                            <div class="contact-details">
                                <h4>Email</h4>
                                <p>antoine.dalstein@gmail.com</p>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">📍</div>
                            <div class="contact-details">
                                <h4>Localisation</h4>
                                <p>France</p>
                            </div>
                        </div>
                    </div>
                    <form class="contact-form" @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="name">Nom complet</label>
                            <input type="text" id="name" placeholder="Jean Dupont" v-model="form.name" required />
                        </div>
                        <div class="form-group">
                            <label for="name">Objet</label>
                            <input type="text" id="objet" placeholder="Demande d'information, collaboration, etc."
                                v-model="form.objet" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="jean.dupont@exemple.com" v-model="form.mail"
                                required />
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" placeholder="Parlez-moi de votre projet..." v-model="form.message"
                                required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Envoyer</button>
                    </form>
                    <!-- <pre>{{ form }}</pre> -->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
    name: 'App',
    data() {
        return {
            form: {
                name: "",
                objet: "",
                mail: "", // Attention : doit correspondre à from_email dans handleSubmit
                message: "",
                date: ""
            }
        };
    },
    methods: {
        handleSubmit() {
            const now = new Date();
            const dateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            // Crée un objet qui correspond exactement aux variables de ton template EmailJS
            const templateParams = {
                name: this.form.name,         // Utilise {{name}} dans le template
                email: this.form.mail,        // Utilise {{email}} dans le template
                objet: this.form.objet,       // Utilise {{objet}} dans le template
                message: this.form.message,    // Utilise {{message}} dans le template
                date: dateTime                 // Utilise {{date}} dans le template
            };

            emailjs.send(
                "service_syq6n4c",
                "template_u7hfoon",
                templateParams,
                "8NymLaHCgqhEfQTGg"
            )
                .then(() => {
                    alert("Email envoyé avec succès !");
                    // Reset du formulaire
                    Object.keys(this.form).forEach(key => {
                        this.form[key] = "";
                    });
                })
                .catch((error) => {
                    console.error("Erreur EmailJS:", error);
                    alert("Erreur lors de l'envoi de l'email.");
                });
        }
    }
}
</script>

<style scoped>
section#contact {
    background: var(--bg-dark);
}

.contact-content {
    max-width: 700px;
    margin: 0 auto;
}

.contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--bg-card);
    border-radius: 12px;
    border: 1px solid var(--border);
}

.contact-icon {
    width: 50px;
    height: 50px;
    background: rgba(220, 38, 38, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.contact-details h4 {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.3rem;
    text-transform: uppercase;
    font-weight: 600;
}

.contact-details p {
    font-weight: 600;
}

.contact-form {
    background: var(--bg-card);
    padding: 2.5rem;
    border-radius: 12px;
    border: 1px solid var(--border);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-primary);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 1rem;
    background: var(--bg-dark);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
}
</style>
