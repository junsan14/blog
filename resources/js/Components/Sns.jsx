import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react';

import { ModalShow } from '@/script';
import {AiFillHeart} from 'react-icons/ai';

function Instagram(){  
  const page = usePage();
  const [posted, setPosted] = useState("");
  useEffect(()=>{
    const user_name = "junsan_junsan14" //ビジネスorクリエイターアカウントの必要あり
    const access_token = page.props.Instagram_access_token_KEY;
    const user_id = page.props.Instagram_user_id_KEY;
    const get_count = 8 //取得したい投稿数
    
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
   
        //ModalShow(posts,"instagram");
        return(
          <>
            <ModalShow posts={posts} />
            {posts.map((post,i,ary) => {
              //console.log(posts[0].media_url)
              return(
                <div className='post js-show-modal' id="grid" data-posts={posts} data-url={post.media_url} data-index={i} key={i}>
                    <img src={post.media_url} alt="" className="post_image js-modal-img" data-url={post.media_url} data-index={i}/>
                    <div className="post_desc">
                      <AiFillHeart alt="" className="post_desc_heart" />
                      <span className="post_desc_caption">{post.caption}</span>
                      <span className="post_desc_like-count">{post.like_count}</span>
                    </div>              
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



