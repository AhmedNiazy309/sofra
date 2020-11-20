 $(document).ready(function(){
    $(".client-carousel").owlCarousel(
        {
            item:1,
            rtl: true ,
        dots: false,
        responsiveClass: true,
        center:true,
        margin: 20,
        responsive: {
            0: {
                items: 2,
                nav: true,
                loop: true
            },
            600: {
                items: 3,
                nav: false,
                loop: true
            },
            1000: {
                items: 4,
                nav: true,
                loop: true,
            }
            }

        }
    );
  });
