import { usePage, Link, Head,router} from '@inertiajs/react'
import React, {useState } from "react";
import $ from 'jquery';
import {fixedSearch,formatDate,bg } from "@/Script";
import GuestLayout from '@/Layouts/GuestLayout';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {BsSearch} from 'react-icons/bs';
import {MdAccessTime, MdUpdate} from 'react-icons/md';
import {AiOutlineClear} from 'react-icons/ai';
import parse from 'html-react-parser';

import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { FaTrash,FaEdit } from 'react-icons/fa';




export default function GuestBlog(){
    return(
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
                    <p className="section_title_jp">BLOG</p>
                </h1>
                <CommonBlog />
            </section>
        </GuestLayout>
        )
}

function CommonBlog({handleClickVisible, handleClickDelete}) {
    fixedSearch();
    const loadPosts = usePage().props.loadPosts.data;
    const [posts, setPosts] = useState(loadPosts);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const uri = usePage().component;
    
    const handleChangeKeyword = (e)=>{
        const inputKeyword = e.currentTarget.value;
        setKeyword(inputKeyword);
        let reg = new RegExp(inputKeyword,"gi");
        if(category){
            const matchPosts = loadPosts.filter(post => post.category === category&& String(post['keywords']).match(reg));
            setPosts(matchPosts)
        }else{
            setPosts(loadPosts.filter(post =>  String(post['keywords']).match(reg) ));
        }
    }

    const hanldeClickCategory = (e)=>{
        const inputCategory = e.currentTarget.value;
        setCategory(inputCategory);
        if(keyword){
            const matchPosts = loadPosts.filter(post => post.category === category&& String(post['keywords']).match(reg));
            setPosts(matchPosts)
        }else{
            setPosts(loadPosts.filter(post => post.category === inputCategory));
        }

    }
    const handleClickReset = ()=>{
        $(".search_area_input").val("");
         setKeyword("");
         setCategory("");
         setPosts(loadPosts);
         $(".js-search_area_icon").removeClass("fixed");
     }
    return(
            <>
                <ShowCategoryTab  hanldeClickCategory={hanldeClickCategory} setCategoryName={setCategoryName} category={category}/>
                <div className="search_area js-search_area">
                    <button type="button" className="search_area_reset js-search_area_reset" value="RESET" 
                            onClick={handleClickReset}>
                        <AiOutlineClear />
                    </button>
                    <BsSearch className="search_area_icon js-search_area_icon"/>
                    
                    <input list="tag-list"  className="search_area_input js-search_area_input" id="tag-choice" 
                        name="tag-choice" placeholder=""  
                        value={keyword}
                        onChange={handleChangeKeyword} 
                    />
                </div>
                <div className="section_content posts edit">
                   <ShowPosts 
                        posts={posts} category={category} keyword={keyword} uri={uri}
                        handleClickVisible={handleClickVisible} handleClickDelete={handleClickDelete}
                    />         
                </div>
            </>
        )
}

function ShowPosts({posts, category, keyword, uri, handleClickVisible, handleClickDelete}){
    const UpdateDate = ({post})=>{
        if(formatDate(post.published_at) == "1970/01/01"){
          return(
            <>
                <p className="article_link_remarks_date">
                        <MdAccessTime className='article_link_remarks_date_icon' />
                        {formatDate(post.created_at)}<br/>
                </p> 
            </>   
          )
        }else if(formatDate(post.published_at) == formatDate(post.updated_at)){
            return(
                <p className="article_link_remarks_date">
                    <MdAccessTime className='article_link_remarks_date_icon' />
                    {formatDate(post.published_at)}<br/>
                </p> 
            )
        }else{
            return(
                <>
                    <p className="article_link_remarks_date">
                        <MdUpdate className="article_link_remarks_date_icon"/>
                        {formatDate(post.updated_at)}
                    </p>
                    <p className="article_link_remarks_date">
                        <MdAccessTime className='article_link_remarks_date_icon' />
                        {formatDate(post.published_at)}<br/>
                    </p>  
                </>
            )
        }
    }
    if(uri == "Posts/EditIndex"){
        return(
            posts.map((post,i)=>(
                <div className={post.is_show?'article edit': 'article edit unshown'} id={post.id} key={post.id}>
                    <div className='id'>
                        {post.id}
                    </div>
                    <div className="remarks">
                        <h3 className="remarks_title">{post.title}</h3>
                        <div className="remarks_text">
                            {post.excerpt}
                        </div>
                    </div>
                    <div className='right'>
                        <div className='icon'>
                            <Link href="/blog/admin/edit" data={{ id: post.id }}>
                                <FaEdit className='icon'/>
                            </Link>
                            <button>
                                {post.is_show
                                    ?<AiOutlineEye className='icon' id={post.id} alt='表示する' onClick={(e)=>handleClickVisible(e,1)}/>
                                    :<AiOutlineEye className='icon' id={post.id} alt='表示する' onClick={(e)=>handleClickVisible(e,0)}/>
                                 }
                            </button>
                            <button>
                                <FaTrash className='icon' id={post.id} 
                                  onClick={(e)=>handleClickDelete(e,uri)}/>
                            </button>
                        </div>
                        <div className="date">
                                <UpdateDate post={post}/>
                        </div> 
                    </div>
                </div>
            ))
        )
        
    }else{
        if(posts.length >0){
            return(
                <>
                    {posts.map((post,i)=> {
                        return(
                            <div className="article fade" id={post.id} key={post.id}>
                                <Link href="/blog/page" data={{ id: post.id }} className='article_link'>
                                    <div className="article_link_img">
                                        {parse(post.thumbnail)}
                                    </div>
                                    <div className="article_link_remarks">
                                        <h3 className="article_link_remarks_title">{post.title}</h3>
                                        <div className="article_link_remarks_text">
                                            {post.excerpt}
                                        </div>
                                        <UpdateDate post={post}/>  
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
                    {category?setCategoryName[Number(category)]+"の中に､":""}
                    {keyword}のキーワードでヒットする記事がありません｡
                </div> 
            )
    }
    }
    
}

function ShowCategoryTab ({setCategoryName, hanldeClickCategory, category}){
    return(
        <ul className="category_tab tab">  
            <li className={category === 1?"category_tab_li on":"category_tab_li"} 
            tabIndex="-1" value="1"  onClick={hanldeClickCategory} >
                {setCategoryName[1]}
            </li>
            <li className={category === 4?"category_tab_li on":"category_tab_li"} 
            tabIndex="-1" value="4" onClick={hanldeClickCategory} >
                {setCategoryName[4]}
            </li>
            <li className={category === 5?"category_tab_li on":"category_tab_li"} 
            tabIndex="-1" value="5" onClick={hanldeClickCategory} >
                {setCategoryName[5]}
            </li>
        </ul>)
}

const setCategoryName = [
            "",
            "IT",
            "",
            "",
            "LIFE",
            "JOCV"
]
  

export {CommonBlog};
