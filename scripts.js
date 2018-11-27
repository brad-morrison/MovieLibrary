function search()
{
    var userInput = document.getElementById("userInputBox").value;

    document.getElementById("output").innerHTML = userInput;
}



function searchbytitlebutton()
        {
            var c = $("#search-by-title-form :input").filter(function (index, element) {
                return $(element).val() != "";
            }).serialize();
            var d = 'http://www.omdbapi.com/?' + c;
            var e = $('#search-by-title-request');
            e.find('a').attr('href', d).html(d);
            e.show('slow');
            var f = $('#search-by-title-progress');
            f.show('slow');
            var g = $('#search-by-title-response');
            $.ajax({
                type: 'GET',
                dataType: 'text',
                /* sure you could easily steal this key, but I'll be keeping a close eye on it ;) */
                url: '/?' + c + '&apikey=BanMePlz',
                statusCode: {
                    401: function () {
                        g.find('pre').html('Error: Daily request limit reached!')
                    }
                },
                success: function (a) {
                    g.find('pre').html(a.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
                },
                complete: function () {
                    f.hide();
                    g.show('slow')
                }
            })
        };