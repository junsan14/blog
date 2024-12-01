import { usePage,Link } from '@inertiajs/react';
import React, {useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import {EnginerSkillGraph,MotivationChart} from '@/Components/SkillGraph';
import {Instagram, Threads} from "@/Components/Sns";
import {FaInstagram,FaThreads} from 'react-icons/fa6';

import { MdEmojiPeople } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import GetPosts from './Posts/Components/GetPosts';

export default function Home() {


  const loadPosts = usePage().props.loadPosts.data;
  const [posts, setPosts] = useState(loadPosts);
    return (
      <GuestLayout>
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
                    <GetPosts selectedPosts={posts} />
                  </div>
                  <div className="section_btn">
                    <Link href="/blog">
                      <FaBlog />
                    </Link>
                  </div>
                </section>
                <section className="section">
                  <h2 className="section_title">
                    <div className="section_title_jp">Threads</div>
                  </h2>
                  <div className="section_content sns js-sns">
                    <div className="threads js-threads">
                      <div className="threads_wrapper js-threads-wrapper">
                        <Threads />
                      </div>
                      <div className="section_btn">
                        <a href='https://www.threads.net/@junsan_junsan14/' target='_blank'>
                          <FaThreads />
                        </a>
                      </div>
                    </div>
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
                        <a href='https://www.instagram.com/junsan_junsan14/' target='_blank'>
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

