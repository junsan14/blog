import $ from "jquery";
import React,{useState,useEffect, Component } from "react";
import transparentImg from '../images/transparent.png';

import hljs from 'highlight.js';
import '../../node_modules/highlight.js/styles/foundation.css'

function SpMenuShow(){
    const [loadState, setLoadState]= useState(false);
    //console.log(loadState)
    $(function(){
      if(!loadState){
     
        let $nav = $('.js-nav');
        let $toggleBtn = $('.js-toggle-sp');
        let $naviList = $('.js-nav-ul-li');
      
          $toggleBtn.on('click', ()=>{       
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
  
  
  
    })
}


function graphShow(){
    $(function(){
      $('.js-tab-front').on('click', ()=>{
        //console.log($(this))
        $(this).css("background", "white")
        $('.js-content').removeClass("show")
        $('.js-content-front').addClass("show");
      })
      $('.js-tab-back').on('click', ()=>{
        $('.js-content').removeClass("show")
        $('.js-content-back').addClass("show");
      })
      $('.js-tab-other').on('click', ()=>{
        $('.js-content').removeClass("show")
        $('.js-content-other').addClass("show");
      })
    })
  }
  

function ModalShow(props){
  let images;
  $(function(){
    let $imageModal = $(".js-image-modal");
    let $showModal = $(".js-show-modal");
    //console.log($(".js-modal-img"))

    $showModal.on("click", function(){
      let $url = $(this).children().attr("src");
      let index = $(this).data("index");
      $imageModal.addClass("show");
      $imageModal.children(".js-modal-pic").attr("src", $url);
      images = $(".js-modal-img");
      console.log(images.length)
      if(images.length === 1){
        $(".js-left-arrow").addClass("hide");
        $(".js-right-arrow").addClass("hide");
      }
      $(".js-slide-number").text(`${index+1}/${images.length}`)
      $("body").addClass("noscroll");
      
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
          console.log($imageModal.children(".js-modal-pic"))
          $imageModal.children(".js-modal-pic").attr("src", $(images[index]).attr("src")); 
          $(".js-slide-number").text(`${index+1}/${images.length}`)
        }
      })
      //モバイルスワイプ処理終了

      //スライダー処理
      $(".js-close-image-modal-btn, .js-image-modal").on("click", function(e){ 
        if($(e.target).hasClass("js-left-arrow")){
          if(index === 0){
            index = images.length-1;
          }else{
            index = index - 1;
          }
  
          $imageModal.children(".js-modal-pic").attr("src", $(images[index]).attr("src"));
          $(".js-slide-number").text(`${index+1}/${images.length}`) 
        }else if($(e.target).hasClass("js-right-arrow")){
          if(index === images.length-1){
            index = 0;
          }else{
            index = index + 1;
          }
          $imageModal.children(".js-modal-pic").attr("src", $(images[index]).attr("src")); 
          $(".js-slide-number").text(`${index+1}/${images.length}`)
        }else if(!$(e.target).hasClass("js-modal-pic")){
          $(".js-close-image-modal-btn").parent().removeClass("show");
          $imageModal.children(".js-modal-pic").attr("src", transparentImg);
          $("body").removeClass("noscroll")
          
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
          <img className="js-modal-pic modal-pic" src='' alt="" />
          <span className='js-right-arrow right-arrow'></span> 
          <span className='js-slide-number slide-number'></span> 
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
       $searchIcon.addClass("fixed");
       $resetBtn.addClass("show");      
    })

    $searchBox.on("blur", function(){
      if(!$(this).val()){
        $searchIcon.removeClass("fixed");
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
            $searchIcon.addClass("fixed");
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

function addClassPage(){
  $(function(){
    let $markupElements = $("pre");
    let $subContent = $("h3");

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
  


  //コピーエリア作成
  $markupElements.each((i,ele)=>{
      $(ele).replaceWith(function() {
      $(this).replaceWith(`

          <pre>${$(this).html()}
              <div class="markup-area-copy_text">copy</div>       
          </pre>

      `)
    });

  });
  $subContent.each((i,ele)=>{
    $($(ele).nextAll().not("h3").not("h2")).addClass("sub_content");
  })
  hljs.highlightAll();
  //コピーボタン
  $(".markup-area-copy_text").on("click", function(){
    let that = $(this);
    let copiedText = that.prev().text();
    console.log(copiedText)
    that.text("copied");
    that.addClass("copied");
    //console.log(that.prev().text())
    setTimeout(()=>{
    that.children("div").text("copy"); 
    that.removeClass("copied");
    },3000)
    return navigator.clipboard.writeText(copiedText);
  })
  })
}







export {graphShow,ModalShow,fixedSearch,SpMenuShow, formatDate,addClassPage,formatinputDate};