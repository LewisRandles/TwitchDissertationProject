
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function activateOnPage(featureId, activeState) {

	chrome.tabs.query({ active: true, currentWindow: true }, 

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function(tabs) {

		chrome.storage.sync.get(['pubToggles', 'pubSync'], function(local){

			var pubToggles = local.pubToggles;
        	var pubSync = local.pubSync;

			chrome.tabs.sendMessage(tabs[0].id, { fid: featureId, active: activeState, ptog: pubToggles, pubs: pubSync  }, function(response) { 
				
				var optionname = document.getElementsByClassName("opt-title")[0].innerText;

				var collect = [];

			    collect[0] = response.senduser
			    collect[1] = response.sendprime
			    collect[2] = optionname
			    collect[3] = activeState
			    collect[4] = response.sendtime
			    collect[5] = response.sendvers
			    collect[6] = response.sendos
			    collect[7] = response.sendnav
			    collect[8] = response.sendcpu
			    collect[9] = response.sendwlo
			    collect[10] = response.sendres
			    collect[11] = response.sendgpumb
			    collect[12] = response.sendcountry

			    $.ajax({

			    	url: 'https://www.30142492.com/api/backend.php?_d=2',
					timeout: '2000',
			        type: 'post',
			        data: 'data=' + collect,

			        success: function(data) { console.log('good'); console.log(data) },

			        error: function() { console.log('error') }

			    });

			});

		});

	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$.ajax({

	url: 'https://www.30142492.com/api/backend.php?_d=1',
	type: 'POST',
	timeout: '2000',

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	success: function(data) {

		// Permission

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		chrome.storage.sync.get(['consent'], function(local) {

			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, 

			function(tabs) {

				var consent = local.consent;

				if (consent === undefined || consent === null) {
					chrome.storage.sync.set({ "consent": "no" }); 
					consent = "no"; 
				} 

				////////////////////

				if (consent === "no") { 
					var collectmsg = "This extension is used strictly for education purposes only and will collect usage data once given consent. The information collected is not sold or distributed to any third party." + "\n\n" + "This extension does not and will not collect usage data without given consent. This extension is unusable without given consent." + "\n\n" + "Consent only needs to be given once.";
					document.getElementById("cse").innerHTML += '<div class="datacollection"> <div class="datainner"> <div class="datatitle">Consent Request</div> <div class="datamessage">'+ collectmsg +'</div> <div class="dataaccept"> <span class="databtnmsg"> To Give Consent Press: </span> <span class="databtnspan"> <button class="databutton">Give Consent</button> </span> </div> </div> </div>';
				} 

				////////////////////

				if(document.getElementsByClassName("databutton")[0]) {

					document.getElementsByClassName("databutton")[0].addEventListener("click", function(){ 

						chrome.storage.sync.set({ "consent": "yes" });

						document.getElementsByClassName("datacollection")[0].remove();

						chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						  chrome.tabs.reload(tabs[0].id);
						});

						window.close();

					});

				}

			});

		});

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		chrome.storage.sync.get(['consent'], function(local) {

			var consent = local.consent;

			if (consent === undefined || consent === null) {
				chrome.storage.sync.set({ "consent": "no" }); 
				consent = "no"; 
			} 

			else if (consent === "yes") { 

				var features = JSON.parse(data);

				chrome.tabs.query({ active: true, currentWindow: true }, 

				////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

				function(tabs) {

					if(tabs[0].url.split('//')[1].split('/')[0].toString('') === "www.twitch.tv") {

						var value = features;

						for (var f = 0; f < Object.keys(value).length; f++) {

							for (var o = 0; o < Object.keys(value[f].options).length; o++) {

								var currentOption = value[f].options[o];

								document.getElementById('search_items').innerHTML += 

								'<li class="gopt group'+f+'">'+
									'<div class="option1">'+
										'<div class="opt-title">'+ currentOption.name +'</div>'+ 
										'<div class="opt-desc">'+ currentOption.description +'</div>'+
											'<div class="tssb">'+
												'<div id="' + f + '-' + o + '" class="toggler">'+
												'<div id="slider-off">off</div>'+
												'<div id="slider-on">on</div>'+
												'<div id="' + f + '-' + o + '-slider" class="slider"></div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</li>';
								
								this.sliderId = '#' + f + '-' + o + '-slider';
								this.toggleId = f + '-' + o;

								if(f+1 === Object.keys(value).length) {

									var fpos = 0;

									for (var ff = 0; ff < Object.keys(value).length; ff++) {

										for (var oo = 0; oo < Object.values(value[ff].options).length; oo++) {

											document.getElementsByClassName('toggler')[fpos].addEventListener("click", function (e) {

										 		this.sender = this.getAttribute('id');
										 		this.temp = this.sender.split('-');

										 		featureToggle(this.temp[0], this.temp[1]);
										 		
										 	});

											fpos++;

										}

								 	}

								}

							}

						}

					} else { document.getElementById('search_items').innerHTML += " <p id='usageonly'> For usage on Twitch.tv only </p> "; }

				});

			}

		});

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		chrome.storage.sync.get(['pubToggles', 'pubSync', 'consent'], function(local) {

			var consent = local.consent;

			if (consent === "yes") {

				var features = JSON.parse(data);

				chrome.tabs.query({
					active: true,
					currentWindow: true
				}, 

				function(tabs) {

					var pubSync = local.pubSync;
					var pubToggles;

					if (pubSync === undefined || pubSync === null) { chrome.storage.sync.set({ "pubSync": "set" }, function() { console.log("PubSync Has been Created"); }); pubSync = "set"; } 
					else { pubSync = "set"; }

					if (pubSync) {

						this.toggles = local.pubToggles;

						if (this.toggles) {

							pubToggles = this.toggles;

							this.toggleCount = Object.keys(pubToggles).length;

							for (var i = 0; i < Object.keys(features).length; i++) {

								var value = features[i];

								this.iStr = i.toString();
								this.current = tabs[0].url.split('/')[2];
								this.domain = value.domain;

								for (var o = 0; o < Object.keys(value.options).length; o++) {

									this.oStr = o.toString();
									this.temp = this.iStr + "-" + this.oStr; 
									this.currentOption = value.options[o]; 
									this.active = pubToggles[this.temp];
									
									this.toggleId = '#' + this.temp;
									this.sliderId = '#' + this.temp + '-slider';

									if (this.active == '0' || this.active === undefined || this.active === null) { $(this.toggleId).css({ "background-color": "red" }); $(this.sliderId).css({ "left": "27px" }); }
									else if(this.active == '1') { $(this.toggleId).css({ "background-color": "green" }); $(this.sliderId).css({ "left": "0px" }); }

								}

							}

						}

					} else { console.log('An error occured with pubSync.'); }

				});
			}

		});

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}, error: function() { console.log('An error occured with pubSync.'); }

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function featureToggle(domainId, optionId) {

	var featureId = domainId + '-' + optionId;
	var buttonId = "#" + domainId + "-" + optionId;
	var sliderId = "#" + domainId + "-" + optionId + "-slider";

	var unhashid = sliderId.substr(1);

	chrome.storage.sync.get(['pubToggles', 'pubSync'], function(local) {

		chrome.tabs.query({ active: true, currentWindow: true }, 

		function() {

			var pubSync = local.pubSync;
			var pubToggles = local.pubToggles;

			if (pubSync === undefined || pubSync === null) {
				chrome.storage.sync.set({ "pubSync": "set" }, function() { console.log("PubSync Has been Created"); });
				pubSync = "set";
			} else { pubSync = "set"; console.log("else") }

			if (pubSync) { 

				if (pubToggles === undefined) {

					this.temp = { "pubToggles": {} };

					if( window.getComputedStyle(document.getElementById(unhashid)).getPropertyValue('left') === "27px" ) {
						this.temp.pubToggles[featureId] = "1";
						chrome.storage.sync.set(this.temp, function() {});
						activateOnPage(featureId, "1");
						$(sliderId).animate({ left: "0px" }, 100, function() { $(buttonId).css("background-color", "green"); }); } 
                    else if( window.getComputedStyle(document.getElementById(unhashid)).getPropertyValue('left') === "0px" ) {
						this.temp.pubToggles[featureId] = "0";
						chrome.storage.sync.set(this.temp, function() {});
						activateOnPage(featureId, "0");
						$(sliderId).animate({ left: "27px" }, 100, function() { $(buttonId).css("background-color", "green"); }); }

				} 

				else {

					this.toggles = local.pubToggles;
					this.currentValue = this.toggles[featureId];

					this.temp = { "pubToggles": {} };

					if (this.currentValue === undefined) {

						if( document.getElementById(unhashid).style.left === "27px" ) { 
							this.toggles[featureId] = "1";
							this.temp.pubToggles = this.toggles;
							activateOnPage(featureId, "1");
							$(sliderId).animate({ left: "0px" }, 100, function() { $(buttonId).css("background-color", "green"); }); } 
                   		else if( document.getElementById(unhashid).style.left === "0px" ) { 
                    		this.toggles[featureId] = "0";
							this.temp.pubToggles = this.toggles;
							activateOnPage(featureId, "0");
							$(sliderId).animate({ left: "27px" }, 100, function() { $(buttonId).css("background-color", "green"); }); }
					} 

					else if (this.currentValue == "1") { 

						this.toggles[featureId] = "0";
						this.temp.pubToggles = this.toggles;
						activateOnPage(featureId, "0");
						$(sliderId).animate({ left: "27px" }, 100, function() { $(buttonId).css("background-color", "red"); }); } 
					else if (this.currentValue == '0') { 
						this.toggles[featureId] = "1";
						this.temp.pubToggles = this.toggles;
						activateOnPage(featureId, "1");
						$(sliderId).animate({ left: "0px" }, 100, function() { $(buttonId).css("background-color", "green"); }); } 
					else { this.temp.pubToggles = this.toggles; }

					chrome.storage.sync.set( this.temp, function() {} );

				}

			} else { console.log('An error occured with pubSync.'); }

			///////////////////////////////////////////////////////////////////////////

		});

	});

};

