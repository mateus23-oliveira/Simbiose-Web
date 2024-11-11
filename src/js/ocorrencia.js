document.addEventListener("DOMContentLoaded", function() {
    const acceptTermsCheckbox = document.getElementById("acceptTerms");
    const continueButton = document.getElementById("continueButton");
    const termsContainer = document.getElementById("termsContainer");
    const registrationForm = document.getElementById("registrationForm");
    const successMessage = document.getElementById("successMessage");

    const imagem1Input = document.getElementById('imagem1');
    const imagem2Input = document.getElementById('imagem2');
    const imagePreview1 = document.getElementById('imagePreview1');
    const imagePreview2 = document.getElementById('imagePreview2');

    const locationInput = document.getElementById('localizacao');
    const getLocationBtn = document.getElementById('getLocationBtn');

    // Habilita o botão OK quando os termos são aceitos
    acceptTermsCheckbox.addEventListener("change", function() {
        continueButton.disabled = !acceptTermsCheckbox.checked;
    });

    // Ação ao submeter o formulário de termos
    document.getElementById("termsForm").addEventListener("submit", function(event) {
        event.preventDefault();

        if (acceptTermsCheckbox.checked) {
            // Esconde a div dos termos e mostra o formulário de registro
            termsContainer.style.display = "none";
            registrationForm.style.display = "block";
        } else {
            alert("Por favor, aceite os termos e condições para continuar.");
        }
    });

    // Função para atualizar a visualização das imagens
    function updateImagePreview(inputElement, previewElement) {
        const file = inputElement.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            previewElement.style.backgroundImage = `url(${e.target.result})`;
            previewElement.style.display = 'block'; // Exibe a imagem
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    // Eventos de mudança nos campos de imagem
    imagem1Input.addEventListener('change', function() {
        updateImagePreview(imagem1Input, imagePreview1);
    });

    imagem2Input.addEventListener('change', function() {
        updateImagePreview(imagem2Input, imagePreview2);
    });

    // Função para obter a localização
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // Obtém a latitude e longitude
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Exibe a localização no campo (latitude, longitude)
                locationInput.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            }, function(error) {
                alert("Erro ao obter localização: " + error.message);
            });
        } else {
            alert("Geolocalização não é suportada neste navegador.");
        }
    }

    // Adiciona um ouvinte de evento para o botão de localização
    getLocationBtn.addEventListener('click', getLocation);

    // Ação ao submeter o formulário de registro
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Aqui você pode adicionar a lógica de envio de dados, como a chamada ao EmailJS ou outro serviço

        // Esconde o formulário e exibe a mensagem de sucesso
        registrationForm.style.display = "none";
        
        // Criando a mensagem de sucesso dinamicamente
        const successMessageDiv = document.createElement('div');
        successMessageDiv.id = 'successMessage';
        successMessageDiv.innerHTML = `
            <p>Parabéns, você finalizou o registro da ocorrência!</p>
            <p>Confira os detalhes dessa ocorrência no seu email.</p>
        `;
        
        // Adiciona a mensagem de sucesso ao corpo da página
        document.body.appendChild(successMessageDiv);
        
        // Exibe a mensagem de sucesso
        
    });
});
