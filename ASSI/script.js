const apiKey = '......';

async function enviarMensajeAChatGPT(mensaje) {
    try {
        const respuesta = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'Tú eres ASSI una mascota ayudante. Estas enfocado a resolver dudas de jovenes menores de 18 años. Además proporcionas respuestas seguras y ayudas a los usuarios a entender los riesgos de internet.'
                },
                {
                    role: 'user',
                    content: mensaje
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const respuestaChatbot = respuesta.data.choices[0].message.content;

        return respuestaChatbot;
    } catch (error) {
        console.error('Error al enviar mensaje a la API de ChatGPT:', error);
        return 'Lo siento, ocurrió un error al procesar tu solicitud.';
    }
}

function toggleChat() {
    const bocadillo = document.getElementById("chat");
    bocadillo.style.display = (bocadillo.style.display === "none") ? "block" : "none";
}

function cerrarChat() {
    const bocadillo = document.getElementById("chat");
    bocadillo.style.display = "none";
    const chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML = ""; // Borra el contenido del chat al cerrarlo
}

function reproducirMensajePorAudio(mensaje) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(mensaje);

    utterance.lang = "es-ES"; // Cambia al idioma
    
    synth.speak(utterance);
}

async function enviarMensaje(event) {
    if (event.key === "Enter") {
        const mensajeInput = document.getElementById("mensaje");
        const mensaje = mensajeInput.value;
        const chatContainer = document.getElementById("chat-container");
        // Borra el contenido del input
        mensajeInput.value = ""; // Limpia el cuadro de texto

        // Agrega la pregunta del usuario al chat
        chatContainer.innerHTML += `<div class="user-message">Pregunta: ${mensaje}</div>`;

        chatContainer.innerHTML += `<div class="user-message">-----------</div>`;

        // Envía el mensaje a la API de ChatGPT 3.5-turbo
        const respuestaChatbot = await enviarMensajeAChatGPT(mensaje);

        // Agrega la respuesta del chatbot al chat
        chatContainer.innerHTML += `<div class="bot-message">ASSI: ${respuestaChatbot}</div>`;
        reproducirMensajePorAudio(respuestaChatbot);

        chatContainer.innerHTML += `<div class="user-message">-----------</div>`;
    }
}

// Iniciar la animación con un clic en la mascota
const movable = document.querySelector(".movable");
movable.addEventListener("click", () => {
    movable.style.animationPlayState = "running"; // Reanuda la animación al hacer clic
});

