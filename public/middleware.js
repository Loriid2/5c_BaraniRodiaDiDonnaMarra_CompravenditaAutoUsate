export const generateMiddleware=()=>{
    return{
        sendEmail : (to, subject, message) => {
            fetch("/send-email", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ to, subject, message })
            })
                .then(response => response.json())
                .then(json => {
                    if (json.success) {
                        console.log("Email inviata con successo:", json.messageId);
                    } else {
                        console.error("Errore durante l'invio dell'email:", json.error);
                    }
                })
                .catch(error => {
                    console.error("Errore di rete:", error);
                });
        }
    }
}
