import { usePage,Link,Head } from '@inertiajs/react';
import React, {useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import {EnginerSkillGraph,MotivationChart} from '@/Components/SkillGraph';
import {Instagram} from "@/Components/Sns";
import {FaInstagram} from 'react-icons/fa6';
import { MdEmojiPeople } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import ShowPosts from './Posts/Components/ShowPosts';
import ogp from "../../images/ogp.png"

export default function Home() {
  const loadPosts = usePage().props.loadPosts.data;
  const [posts, setPosts] = useState(loadPosts);

/*
  const RendarallPage = ()=>{
    if(posts.length>0){
        return(
            <>
            {posts.map(({id, title, content,excerpt,thumbnail,updated_at,created_at,published_at} )=> {
              console.log(updated_at)
                const UpdateDate = ()=>{
                  
                  if(formatDate(published_at) == "1970/01/01"){
                    return(
                      <>
                           <p className="article_link_remarks_date">
                              <MdAccessTime className='article_link_remarks_date_icon'/>
                              {formatDate(created_at)}
                           </p>
                      </>   
                    )
                  }else if(formatDate(published_at) == formatDate(updated_at)){
                    return(
                      <p className="article_link_remarks_date">
                         <MdAccessTime className='article_link_remarks_date_icon'/>
                        {formatDate(published_at)}
                      </p>
                    )
                  }else{
                    return(
                      <>
                        <p className="article_link_remarks_date">
                              <MdUpdate className='article_link_remarks_date_icon'/>
                              {formatDate(updated_at)}
                        </p>
                        <p className="article_link_remarks_date">
                              <MdAccessTime className='article_link_remarks_date_icon'/>
                              {formatDate(published_at)}
                        </p>
                      </>
                    )
                  }
                }
                return(
                    <div className="article" id={id} key={id}>
                        <Link href="/blog/page" data={{ id: id }} className='article_link'>
                            <div className="article_link_img">
                                {parse(thumbnail)}
                            </div>
                            <div className="article_link_remarks">
                                <h3 className="article_link_remarks_title">{title}</h3>
                                <div className="article_link_remarks_text">
                                    {excerpt}
                                </div>        
                                   <UpdateDate />
                            </div>
                        </Link>
                    </div>
                )
            })}
            </>
        )
    }   
 }
 */

    return (
      <GuestLayout>
          <Head>
            <title>HOME</title>
            <meta name="description" content="現:海外協力隊ルワンダ24年1次隊員,グローカルプログラム伊予市, それぞれに関わる情報を発信しています" />
            <meta head-key="og:description" name="og:description" content="現:海外協力隊ルワンダ24年1次隊員,グローカルプログラム伊予市　それぞれに関わる情報を発信しています" />
            <meta property="og:image" content={ogp} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content="https://junsan.info/" />
            <meta property="og:title" content="junsan14|HOME" />
            <meta property="og:type" content="website" />
          </Head>
            <div className='background'>
              <div className="images">
                <img className="flow-image 0" id="0" src="/userfiles/images/africa.png" />
              </div>
            </div>
            <div className="home">
                <div className="kv">
                  <div className="kv_text">
                    <h2>JUNSAN 14</h2>
                    <p>WEB ENGINEER/ HOTEL MAN</p>
                    <p>JICA海外協力隊</p>
                  </div>       
                </div>
                <section className="section">
                  <h2 className="section_title">
                    <div className="section_title_jp">ABOUT</div>
                  </h2>     
                  <div className="section_content about skill_graph">
                  <div className="about_chart">
                    <MotivationChart />
                    <EnginerSkillGraph />
                  </div>
                  </div>
                  <div className="section_btn">
                    <Link href="/about">
                      <MdEmojiPeople />
                    </Link>
                  </div>
                  
                </section>
                <section className="section">
                  <h2 className="section_title">
                    <div className="section_title_jp">BLOG</div>
                  </h2>
                  <div className="section_content posts">
                    <ShowPosts selectedPosts={posts} />
                  </div>
                  <div className="section_btn">
                    <Link href="/blog">
                      <FaBlog />
                    </Link>
                  </div>
                </section>
                <section className="section">
                  <h2 className="section_title">
                    <div className="section_title_jp">Instagram</div>
                  </h2>
                  <div className="section_content sns js-sns">
                    <div className="instagram js-instagram">
                      <div className="instagram_wrapper js-instagram-wrapper">
                       <Instagram />
                      </div>
                      <div className="section_btn">
                        <a href='https://www.instagram.com/junsan_junsan14/'>
                          <FaInstagram />
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
  
            </div>
      </GuestLayout>


    );
    
}

