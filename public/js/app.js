// Função para tirar foto
document.getElementById('camera-btn').addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            const output = document.getElementById('output');
            output.innerHTML = '';
            output.appendChild(video);

            const button = document.createElement('button');
            button.innerText = 'Capturar Foto';
            output.appendChild(button);

            button.addEventListener('click', () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                video.pause();
                video.srcObject.getTracks().forEach(track => track.stop());
                output.innerHTML = '';
                output.appendChild(canvas);
            });
        }).catch(error => {
            alert('Erro ao acessar a câmera: ' + error);
        });
    } else {
        alert('Navegador não suporta acesso à câmera.');
    }
});

// Função para pegar localização
document.getElementById('geo-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const output = document.getElementById('output');
            output.innerHTML = `Latitude: ${position.coords.latitude}<br>Longitude: ${position.coords.longitude}`;
        }, error => {
            alert('Erro ao acessar localização: ' + error.message);
        });
    } else {
        alert('Geolocalização não suportada.');
    }
});
