//++F U N C T I O N

//++S O R B E N T S
function srs(){
    var l = 0;
    var k = 0;
    var qq1 = $('[data-v] .b11-b2_1 .b11-w');
    var vv1 = $('[data-v] .b11-b2_2 .b11-w');
    var qq2 = $('[data-kg] .b11-b2_1 .b11-w');
    var kg = $('[data-kg] .b11-b2_2 .b11-w');
    var bln = true;
    var bln1 = false;
    var prs;
    var tme;
    var tme1;
    var tme2;
    var tme3;
    var tme4;
    var ths1;
    
    function sum(){
        var sum_m=0;
        var sum_v=0;
        $('.b12-t tr').each(function(){
            if($(this).find('.b12-td:nth-child(1)').html() == 'Сорбент из опоки'){    
                sum_m = (sum_m + parseFloat(parseFloat($(this).find('.b12-w4').html()*0.55)));
                sum_v = sum_v + parseFloat($(this).find('.b12-w4').html());
            }
            if($(this).find('.b12-td:nth-child(1)').html() == 'Сорбент из диатомита' ||
                    $(this).find('.b12-td:nth-child(1)').html() == 'Древесные гранулы'){      
                sum_m = (sum_m + parseFloat(parseFloat($(this).find('.b12-w4').html()*0.6)));
                sum_v = sum_v + parseFloat($(this).find('.b12-w4').html());
            }
            if($(this).find('.b12-td:nth-child(1)').html() == 'Силикагель'){      
                sum_m = (sum_m + parseFloat(parseFloat($(this).find('.b12-w4').html()*400)));
                sum_v = sum_v + parseFloat($(this).find('.b12-w4').html());
            }
        });
        sum_m = parseFloat(sum_m).toFixed(3);
        sum_v = parseFloat(sum_v).toFixed(3);
        $('.b12-w2-2').html(sum_m);
        $('.b12-w2-3').html(sum_v);
    }
    
    function cle(ths){
        var q,v;
        $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').each(function(){
            if($(ths).closest('[data-kg]').length){
                v = '<span class="b12-w4">'+ parseFloat(this.value*0.05).toFixed(3) +'</span> м <sup class="b12-w1">3</sup>';
                q = this.value+' шт (20кг)';
            }else{
                v = '<span class="b12-w4">'+ths.value+'</span> м <sup class="b12-w1">3</sup>';
                q = this.value+' шт (55л)';
            }    
        })
        var t = $(ths).closest('[data-srt]').data('srt');
        if(t == 'Древесные гранулы' || t == 'Силикагель'){
            var g = '–';
        }else{
            var g = $(ths).closest('.b11-b1').find('.b11-h1').html().trim().replace(/(Гранула )/g,'');
        }
        var bln = true;
        $('.b12-t tr').each(function(){
            if($(this).find('.b12-td:nth-child(1)').html() == t &&
                $(this).find('.b12-td:nth-child(2)').html() == g){      
                bln=false;
                if(ths.value > 0){
                    $(this).find('.b12-td:nth-child(3)').html(v);
                    $(this).find('.b12-td:nth-child(4)').html(q);
                }else{
                    $(this).remove();
                }
            }
        });
        if(bln && ths.value > 0){
            var cle = $('.b12-tr').clone();
            cle.find('.b12-td:nth-child(1)').html(t);
            cle.find('.b12-td:nth-child(2)').html(g);
            cle.find('.b12-td:nth-child(3)').html(v);
            cle.find('.b12-td:nth-child(4)').html(q);
            cle.removeClass('b12-tr');
            $('.b12-t').append(cle);
        }    
        sum();
        
        $('.b12-f').click(function(){
            var tt = $(this).closest('tr').find('.b12-td:nth-child(1)').html();
            var gg = 'Гранула '+$(this).closest('tr').find('.b12-td:nth-child(2)').html();
            $('.b11-b1').each(function(){
                if($(this).find('.b11-h1').length){
                    if ($(this).closest('[data-srt]').data('srt').trim() == tt.trim() &&
						$(this).find('.b11-h1').html().trim() == gg.trim()) {
                        $(this).find('.b11-b2_1 .b11-w').each(function(){
                            this.value = '';
                            $(this).attr('value','');
                        });
                        $(this).find('.b11-b2_2 .b11-w').each(function(){
                            this.value = '';
                            $(this).attr('value','');
                        });
                    }
                }else{
                    if ($(this).data('srt') == tt){
                        $(this).find('.b11-b2_1 .b11-w').each(function(){
                            this.value = '';
                            $(this).attr('value','');
                        });
                        $(this).find('.b11-b2_2 .b11-w').each(function(){
                            this.value = '';
                            $(this).attr('value','');
                        });
                    }
                }    
            });
            $(this).closest('tr').remove(); 
            sum();
        });
    }
    
    var i=0;
    vv1.bind("change keyup click", function () {
        var ths = this;
        if(ths == ths1){
            clearTimeout(tme1);
        }    
        ths1 = this;
        tme1 = setTimeout(function(){
            console.log('vv1 bln1: ',bln1,'i: ',i++);
            ths.value = ths.value.replace(/[^0-9.]/g, "");
            var c1 = $(ths).closest('[data-v]').data('v');
            var vle = Math.ceil(ths.value / c1);
            prs = $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').attr("value");
            $(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').attr("value", ths.value);
            $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').attr("value", vle);
            $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').each(function () {
                this.value = vle;
            });
            clearTimeout(tme);
            if(bln1){
				ths.value = ths.value.replace(/^0+/g, "");
				ths.value = vle * c1;
				$(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').attr("value", ths.value);
                bln1 = false;
                cle(ths);    
            }else{
                tme = setTimeout(function () {
					ths.value = ths.value.replace(/^0+/g, "");
					ths.value = vle * c1;
					$(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').attr("value", ths.value);
                    cle(ths);    
                }, 5000);
            }
        },500);    
    });
    qq1.bind("change keyup click", function () {
        var ths = this;
        ths.value = ths.value.replace(/^0+/g, "");
        ths.value = ths.value.replace(/[^0-9]/g, "");
        var c1 = $(ths).closest('[data-v]').data('v');
        var vle = ths.value * c1;
        $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').attr("value", ths.value);
        $(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').attr("value", vle);
        $(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').each(function () {
            this.value = vle;
            cle(this); 
        });
    });
    
    kg.bind("change keyup click", function () {
        var ths = this;
        if(ths == ths1){
            clearTimeout(tme2);
        }    
        ths1 = this;
        tme2 = setTimeout(function(){
            console.log('vv1 bln1: ',bln1,'i: ',i++);
            ths.value = ths.value.replace(/[^0-9.]/g, "");
            var c1 = $(ths).closest('[data-kg]').data('kg');
            var vle = Math.ceil(ths.value / c1);
            prs = $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').attr("value");
            $(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').attr("value", ths.value);
            $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').attr("value", vle);
            $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').each(function () {
                this.value = vle;
            });
            clearTimeout(tme);
            if(bln1){
				ths.value = ths.value.replace(/^0+/g, "");
				ths.value = vle * c1;
				$(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').attr("value", ths.value);
                bln1 = false;
                cle(ths);    
            }else{
                tme = setTimeout(function () {
					ths.value = ths.value.replace(/^0+/g, "");
					ths.value = vle * c1;
					$(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').attr("value", ths.value);
                    cle(ths);    
                }, 5000);
            }
        },500); 
    });
    qq2.bind("change keyup click", function () {
        var ths = this;
        ths.value = ths.value.replace(/^0+/g, "");
        ths.value = ths.value.replace(/[^0-9]/g, "");
        var c1 = $(ths).closest('[data-kg]').data('kg');
        var vle = ths.value * c1;
        $(ths).closest('.b11-b1').find('.b11-b2_1 .b11-w').attr("value", ths.value);
        $(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').attr("value", vle);
        $(ths).closest('.b11-b1').find('.b11-b2_2 .b11-w').each(function () {
            this.value = vle;
            cle(this); 
        }); 
    });
    
    $('.b11-w').blur(function(){	
		bln1 = true;
	});
}


// Q U A N T I T Y
function qny(){
    var l = 0;
    var k = 0;
	$(".qny .nmr").bind("change keyup click", function() {			
        if(this.value.length===0){
            $(this).closest('.b3-t1').removeClass('act');
        }    
		if(this.value.length===1){
            $(this).closest('.b3-t1').addClass('act');
            if(this.value == 0){
                $(this).closest('.b3-t1').removeClass('act');
            }
			this.value = this.value.replace(/[^0-9]/g ,"");	
			$(this).closest(".qny").find('.nmr').attr("value", this.value);						
		}			
		if(this.value.length===2 || this.value.length===3){			
            $(this).closest('.b3-t1').addClass('act');
			$(this).attr("value",this.value);
			this.value = this.value.replace(/^0+/g ,"");			
			this.value = this.value.replace(/[^0-9]/g ,"");	
		}				
	});
	$(".qny .nmr").bind("click", function() {
		$(this).select();
	});
	$(".qny .nmr").blur(function(){	
		if(this.value===""){
            $(this).closest('.b3-t1').removeClass('act');
			$(this).attr("value","0");
			this.value = this.value.replace(/^0+/g ,"0");
			this.value = this.value.replace(/[^0-9]/g ,"0");	
			$(this).val(0);			
		}		
	});
	$(".qny .pls").click(function(){	
        var l1 = $(this).closest('.b3-td1').find('.b3-w').html().replace(/[^0-9,]/g ,"").replace(/,/g ,".");
        $(this).closest('.b3-t1').addClass('act');
		var i = parseFloat($(this).closest(".qny").find('.nmr').attr("value"));				
		if(i<999){			
			$(this).closest(".qny").find('.nmr').attr("value", i+$(this).closest('.qny').data('qny-step'));
            l = (parseFloat(l) + l1*$(this).closest('.qny').data('qny-step')).toFixed(1);
            k = (parseFloat(k) + $(this).closest('.qny').data('qny-kg')*$(this).closest('.qny').data('qny-step')).toFixed(2);
			$(this).closest(".qny").find('.nmr').val(i+$(this).closest('.qny').data('qny-step'));			
		};
        
        var b3_h3_1 = $(this).closest('.b3-td1').find('.b3-h').html().replace(/\s-\s/g ,"").trim();
        var b3_h3_2 = '('+$(this).closest('.b3-t').find('.b3-w2-1').html().trim()+')';
        var b3_w4_1 = $(this).closest('.b3-td1').find('.b3-w').html();
        var b3_w4_2 = $(this).closest('.qny').find('.nmr').attr('value')+' шт';
        var bln = true;
        var ths;
        $('.b3-b1-c .b3-b1').each(function(){
            if($(this).find('.b3-h3-1').html() == b3_h3_1 &&
            $(this).find('.b3-h3-2').html().trim() == b3_h3_2 &&
            $(this).find('.b3-w4-1').html() == b3_w4_1){
                bln = false;
                ths = $(this);
            }
        });
        if(bln){
            var cle = $('.b3-b1_1').clone();
            cle.removeClass('b3-b1_1');
            cle.find('.b3-h3-1').html(b3_h3_1);
            cle.find('.b3-h3-2').html(b3_h3_2);
            cle.find('.b3-w4-1').html(b3_w4_1);
            cle.find('.b3-w4-2').html(b3_w4_2);
            $('.b3-b1-c').append(cle);
            
            $('.b3-bn').click(function(){
                var b3_h3_1 = $(this).closest('.b3-b1').find('.b3-h3-1').html();
                var b3_h3_2 = $(this).closest('.b3-b1').find('.b3-h3-2').html();
                var b3_w4_1 = $(this).closest('.b3-b1').find('.b3-w4-1').html();
                var b3_w4_2 = $(this).closest('.b3-b1').find('.b3-w4-2').html();

                $('.b3-t1').each(function(){
                    if($(this).find('.b3-h').html().replace(/\s-\s/g ,"").trim() == b3_h3_1 &&
                    '('+$(this).closest('.b3-t').find('.b3-w2-1').html().trim()+')' == b3_h3_2 &&
                    $(this).find('.b3-w').html() == b3_w4_1
                    ){
                        l1 = $(this).find('.b3-w').html().replace(/[^0-9,]/g ,"").replace(/,/g ,".");
                        $(this).removeClass('act');
                        l = (parseFloat(l) - l1*$(this).find('.nmr').attr("value")).toFixed(1);
                        k = (parseFloat(k) - $(this).find('.qny').data('qny-kg')*$(this).find('.nmr').attr("value")).toFixed(2);
                        $('.b3-w5_1').html(l);
                        $('.b3-w5_2').html(k);
                        $(this).find('.nmr').attr("value", 0);
                        $(this).find('.nmr').val(0);
                    }
                });
                $(this).closest('.b3-b1').remove();
            });
        }else{
            ths.find('.b3-w4-2').html(b3_w4_2);
        }    
        $('.b3-w5_1').html(l);
        $('.b3-w5_2').html(k);
	});
	$(".qny .mns").click(function(){
        var l1 = $(this).closest('.b3-td1').find('.b3-w').html().replace(/[^0-9,]/g ,"").replace(/,/g ,".");;
		var i = parseFloat($(this).closest(".qny").find('.nmr').attr("value"));
		if(i>1){
            $(this).closest('.b3-t1').addClass('act');
			$(this).closest(".qny").find('.nmr').attr("value", i-$(this).closest('.qny').data('qny-step'));
			$(this).closest(".qny").find('.nmr').val(i-$(this).closest('.qny').data('qny-step'));
            l = (parseFloat(l) - l1*$(this).closest('.qny').data('qny-step')).toFixed(1);
            k = (parseFloat(k) - $(this).closest('.qny').data('qny-kg')*$(this).closest('.qny').data('qny-step')).toFixed(2);
		}else if(i==1){
            $(this).closest('.b3-t1').removeClass('act');
            $(this).closest(".qny").find('.nmr').attr("value", i-1);
			$(this).closest(".qny").find('.nmr').val(i-1);
            l = parseFloat(l) - l1;
            k = (parseFloat(k) - $(this).closest('.qny').data('qny-kg')).toFixed(2);
        }
        
        var b3_h3_1 = $(this).closest('.b3-td1').find('.b3-h').html().replace(/\s-\s/g ,"").trim();
        var b3_h3_2 = '('+$(this).closest('.b3-t').find('.b3-w2-1').html().trim()+')';
        var b3_w4_1 = $(this).closest('.b3-td1').find('.b3-w').html();
        var b3_w4_2 = $(this).closest('.qny').find('.nmr').attr('value')+' шт';
        var bln = false;
        var ths;
        $('.b3-b1-c .b3-b1').each(function(){
            if($(this).find('.b3-h3-1').html() == b3_h3_1 &&
            $(this).find('.b3-h3-2').html().trim() == b3_h3_2 &&
            $(this).find('.b3-w4-1').html() == b3_w4_1){
                $(this).find('.b3-w4-2').html(b3_w4_2);
                bln = true;
                ths = $(this);
            }
        });
        if($(this).closest(".qny").find('.nmr').attr("value") == 0){
            $(this).closest('.b3-t1').removeClass('act');
            
            if(bln){
                ths.remove();
            }    
        };
        $('.b3-w5_1').html(l);
        $('.b3-w5_2').html(k);
	});
}

// S C R O L L
function scl(){
	var cor_w_h = 0;
	var cor_w_b = 0;
	
	$(window).scroll(function(){
		cor_w_h=$("html").scrollTop();
		cor_w_b=$("body").scrollTop();
	});
	
	// SCROLL Menut
	if($(".hr").length){
		var h = $(".hr-c").innerHeight();
        $('.hr').height(h);
		$(window).scroll(function(){
			var k = $(".hr-c");
			if(window.matchMedia("(min-width:600px)").matches){
                $('.hr').height(h);
			}
		});		
	}
}

// P L A C H O L D E R
function plr(){
    $('.b5-inp').bind("change keyup click", function() {			
        if(this.value.length===0){
            $(this).closest('.b5-inp-c').find('.b5-inp-w').show();
        }
        if(this.value.length>=1){
            $(this).closest('.b5-inp-c').find('.b5-inp-w').hide();
        }
    });
    $(".b5-inp").blur(function(){	
        if(this.value===""){
            $(this).closest('.b5-inp-c').find('.b5-inp-w').show();
        }
    });
}

//++B O X
function box(){
	if($('[data-box-bn]').length){
		var bln = true;
		$('[data-box-bn]').click(function(){
			var box = $(this).data('box-bn');
			if($(this).attr('data-box-f')!==undefined){
				var src = $(this).data('box-f');
				if($('.box[data-box='+box+']').length==0){
					$('body').append('<div class="box" data-box="'+box+'"><div class="box-td"><div class="box-b"><div class="box-bn"></div><div class="box-b1"><img class="box-f" src="'+src+'"></div></div></div></div>');
					if($(this).data('box-h').length){
						var h = $(this).data('box-h');
						$('.box[data-box='+box+'] .box-f').before('<div class="box-h">'+h+'</div>');
					}	
				}else{
                    if($(this).data('box-h').length){
						var h = $(this).data('box-h');
						$('.box[data-box='+box+'] .box-h').html(h);
					}
					$('.box-f').attr('src',src);
				}
			}	
			$('[data-box = '+box+']').toggleClass('act');
			
			if(bln){
				bln=false;
				$('.box *').click(function (ev) {
					ev.stopPropagation();
					if ($(this).hasClass('box-td') || $(this).hasClass('box-b') || $(this).hasClass('box-bn')) {
						$(this).closest('.box').removeClass('act');
					}
				});
			}	
		});
	}	
}

//++B T N
function btn(){
    $('.b7-w').click(function(){
        var ths = $(this).closest('.b7-b').index();
        $('.b7-b').each(function(){
            if($(this).index() != ths){
               $(this).removeClass('act');
            }else{
               $(this).toggleClass('act');
            }
        });
    });
}
    
//--F U N C T I O N S

$(document).ready(function () {
});

$(window).on('load',function(){
    srs();
    btn();
    box();
    plr();
    scl();
    qny();
    $('.b2-crl').owlCarousel({
        rewind: true,
        autoplay: true,
        autoplayTimeout: 10000,
        items:1
    });
});

$(window).resize(function(){
});