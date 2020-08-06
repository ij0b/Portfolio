//++F U N C T I O N

function mnu(){
    $(".b2_f-c").click(function(){
        $(".b2_f__1").toggle();
        $(".b2_f__2").toggle();
        $(".b2_c").toggle();
    })
}

function vidplay1() {
    var video = document.getElementById("video1");
    var button = document.getElementById("video1_play");
    if (video.paused) {
       $(".b3_video-play-c").hide();
       video.play();
    } else {
       video.pause();
    }
    $(".b3_video").on('ended',function(){
    $(".b3_video-play-c").show();
   });
}
function vidplay2() {
    var video = document.getElementById("video2");
    var button = document.getElementById("video2_play");
    if (video.paused) {
       $(".b9_video-play-c").hide();
       video.play();
    } else {
       video.pause();
    }
    $(".b9_video").on('ended',function(){
    $(".b9_video-play-c").show();
   });
}

// ++T A B S (tabs)

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
	$(".tabs__e").click(function(){
		if(!$(this).hasClass("act")){
			var group = $(this).data("tabs-group");
			var href = $(this).data("tabs-href");
			$("[data-tabs-group = "+group+"]").removeClass("act");
			$("[data-tabs-href = "+href+"]").addClass("act");
		}
		return false;
	});
}

//--F U N C T I O N S

$(document).ready(function () {
    if($(".tabs__e").length){
		tabs();
	}
    mnu();
});