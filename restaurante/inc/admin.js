const connection = require("./db");

var conn = require('./db');

module.exports = {
    
    dashboard(){

        return new Promise((resolve, reject)=>{

            conn.query(`SELECT
            (SELECT COUNT(*) FROM pedido where DT_PEDIDO = CURDATE()) AS nrpedidos,
            (SELECT COUNT(*) FROM cardapio) AS nrcardapios,
            (SELECT COUNT(*) FROM reserva where DATA_RESERVA = CURDATE()) AS nrreservas,
            (SELECT COUNT(*) FROM usuario where STATUS_USUARIO = 'Ativo') AS nrusuarios;`,

        (err, results) =>{

            if (err) {
                reject(err);
            }else{
                resolve(results[0]);
            }

            });


        });

    },

    getParams(req, params){

        return Object.assign({},{
           menus: req.menus,
           user: req.session.user
        }, params);

    },

    getMenus(req){

        let menus = [
            {
                text:"Tela Inicial",
                href:"/admin/",
                icon:"home",
                active:false

            },
            {
                text:"Pedido",
                href:"/admin/pedido",
                icon:"check-square-o",
                active:false

            },
            {
                text:"Menus",
                href:"/admin/menus",
                icon:"book",
                active:false

            },
            {
                text:"Pagamento",
                href:"/admin/pagamento",
                icon:"money",
                active:false

            },
            {
                text:"Reservas",
                href:"/admin/reservas",
                icon:"calendar-check-o",
                active:false

            },
            {
                text:"Cozinha",
                href:"/admin/cozinha",
                icon:"cutlery",
                active:false

            },
            {
                text:"Usuarios",
                href:"/admin/usuarios",
                icon:"users",
                active:false

            },
            {
                text:"Relatorios",
                href:"/admin/relatorios",
                icon:"area-chart",
                active:false

            },
            {
                text:"Estoque",
                href:"/admin/estoque",
                icon:"archive",
                active:false

            }

        ];

        menus.map(menu => {

            if (menu.href === `/admin${req.url}` ) menu.active = true;

        });

        return menus;

    }

};