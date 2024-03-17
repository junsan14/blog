import $ from "jquery";
import React,{useState,useEffect, Component } from "react";
import transparentImg from '../images/transparent.png';
import hljs from 'highlight.js';
import '../../node_modules/highlight.js/styles/foundation.css'

function SpMenuShow(){
  const [loadState, setLoadState]= useState(false);

  useEffect(()=>{
    const $nav = $('.js-nav');
    const $toggleBtn = $('.js-toggle-sp');
    const $naviList = $('.js-nav-ul-li');
    if(!loadState){
      $toggleBtn.on('click', ()=>{       
        console.log('click')
        if($nav.hasClass('show')){
          $nav.removeClass('show');
          $toggleBtn.removeClass('show');
          $("body").removeClass('noscroll');
          //console.log($header.hasClass('show'))
        }else{
          $nav.addClass('show');
          $toggleBtn.addClass('show');
          $("body").addClass('noscroll');
          //console.log($header.hasClass('show'))
        }
  
      })
      $naviList.on('click',()=>{
        $nav.removeClass('show');
        $toggleBtn.removeClass('show');
        $("body").removeClass('noscroll');
      })
      setLoadState(true);
  }
  },[loadState])

      
  
  
  
    
}


function graphShow(){
    $(function(){
      $('.js-skill-tab-li').on('click', function(){
       
        $(this).addClass("show on");
        $(this).siblings().removeClass("on");
        let $content = $(".js-content-"+$(this).attr('name'));
        $content.addClass('show');
        $content.siblings().removeClass('show');
      })     
    })
  }

function bg(){
   
    const bgimages = [
        "/userfiles/images/mysql.png",
        "/userfiles/images/jquery.png",
        "/userfiles/images/gas.png",
        "/userfiles/images/africa.png",
        "/userfiles/images/npm.png",
        "/userfiles/images/wp.png",
        "/userfiles/images/laravel.png",
        "/userfiles/images/php.png",
        "/userfiles/images/kusatsu.png",
        "/userfiles/images/apple.png",
        "/userfiles/images/slime.png",
       ];
       //let id = $('.flow-image').last().attr('id')?$('.flow-image').last().attr('id'):0;
       $(function(){
        //id = $('.flow-image').length ===0? 0:id;
        let id =0;
        let createBg = setInterval(function(){
          //console.log('タブアクティブ')
          let num = Math.floor(Math.random() * (bgimages.length));
          let position = Math.floor(Math.random() * 99);  
          id++;
          //console.log(id)
          //console.log($('.flow-image').last().attr('id'))
          if($("."+id ).length === 0){
            $(".images").append(`<img class="flow-image ${id}" id="${id}" style="left:${position}%;" src="${bgimages[num]}" />`);
            let removeImg = $("."+id);
            setTimeout(function(){
              removeImg.remove();
            },15000)
          }
         },5000)

        window.addEventListener('visibilitychange', function(){
          if (document.visibilityState === "visible") {
            createBg = setInterval(function(){
              //console.log('タブアクティブ')
              let num = Math.floor(Math.random() * (bgimages.length));
              let position = Math.floor(Math.random() * 99);  
              id++;
              //console.log(id)
              //console.log($('.flow-image').last().attr('id'))
              if($("."+id ).length === 0){
                $(".images").append(`<img class="flow-image ${id}" id="${id}" style="left:${position}%;" src="${bgimages[num]}" />`);
                let removeImg = $("."+id);
                setTimeout(function(){
                  removeImg.remove();
                },15000)
              }
             },5000)
          } else{
            $('.flow-image').remove();
          clearInterval(createBg);
          }
          
         
        })
      })
      


   
}

function ModalShow(props){
  let images;

  $(function(){
    let $imageModal = $(".js-image-modal");
    let $showModal = $(".js-show-modal");


    $showModal.on("click", function(){
      
      $("body").addClass("noscroll");
      let $url = $(this).children().attr("src");
      let index = $(this).data("index");

      $imageModal.addClass("show");
      $imageModal.find(".js-modal-pic").attr("src", $url);
      images = $(".js-modal-img");    
      if(images.length === 1){
        $(".js-left-arrow").addClass("hide");
        $(".js-right-arrow").addClass("hide");
      }
      $(".js-slide-number").text(`${index+1}/${images.length}`)
      $(".js-slide-figcaption").text($($showModal[index]).next("figcaption").text());
      
      //console.log($($showModal[index]).next("figcaption").text())
      //モバイルスワイプ処理
      const minimumDistance = 30
      let startX = 0
      let startY = 0
      let endX = 0
      let endY = 0
      let isTouch = false;
      $(".js-modal-pic").on("touchstart", function(e){
        
        startX = e.touches[0].pageX
        startY = e.touches[0].pageY
        isTouch = true;
      })
      $(".js-modal-pic").on("touchmove", function(e){
        
        endX = e.changedTouches[0].pageX
        endY = e.changedTouches[0].pageY
      })
      $(".js-modal-pic").on('touchend', function(e){
       
        if(isTouch){
          const distanceX = Math.abs(endX - startX)
          // 左右のスワイプ距離の方が上下より長い && 小さなスワイプは検知しないようにする
          if (endX > startX && distanceX > minimumDistance) {
            // スワイプ後の動作
            //console.log('右');
            if(index === 0){
              index = images.length-1;
            }else{
              index = index - 1;
            }
            isTouch = false;
          }else if(endX < startX && distanceX > minimumDistance){
            //console.log('左');
            if(index === images.length-1){
              index = 0;
            }else{
              index = index + 1;
            }
            isTouch = false;
          }
        
          
          $imageModal.find(".js-modal-pic").attr("src", $(images[index]).attr("src")); 
          $(".js-slide-number").text(`${index+1}/${images.length}`);
          $(".js-slide-figcaption").text($($showModal[index]).next("figcaption").text());
     
        }
      })
      //モバイルスワイプ処理終了

      //スライダー処理
      $(".js-close-image-modal-btn, .js-image-modal").on("click", function(e){ 
        //$('.js-content').show("slow");
        
        //console.log("click")
        if($(e.target).hasClass("js-left-arrow")){
          if(index === 0){
            index = images.length-1;
            
          }else{
            index = index - 1;
          }
  
          $imageModal.find(".js-modal-pic").attr("src", $(images[index]).attr("src"));

          $(".js-slide-number").text(`${index+1}/${images.length}`)
          $(".js-slide-figcaption").text($($showModal[index]).next("figcaption").text());
      
        }else if($(e.target).hasClass("js-right-arrow")){
          if(index === images.length-1){
            index = 0;
          }else{
            index = index + 1;
          }
         
            $imageModal.find(".js-modal-pic").attr("src", $(images[index]).attr("src")); 

          console.log($(images[index]).attr("src"))
          $(".js-slide-number").text(`${index+1}/${images.length}`);
          $(".js-slide-figcaption").text($($showModal[index]).next("figcaption").text());
          

        }else if(!$(e.target).hasClass("js-modal-pic")){
          
          $(".js-close-image-modal-btn").parent().removeClass("show");
          $imageModal.find(".js-modal-pic").attr("src", transparentImg);
          $(".js-slide-figcaption").text($($showModal[index]).next("figcaption").text());
          $("body").removeClass("noscroll");
          
        }
      })
      //スライダークローズ処理
    })
    
  });

  return(
    <>
      <div className="image_modal js-image-modal">
          <span className='js-left-arrow left-arrow'></span>
          <button className="js-close-image-modal-btn">✕</button>
          <div className="js-content content">
            <img className="js-modal-pic modal-pic" src='' alt="" />
            <p className='js-slide-figcaption slide-figcaption'>a</p> 
            <span className='js-slide-number slide-number'></span> 
          </div>
          <span className='js-right-arrow right-arrow'></span> 
          
          
      </div>
    </>
  )
}

function fixedSearch(){
  $(function(){
    let $searchBox = $(".js-search_area_input");
    let $searchArea = $(".js-search_area");
    let $resetBtn = $(".js-search_area_reset");
    let $searchIcon = $(".js-search_area_icon");
    

   
    $searchBox.on("focus", function(){    
       $searchIcon.addClass("hide");
       $resetBtn.addClass("show");      
    })

    $searchBox.on("blur", function(){
      $searchIcon.removeClass("hide");
      if(!$(this).val()){
        //$searchIcon.removeClass("hide");
        $resetBtn.removeClass("show");
      }
    })
    
    $resetBtn.on('click', function(){
      $(this).removeClass('show');
    })

    $(window).on("scroll", ()=>{
      //let scrollHeight = $(window).height();
      let currentHeight = $(window).scrollTop();
      //let searchBoxHeight = $searchBox.scrollTop();
      //$searchBox.removeClass("show")
      //console.log($searchArea.offset() )

      if($searchArea.offset().top <currentHeight){
        if(!$searchArea.hasClass("fixed")){
          //console.log($searchBox.hasClass("fixed"))
           $searchArea.addClass("fixed"); 
           $resetBtn.addClass("fixed");

        }
       
      }
      if(currentHeight < 60){
        $searchArea.removeClass("fixed");
         $searchArea.removeClass("show");
         $resetBtn.removeClass("fixed");
        $searchBox.prop('disabled', false);
          
      }

    })


     $searchArea.on("click", function(){
  
          if($searchArea.hasClass("fixed")){
            $searchArea.addClass("show");
            $searchBox.prop('disabled', false);
            $searchIcon.addClass("hide");
          }
     })
    })  

  

}

function formatDate(date){
  let formatDate = new Date(date).getFullYear()+ "/" 
          +(new Date(date).getMonth()+1).toString().padStart(2, '0')+ "/" 
          +new Date(date).getDate().toString().padStart(2, '0');
  return formatDate;
}
function formatinputDate(date){
  let formatDate = new Date(date).getFullYear()+ "-" 
          +(new Date(date).getMonth()+1).toString().padStart(2, '0')+ "-" 
          +new Date(date).getDate().toString().padStart(2, '0')+" "
          +new Date(date).getHours().toString().padStart(2, '0')+ ":"
          +new Date(date).getMinutes().toString().padStart(2, '0');
  return formatDate;
}

function yyyymmddhhss(date){
  let formatDate = new Date(date).getFullYear()+ "/" 
          +(new Date(date).getMonth()+1).toString().padStart(2, '0')+ "/" 
          +new Date(date).getDate().toString().padStart(2, '0')+ " "
          +new Date(date).getHours().toString().padStart(2, '0')+ ":"
          +new Date(date).getMinutes().toString().padStart(2, '0'); 
  return formatDate;
}

function showMsg(is_sccuess){
  $(function(){
     if(is_sccuess){
      let $msgModal = $('.js-send-success');
      let $msg = $('.js-msg');
      $msgModal.addClass('show');

      setTimeout(()=>{
        $msgModal.removeClass('show');
      },3000)
     }
  })
}

function addClassPage(){
  $(function(){
    let $markupElements = $("pre");
    let $subContent = $("h3");
    let $elements = $('h2').nextAll();
    let $h2 = $("h2");

  //setImgNum($(".js-show-modal").length)
  //imgタグにモーダル用のクラス付与

  $(".article_content").find("img").each((i,ele)=>{

      $(ele).addClass("js-modal-img");
      $(ele).wrap(`<div class="js-show-modal" data-index="${i}"></div>`);
      $(ele).append(`<div class="image_modal js-image-modal"></div>`); 
      
      
  })


  $("table").each((i,ele)=>{
  
      $(ele).wrap(`<div class="table_container"></div>`);

  })
  
  $elements.each((i,ele)=>{
    $(ele).not('h2').addClass('sub-content')
  })

  //コピーエリア作成
  //console.log($markupElements.find("code").attr("class"))
  if($markupElements.length !== 0){
    $markupElements.each((i,ele)=>{
    
      let language = $(ele).find("code").attr("class").slice(9, $(ele).find("code").attr("class").length);
      if(language === "GoogleAppsScript" ){
        $(ele).find("code").attr("class", "language-javascript")
      }
      //console.log(language)
        $(ele).replaceWith(function() {
        $(this).replaceWith(`
  
            <pre class="sub-content">
                <div class="markup-area-language_text">${language}</div> 
                ${$(this).html()}
                <div class="markup-area-copy_text">copy</div>       
            </pre>
  
        `)
      });
    });
  }
  
  
  hljs.highlightAll()


  $h2.on('click', function(){
    
    $($(this).nextAll().not("h3").not("h2")).addClass("show");
    //console.log($(this))
  })
 
  //const a = hljs.highlightAll();
  hljs.addPlugin({
    'after:highlight'(result) {
      //let codeArry = result["_top"]["contains"];

  

    }
    
  })
  console.log()


  //コピーボタン
  $(".markup-area-copy_text").on("click", function(){
    let that = $(this);
    let copiedText = that.prev().text();
    //console.log(copiedText)
    that.text("copied");
    that.addClass("copied");
    //console.log(that.prev().text())
    setTimeout(()=>{
    that.text("copy"); 
    that.removeClass("copied");
    },3000)
    return navigator.clipboard.writeText(copiedText);
  })
  })
}







export {graphShow,ModalShow,fixedSearch,SpMenuShow, formatDate,addClassPage,formatinputDate, showMsg,bg};