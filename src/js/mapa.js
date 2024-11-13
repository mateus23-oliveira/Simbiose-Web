document.addEventListener("DOMContentLoaded", function () {
    // Inicialize o mapa no elemento com id 'map' e defina a posição inicial e o nível de zoom
    var map = L.map('map').setView([-15.7801, -47.9292], 4); // Brasil como exemplo

    // Adicione o tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crie um marcador para indicar a localização selecionada pelo usuário
    var marker = L.marker([-15.7801, -47.9292], { draggable: true }).addTo(map);

    // Função para buscar o endereço com base nas coordenadas (geocodificação reversa)
    function buscarEndereco(lat, lng) {
        var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.address) {
                    var endereco = `${data.address.road || ''}, ${data.address.suburb || ''}, ${data.address.city || data.address.town || ''}, ${data.address.state || ''}`;
                    document.getElementById('localizacao').value = endereco;
                } else {
                    document.getElementById('localizacao').value = "Endereço não encontrado";
                }
            })
            .catch(error => {
                console.error("Erro ao buscar o endereço:", error);
                document.getElementById('localizacao').value = "Erro ao buscar o endereço";
            });
    }

    // Atualiza o campo de localização quando o marcador é movido
    marker.on('dragend', function (event) {
        var marker = event.target;
        var position = marker.getLatLng();
        buscarEndereco(position.lat, position.lng);
    });

    // Atualiza a localização do marcador e busca o endereço quando o usuário clica no mapa
    map.on('click', function (e) {
        marker.setLatLng(e.latlng);
        buscarEndereco(e.latlng.lat, e.latlng.lng);
    });
});
