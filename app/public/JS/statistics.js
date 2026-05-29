// Controle das estatísticas
let currentStat = 1;
const totalStats = 5;

function changeStatistic(direction) {
    // Esconder estatística atual
    document.getElementById(`stat-${currentStat}`).style.display = 'none';
    
    // Calcular próxima estatística
    currentStat += direction;
    
    // Verificar limites
    if (currentStat > totalStats) {
        currentStat = 1;
    } else if (currentStat < 1) {
        currentStat = totalStats;
    }
    
    // Mostrar nova estatística
    document.getElementById(`stat-${currentStat}`).style.display = 'block';
}