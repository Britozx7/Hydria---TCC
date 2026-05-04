const pool = require('../../config/pool_conexoes');

const UsuarioModel = {

    findAll: async ()=>{
        try{
            const [linhas] = await pool.query("select * from usuario where ativo = 1 or ativo is null");
            return linhas;
        }catch(erro){
            return erro;
        }
    },
    
    findById: async (id)=>{
        try{
            const [linhas] = await pool.query(
                "select * from usuario where idUsuario = ? ",
                [id]
            );
            return linhas;
        }catch(erro){
            return erro;
        }
    },

    create: async (dados)=>{
        /*
            formato json
            {
                nome:"nome de usuário",
                email:"email do usuário",
                senha:"senha do usuário"
            }
        */
       try{
            // Gerar idUsuario automaticamente (max + 1)
            const [rowsMax] = await pool.query("select max(idUsuario) as maxId from usuario");
            const nextId = (rowsMax && rowsMax[0] && rowsMax[0].maxId) ? rowsMax[0].maxId + 1 : 1;
            
            const [result] = await pool.query(
                "insert into usuario(`idUsuario`,`nome`,`email`,`senha`,`ativo`) "
                + "values(?,?,?,?,1)",
                [nextId, dados.nome, dados.email, dados.senha]
            )
            return result;      
       }catch(erro){
        return erro;
       }
    },

    // UPDATE - Todos os campos
    update: async (dados)=>{
        /*
            formato json
            {
                id: 9 
                nome:"nome de usuário",
                email:"email do usuário",
                senha:"senha do usuário",
            }
        */
       try{
            const [result] = await pool.query(
                "update usuario set `nome`= ? ,`email`= ?,`senha`= ? "
                + " where idUsuario = ?",
                [dados.nome, dados.email, dados.senha, dados.id]
            )
            return result;
       }catch(erro){
        return erro;
       }
    },

    // DELETE LÓGICO - marca como deletado (soft delete)
    deleteLogic: async (id)=>{
        try{
            const [result] = await pool.query(
                "update usuario set ativo = 0 where idUsuario = ?",
                [id]
            )
            return result;
        }catch(erro){
            return erro;
        }
    },

    // DELETE FÍSICO - remove do banco (hard delete)
    deleteFisic: async (id)=>{
        try{
            const [result] = await pool.query(
                "delete from usuario where idUsuario = ?",
                [id]
            )
            return result;
        }catch(erro){
            return erro;
        }
    },

}

module.exports = { UsuarioModel };