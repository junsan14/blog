import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react';
import profile from '../../images/profile.png';
import { ModalShow,formatDate } from '@/Script';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import parse from 'html-react-parser';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination, Autoplay} from 'swiper/modules';


function Instagram(){  

  const [posted, setPosted] = useState("");
  useEffect(()=>{
    const user_name = "junsan_junsan14" //ビジネスorクリエイターアカウントの必要あり
    const ACCESS_TOKEN = import.meta.env.VITE_APP_INSTAGRAM_ACCESS_TOKEN;
    const USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID;
    const get_count = 9 //取得したい投稿数
    //const a = `https://graph.instagram.com/v21.0/${user_id}?fields=business_discovery.username(${user_name}){id,followers_count,media_count,ig_id,media.limit(${get_count}){caption,media_url,like_count}}&access_token=${ACCESS_TOKEN}`;
    //const a = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,caption&access_token=${ACCESS_TOKEN}`
    //console.log(a)
    //console.log(process.env.REACT_APP_Instagram_user_id_KEY);
    //console.log(import.meta.env.VITE_APP_Instagram_access_token_KEY ) // "123
    //https://graph.threads.net/v1.0/me/threads?fields=id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post&limit=${get_count}&access_token=${ACCESS_TOKEN}
    ////https://graph.facebook.com/v16.0/${user_id}?fields=business_discovery.username(${user_name}){id,followers_count,media_count,ig_id,media.limit(${get_count}){caption,media_url,like_count}}&access_token=${access_token}
    axios
      .get(
        `https://graph.instagram.com/v21.0/me/media?fields=id,media_type,media_url,username,timestamp,caption&limit=${get_count}&access_token=${ACCESS_TOKEN}`
      )
      .then((res) => {
        setPosted(res.data);   
      });
    
  }, [])

    const Render = ()=>{

      if(posted){
       
        let posts =posted.data;
        //  console.log(posts)
        //console.log(posts)
        //ModalShow(posts,"instagram");
        return(
          <>
            <ModalShow/>
            
            {posts.map((post,i) => {
              const MediaType = ()=>{
                if(String(post.media_type) === "VIDEO"){
                 return (
                    <video src={post.media_url} alt="" 
                      className="post_image js-modal-img" data-url={post.media_url} data-index={i}
                      muted autoPlay 
                    ></video>            
                 )
                }else{
                  return (
                    <img src={post.media_url} alt="" className="post_image js-modal-img" data-url={post.media_url} data-index={i}/>            
                   )
                }
              }
              return(
                <div className='post' key={i}>
                  <div className='js-show-modal' id="grid" data-posts={posts} data-url={post.media_url} data-index={i}>
                    <MediaType />
                  </div> 
                  <figcaption className='js-figcaption-date'>{formatDate(post.timestamp)}</figcaption>
                  <figcaption className="post_desc_caption js-figcaption-text" >
                    {parse(post.caption)}
                  </figcaption>   
                </div>
              )          
            })}           
          </>
        )
      }else{
        return(
          <>接続に問題があるようです</>
          )
      }

    }
   
  return (
    <Render />
  );
}


function Threads(){  
  const page = usePage();
  const [posted, setPosted] = useState("");
  useEffect(()=>{
    const ACCESS_TOKEN = import.meta.env.VITE_APP_THREADS_ACCESS_TOKEN;
    const THREADS_USER_ID = import.meta.env.VITE_APP_THREADS_USER_ID;
    const get_count = 6 //取得したい投稿数
    //console.log(`https://graph.threads.net/v1.0/me/threads?fields=id,media_type,media_url,permalink,username,text,timestamp&limit=${get_count}&access_token=${ACCESS_TOKEN}`);
    //console.log(import.meta.env.VITE_APP_Instagram_access_token_KEY ) // "123"
  //console.log(`https:graph.threads.net/v1.0/${THREADS_USER_ID}/threads_publishing_limit?fields=quota_usage,config&access_token=${ACCESS_TOKEN}`)
    //console.log(`https://graph.threads.net/v1.0/me/threads?fields=id,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post&since=2024-10-15&until=2024-11-29&limit=1&access_token=${ACCESS_TOKEN}`)

    axios
      .get(
        `https://graph.threads.net/v1.0/me/threads?fields=id,media_type,media_url,permalink,username,text,timestamp&limit=${get_count}&access_token=${ACCESS_TOKEN}`

      )
      .then((res) => {
        setPosted(res.data);   
      });
    
  }, [])

    const Render = ()=>{
      if(posted){
        let posts =posted.data;
        //console.log(posted)
        //ModalShow(posts,"instagram");
        return(
          <>
            {posts.map((post,i) => {
              console.log(post.permalink)
              return(
              <>
                <a href={post.permalink} target="_blank">
                  <div className='post' key={i}>
                    <div className="post_img">
                      <img src={profile} alt="" />
                    </div>
                    <div className='post_content'>
                      <div className='post_content_title'>
                        <h2 className="title">{post.username}</h2>
                        <p className="date">{formatDistanceToNow(post.timestamp,{locale: ja})}前 </p>
                      </div>
                      <div className='post_content_text'>
                        <div className='text'>
                        <p>{post.text}</p>
                         </div>
                        <div className='icon'>
                          <FaRegHeart />
                          <FaRegComment />
                          <FaRetweet />
                          <LuSend />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </>
              )          
            })}           
          </>
        )
      }else{
        return(
          <>接続中です。</>
          )
      }

    }

   const SwiperDet = () =>{
    if(posted){
      let posts =posted.data;
      return(
        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          loop={true}
          centeredSlides={true}
          breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 50,
          },
          960: {
            slidesPerView: 2.8,
            spaceBetween: 50,
          },
        }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination,Autoplay]}
          className="mySwiper"
        >
          {posts.map((post,i)=>(
              <SwiperSlide key={i}>       
              <a href={post.permalink} target="_blank">
                  <div className='post'>
                    <div className="post_header">
                      <img src={profile} alt="" />
                      <h2 className="title">{post.username}</h2>
                      <p className="date">{formatDistanceToNow(post.timestamp,{locale: ja})}前 </p>
                    </div>
                    <div className='post_content'>
                        <p>{post.text}</p>
                    </div>
                    <div className='icon'>
                        <FaRegHeart />
                        <FaRegComment />
                        <FaRetweet />
                        <LuSend />
                    </div>
                  </div>
                </a>

              </SwiperSlide>

            ))}
        </Swiper>


        )
      }else{
        return(
          <>接続に問題があるようです</>
          )
      }
   }
  return (
    <>
      <SwiperDet />
    </>
  );


 
}

export {Instagram, Threads};



