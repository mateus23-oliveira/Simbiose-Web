// Função para armazenar o registro e exibir na sidebar
function armazenarRegistro(event) {
    event.preventDefault();

    // Obtendo os dados do formulário
    const nome = document.getElementById('nome').value;
    const dataOcorrencia = document.getElementById('dataOcorrencia').value;
    const localizacao = document.getElementById('localizacao').value;

    

    // Criando o registro
    const registro = {
        nome,
        dataOcorrencia,
        localizacao
    };

    // Verificando se o localStorage já possui registros
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Adicionando o novo registro ao início
    registros.unshift(registro);

    // Limitando a 10 registros
    if (registros.length > 10) {
        registros = registros.slice(0, 10);
    }

    // Armazenando os registros no localStorage
    localStorage.setItem('registros', JSON.stringify(registros));

    // Atualizando a lista de registros na sidebar
    mostrarRegistros();
}

function registrarNovaOcorrencia() {
    document.getElementById("form").reset()

    document.getElementById('containerMensagem').style.display = 'none';

    document.getElementById('registrationFormContainer').style.display = 'block';
}

// Função para exibir os registros na sidebar
function mostrarRegistros() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const listaRegistros = document.getElementById('registrosList');

    // Limpando a lista de registros
    listaRegistros.innerHTML = '';

    // Adicionando cada registro à lista
    registros.forEach(registro => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${registro.nome}</strong> <span>${registro.dataOcorrencia}</span> <span>${registro.localizacao}</span>`;
        listaRegistros.appendChild(li);
    });
}

// Exibindo os registros ao carregar a página
window.onload = mostrarRegistros;

// Adicionando o evento de envio do formulário
document.getElementById('form').addEventListener('submit', armazenarRegistro);
