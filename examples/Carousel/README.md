# Carousel

## Getting Started

### Preparation
*Yuko Carousel requires the enable of JavaScript*

To use Yuko Carousel in your project, using following folders/files:

```
[images]    *.jpg | *.png... 
[script]    Yuko.js | required
[style]     yuko-reset.css | required or defined yourself
            yuko.css | require
```
```
<link href="style/yuko-reset.css" rel="stylesheet">
<link href="style/yuko.css" rel="stylesheet">

<script src="script/Yuko.js"></script>
```

### Usage
*index.html is a demo web page*

#### 1 Create a carouselcontainer with carousel list(data-page-index attribute required)

```
<!-- Yuko Carousel S -->
    <div id="yuko-carousel-container">
        <div id="yuko-carousel-title">yuko-carousel</div>
        <div id="yuko-carousel">
            <div id="yuko-carousel-list">
                <span id="yuko-carousel-pre"></span>
                <span id="yuko-carousel-next"></span>
                <ul data-page-index="0">
                    <li class="yuko-carousel-item" data-page-id="0"></li>
                    <li class="yuko-carousel-item" data-page-id="1"></li>
                    <li class="yuko-carousel-item" data-page-id="2"></li>
                    <li class="yuko-carousel-item" data-page-id="3"></li>
                    <li class="yuko-carousel-item" data-page-id="4"></li>
                    <li class="yuko-carousel-item" data-page-id="5"></li>
                </ul>
            </div>
        </div>
    </div>
<!-- Yuko Carousel E -->
```

#### 2 Create a carousel widget
```
var carouselList = document.querySelectorAll('.yuko-carousel-item');
var carouselPre = document.getElementById('yuko-carousel-pre');
var carouselNext = document.getElementById('yuko-carousel-next');
Yuko.widget.carousel(carouselList, carouselPre, carouselNext, {
    positions : 
    [
        ['100%', '100%', '0', '0'],
        ['80%', '80%', '10%', '-12.5%'],
        ['60%', '60%', '20%', '20%'],
        ['80%', '80%', '10%', '32.5%']
    ],
    duration : .3
});
```

## FAQ
**Q: Those parameters' meaning in `Yuko.widget.carousel` function?**

Eeee... Read the Docs guide in [Yuko.js](https://github.com/RyougiChan/JSTool/blob/master/Carousel/script/Yuko.js) please.

**Q: How does this demo perform on mobile devices' browser?**

In my test result, my demo performed well on *chrome*, *firefox*, *safari*, *IE9-11*. PS: *IE9* work with setTimeOut(callback,duration) function.