
/* jshint esversion:6 */

var http = require("http");
var fs = require("fs");



var available_classes = [
	{name: "english"},
	{name: "physics"},
	{name: "math"},
	{name: "programming"},
	{name: "history"},
	{name: "music"}
];

var schedule = [
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

function getSchedule() {
	var names = [];
	for (var item of schedule) {
		names.push(item.name);
	}
	return names;
}

function getAvailableClassNames() {
	var allNames = [];
	for (var item of available_classes) {
		allNames.push(item.name);
	}
	return allNames;
}

function getAllHomework() {
	var allHomework = [];
	for (var item of schedule) {
		(allHomework.push(item.name))+(": ")+(allHomework.push(item.homework));
	}
	return allHomework;
}

function getAllGrades() {
	var allGrades = [];
	for (var item of schedule) {
		(allGrades.push(item.name))+(": ")+(allGrades.push(item.grade));
	}
	return allGrades;
}

function getClassHomework(name) {
	for (var item of schedule) {
		if (item.name === name) {
			return item.homework;
		}
	}
}

function setClassHomework(name) {
	for (var item of schedule) {
		if (item.name === name) {
			item.homework = true;
		}
	}
}



var server = http.createServer((req, res) => {
    if (req.url === "/index.html" || req.url === "/"){
        fs.readFile("index.html", (err, data) => {
            res.write(data);
            res.end();
        });
    
    } else if(req.url === "/schedule") {
        if (req.method === "GET") {            
            // console.log("GET Request Worked!");
            res.write(JSON.stringify(getSchedule()));
            res.end();
        	}
	} else if(req.url === "/available_classes") {
        if (req.method === "GET") {            
            res.write(JSON.stringify(getAvailableClassNames()));
            res.end();
        	}
			
	} else if(req.url === "/all_homework") {
        if (req.method === "GET") {            
            res.write(JSON.stringify(getAllHomework()));
            res.end();
        	}
	
	} else if(req.url === "/all_grades") {
        if (req.method === "GET") {            
            res.write(JSON.stringify(getAllGrades()));
            res.end();
        	}		

	}	else if(req.url === "/add_class") {

		 if (req.method === "POST") {
            var queryData = "";

            req.on('data', function(data) {
                queryData += data;
                if(queryData.length > 1e6) {
                    queryData = "";
                    response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {
                console.log(queryData);
                schedule.push({name: queryData, homework: false});
            });
        }
        
    }	else if(req.url === "/class_homework_status") {

		 if (req.method === "POST") {
            var queryData2 = "";

            req.on('data', function(data) {
                queryData2 += data;
                if(queryData2.length > 1e6) {
                    queryData2 = "";
                    response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {
                // console.log(queryData2);
                // console.log(JSON.stringify(getClassHomework(queryData2)));
                res.write(JSON.stringify(getClassHomework(queryData2)));
                res.end();
                
            });
        }

    }	else if(req.url === "/set_homework_status") {

		 if (req.method === "POST") {
            var queryData3 = "";

            req.on('data', function(data) {
                queryData3 += data;
                if(queryData3.length > 1e6) {
                    queryData3 = "";
                    response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {
                console.log(setClassHomework(queryData3));
                setClassHomework(queryData3);
                
                // res.end();
                
            });
        }

    
    } else {
        res.write("This is not Erty's Server!");
        res.end();
    }
});



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







// for (var cls in classes) {
// 	console.log(cls + ": " + classes[cls].grade);

// }

server.listen(9050, () => {
    console.log("Server started on port 9050");
});
