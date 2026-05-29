var express = require('express');
var router = express.Router(); 
const {body, validationResult} = require("express-validator")
// const {validarTelefone, validarDoacao} = require("../helpers/validacoes");
const { render, name } = require('ejs');
const { UsuarioModel } = require('../models/usuarioModel');

router.get('/', function(req, res) {
    res.render('pages/index')
})

router.get('/home', function (req, res) {
    res.render('pages/index')
})

router.get('/sobre', function (req, res) {
    res.render('pages/sobre')
})

router.get('/projetos', function (req, res) {
    res.render('pages/projetos')
})

router.get('/sobreInstitutoAguaViva', function (req, res) {
    res.render('pages/sobreInstitutoAguaViva')
})

router.get('/sobre-instituto-agua-viva', function (req, res) {
    res.render('pages/sobreInstitutoAguaViva')
})

router.get('/sobreinstitutoaguaviva', function (req, res) {
    res.render('pages/sobreInstitutoAguaViva')
})

router.get('/sobre-aguas-potiguara', function (req, res) {
    res.render('pages/sobreAguasPotiguara')
})

router.get('/sobre-um-milhao-de-cisternas', function (req, res) {
    res.render('pages/sobreUmMilhaoDeCisternas')
})

router.get('/doacao', function (req, res) {
    res.render('pages/doacao')
})

router.get('/doacoes', function (req, res) {
    res.render('pages/doações')
})

router.get('/doações', function (req, res) {
    res.render('pages/doações')
})

router.get('/selecionar-valor', function (req, res) {
    res.render('pages/selecionar-valor')
})

router.get('/selecionar-valor-doacao', function (req, res) {
    res.render('pages/selecionar-valor')
})

router.get('/pagamento', function (req, res) {
    res.render('pages/pagamento')
})

router.get('/forma-pagamento', function (req, res) {
    res.render('pages/pagamento')
})

router.get('/dopagamentoviapix', function (req, res) {
    res.render('pages/dopagamentoviapix')
})

router.get('/pagamento-via-pix', function (req, res) {
    res.render('pages/dopagamentoviapix')
})

router.get('/pagamentoCartaodeCredito', function (req, res) {
    res.render('pages/pagamentoCartaodeCredito')
})

router.get('/pagamento-cartaodecredito', function (req, res) {
    res.render('pages/pagamentoCartaodeCredito')
})

router.get('/editar-perfil', function (req, res) {
    res.render('pages/editar-perfil')
})

router.get('/auth/editar-perfil', function (req, res) {
    res.render('pages/editar-perfil')
})

router.get('/login', function(req, res) {
    res.render('pages/login')
})

router.get('/contato', function (req, res) {
    res.render('pages/contato')
})

router.get('/mensagem-enviada', function (req, res) {
    res.render('pages/mensagemEnviada')
})

router.get('/mensagemEnviada', function (req, res) {
    res.render('pages/mensagemEnviada')
})

router.get('/mensagem-aceita', function (req, res) {
    res.render('pages/mensagem-aceita')
})

router.get('/agradecimento-doacao', function (req, res) {
    res.render('pages/agradecimento-doacao')
})

router.get('/noticia01', function(req, res) {
    res.render('pages/noticia01')
})

router.get('/noticia02', function(req, res) {
    res.render('pages/noticia02')
})

router.get('/noticia03', function(req, res) {
    res.render('pages/noticia03')
})

router.get('/noticia04', function(req, res) {
    res.render('pages/noticia04')
})

router.get('/noticia05', function(req, res) {
    res.render('pages/noticia05')
})

router.get('/noticia06', function(req, res) {
    res.render('pages/noticia06')
})

router.get('/ranking25', function(req, res) {
    res.render('pages/ranking25')
})

router.get('/ranking24', function(req, res) {
    res.render('pages/ranking24')
})

router.get('/ranking23', function(req, res) {
    res.render('pages/ranking23')
})

router.get('/ranking22', function(req, res) {
    res.render('pages/ranking22')
})

router.get('/ranking21', function(req, res) {
    res.render('pages/ranking21')
})

router.get('/ranking20', function(req, res) {
    res.render('pages/ranking20')
})

router.get('/enviocont', function(req, res) {
    res.render('pages/enviocont')
})

router.get('/enviodoa', function(req, res) {
    res.render('pages/enviodoa')
})

router.get('/enviocad', function(req, res) {
    res.render('pages/enviocad')
})

router.get('/newsletter', function(req, res) {
    res.render('pages/newsletter')
})

router.get('/planoinicial', function(req, res) {
    res.render('pages/planoinicial')
})

router.get('/planoapoiador', function(req, res) {
    res.render('pages/planoapoiador')
})

router.get('/planoprofissional', function(req, res) {
    res.render('pages/planoprofissional')
})

router.get('/perfil', function(req, res) {
    res.render('pages/perfil')
});

router.get('/auth/cadastro', function(req, res) {
    res.render('pages/login')
});


//login
let login = []
router.get("/", (req, res) => {
    res.render("pages/login", {listaErros: null, valores:{loginEmail: '', loginPassword: ''}})
})

router.post("/login",
    body("loginEmail").isEmail().withMessage("Email inválido"),
    body("loginPassword").isLength({min:6}).withMessage("Mínimo 6 caracteres"),
    
    (req, res) => {
        const listaErros = validationResult(req)

        //receber dados do formulário
        if(listaErros.isEmpty()){
            login = []
            login.push(req.body.loginEmail)
            login.push(req.body.loginPassword)


            console.log('Novo Login:', login)
            return res.render('pages/enviologin')
                
        }else{
            res.render("pages/login", {
                listaErros: listaErros, 
                valores:{
                    loginEmail: req.body.loginEmail,
                    loginPassword: req.body.loginPassword
                }
            })
            console.log(listaErros)
        }
    }
)


//signup
router.post("/signup",
    body("signup_name").isLength({min:5}).withMessage("Nome inválido"),
    body("signup_email").isEmail().withMessage("Email inválido"),
    body("signup_password").isLength({min:6}).withMessage("Mínimo 6 caracteres"),
    
    async (req, res) => {
        const listaErros = validationResult(req)

        if(listaErros.isEmpty()) {
            try {
                const objDados = {
                    nome: req.body.signup_name,
                    email: req.body.signup_email,
                    senha: req.body.signup_password
                }
                const result = await UsuarioModel.create(objDados)
                console.log('Novo Cadastro:', objDados)
                res.render('pages/enviocad')
            } catch(erro) {
                console.log('Erro ao cadastrar:', erro)
                res.render('pages/login', {
                    listaErros: { errors: [{path: 'signup_email', msg: 'Erro ao salvar usuário'}] },
                    valores: {
                        signup_name: req.body.signup_name,
                        signup_email: req.body.signup_email,
                        signup_password: req.body.signup_password
                    }
                })
            }

        }else{
            res.render("pages/login", {
                listaErros: listaErros,
                valores: {
                    signup_name: req.body.signup_name,
                    signup_email: req.body.signup_email,
                    signup_password: req.body.signup_password
                }
            })
            console.log(listaErros)
        }
    }
)


// donations
const doacao = [];

router.get("/select", (req, res) => {
  res.render("pages/doacao", {
    listaErros: null,
    valores: { valorSelecionado: "", valorDigitado: "" },
  });
});

router.post(
  "/select",

  // Regra XOR: precisa ter botão OU input (não os dois, nem nenhum)
  body("valorSelecionado").custom((_, { req }) => {
    const sel = (req.body.valorSelecionado ?? "").toString().trim();
    const dig = (req.body.valorDigitado ?? "").toString().trim();

    const temSel = sel !== "";
    const temDig = dig !== "";

    if (!temSel && !temDig) {
      throw new Error("Selecione um valor ou digite um valor.");
    }
    if (temSel && temDig) {
      throw new Error("Use apenas uma opção: botão OU campo.");
    }
    return true;
  }),

  // Só valida número quando NÃO há seleção de botão
  body("valorDigitado")
    .if((value, { req }) => {
      const sel = (req.body.valorSelecionado ?? "").toString().trim();
      return sel === ""; // sem botão selecionado -> validar input
    })
    .isFloat({ gt: 0 })
    .withMessage("Digite um número válido maior que zero."),

  async (req, res) => {
    const listaErros = validationResult(req);

    if (!listaErros.isEmpty()) {
      return res.render("pages/doacao", {
        listaErros,
        valores: {
          valorSelecionado: req.body.valorSelecionado ?? "",
          valorDigitado: req.body.valorDigitado ?? "",
        },
      });
    }

    // Sucesso: pega só UM dos valores (prioriza o botão)
    const sel = (req.body.valorSelecionado ?? "").toString().trim();
    const dig = (req.body.valorDigitado ?? "").toString().trim();

    // limpa array
    doacao.length = 0;

    let valor = null;
    if (sel !== "") {
      valor = parseInt(sel, 10);
    } else if (dig !== "") {
      valor = parseFloat(dig);
    }

    if (valor !== null && !Number.isNaN(valor)) {
      doacao.push(valor);
      console.log("Valor doado:", doacao);
    }

    return res.render("pages/enviodoa");
  }
);

// Contato
let contato = []
router.get('/', (req, res) => {
    res.render('pages/contato', {
        listaErros: null,
        valores: { name: '', email: '', message: '', telephone: '' }
    });
});

router.post('/msg', 
    body('name').isLength({ min: 5}).withMessage('Nome inválido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('message').isLength({ min: 10}).withMessage('Mensagem inválida'),
    body('telephone').isLength({ min: 11}).withMessage('Telefone inválido'),

    (req, res) => {
        const listaErros = validationResult(req);

        if (listaErros.isEmpty()) {
            contato = []; // limpa lista
            contato.push(req.body.name);
            contato.push(req.body.email);
            contato.push(req.body.telephone);
            contato.push(req.body.message);

            console.log('Nova Mensagem:', contato);
            return res.render('pages/enviocont');
        }else{
            // Retorna para a página com os valores preenchidos e os erros
            res.render('pages/contato', {
                listaErros: listaErros,
                valores: { 
                    name: req.body.name,
                    email: req.body.email, 
                    telephone: req.body.telephone, 
                    message: req.body.message 
                }
            });
            console.log(listaErros)
        }

    }
    
);


module.exports = router;