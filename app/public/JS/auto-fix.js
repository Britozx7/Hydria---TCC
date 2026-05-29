// Script para aplicar correções automáticas de header e footer
document.addEventListener('DOMContentLoaded', function() {
    // Função para garantir que o CSS de correção seja carregado
    function ensureFixCSS() {
        const existingLink = document.querySelector('link[href="/css/header-footer-fix.css"]');
        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/css/header-footer-fix.css';
            document.head.appendChild(link);
        }
    }

    // Função para colocar o body em layout de coluna e ajustar padding-top
    function getHeaderElement() {
        return document.querySelector('.main-header') || document.querySelector('#header') || document.querySelector('.desktop-header') || document.querySelector('header');
    }

    function updateBodyPadding() {
        const header = getHeaderElement();
        if (!header) {
            document.body.style.removeProperty('padding-top');
            return;
        }
        const rect = header.getBoundingClientRect();
        const h = Math.ceil(rect.height) || 0;
        try {
            document.body.style.setProperty('padding-top', h + 'px', 'important');
        } catch (e) {
            // fallback
            document.body.style.paddingTop = h + 'px';
        }
    }

    function fixHeaderInline() {
        const header = getHeaderElement();
        if (!header) return;
        try {
            header.style.setProperty('position', 'fixed', 'important');
            header.style.setProperty('top', '0px', 'important');
            header.style.setProperty('left', '0px', 'important');
            header.style.setProperty('right', '0px', 'important');
            header.style.setProperty('margin', '0', 'important');
            header.style.setProperty('padding', '0', 'important');
            header.style.setProperty('z-index', '1200', 'important');
        } catch (e) {
            header.style.position = 'fixed';
            header.style.top = '0px';
            header.style.left = '0px';
            header.style.right = '0px';
            header.style.margin = '0';
            header.style.padding = '0';
            header.style.zIndex = '1200';
        }
        // Move header para o topo do body se estiver dentro de outro container
        try {
            if (header.parentElement && header.parentElement !== document.body) {
                document.body.insertBefore(header, document.body.firstChild);
            }
        } catch (e) {
            // fallback: não bloqueia se mover falhar
        }
    }

    function fixBodyLayout() {
        document.body.style.display = 'flex';
        document.body.style.flexDirection = 'column';
        document.body.style.minHeight = '100vh';
        document.body.style.margin = '0';
        updateBodyPadding();
    }

    // Função para corrigir o main
    function fixMainLayout() {
        const main = document.querySelector('main');
        if (main) {
            main.style.flex = '1';
            main.style.minHeight = 'calc(100vh - 180px)';
        }
    }

    // Função para corrigir o footer
    function fixFooterLayout() {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.marginTop = 'auto';
            footer.style.flexShrink = '0';
            
            if (!footer.classList.contains('main-footer')) {
                footer.classList.add('main-footer');
            }
            // If this is a password/verification page, remove the default blue top border applied by header-footer-fix.css
            const isForgot = document.querySelector('.forgot-desktop') || document.querySelector('.forgot-mobile');
            const isVerify = document.querySelector('.verificacao-desktop') || document.querySelector('.verificacao-mobile');
            if (isForgot || isVerify) {
                try {
                    footer.style.setProperty('border-top', '0', 'important');
                    footer.style.setProperty('background-color', 'transparent', 'important');
                    footer.style.setProperty('background', 'transparent', 'important');
                } catch (e) {
                    footer.style.borderTop = '0';
                    footer.style.backgroundColor = 'transparent';
                }
            }
        }
    }

    // Aplicar todas as correções
    ensureFixCSS();
    fixBodyLayout();
    fixMainLayout();
    fixFooterLayout();

    // Garantir carregamento do script de validação de formulários
    function ensureFormValidationScript() {
        const existing = document.querySelector('script[src="/js/form-validation.js"]');
        if (!existing) {
            const s = document.createElement('script');
            s.src = '/js/form-validation.js';
            s.defer = true;
            document.head.appendChild(s);
        }
    }

    function ensureMobileProfileLink() {
        let profileLink = document.querySelector('.mobile-profile-link');
        if (!profileLink) {
            profileLink = document.createElement('a');
            profileLink.className = 'mobile-profile-link';
            profileLink.href = '/login';
            profileLink.setAttribute('aria-label', 'Acessar login');
            profileLink.innerHTML = '<i class="fas fa-user" aria-hidden="true"></i>';
            document.body.appendChild(profileLink);
        }
    }

    ensureFormValidationScript();
    ensureMobileProfileLink();

    // Aplicar correções novamente após o carregamento dos partials
    setTimeout(() => {
        fixFooterLayout();
        updateBodyPadding();
        fixHeaderInline();
    }, 500);

    // Recalcular padding quando a janela muda de tamanho
    window.addEventListener('resize', () => {
        updateBodyPadding();
        fixHeaderInline();
        ensureMobileProfileLink();
    });

    // Esconder botões de voltar em telas móveis (cobre casos onde CSS é sobrescrito)
    function hideBackButtonsOnMobile() {
        const shouldHide = window.innerWidth <= 900;
        document.querySelectorAll('.btn-voltar').forEach(el => {
            try {
                el.style.display = shouldHide ? 'none' : '';
            } catch (e) {
                // ignore
            }
        });
    }

    // executar inicialmente e ao redimensionar
    hideBackButtonsOnMobile();
    window.addEventListener('resize', hideBackButtonsOnMobile);

    // Observar mudanças no DOM que possam alterar a altura do header
    try {
        const observer = new MutationObserver(() => {
            updateBodyPadding();
            fixHeaderInline();
        });
        observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
    } catch (e) {
        // browsers muito antigos podem falhar no MutationObserver
    }
});

// Exportar funções para uso em outras páginas
window.HydriaFix = {
    ensureFixCSS: function() {
        const existingLink = document.querySelector('link[href="/css/header-footer-fix.css"]');
        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/css/header-footer-fix.css';
            document.head.appendChild(link);
        }
    },
    
    fixLayout: function() {
        fixBodyLayout();
        fixMainLayout();
        fixFooterLayout();
    }
};