<template>
<div>
    <footer>
        <div class="container">
            <p>&copy; 2025 Portfolio. Tous droits réservés.</p>
            <div class="social-links">
                <a href="https://www.linkedin.com/in/antoine-dalstein-999474266" title="LinkedIn">in</a>
                <a href="https://github.com/Ant0ine05" title="GitHub">GH</a>
                <a href="#" title="X">𝕏</a>
            </div>
        </div>
    </footer>
</div>
</template>
<script>
export default {
  name: 'App',
  components: {
   
  },
    data() {
        return {
    
        };
    },

    mounted() {
    
    },

    methods: {

    }
  
}
</script>
<style scoped>
footer {
    text-align: center;
    padding: 3rem var(--padding);
    border-top: 1px solid var(--border);
    color: var(--text-secondary);
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
}

.social-links a {
    width: 45px;
    height: 45px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.3s;
}

.social-links a:hover {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    transform: translateY(-3px);
}
</style>
