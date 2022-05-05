const express = require('express')
const app = express()
app.set('view engine', 'ejs');

app.listen(8000, function (err) {
    if (err) console.log(err);
})

// app.get('/', function (req, res) {
//     res.send(__dirname + '/main.html');
// })

const https = require('https');

app.get('/profile/:id', function (req, res) {
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    pokemon = ""

    https.get(url, function(https_res) {
        https_res.on("data", function(chunk) {
            pokemon += chunk
        })
        https_res.on("end", function() {
            // pokemon += chunk
            pokemon = JSON.parse(pokemon)

            tmp  = pokemon.stats.filter( (obj) =>{
                return obj.stat.name == "hp"
            }).map(
                (obj_2) =>{
                    return obj_2.base_stat
                }
            )
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": pokemon.name,
                "hp": tmp[0]
            });
        })
    });
    
    
    
})

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/main.html');
// })

app.use(express.static('./public'));
