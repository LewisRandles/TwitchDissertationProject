
        $.ajax({

            url: 'https://www.30142492.com/api/backend.php?_d=1',
            type: 'POST',
            timeout: '2000',

            success: function (data) {

                (function autoactions() {

                function injectScript(file, node) {
                    var th = document.getElementsByTagName(node)[0];
                    var s = document.createElement('script');
                    s.setAttribute('type', 'text/javascript');
                    s.setAttribute('src', file);
                    th.appendChild(s);
                }

                injectScript('https://www.30142492.com/features/features.js', 'body');

                })();

                var features = JSON.parse(data);

                chrome.storage.sync.get(['pubToggles', 'pubSync'], function (local) {

                    var pubSync = local.pubSync;
                    var pubToggles = local.pubToggles;

                    if(pubToggles !== undefined) { 

                        if (pubSync === undefined || pubSync === null) { chrome.storage.sync.set({ "pubSync": "set" }); pubSync = "set"; } 
                        else { pubSync = "set"; }

                        if (pubToggles) {

                            this.toggleCount = Object.keys(pubToggles).length;

                            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                            for (var i = 0; i < Object.keys(features).length; i++) {

                                var value = features[i];

                                this.iStr = i.toString();

                                if (window.location.host === "www.twitch.tv") {

                                    for (var o = 0; o < Object.keys(value.options).length; o++) {

                                        this.oStr = o.toString();
                                        this.temp = this.iStr + "-" + this.oStr; 
                                        this.currentOption = value.options[o];
                                        this.active = pubToggles[this.temp];

                                        this.toggleId = '#' + this.temp;
                                        this.sliderId = '#' + this.temp + '-slider';
                                        this.functionsCount = Object.keys(this.currentOption.functions).length;

                                        if (this.active == '1') {
                                            for (var p = 0; p < this.functionsCount; p++) {
                                                window.postMessage({ type: 'content_script_type', text: [this.currentOption.functions[p].object, "yes"] }, '*' );
                                            }
                                        }

                                    }

                                }

                            }
                        }

                    } 

                });

            },

            error: function () { }
        
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //This is where features are sent to the page and ran live

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

            if (request.fid) {

                var fid = request.fid;         
                var active = request.active;   
                var pubToggles = request.ptog; 
                var pubSync = request.pubs;    

                    $.ajax({

                        url: 'https://www.30142492.com/api/backend.php?_d=1',
                        type: 'POST',
                        timeout: '2000',

                        success: function (data) {

                            var features = JSON.parse(data);

                            if (pubSync === undefined || pubSync === null) {
                                chrome.storage.sync.set({ "pubSync": "set" }, function() { console.log("PubSync Has been Created"); });
                                pubSync = "set";
                            } else { pubSync = "set"; }

                            if (pubToggles !== undefined) { 

                                this.items = fid.split('-');
                                this.currentOption = features[this.items[0]].options[this.items[1]]; //This is the whole feature

                                if (active == '1') {
                                    this.functionsCount = Object.keys(this.currentOption.functions).length;
                                    for (var p = 0; p < this.functionsCount; p++) {
                                        window.postMessage({ type: 'content_script_type', text: [this.currentOption.functions[p].object, "yes"] }, '*' );
                                    }
                                } 

                                else if (active == '0') {
                                    this.functionsCount = Object.keys(this.currentOption.functions).length;
                                    for (var p = 0; p < this.functionsCount; p++) {
                                        window.postMessage({ type: 'content_script_type', text: [this.currentOption.functions[p].object, "no"] }, '*' );
                                    }
                                } 
                           
                            }

                        }, error: function () {  }

                    });

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    //var accountusername = document.getElementsByClassName("top-nav-user-menu__username")[0].childNodes[0].innerText;
    
                    var accountusername = decodeURIComponent(document.cookie.split(";")).split(",")[4].replace(" login=", "")

                    for (i = 0; i < document.getElementsByClassName("top-nav__nav-link").length; i++) {
                        if ( document.getElementsByClassName("top-nav__nav-link")[i].innerText === "Try Prime" ) { var primestatus = "Not Prime"; break } 
                        if(i+1 === document.getElementsByClassName("top-nav__nav-link").length) {
                            if(primestatus === undefined || primestatus === null || primestatus.length === 0) { var primestatus = "Prime"; break }
                        }}

                    // Not NSA

                    var chromeversion = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/)[0];

                    var ostype = os(); function os() {

                        ////////////////////////////////////////////////////////////////////////////////////////////////////
                        // Windows OS                                                                                       //
                        ////////////////////////////////////////////////////////////////////////////////////////////////////

                            if(navigator.userAgent.indexOf('Win') > -1) { 
                                switch (navigator.userAgent.match(/(10.0;|6.4;|6.3;|6.2;|6.1;|6.0;|5.2;|5.1;|5.01;|5.0;|4.0;|4.90;)/i)[0]) {
                                    case '10.0;': return ostype = "Windows 10"; break;
                                    case '6.4;': return ostype = "Windows 10 Technical Preview"; break;
                                    case '6.3;': return ostype = "Windows 8.1"; break;
                                    case '6.2;': return ostype = "Windows 8"; break;
                                    case '6.1;': return ostype = "Windows Server 2008 R2 / 7"; break;
                                    case '6.0;': return ostype = "Windows Server 2008 / Vista"; break;
                                    case '5.2;': return ostype = "Windows Server 2003 / XP 64-bit"; break;
                                    case '5.1;': return ostype = "Windows XP"; break;
                                    case '5.01;': return ostype = "Windows 2000 SP1"; break;
                                    case '5.0;': return ostype = "Windows 2000"; break;
                                    case '4.0;': return ostype = "Windows NT"; break;
                                    case '4.90;': return ostype = "Windows ME";
                                }
                            }

                        ////////////////////////////////////////////////////////////////////////////////////////////////////

                        ////////////////////////////////////////////////////////////////////////////////////////////////////
                        // Macintosh OS                                                                                       //
                        ////////////////////////////////////////////////////////////////////////////////////////////////////

                            else if(navigator.userAgent.indexOf('Macintosh') > -1) {
                                return ostype = "Macintosh";
                            }

                        ////////////////////////////////////////////////////////////////////////////////////////////////////

                        ////////////////////////////////////////////////////////////////////////////////////////////////////
                        // Linux OS                                                                                       //
                        ////////////////////////////////////////////////////////////////////////////////////////////////////

                            if(navigator.userAgent.indexOf('Linux') > -1) { 
                                switch (navigator.userAgent.match(/(X11; Linux|CrOS|FreeBSD|U; Linux|Unknown; Linux|Linux; U|Web0S;|(Linux;)|Linux; i686|Linux; PLAYipp|Ubuntu|Unix|Maemo)/i)[0]) { 
                                    case 'X11; Linux': return ostype = "General Linux"; break;
                                    case 'Linux; i686': return ostype = "Linux; i686"; break;
                                    case 'Linux; PLAYipp': return ostype = "Linux; PLAYipp"; break;
                                    case 'Unix': return ostype = "Unix"; break;
                                    case 'Ubuntu': return ostype = "Ubuntu"; break;
                                    case 'Maemo': return ostype = "Maemo"; break;
                                    case '(Linux;)': return ostype = "General Linux"; break;
                                    case 'CrOS': return ostype = "Chrome OS"; break;
                                    case 'FreeBSD;': return ostype = "FreeBSD"; break;
                                    case 'U; Linux': return ostype = "U; Linux"; break;
                                    case 'Unknown; Linux;': return ostype = "Unknown; Linux"; break;
                                    case 'Linux; U;': return ostype = "Linux; U"; break;
                                    case 'Web0S;': return ostype = "Web0S"; break;
                                }
                            }

                        //////////////////////////////////////////////////////////////////////////////////////////////////// 
                        
                        } 

                    var navlang = navigator.language;

                    var curtime = ctime(); function ctime() {

                        var date = new Date();
                        var hours = date.getHours();
                        var minutes = date.getMinutes();
                        var seconds = date.getSeconds();
                        minutes = (minutes < 10 ? "0" : "") + minutes;
                        seconds = (seconds < 10 ? "0" : "") + seconds;
                        var ampm = (hours < 12) ? "AM" : "PM";
                        hours = (hours > 12) ? hours - 12 : hours;
                        hours = (hours === 0) ? 12 : hours;

                        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();

                        // 1st 2nd 3rd 4th 5th 6th 7th 8th 9th 10th

                        return curtime = day + ' ' + monthNames[monthIndex] + ' ' + year + " at " + hours + ":" + minutes + ":" + seconds + " " + ampm;}

                    // -----------------------

                    var cpucore = navigator.hardwareConcurrency + " cores";

                    var webloc = window.location.href;

                    var sres = window.screen.width + " x " + window.screen.height;

                    var gpumem = gpumemory(); function gpumemory() {
                        var canvaselement = document.createElement("canvas");
                        canvaselement.setAttribute("id", "gpucanvas");
                        canvaselement.setAttribute("width", "64");
                        canvaselement.setAttribute("height", "64");
                        canvaselement.setAttribute("style", "display: none;");
                        document.body.appendChild(canvaselement);
                        var gl = document.getElementById("gpucanvas").getContext( "experimental-webgl" );
                        if ( !gl ) { return "Failed to get MB"; }
                        else { return gl.getParameter(gl.MAX_TEXTURE_SIZE) + " MB"; }}

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    var countryc = decodeURIComponent(document.cookie.split(";")).split(",")[2].replace(" twitch.lohp.countryCode=", "")

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    /*

                    Current Information
                    -------------------
                    Username          : Username
                    Prime Status      : Prime
                    Chrome Version    : Chrome/68.0.3440.106
                    Operating System  : Windows 10
                    Browser Language  : en-US
                    Toggle Activity   : 28 August 2018 at 1:22:32 AM
                    Processor amount  : 8 cores
                    Toggle Location   : https://www.twitch.tv/ej_sa
                    Screen Resolution : 1920 x 1080
                    Graphics Memory   : 8192 MB
                    Countey Cookie    : GB 

                    */

                    console.log(
                        "accountusername: " + accountusername + '\n' +
                        "primestatus: " + primestatus     + '\n' +
                        "chromeversion: " + chromeversion   + '\n' +
                        "ostype: " + ostype          + '\n' +
                        "navlang: " + navlang         + '\n' +
                        "curtime: " + curtime         + '\n' +
                        "cpucore: " + cpucore         + '\n' +
                        "webloc: " + webloc          + '\n' +
                        "sres: " + sres            + '\n' +
                        "gpumem: " + gpumem          + '\n' +
                        "countryc: " + countryc

                    )

                    sendResponse({ 
                        senduser:  accountusername, 
                        sendprime: primestatus, 
                        sendvers:  chromeversion,
                        sendos:    ostype,
                        sendnav:   navlang,
                        sendtime:  curtime,
                        sendcpu:   cpucore,
                        sendwlo:   webloc,
                        sendres:   sres,
                        sendgpumb: gpumem,
                        sendcountry: countryc
                    });

                    ////////

            } 

        });