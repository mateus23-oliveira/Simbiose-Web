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

    acceptTermsCheckbox.addEventListener("change", function() {
        continueButton.disabled = !acceptTermsCheckbox.checked;
    });

    document.getElementById("termsForm").addEventListener("submit", function(event) {
        event.preventDefault();

        if (acceptTermsCheckbox.checked) {
            termsContainer.style.display = "none";
            containerHistory.style.display = "block"
            registrationForm.style.display = "block";
        } else {
            alert("Por favor, aceite os termos e condições para continuar.");
        }
    });

    function updateImagePreview(inputElement, previewElement) {
        const file = inputElement.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            previewElement.src = e.target.result;
            previewElement.style.display = 'block'; 
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    imagem1Input.addEventListener('change', function() {
        updateImagePreview(imagem1Input, imagePreview1);
    });

    imagem2Input.addEventListener('change', function() {
        updateImagePreview(imagem2Input, imagePreview2);
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                locationInput.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            }, function(error) {
                alert("Erro ao obter localização: " + error.message);
            });
        } else {
            alert("Geolocalização não é suportada neste navegador.");
        }
    }

    getLocationBtn.addEventListener('click', getLocation);

    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();  

        
        document.getElementById("registrationFormContainer").style.display = "none";

        document.getElementById("containerMensagem").style.display = "block";
    });
});
