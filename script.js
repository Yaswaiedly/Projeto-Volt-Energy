// --- 1. SELEÇÃO DE ELEMENTOS ---
        const buttons = document.querySelectorAll('.flavor-btn');
        const title = document.getElementById('main-title');
        const desc = document.getElementById('main-description');
        const tag = document.getElementById('flavor-tag');
        const accent = document.getElementById('can-accent');
        const glow = document.getElementById('glow-effect');
        const bar = document.getElementById('energy-bar');
        const valText = document.getElementById('energy-value');
        const chargeBtn = document.getElementById('btn-charge');
        const root = document.documentElement;

        // --- 2. BANCO DE DADOS LOCAL (OBJETO) ---
        const flavors = {
            lime: {
                tag: "Edição Original",
                color: "#ccff00",
                desc: "A força cítrica que você precisa para virar a noite no código ou no jogo."
            },
            berry: {
                tag: "Edição Limitada",
                color: "#ff006e",
                desc: "Um mix intenso de frutas vermelhas com o dobro de taurina para máxima performance."
            },
            ice: {
                tag: "Refrescância Extrema",
                color: "#00d4ff",
                desc: "Sinta o choque térmico. Foco frio e calculista para momentos de alta pressão."
            }
        };

        // --- 3. FUNÇÕES DE INTERAÇÃO ---
        function switchFlavor(key) {
            const data = flavors[key];

            // Atualização de Textos
            tag.textContent = data.tag;
            desc.textContent = data.desc;

            // Atualização de Estilos Dinâmicos (DOM Style)
            root.style.setProperty('--primary-color', data.color);
            accent.setAttribute('fill', data.color);
            glow.style.backgroundColor = data.color;

            // Gerenciar classe 'active' nos botões
            buttons.forEach(b => b.classList.remove('active'));
            document.querySelector(`[data-flavor="${key}"]`).classList.add('active');
            
            // Reinicia a barra de energia
            resetEnergy();
        }

        let energyLevel = 0;

        function updateEnergy() {
            if (energyLevel < 100) {
                energyLevel += 10;
                bar.style.width = energyLevel + "%";
                valText.textContent = energyLevel + "%";

                if (energyLevel === 100) {
                    valText.textContent = "CARGA MÁXIMA!";
                    chargeBtn.style.background = "var(--primary-color)";
                    chargeBtn.style.color = "black";
                }
            }
        }

        function resetEnergy() {
            energyLevel = 0;
            bar.style.width = "0%";
            valText.textContent = "0%";
            chargeBtn.style.background = "transparent";
            chargeBtn.style.color = "white";
        }

        // --- 4. EVENT LISTENERS ---
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const flavor = btn.getAttribute('data-flavor');
                switchFlavor(flavor);
            });
        });

        chargeBtn.addEventListener('click', updateEnergy);