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

            xmlDoc = xml.responseXML;
            txt = "";
            x = xmlDoc.getElementsByTagName("title");
            
            for (i=0;i<x.length;i++)
            {
                // add to array
                movies.push(x[i].innerHTML);
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
            <div class="overlay" id="overlay" onclick="write()">\
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
            var url = "https://www.omdbapi.com/?t=" + title;
            // add API key
            url = url + "&apikey=9f42f92d";

            // request data [syntax] = $.getJSON(url, data, success)
            $.getJSON(url, function success(data){ setValues(data, action, poster) });
        }

        function requestMovie()
        {
            // parse url from user input
            var userInput = document.getElementById("userInputBox").value;
            var url = "https://www.omdbapi.com/?t=" + userInput;
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
                    break;
            }
        }

        function write()
        {
            console.log("A");
        }