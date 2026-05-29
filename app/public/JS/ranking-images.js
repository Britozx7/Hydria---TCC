// Script para trocar imagem de fundo baseado na página
document.addEventListener('DOMContentLoaded', function() {
    const homeContainer = document.querySelector('.home-container');
    const currentPath = window.location.pathname;
    
    if (homeContainer) {
        // Mapear cada página para sua imagem específica
        const backgroundImages = {
            '/ranking24': '/images/ranking2024.jpg',
            '/ranking23': '/images/ranking2023.jpg',
            '/ranking22': '/images/ranking2022.jpg',
            '/ranking21': '/images/ranking2021.jpg',
            '/ranking20': '/images/ranking2020.jpg'
        };
        
        // Verificar se a página atual tem uma imagem específica
        if (backgroundImages[currentPath]) {
            homeContainer.style.backgroundImage = `url(${backgroundImages[currentPath]})`;
        }
    }
});