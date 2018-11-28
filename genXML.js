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
                // add to list
                //addBoxToHTML(i+1, movies);

                addBoxToHTML();
                requestData(moviesTitle[i]);
            }
        }

        function requestData(title)
        {
            // parse url from user input
            var url = "http://www.omdbapi.com/?t=" + title;
            // add API key
            url = url + "&apikey=9f42f92d";

            // request data [syntax] = $.getJSON(url, data, success)
            $.getJSON(url, function success(data){ setValues(data) });
        }

        function setValues(data)
        {
            //enter data
            document.getElementById('title').innerHTML = "&lt;title&gt;" + data.Title + "&lt;/title&gt;";
            document.getElementById('year').innerHTML = "&lt;year&gt;" + data.Year + "&lt;/year&gt;";
            document.getElementById('rated').innerHTML = "&lt;rated&gt;" + data.Rated + "&lt;/rated&gt;";
            document.getElementById('genre').innerHTML = "&lt;genre&gt;" + data.Genre + "&lt;/genre&gt;";
            document.getElementById('director').innerHTML = "&lt;director&gt;" + data.Director + "&lt;/director&gt;";
            document.getElementById('actors').innerHTML = "&lt;actors&gt;" + data.Actors + "&lt;/actors&gt;";
            document.getElementById('plot').innerHTML = "&lt;plot&gt;" + data.Plot + "&lt;/plot&gt;";
            document.getElementById('poster').innerHTML = "&lt;poster&gt;" + data.Poster + "&lt;/poster&gt;";
            document.getElementById('rating').innerHTML = "&lt;rating&gt;" + data.imdbRating + "&lt;/rating&gt;";
            document.getElementById('imdbID').innerHTML = "&lt;imdbID&gt;" + data.imdbID + "&lt;/imdbID&gt;";

            //reset id's
            document.getElementById('title').id = "";
            document.getElementById('year').id = "";
            document.getElementById('rated').id = "";
            document.getElementById('genre').id = "";
            document.getElementById('director').id = "";
            document.getElementById('actors').id = "";
            document.getElementById('plot').id ="";
            document.getElementById('poster').id ="";
            document.getElementById('rating').id = "";
            document.getElementById('imdbID').id = "";
        }
        
        
        function addBoxToHTML()
        {
            // create skeleton item
            var container = document.getElementById("movies");
            var newItem = document.createElement("div");
            var lastItem = document.getElementById("movie");

            newItem.id = "movie";
            newItem.innerHTML = 

            "<p>&lt;movie&gt\
            <p id='title'>&lt;title&gt;&lt;/title&gt;</p>\
            <p id='year'>&lt;year&gt;&lt;/year&gt;</p>\
            <p id='rated'>&lt;rated&gt;&lt;/rated&gt;</p>\
            <p id='genre'>&lt;genre&gt;&lt;/genre&gt;</p>\
            <p id='director'>&lt;director&gt;&lt;/director&gt;</p>\
            <p id='actors'>&lt;actors&gt;&lt;/actors&gt;</p>\
            <p id='plot'>&lt;plot&gt;&lt;/plot&gt;</p>\
            <p id='poster'>&lt;poster&gt;&lt;/poster&gt;</p>\
            <p id='rating'>&lt;rating&gt;&lt;/rating&gt;</p>\
            <p id='imdbID'>&lt;imdbID&gt;&lt;/imdbID&gt;</p>\
            &lt;/movie&gt;</p>";

            container.insertBefore(newItem, lastItem);

            lastItem.id ="";

            
        }