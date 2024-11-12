document.addEventListener("DOMContentLoaded", function() {
    const acceptTermsCheckbox = document.getElementById("acceptTerms");
    const continueButton = document.getElementById("continueButton");
    const termsContainer = document.getElementById("container");
    const containerHistory = document.getElementById("historico");
    const registrationForm = document.getElementById("registrationFormContainer");
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
            containerHistory.style.display = "block"
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
            previewElement.src = e.target.result;
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
        event.preventDefault();  // Impede o envio do formulário

        
        // Esconde o formulário de registro
        document.getElementById("registrationFormContainer").style.display = "none";

        // Exibe a mensagem de sucesso
        document.getElementById("containerMensagem").style.display = "block";
    });
});
