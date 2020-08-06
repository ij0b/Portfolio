/* ================= F U N C T I O N S ========================================================================================================== */

// ++T A B S (tabs)
//
//++DESCRIPTION
//	Табы, открыть/закрыть конкретное содержимое по клику,
//	отображая при этом только один блок с содержимым из группы
//		Возможность разбрасывать компоненты по странице )
//
//	Для работы плагина достаточно двух компонетов:
//	1. tabs__e - элемент плагина табы (кнопка)
//	2. tabs__in - содержимое таба (inset вкладка)
//
//	act - active(активная) кнопка/вкладка, 
//		  ставится у отображаемой вкладки, а также у кнопки
//	
//	Два атрибута для установки соответсвий:
//	1. data-tabs-group - всем компонентам экземпляра(tabs)
//	ставится одно значение для обработки клика только в его пределах
//	2. data-tabs-href - ссылка на вкладку
//		Подробно:
//			Значение атрибута строится из названия группы(т.к поиск глобальный)
//			+ имя вкладки.
//			Кнопка связана с вкладкой через равное значение
//			атрибута ссылки.		
	
function tabs(){	
	function add_act(){
		$("[data-tabs-txt-btn].act").each(function(){
			var val1 = $.trim($(this).html());
			$("[data-tabs-txt-btn]:not(.act)").each(function(){
				var val2 = $.trim($(this).html());
				if(val1===val2){
					$(this).addClass("act");
				}
			});
		});
	};
	
	function town_default(){
		var val1 = $("[data-tabs-town-default].act").data("tabs-town-default");
		$("input[data-tabs-txt]").attr("value",val1);
			$("[data-tabs-txt-btn]").each(function(){
				var val2 = $.trim($(this).html());
				if(val1===val2){
					$(this).addClass("act");
				}
		});
	};
	add_act();
	town_default();
	
	$("[data-tabs-btn]").click(function(){
		if(!$(this).hasClass("act") || $(this).hasClass('tabs__h-s')){
			var group = $(this).data("tabs-group");
			var href = $(this).data("tabs-btn");
			$("[data-tabs-group = '"+group+"']").removeClass("act");
			$(":not([data-tabs-btn])[data-tabs-group = '"+group+"']").hide();
			$("[data-tabs-href = '"+href+"']").addClass("act");
			$("[data-tabs-btn = '"+href+"']").addClass("act");
			$(":not([data-tabs-btn])[data-tabs-href = '"+href+"']").show();
			
			if($(this).attr("data-tabs-town-default")){
				town_default();
			}
			add_act();
			
			if($("[data-tabs-href = '"+href+"'] .status").length){
				box();
			}
		}
		
		return false;
	});
	
	$("[data-tabs-txt-btn]").click(function(){
		$("[data-tabs-txt-btn = '"+$(this).data("tabs-txt-btn")+"']").removeClass("act");
		$(this).addClass("act");
		if($("input[data-tabs-txt = '"+$(this).data("tabs-txt-btn")+"']").length){
			$("[data-tabs-txt = '"+$(this).data("tabs-txt-btn")+"']").attr("value",$.trim($(this).html()));
		}
		else{
			$("[data-tabs-txt = '"+$(this).data("tabs-txt-btn")+"']").html($.trim($(this).html()));
		}
		add_act();
		return false;
	});
	
	$("[data-tabs-close]").click(function(){
		var val = $(this).data("tabs-close");
		$("[data-tabs-txt = '"+val+"']").attr("value","");
		$("[data-tabs-txt-btn = '"+val+"']").removeClass("act");
	});
	
}




// D R O P D O W N List (dropdown)

//++DESCRIPTION
//	Открытие/Закрытие выпадающего списка
//		1. Закрытие предыдущего по клику 
//		   вне текущего контейнера
//
//++B L O C K Scheme
//	++NOTATION(Графическое обозначение)
//		-/ \+   = условие (ромб)
//		 | |    = блок действия (прямоугольник)
//	 
//	++REDUCTION(Сокращение)
//		k		= контейнер
//		e		= элемент
//		act		= активный
//		cur		= текущий
//		prev	= предыдущий 
//		
//		?		= есть ли
//
//	++SCHEME(Схема)	
//				-	-	-	-	-	-	-	-	-	-	-	-	-/taget=k.e\+	+	+	+
//	-/?act\+	+	+	+	+									-	-	-	-	-/cur.k=prev.k\+	+
//				|taget.removeClass(act)|			|prev.k.removeClass(act)|			|cur.k.toggleClass(act)|								
//													|cur.k.addClass(act)	|
 
 
 
function askaron_dropdown(){
	$(document).click(function(event){
		var btn = $(event.target).closest(".dropdown");
		$(".dropdown").each( function(){
			if ( $(this).get(0) === btn.get(0) )
			{
				$(this).toggleClass("dropdown__act");
			}
			else
			{
				$(this).removeClass("dropdown__act");
			}
		});
	});
} 

// S O R T (Table Sort)
// 
// Reduction:
// c - base container
// ths - $(this) (element button)
// inx_col - index_column (index of current column)
// list - list td of current column
function askaron_sort(){
	$(".sort__abc, sort__cba").click(function(){
		var ths = $(this);
		var c = ths.closest(".sort");
		var inx_col = ths.index();
		var list = c.find(".sort__list > td:nth-child("+(inx_col+1)+")").get();
		
		// Arrows
		ths.toggleClass("sort__abc").toggleClass("sort__cba");
		
		// Sort
		list.sort(function(a, b) {
		   var compA = $(a).text().toUpperCase();
		   var compB = $(b).text().toUpperCase();
		   
		   if(ths.hasClass("sort__abc")){
				return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
			}
			else
			{
				return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
			}
		   
		});
		
		// Output
		var prev_tr = false;
		$.each(list, function(idx, itm){
			var tr_n = c.find(".sort__list").length;
			var q = 0;
			while(tr_n >= q){
				var tr_c = c.find(".sort__list:nth-child("+(q+2)+")");
				if(itm == tr_c.find("td").get(inx_col)){
					if (prev_tr.length>0) {
						prev_tr.after(tr_c); 
					}
					else
					{
						c.find("th:last").closest("tr").after(tr_c); 
					}
					prev_tr = tr_c;
				}
				q++;
			}
		});
	});
}


// T O G G L E
function toggle(){
	if($("[data-toggle-btn]").length){
		$("[data-toggle-btn]").click(function(){
			var btn = $(this).data("toggle-btn");
			$(this).toggleClass("act");
			$("[data-toggle-e = "+btn+"]").toggle();
			$("[data-toggle-group = "+btn+"]").toggle();

			if($(".uc").length){
				setTimeout(function(){
					uc(".uc");
				},130);
			}
		});


		$(document).click(function(event){
			var clk_obj = $(event.target).closest("[data-toggle-area]");

			$("[data-toggle-area]").each(function(){
				if(clk_obj.get(0)===$(this).get(0)){
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
		
		$("[data-toggle-keyup]").keyup(function(event){
			var btn_val = $(this).data("toggle-keyup");
			if(event.keyCode==13){
				$("[data-toggle-btn = "+btn_val+"]").click();
				return false;
			}
		});
	}	
}

// B O X
function box(ops){
	var c = $("[data-box-c]");
	
	$.each(c,function(){
		var c_v = $(this).data("box-c");
		var e = $("[data-box-e = "+c_v+"]");
		var e_w = e.outerWidth();
		var e_h = e.outerHeight();
		var c_w = c.outerWidth();
		var c_h = c.outerHeight();
		if($(this).data("box-x") === "center"){
			var x = c_w/2 - e_w/2;
			e.css({"left":x});
		}
		if($(this).data("box-y") === "center"){
			var y = c_h/2 - e_h/2;
			e.css({"top":y});
		}
	});
	
	var c_cur = false;
	
	$(".askaron-status__e").click(function(){
		c_cur = $(this).closest(".askaron-status");
		
		var c = $(this).closest(".askaron-status");
		var ths = $(this);
		var before = 1;
		c.find(".askaron-status__e").removeClass("askaron-status__e_b");
		c.find(".askaron-status__e").removeClass("askaron-status__e_g");
		c.find(".askaron-status__e").removeClass("askaron-status__e_r");
		c.find(".askaron-status__e").each(function(){
			$(this).addClass("askaron-status__e_b");
			if($(this).get(0)===ths.get(0)){
				c.find(".askaron-status__txt").html($(this).closest("[data-box-c]").find(".askaron-status__box-c").html());
				return false;
			}
		});
	});
	
	$(".askaron-status__dropdown .askaron-dropdown__a").click(function(){
		var c = $(this).closest(".askaron-status__dropdown");
		c.find(".askaron-status__txt-s").html($(this).html());
	});
	
	$(".askaron-status__dropdown .askaron-status__completed").click(function(){
		c_cur.find(".askaron-status__e").each(function(){
			$(this).removeClass("askaron-status__e_b").addClass("askaron-status__e_g");
		});
		c_cur.find(".askaron-status__txt").html("СКОНВЕРТИРОВАН");
	});
	
	$(".askaron-status__dropdown .askaron-status__defect").click(function(){
		c_cur.find(".askaron-status__e").each(function(){
			$(this).removeClass("askaron-status__e_b").addClass("askaron-status__e_r");
		});
		c_cur.find(".askaron-status__txt").html($(this).html());
	});
}

// Add Block
function add_b(){
	$("[data-add-b-btn]").click(function(){
		var btn = $(this).data("add-b-btn");
		var b = $("[data-add-b ="+btn+"]");
		b.after(b.clone(true)).show();
		b.removeAttr("data-add-b");
	});
}



// R A T I N G
function rtg(){
	var thsc = $(".rtg");
	var ths = false;
	var clk = false;
	var prev = false;
	
	$(".rtg").find(".dsd").closest(".rtg").addClass("plg");
	$(".rtg .e-r").hover(
		function(){
			ths = $(this);
			thsc = $(this).parents(".rtg");

			thsc.find(".e-r").each(function(){
				$(this).find(".dsd").hide();
			});									
			thsc.find(".e-r").each(function(){
				if($(this).get(0)!==ths.get(0)){
					$(this).find(".dsd").show();
				}
				else
				{
					$(this).find(".dsd").show();		
					ths.click(function(){
						clk = true;
						prev = ths;
					});					
					return false;
				}
			});	
		},
		function(){
			thsc.find(".e-r").each(function(){
				$(this).find(".dsd").hide();
			});	
		}			
	);
	thsc.hover(
		function(){

		},
		function()
		{
			if(clk){							
				$(this).find(".e-r").each(function(){
					if($(this).get(0) !== prev.get(0)){
						$(this).find(".dsd").show();
					}
					else
					{
						$(this).find(".dsd").show();								
						return false;
					}
				});
			}					
		}
	);
}

// C O U N T D O W N
function cdn(){
	var ar = $(".cnn:not([data-cnn-v])");
	var group = $("[data-cnn-group]");
	
	function color_gr(){
		setTimeout(function(){
			$(".cnn__colon").css("color","#666");
			color_r();
		},1000);
	};
	function color_r(){
		setTimeout(function(){
			$(".cnn__colon").css("color","red");
			color_gr();
		},1000);
	};
	color_r();
	
	
	$.each(ar,function(){
		var ths = $(this);
		var days = $(this).find("[data-countdown = days]");
		var hours = $(this).find("[data-countdown = hours]");
		var minets = $(this).find("[data-countdown = minets]");
		var seconds = $(this).find("[data-countdown = seconds]");
		var boolean = true;
		var step;
		if(seconds.length){
			step = 1000;
		}
		else if(minets.length){
			step = 60000;
		}
		else if(hours.length){
			step = 3600000;
		}
		else if(days.length){
			step = 86400000;
		}
		
		if($(this).find("[data-countdown-day-txt]").length){
			var n = days.val().match(/\d$/);
			if(days.val()<10){
				if(n == 1){
					$(this).find("[data-countdown-day-txt]").html("день");
				}
				else if(n > 1 && n < 5){
					$(this).find("[data-countdown-day-txt]").html("дня");
				}
				else{
					$(this).find("[data-countdown-day-txt]").html("дней");
				}
			}
			else if(days.val()<20){
				$(this).find("[data-countdown-day-txt]").html("дней");
			}
			else{
				if(n == 1){
					$(this).find("[data-countdown-day-txt]").html("день");
				}
				else if(n > 1 && n < 5){
					$(this).find("[data-countdown-day-txt]").html("дня");
				}
				else{
					$(this).find("[data-countdown-day-txt]").html("дней");
				}
			}
		}
		
		function count(){
			setTimeout(function(){
				// если есть и секунды (!нужный коммент)
				if(seconds.val()>0){
					if(seconds.val()<=10){
						seconds.val("0"+(seconds.val()-1));
					}
					else
					{
						seconds.val(seconds.val()-1);
					}
					count();
				}
				else
				{
					seconds.val(59);
					if(minets.val()>0){
						if(minets.val()<=10){
							minets.val("0"+(minets.val()-1));
						}
						else
						{
							minets.val(minets.val()-1);
						}
						count();
					}
					else
					{
						minets.val(59);
						if(hours.val()>0){
							if(hours.val()<=10){
								hours.val("0"+(hours.val()-1));
							}
							else
							{
								hours.val(hours.val()-1);
							}
							count();
						}
						else
						{
							hours.val(23);
							if(days.val()>0){
								days.val(days.val()-1);
								count();
							}
							else
							{
								ths.closest(".cnn-c").hide();
								ths.closest(".cnn-c").next(".cnn__h-s").addClass("act");
								ths.closest("[data-cnn-group]").next("[data-cnn-group]").find(".cnn-c").removeClass("ddn");
							}
						}
					}
				}
			},step);
		}
		count();
	});
	
}

// C O U N T D O W N View 1.1
function cdn1(){
	var ar = $("[data-cnn-v = '1.1']");
	var group = $("[data-cnn-group = '1.1']");
	
	function color_gr(){
		setTimeout(function(){
			$(".cnn__colon").css("color","#666");
			color_r();
		},1000);
	};
	function color_r(){
		setTimeout(function(){
			$(".cnn__colon").css("color","red");
			color_gr();
		},1000);
	};
	color_r();
	
	var ths,days,hours,minets,seconds,boolean,step,i=0;
	
	function rec(e){
		ths = $(e);
		days = $(e).find("[data-countdown = days]");
		hours = $(e).find("[data-countdown = hours]");
		minets = $(e).find("[data-countdown = minets]");
		seconds = $(e).find("[data-countdown = seconds]");
		boolean = true;
		step;
		if(seconds.length){
			step = 1000;
		}
		else if(minets.length){
			step = 60000;
		}
		else if(hours.length){
			step = 3600000;
		}
		else if(days.length){
			step = 86400000;
		}
		ths.closest(".cnn-c").prev(".cnn__s-h").addClass("ddn");
		
		count();
	}
	
	rec(ar[i]);

	function count(){
		setTimeout(function(){
			// если есть и секунды (!нужный коммент)
			if(seconds.val()>0){
				if(seconds.val()<=10){
					seconds.val("0"+(seconds.val()-1));
				}
				else
				{
					seconds.val(seconds.val()-1);
				}
				count();
			}
			else
			{
				seconds.val(59);
				if(minets.val()>0){
					if(minets.val()<=10){
						minets.val("0"+(minets.val()-1));
					}
					else
					{
						minets.val(minets.val()-1);
					}
					count();
				}
				else
				{
					minets.val(59);
					if(hours.val()>0){
						if(hours.val()<=10){
							hours.val("0"+(hours.val()-1));
						}
						else
						{
							hours.val(hours.val()-1);
						}
						count();
					}
					else
					{
						hours.val(23);
						if(days.val()>0){
							days.val(days.val()-1);
							count();
						}
						else
						{
							ths.closest(".cnn-c").hide();
							ths.closest(".cnn-c").next(".cnn__h-s").addClass("act");
							ths.closest("[data-cnn-group]").next("[data-cnn-group]").find(".cnn-c").removeClass("ddn");
							i++;
							if(ar.length>i){
								rec(ar[i]);
							}	
						}
					}
				}
			}
		},step);
	}
}

// C O U N T D O W N View 1.2
function cdn2(){
	var ar = $("[data-cnn-v = '1.2']");
	var group = $("[data-cnn-group = '1.2']");
	
	function color_gr(){
		setTimeout(function(){
			$(".cnn__colon").css("color","#666");
			color_r();
		},1000);
	};
	function color_r(){
		setTimeout(function(){
			$(".cnn__colon").css("color","red");
			color_gr();
		},1000);
	};
	color_r();
	
	var ths,days,hours,minets,seconds,boolean,step,i=0;
	
	function rec(e){
		ths = $(e);
		days = $(e).find("[data-countdown = days]");
		hours = $(e).find("[data-countdown = hours]");
		minets = $(e).find("[data-countdown = minets]");
		seconds = $(e).find("[data-countdown = seconds]");
		boolean = true;
		step;
		if(seconds.length){
			step = 1000;
		}
		else if(minets.length){
			step = 60000;
		}
		else if(hours.length){
			step = 3600000;
		}
		else if(days.length){
			step = 86400000;
		}
		ths.closest(".cnn-c").prev(".cnn__s-h").addClass("ddn");
		
		count();
	}
	
	rec(ar[i]);

	function count(){
		setTimeout(function(){
			// если есть и секунды (!нужный коммент)
			if(seconds.val()>0){
				if(seconds.val()<=10){
					seconds.val("0"+(seconds.val()-1));
				}
				else
				{
					seconds.val(seconds.val()-1);
				}
				count();
			}
			else
			{
				seconds.val(59);
				if(minets.val()>0){
					if(minets.val()<=10){
						minets.val("0"+(minets.val()-1));
					}
					else
					{
						minets.val(minets.val()-1);
					}
					count();
				}
				else
				{
					minets.val(59);
					if(hours.val()>0){
						if(hours.val()<=10){
							hours.val("0"+(hours.val()-1));
						}
						else
						{
							hours.val(hours.val()-1);
						}
						count();
					}
					else
					{
						hours.val(23);
						if(days.val()>0){
							days.val(days.val()-1);
							count();
						}
						else
						{
							ths.closest(".cnn-c").hide();
							ths.closest(".cnn-c").next(".cnn__h-s").addClass("act");
							ths.closest("[data-cnn-group]").next("[data-cnn-group]").find(".cnn-c").removeClass("ddn");
							i++;
							if(ar.length>i){
								rec(ar[i]);
							}	
						}
					}
				}
			}
		},step);
	}
}

// Q U A N T I T Y
function qny(){
	var cost,sum,itog;
	
	function cle(e){
		cost = (e.closest("tr").find("[data-qny-cost]").html()).replace(/\s/g,"");
		if(parseFloat(cost)*(e.closest("tr").find(".nmr").attr("value"))>0){
			e.closest("tr").find("[data-qny-sum]").html(parseFloat(cost)*(e.closest(".qny").find(".nmr").attr("value")));
		}
		itog = 0;
		e.closest("[data-qny-group]").find("[data-qny-sum]").each(function(){
			itog = itog + parseFloat($(this).html().replace(/\s/g,""));
		});
		e.closest("[data-qny-group]").find("[data-qny-itog]").html(itog);
		itog = 0;
	}
	$(".qny .nmr").bind("change keyup click", function() {			
		if(this.value.length===1){
			this.value = this.value.replace(/^0+/g ,"");
			this.value = this.value.replace(/[^0-9]/g ,"");	
			$(this).closest(".qny").find('.nmr').attr("value", this.value);						
		}			
		if(this.value.length===2 || this.value.length===3){			
			$(this).attr("value",this.value);
			this.value = this.value.replace(/^0+/g ,"1");			
			this.value = this.value.replace(/[^0-9]/g ,"");	
		}	
		cle($(this));
	});
	$(".qny .nmr").bind("click", function() {
		$(this).select();
		cle($(this));
	});
	$(".qny .nmr").blur(function(){	
		if(this.value===""){
			$(this).attr("value","1");
			this.value = this.value.replace(/^0+/g ,"1");
			this.value = this.value.replace(/[^0-9]/g ,"1");	
			$(this).val(1);			
		}		
		cle($(this));
	});
	$(".qny .pls").click(function(){	
		var i = parseFloat($(this).closest(".qny").find('.nmr').attr("value"));				
		if(i<999){			
			$(this).closest(".qny").find('.nmr').attr("value", i+1);
			$(this).closest(".qny").find('.nmr').val(i+1);			
		};
		cle($(this));
	});
	$(".qny .mns").click(function(){
		var i = parseFloat($(this).closest(".qny").find('.nmr').attr("value"));
		if(i>1){
			$(this).closest(".qny").find('.nmr').attr("value", i-1);
			$(this).closest(".qny").find('.nmr').val(i-1);
		};
		cle($(this));
	});
}



// F O R M _ T A G S
function tgsf(){	
	var k = false;
	var inp = false;	
	var prev = false;
	var group = $("[data-tgsf-group]");
	$(".tgsf .inpn,.tgsf .inp,.tgsf p,.tgsf .p,.tgsf .area__img1-c2").click(function(event){
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
		
		if($(this).closest("[data-tgsf-group]").length){
			var all_act = false;
			$(this).closest("[data-tgsf-group]").find(".tgsf").each(function(){
				if(!$(this).hasClass("act")){
					all_act = false;
					return false;
				}
				else{
					all_act = true;
				}
			});
			if(all_act){
				$(".order__btn-complete").removeClass("dse");
				$(this).closest("[data-tgsf-group]").find("[data-tgsf-btn]").removeClass("dse");
			}
			else{
				$(".order__btn-complete").addClass("dse");
				$(this).closest("[data-tgsf-group]").find("[data-tgsf-btn]").addClass("dse");
			}
		}
	});	
}

// C O U N T D O W N
function cdn_sms(){
	var cted = $("input.cdn").val();
	var cte = "01:00";
	var ar = [];
	var mns = 1;
	var scs = 0;
	var ths = false;
	var q = 0;
	var e = $("input.cdn");
	
	$(".cdna").click(function(){
		$("[data-lock]").addClass("lock");
		$("[data-lock-out]").addClass("lock-out");
		
		$(".kc1__wbc").addClass("ddn");
		ths = $(this);
		ths.closest(".ec").addClass("ddn");
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
				ths.closest(".ec").removeClass("ddn");
				$(".cdnh").addClass("ddn");
				e.val(cted);
				$(".kc1__wbc").removeClass("ddn");
				$("[data-lock]").removeClass("lock");
				$("[data-lock-out]").removeClass("lock-out");
			}
		}
		ctef();
		return false;
	});
}	

// ++R A N G E _ S L I D E R



// A R R O W _ U P
function up(){
	$(".up .arw").click(function(){
		$('html,body').animate({
			scrollTop : 0
		},500);	
	});
}

// C L O N E
function clone_e(){
    click_click();
	$("[data-clone-btn]").click(function(){
		var val = $(this).data("clone-btn");
		var c = $("[data-clone-area = "+val+"]");
		var e = $("[data-clone-e = "+val+"]");
		var cln = e.clone();
		cln.removeAttr("style");
		cln.removeAttr("data-clone-e");
		cln.appendTo(c);
		cln.closest("[data-clone-area]").find(".f-1__str-1:last-child [data-click-btn]").click(function(){
			$(this).next(".f-1__inp-2-c").find("[data-click-e]").click();

			return false;
		});  
		btn_file();
	});
}

function btn_file(){
	$(".file-upload input[type=file]").change(function(){
		var filename = $(this).val().replace(/.*\\/, "");
		$(this).closest(".file-upload-c").find(".filename").val(filename);
	});
}	

function click_click(){
	$("[data-click-btn]").click(function(){
		$(this).next(".f-1__inp-2-c").find("[data-click-e]").click();
		return false;
	});
}

// Compare passwords
function pas_equal(){
	var inp_pas_error;
	var pas1;
	var pas2;
	$(".inp-pas-1,.inp-pas-2").bind("change keyup click", function() {	
		$("[class *= inp-pas-mes-2]").removeClass("act");
		pas1 = $(".inp-pas-1").val();
		pas2 = $(".inp-pas-2").val();
		if(pas1!=pas2){
			inp_pas_error=true;
		}
		else{
			if(pas1 !== "" && pas2 !== ""){
				inp_pas_error=false;
			}	
		}
		if(inp_pas_error === false){
			$("[class *= inp-pas-mes-2]").removeClass("act");
			$(".inp-pas-mes-2-1").addClass("act");
		}
		else
		{
			$("[class *= inp-pas-mes-2]").removeClass("act");
		}
	});
	
	$(document).click(function(event){
		var btn = $(event.target).closest("[class *= inp-pas-]");
		var inp_click = false;
		$("[class *= inp-pas-]").each( function(){
			if ( $(this).get(0) === btn.get(0) )
			{
				inp_click = true;
			}
		});
		if(!inp_click){
			if(inp_pas_error === true){
				$("[class *= inp-pas-mes-2]").removeClass("act");
				$(".inp-pas-mes-2-2").addClass("act");
			}
		}
	});
}

// REVIEW
function scl__rvw(){
	$("[data-scl-from]").click(function(){
		var from = $(this).data("scl-from");
		var to = $("[data-scl-to = "+from+"]").offset().top;
		$('html,body').animate({
			scrollTop : to,
		},500);	
	});
}

function coupon_box(){
	var btn = true;

	$(document).on("click",".partner-coupon__a-acn", function () {
		if(btn === true){
			btn=$(this);
		}
		var e_nbr1 = $(this).closest("tr").find("[data-idoff]").data("idoff");
		var e_nbr2 = $(this).closest("tr").find("[data-numbercupon]").data("numbercupon");
		var y =	$(this).closest("td").offset().top + $(this).closest("td").outerHeight(true);
		var x =	$(this).closest("tr").offset().left;
		var w =	$(this).closest("tr").outerWidth(true);
		$(".partner-coupon__td1.v1").find(".info-hide").html("<span class='info-hide__idoff'>"+e_nbr1+"</span>"+"<span class='info-hide__numbercupon'>"+e_nbr2+"</span>");
		
		$(".partner-coupon__td1.v1").toggleClass("act").css({"top" : y, "left" : x, "width" : w});
		if(btn.get(0) !== $(this).get(0)){
			btn.toggleClass("a-b-u hover-n-o2");
			$(".partner-coupon__td1.v1").toggleClass("act");
		}
		btn = $(this);
		btn.toggleClass("a-b-u hover-n-o2");
	});
}

function coupon_box2(){
	var btn = true;

	$(document).on("click",".partner-coupon__a-acn", function () {
		if(btn === true){
			btn=$(this);
		}
		var e_nbr1 = $(this).closest("tr").find("[data-idoff]").data("idoff");
		var e_nbr2 = $(this).closest("tr").find("[data-numbercupon]").data("numbercupon");
		var y =	$(this).closest("td").offset().top + $(this).closest("td").outerHeight(true);
		var x =	$(this).closest("tr").offset().left;
		var w =	$(this).closest("tr").outerWidth(true);
		$(".partner-coupon__td1.v1").find(".info-hide").html("<span class='info-hide__idoff'>"+e_nbr1+"</span>"+"<span class='info-hide__numbercupon'>"+e_nbr2+"</span>");
		
		$(".partner-coupon__td1.v1").toggleClass("act").css({"top" : y, "left" : x, "width" : w});
		if(btn.get(0) !== $(this).get(0)){
			btn.toggleClass("a-b-u hover-n-o2");
			$(".partner-coupon__td1.v1").toggleClass("act");
		}
		btn = $(this);
		btn.toggleClass("a-b-u hover-n-o2");
	});
	$(document).on("click",".partner-coupon__btn-y.btn-1, .partner-coupon__btn-y.btn-g", function () {
		btn.toggleClass("a-b-u hover-n-o2");
		$(this).closest(".partner-coupon__td1").toggleClass("act");
	});
}

// L O A D I N G
function ldg(){
	var k = $(".ldg__k");
	var clk = $(".ldg__link");
	var close = $(".ldg__close");
	
	clk.click(function(){
	   k.show();
	});
	close.click(function(){
	   k.hide();
	});
}

// P R O G R E S S B A R
function progressbar(){
	var c = $("[data-progressbar2]");
	var val = $("[data-progressbar2-val]");
	var qny = $("[data-progressbar2-qny]");
	var qny2 = $("[data-progressbar2-qny-2]");
	var i = 0;
	var dpe;
	var pr = 0.05;
	var wth;
	var e = $("[data-progressbar2-e]");
	var e_w = e.outerWidth();
	var a = $("[data-progressbar2-img-2]");
	var a_w = a.outerWidth();
	qny.html(qny.attr("data-progressbar2-qny"));
	while(val.length > i){
		
		if($(val.get(i+1)).length){
			
			if($(val.get(i)).data("progressbar2-val") <= qny.data("progressbar2-qny")
				&&
				$(val.get(i+1)).data("progressbar2-val") > qny.data("progressbar2-qny"))
			{
				var qny2_n = $(val.get(i+1)).data("progressbar2-val")-qny.attr("data-progressbar2-qny");
				qny2.attr("data-progressbar2-qny-2",qny2_n);
				qny2.html(qny2_n);
				$(val.get(i)).closest("[data-progressbar2-e]").find(".progressbar2").addClass("act");
				$(".progressbar2.act").closest("[data-progressbar2-e]").prevAll("[data-progressbar2-e]").find(".progressbar2").addClass("fill");
				dpe = $(val.get(i+1)).data("progressbar2-val") - $(val.get(i)).data("progressbar2-val");
				wth = ((qny.data("progressbar2-qny")-$(val.get(i)).data("progressbar2-val"))/dpe)*(e_w-a_w);
				if(wth === 0){
					wth = 0.1;
				}
				$(val.get(i)).closest("[data-progressbar2-e]").prevAll(".progressbar2").removeClass("act");
				$(val.get(i)).closest("[data-progressbar2-e]").find("[data-progressbar2-td-1]").css("width",wth+"px");
				return false;
			}
		}
		else{
			$(val.get(i)).closest("[data-progressbar2-e]").find(".progressbar2").addClass("act");
			$(".progressbar2.act").closest("[data-progressbar2-e]").prevAll("[data-progressbar2-e]").find(".progressbar2").addClass("fill");
			wth = e_w-a_w;
			$(val.get(i)).closest("[data-progressbar2-e]").find("[data-progressbar2-td-1]").css("width",wth+"px");
		}
		i++;
	}
}

// S C O R E 2
function score2(){
	var tgsf = $("[data-score2-tgsf]");
	var itog = $("[data-score2-itog]");
	if(parseInt(itog.data("score2-itog")) < parseInt($("[data-score2-start-cost]").data("score2-start-cost"))){
		var start_cost = itog.data("score2-itog");
	}
	else{
		var start_cost = $("[data-score2-start-cost]").data("score2-start-cost");
	}
	var inp = $("[data-score2-inp]");
	var btn = $("[data-score2-btn]");
	var bln = true;
	
	$(".score2__inp").bind("change keyup click", function() {			
		this.value = this.value.replace(/^0+/g ,"0");			
		this.value = this.value.replace(/[^0-9]/g ,"");	
		if(!this.value)
		{
			bln = false;
		}
		else{
			bln = true;
		}
		if((start_cost >= this.value) && (0 <= this.value)){

			$(this).attr("value",this.value);
		}
		else{
			if(bln){
				$(this).attr("value",start_cost);
				this.value = start_cost;
			}
			else{
				this.value = "";
			}
		}
		minus();
	});
	$(".score2__inp").bind("click", function() {
		$(this).select();
		minus();
	});
	$(".score2__inp").blur(function(){	
		if(this.value===""){
			$(this).attr("value","0");
			this.value = this.value.replace(/^0+/g ,"0");
			this.value = this.value.replace(/[^0-9]/g ,"0");	
			$(this).val(0);			
		}
		minus();
	});
	
	$("[data-score2-tgsf] .inpn,[data-score2-tgsf] .inp,[data-score2-tgsf] p").click(function(event){
		event.stopPropagation();
		minus();
	});
	
	
	
	function minus(){
		setTimeout(function(){
			if(tgsf.hasClass("act")){
				itog.html(itog.attr("data-score2-itog")-inp.attr("value"));
			}
			else{
				itog.html(itog.attr("data-score2-itog"));
			}
		},500);
	};
	minus();
}

// P A Y M E N T S
function payments(){
	var c = $("[data-tabs-group=order]").closest(".tabs");
	var btn = $(".tabs__btns [data-tabs-group=order]");
	var e;
	btn.click(function(){
		c.find(".tgsf.act [checked=checked]").removeAttr("checked");
		c.find(".tgsf.act").removeClass("act");
		c.find(".tabs__in[data-tabs-href="+$(this).data("tabs-btn")+"] .tgsf-c:first-child .tgsf").addClass("act");
		c.find(".tabs__in[data-tabs-href="+$(this).data("tabs-btn")+"] .tgsf-c:first-child .tgsf input").attr("checked","checked");
	})
}

// I M P O R T _ P A R T S _ H T M L
function import_parts_html(){
	$(".asdf").load("hdr.html");
}

//P L A C E H O L D E R
function plr(){
	if(window.matchMedia("(max-width:991px)").matches){
		if($("[data-placeholder-991]").length){
			var e_991 = $("[data-placeholder-991]");
			var e_991_val = $("[data-placeholder-991]").data("placeholder-991");
			e_991.attr("placeholder",e_991_val);
		}
	}
	if(window.matchMedia("(max-width:767px)").matches){
		if($("[data-placeholder-767]").length){
			var e_767 = $("[data-placeholder-767]");
			var e_767_val = $("[data-placeholder-767]").data("placeholder-767");
			e_767.attr("placeholder",e_767_val);
		}
	}
}

// M E N U
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
	
	e2.hover(function(){
		if(!c.find(".e2.hdn").hasClass("act")){
			c.find(".e2.hdn").closest(".ul2").addClass("act");
		}	
	});
	
	function height3(){
		l2.each(function(){
			if($(this).innerHeight() > $(this).find(".ul3").innerHeight()){
				$(this).find(".ul3").height($(this).innerHeight());
			}
		});
	}
	
function sizem(){
	var sum3 = 0;
	l3.each(function(){
		$(this).find("li").each(function(){
			sum3++; 
				
		});
		$(this).css("width",parseInt($(this).find(".e3").css("width"))*sum3);
		sum3 = 0;
	});
}

function layout(){
	var rside = 0;
	var sum23 = 0;
	var cln = 0;
	var szsl = [];
	cln = $(".menut").clone();
	var arm = [];
	c.each(function(id){
		arm[id] = $(this);
	});
	var q = 0; 
	cln.css({
		"display": "block",
		"position": "relative",
		"top": -9999,
		"overflow": "hidden",
		"height": 0
	});
	cln.appendTo("body");
	cln.find(":hidden").show();
	function re_lat(){
		while(q < cln.length){
			arm[q].find(".e1").each(function(id){
				if(cln.outerWidth(true)>0){
					cln.find(".e1:nth-child("+(id+1)+") .ul2").each(function(){
						if(szsl[2] < $(this).outerWidth(true) || szsl[2] === undefined){
							szsl[2] = $(this).outerWidth(true);
						}
					});	
					cln.find(".e1:nth-child("+(id+1)+") .ul3").each(function(){
						if(szsl[3] < $(this).outerWidth(true) || szsl[3] === undefined){
							szsl[3] = $(this).outerWidth(true);
						}
					});			
				}	
				
				sum23 = szsl[2] + szsl[3];
				szsl = [];
				rside=$("html").outerWidth()-$(this).offset().left;
				if(rside < sum23){
					$(this).find(".ul2").addClass("lside");
				}
				else{$(this).find(".ul2").removeClass("lside");}
			});
			q++;
		}
		q = 0;	
	};
	
	re_lat();
	
	$(window).resize(function(){
		re_lat();
	});
	
};
layout();

var xp = 0;
var x = 0;
var yp = 0;
var y = 0;
var ec = null;
var ep = null;
var cft = 20;
var idt = 0;
var idt1 = 0;
var idt2 = 0;
var idt3 = 0;
b = true;
var bln1 = true;
var yt = 0;
var yb = 0;
var kf = 0;

	c.find(".e1,.e2,.e3").hover(
		function(ev){
			ec = $(this);
			if(!b){return false;}
			ev.stopPropagation();
			
			idt1 = setTimeout(function(){
				if(b){
					drw(true);
				}	
			},50);
		},
		function(ev){
			ep = ec;
			if($(this).hasClass("e2")){
				xp = ev.pageX;
				yp = ev.pageY;
				$(".tre").css({top:yp,left:xp});
			}	
			if(!b){return false;}
			ev.stopPropagation();
			
			if(ec.hasClass("e2") && ec.find(".e2").length){
				yt = Math.abs((ec.find(".ul3").offset().top - yp)/(xp-ec.find(".ul3").offset().left));
				yb = Math.abs((ec.find(".ul3").offset().top + ec.find(".ul3").outerHeight() - yp)/(xp-ec.find(".ul3").offset().left));
				kf = Math.max(yt,yb);
			}	
			idt2 = setTimeout(function(){
				if(b){
					if(window.matchMedia("(min-width:768px)").matches){
						drw();
					}	
				}	
			},50);
		}
	);




function drw(bln){
	if(bln){
		if(ec.hasClass("e1")){
			c.find(".act").removeClass("act");
		}
		if(ec.hasClass("e2")){
			c.find(".e2.act").removeClass("act");
		}
		ec.addClass("act");
	}
		
	clearTimeout(idt);
	if((bln === undefined) && (bln1)){
			
			idt = setTimeout(function(){
				c.find(".act").removeClass("act");
			},50);
		
	}	
	if((bln === false) && (bln1)){
		idt = setTimeout(function(){
			c.find(".act").removeClass("act");
		},50);
	}	
	if((bln === false) && (!bln1)){
		ec.closest("ul").find(".act").removeClass("act");
		ec.addClass("act");
	}	
}
	c.find("li").mouseover(function(){ bln1 = false;
	});
	c.find("li").mouseout(function(){ bln1 = true;
	});
	var dse = 0;
$("html").on("mousemove",function(ev){
	x = ev.pageX;
	y = ev.pageY;
	
	
	if(ec !== null){
	if(ec.hasClass("e1") && ec.find(".ul2").length){
		if((((ec.closest(".e1").offset().top < y) && (y < ec.closest(".e1").find(".ul2").offset().top)) && 
			y<(ec.closest(".e1").find(".ul2").offset().top + cft)) &&
			((ec.closest(".e1").find(".ul2").offset().left - cft) < x) &&
			(x < (ec.closest(".e1").find(".ul2").offset().left + ec.closest(".e1").find(".ul2").outerWidth()+cft))){
		}	
	}
	
		if (ec.hasClass("e2")) {
			if (
				((x - xp) > 5) &&
				(xp !== 0)
				) {
				b = false;
				clearTimeout(idt);
				clearTimeout(idt1);
				clearTimeout(idt2);
				clearTimeout(idt3);
				idt3 = setTimeout(function () {
					b = true;
					xp = x;
					yp = y;
					drw(false);
				}, 50);
			}
		}
	}
});

	$(".menup .menut,.menupl,.menup .ul3,.menut ul").click(function(event){
		event.stopPropagation();
	});
	$(".menupl").click(function(){
		var v = 0;
		$("html").css("overflow","hidden");
		if($(this).hasClass("v1")){
			v = "v1";
		}
		if($(this).hasClass("v2")){
			v = "v2";
		}
		if($(this).hasClass("v3")){
			v = "v3";
		}
		if($(this).hasClass("v4")){
			v = "v4";
		}
		$(".menut").animate({
			left:0,
		},500,"swing");
		$(".menup."+v).animate({						
			left:0,
		},500,"swing");
		
		$(".menut .e1.hdr1").addClass("act");
	});
	$("html,.menut .e1.hdr .a1,.menup .e1.hdr .a1").click(function(){
		$("html").css("overflow","auto");
		$(".menut").animate({						
			left:"-100%"
		},500,"swing");
		$(".menup").animate({						
			left:"-100%"
		},500);
	});
	$(".menup .close i,.menut .close i").click(function(){
		$("html").css("overflow","auto");
		$(".menut").animate({						
			left:"-100%"
		},1000);
		$(".menup").animate({						
			left:"-100%"
		},1000);
	});
	
	
	$(window).resize(function(){
		if(window.matchMedia("(min-width:768px)").matches){
			l3.removeClass("act").removeAttr("style");	
			l2.removeClass("act").removeAttr("style");	
			e2.removeClass("act");
			e1.removeClass("act");
		}	
	});

	$(".menup .e2,.menut .e2, .menup .e1:not(.hdr),.menut .e1:not(.hdr)").click(function(){
		if($(this).hasClass("e1") && $(this).closest(".menut, .menup").find(".e1").length > 1){
			$(this).find(".ul2").slideToggle();
			$(this).toggleClass("act");
			if(prev1.length > 1){
				prev1 = $(this);
			}
			if($(this).get(0) !== prev1.get(0)){
				prev1.removeClass("act");
				prev1.find(".ul2").slideUp();
				prev1 = $(this);
			}
		}
		if($(this).hasClass("e2")){
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
		}
	});
}

// U N I V E R S A L _ C A R O U S E L
function uc(id,navb){
$(id).each(function(){
	// t m b, l c r, p c(a) n, h w, e,
	// t - top m - middle b - bottom,
	// l - left c - center r - right
	// p - prev a - act(current) n - next
	// h - height w - width
	// k - base_container t - this e - element
    
	var k = $(this);
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
		if(s>1){s--;ars.show();}else{ars.hide();}
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
						k.find("ec.act").removeClass("act").next(".ec").addClass("act");
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
							k.find("ec.act").removeClass("act").next().addClass("act");
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
			
			$('[data-compare-ovw]').animate({
				"margin-left":sum
			},500);
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
	else{
		ars.show();
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
});
}

// S C R O L L - T O
function scl_to(){
	$('[data-scroll-from]').click(function(){
		var btn = $(this);
		var val = btn.data('scroll-from');
		$('[data-scroll-to = "'+val+'"]').click();
		var y = $('[data-scroll-to = "'+val+'"]').offset().top;
		$('html,body').animate({
			scrollTop : y
		},500);
	});
}

// S C R O L L
function scl(){
	var cp1 = 0;
	var cp2 = 0;
	$(window).scroll(function(){
		var k = $("header .menut");
		cp1=$("html").scrollTop();
		cp2=$("body").scrollTop();
		
		if(cp1>500 || cp2>500){
			$(".up").removeClass("ddn");
		}
		else
		{
			$(".up").addClass("ddn");
		}
	});	
	
	
	var cor_w_h = 0;
	var cor_w_b = 0;
	
	$(window).scroll(function(){
		cor_w_h=$("html").scrollTop();
		cor_w_b=$("body").scrollTop();
	});
		
	// SCROLL Menut
	if($("[data-compare-scl]").length){
		var up = parseInt($(".goods6__hdr").offset().top -10);
		$(window).scroll(function(){
			var k = $("header .menut");
				if(cor_w_h > up || cor_w_b > up){
					$("[data-compare-scl]").addClass('act');
				}
				else
				{
					$("[data-compare-scl]").removeClass('act');
				}
		});		
	}
	
};

// A R R O W _ U P
function up(){
	$(".up i").click(function(){
		$('html,body').animate({
			scrollTop : 0
		},500);	
	});
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

	$(".slt").each(function(){
		if($(this).find(".d-d .es").length>1){
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
					$(this).closest('.slt').find('.cdi').toggle();
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
		else{
			$(this).find("i").hide();
			$(this).find(".d-d").hide();
			$(this).find(".sld").css("cursor","default");
		}
	});	
}

// F I L T E R _ R E S E T
function flr(){
	var k = $(".flr");
	var e = k.find(".e-f");
	var ths = false;
	var sliderp, sliderw;
	var rst = k.find(":reset");
	var sw = k.find(".sw");
	var pfnd = 4;
	var dfe = 0;
	var kh = k.outerHeight(true);
	var khc = 0;

	function rs(){		
		if($('.slrr').length){		
			sliderp = $('.slrr').each(function(index, curSlider){
				var min=parseInt($(this).find(".f-l").attr("data-min"));
				var max=parseInt($(this).find(".l-l").attr("data-max"));
				var minValue=parseInt($(this).find(".f-l").val());
				var maxValue=parseInt($(this).find(".l-l").val());
				$(this).slider({ 			 	
					range: true,
					values: [ minValue,
							  maxValue],
					min: min,
					max: max,
					create: function(event,ui){	
						$(this).find('.f-l').val($(this).slider("option","min"));
						$(this).find('.l-l').val($(this).slider("option","max"));
					},
					slide: function(event,ui)
					{
						$(this).closest(".slrrc").find('.sr-inp-f').val(ui.values[0]);
						$(this).find('.f-l').val(ui.values[0]).change();

						$(this).closest(".slrrc").find('.sr-inp-l').val(ui.values[1]);
						$(this).find('.l-l').val(ui.values[1]).change();

						$(this).find('.ui-slider-handle input').addClass("ddn");
						$(this).find('.ui-state-focus input').removeClass("ddn");

						$(this).closest(".slrrc").find('.sr-inp-f').val(ui.values[0]);
						$(this).closest(".slrrc").find('.sr-inp-l').val(ui.values[1]);
					},
					change: function(event,ui){

					}
				});
			});
		}
		
		k.find('.slrrc .sr-inp-f').focusout(function(){
			var value_f = $(this);
			var value_l = $(this).closest(".sr-k-inp").find(".sr-inp-l");
			
			$(this).closest(".slrrc").find('.f-l').val(value_f.val());
			if(parseInt(value_f.val()) >= parseInt(value_l.val())){
				value_f.val(parseInt(value_l.val()));
				$(this).closest(".slrrc").find('.f-l').val(parseInt(value_l.val()));
				$(this).closest(".slrrc").find('.slrr').slider("values", 0, parseInt(value_l.val()));
			}
			
			if(this.value===""){
				this.value = this.value.replace(/^0+/g ,"1");
				this.value = this.value.replace(/[^0-9]/g ,"1");
				if($(this).is("[data-min]")){
					$(this).val($(this).attr("data-min"));
				}
				if($(this).is("[data-max]")){
					$(this).val($(this).attr("data-max"));
				}
			}		
			
			$(this).closest(".slrrc").find('.slrr').slider("values", 0, $(this).closest(".slrrc").find('.f-l').val());
			if(parseInt(value_f.val()) <= parseInt(value_f.attr("data-min"))){
				value_f.val(parseInt($(this).attr("data-min")));
				$(this).closest(".slrrc").find('.f-l').val(parseInt($(this).attr("data-min")));
				$(this).closest(".slrrc").find('.slrr').slider("values", 0, parseInt($(this).attr("data-min")));
			}
			
			$(this).closest(".slrrc").find('.z1 input').removeClass("ddn");
			$(this).closest(".slrrc").find('.z2 input').addClass("ddn");
		});
		k.find('.slrrc .sr-inp-l').focusout(function(){
			var value_f = $(this).closest(".sr-k-inp").find(".sr-inp-f");
			var value_l = $(this);
			
			$(this).closest(".slrrc").find('.l-l').val(value_l.val());
			if(parseInt(value_f.val()) >= parseInt(value_l.val())){
				value_l.val(parseInt(value_f.val()));
				$(this).closest(".slrrc").find('.l-l').val(parseInt(value_f.val()));
				$(this).closest(".slrrc").find('.slrr').slider("values", 0, parseInt(value_f.val()));
			}
			
			if(this.value===""){
				this.value = this.value.replace(/^0+/g ,"1");
				this.value = this.value.replace(/[^0-9]/g ,"1");
				if($(this).is("[data-min]")){
					$(this).val($(this).attr("data-min"));
				}
				if($(this).is("[data-max]")){
					$(this).val($(this).attr("data-max"));
				}
			}		
			
			$(this).closest(".slrrc").find('.slrr').slider("values", 1, $(this).closest(".slrrc").find('.l-l').val());
			if(parseInt(value_l.val()) >= parseInt(value_l.attr("data-max"))){
				value_l.val(parseInt($(this).attr("data-max")));
				$(this).closest(".slrrc").find('.l-l').val(parseInt($(this).attr("data-max")));
				$(this).closest(".slrrc").find('.slrr').slider("values", 1, parseInt($(this).attr("data-max")));
			}
			
			$(this).closest(".slrrc").find('.z1 input').addClass("ddn");
			$(this).closest(".slrrc").find('.z2 input').removeClass("ddn");
		});
				
		$("#price").find('.f-l').val(sliderp.slider("option","min"));
		$("#price").find('.l-l').val(sliderp.slider("option","max"));		
	}	
	
	rs();
	
	$(".slrrc .sr-inp-f, .slrrc .sr-inp-l").bind("change keyup click", function() {			
		if(this.value.length===1){
			this.value = this.value.replace(/^0+/g ,"");
			this.value = this.value.replace(/[^0-9]/g ,"");	
			$(this).val(this.value);						
		}			
		if(this.value.length>=2){			
			$(this).val(this.value);
			this.value = this.value.replace(/^0+/g ,"1");			
			this.value = this.value.replace(/[^0-9]/g ,"");	
		}				
	});
	k.find('.slrrc .sr-inp-f, .slrrc .sr-inp-l').click(function(){
		$(this).select();
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
	});
	
	k.find(".more").on("click",function(){
//		k.find(":reset").removeClass("dsd").removeAttr("disabled");
	});
	
	rst.click(function(){
		e.removeClass("act");
		e.first().addClass("act");
		e.find(".in").removeAttr("style");
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
		

		$(this).closest(".flr").find(".slrr").each(function(){
			$(this).slider("values", 0, parseInt($(this).find("input[data-min]").attr("data-min")));
			$(this).slider("values", 1, parseInt($(this).find("input[data-max]").attr("data-max")));
		});
		$(this).closest(".flr").find(".ui-slider-handle input").addClass("ddn");
	});
	
	$('[data-flr-close]').click(function(){
		$(this).closest('.e').find('.sw').toggleClass('act');
		$(this).closest('.e').find('.in').toggle();
	});
	
}

// R A T I N G
function rtg(){
	var thsc = $(".rtg");
	var ths = false;
	var clk = false;
	var prev = false;
	
	$(".rtg").find(".dsd").closest(".rtg").addClass("plg");
	$(".rtg .e-r").hover(
		function(){
			ths = $(this);
			thsc = $(this).parents(".rtg");

			thsc.find(".e-r").each(function(){
				$(this).find(".dsd").hide();
			});									
			thsc.find(".e-r").each(function(){
				if($(this).get(0)!==ths.get(0)){
					$(this).find(".dsd").show();
				}
				else
				{
					$(this).find(".dsd").show();		
					ths.click(function(){
						clk = true;
						prev = ths;
					});					
					return false;
				}
			});	
		},
		function(){
			thsc.find(".e-r").each(function(){
				$(this).find(".dsd").hide();
			});	
		}			
	);
	thsc.hover(
		function(){

		},
		function()
		{
			if(clk){							
				$(this).find(".e-r").each(function(){
					if($(this).get(0) !== prev.get(0)){
						$(this).find(".dsd").show();
					}
					else
					{
						$(this).find(".dsd").show();								
						return false;
					}
				});
			}					
		}
	);
}

// L I G H T S L I D E R +
function _lightslider(){
	var c = $('.gallery-c');
	var btn_p = $('.gallery__arw_1');
	var btn_n = $('.gallery__arw_2');
	var btn1_p = $('.lSPrev');
	var btn1_n = $('.lSNext');
	btn_p.show();
	btn_n.show();
	if(c.find('[data-thumb]').length === 1){
		c.find('.lSGallery').hide();
		btn_n.hide();
		btn_p.hide();
		c.find('[data-thumb]').css('text-align','center');
		c.find('.lSSlideOuter.vertical').removeAttr('style');
		c.find('.lSSlideOuter.vertical').addClass('v1');
	}
	btn_p.click(function(){
		btn1_p.click();
	});
	btn_n.click(function(){
		btn1_n.click();
	});
}

// T E X T - O V E R F L O W
function t_o_1(){
	var c = $("[data-t-o]"),
	e = c.find("."+c.data("t-o"));
	e.each(function(){
		if(parseInt($(this).find(".b__t2-e").innerHeight())>parseInt($(this).innerHeight())){
			$(this).find(".b__t2-e").addClass("grt1");
		}
		else{
			$(this).find(".b__t2-e").removeClass("grt1");
		}
	});
}

function t_o(){
	setTimeout(function(){
		t_o_1();
	},100);
}

// M O R E (Calendar)
function more(){
	var c = $(".b__t2-b");
	$(".b__t2-bn").click(function(){
		$(this).closest(".b__t2-b").find(".b__t2-e-c:nth-child(n+5)").show();
		$(this).toggle();
		$(this).closest(".b__t2-b").addClass("act");
	})
	c.each(function(){
		var	e = $(this).find(".b__t2-e-c"),
		b = $(this).find(".b__t2-bn");
		if(e.length>5){
			$(this).find(".b__t2-e-c:nth-child(5)").hide();
			b.addClass("act");
		}
	});	
}

//H O V E R (Calendar)
function hover1(){
	var c = $(".b__t2"),
	c_x_l = c.offset().left,
	c_x_r = c.offset().left+c.innerWidth(),
	e = $(".b__t2-e-c");
	function hover1_1(ths){
		var e_x_l = ths.offset().left,
		cln = ths.clone();
		cln.addClass("cln1");
		cln.appendTo("body");
		var cln_w = $(".cln1").innerWidth(),
		e_x_r = ths.offset().left+cln_w;
		$(".cln1").remove();
		e.removeClass("act");
		ths.addClass("act");
		if(c_x_r<e_x_r){
			ths.addClass("act2");
			ths.removeClass("act1");
		}
		else{
			ths.addClass("act1");
			ths.removeClass("act2");
		}
		
	}
	e.on("mouseenter", function(){
		hover1_1($(this));
	});
	e.on("mouseleave", function(){
		hover1_1($(this));
		e.removeClass("act");
	});
	e.on("click", function(){
		hover1_1($(this));
	});
}

// F O R M _ T A G S
function tgsf(){
	var k = false;
	var inp = false;	
	var prev = false;

	if($('.tgsf.act').length){
		$('.tgsf.act .inp').attr("checked","checked");
		$('.tgsf.act .inp').prop("checked",true);	
	}
	function tgsf_click(e,event){
		event.stopPropagation();
		k = e.closest(".tgsf");
		inp = k.find(".inp");	
		if(inp.attr("type") === "radio"){
			prev = $("html").find(".tgsf.act .inp[name = '" + inp.attr('name') + "']");
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
	}
	
	$("[data-tgsf] .inpn").click(function(event){
		tgsf_click($(this),event);
	});	
	$("[data-tgsf] .inp").click(function(event){
		tgsf_click($(this),event);
	});	
	$("[data-tgsf] p").click(function(event){
		tgsf_click($(this),event);
	});	
}

/* ================= e_F U N C T I O N S (*End*) ================================================================================================ */

/* ================= D_R ======================================================================================================================== */

$(document).ready(function(){
	if($('[data-toggle-btn]').length){
		toggle();
	}	
	
	if($('.date').length){
		$('.date_1,.date_2').datetimepicker({
			locale: 'ru',
			useCurrent: false //Important! See issue #1075
		});
		$(".date_1").each(function(){
			$(this).on("dp.change", function (e) {
				$(this).parent().parent().find('.date_2').data("DateTimePicker").minDate(e.date);
			});
		});
		$(".date_2").each(function(){
			$(this).on("dp.change", function (e) {
				$(this).parent().parent().find('.date_1').data("DateTimePicker").maxDate(e.date);
			});
		});
	}
	if($('.tgsf').length){
		tgsf();
	}
	if($('.b__t2-b').length){
		more();
	}
	
	if($('[data-toggle="tooltip"]').length){
		$('[data-toggle="tooltip"]').tooltip();
	}
});

/* ================= e_D_R (*End*) ============================================================================================================== */

/* ================= W_L ======================================================================================================================== */

$(window).on('load',function(){
	if($('.select2').length){
		var select2 = $('.select2_1').select2({
			minimumResultsForSearch: -9999
		});
	}
	if($('.select2').length){
		var select2 = $('.select2_2').select2({});
	}
	if($('.datatable').length){
		var table1 = $('.datatable_2').DataTable({
			"bFilter": false,
			"paging":   false,
			"info":     false,
			"initComplete": function( settings, json ) {
				 setTimeout(function(){
					$('[data-toggle="tooltip"]').tooltip();
				},2000);
			}
		});
		table1.on( 'column-visibility.dt', function ( e, settings, column, state ) {
			setTimeout(function(){
				$('[data-toggle="tooltip"]').tooltip();
			},2000);
		});
		
		var table2 = $('.datatable_1').DataTable({
			responsive: true,
			"fixedHeader": true,
			"bFilter": false,
			"paging":   false,
			"info":     false,
			"initComplete": function( settings, json ) {
				 setTimeout(function(){
					$('[data-toggle="tooltip"]').tooltip();
				},2000);
			}
		});
		table2.on( 'column-visibility.dt', function ( e, settings, column, state ) {
			setTimeout(function(){
				$('[data-toggle="tooltip"]').tooltip();
			},2000);
		});
		
		var table3 = $('.datatable_3').DataTable({
			responsive: true,
			"bFilter": false,
			"paging":   false,
			"bSort": false,
			"info":     false,
			"initComplete": function( settings, json ) {
				 setTimeout(function(){
					$('[data-toggle="tooltip"]').tooltip();
				},2000);
			}
		});
		table3.on( 'column-visibility.dt', function ( e, settings, column, state ) {
			setTimeout(function(){
				$('[data-toggle="tooltip"]').tooltip();
			},2000);
		});
		
		var table4 = $('.datatable_4').DataTable({
			responsive: true,
			"bFilter": false,
			"paging":   false,
			"info":     false,
			"initComplete": function( settings, json ) {
				 setTimeout(function(){
					$('[data-toggle="tooltip"]').tooltip();
				},2000);
			}
		});
		table4.on( 'column-visibility.dt', function ( e, settings, column, state ) {
			setTimeout(function(){
				$('[data-toggle="tooltip"]').tooltip();
			},2000);
		});
	}
	
	if($('[data-t-o]').length){
		t_o();
	}
	
	if($('.dp__e').length){
		var dateFormat = "mm/dd/yy",
		from = $("#dp_from")
		.datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			changeYear: true,
			closeText: 'Закрыть',
			prevText: '&#x3c;Пред',
			nextText: 'След&#x3e;',
			currentText: 'Сегодня',
			monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
			dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			weekHeader: 'Нед',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		})
		.on("change", function() {
			to.datepicker("option", "minDate", getDate(this));
		}),
		to = $("#dp_to").datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			changeYear: true,
			closeText: 'Закрыть',
			prevText: '&#x3c;Пред',
			nextText: 'След&#x3e;',
			currentText: 'Сегодня',
			monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
			dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			weekHeader: 'Нед',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		})
		.on("change", function() {
			from.datepicker("option", "maxDate", getDate(this));
		});

		function getDate(element) {
			var date;
			try {
				date = $.datepicker.parseDate(dateFormat, element.value);
			} catch (error) {
				date = null;
			}

			return date;
		}
	}
	
	if($('.scrollbar-inner').length){
		$('.scrollbar-inner').scrollbar({
			onInit: function(e){
				e.each(function(){
					if($(this).data.length){
						$(this).css({
							"max-height": e.data("m-h")
						});
					}	
				});
			}
		});
	}
});

/* ================= e_W_L (*End*) ============================================================================================================== */

/* ================= W_R ======================================================================================================================== */

$(window).resize(function(){
	if($('[data-t-o]').length){
		t_o_1();
	}
});

/* ================= e_W_R (*End*) ============================================================================================================== */