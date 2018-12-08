        var global = {};
        
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
               // addBoxToHTML(i, movies[i]); // redistribute this!!!!!!
            }

            //add array to global for search
            global.movies = movies;
        }

        function addBoxToHTML(counter, movie)
        {
            // create skeleton item
            var container = document.getElementById("container");
            var lastItem = document.getElementById("item-" + counter-1);
            var imageFromLocal = true;
            
            var newItem = document.createElement("div");

            newItem.className = "item";
            newItem.attr
            newItem.id = "item-" + counter;
            newItem.innerHTML = 

            '<img src="" id="poster">\
            <div class="overlay" id="overlay" style="cursor: pointer">\
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
            }
        }

        function addTilesToHTML()
        {
            var row = document.getElementById("rows");
            var start = document.getElementById("start");

            for (i=0;i<global.genresUnique.length;i++)
            {
                // create flexbox //
                var newItem = document.createElement("div");

                newItem.innerHTML =

                '<div class="row-block">\
                    <h1 class="row-block-header" id="row-block-header">Action</h1>\
                    <div class="flex-scroll-box" id="flex-scroll-box">\
                        <div id="na"></div>\
                    </div>\
                </div>'

                row.insertBefore(newItem, start);

                // change row header
                var header = document.getElementById("row-block-header");
                header.innerHTML = global.genresUnique[i];
                // reset header id
                header.id = "";
                
                // add tiles //
                
                var flex = document.getElementById("flex-scroll-box");
                var insertPoint = document.getElementById("na");

                for (j=0;j<global.movies.length;j++)
                {
                    if (global.movies[j].genre.includes(global.genresUnique[i]))
                    {
                        //moviesOfGenre.push(global.movies[j]);

                        

                    var newTile = document.createElement("img");
                    newTile.className = "tile";
                    newTile.src = global.movies[j].poster;


                    flex.insertBefore(newTile, insertPoint);
                    
                    }

                    
                }

                flex.id = "";
                insertPoint.id = "";

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

        function search()
        {
            var txt;

            txt = document.getElementById("search").value;

            if (txt.includes("year:"))
            {
                searchMoviesByYear(txt);
            }
            else if (txt.includes("genre:"))
            {
                searchMoviesByGenre(txt);
            }
            else if (txt.includes("director:"))
            {
                searchMoviesByDirector(txt);
            }
            else if (txt.includes("actor:"))
            {
                searchMoviesByActor(txt);
            }
            else 
            {
                searchMoviesByTitle(txt);
            }
        }


        function searchMoviesByTitle(txt)
        {
            var moviesFound = [];
            var movieString, movieStringLower;
            var containsTrue, containsTrueLower;

            //search
            for (i=0;i<global.movies.length;i++)
            {
                movieString = global.movies[i].title;
                movieStringLower = movieString.toLowerCase();
                containsTrue = movieString.includes(txt);
                containsTrueLower = movieStringLower.includes(txt);

                if (containsTrue || containsTrueLower)
                {
                    moviesFound.push(global.movies[i]);
                }
            }
            renderSearchItems(moviesFound);
        }

        function searchMoviesByGenre(txt)
        {
            var moviesFound = [];
            var genreString, genreStringLower;
            var containsTrue, containsTrueLower;

            txt = txt.replace("genre: ", "");

            //search
            for (i=0;i<global.movies.length;i++)
            {
                genreString = global.movies[i].genre;
                genreStringLower = genreString.toLowerCase();

                containsTrue = genreString.includes(txt);
                containsTrueLower = genreStringLower.includes(txt);

                if (containsTrue || containsTrueLower)
                {
                    moviesFound.push(global.movies[i]);
                }
            }
            renderSearchItems(moviesFound);
        }

        function movieGenres()
        {
            var movieGenre;
            var movieGenres = [];
            var contains;

            // get raw genre data from all movies //
            for (i=0;i<global.movies.length;i++)
            {
                movieGenre = global.movies[i].genre;
                contains = movieGenres.includes(movieGenre);

                if (!contains)
                {
                    movieGenres.push(movieGenre);
                }
            }

            // split strings into seperate genres //
            var genreStringsFinal = [];

            for (j=0;j<movieGenres.length;j++)
            {
                // get string
                var genresString = movieGenres[j];
                
                //split string
                var genreStringSplit = genresString.split(", ");

                // add each split string to string array
                for (k=0;k<genreStringSplit.length;k++)
                {
                    genreStringsFinal.push(genreStringSplit[k]);    
                }
            }

            // remove duplicate strings //
            let unique = [...new Set(genreStringsFinal)];

            // make global var of array //
            global.genresUnique = []; 
            global.genresUnique = unique;

            addTilesToHTML();
        }

        function searchMoviesByDirector(txt)
        {
            var moviesFound = [];
            var directorString, directorStringLower;
            var containsTrue, containsTrueLower;

            txt = txt.replace("director: ", "");

            //search
            for (i=0;i<global.movies.length;i++)
            {
                directorString = global.movies[i].director;
                directorStringLower = directorString.toLowerCase();

                containsTrue = directorString.includes(txt);
                containsTrueLower = directorStringLower.includes(txt);

                if (containsTrue || containsTrueLower)
                {
                    moviesFound.push(global.movies[i]);
                }
            }
            renderSearchItems(moviesFound);
        }

        function searchMoviesByActor(txt)
        {
            var moviesFound = [];
            var actorString, actorStringLower;
            var containsTrue, containsTrueLower;

            txt = txt.replace("actor: ", "");

            //search
            for (i=0;i<global.movies.length;i++)
            {
                actorString = global.movies[i].actors;
                actorStringLower = actorString.toLowerCase();

                containsTrue = actorString.includes(txt);
                containsTrueLower = actorStringLower.includes(txt);

                if (containsTrue || containsTrueLower)
                {
                    moviesFound.push(global.movies[i]);
                }
            }
            renderSearchItems(moviesFound);
        }

        function searchMoviesByYear(txt)
        {
            var moviesFound = [];
            var movieYear;
            var containsTrue;
            
            txt = txt.replace(/\D/g,"");
            //search
            for (i=0;i<global.movies.length;i++)
            {
                if (txt == global.movies[i].year)
                {
                    moviesFound.push(global.movies[i]);
                }
            }
            renderSearchItems(moviesFound);
        }

        function renderSearchItems(moviesFound)
        {
            //reset grid
            resetGrid();
            //add search results to grid
            for (i=0;i<moviesFound.length;i++)
            {
                // add to list
                addBoxToHTML(i, moviesFound[i]);
            }
        }

        function resetGrid()
        {
            var container = document.getElementById("container");
            container.innerHTML = "";
        }