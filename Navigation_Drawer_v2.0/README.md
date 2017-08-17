# Navigation Drawer

## Getting Started

### Preparation
*Yuko Navigation Drawer requires the enable of JavaScript*

To use Yuko Navigation Drawer in your project, using following folders/files:

```
[font]      optional
[script]    Yuko.js | required
[style]     material-icons.css | optional
            yuko-reset.css | required or defined yourself
            yuko.css | require
```
```
<link href="style/yuko-reset.css" rel="stylesheet">
<link href="style/yuko.css" rel="stylesheet">

<script src="script/Yuko.js"></script>
```

### Usage
*index.html is a demo web page*

#### 1 Create a drawer container with mask

```
<!-- Navigation Drawer S -->
        <div id="yuko-nav-drawer-container" class="yuko-nav-backgroung-mask">
            <div id="yuko-nav-drawer">
                <div id="yuko-nav-white"></div>
                <div id="yuko-nav-list">
                    <span id="yuko-nav-title">Title</span>
                    <nav>
                        <ul>
                            <li class="yuko-nav-item">Link</li>
                            <li class="yuko-nav-item">Link</li>
                            <li class="yuko-nav-item">Link</li>
                            <li class="yuko-nav-item">Link</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
<!-- Navigation Drawer E -->
```

#### 2 Create a navigation drawer
```
var drawer = document.getElementById('yuko-nav-drawer');
var button = document.getElementById('yuko-nav-drawer-button');
var drawerContainer = Yuko.widget.navigationDrawer(drawer, button, {
    animationType: "quadratic",
    mask: true,
    timeSpan: 384
});
```

#### 3 Create a page container(If a content page switcher is needed)
```
var content = document.getElementById('yuko-main-content');
var pageContainer = Yuko.widget.pageContainer(content, {
    allowSwipe: false,
    timeSpan: 384,
    animationType: 'linear',
    swipeScale: 0.5
}, function (a) { }, true);
```

#### 4 Based on 3, bind drawer navigation list items to page contents
```
Yuko.event.bindDrawerNavItemToPage(drawer, drawerContainer, pageContainer);
```

## FAQ
**Q: Those parameters' meaning in `Yuko.widget.navigationDrawer` and `Yuko.widget.pageContainer` function?**
Eeee... Read the Docs guide in [Yuko.js](https://github.com/RyougiChan/JSTool/blob/master/Navigation_Drawer_v2.0/script/Yuko.js) please.

**Q: How does this demo perform on mobile devices' browser?**
In my test result, my demo performed well on *chrome*, *firefox*, *opera* on mobile devices. And *safari* has no test result yet.