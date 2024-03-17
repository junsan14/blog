import { usePage, Link, Head, useForm, router,useRemember} from '@inertiajs/react'
import React, {useEffect, useState,useRef } from "react";
import $ from 'jquery';
import {fixedSearch,formatDate,bg } from "@/Script";
import GuestLayout from '@/Layouts/GuestLayout';
import {BsSearch} from 'react-icons/bs';
import {MdAccessTime} from 'react-icons/md';
import {AiOutlineClear} from 'react-icons/ai';
import parse from 'html-react-parser';



export default function Blog() {
    fixedSearch();


    const [searchState, setSearchState] = useRemember({
        keyword:"",
        category:"",
    })
   
    let loadPosts = usePage().props.loadPosts.data;
    const [posts, setPosts] = useState(loadPosts);

    useEffect(() => { 

        if(searchState.category && searchState.keyword){  
            loadPosts = loadPosts.filter(post => post.category === searchState.category);
            let reg = new RegExp(searchState.keyword,"gi");
            setPosts(loadPosts.filter(post =>  String(post['keywords']).match(reg) ));
            
        }else if(searchState.category){
            setPosts(loadPosts.filter(post => post.category === searchState.category));

        }else if(searchState.keyword){
            let reg = new RegExp(searchState.keyword,"gi");
            setPosts(loadPosts.filter(post =>  String(post['keywords']).match(reg) ));
           
        }else if(!searchState.keyword || !searchState.category){
            setPosts(loadPosts);
        }
        
      }, [searchState.keyword,searchState.category]);
    
    const reset = ()=>{
        $(".search_area_input").val("");
         setSearchState(searchState => ({...searchState, "keyword":""}))
         setSearchState(searchState => ({...searchState, "category":""}))
         setPosts(loadPosts);
         $(".js-search_area_icon").removeClass("fixed");
        
     }
    

     
  const categoryName = [
    "",
    "Engineering",
    "",
    "Notion",
    "Diary"
  ]
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
                <div className='fade'>
                    {searchState.category?categoryName[Number(searchState.category)]+"の中に､":""}
                    {searchState.keyword}のキーワードで
                    ヒットする記事がありません｡
                </div>
                
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
                        <li className={searchState.category === 1?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="1"  
                        onClick={(e)=>{setSearchState(searchState => ({...searchState, "category":e.target.value}))}}>
                            {categoryName[1]}
                        </li>
                        <li className={searchState.category === 3?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="3" 
                        onClick={(e)=>{setSearchState(searchState => ({...searchState, "category":e.target.value}))}}>
                            {categoryName[3]}
                        </li> 
                        <li className={searchState.category === 4?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="4" 
                        onClick={(e)=>{setSearchState(searchState => ({...searchState, "category":e.target.value}))}}>
                            {categoryName[4]}
                        </li>
                    </ul>
                    <div className="search_area js-search_area">
                        <button type="button" className="search_area_reset js-search_area_reset" value="RESET" onClick={reset}>
                            <AiOutlineClear />
                        </button>
                        <BsSearch className="search_area_icon js-search_area_icon"/>
                        <input list="tag-list"  className="search_area_input js-search_area_input" id="tag-choice" 
                            name="tag-choice" placeholder=""  
                            value={searchState.keyword}
                            onChange={(e)=>{                   
                                setSearchState(searchState => ({...searchState, "keyword":e.target.value}))
                            }
                            } 
                        />
                        
                    </div>
                    <div className="section_content posts">
                        <RendarallPage />
              
                    </div>
                </section> 
        </GuestLayout> 
	);
  }
