function armazenarRegistro(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const dataOcorrencia = document.getElementById('dataOcorrencia').value;
    const localizacao = document.getElementById('localizacao').value;

    

    const registro = {
        nome,
        dataOcorrencia,
        localizacao
    };

    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    registros.unshift(registro);

    if (registros.length > 10) {
        registros = registros.slice(0, 10);
    }

    localStorage.setItem('registros', JSON.stringify(registros));

    mostrarRegistros();
}

function registrarNovaOcorrencia() {
    document.getElementById("form").reset()

    document.getElementById('containerMensagem').style.display = 'none';

    document.getElementById('registrationFormContainer').style.display = 'block';
}

function mostrarRegistros() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const listaRegistros = document.getElementById('registrosList');

    listaRegistros.innerHTML = '';

    registros.forEach(registro => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${registro.nome}</strong> <span>${registro.dataOcorrencia}</span> <span>${registro.localizacao}</span>`;
        listaRegistros.appendChild(li);
    });
}

window.onload = mostrarRegistros;

document.getElementById('form').addEventListener('submit', armazenarRegistro);
