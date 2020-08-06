/* ================= F U N C T I O N S ================= */

function scl(){
	var cp1 = 0;
	var cp2 = 0;
	var cb = $("header").innerHeight();
	if($("header .bstr:not(.slr) .menut .ul2").css("display")!=="none"){
		cb = cb + $("header .menut .ul2").innerHeight();
	}
	$(window).scroll(function(){
		var k = $("header .menut");
		cp1=$("html").scrollTop();
		cp2=$("body").scrollTop();
		if(window.matchMedia("(min-width:768px)").matches){
			if(cp1 > cb || cp2 > cb){
				k.closest(".bstr").addClass("str");
				k.closest(".bstr").parent("div").height(k.closest(".bstr").innerHeight());
			}
			else
			{
				k.closest(".bstr").removeClass("str");
				k.closest(".bstr").parent("div").height(k.closest(".bstr").innerHeight());
			}
		}
		
		if(cp1>500 || cp2>500){
			$(".up").removeClass("ddn");
		}
		else
		{
			$(".up").addClass("ddn");
		}
	});	
};
		
// M E N U _ T O P _ L E F T
function tlmenu(){	
	var c = $(":not(.ovw) > .menut");
	var ths = false;
	var thsn = false;
	var l1 = c.find(".ul1");
	var l2 = c.find(".ul2");
	var l3 = c.find(".ul3");
	var e1 = c.find(".e1");
	var e2 = c.find(".e2");
	var e3 = c.find(".e3");
	var a1 = c.find(".a1");
	var a2 = c.find(".a2");
	var a3 = c.find(".a3");
	var prev1 = c.find(".e1");
	var prev2 = c.find(".e2");
	var rside = 0;
	var lside = 0;
	
function sizem(){
	var sum3 = 0;
	l3.each(function(){
		$(this).find("li").each(function(){
			sum3 = sum3 + 1; 
		});
		$(this).find("li").css("width", 100/sum3+"%");
		sum3 = 0;
	});
}
sizem();

	e1.hover(
		function(){	
				rside=$("html").width()-$(this).offset().left - $(this).width();
				lside=$(this).offset().left;		
				if(rside<l3.width() || lside<l3.width()){
					if((rside<lside && $(this).find(".ul2").hasClass("rside")) 
						|| (rside>lside && $(this).find(".ul2").hasClass("lside"))){
						$(this).find(".ul2").toggleClass("lside");
						$(this).find(".ul2").toggleClass("rside");
					}
				}
				l2.addClass("act");
		},
		function(){
			l2.removeClass("act");
			setTimeout(function(){
				e2.removeClass("act");

			},200);	
		}
	);

var x = 0;
var y = 0;
var xp = 0;
var yp = 0;
var ec = null;
var bHoverCanDraw = true;
var idt = 0;
var open_bottom = 0;

var draw_sub_menu = function(){
	open_bottom = 0;	
	
	e2.each( function(){
		if ( ec !== null && $(this).get(0) === ec.get(0) )
		{
			$(this).addClass("act");
			$(this).find("ul").addClass("act");			
			open_bottom = ($(this).find("ul").innerHeight()+$(this).offset().top);	
		}
		else
		{
			$(this).removeClass("act");
			$(this).find("ul").removeClass("act");
		}
	});
};
	e2.hover(
		function(){
			ec = $(this);

			setTimeout(function(){
				if(bHoverCanDraw 
						){
					draw_sub_menu();
				}	
			},150);
		},
		function(ev){
			xp = ev.pageX;
			yp = ev.pageY;
			ec = null;

			setTimeout(function(){
				if(bHoverCanDraw ){
					draw_sub_menu();
				}	
			},1150);
		}
	);	
	

	
	l2.on("mousemove",function(ev){
		x = ev.pageX;
		y = ev.pageY;

		if(
			yp > 0 && xp > 0 // точка перехода
			&& x>xp && y>yp 
			&& ((x-xp)*2)>Math.abs(y-yp)
			&& (y <= open_bottom)
		){
			bHoverCanDraw = false;
			clearTimeout(idt);
			idt = setTimeout(function sett(){
				bHoverCanDraw = true;
				draw_sub_menu();
			},300);
		}
		else if(x<xp){
			clearTimeout(idt);
			bHoverCanDraw = true;
			draw_sub_menu();
		}
	});
	
	
	a1.click(function(event){
		return false;
	});
	
	$(".menup .menut,.menupl,.menup .ul3").click(function(event){
		event.stopPropagation();
	});
	$(".menupl").click(function(){
		$("html").css("overflow","hidden");
		$(".menup").animate({						
			left:0,
		},500,"swing");
	});
	$("html,.a1").click(function(){
		$("html").css("overflow","auto");
		$(".menup").animate({						
			left:"-100%"
		},500);
	});
	$(".menup .close i").click(function(){
		$("html").css("overflow","auto");
		$(".menup").animate({						
			left:"-100%"
		},1000);
	});

	$(".menup .e2").click(function(){
		$(this).find(".ul3").slideToggle();
		$(this).toggleClass("act");
		if(prev2.length > 1){
			prev2 = $(this);
		}
		if($(this).get(0) !== prev2.get(0)){
			prev2.removeClass("act");
			prev2.find(".ul3").slideUp();
			prev2 = $(this);
		}
	});
}

// T O G G L E _ T A B L E
function ttoggle(){
	$(".torders .sw").click(function(){				
		var i1 = false;
		var i2 = false;
		var i = -1;
		var rsp = 0;
		
		var ths = $(this).parents(".tr2");
		$(this).parents(".torders").find("[class ^= 'tr']").each(function(){			
			if($(this).get(0) === ths.get(0)){
				i2 = true;
				$(this).toggleClass("active");
			}
			else if(i2 && $(this).hasClass("tr3"))
			{								
				$(this).toggleClass("active");				
				i++;
							
				if($(this).find("td[rowspan]").length){
						
					rsp = $(this).find("td[rowspan]");
				}
			}
			else if(i2 && $(this).hasClass("tr2"))
			{					
				i2 = false;
			}
		});	
		
		rsp.attr("rowspan",i);
				
		var c = $(this).parents(".torders");
		
		$(this).parents(".torders").find("[class ^= 'tr']").each(function(){
			if($(this).hasClass("active")){
				i1 = true;
			}
			else if(i1 && $(this).hasClass("tr3"))
			{
				$(this).toggleClass("active");
			}
			else if(i1 && $(this).hasClass("tr2"))
			{
				return false;
			}
		});	
	});
}			

// P A Y M E N T S
function pay(){
	$(".payments .item").click(function(){
		$(this).parents(".payments").find(".item").each(function(){
			$(this).removeClass("active");
		});
		$(this).toggleClass("active");
	});
}	

// T A B S
function tbs(){
	var ths = false;
	var prev = false;
	$(".fancybox.atn").click(function(){
		$(".r-a .t-atn").addClass("act");
		$(".r-a .t-rgn").removeClass("act");
		$(".r-a .tbs a").removeClass("act");
		$(".r-a [href*=t-atn]").addClass("act");
	});	
	$(".fancybox.rgn").click(function(){
		$(".r-a .t-atn").removeClass("act");
		$(".r-a .t-rgn").addClass("act");
		$(".r-a .tbs a").removeClass("act");
		$(".r-a [href*=t-rgn]").addClass("act");
	});
	$(".tbsc .et").click(function(){
		ths = $(this);
		prev = ths.closest(".tbs").find(".et.act");
		if(ths.get(0) !== prev.get(0)){
			ths.toggleClass("act");
			prev.toggleClass("act");
			$("#"+ths.attr("href").replace("#","")).toggleClass("act");
			$("#"+prev.attr("href").replace("#","")).toggleClass("act");
		}	
		return false;
	});
}	

// F O R M _ T A G S
function tgsf(){	
	var k = false;
	var inp = false;	
	var prev = false;
	
	$(".tgsf .inpn,.tgsf .inp,.tgsf p").click(function(event){
		event.stopPropagation();
		k = $(this).closest(".tgsf");
		inp = k.find(".inp");	
		if(inp.attr("type") === "radio"){
			prev = $("html").find(".tgsf.act .inp[name = " + inp.attr('name') + "]");
			if(inp.get(0) !== prev.get(0)){					
				prev.closest(".tgsf").toggleClass("act");				
				prev.removeAttr("checked");	
				prev.prop("checked",false);	
				k.toggleClass("act");
				inp.attr("checked","checked");
				inp.prop("checked",true).change();
			}
		}
		else if(inp.attr("type") === "checkbox"){			
			k.toggleClass("act");
			if(inp.attr("checked") === "checked"){
				inp.removeAttr("checked");	
				inp.prop("checked",false);
			}
			else
			{
				inp.attr("checked","checked");
				inp.prop("checked",true);
			}
			inp.change();
		}		
		if(k.hasClass("sw")){
			k.click();					
		}
		if(k.closest(".et").length){
			k.closest(".et").click();
		}		
	});	
}

// A C C A R D I O N
function acn(opn){
	var ths = false;
	var prev = false;
	var prev1 = false;
	$(".acn .sw").click(function(){		
		ths = $(this).closest(".e");
		prev = ths.parent().find("> .e.act");
		if(opn = false){
			if($(this).find("> .inp[type = radio]").length){
				prev = ths.parent().find("> .e.act > .sw > .inp[type = radio]").closest(".e");			
				if(ths.get(0) !== prev.get(0)){				
					prev.find("> .in").slideUp();	
					ths.find("> .in").slideDown();
					prev.toggleClass("act");
					ths.toggleClass("act");
				}			
			}
			else if($(this).find("> .inp[type = checkbox]").length){
				ths.find("> .in").slideToggle();
				ths.toggleClass("act");
			}
			else
			{		
				if(ths.get(0) !== prev.get(0)){				
					prev.find("> .in").slideUp();	
					ths.find("> .in").slideDown();
					prev.toggleClass("act");
					ths.toggleClass("act");
				}
			}
		}
		else
		{
			ths.find("> .in").slideToggle();
			ths.toggleClass("act");
		}
	});	
	
	$("table.acn .sw").click(function(){		
		ths = $(this).closest("tr");
		prev = ths.parent().find("> tr.act");
		if(opn = false){
			if(ths.get(0) !== prev.get(0)){				
				prev.find("> .in").slideUp();	
				ths.find("> .in").slideDown();
				prev.toggleClass("act");
				ths.toggleClass("act");
			}
		}
		else
		{   
			var bln = false;
			ths.toggleClass("act");
			ths.closest(".acn").find("tr").each(function(){
				if(bln){
					if($(this).hasClass("in")){
						$(this).toggleClass("ddn");
					}
					else{return false;}
				}
				if(ths.get(0) === $(this).get(0)){
					bln = true;
				}
			});
		}
	});	
}	

// M A R K
function mark(){
	var thsc = $(".mark");
	var ths = false;
	var clk = false;
	var prev = false;
	
	$(".mark .item").hover(
		function(){
			ths = $(this);
			thsc = $(this).parents(".mark");

			thsc.find(".item").each(function(){
				$(this).find(".nactive").hide();
			});									
			thsc.find(".item").each(function(){
				if($(this).get(0)!==ths.get(0)){
					$(this).find(".nactive").show();
				}
				else
				{
					$(this).find(".nactive").show();		
					ths.click(function(){
						clk = true;
						prev = ths;
					});					
					return false;
				}
			});	
		},
		function(){
			thsc.find(".item").each(function(){
				$(this).find(".nactive").hide();
			});	
		}			
	);
	thsc.hover(
		function(){},
		function(){
			if(clk){							
				$(this).find(".item").each(function(){
					if($(this).get(0) !== prev.get(0)){
						$(this).find(".nactive").show();
					}
					else
					{
						$(this).find(".nactive").show();								
						return false;
					}
				});
			}					
		}
	);
}

// Q U A N T I T Y
function quantity(){
	$(".quantity .number").bind("change keyup input click", function() {			
		if(this.value.length===1){
			this.value = this.value.replace(/^0+/g ,"");
			this.value = this.value.replace(/[^0-9]/g ,"");	
			$(this).parents(".quantity").find('.number').attr("value", this.value);						
		}			
		if(this.value.length===2 || this.value.length===3){			
			$(this).attr("value",this.value);
			this.value = this.value.replace(/^0+/g ,"1");			
			this.value = this.value.replace(/[^0-9]/g ,"");	
		}				
	});
	$(".quantity .number").bind("click", function() {
		$(this).select();
	});
	$(".quantity .number").blur(function(){	
		if(this.value===""){
			$(this).attr("value","1");
			this.value = this.value.replace(/^0+/g ,"1");
			this.value = this.value.replace(/[^0-9]/g ,"1");	
			$(this).val(1);			
		}		
	});
	$(".quantity .plus").click(function(){	
		var i = parseFloat($(this).parents(".quantity").find('.number').attr("value"));				
		if(i<999){			
			$(this).parents(".quantity").find('.number').attr("value", i+1);
			$(this).parents(".quantity").find('.number').val(i+1);			
		};
	});
	$(".quantity .minus").click(function(){
		var i = parseFloat($(this).parents(".quantity").find('.number').attr("value"));
		if(i>1){
			$(this).parents(".quantity").find('.number').attr("value", i-1);
			$(this).parents(".quantity").find('.number').val(i-1);
		};
	});
}
	
// G A L L E R Y
function gallery(){
	$(".gallery .item").click(function(){	
		$(this).find("img").click();		
	});
	$(".gallery .view-s .item").hover(function(){
		$(this).find("img").click();		
	});
}	

// U N I V E R S A L _ C A R O U S E L
function uc(id,navb){
	// t m b, l c r, p c(a) n, h w, e,
	// t - top m - middle b - bottom,
	// l - left c - center r - right
	// p - prev a - act(current) n - next
	// h - height w - width
	// k - base_container t - this e - element
    
	var k = $(id);
	var ovw = k.find(".ovw");
	var lst = k.find(".kc");	
	var e = k.find(".ec");
	var en = k.find(".ec").length;
	var ars = k.find(".ars");
	var nav = k.find(".nav");
	
	var a = k.find(".kc .act");
	var p = a;	
	var n = a;	
		
	var an = a.index()+1;	
	var q = 1;
	var j = 1;
	var s = 1;
	var max = 1;
	var sum = 0;
	var suma = 0;
	
	var prv = k.find(".prv");
	var nxt = k.find(".nxt");
	
	var ae = [];
	var ar = [];
	
	if(navb){
		k.find(".ovw").append('<div class="nav"></div>');
		e.each(function(){	
			if(j===1){
				k.find(".nav").append('<div class="rnd act"></div>');
			}
			else
			{
				k.find(".nav").append('<div class="rnd"></div>');
			}
			$(this).css("background-image","url("+$(this).find("img").attr("src")+")");
			j++;
		});	
		j = 1;
		k.find(".rnd").each(function(){	
			ar[j] = $(this);
			j++;
		});
		j = 1;
	}
	if(k.hasClass("crl")){
		e.each(function(){		
			suma = suma + $(this).outerWidth(true);		
			if(suma > ovw.outerWidth(true)){
				s++;
			}	
		});
		if(s>1){s--;}else{ars.hide();}
	}

	e.each(function(){				
		ae[j] = $(this);
		max = j;		
		j++;
	});
	j = 1;
	
	if(k.hasClass("fade")){
		e.css("opacity",0);
		e.first().css({
			"opacity": 1
		});
	}
	k.find(".pscc").click(function(){
		if(k.find(".fancybox").length){
			k.find(".pmcc .fancybox").addClass("dn");
			k.find(".pmcc .fancybox:nth-child("+($(this).closest(".ec").index()+2)+")").removeClass("dn");
		}
		else{
			k.find(".pmc").attr("src",$(this).find(".psc").attr("src"));
		}		
		lst.find(".ec").removeClass("try");
		$(this).closest(".ec").addClass("try");
		return false;
	});
	
	if(window.matchMedia("(max-width:1119px)").matches)
	{
		var x = 0;
		var px = 0;
		var time = 0;
		var tbl = true;
		var prs = false;
		ovw.mousedown(function(ev){
			if(e.length>1){
				prs = true;
				if(k.hasClass("slr")){
					e.css("cursor","e-resize");
				}
				else{
					ovw.css("cursor","e-resize");
				}
				px = ev.pageX;
				return false;
			}	
		});
		$("html").mouseup(function(ev){
			prs = false;		
		});
		ovw.on("mousemove", function(ev){
			if(prs && (e.length>1)){
				x = ev.pageX;
				if(px>x && tbl){
					tbl = false;
					time = setTimeout(function(){
						nxt.click();
						tbl = true;
					},10);
				}
				if(px<x && tbl){
					tbl = false;
					time = setTimeout(function(){
						prv.click();
						tbl = true;
					},10);
				}
				px = x;
				return ev.stopPropagation();
			}	
		});

		ovw.on("touchstart", function(ev){
			if((e.length>1)){
				px = ev.originalEvent.touches[0].pageX;
			}
		});
		ovw.on("touchmove", function(ev){
			if((e.length>1)){
				x = ev.originalEvent.touches[0].pageX;
				if(px>x && tbl){
					tbl = false;
					time = setTimeout(function(){
						nxt.click();
						tbl = true;
					},10);
				}
				if(px<x && tbl){
					tbl = false;
					time = setTimeout(function(){
						prv.click();
						tbl = true;
					},10);
				}
				px = x;
				return ev.stopPropagation();
			}	
		});
		
		if(e.length > 1){
			ovw.css("cursor","e-resize");
		}
	}
	
	
	var bln = true;
	k.find(".arw,.rnd").click(function(){
		if($(this).hasClass("arw") && bln){
			if($(this).hasClass("nxt")){
				if((k.hasClass("crl") && (e.last().offset().left >= ovw.offset().left + ovw.width() - e.width() + 10))					
					|| (k.hasClass("slr") && !(e.last().hasClass("act")))
				){
					if(k.hasClass("shift")){	
						sum = parseFloat(lst.css("margin-left")) - e.outerWidth(true) + 0.01;
						k.find(".act").removeClass("act").next(".ec").addClass("act");
						lst.animate({
							"margin-left":sum
						},500,function(){bln = true;});
					}	

					if(k.hasClass("fade")){
						k.find(".ec.act,.ec.act img").animate({
							"opacity":0
						},500,function(){bln = true;});
						k.find(".ec.act").next().find("img").animate({
							"opacity":1
						},500);
						k.find(".ec.act").next().animate({
							"opacity":1
						},500,function(){
							k.find(".act").removeClass("act").next().addClass("act");
							bln = true;
						});
					}	
				}
				else
				{
					// Krutka
					sum = 0;
					lst.animate({
						"margin-left":sum
					},500,function(){bln = true;});
					
					if(k.hasClass("fade")){
						
						k.find(".ec.act img").animate({
							"opacity":0
						},500);
						k.find(".ec.act").animate({
							"opacity":0
						},500,function(){
							bln = true;
							k.find(".act").removeClass("act");
						});
						k.find(".ec").first().find("img").animate({
							"opacity":1
						},500);
						k.find(".ec").first().animate({
							"opacity":1
						},500,function(){
							bln = true;
							k.find(".ec").first().addClass("act");
							k.find(".rnd").first().addClass("act");
						});
					}	
				}
			}
			
			if($(this).hasClass("prv")){
				
				if((k.hasClass("crl") && parseFloat(lst.css("margin-left")) < 0)					
			    || (k.hasClass("slr") && !(e.first().hasClass("act")))
				){
					if(k.hasClass("shift")){
						sum = parseFloat(lst.css("margin-left")) - (-e.outerWidth(true));
						lst.animate({
							"margin-left":sum
						},500,function(){bln = true;});
					}
					
					if(k.hasClass("fade")){
						k.find(".ec.act,.ec.act img").animate({
							"opacity":0
						},500,function(){
							bln = true;
						});
						k.find(".ec.act").prev().find("img").animate({
							"opacity":1
						},500);
						k.find(".ec.act").prev().animate({
							"opacity":1
						},500,function(){
							k.find(".act").removeClass("act").prev().addClass("act");
							bln = true;
						});
					}	
				}
				else
				{
					// Krutka
					var q1 = 0;
					var q2 = 0;
					if(k.hasClass("crl")){
						sum = 0;
						if(e.css("float") === "none"){
							k.find(".ech").each(function(){
								sum = sum - $(this).outerWidth(true)+10;
								if(-ovw.width() > sum){
									q1++;
								}
							});
							sum = -q1*e.outerWidth(true)+0.1;
						}
						else
						{
							e.each(function(){
								sum = sum - $(this).outerWidth(true);
								if(-ovw.width() > sum){
									q1++;

								}
								else{q2++;}
							});
							sum = - q1*e.outerWidth(true)+0.1;
						}
						lst.animate({
							"margin-left":sum
						},500,function(){bln = true;});
						
					}	

					if(k.hasClass("fade")){
						k.find(".ec.act,.ec.act img").animate({
							"opacity":0
						},500,function(){
							k.find(".act").removeClass("act");
							bln = true;
						});
						k.find(".ec").last().find("img").animate({
							"opacity":1
						},500);
						k.find(".ec").last().animate({
							"opacity":1
						},500,function(){
							k.find(".ec").last().addClass("act");
							k.find(".rnd").last().addClass("act");
							bln = true;
						});
					}	
				}
			}	
		}
		if($(this).hasClass("rnd") && navb){
			k.find(".rnd.act").removeClass("act");
			$(this).addClass("act");
			k.find(".ec.act,.ec.act img").animate({
				"opacity":0
			},500,function(){
				k.find(".ec.act").removeClass("act");
				bln = true;
			});
			k.find(".ec:nth-child("+($(this).index()+1)+")").find("img").animate({
				"opacity":1
			},500);
			k.find(".ec:nth-child("+($(this).index()+1)+")").animate({
				"opacity":1
			},500,function(){
				k.find(".ec:nth-child("+($(this).index()+1)+")").addClass("act");
				bln = true;
			});
		}
		
		bln = false;
	});
	
	
	// A U T O P L A Y
	function autoplay(){
		if((k.hasClass("crl") && (e.last().offset().left >= ovw.offset().left + ovw.width() - e.width() + 10))					
			|| (k.hasClass("slr") && !(e.last().hasClass("act")))
		){
			if(k.hasClass("shift")){	
				sum = parseFloat(lst.css("margin-left")) - e.outerWidth(true) + 0.01;
				k.find(".act").removeClass("act").next(".ec").addClass("act");
				lst.animate({
					"margin-left":sum
				},500,function(){bln = true;});
			}	

			if(k.hasClass("fade")){
				k.find(".ec.act,.ec.act img").animate({
					"opacity":0
				},500,function(){bln = true;});
				k.find(".ec.act").next().find("img").animate({
					"opacity":1
				},500);
				k.find(".ec.act").next().animate({
					"opacity":1
				},500,function(){
					k.find(".act").removeClass("act").next().addClass("act");
					bln = true;
				});
			}	
		}
		else
		{
			// Krutka
			sum = 0;
			lst.animate({
				"margin-left":sum
			},500,function(){bln = true;});
			if(k.hasClass("fade")){
				k.find(".ec.act,.ec.act img").animate({
					"opacity":0
				},500,function(){
					k.find(".act").removeClass("act");
					bln = true;
				});
				k.find(".ec").first().find("img").animate({
					"opacity":1
				},500);
				k.find(".ec").first().animate({
					"opacity":1
				},500,function(){
					k.find(".ec").first().addClass("act");
					k.find(".rnd").first().addClass("act");
					bln = true;
				});
			}	
		}
	}
	
	if(e.length == 1){
		ars.hide();
		k.find(".nav").hide();
	}
	if(k.hasClass("ply") && (e.length > 1)){		
		var idp = setInterval(function(){autoplay();},6000);
		ovw.hover(
		function(){
			clearInterval(idp);
		},
		function(){
			idp = setInterval(function(){autoplay();},6000);
		});
		$(window).resize(function(){
			clearInterval(idp);
			idp =setTimeout(function(){
				idp = setInterval(function(){autoplay();},6000);
			},500);
		});
	}
}	

// M A R K
function mark(){
	var thsc = $(".mark");
	var ths = false;
	var clk = false;
	var prev = false;
	$(".mark .item").hover(
		function(){
			ths = $(this);
			thsc = $(this).parents(".mark");

			thsc.find(".item").each(function(){
				$(this).find(".int").hide();
			});									
			thsc.find(".item").each(function(){
				if($(this).get(0)!==ths.get(0)){
					$(this).find(".int").show();
				}
				else
				{
					$(this).find(".int").show();		
					ths.click(function(){
						clk = true;
						prev = ths;
					});					
					return false;
				}
			});	
		},
		function(){
			thsc.find(".item").each(function(){
				$(this).find(".int").hide();
			});	
		}			
	);
	thsc.hover(
		function(){

		},
		function()
		{
			if(clk){							
				$(this).find(".item").each(function(){
					if($(this).get(0) !== prev.get(0)){
						$(this).find(".int").show();
					}
					else
					{
						$(this).find(".int").show();								
						return false;
					}
				});
			}					
		}
	);
}

// S E L E C T
function slt(){
	var html = $("html");
	var k = false;
	var lst = false;
	var e = false;
	var sld = false;
	var arw = false;
	var a = false;
	var opt = false;
	
	$(".slt .sld").click(function(ev){
		k = $(this).closest(".slt");
		lst = k.find(".d-d");
		e = k.find(".es");
		sld = k.find(".sld");
		arw = k.find("i");
		a = k.find(".act");
		opt = k.find("option");
		
		ev.stopPropagation();
		lst.toggleClass("ddn");
		arw.toggleClass("cdi");
		arw.toggleClass("cui");
		
		e.click(function(ev){
			if(!$(this).hasClass("act") && !$(this).hasClass("sld")){
				$(this).addClass("act");
				a.removeClass("act");
				a = $(this);	
				var q = 0;
				opt.each(function(){
					$(this).attr("selected",false);
					if(a.index() === q){
						$(this).attr("selected","selected");
						if(q === 1){
							k.find("input[name='phone']").mask("+375 (99) 999-99-99");
						}
						else{
							k.find("input[name='phone']").mask("+7 (999) 999-99-99");
						}
					}
					q++;
				});
				q = 0;
				sld.find("img").attr("src",a.find("img").attr("src"));
				sld.find(".w-s").html($(this).find(".w-s").html());
				sld.append(arw);
				html.click();
			}	
			else{ev.stopPropagation();}
		});
		
		html.click(function(ev){
			lst.addClass("ddn");
			arw.addClass("cdi");
			arw.removeClass("cui");
		});
	});
}	

// O R D E R _ I N F O
function infoo(){
	var html = $("html");
	html.click(function(){
		$(".fm.infoo").addClass("ddn");
	});
	$(".infoosw").click(function(ev){
		ev.stopPropagation();
		$(".fm.infoo").toggleClass("ddn");
	});
	$(".fm.infoo").click(function(ev){
		ev.stopPropagation();
	});
	
}	

// F I L T E R _ R E S E T
function flr(){
	var k = $(".flr");
	var e = k.find(".e-f");
	var ths = false;
	var sliderp, sliderw;
	var rst = k.find(":reset");
	var fnd = k.find(".fnd");
	var sw = k.find(".sw");
	var pfnd = 4;
	var dfe = 0;
	var kh = k.outerHeight(true);
	var khc = 0;
	
	function rs(){		
		if($('#price').length){		
			sliderp = $('#price').slider({ 			 	
				range: true,
				values: [ 100, 500000 ],
				min: 100,
				max: 500000,
				create: function( event, ui ){					
					$(this).find('.f-l').attr("value",$(this).slider("option","min"));
					$(this).find('.l-l').attr("value",$(this).slider("option","max"));
				},
				slide : function(event ,ui){
					$(this).find('.f-l').attr("value",ui.values[0]).change();
					$(this).find('.ui-slider-handle input').addClass("ddn");
					$(this).find('.ui-state-focus input').removeClass("ddn");
					$(this).find('.l-l').attr("value",ui.values[1]).change();
				}
			});
		}
		
		if($('#price2').length){		
			sliderp2 = $('#price2').slider({ 			 	
				range: true,
				values: [ 100, 500000 ],
				min: 100,
				max: 500000,
				create: function( event, ui ){					
					$(this).find('.f-l').attr("value",$(this).slider("option","min"));
					$(this).find('.l-l').attr("value",$(this).slider("option","max"));
				},
				slide : function(event ,ui){
					$(this).find('.f-l').attr("value",ui.values[0]).change();
					$(this).find('.ui-slider-handle input').addClass("ddn");
					$(this).find('.ui-state-focus input').removeClass("ddn");
					$(this).find('.l-l').attr("value",ui.values[1]).change();
				}
			});
		}
				
		$("#price").find('.f-l').attr("value",sliderp.slider("option","min"));
		$("#price").find('.l-l').attr("value",sliderp.slider("option","max"));		
	}	
	
	rs();
	
	fnd.click(function(ev){
		ev.stopPropagation();
	});
	
	k.find(".more").click(function(){
		var all = $(this).parent().find(".all");
		all.toggleClass("ddn");
		$(this).find("div").toggleClass("ddn");
	});
	
	k.find("input").on("change",function(){
		var rgrn = false;
		var che = false;
		ths = $(this);
			k.find(":reset").removeClass("dsd").removeAttr("disabled");
			k.find(".fnd").addClass("ddn");
			$(this).closest(".e-f").find(".fnd").removeClass("ddn");
	});
	
	k.find(".more").on("click",function(){
		k.find(":reset").removeClass("dsd").removeAttr("disabled");
	});
	
	rst.click(function(){
		e.removeClass("act");
		e.first().addClass("act");
		e.find(".in").removeAttr("style");
		k.find(".fnd").addClass("ddn");
		k.find(".e-f.act .fnd").removeClass("ddn");
		
		k.find(":reset").addClass("dsd").attr("disabled","disabled");
		k.find(".more div").removeClass("ddn");
		k.find(".more").each(function(){
			$(this).find("div").last().addClass("ddn");
		});
		rs();
		k.find("input").removeAttr("checked");
		k.find(".tgsf").removeClass("act");
		var n = false;
		k.find("[type=radio]").each(function(){
			if(n !== $(this).attr("name")){				
				n = $(this).attr("name");
				$(this).closest(".tgsf").addClass("act");
				k.find("[name="+n+"]").first().attr("checked","checked");
			}
		});
	});
}

// D E L I V E R Y
function mtd(){
	$(".mtd:not(.cne)").click(function(){
		$(this).closest(".mtdk").find(".mtd.abe").removeClass("abe");
		$(this).addClass("abe");
		$(this).find(".tgsf.v1 .inpn").click();
	});
	$(".mtd:not(.cne) .tgsf.v1 .inpn").click(function(){
		$(this).closest(".mtdk").find(".mtd.abe").removeClass("abe");
		$(this).closest(".mtd").addClass("abe");
	});
}	

// C O U N T D O W N
function cdn(){
	var cted = $("input.cdn").val();
	var cte = "01:00";
	var ar = [];
	var mns = 1;
	var scs = 0;
	var ths = false;
	var q = 0;
	var e = $("input.cdn");
	
	$(".cdna").click(function(){
		ths = $(this);
		ths.addClass("ddn");
		$(".cdnh").removeClass("ddn");
		cte = $("input.cdn").val();
		ar = cte.match(/[0-9]+/g);
		$.each(ar,function(){
			if(q === 0){mns = this;}
			if(q === 1){scs = this;}
			q++;
		});
		cte = mns * 60 + scs*1;
		
		function ctef(){
			if(cte > 0){
				setTimeout(function(){
					cte--;
					if(cte > 599){
						mns = parseInt(cte/60);
						if(cte%60 < 10){
							e.val(mns+":0"+cte%60);
						}
						else
						{
							e.val(mns+":"+cte%60);
						}
					}
					if(cte > 59 && cte < 600){
						mns = parseInt(cte/60);
						if(cte%60 < 10){
							e.val("0"+mns+":0"+cte%60);
						}
						else
						{
							e.val("0"+mns+":"+cte%60);
						}
					}
					if(cte < 60){
						if(cte < 10){
							e.val("00:0"+cte);
						}
						else
						{
							e.val("00:"+cte);
						}
					}
					ctef();				
				},1000);
			}	
			else
			{
				ths.removeClass("ddn");
				$(".cdnh").addClass("ddn");
				e.val(cted);
			}
		}
		ctef();
		return false;
	});
}	

// C O L O R S _ S I Z E S
function c_s(){
	var k = $(".c-s.v1");
	var e = k.find(".ic");
	e.click(function(){
		if(!$(this).hasClass("dsd")){
			e.removeClass("abe");
			$(this).addClass("abe");
		}		
	});
}

// S W I T C H E R
function switcher(){
	var k = $(".goods");
	var e = k.find(".tile.ddn");
	var sw1 = k.find(".gm4");
	var sw2 = k.find(".gm3");
	if(
		window.matchMedia("(max-width:1000px)").matches
			&&
		window.matchMedia("(min-width:705px)").matches
	){
		k.find(".tile:nth-child(4)").addClass("ddn");
	}	
	
	sw1.click(function(){
		e.first().removeClass("ddn");
		e.first().next(".tile").removeClass("ddn");
		e.first().next(".tile").next(".tile").removeClass("ddn");
		e.first().next(".tile").next(".tile").next(".tile").removeClass("ddn");
		
		if(e.first().next(".tile").next(".tile").next(".tile").next(".tile").html() === undefined){
			sw1.addClass("ddn");
		}
		else
		{
			e = e.first().next(".tile").next(".tile").next(".tile").next(".tile");
		}
		return false;
	});
	
	sw2.click(function(){
		e.first().removeClass("ddn");
		e.first().next(".tile").removeClass("ddn");
		e.first().next(".tile").next(".tile").removeClass("ddn");
		
		if(e.first().next(".tile").next(".tile").next(".tile").html() === undefined){
			sw2.addClass("ddn");
		}
		else
		{
			e = e.first().next(".tile").next(".tile").next(".tile");
		}
		return false;
	});
}

// A R R O W _ U P
function up(){
	$(".up i").click(function(){
		$('html,body').animate({
			scrollTop : 0
		},500);	
	});
}	

// T A B L E _ S I Z E
function tbeSize(){
	var ar = [];
	var maxh = 0;
	$(".tc table tr").each(function(){
		$(this).find("td").removeAttr("style");
	});
	$(".tc table").each(function(){
		$(this).find("tr:not(.pdn4)").each(function(inx){
			if(ar[inx]<parseInt($(this).find("td").outerHeight())
			   || ar[inx] === undefined){
				ar[inx] = $(this).find("td").outerHeight();
			}	
		});
	});
	
	$(".tc table").each(function(){
		$(this).find("tr:not(.pdn4)").each(function(inx){
			$(this).find("td").height(ar[inx]);
		});
	});	
}	


// C L O S E
function toggle(){
	$("[data-toggle-btn]").click(function(){
		var btn = $(this).data("toggle-btn");
		var e_up = $(this).closest("[data-toggle-e]").data("toggle-e");
		$("[data-toggle-e = "+btn+"]").toggle();
		$("[data-toggle-group = "+btn+"]").toggle();
		if ( e_up !== btn )
		{
			$("[data-toggle-e = "+e_up+"]").hide();
		}
		
		// Строка ниже блокировала клик плагина - askaron_dropdown
		return false;
	});
	
	
	$(document).click(function(event){
		var clk_obj = $(event.target).closest("[data-toggle-area]");

		$("[data-toggle-area]").each(function(){
			if(clk_obj.get(0)===$(this).get(0)){
				clk_obj.toggleClass("act");
				clk_obj.find("[data-toggle-e]").toggle();
			}
			else
			{
				$(this).removeClass("act");
				$(this).find("[data-toggle-e]").hide();
			}
		});
	});
	
	$("[data-show-btn]").click(function(){
		var btn = $(this).data("show-btn");
		var e_group = $("[data-toggle-e *= "+btn+"]");
		$("[data-toggle-group = "+btn+"]").show();
		e_group.show();
		return false;
	});
	
	$("[data-hide-btn]").click(function(){
		var btn = $(this).data("hide-btn");
		var group = $(this).data("toggle-group");
		var e_group = $("[data-toggle-group = "+group+"][data-toggle-e]");
		$("[data-toggle-e = "+btn+"]").hide();
		if(btn===group){
			e_group.hide();
		}
		
		var q = false;
		e_group.each(function(){
			if($(this).css("display")!=="none"){
				return q=false;
			}
			else{
				return q=true;
			}
		});
		if(q){
			$("[data-toggle-k = "+group+"]").hide();
			$("[data-toggle-mes = "+group+"]").show();
		}
		return false;
	});
}

/* ================= e_F U N C T I O N S (*End*) ================================================================================================ */

/* ================= D_R ======================================================================================================================== */

$(document).ready(function(){
	if($("[data-toggle-btn]").length){
		toggle();
	}
	
	tbeSize();
	c_s();
	switcher();
	up();
	mtd();
	cdn();
	
	$(".ms1 h3").click(function(){
		$(".ms1").toggleClass("act");
	});
	
	if($(".flr").length){
		flr();
	}	
	infoo();
	scl();
	slt();	
	
	uc("#uc1",true);uc("#uc2");uc("#uc3");
	uc("#uc-dtl");
	$(".fancybox").click(function(){
		var id = $(this).attr("href").replace("#","");
		setTimeout(function(){
			uc("#uc-"+id);
			$(".fancybox-nav").click(function(){
				setTimeout(function(){
					var id = $(".fancybox-opened").find(".vwq").attr("id");
					uc("#uc-"+id);
				},500);
			});	
		},500);
	});
	
	tgsf();
	mark();
	acn(true);
	pay();
	ttoggle();
	mark();
	quantity();
	gallery();
	tbs();
	
	
	$(".ors .cts").click(function(){
		$(".fancybox[href='#tws']").click();
	});
	
	// Z O O M	
	if($(".zoom").length){
		$(".zoom").elevateZoom({
			gallery:'gal1',
			zoomWindowFadeIn: 1000,
			zoomWindowFadeOut: 1000,
			easing: true,
			zoomWindowWidth:550,
			zoomWindowHeight:550,
			lensColour: "#000",
			tint:true,
			tintColour:'#000',
			tintOpacity:0.5,
			cursor: 'pointer'
		});	
	}	
	
	
	$(".zoom").bind("click", function(e) { 
		var ez = $('.zoom').data('elevateZoom');	
		
		
		if(window.matchMedia("(min-width:801px)").matches){
			$.fancybox(ez.getGalleryList());
		}	
		else
		{
			$.fancybox.close(ez.getGalleryList());
		}	
		return false; 
	});		
	
	// M A S K E D _ I N P U T
	$("input[name='phone']").mask("+7 (999) 999-99-99");
	$("input[data-mask-phone]").mask("+7 (999) 999-99-99");
	
	//F A N C Y B O X
	$(".fancybox").fancybox({
		padding:0
	});
	
	$(".fancybox").click(function(){
		if(window.matchMedia("(max-width:991px)").matches){
			return false;
		}
	});
	
});

/* ================= e_D_R (*End*) ============================================================================================================== */

/* ================= W_L ======================================================================================================================== */

$(window).load(function(){	
	tlmenu();
});

/* ================= e_W_L (*End*) ============================================================================================================== */

/* ================= W_R ======================================================================================================================== */

$(window).resize(function(){
	if(window.matchMedia("(min-width:801px)").matches){
		$(".stitle").next().show();
	}	
	
	tbeSize();
});

/* ================= e_W_R (*End*) ============================================================================================================== */