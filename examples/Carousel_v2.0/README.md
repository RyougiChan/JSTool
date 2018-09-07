# CarouselV2

## Getting Started

### Preparation
*Yuko CarouselV2 requires the enable of JavaScript*

To use Yuko CarouselV2 in your project, using following folders/files:

```
[images]    *.jpg | *.png... 
[./common/script]    Yuko.js | required
[./common/style]     yuko-reset.css | required or defined yourself
            yuko.css | require
```
```
<link href="../common/style/yuko-reset.css" rel="stylesheet">
<link href="../common/style/yuko.css" rel="stylesheet">

<script src="../common/script/Yuko.js"></script>
```

### Usage
*index.html is a demo web page*

#### 1 Create a carouselcontainer with carousel list and some required widget

```
<!-- Carousel Start -->
	<div class="yuko-carousel-v2-container">
		<!-- Previous Icon -->
	    <div class="yuko-carousel-v2-pre" style="z-index:10;"></div>
	    <!-- Carousel List Start -->
	    <ul class="yuko-carousel-v2">
	        <li class="yuko-carousel-v2-item_a"></li>
	        <li class="yuko-carousel-v2-item_b"></li>
	        <li class="yuko-carousel-v2-item_c"></li>
	        <li class="yuko-carousel-v2-item_d"></li>
	        <li class="yuko-carousel-v2-item_e"></li>
	        <li class="yuko-carousel-v2-item_f"></li>
	        <li class="yuko-carousel-v2-item_g"></li>
	    </ul>
		<!-- Carousel List End -->
		<!-- Next Icon -->
	    <div class="yuko-carousel-v2-next" style="z-index:10;"></div>

	    <!-- Carousel Switch icons Start -->
	    <ul class="yuko-carousel-v2-bar">
	    	<li class="on"><a></a></li>
	    	<li><a></a></li>
	    	<li><a></a></li>
	    	<li><a></a></li>
	    	<li><a></a></li>
	    	<li><a></a></li>
	    	<li><a></a></li>
	    </ul>
	    <!-- Carousel Switch icons End-->
	</div>	
<!-- Carousel End -->
```

#### 2 Create a carousel widget
```
var carouselList = document.querySelectorAll('.yuko-carousel-v2 > li');
yuko.widget.carouselV2(carouselList, 'default', {
    size: [1920, 840],
    isResizable: true,
    hasButton: true,
    hasBottomBar: true
});
```

## FAQ
**Q: Those parameters' meaning in `Yuko.widget.carouselV2` function?**

Eeee... Read the Docs guide in [Yuko.js](https://github.com/RyougiChan/JSTool/blob/master/common/script/Yuko.js) please.

**Q: How does this demo perform on mobile devices' browser?**

In my test result, my demo performed well on *chrome*, *firefox*, *safari*, *IE10-11*(Because using CSS3 transition).