import { usePage, Link, Head} from '@inertiajs/react'
import React, {useEffect, useState,useRef } from "react";
import $ from 'jquery';
import search from '@/images/search.png';
import {fixedSearch,formatDate } from "@/script";
import GuestLayout from '@/Layouts/GuestLayout';
import {BsSearch} from 'react-icons/bs';
import {MdUpdate} from 'react-icons/md';
import {AiOutlineClear} from 'react-icons/ai';

export default function Blog() {
    fixedSearch();

    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [tagid,setTagid] = useState('');
    const loadPosts = usePage().props.posts.data;
    const [posts, setPosts] = useState(loadPosts);
    const [inProp, setInProp] = useState(false);

    useEffect(() => { 
        
        if(keyword){  
            setPosts(loadPosts.filter(post => post.keywords.indexOf(keyword) !==-1 ));
            
        }else if(category){
            setPosts(loadPosts.filter(post => post.category === category));
           
        }else if(!keyword || !category){
            setPosts(loadPosts);
        }
        //postsTag.style.opacity = 1;
      }, [keyword,category,tagid]);
    
    const reset = ()=>{
        $(".search_area_input").val("");
         setTagid("");
         setKeyword("");
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
     /*
     const RendarSearch = ()=>{ 
        return(
          <div className="search_area js-search_area">
            <button type="button" className="search_area_reset js-search_area_reset" value="RESET" onClick={reset}>リセット</button>
              <BsSearch className="search_area_icon js-search_area_icon"  />
              <input list="tag-list"  className="search_area_input js-search_area_input" id="tag-choice" 
                name="tag-choice" placeholder=""  
                onChange={(e)=>{
                    setKeyword(e.target.value);
                  }
                } 
              />
            <datalist id="tag-list">
                <LoadTag />                
            </datalist>
          </div>
        )
     }
     */
     const RendarallPage = ()=>{
        if(posts.length>0){
            return(
                <>
                {posts.map(({id, title, content,excerpt,thumbnail,updated_at} )=> {
                    return(
                        <div className="article fade" id={id} key={id}>
                            <Link href="/blog/page" data={{ id: id }} className='article_link'>
                                <div className="article_link_img">
                                    <img className="thumbnail" src={thumbnail} alt="" />
                                </div>
                                <div className="article_link_remarks">
                                    <h3 className="article_link_remarks_title">{title}</h3>
                                    <div className="article_link_remarks_text">
                                        {excerpt}
                                    </div>
                                    <p className="article_link_remarks_date">
                                       <MdUpdate className='article_link_remarks_date_icon' />
                                       {formatDate(updated_at)}<br/>
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
                <section className="section blog">
                    <h1 className="section_title">
                    <div className="section_title_jp">BLOG</div>
                    </h1>
                    <ul className="category_tab tab">  
                        <li className="category_tab_li" tabIndex="-1" value="1" onClick={(e)=>{
                        setCategory(e.target.value);
                        reset();
                        }}>Wiki
                        </li>
                        <li className="category_tab_li" tabIndex="-1" value="2" onClick={(e)=>{
                        setCategory(e.target.value);
                        reset();
                        }}>Note
                        </li>
                        <li className="category_tab_li" tabIndex="-1" value="3" onClick={(e)=>{
                        setCategory(e.target.value);
                        reset();
                        }}>Tool
                        </li> 
                        <li className="category_tab_li" tabIndex="-1" value="4" onClick={(e)=>{
                        setCategory(e.target.value);
                        reset();
                        }}>Diary
                        </li>
                    </ul>
                    <div className="search_area js-search_area">
                        <button type="button" className="search_area_reset js-search_area_reset" value="RESET" onClick={reset}>
                            <AiOutlineClear />
                        </button>
                        <BsSearch className="search_area_icon js-search_area_icon"/>
                        <input list="tag-list"  className="search_area_input js-search_area_input" id="tag-choice" 
                            name="tag-choice" placeholder=""  
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
