import { usePage,Link,Head } from '@inertiajs/react';
import React, {useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import {EnginerSkillGraph,MotivationChart} from '@/Components/SkillGraph';

import {formatDate,bg } from "@/script";
import {Instagram} from "@/Components/Sns";
import {MdUpdate} from 'react-icons/md';
import parse from 'html-react-parser';

export default function Home() {
  const loadPosts = usePage().props.posts.data;
  const [posts, setPosts] = useState(loadPosts);
  
  const RendarallPage = ()=>{
    if(posts.length>0){
        return(
            <>
            {posts.map(({id, title, content,excerpt,thumbnail,updated_at} )=> {
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
                                <div className="article_link_remarks_date">
                                    <MdUpdate className='article_link_remarks_date_icon' />
                                    {formatDate(updated_at)}<br/>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
            </>
        )
    }   
 }
bg();
    return (
      <GuestLayout>
          <Head>
            <title>HOME</title>
            <meta name="description" content="WEBエンジニアとしてのポートフォリオ､またWEB制作やWEB開発に関わる知識を発信しています" />
          </Head>
            <div className='background'>
              <div className="images">
                <img className="flow-image 0" src="/userfiles/images/africa.png" />
              </div>
            </div>
            <div className="home">
                <div className="kv">
                  <div className="kv_text">
                    <h2>JUNSAN 14</h2>
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
                  <div className="section_btn btn">
                    <Link href="/about">MORE</Link>
                  </div>
                  
                </section>
                <section className="section">
                  <h2 className="section_title">
                    <div className="section_title_jp">BLOG</div>
                  </h2>
                  <div className="section_content posts">
                    <RendarallPage />
                  </div>
                  <div className="section_btn btn">
                  <Link href="/blog">MORE</Link>
                  </div>
                </section>
                <section className="section">
                  <h2 className="section_title">
                    <div className="section_title_jp">SNS</div>
                  </h2>
                  <div className="section_content sns js-sns">
                    <div className="instagram js-instagram">
                      <div className="instagram_wrapper js-instagram-wrapper">
                       <Instagram />
                      </div>
                      <div className="section_btn btn">
                        <a href='https://www.instagram.com/junsan_junsan14/'>Instagram</a>
                      </div>
                    </div>
                  </div>
                </section>
  
            </div>
      </GuestLayout>


    );
    
}

