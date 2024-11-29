import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react';
import profile from '../../images/profile.png';
import { ModalShow,formatDate } from '@/Script';

import parse from 'html-react-parser';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'

function Instagram(){  

  const [posted, setPosted] = useState("");
  useEffect(()=>{
    const user_name = "junsan_junsan14" //ビジネスorクリエイターアカウントの必要あり
    const access_token = import.meta.env.VITE_APP_Instagram_access_token_KEY;
    const user_id = import.meta.env.VITE_Instagram_user_id_KEY;
    const get_count = 9 //取得したい投稿数
    //console.log(process.env.REACT_APP_Instagram_user_id_KEY);
    //console.log(import.meta.env.VITE_APP_Instagram_access_token_KEY ) // "123
    axios
      .get(
        `https://graph.facebook.com/v16.0/${user_id}?fields=business_discovery.username(${user_name}){id,followers_count,media_count,ig_id,media.limit(${get_count}){caption,media_url,like_count}}&access_token=${access_token}`
      )
      .then((res) => {
        setPosted(res.data);   
      });
    
  }, [])
    const Render = ()=>{

      if(posted){
        let posts =posted.business_discovery.media.data; 
        //console.log(posts)
        //ModalShow(posts,"instagram");
        return(
          <>
            <ModalShow posts={posts} />
            
            {posts.map((post,i) => {
              //console.log(post)
              const Source = ()=>{
                if(String(post.media_url).indexOf('mp4') !== -1){
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
                    <img src={post.media_url} className="post_image js-modal-img" />
                  </div> 
                  <figcaption className="post_desc_caption" >{parse(post.caption)}</figcaption>   
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
    const user_name = "junsan_junsan14" //ビジネスorクリエイターアカウントの必要あり
    const ACCESS_TOKEN = import.meta.env.VITE_APP_threads_access_token;
    const THREADS_USER_ID = import.meta.env.VITE_threads_user_id;
    const get_count = 9 //取得したい投稿数
    //console.log(THREADS_USER_ID);
    //console.log(import.meta.env.VITE_APP_Instagram_access_token_KEY ) // "123"
  //console.log(`https:graph.threads.net/v1.0/${THREADS_USER_ID}/threads_publishing_limit?fields=quota_usage,config&access_token=${ACCESS_TOKEN}`)
    //console.log(`https://graph.threads.net/v1.0/me/threads?fields=id,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post&since=2024-10-15&until=2024-11-29&limit=1&access_token=${ACCESS_TOKEN}`)

    axios
      .get(
        `https://graph.threads.net/v1.0/me/threads?fields=id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post&limit=${get_count}&access_token=${ACCESS_TOKEN}`

      )
      .then((res) => {
        setPosted(res.data);   
      });
    
  }, [])

    const Render = ()=>{
      if(posted){
        let posts =posted.data;
        console.log(posted)
        //ModalShow(posts,"instagram");
        return(
          <>
            {posts.map((post,i) => {
              console.log(post.permalink)
              return(
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
                        <p>{post.text}</p>
                      </div>
                    </div>
                  </div>
                </a>
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

export {Instagram, Threads};



