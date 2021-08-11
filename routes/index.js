const express = require('express');
const router = express.Router();
const { ban_list, fix_ban_list } = require('../models');
const { Op, Sequelize } = require('sequelize');

const fix_ban = ['bat', 'cmd','com','cpl', 'exe', 'scr', 'js'];

router.get('/', async (req, res) => {
    const fix_Ban = await fix_ban_list.findAll({
        attributes: ['ban_extention'],
        raw: true,
    });
    let is_include = {bat: false, cmd:false, com: false, cpl: false, exe: false, scr: false, js: false}


    for(Fix of fix_Ban){
        for(let test of Object.keys(is_include))
        {
            if(Fix.ban_extention == test)
            {
                is_include[test] = true;
            }
        }
    }


    const var_Ban = await ban_list.findAll({});
    res.render('main',{
        fix_Ban,
        var_Ban,
        is_include,
    });
    
})

router.get('/ban/add/:exec', async(req, res, next) => {
    const exec = req.params.exec;
    fix_ban_list.create({
        ban_extention: exec
    })
    .then(
        res.send(exec)
    )
    .catch((err) => {
        console.error(err);
    })
})

router.get('/ban/delete/:exec', async(req, res, next) => {
    const exec = req.params.exec;
    fix_ban_list.destroy({
        where: { ban_extention: exec}
    })
    .then(
        res.send(exec)
    )
    .catch((err) => {
        console.error(err)
    })
})

router.get('/ban/var/add/:exec',async (req, res, next) => {
    const exec = req.params.exec;
    const count_ban = await ban_list.count({});
    const is_double = await ban_list.count({
        where: {
            ban_extention: exec
        }
    })
    if(count_ban > 200)
    {
        res.send('err_count');
    }
    else if(is_double > 0)
    {
        res.send('double_add');
    }
    else
    {
        ban_list.create({
            ban_extention: exec
        })
        .then(
            res.send('success')
        );
    }
})

router.get('/ban/var/del/:exec', async (req, res,next) => {
    const exec = req.params.exec;
    ban_list.destroy({
        where: {
            ban_extention: exec
        }
    })
    .then(() => {
        res.send(exec)
    })
    .catch((err) => {
        console.error(err);
    })
})

module.exports = router;
