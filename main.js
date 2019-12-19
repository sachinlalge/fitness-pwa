const URL= "http://125.17.190.230:",
        PORT= "9846",
        FOLDER="files";
var express = require('express'),
    connect = require('connect'),
    app = express();
    session = require('sesh/lib/core').session;
    
//app.use(express.compress());
app.use(express.static(__dirname + '/'+FOLDER));
//app.use('/'+FOLDER, express.static(__dirname + '/'+FOLDER));



app.get('*', function(req, res){
	//res.sendFile("index.html");
	res.redirect(URL+':'+PORT+"/"+FOLDER+'/index.html');
})

app.listen(PORT, function () {
  console.log('Strobus Test Web Master server is working on port 9846!');
});


