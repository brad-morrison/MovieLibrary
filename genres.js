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

            movieGenres();
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