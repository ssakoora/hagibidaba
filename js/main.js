console.log("Starting Server");
var http = require("http");

http.createServer( function(request,response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('I love you Bujji Suganya\n');
	}).listen(8081);

console.log('server is running');