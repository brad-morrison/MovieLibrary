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
            var moviesTitle=[];
            var moviesYear=[];
            var moviesRated=[];
            var moviesGenre=[];
            var moviesDirector=[];
            var moviesActors=[];
            var moviesPlot=[];
            var moviesPoster=[];
            var moviesRating=[];
            var moviesIMDBID=[];

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
                // add to array
                moviesTitle.push(xtitle[i].innerHTML);
                moviesYear.push(xyear[i].innerHTML);
                moviesRated.push(xrated[i].innerHTML);
                moviesGenre.push(xgenre[i].innerHTML);
                moviesDirector.push(xdirector[i].innerHTML);
                moviesActors.push(xactors[i].innerHTML);
                moviesPlot.push(xplot[i].innerHTML);
                moviesPoster.push(xposter[i].innerHTML);
                moviesRating.push(xrating[i].innerHTML);
                moviesIMDBID.push(ximdbid[i].innerHTML);
            }

            //reverse order so new films are at top
            moviesTitle.reverse();
            moviesYear.reverse();
            moviesRated.reverse();
            moviesGenre.reverse();
            moviesDirector.reverse();
            moviesActors.reverse();
            moviesPlot.reverse();
            moviesPoster.reverse();
            moviesRating.reverse();
            moviesIMDBID.reverse();
            
            for (i=0;i<moviesTitle.length;i++)
            {
            // add to list
            addBoxToHTML(i+1, moviesTitle, moviesYear, moviesRated, moviesGenre, 
                moviesDirector, moviesActors, moviesPlot, moviesPoster, 
                moviesRating, moviesIMDBID);
            }
        }

        function addBoxToHTML(counter, title, year, rated, genre, director, actors, plot, posterURL, rating, imdbID)
        {
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
            text.innerHTML = title[counter-1];
            
            
            if (imageFromLocal == false)
            {
                // set to retrieve from URL
                poster.src = posterURL[counter-1];
                console.log("images retrieved from URL")
            }
            else
            {
                // set to retrieve from local files
                var str = posterURL[counter-1];
                str = str.replace("https://m.media-amazon.com/images/M/", "");
                poster.src = "posters/" + str;
                console.log("images retrieved from files")
            }
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