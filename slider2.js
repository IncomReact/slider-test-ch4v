(function($) {
    let data = [
        {
            featured: false,
            id:"1",
            titre:"slide 1",
            img:"bg.jpg"  
        },
        {
            featured: true,
            id:"2",
            titre:"slide 2",
            img:"bg.jpg"   
        },
        {
            featured: false,
            id:"3",
            titre:"slide 3",
            img:"bg.jpg"   
        },
        {
            featured: false,
            id:"4",
            titre:"slide 4",
            img:"bg.jpg",   
        },
        // {
        //     featured: false,
        //     id:"5",
        //     titre:"slide 5",
        //     img:"bg5.jpg"   
        // },
        // {
        //     featured: false,
        //     id:"6",
        //     titre:"slide 6",
        //     img:"bg6.jpg"   
        // },
        // {
        //     featured: false,
        //     id:"7",
        //     titre:"slide 7",
        //     img:"bg7.jpg"   
        // }
        
    ]

    // Nav
    let before = $(".before");
    let next = $(".after");

    let timer;

    // Speed interval slider in ms
    const autoSlideTime = 7000;

    // Transition time list articles
    const transitionListArticlesTime = 800;

    // Transition time ms
    const transitionFeaturedTime = 500;

    // Counter Global
    let counter = 0;

    // Last Article
    let lastArticleIndex = data.length - 1;
    
    // Move featured article at the first index
    function sortArray() {
        $.each(data, function(key, value) {
            if(value.featured) {
                 arrayMove(data,key,0)
            } 
        })
    }
    sortArray();

    // Display articles when dom ready
    function displayArticles() {
        $.each(data, function(key,value) {
            if(!value.featured) {
                $(".list-slides").append("<div class='article'><h1>" + value.titre + "</h1><img src=" + value.img + "></div>")
            }
            else{
                $(".main-slide").append("<div class='main-article' style='opacity:1'><h1>" + value.titre + "</h1><img src=" + value.img + "></div>")
               
            }
        })
    }
    displayArticles();

    // Go Next Slide
    function slideNext() {

        counter++;
        if (counter >= data.length)
            counter = 0;
       
        // Get height of the first article
        let articleHeight = $(".list-slides .article").filter(':first').height();
        
        // Featured Article
        $(".main-slide .main-article").remove()
        $(".main-slide").append("<div class='main-article'><h1>" + data[counter].titre + "</h1><img src=" + data[counter].img + "></div>")
        $(".main-slide .main-article").animate({
            opacity: 1
        }, transitionFeaturedTime);
        
        // List Articles
        $(".article").filter(':first').addClass("fooooo")
        .animate({
            marginTop: "-" + articleHeight,
        }, {
                duration: transitionListArticlesTime,
                start: function(){
                    // Attach article to the end of the list
                    $(".list-slides").append("<div class='article'><h1>" + data[counter-1].titre + "</h1><img src=" + data[counter-1].img + "></div>")
                }, 
                complete: function(){
                    // Detach article from Dom
                    $(this).detach();
                } 
            }  
        );
       
    }

    // Go Previous Slide
    function slidePrevious() {

        counter--;
        if (counter < 0)
            counter = lastArticleIndex
       
        // Get height of the first article
        let articleHeight = $(".list-slides .article").filter(':first').height();

        // Featured Article
        $(".main-slide .main-article").remove()
        $(".main-slide").append("<div class='main-article'><h1>" + data[counter].titre + "</h1><img src=" + data[counter].img + "></div>")
        $(".main-slide .main-article").animate({
            opacity: 1
        }, transitionFeaturedTime);

        // Find correct index for the slide to prepend to the slides list
        let previousSlideIndex = counter == lastArticleIndex ? 0 : counter + 1
                
        // First we preprend the new article at the top of the list ...
        $(".list-slides").prepend("<div class='article'><h1>" 
            + data[previousSlideIndex].titre + "</h1><img src=" 
            + data[previousSlideIndex].img + "></div>")

        // ... and we hide it by using a negative margin-top
        $(".article").filter(':first').css('margin-top', '-' + articleHeight + 'px')

        // The we detach the old article from the list (since it's now featured)
        $(".article").filter(':last').detach();

        // Finally we animate the margin-top of the new article to make it appear
        $(".article").filter(':first').addClass("fooooo")
        .animate({ marginTop: 0 }, transitionListArticlesTime );
    }

    // Trigger click Next
    next.click(function(){
        slideNext();
    })

    // Trigger click Previous
    before.click(function(){
        console.log("click")
        slidePrevious();
    })
    
    // Function helper : move featured article at the first index
    function arrayMove(arr, fromIndex, toIndex) {
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }


    // Auto Slide
    function autoSlide(){

       timer = setTimeout(function(){ 

        autoSlide();            
        slideNext();
    
        }, autoSlideTime); 
    }
    autoSlide(); 
    
    // Stop Auto Slide on Hover 
    $(".main-slide, .list-slides, .nav").hover(
        function() {
            clearTimeout(timer);
            console.log(timer)
        },
        function() {
            autoSlide();
        }  
    )


}(jQuery));

