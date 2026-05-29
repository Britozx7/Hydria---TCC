// Controle dos posts
let currentPost = 1;
const totalPosts = 4;

function changePost(direction) {
    // Esconder post atual
    document.getElementById(`post-${currentPost}`).style.display = 'none';
    
    // Calcular próximo post
    currentPost += direction;
    
    // Verificar limites
    if (currentPost > totalPosts) {
        currentPost = 1;
    } else if (currentPost < 1) {
        currentPost = totalPosts;
    }
    
    // Mostrar novo post
    document.getElementById(`post-${currentPost}`).style.display = 'block';
}