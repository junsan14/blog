import { usePage, Link, Head, useForm, router,useRemember} from '@inertiajs/react'
import React, {useEffect, useState,useRef } from "react";
import $ from 'jquery';
import {fixedSearch,formatDate,bg } from "@/script";
import GuestLayout from '@/Layouts/GuestLayout';
import {BsSearch} from 'react-icons/bs';
import {MdAccessTime} from 'react-icons/md';
import {AiOutlineClear} from 'react-icons/ai';
import parse from 'html-react-parser';



export default function Blog() {
    fixedSearch();
    bg();
    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useRemember('');
    const [category, setCategory] = useRemember('');

    const [tagid,setTagid] = useState('');
    //const loadPosts = usePage().props.posts.data;
    let loadPosts = usePage().props.loadPosts.data;
    const [posts, setPosts] = useState(loadPosts);
    useEffect(() => { 
        if(category && keyword){  
            loadPosts = loadPosts.filter(post => post.category === category);
            let reg = new RegExp(keyword,"gi");
            setPosts(loadPosts.filter(post =>  String(post['keywords']).match(reg) ));
            
        }else if(category){
            setPosts(loadPosts.filter(post => post.category === category));
           
        }else if(keyword){
            let reg = new RegExp(keyword,"gi");
            setPosts(loadPosts.filter(post =>  String(post['keywords']).match(reg) ));
           
        }else if(!keyword || !category){
            setPosts(loadPosts);
        }
        //postsTag.style.opacity = 1;
      }, [keyword,category,tagid]);
    
    const reset = ()=>{
        $(".search_area_input").val("");
         setTagid("");
         setKeyword("");
         setCategory("");
         setPosts(loadPosts);
         $(".js-search_area_icon").removeClass("fixed");
     }
    
     const LoadTag = ()=>{
        return(
            loadPosts.forEach((post)=> {
                return(
                    <option value="1" >タグ1</option>   
                )
            })
        )     
     }
     const RendarallPage = ()=>{
        if(posts.length>0){
            return(
                <>
                {posts.map(({id, title, content,excerpt,thumbnail,updated_at,published_at} )=> {
                    return(
                        <div className="article fade" id={id} key={id}>
                            <Link href="/blog/page" data={{ id: id }} className='article_link'>
                                <div className="article_link_img">
                                    {parse(thumbnail)}
                                </div>
                                <div className="article_link_remarks">
                                    <h3 className="article_link_remarks_title">{title}</h3>
                                    <div className="article_link_remarks_text">
                                        {excerpt}
                                    </div>
                                    <p className="article_link_remarks_date">
                                       <MdAccessTime className='article_link_remarks_date_icon' />
                                       {formatDate(published_at)}<br/>
                                    </p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
                </>
            )
        }else{
            return(
                <div className='fade'>{keyword}のキーワードでは､記事がありません</div>
                
            )
        }
              
        
     }

	return (
        <GuestLayout>
                <Head>
                    <title>BLOG</title>
                    <meta name="description" content="WEBエンジニアとしてのポートフォリオ､またWEB制作やWEB開発に関わる知識を発信しています" />
                </Head>
                <div className='background'>
                    <div className="images">
                        <img className="flow-image 0" src="/userfiles/images/africa.png" />
                    </div>
                </div>
                <section className="section blog">
                    <h1 className="section_title">
                    <div className="section_title_jp">BLOG</div>
                    </h1>
                    <ul className="category_tab tab">  
                        <li className={category === 1?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="1" 
                        onClick={(e)=>{setCategory(e.target.value);}}>
                            Engineering
                        </li>
                        <li className={category === 3?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="3" 
                        onClick={(e)=>{setCategory(e.target.value);}}>
                            Notion
                        </li> 
                        <li className={category === 4?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="4" 
                        onClick={(e)=>{setCategory(e.target.value);}}>
                            Diary
                        </li>
                    </ul>
                    <div className="search_area js-search_area">
                        <button type="button" className="search_area_reset js-search_area_reset" value="RESET" onClick={reset}>
                            <AiOutlineClear />
                        </button>
                        <BsSearch className="search_area_icon js-search_area_icon"/>
                        <input list="tag-list"  className="search_area_input js-search_area_input" id="tag-choice" 
                            name="tag-choice" placeholder=""  
                            value={Number(keyword)? "":keyword}
                            onChange={(e)=>{                          
                                setKeyword(e.target.value);
                            }
                            } 
                        />
                        <datalist id="tag-list">
                            <LoadTag />                
                        </datalist>
                    </div>
                    <div className="section_content posts">
                        <RendarallPage />
              
                    </div>
                </section> 
        </GuestLayout> 
	);
  }
