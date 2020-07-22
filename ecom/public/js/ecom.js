$(function() {
    $("#form1").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/search',
            data: $('#form1').serialize(),
            datatype: 'jsonp',
            success: function(k) {
                var t = $('#con')
                var se = $('#se')
                t.html('')
                se.html('')
                successq(k);
            }
        });
    });
});

$(function() {
    $("#form2").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/range',
            data: $('#form2').serialize(),
            datatype: 'jsonp',
            success: function(k) {
                var t = $('#con')
                var se = $('#se')
                t.html('')
                se.html('')
                successq(k);
            }
        });
    });
});

$(function() {
    $("#form3").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/sort',
            data: $('#form3').serialize(),
            datatype: 'jsonp',
            success: function(k) {
                var t = $('#con')
                var se = $('#se')
                t.html('')
                se.html('')
                successq(k);
            }
        });
    });
});

$(function() {
    $("#form4").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/sort/date',
            data: $('#form4').serialize(),
            datatype: 'jsonp',
            success: function(k) {
                var t = $('#con')
                var se = $('#se')
                t.html('')
                se.html('')
                successq(k);
            }
        });
    });
});


function successq(k) {
    var se = $('#se')
    if (k.length == 0) {
        se.append('<h1 id="message">product not found</div>')
    }
    console.log(k)
    k.forEach(function(e) {
        $('#se').addClass("container")
        se.append('\
        <div class="row" style="display:flex; flex-wrap: wrap;">\
            <div class="column">\
                <div class="card">\
                    <img src="http://localhost:3000/' + e.image + '" alt="Denim Jeans" style="width:100%">\
                    <h1>' + e.name + '</h1>\
                    <p class="price">' + e.price + '</p>\
                     <p>' + e.quantity + '</p>\
                </div>\
            </div>\
        </div>\
                    ');
    });
}