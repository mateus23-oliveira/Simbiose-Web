
(function() {
    emailjs.init("oIIsEnWrns2v6ehzq");
})();

const sendEmail = (email, protocolo, nome) => {
    const templateParams = {
        to_email: email,
        protocolo: protocolo,
        nome: nome
    };

    emailjs.send('service_w2m0l6s', 'template_8o84eju', templateParams)
        .then(function(response) {
            const resultado = document.getElementById('resultado'); 
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            const resultado = document.getElementById('resultado'); 
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
        sendEmail(email, protocol, usuario)
        console.log(protocol);
        
        window.location.href = "protocolo.html";
    }
    


} 


document.getElementById("cadastroForm").addEventListener("submit", handleEvent);





