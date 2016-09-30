	export const test = [{
		tpl: "{{#if a.value}}DeepIf{{/if}}",
		res: "DeepIf",
		msg: "deep if test: true",
		data: {
			a: {
				value: true
			}
		}
	}, {
		tpl: "{{#unless value}}showIfFalse{{/unless}}",
		res: "showIfFalse",
		msg: "unless",
		data: {
			value: false
		}
	}, {
		tpl: "{{#loop}}{{#unless value}}showIfFalse-{{pos}}{{/unless}}{{/loop}}",
		res: "showIfFalse-2",
		msg: "unless @ loop",
		data: {
			loop: [{
				pos: 1,
				value: true
			}, {
				pos: 2,
				value: false
			}]
		}
	}, {
		tpl: "{{#loop}}{{#if value}}showIfFalse-{{pos}}{{/if}}{{/loop}}",
		res: "showIfFalse-1",
		msg: "if @ loop",
		data: {
			loop: [{
				pos: 1,
				value: true
			}, {
				pos: 2,
				value: false
			}]
		}
	}, {
		tpl: "{{#if a.value}}DeepIf{{/if}}",
		res: "",
		msg: "deep if test: false",
		data: {
			a: {
				value: false
			}
		}
	}, {
		tpl: "<p>\n{{param}}</p>",
		res: "<p>\nthisIsTheParam</p>",
		msg: "simple param",
		data: {
			param: "thisIsTheParam"
		}
	}, {
		tpl: "{{param}}",
		res: "thisIsTheParam",
		msg: "simple param",
		data: {
			param: "thisIsTheParam"
		}
	}, {
		tpl: "{{#loop}}{{.}}{{/loop}}",
		res: "123",
		msg: "this in loop",
		data: {
			loop: [1, 2, 3]
		}
	}, {
		tpl: "<p>root node</p>{{#if a.value}}DeepIf{{/if}}{{#if ifvalue}}<p>ifTestTrue:{{param}}</p>{{/if}}",
		res: "<p>root node</p>DeepIf<p>ifTestTrue:thisIsTheParam</p>",
		msg: "nesting",
		data: {
			a: {
				value: true
			},
			ifvalue: true,
			param: "thisIsTheParam"
		}
	}, {
		tpl: "<p>root node</p>{{#if a.value}}DeepIf{{/if}}{{#if ifvalue}}<p>ifTestTrue:{{param}}</p>{{/if}}{{#arr}}<p>{{a}}</p>{{/arr}}",
		res: "<p>root node</p>DeepIf<p>ifTestTrue:thisIsTheParam</p><p>1</p><p>2</p><p>3</p><p>4</p>",
		msg: "nesting2",
		data: {
			a: {
				value: true
			},
			ifvalue: true,
			param: "thisIsTheParam",
			arr: [{
				a: 1
			}, {
				a: 2
			}, {
				a: 3
			}, {
				a: 4
			}]
		}
	}, {
		tpl: "<div>{{#nested2}}{{#items}}<p>{{a}}</p>{{#if last}}isLast{{/if}}{{/items}}{{/nested2}}</div>",
		res: "<div><p>1</p><p>2</p><p>1</p><p>2</p>isLast</div>",
		msg: "nesting3",
		data: {
			nested2: [{
				items: [{
					a: 1
				}, {
					a: 2
				}]
			}, {
				items: [{
					a: 1
				}, {
					a: 2,
					last: true
				}]
			}]
		}
	}, {
		tpl: "<div>{{#nested}}{{#nested}}<p>{{a}}</p>{{#if last}}isLast{{/if}}{{/nested}}zz{{/nested}}</div>",
		res: "<div><p>1</p><p>2</p>zz<p>1</p><p>2</p>isLastzz</div>",
		msg: "nesting4",
		data: {
			nested: [{
				nested: [{
					a: 1
				}, {
					a: 2
				}]
			}, {
				nested: [{
					a: 1
				}, {
					a: 2,
					last: true
				}]
			}]
		}
	}, {
		tpl: "<div>{{#if a.value}}DeepIf {{#if ifvalue}}<p>ifTestTrue:{{param}}</p>{{/if}}zz{{/if}}</div>",
		res: "<div>DeepIf <p>ifTestTrue:thisIsTheParam</p>zz</div>",
		msg: "nested deep if",
		data: {
			a: {
				value: true
			},
			ifvalue: true,
			param: "thisIsTheParam"
		}
	}, {
		tpl: "<div>{{#if a.value}}DeepIf{{#if ifvalueZ}}<p>ifTestTrue:{{param}}</p>{{/if}}zz{{/if}}</div>",
		res: "<div>DeepIfzz</div>",
		msg: "nested deep if 2",
		data: {
			a: {
				value: true
			},
			ifvalueZ: false,
			param: "thisIsTheParam"
		}
	}, {
		tpl: "{{#loop1}}{{#if middle}}{{#loop2}}{{a}}{{/loop2}}{{/if}}{{/loop1}}",
		res: "34",
		msg: "neested loop with if",
		data: {
			loop1: [{
				middle: false,
				loop2: [{
					a: 1
				}, {
					a: 2
				}]
			}, {
				middle: true,
				loop2: [{
					a: 3
				}, {
					a: 4
				}]
			}, {
				middle: false,
				loop2: [{
					a: 5
				}, {
					a: 6
				}]
			}]
		}
	}, {
		tpl: '{{#articles}}<article><h1>{{#heading}}{{.}}{{/heading}}</h1><p>{{intro}}</p>{{#images}}<img src="{{src}}" title="{{title}}"/>{{/images}}</article>{{/articles}}',
		msg: "anders hax",
		res: '<article><h1>_heading_</h1><p>_intro_</p><img src="_src_" title="_title_"/></article><article><h1>_heading_</h1><p>_intro_</p><img src="_src_" title="_title_"/></article><article><h1>_heading_</h1><p>_intro_</p><img src="_src_" title="_title_"/></article>',
		data: {
			articles: [{
				heading: '_heading_',
				intro: '_intro_',
				images: [{
					src: '_src_',
					title: '_title_'
				}]
			}, {
				heading: '_heading_',
				intro: '_intro_',
				images: [{
					src: '_src_',
					title: '_title_'
				}]
			}, {
				heading: '_heading_',
				intro: '_intro_',
				images: [{
					src: '_src_',
					title: '_title_'
				}]
			}]
		}
	}, {
		tpl: "{{#loop2}}1{{/loop2}}mellan{{#loop3}}2{{/loop3}}",
		msg: "yolo",
		res: "1111mellan2222",
		data: {
			loop2: [1, 2, 3, 4],
			loop3: [1, 2, 3, 4]
		}
	}, {
		tpl: '{{#loop2}}1{{/loop2}}{{label "apa_2"}}{{#loop3}}2{{/loop3}}',
		msg: "helper",
		res: "1111apa_2_helped2222",
		data: {
			loop2: [1, 2, 3, 4],
			loop3: [1, 2, 3, 4]
		}
	}, {
		tpl: '{{#unless hideAll}}<div class="vbs-selector-grid" data-grid-container>{{#ftGroups.groups}}<div class="vbs-selector-grid__group">{{#if showGroupHeadings}}<div class="vbs-selector-grid__header"><h2>{{name}}</h2></div>{{/if}}<div class="vbs-selector-grid__content vbs-grid vbs-grid_items_{{numGridItems}}">{{#features}}<div class="vbs-selector-grid__item vbs-grid__item{{#unless readOnly}}{{#if selected}} vbs-selector-grid__item_is_selected{{/if}}{{/unless}}" data-feature-id="{{id}}" data-feature-code="{{featureCode}}" data-gcc-code="{{gccCode}}" data-feature-type="{{type}}" data-info-dialog-type="{{dialogType}}" data-grid-item data-grid-group={{index}}> <div class="vbs-selector-grid__inner"> {{#unless noImages}} <div class="vbs-selector-grid__img {{#unless imageUrl}}vbs-selector-grid__img_no-img{{/unless}}" {{#unless imageUrl}}{{#if isMobile}} style="display:none"{{/if}}{{/unless}}> {{#if imageUrl}} <img src="{{imageUrl}}" alt="" {{#if video}}data-play-button=""{{/if}}{{#unless video}}data-information-button{{/unless}} data-image-{{id}}> {{#if video}} <button class="vbs-btn-icon vbs-btn-icon_shade_dark vbs-btn-icon_size_44" type="button" data-icon="play" data-play-button=""></button> {{/if}} {{/if}} </div> {{/unless}} <div data-grid-content> <h3>{{name}}</h3> {{#if description}} <div class="vbs-selector-grid__text">{{ellipsis description}}</div> {{/if}} {{#if packageContent}} <div class="vbs-selector-grid__text">{{packageContent}}</div> {{/if}} </div> </div> <div class="vbs-selector-grid__price"> {{#if notAvailableOnline}} <em>{{notAvailableOnline}}</em> {{/if}} {{#if includedLabel}} <em>{{includedLabel}}</em> {{/if}} {{#unless hidePrice}} {{formattedPrice}} {{/unless}} {{#if showInfoIcon}} <button class="vbs-btn-icon vbs-btn-icon_size_24" type="button" data-icon="info" data-information-button></button> {{/if}} </div> {{#unless readOnly}} {{#if isOffer}} <button class="vbs-btn vbs-btn_width_full" type="button" data-button-href="{{linkUrl}}" data-select-feature>{{label "general_more"}}</button> {{else}} {{#if notDeselectable}} <button class="vbs-btn vbs-btn_width_full vbs-btn_state_disabled" type="button" data-icon="checkmark">{{label "general_included"}}</button> {{else}} {{#if selected}} <button class="vbs-btn vbs-btn_width_full vbs-btn_state_selected" data-deselect-feature type="button" data-icon="checkmark">{{label "general_selected"}}</button> {{else}} <button class="vbs-btn vbs-btn_width_full" type="button" data-select-feature>{{label "general_select"}}</button> {{/if}} {{/if}} {{/if}} {{/unless}} {{#if isExcluded}} <span class="vbs-icon-excluded" data-icon="alert"></span> {{/if}} {{#if debugMode}} <p class="vbs-debug-text" style="color:red; font-size:10px;">{{featureCode}} | {{state}} | {{type}} {{#if exchangeableGroups}} | exchangables{{/if}} | gcc:{{gccCode}} | p:{{position}} {{#if price}}| {{price.value}}${{/if}}</p> {{/if}} {{#unless notDeselectable}} {{#if readOnly}} <button class="vbs-selector-grid__btn-remove" data-icon="close" data-deselect-feature></button> {{/if}} {{/unless}} </div> {{/features}} </div> </div> {{/ftGroups.groups}} </div> {{/unless}} ',
		data: {
			"ftGroups": {
				"groups": [{
					"name": "Tilbehør komplette vinterhjul",
					"features": [{
						"featureCode": "A00156",
						"href": "transition/?select=217481116|106",
						"id": "217481116",
						"name": "Komplette vinterhjul, Matres 7x16 Silverstone 205/55",
						"position": 53,
						"price": {
							"value": 17815,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "selected",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00156",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"isSelected": true,
						"iconCode": "A00156",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": true,
						"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
						"video": null,
						"showInfoIcon": false,
						"packageContent": ""
					}, {
						"featureCode": "A00159",
						"href": "transition/?select=217481131|106",
						"id": "217481131",
						"name": "Komplette vinterhjul, Taranis 7,5x18 Silver bright 225/40",
						"position": 55,
						"price": {
							"value": 28065,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00159",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00159",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
						"video": null,
						"showInfoIcon": false,
						"packageContent": ""
					}, {
						"featureCode": "A00447",
						"href": "transition/?select=217481111|106",
						"id": "217481111",
						"name": "Komplette vinterhjul, Ixion II 7,5x18 DC/Matt black 225/40",
						"position": 56,
						"price": {
							"value": 28065,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "excluded",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00447",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"isExcluded": true,
						"iconCode": "A00447",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
						"video": null,
						"showInfoIcon": false,
						"packageContent": ""
					}],
					"index": 0
				}, {
					"name": "Tilbehør komplette sommerhjul",
					"features": [{
						"featureCode": "A00130",
						"href": "transition/?select=217481119|106",
						"id": "217481119",
						"name": "Komplette sommerhjul, Freja 7x17 Diamond Cut/Light Grey",
						"position": 59,
						"price": {
							"value": 14470,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00130",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00130",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/673c0a16-69e3-425b-b6dd-8d55b59c65ac.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Vi skapte det komplette hjul for din fullstendige harmoni. Lettmetallsfelgene er stylet av Volvos designere å passe bilen perfekt, og dekkene er spesielt valgt ut og tilpasset for å optimalisere din kjøredynamikk, komfort og drivstofføkonomi under alle forhold.\r\n\r\nDimensjon: 7x17\r\nDekkdimensjon: 205/50R17"
					}],
					"index": 1
				}, {
					"name": "Tilbehør",
					"features": [{
						"featureCode": "A00025",
						"href": "transition/?select=217481115|106",
						"id": "217481115",
						"name": "Sykkelholder, rammemontert, aluminium",
						"position": 62,
						"price": {
							"value": 1170,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00025",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00025",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/40f28e8c-5cd5-4ccd-979c-b189bfe8c0e7.jpg",
						"video": true,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Ta med sykkelen uten problemer og med stil. Ved hjelp av dette stabile sykkelstativet kan du feste sykkelen trygt med et enkelt håndgrep. Den gummibelagte rammeholderen justeres automatisk til sykkelrammer på inntil 100 mm i diameter, og de hurtigmonterte hjulholderne kan ta imot en hel rekke ulike hjulstørrelser. En dobbelt låsefunksjon låser sykkelen fast til stativet og lasteholderen."
					}, {
						"featureCode": "A00093",
						"href": "transition/?select=217481124|106",
						"id": "217481124",
						"name": "Barnesete med isofix feste (0-13kg)",
						"position": 63,
						"price": {
							"value": 4050,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00093",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00093",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/3f84b774-ab54-4b92-9392-a268cc0236a1.jpg",
						"video": true,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Spedbarn, fra nyfødte og opp til omtrent ett års alder, reiser trygt bakovervendt i dette komfortable setet. Det monteres ved bruk av bilens sikkerhetsbelter. Og for ekstra enkel montering, kan du velge en ISOFIX-base for setefeste. Sidevinger gir ekstra beskyttelse ved støt fra siden, og hodestøtten og fempunktsbeltet kan enkelt justeres. Hodestøtten er polstret så barnet skal sove komfortabelt, og setet er utstyrt med solskjerm. Babybilstolen er også lett å bære, og kan tas ut og brukes som babystol."
					}, {
						"featureCode": "A00101",
						"href": "transition/?select=217481136|106",
						"id": "217481136",
						"name": "Lasteholder",
						"position": 64,
						"price": {
							"value": 2135,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00101",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00101",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/dc1ea21e-352d-42a4-abbc-4c6959c57ad5.jpg",
						"video": true,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Konstruert for å passe sammen med bilens fabrikk-klargjorte taklistfeste. Disse kraftige, buede aluminiumsprofilene med føtter i svart plast sørger for rask og enkel festing av Volvos lastetilbehør."
					}, {
						"featureCode": "A00107",
						"href": "transition/?select=217481129|164",
						"id": "217481129",
						"name": "Utvendig styling, hvit stripe",
						"position": 65,
						"price": {
							"value": 12365,
							"currency": "NOK",
							"type": {
								"value": "Normal"
							}
						},
						"state": "available",
						"type": 164,
						"hideLayer": [162],
						"isAccessory": true,
						"gccCode": "A00107",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": null,
						"iconCode": "A00107",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/16f3769d-41ac-4dd4-807d-d356eb069866.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Skap din egen, unike V40 med dette unike utvendige stylingsettet. Det inkluderer designelementer testet i vindtunnel, som deflektorer på siden, deflektorer bak og diffuser bak. Sammen med takspoiler og ekstrautstyret aerodynamiske Ailos 18-tommers felger, strømmer luften friere over karosseriet. De ovale eksosrørene i krombelagt rustfritt stål integrerer perfekt med diffuseren bak og tilføyer en eksklusiv, sporty stil til din V40. For et elegant utseende er settet lakkert i samme farge som bilen . din, og med hvite striper i deflektorene kan du ytterligere forsterke din personlige stil."
					}, {
						"featureCode": "A00113",
						"href": "transition/?select=217481133|164",
						"id": "217481133",
						"name": "Utvendig styling, rød stripe",
						"position": 66,
						"price": {
							"value": 12365,
							"currency": "NOK",
							"type": {
								"value": "Normal"
							}
						},
						"state": "available",
						"type": 164,
						"hideLayer": [162],
						"isAccessory": true,
						"gccCode": "A00113",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": null,
						"iconCode": "A00113",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/5bf5ff08-abdc-4bf1-b149-c21aefe50be4.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Skap din egen, unike V40 med dette unike utvendige stylingsettet. Det inkluderer designelementer testet i vindtunnel, som deflektorer på siden, deflektorer bak og diffuser bak. Sammen med takspoiler og ekstrautstyret aerodynamiske Ailos 18-tommers felger, strømmer luften friere over karosseriet. De ovale eksosrørene i krombelagt rustfritt stål integrerer perfekt med diffuseren bak og tilføyer en eksklusiv, sporty stil til din V40. For et elegant utseende er settet lakkert i samme farge som bile  din, og med de røde stripene i deflektorene kan du ytterligere forsterke din personlige stil."
					}, {
						"featureCode": "A00117",
						"href": "transition/?select=217481130|164",
						"id": "217481130",
						"name": "Utvendig styling, lime stripe",
						"position": 67,
						"price": {
							"value": 12365,
							"currency": "NOK",
							"type": {
								"value": "Normal"
							}
						},
						"state": "excluded",
						"type": 164,
						"hideLayer": [162],
						"includes": ["212426819"],
						"isAccessory": true,
						"gccCode": "A00117",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": null,
						"isExcluded": true,
						"iconCode": "A00117",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/5dd43097-275a-491e-b6fe-5b7cda888c12.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Skap din egen, unike V40 med dette unike utvendige stylingsettet. Det inkluderer designelementer testet i vindtunnel, som deflektorer på siden, deflektorer bak og diffuser bak. Sammen med takspoiler og ekstrautstyret aerodynamiske Ailos 18-tommers felger, strømmer luften friere over karosseriet. De ovalene eksosrørene i krombelagt rustfritt stål integrerer perfekt med diffuseren bak og tilføyer en eksklusiv, sporty stil til din V40. For et elegant utseende er settet lakkert i samme farge som bilen din, og med Lime-stripene i deflektorene kan du ytterligere forsterke din personlige stil. "
					}, {
						"featureCode": "A00119",
						"href": "transition/?select=217481128|106",
						"id": "217481128",
						"name": "Lasteromsmatte, tekstil, vendbar",
						"position": 68,
						"price": {
							"value": 1445,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00119",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00119",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/3c764ab5-ba09-44f5-a260-115ed099115f.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Med denne elegante tekstilmatten kan du opprettholde det elegante utseendet i bagasjerommet selv om du fra tid til annen har med deg tilsmusset bagasje. Matten er vendbar og vanntett, med fargekoordinert stoff på den ene siden og plast på den andre siden."
					}, {
						"featureCode": "A00234",
						"href": "transition/?select=217481134|106",
						"id": "217481134",
						"name": "Takboks, Space Design 420, Sort",
						"position": 69,
						"price": {
							"value": 6970,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00234",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00234",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
						"video": null,
						"showInfoIcon": false,
						"packageContent": ""
					}, {
						"featureCode": "A00246",
						"href": "transition/?select=217481132|106",
						"id": "217481132",
						"name": "Sportspedaler, aluminium",
						"position": 70,
						"price": {
							"value": 1450,
							"currency": "NOK",
							"type": {
								"value": "Normal"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00246",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": null,
						"iconCode": "A00246",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/0a869603-ec92-4dc5-9ecc-d547a1210d9e.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "For å hjelpe deg med å opprette et enda mer individuelt og sportslig utseende for din Volvo, legger sportspedaler til et motorsportpreg. Pedalene er av børstet aluminium og gummi, noe som ytterligere legger til en følelse av eksklusivitet. (Standard på R-Design)"
					}, {
						"featureCode": "A00255",
						"href": "transition/?select=217481117|106",
						"id": "217481117",
						"name": "Solbeskyttelse, dører bak",
						"position": 71,
						"price": {
							"value": 1315,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00255",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00255",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
						"video": null,
						"showInfoIcon": false,
						"packageContent": ""
					}, {
						"featureCode": "A00256",
						"href": "transition/?select=217481135|106",
						"id": "217481135",
						"name": "Solbeskyttelse, bakre vindu",
						"position": 72,
						"price": {
							"value": 995,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00256",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00256",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/7ac88cd7-70ad-4a73-8225-ba4b7068ddcb.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Denne solskjermen festes enkelt til bakvinduet og bidrar til å redusere varme og stråling fra direkte sollys. Den gjør din Volvo mer særpreget. Vinduene ser sotet ut. Enkle å fjerne når de ikke trengs lenger."
					}, {
						"featureCode": "A00273",
						"href": "transition/?select=217481120|106",
						"id": "217481120",
						"name": "Avtagbart hengerfeste",
						"position": 73,
						"price": {
							"value": 11460,
							"currency": "NOK",
							"type": {
								"value": "Normal"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00273",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": null,
						"iconCode": "A00273",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/5e484d09-5b26-4d1e-92af-7c67ff8ae54c.jpg",
						"video": true,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Med det elektrisk innfellbare tilhengerfestet har du alltid enkel adkomst til tilhengerfestet. Trykk på en knapp på innsiden av bagasjerommet for å felle ut tilhengerfestet. Alt du trenger å gjøre, er å gi det et trykk for å sikre det. Når du ikke trenger tilhengerfestet, skjules det elegant."
					}, {
						"featureCode": "A00295",
						"href": "transition/?select=217481121|106",
						"id": "217481121",
						"name": "Takspoiler med leppe",
						"position": 74,
						"price": {
							"value": 4915,
							"currency": "NOK",
							"type": {
								"value": "Normal"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00295",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": null,
						"iconCode": "A00295",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/6dce860a-07ca-4c28-b413-74e00cf07d39.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "En unik spoiler med flyinspirerte finner og vinger som understreker det sporty og aerodynamiske imaget til din Volvo V40. Med integrerte bremselys og lakkert i samme farge som din V40."
					}, {
						"featureCode": "A00328",
						"href": "transition/?select=217481110|106",
						"id": "217481110",
						"name": "Barnesete, vendbar (9-25kg)",
						"position": 75,
						"price": {
							"value": 3995,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00328",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00328",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/e3a47e95-5fc1-4fc0-9c0d-59125e5648cf.jpg",
						"video": true,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Fra 9 måneders alder til omtrent 6 år kan et barn fortsette å sitte bakovervendt i det nye barnesetet. Avansert design gir best tilgjengelig beskyttelse og fleksible seteplasseringer i mange år. Setet er montert med bilens sikkerhetsbelte og kan enkelt justeres for optimal komfort og sikkerhet. Et integrert støtteben gjør det lettere å montere det bakover. Vi anbefaler at barnet sitter bakovervendt så lenge som mulig. Men når barnet blir større (15-25 kg) og ikke kan sitte komfortabelt bakover lenger, kan setet også brukes forover, som sittepute, slik at barnet kommer i riktig stilling for sikkerhetsbeltet i bilen."
					}, {
						"featureCode": "A00329",
						"href": "transition/?select=217481126|106",
						"id": "217481126",
						"name": "Barnesete, pute/rygg (15-36kg)",
						"position": 76,
						"price": {
							"value": 2250,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00329",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00329",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/365f53b5-3fa0-4a65-8a56-f2b1fef51048.jpg",
						"video": true,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Volvos sittepute plasserer barnet i riktig høyde for sikkerhetsbeltet og er designet med optimal sidekollisjonsbeskyttelse. Hodestøtten og bredden justeres enkelt for økt komfort, og ryggstøtten kan lenes tilbake når barnet vil hvile."
					}, {
						"featureCode": "A00380",
						"href": "transition/?select=217481123|106",
						"id": "217481123",
						"name": "Sykkelholder, hengerfeste-montert, 2 sykler",
						"position": 77,
						"price": {
							"value": 4115,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00380",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00380",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/3acf94e5-1bb0-49c4-b052-14453ad02e59.jpg",
						"video": true,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Få full utnyttelse av tilhengerfestet med dette avanserte aluminiumsykkelstativet. Her kan du praktisk transportere én eller to sykler. Den lave monteringen gjør det lett å laste på syklene. Det kan også vippes bort fra kjøretøyet, så man lett får tilgang til lasterommet. Det tilfredsstiller gjeldende forskrifter fordi det er utstyrt med baklysbjelke og nummerskiltholder. Når stativet ikke behøves, kan det felles sammen for praktisk oppbevaring. Maks. last 46 kg."
					}, {
						"featureCode": "A00382",
						"href": "transition/?select=217481122|106",
						"id": "217481122",
						"name": "Lasteromsmatte, tekstil, vend- og foldebar",
						"position": 78,
						"price": {
							"value": 1445,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"includes": ["212426785"],
						"isAccessory": true,
						"gccCode": "A00382",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00382",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/1c848801-9d0d-4168-846e-9bc79db1c0ff.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Med denne matten kan du bevare det elegante utseendet i lasterommet selv om du nå og da frakter skitne gjenstander. Med seteryggene nedfelt legger du bare matten utover for å dekke hele lasteromsgulvet. Matten er vendbar og vanntett med farget tekstil på én side og plast på den andre. "
					}, {
						"featureCode": "A00387",
						"href": "transition/?select=217481137|106",
						"id": "217481137",
						"name": "Takboks, ekspanderbar",
						"position": 79,
						"price": {
							"value": 7375,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00387",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00387",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/13481d67-4cdb-4eaf-aeb0-5cf7f1098e01.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Takboksheis for enkel og komfortabel håndtering og sikker lagring av takboks. Maks. last 50 kg."
					}, {
						"featureCode": "A00425",
						"href": "transition/?select=217481112|106",
						"id": "217481112",
						"name": "Sykkelholder, hengerfeste-montert, sammenleggbar, 2 sykler",
						"position": 80,
						"price": {
							"value": 5895,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00425",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00425",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/e2b556ac-8ee9-4ed0-94dd-0b932ef643da.jpg",
						"video": true,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "Vårt kompakte nye sykkelstativ er svært enkelt å bruke, kan holde to sykler og monteres på bilens slepefeste i to enkle trinn. Dette allsidige sykkelstativet gir deg også friheten til å ta med deg syklene på både korte og lange reiser. Og når stativet ikke er i bruk, er det enkelt å oppbevare det enten i bilen eller i hjemmet ditt. For din egen trygghet, er sykkelstativet testet og godkjent for å møte markedets strengeste kvalitets- og sikkerhetsstandarder. Maks. last 60 kg."
					}, {
						"featureCode": "A00427",
						"href": "transition/?select=217481109|106",
						"id": "217481109",
						"name": "Batterilader",
						"position": 81,
						"price": {
							"value": 6175,
							"currency": "NOK",
							"type": {
								"value": "ExclLabour"
							}
						},
						"state": "available",
						"type": 106,
						"isAccessory": true,
						"gccCode": "A00427",
						"gccType": 12,
						"formattedPrice": null,
						"priceType": "price_accessories_mounting",
						"iconCode": "A00427",
						"includedLabel": "Monteringskostnader er ikke inkludert",
						"hidePrice": false,
						"notAvailableOnline": "Not available for online purchase",
						"selected": false,
						"imageUrl": "http://esd.volvocars.com/imageweb/cc8bb0e6-7ce8-4258-a13b-085f0d125eb5.jpg",
						"video": false,
						"showInfoIcon": true,
						"packageContent": "",
						"description": "For å sørge for at bilbatteriet ditt alltid har tilstrekkelig startkapasitet i kaldt vær når den drivstoffdrevne motor- og kupévarmeren benyttes, er vår batterilader et veldig nyttig tilbehør. Dette er spesielt nyttig i svært kaldt klima der Volvo'en brukes til korte turer og den drivstoffdrevne motor- og kupévarmeren alltid benyttes. Den er også lett å koble til med den elektriske tilkoblingen i bilens støtfanger foran. Og regelmessig lading holder batteriet i toppform og forlenger levetiden."
					}],
					"index": 2
				}],
				"type": "internal_accessories"
			},
			"flatlist": [{
				"featureCode": "A00156",
				"href": "transition/?select=217481116|106",
				"id": "217481116",
				"name": "Komplette vinterhjul, Matres 7x16 Silverstone 205/55",
				"position": 53,
				"price": {
					"value": 17815,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "selected",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00156",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"isSelected": true,
				"iconCode": "A00156",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": true,
				"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
				"video": null,
				"showInfoIcon": false,
				"packageContent": ""
			}, {
				"featureCode": "A00159",
				"href": "transition/?select=217481131|106",
				"id": "217481131",
				"name": "Komplette vinterhjul, Taranis 7,5x18 Silver bright 225/40",
				"position": 55,
				"price": {
					"value": 28065,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00159",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00159",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
				"video": null,
				"showInfoIcon": false,
				"packageContent": ""
			}, {
				"featureCode": "A00447",
				"href": "transition/?select=217481111|106",
				"id": "217481111",
				"name": "Komplette vinterhjul, Ixion II 7,5x18 DC/Matt black 225/40",
				"position": 56,
				"price": {
					"value": 28065,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "excluded",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00447",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"isExcluded": true,
				"iconCode": "A00447",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
				"video": null,
				"showInfoIcon": false,
				"packageContent": ""
			}, {
				"featureCode": "A00130",
				"href": "transition/?select=217481119|106",
				"id": "217481119",
				"name": "Komplette sommerhjul, Freja 7x17 Diamond Cut/Light Grey",
				"position": 59,
				"price": {
					"value": 14470,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00130",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00130",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/673c0a16-69e3-425b-b6dd-8d55b59c65ac.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Vi skapte det komplette hjul for din fullstendige harmoni. Lettmetallsfelgene er stylet av Volvos designere å passe bilen perfekt, og dekkene er spesielt valgt ut og tilpasset for å optimalisere din kjøredynamikk, komfort og drivstofføkonomi under alle forhold.\r\n\r\nDimensjon: 7x17\r\nDekkdimensjon: 205/50R17"
			}, {
				"featureCode": "A00025",
				"href": "transition/?select=217481115|106",
				"id": "217481115",
				"name": "Sykkelholder, rammemontert, aluminium",
				"position": 62,
				"price": {
					"value": 1170,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00025",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00025",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/40f28e8c-5cd5-4ccd-979c-b189bfe8c0e7.jpg",
				"video": true,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Ta med sykkelen uten problemer og med stil. Ved hjelp av dette stabile sykkelstativet kan du feste sykkelen trygt med et enkelt håndgrep. Den gummibelagte rammeholderen justeres automatisk til sykkelrammer på inntil 100 mm i diameter, og de hurtigmonterte hjulholderne kan ta imot en hel rekke ulike hjulstørrelser. En dobbelt låsefunksjon låser sykkelen fast til stativet og lasteholderen."
			}, {
				"featureCode": "A00093",
				"href": "transition/?select=217481124|106",
				"id": "217481124",
				"name": "Barnesete med isofix feste (0-13kg)",
				"position": 63,
				"price": {
					"value": 4050,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00093",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00093",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/3f84b774-ab54-4b92-9392-a268cc0236a1.jpg",
				"video": true,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Spedbarn, fra nyfødte og opp til omtrent ett års alder, reiser trygt bakovervendt i dette komfortable setet. Det monteres ved bruk av bilens sikkerhetsbelter. Og for ekstra enkel montering, kan du velge en ISOFIX-base for setefeste. Sidevinger gir ekstra beskyttelse ved støt fra siden, og hodestøtten og fempunktsbeltet kan enkelt justeres. Hodestøtten er polstret så barnet skal sove komfortabelt, og setet er utstyrt med solskjerm. Babybilstolen er også lett å bære, og kan tas ut og brukes som babystol."
			}, {
				"featureCode": "A00101",
				"href": "transition/?select=217481136|106",
				"id": "217481136",
				"name": "Lasteholder",
				"position": 64,
				"price": {
					"value": 2135,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00101",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00101",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/dc1ea21e-352d-42a4-abbc-4c6959c57ad5.jpg",
				"video": true,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Konstruert for å passe sammen med bilens fabrikk-klargjorte taklistfeste. Disse kraftige, buede aluminiumsprofilene med føtter i svart plast sørger for rask og enkel festing av Volvos lastetilbehør."
			}, {
				"featureCode": "A00107",
				"href": "transition/?select=217481129|164",
				"id": "217481129",
				"name": "Utvendig styling, hvit stripe",
				"position": 65,
				"price": {
					"value": 12365,
					"currency": "NOK",
					"type": {
						"value": "Normal"
					}
				},
				"state": "available",
				"type": 164,
				"hideLayer": [162],
				"isAccessory": true,
				"gccCode": "A00107",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": null,
				"iconCode": "A00107",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/16f3769d-41ac-4dd4-807d-d356eb069866.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Skap din egen, unike V40 med dette unike utvendige stylingsettet. Det inkluderer designelementer testet i vindtunnel, som deflektorer på siden, deflektorer bak og diffuser bak. Sammen med takspoiler og ekstrautstyret aerodynamiske Ailos 18-tommers felger, strømmer luften friere over karosseriet. De ovale eksosrørene i krombelagt rustfritt stål integrerer perfekt med diffuseren bak og tilføyer en eksklusiv, sporty stil til din V40. For et elegant utseende er settet lakkert i samme farge som bilen . din, og med hvite striper i deflektorene kan du ytterligere forsterke din personlige stil."
			}, {
				"featureCode": "A00113",
				"href": "transition/?select=217481133|164",
				"id": "217481133",
				"name": "Utvendig styling, rød stripe",
				"position": 66,
				"price": {
					"value": 12365,
					"currency": "NOK",
					"type": {
						"value": "Normal"
					}
				},
				"state": "available",
				"type": 164,
				"hideLayer": [162],
				"isAccessory": true,
				"gccCode": "A00113",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": null,
				"iconCode": "A00113",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/5bf5ff08-abdc-4bf1-b149-c21aefe50be4.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Skap din egen, unike V40 med dette unike utvendige stylingsettet. Det inkluderer designelementer testet i vindtunnel, som deflektorer på siden, deflektorer bak og diffuser bak. Sammen med takspoiler og ekstrautstyret aerodynamiske Ailos 18-tommers felger, strømmer luften friere over karosseriet. De ovale eksosrørene i krombelagt rustfritt stål integrerer perfekt med diffuseren bak og tilføyer en eksklusiv, sporty stil til din V40. For et elegant utseende er settet lakkert i samme farge som bile  din, og med de røde stripene i deflektorene kan du ytterligere forsterke din personlige stil."
			}, {
				"featureCode": "A00117",
				"href": "transition/?select=217481130|164",
				"id": "217481130",
				"name": "Utvendig styling, lime stripe",
				"position": 67,
				"price": {
					"value": 12365,
					"currency": "NOK",
					"type": {
						"value": "Normal"
					}
				},
				"state": "excluded",
				"type": 164,
				"hideLayer": [162],
				"includes": ["212426819"],
				"isAccessory": true,
				"gccCode": "A00117",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": null,
				"isExcluded": true,
				"iconCode": "A00117",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/5dd43097-275a-491e-b6fe-5b7cda888c12.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Skap din egen, unike V40 med dette unike utvendige stylingsettet. Det inkluderer designelementer testet i vindtunnel, som deflektorer på siden, deflektorer bak og diffuser bak. Sammen med takspoiler og ekstrautstyret aerodynamiske Ailos 18-tommers felger, strømmer luften friere over karosseriet. De ovalene eksosrørene i krombelagt rustfritt stål integrerer perfekt med diffuseren bak og tilføyer en eksklusiv, sporty stil til din V40. For et elegant utseende er settet lakkert i samme farge som bilen din, og med Lime-stripene i deflektorene kan du ytterligere forsterke din personlige stil. "
			}, {
				"featureCode": "A00119",
				"href": "transition/?select=217481128|106",
				"id": "217481128",
				"name": "Lasteromsmatte, tekstil, vendbar",
				"position": 68,
				"price": {
					"value": 1445,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00119",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00119",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/3c764ab5-ba09-44f5-a260-115ed099115f.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Med denne elegante tekstilmatten kan du opprettholde det elegante utseendet i bagasjerommet selv om du fra tid til annen har med deg tilsmusset bagasje. Matten er vendbar og vanntett, med fargekoordinert stoff på den ene siden og plast på den andre siden."
			}, {
				"featureCode": "A00234",
				"href": "transition/?select=217481134|106",
				"id": "217481134",
				"name": "Takboks, Space Design 420, Sort",
				"position": 69,
				"price": {
					"value": 6970,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00234",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00234",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
				"video": null,
				"showInfoIcon": false,
				"packageContent": ""
			}, {
				"featureCode": "A00246",
				"href": "transition/?select=217481132|106",
				"id": "217481132",
				"name": "Sportspedaler, aluminium",
				"position": 70,
				"price": {
					"value": 1450,
					"currency": "NOK",
					"type": {
						"value": "Normal"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00246",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": null,
				"iconCode": "A00246",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/0a869603-ec92-4dc5-9ecc-d547a1210d9e.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "For å hjelpe deg med å opprette et enda mer individuelt og sportslig utseende for din Volvo, legger sportspedaler til et motorsportpreg. Pedalene er av børstet aluminium og gummi, noe som ytterligere legger til en følelse av eksklusivitet. (Standard på R-Design)"
			}, {
				"featureCode": "A00255",
				"href": "transition/?select=217481117|106",
				"id": "217481117",
				"name": "Solbeskyttelse, dører bak",
				"position": 71,
				"price": {
					"value": 1315,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00255",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00255",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "/proxy/client/4-53-0/core/js/../../configuratortype/responsive/assets/theme/bdgq32014/img/missing-img.png",
				"video": null,
				"showInfoIcon": false,
				"packageContent": ""
			}, {
				"featureCode": "A00256",
				"href": "transition/?select=217481135|106",
				"id": "217481135",
				"name": "Solbeskyttelse, bakre vindu",
				"position": 72,
				"price": {
					"value": 995,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00256",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00256",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/7ac88cd7-70ad-4a73-8225-ba4b7068ddcb.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Denne solskjermen festes enkelt til bakvinduet og bidrar til å redusere varme og stråling fra direkte sollys. Den gjør din Volvo mer særpreget. Vinduene ser sotet ut. Enkle å fjerne når de ikke trengs lenger."
			}, {
				"featureCode": "A00273",
				"href": "transition/?select=217481120|106",
				"id": "217481120",
				"name": "Avtagbart hengerfeste",
				"position": 73,
				"price": {
					"value": 11460,
					"currency": "NOK",
					"type": {
						"value": "Normal"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00273",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": null,
				"iconCode": "A00273",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/5e484d09-5b26-4d1e-92af-7c67ff8ae54c.jpg",
				"video": true,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Med det elektrisk innfellbare tilhengerfestet har du alltid enkel adkomst til tilhengerfestet. Trykk på en knapp på innsiden av bagasjerommet for å felle ut tilhengerfestet. Alt du trenger å gjøre, er å gi det et trykk for å sikre det. Når du ikke trenger tilhengerfestet, skjules det elegant."
			}, {
				"featureCode": "A00295",
				"href": "transition/?select=217481121|106",
				"id": "217481121",
				"name": "Takspoiler med leppe",
				"position": 74,
				"price": {
					"value": 4915,
					"currency": "NOK",
					"type": {
						"value": "Normal"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00295",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": null,
				"iconCode": "A00295",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/6dce860a-07ca-4c28-b413-74e00cf07d39.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "En unik spoiler med flyinspirerte finner og vinger som understreker det sporty og aerodynamiske imaget til din Volvo V40. Med integrerte bremselys og lakkert i samme farge som din V40."
			}, {
				"featureCode": "A00328",
				"href": "transition/?select=217481110|106",
				"id": "217481110",
				"name": "Barnesete, vendbar (9-25kg)",
				"position": 75,
				"price": {
					"value": 3995,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00328",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00328",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/e3a47e95-5fc1-4fc0-9c0d-59125e5648cf.jpg",
				"video": true,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Fra 9 måneders alder til omtrent 6 år kan et barn fortsette å sitte bakovervendt i det nye barnesetet. Avansert design gir best tilgjengelig beskyttelse og fleksible seteplasseringer i mange år. Setet er montert med bilens sikkerhetsbelte og kan enkelt justeres for optimal komfort og sikkerhet. Et integrert støtteben gjør det lettere å montere det bakover. Vi anbefaler at barnet sitter bakovervendt så lenge som mulig. Men når barnet blir større (15-25 kg) og ikke kan sitte komfortabelt bakover lenger, kan setet også brukes forover, som sittepute, slik at barnet kommer i riktig stilling for sikkerhetsbeltet i bilen."
			}, {
				"featureCode": "A00329",
				"href": "transition/?select=217481126|106",
				"id": "217481126",
				"name": "Barnesete, pute/rygg (15-36kg)",
				"position": 76,
				"price": {
					"value": 2250,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00329",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00329",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/365f53b5-3fa0-4a65-8a56-f2b1fef51048.jpg",
				"video": true,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Volvos sittepute plasserer barnet i riktig høyde for sikkerhetsbeltet og er designet med optimal sidekollisjonsbeskyttelse. Hodestøtten og bredden justeres enkelt for økt komfort, og ryggstøtten kan lenes tilbake når barnet vil hvile."
			}, {
				"featureCode": "A00380",
				"href": "transition/?select=217481123|106",
				"id": "217481123",
				"name": "Sykkelholder, hengerfeste-montert, 2 sykler",
				"position": 77,
				"price": {
					"value": 4115,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00380",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00380",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/3acf94e5-1bb0-49c4-b052-14453ad02e59.jpg",
				"video": true,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Få full utnyttelse av tilhengerfestet med dette avanserte aluminiumsykkelstativet. Her kan du praktisk transportere én eller to sykler. Den lave monteringen gjør det lett å laste på syklene. Det kan også vippes bort fra kjøretøyet, så man lett får tilgang til lasterommet. Det tilfredsstiller gjeldende forskrifter fordi det er utstyrt med baklysbjelke og nummerskiltholder. Når stativet ikke behøves, kan det felles sammen for praktisk oppbevaring. Maks. last 46 kg."
			}, {
				"featureCode": "A00382",
				"href": "transition/?select=217481122|106",
				"id": "217481122",
				"name": "Lasteromsmatte, tekstil, vend- og foldebar",
				"position": 78,
				"price": {
					"value": 1445,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"includes": ["212426785"],
				"isAccessory": true,
				"gccCode": "A00382",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00382",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/1c848801-9d0d-4168-846e-9bc79db1c0ff.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Med denne matten kan du bevare det elegante utseendet i lasterommet selv om du nå og da frakter skitne gjenstander. Med seteryggene nedfelt legger du bare matten utover for å dekke hele lasteromsgulvet. Matten er vendbar og vanntett med farget tekstil på én side og plast på den andre. "
			}, {
				"featureCode": "A00387",
				"href": "transition/?select=217481137|106",
				"id": "217481137",
				"name": "Takboks, ekspanderbar",
				"position": 79,
				"price": {
					"value": 7375,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00387",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00387",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/13481d67-4cdb-4eaf-aeb0-5cf7f1098e01.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Takboksheis for enkel og komfortabel håndtering og sikker lagring av takboks. Maks. last 50 kg."
			}, {
				"featureCode": "A00425",
				"href": "transition/?select=217481112|106",
				"id": "217481112",
				"name": "Sykkelholder, hengerfeste-montert, sammenleggbar, 2 sykler",
				"position": 80,
				"price": {
					"value": 5895,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00425",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00425",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/e2b556ac-8ee9-4ed0-94dd-0b932ef643da.jpg",
				"video": true,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "Vårt kompakte nye sykkelstativ er svært enkelt å bruke, kan holde to sykler og monteres på bilens slepefeste i to enkle trinn. Dette allsidige sykkelstativet gir deg også friheten til å ta med deg syklene på både korte og lange reiser. Og når stativet ikke er i bruk, er det enkelt å oppbevare det enten i bilen eller i hjemmet ditt. For din egen trygghet, er sykkelstativet testet og godkjent for å møte markedets strengeste kvalitets- og sikkerhetsstandarder. Maks. last 60 kg."
			}, {
				"featureCode": "A00427",
				"href": "transition/?select=217481109|106",
				"id": "217481109",
				"name": "Batterilader",
				"position": 81,
				"price": {
					"value": 6175,
					"currency": "NOK",
					"type": {
						"value": "ExclLabour"
					}
				},
				"state": "available",
				"type": 106,
				"isAccessory": true,
				"gccCode": "A00427",
				"gccType": 12,
				"formattedPrice": null,
				"priceType": "price_accessories_mounting",
				"iconCode": "A00427",
				"includedLabel": "Monteringskostnader er ikke inkludert",
				"hidePrice": false,
				"notAvailableOnline": "Not available for online purchase",
				"selected": false,
				"imageUrl": "http://esd.volvocars.com/imageweb/cc8bb0e6-7ce8-4258-a13b-085f0d125eb5.jpg",
				"video": false,
				"showInfoIcon": true,
				"packageContent": "",
				"description": "For å sørge for at bilbatteriet ditt alltid har tilstrekkelig startkapasitet i kaldt vær når den drivstoffdrevne motor- og kupévarmeren benyttes, er vår batterilader et veldig nyttig tilbehør. Dette er spesielt nyttig i svært kaldt klima der Volvo'en brukes til korte turer og den drivstoffdrevne motor- og kupévarmeren alltid benyttes. Den er også lett å koble til med den elektriske tilkoblingen i bilens støtfanger foran. Og regelmessig lading holder batteriet i toppform og forlenger levetiden."
			}],
			"totalNumFeatures": 24,
			"info": "Ingen Tilbehør valgt",
			"findMore": "Prøv å finn noen Tilbehør",
			"heading": "general_accessories",
			"selectMore": "Velg flere Tilbehør",
			"noImages": false,
			"isMobile": false,
			"numGridItems": 2,
			"dialogType": "feature_information",
			"hideAll": false
		}
	}];
