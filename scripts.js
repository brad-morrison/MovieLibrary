        window.onload = 
        function getXML()
        {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    createArrayFromXML(this);
                }
            }
            xhttp.open("GET", "movie-list.xml", true);
            xhttp.send();
        }

        function createArrayFromXML(xml)
        {
            var x, i, xmlDoc, txt;
            var movies = [];
            var posterLinks = [];

            xmlDoc = xml.responseXML;
            txt = "";
            x = xmlDoc.getElementsByTagName("title");
            
            for (i=0;i<x.length;i++)
            {
                // add to array
                movies.push(x[i].innerHTML);
                console.log(x);
                // add to list
                addBoxToHTML(i+1, movies);
            }
        }

        function addBoxToHTML(counter, movies)
        {
            // create skeleton item
            var container = document.getElementById("container");
            var lastItem = document.getElementById("item-" + counter-1);
            
            var newItem = document.createElement("div");

            newItem.className = "item";
            newItem.id = "item-" + counter;
            newItem.innerHTML = 

            '<img src="" id="poster">\
            <div class="overlay" id="overlay" style="cursor: pointer" onclick="write()">\
                <div class="text-box" id="textbox">\
                    <div class="text" id="title">aaa</div>\
                </div>\
            </div>';
            
            container.insertBefore(newItem, lastItem);

            // get nodes to set
            var item = document.getElementById("item-" + counter);
            var poster = item.childNodes[0];
            var overlay = item.childNodes[2];
            var textbox = overlay.childNodes[1];
            var text = textbox.childNodes[1];
            
            //set value
            text.innerHTML = movies[counter-1];
            //requestPoster(movies[counter-1], );
            requestPoster(movies[counter-1], "poster", poster)

        }

        function requestPoster(title, action, poster)
        {
           // parse url from user input
            var url = "http://www.omdbapi.com/?t=" + title;
            // add API key
            url = url + "&apikey=9f42f92d";

            // request data [syntax] = $.getJSON(url, data, success)
            $.getJSON(url, function success(data){ setValues(data, action, poster) });
        }

        function requestMovie()
        {
            // parse url from user input
            var userInput = document.getElementById("userInputBox").value;
            var url = "http://www.omdbapi.com/?t=" + userInput;
            // add API key
            url = url + "&apikey=9f42f92d";

            // request data [syntax] = $.getJSON(url, data, success)
            $.getJSON(url, function success(data){ createMovieObj(data); });
        
        }

        function setValues(data, action, item)
        {
            switch(action)
            {
                case "title":

                    break;
                
                case "poster":
                    item.src = data.Poster;
                    document.getElementById("poster-text").innerHTML = data.Poster;
                    break;
            }
        }

        function write(data)
        {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                myFunction(this, data);
            }
            };
            xhttp.open("GET", "movie-list.xml", true);
            xhttp.send();
        }

        function myFunction(xml, data)
        {
            var x, txt, xmlDoc;
            xmlDoc = xml.responseXML;
            x = xmlDoc.getElementsByTagName("movie")[0].childNodes[16];
            console.log(x.nodeValue);
            txt = x.nodeValue + "<br>";
            x.insertData(0, "test insert data");
            txt += x.nodeValue;
            console.log(x);
            
        }