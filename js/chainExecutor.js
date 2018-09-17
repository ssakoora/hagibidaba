var fs = require('fs');
var http = require('http');

function handleResponse(fileName, resp) {
	let data = ''; 	
	resp.on('data', (chunk) => {data += chunk;}); 
	resp.on('end', () => { writeDataToFile(fileName, data); }); 
	resp.on('error', (err) => {console.log(err)}); 
}


function storeResponse(fileName) {
	return function(resp) {
		handleResponse(fileName, resp);
	}
}


function writeDataToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) => {
		if(err) {
			console.log("Error writing " + fileName);
		}
		console.log("Written file " + fileName);
	});
}


function digData(data) {
	do 
	{
		var responseHandler = handleResponse.bind(this, data['jobName']);
		//http.get(data['jobLink'], storeResponse(data['jobName']));
		http.get(data['jobLink'], responseHandler); 
		data = data.next;
	}while(data);
}



function fileReadCallBack(error, data) {
	if(error)
		throw (error);
	else
		console.log(JSON.parse(data));
		digData(JSON.parse(data));
}

fs.readFile('chain_config.json', fileReadCallBack);
