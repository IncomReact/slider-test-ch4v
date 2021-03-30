$( document ).ready(function() {
    let data = [
        {
            featured: false,
            id:"1",
            titre:"slide 1",
            img:"bg.jpg"  
        },
        {
            featured: false,
            id:"2",
            titre:"slide 2",
            img:"bg2.jpg"   
        },
        {
            featured: false,
            id:"3",
            titre:"slide 3",
            img:"bg3.jpg"   
        },
        {
            featured: false,
            id:"4",
            titre:"slide 4",
            img:"bg4.jpg",   
        },
        {
            featured: false,
            id:"5",
            titre:"slide 5",
            img:"bg5.jpg"   
        },
        {
            featured: false,
            id:"6",
            titre:"slide 6",
            img:"bg6.jpg"   
        },
        {
            featured: true,
            id:"7",
            titre:"slide 7",
            img:"bg7.jpg"   
        }
        
    ]


    let before = $(".before");
    let next = $(".after");

    // Array for Aritcle Featured
    let featuredArticle = [];

    // Main article Index
    let featuredArticleIndex = 0;

    // Counter
    let counter = 0;
    console.log("counter init", counter)
    
    // Last Article
    let lastArticleIndex = data.length - 1;
    // console.log("lastArticleIndex",lastArticleIndex)
    

    // Array of Next Articles
    let nextArticles = [];

    // Move featured article at the first index
    function sortArray() {
        $.each(data, function(key, value) {
            if(value.featured) {
                 arrayMove(data,key,0)
            } 
        })
    }
    sortArray();

    
    // Get Main article
    function getMainArticle() {
       featuredArticle.push(data[0])
    }
    getMainArticle();
    

    // Display Main article
    function displayMainArticle() {
        $(".main-slide").append("<h1>" + featuredArticle[0].titre + "</h1>")
        $(".main-slide").append("<img src=" + featuredArticle[0].img + ">").hide().fadeIn(1000);
    }
    displayMainArticle()

   // Delete Main article
    function deleteMainArticle() {
        $(".main-slide h1").remove();
        $(".main-slide img").remove();
        featuredArticle = [];
    }


    // Get others articles
    function getNextListArticles() {
        for(let i = (featuredArticleIndex + 1); i < (featuredArticleIndex + 4); i++ ) {
            nextArticles.push(data[i])
        }
    }
    getNextListArticles();

    // Display others articles
    function displayNextArticles() {
        $.each(nextArticles, function(key, value) {
            if (value) {
                $(".list-slides").append("<h1>" + value.titre + "</h1>")
                $(".list-slides").append("<img src=" + value.img + ">")
            }
            
        })

    }
    displayNextArticles();

    // Delete others articles
    function deleteListArticles() {
        $(".list-slides h1").remove()
        $(".list-slides img").remove()
        nextArticles= [];
    }



    // Get Next Main article
    function slideNext() {

        counter++;

        deleteMainArticle();

        deleteListArticles();
        nextArticles.push(data[counter+1])
        nextArticles.push(data[counter+2])
        nextArticles.push(data[counter+3])
        displayNextArticles(); 
    
        
        if(counter < lastArticleIndex) {

            featuredArticle.push(data[counter])
            displayMainArticle();

        } else {
            counter = 0;
            featuredArticle.push(data[counter])
            displayMainArticle();
        }        
    }

    // Get Previous Main article
    function slidePrevious() {

        counter--;

        deleteMainArticle();

        deleteListArticles();
        nextArticles.push(data[counter+1])
        nextArticles.push(data[counter+2])
        nextArticles.push(data[counter+3])
        displayNextArticles(); 
        
        if(counter >=  0) {
            featuredArticle.push(data[counter])
            displayMainArticle();
        } else {
            counter = lastArticleIndex;
            featuredArticle.push(data[counter])
            displayMainArticle();
        }
    }

    // Trigger click Next
    next.click(function(){
        slideNext();
    })

    // Trigger click Previous
    before.click(function(){
        slidePrevious();
    })
    
    // Function helper : move featured article at the first index
    function arrayMove(arr, fromIndex, toIndex) {
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }

});

