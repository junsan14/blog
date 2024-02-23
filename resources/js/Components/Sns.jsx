import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react';

import { ModalShow } from '@/script';
import {AiFillHeart} from 'react-icons/ai';
import parse from 'html-react-parser';

function Instagram(){  
  const page = usePage();
  const [posted, setPosted] = useState("");
  useEffect(()=>{
    const user_name = "junsan_junsan14" //ビジネスorクリエイターアカウントの必要あり
    const access_token = import.meta.env.VITE_APP_Instagram_access_token_KEY;
    const user_id = import.meta.env.VITE_Instagram_user_id_KEY;
    const get_count = 9 //取得したい投稿数
    //console.log(process.env.REACT_APP_Instagram_user_id_KEY);
    //console.log(import.meta.env.VITE_APP_Instagram_access_token_KEY ) // "123"

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
              return(
                <div className='post' key={i}>
                  <div className='js-show-modal' id="grid" data-posts={posts} data-url={post.media_url} data-index={i}>
                      <img src={post.media_url} alt="" className="post_image js-modal-img" data-url={post.media_url} data-index={i}/>            
                  </div> 
                  <figcaption className="post_desc_caption" >{parse(post.caption)}</figcaption>   
                </div>
              )          
            })}           
          </>
        )
      }

    }
   
  return (
    <Render />
  );


 
}

export {Instagram};



