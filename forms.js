
(function() {
    emailjs.init("oIIsEnWrns2v6ehzq");
})();

const sendEmail = (email, protocolo) => {
    const templateParams = {
        to_email: email,
        protocol: protocolo
    };

    emailjs.send('service_w2m0l6s', 'template_8o84eju', templateParams)
        .then(function(response) {
            const resultado = document.getElementById('resultado'); // Assume que você tem um elemento para exibir mensagens
            // resultado.classList.add('success');
            // resultado.innerText = "Mensagem enviada com sucesso!";
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            const resultado = document.getElementById('resultado'); // Assume que você tem um elemento para exibir mensagens
            // resultado.classList.add('error');
            // resultado.innerText = "Mensagem não enviada.";
            console.log('FAILED...', error);
        });
}


const nameValidate = (name) => {
    if (name.length < 5) {
        alert("O nome deve ter pelo menos 5 caracteres.");
        return false;
    }
    return true; 
}


const celValidate = (celular) => {
    if (celular.length !== 11) {
        alert("O número de celular deve conter 11 dígitos.");
        return false;
    }

    return true;

}

const generateProtocol = (celular) => {
    let ultimoDigeitos = celular.substring(celular.length - 4);

    const protocolo = ultimoDigeitos + Math.floor(Math.random() * 1000000);
    return protocolo;
}

const handleEvent = (event) => {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let celular = document.getElementById("celular").value;
    let email = document.getElementById("email").value;

    if (!nameValidate(usuario)){
        return;
    }

    if (!celValidate(celular)) {
        return;
    }


    let protocol = generateProtocol(celular);
    if (protocol) {
        sendEmail(email, protocol)
        console.log(protocol);
        
        document.getElementById("cadastroForm").reset();
    }
    


} 

document.getElementById("cadastroForm").addEventListener("submit", handleEvent);





