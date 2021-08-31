//READY

$(document).ready(function () {

    let logoSpan = $('.loader-gif .logo');

    setTimeout(function() {

        logoSpan.each(function(idx, span) {
            setTimeout(function() {
                span.classList.add('active');
            }, (idx + 1) * 500);
        });
    });

    setTimeout(function() {

        logoSpan.each(function(idx, span) {
            setTimeout(function() {
                span.classList.remove('active');
                span.classList.add('fade');
            }, (idx + 1) * 50);
        });
    }, 2000);

    setTimeout(function() {
        $('.loader').css('top', '-100vh');
    }, 2250);

    // close offcanvas

    $('.nav-link').click(function () {
        $(this).parents('.offcanvas').removeClass('show');
    });

    // menu slider

    $('.slider').slick({
        centerMode: true,
        centerPadding: '50px',
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    centerPadding: '20px',
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true
                }
            },
        ]
    });

    // AJAX DATA

    $.ajax({
        url: 'https://api.sampleapis.com/coffee/hot',
        method: 'get',
        success: function(data) {
            window.coffee = data;
        }
    });

    $('form').on('submit', function(e) {
        e.preventDefault();

        $('#title').html("");
        $('#description').html("");
        $('#ingredients').html("");


        if (coffee !== undefined) {
            let value = $('form #search').val().toLowerCase();
            let result = coffee.find(i => {
            
                if (i.title !== undefined) {
                    if (i.title.toLowerCase().includes(value)) {
                        return i;
                    }
                }
            });
            
            if (result !== undefined) {

                $('#title').empty().append(result.title);
                $('#description').empty().append(result.description);
                $('#ingredients').empty().append('<li class="list-group-item"><strong>Ingredients: </strong>' + result.ingredients + '</li>');

            } else {
                $('#title').append('we didnt found nothing');
            }
        }
    });    
});

