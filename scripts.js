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
            var xtitle, xyear, xrated, xgenre, xdirector, xactors, xplot, 
            xposter, xrating, ximdbid, xmlDoc, txt;

            var movies = [];
            
            xmlDoc = xml.responseXML;
            txt = "";

            xtitle = xmlDoc.getElementsByTagName("title");
            xyear = xmlDoc.getElementsByTagName("year");
            xrated = xmlDoc.getElementsByTagName("rated");
            xgenre = xmlDoc.getElementsByTagName("genre");
            xdirector = xmlDoc.getElementsByTagName("director");
            xactors = xmlDoc.getElementsByTagName("actors");
            xplot = xmlDoc.getElementsByTagName("plot");
            xposter = xmlDoc.getElementsByTagName("poster");
            xrating = xmlDoc.getElementsByTagName("rating");
            ximdbid = xmlDoc.getElementsByTagName("imdbID");
            
            for (i=0;i<xtitle.length;i++)
            {
                var movie = new Object();

                // set data
                movie.title = xtitle[i].innerHTML;
                movie.year = xyear[i].innerHTML;
                movie.rated = xrated[i].innerHTML;
                movie.genre = xgenre[i].innerHTML;
                movie.director = xdirector[i].innerHTML;
                movie.actors = xactors[i].innerHTML;
                movie.plot = xplot[i].innerHTML;
                movie.poster = xposter[i].innerHTML;
                movie.rating = xrating[i].innerHTML;
                movie.imdbID = ximdbid[i].innerHTML;
                
                // add to array
                movies.push(movie);
                // sort by year descending
                movies.sort(function(a,b){return a.year - b.year});
                // sort by year ascending
                //movies.sort(function(a,b){return b.year - a.year});
            }   

            //reverse order so new films are at top
            movies.reverse();

            for (i=0;i<movies.length;i++)
            {
                // add to list
                addBoxToHTML(i, movies[i]);
            }
        }

        function addBoxToHTML(counter, movie)
        {;
            // create skeleton item
            var container = document.getElementById("container");
            var lastItem = document.getElementById("item-" + counter-1);
            var imageFromLocal = true;
            
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
            text.innerHTML = movie.title;
            
            
            if (imageFromLocal == false)
            {
                // set to retrieve from URL
                poster.src = movie.poster;
                console.log("images retrieved from URL")
            }
            else
            {
                // set to retrieve from local files
                var str = movie.poster;
                str = str.replace("https://m.media-amazon.com/images/M/", "");
                poster.src = "posters/" + str;
                // manual setting
                if (movie.title == "The Counselor")
                    poster.src = "posters/The Counselor.jpg";
                if (movie.title == "Brand: A Second Coming")
                    poster.src = "posters/1.jpg";
                if (movie.title == "Fast &amp; Furious 4")
                    poster.src = "posters/Fast4.jpg";
                if (movie.title == "The Crucible")
                    poster.src = "posters/The Crucible.jpg";
                if (movie.title == "Solaris")
                    poster.src = "posters/Solaris.jpg";
                console.log("images retrieved from files")
            }
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

        // for tomorrow iterate through each movie and test against the search then repopulate grid.
        function searchMovies()
        {
            var txt;
            var containsTrue;

            txt = document.getElementById("search").value;
            console.log(txt);

            containsTrue = txt.includes()
        }