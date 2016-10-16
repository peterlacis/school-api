
/* jshint esversion:6 */

var http = require("http");
var fs = require("fs");


var classes = [
	{
		name: "english",
		grade: "B",
		homework: false
	},
	{
		name: "programming",
		grade: "A+",
		homework: true
	},
	{
		name: "math",
		grade:"C",
		homework: false
	}
];

function getClassNames() {
	var names = [];
	for (var name in classes) {
		names.push(name);
	}
}

var server = http.createServer((req, res) => {
    if (req.url === "/index.html" || req.url === "/"){
        fs.readFile("index.html", (err, data) => {
            res.write(data);
            res.end();
        });
    
    } else if(req.url === "/classes") {
        if (req.method === "GET") {
            
            console.log("Get Request Worked!");
            
            res.write(JSON.stringify(classes));
            
            getClassNames(name);
            console.log(name);


            console.log(JSON.stringify(classes));
            


            res.end();

        	}
			
				// console.log(Object.keys(classes));
				// res.write(Object.keys(classes));
				// res.end();
				// return Object.keys(classes);
			



			// for (var cls of classes) {
			// 	if (cls.name === name) {
			// 	console.log(cls.name);
			// 	res.write(cls.name);
			// 	res.end();
			// 	// return cls;
			// 		}
			// 	}
			





            // var fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            // res.write(fortune);
            // res.end();
	        
        // } else if (req.method === "POST") {
        //     var queryData = "";

        //     req.on('data', function(data) {
        //         queryData += data;
                
        //         if(queryData.length > 1e6) {
        //             queryData = "";
        //             response.writeHead(413, {'Content-Type': 'text/plain'}).end();
        //             req.connection.destroy();
        //         }
        //     });

        //     req.on('end', function() {
        //         fortunes.push(queryData);
        //     });
        // }
    
    } else {
        res.write("This is not Erty's Server!");
        res.end();
    }
});










// function getClassByName(name) {
// 	return classes[name];
// }

// res.write(JSON.stringify(classes));

// function getClassNames() {
// 	var names = [];
// 	for (var name in classes) {
// 		names.push(name);
// 	}
// }

// function getClassNames() {
// 	return Object.keys(classes);
// }

// getClassByName("english");




for (var cls in classes) {
	console.log(cls + ": " + classes[cls].grade);

}

server.listen(9050, () => {
    console.log("Server started on port 9050");
});
