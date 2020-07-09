let conn = require('./db');
const { PromiseConnection } = require('mysql2/promise');

module.exports = {

    getMenus(){

        return new Promise((resolve, reject) => {

            conn.query(`SELECT * FROM cardapio ORDER BY NOME_ITEM`
            , (err, results) => {

                if(err){
                    reject(err);
                } 
                
                resolve(results);
            });

        });


    },

    save(fields, files){

        return new Promise((resolve, reject) => {

            conn.query(`
                INSERT INTO cardapio (NOME_ITEM, DESCRICAO_ITEM, PRECO_ITEM, FOTO)
                VALUES(?, ?, ?, ?)
            ` , [
                fields.title,
                fields.description,
                fields.price,
                `admin/dist/img/${files.photo.name}`
            ], (err, results) => {

                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }

            });
        });

    }
    
};