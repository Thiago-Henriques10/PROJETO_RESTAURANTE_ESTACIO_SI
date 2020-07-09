var express = require('express');
var users = require("./../inc/users");
var admin = require("./../inc/admin");
var menus = require("./../inc/menus");
var router = express.Router();

router.use(function(req, res, next){


    if (['/login'].indexOf(req.url) === -1 && !req.session.user){
        res.redirect("/admin/login");
    } else {
    next();
    }
});

router.use(function(req, res, next){

    req.menus = admin.getMenus(req);

    next();

});

router.get("/logout", function(req, res, next){

    delete req.session.user;

    res.redirect("/admin/login");

});

router.get('/', function(req, res, next) {
    
    admin.dashboard().then(data => {
        res.render("admin/index", admin.getParams(req, {
            data
        }));       
  
    }).catch(err => {

        console.log(err);
    })
    
});

router.post('/login', function(req, res, next) {

    if (!req.body.nome){
        users.render(req, res, "Preencha o campo Usuário.");
    } else if (!req.body.password){
        users.render(req, res, "Peencha o campo Senha.");
    } else {

        users.login(req.body.nome, req.body.password).then(user => {
            
            req.session.user = user;
            
            res.redirect("/admin");

        }).catch(err => {
            users.render(req, res, err.message || err);            
        });

    }

});

router.get('/login', function(req, res, next) {
    
      
    users.render(req, res, null);
  
    });


router.get('/menus', function(req, res, next) {
    
    menus.getMenus().then(data => {

        res.render("admin/menus", admin.getParams(req, {
            data
        }));

    });

});
    
router.post('/menus', function(req, res, next) {

    menus.save(req.fields, req.files).then(results => {
        res.send(results);
    }).catch(err =>{
        res.send(err);
    });
    // res.send(req.fields);
});
  
    
router.get('/cozinha', function(req, res, next) {
        res.render("admin/cozinha", admin.getParams(req));
  
    });


router.get('/pagamento', function(req, res, next) {
        res.render("admin/pagamento", admin.getParams(req));
  
    });


router.get('/pedido', function(req, res, next) {
        res.render("admin/pedido", admin.getParams(req));
  
    });


router.get('/relatorios', function(req, res, next) {
        res.render("admin/relatorios", admin.getParams(req, {
            date:{}
        }));
  
    });


router.get('/reservas', function(req, res, next) {
        res.render("admin/reservations", admin.getParams(req, {
            date:{}
        }));
  
    });


router.get('/usuarios', function(req, res, next) {
        res.render("admin/users", admin.getParams(req));
  
    });

router.get('/estoque', function(req, res, next) {
        res.render("admin/estoque", admin.getParams(req));
  
    });



module.exports = router;