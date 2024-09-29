import parse from 'html-react-parser';
import { usePage, Link, Head, router, useRemember } from '@inertiajs/react'
import React, {useEffect, useState } from "react";
import $ from 'jquery';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { fixedSearch,formatDate} from "@/Script";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {AiOutlineClear} from 'react-icons/ai';

import { FaTrash,FaEdit } from 'react-icons/fa';
import {MdAccessTime,MdUpdate} from 'react-icons/md';

export default function Blog({auth}) {
    fixedSearch();

    const [searchState, setSearchState] = useRemember({
        keyword:"",
        category:"",
    })

    let loadPosts = usePage().props.loadPosts.data;
    
    const uri = usePage().component;
    const [posts, setPosts] = useState(loadPosts);
    useEffect(() => { 
        setPosts(loadPosts);
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
        
      }, [searchState.keyword,searchState.category,loadPosts]);
    
     const handleClickVisible = (e,is_show)=>{
        let id = e.currentTarget.id;
        $(e.currentTarget).parent().prop('disabled', true);
        $(e.currentTarget).css('cursor', "not-allowed");
        //console.log(router)
        router.patch(
            route('page.visible', {id:id, is_show:Number(is_show)},),
                 {  
                },
                 { preserveScroll: true,},
           
        )
     }
     const handleClickDelete = (e)=>{
        let id = e.currentTarget.id;
        $(e.currentTarget).parent().prop('disabled', true);
        $(e.currentTarget).css('cursor', "not-allowed");
        router.delete(
            route("page.destroy", {id:id, url:uri}), 
            {
                onBefore: () => {
                    const res = confirm('本当に削除してよろしいですか?');
                    if(!res){
                        $(e.currentTarget).parent().prop('disabled', false);
                        $(e.currentTarget).css('cursor', "pointer");
                    }
                    return res;
                },
                preserveScroll: true 
            },
        
        )
       
     }
     const reset = ()=>{
        $(".search_area_input").val("");
        setSearchState(searchState => ({...searchState, "keyword":""}))
        setSearchState(searchState => ({...searchState, "category":""}))
         setPosts(loadPosts);
         $(".js-search_area_icon").removeClass("fixed");
     }
     const categoryName = [
        "",
        "IT",
        "",
        "",
        "LIFE",
        "JOCV"
      ]
     const RendarVisibility= (props)=>{
        const is_show = props.props[0];
        const id = props.props[1];

        if(is_show){
            return(
                <AiOutlineEye className='icon' id={id} alt='表示する' onClick={(e)=>handleClickVisible(e,1)}/>
            )
        }else{
            return(
                <AiOutlineEyeInvisible className='icon' id={id} alt='非表示にする' onClick={(e)=>handleClickVisible(e,0)}/>
            )
        }
        
     }
     const RendarallPage = ()=>{
        if(posts.length>0){
            return(
                <>
                {posts.map(({id, title, content,excerpt,thumbnail,created_at,updated_at,published_at,is_show} )=> {
                    const UpdateDate = ()=>{
                        if(formatDate(updated_at) !== formatDate(published_at)){
                          return(
                            <>
                                <p className="article_link_remarks_date">
                                    <MdUpdate />
                                    {formatDate(updated_at)}
                                </p>
                            </>   
                          )
                        }
                      }
                    return(
                        <div className={is_show?'article edit': 'article edit unshown'} id={id} key={id}>
                            <div className='id'>
                                {id}
                            </div>
                            <div className="remarks">
                                <h3 className="remarks_title">{title}</h3>
                                <div className="remarks_text">
                                    {excerpt}
                                </div>
                            </div>

                            <div className='right'>
                                <div className='icon'>
                                    <Link href="/blog/admin/edit" data={{ id: id }}>
                                        <FaEdit className='icon'/>
                                    </Link>
                                    <button>
                                        <RendarVisibility props={[is_show,id]}/>
                                    </button>
                                    <button>
                                        <FaTrash className='icon' id={id} onClick={(e)=>handleClickDelete(e)}/>
                                    </button>
                                </div>
                                <div className="date">
                                        <UpdateDate />
                                        <p className="article_link_remarks_date">
                                            <MdAccessTime /> {formatDate(published_at)} 
                                        </p>
                                </div> 
                            </div>
                        </div>
                    )
                })}
                </>
            )
        }else{
            return(
                <>
                    {searchState.category?categoryName[Number(searchState.category)]+"の中に､":""}
                    {searchState.keyword}のキーワードで
                    ヒットする記事がありません｡
                </>
                
            )
        }
              
        
     }
     
	return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin TOP" />
                <section className="section blog editIndex">
                    <h1 className="section_title">
                    <div className="section_title_jp">Admin</div>
                    </h1>
                    <ul className="category_tab tab">  
                        <li className={searchState.category === 1?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="1"  
                        onClick={(e)=>{setSearchState(searchState => ({...searchState, "category":e.target.value}))}}>
                            {categoryName[1]}
                        </li>
                        <li className={searchState.category === 4?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="4" 
                        onClick={(e)=>{setSearchState(searchState => ({...searchState, "category":e.target.value}))}}>
                            {categoryName[4]}
                        </li>
                        <li className={searchState.category === 5?"category_tab_li on":"category_tab_li"} 
                        tabIndex="-1" value="5" 
                        onClick={(e)=>{setSearchState(searchState => ({...searchState, "category":e.target.value}))}}>
                            {categoryName[5]}
                        </li>
                    
                        
                    </ul>
                    <div className="search_area js-search_area edit">
                        <button type="button" className="search_area_reset js-search_area_reset edit" value="RESET" onClick={reset}>
                            <AiOutlineClear />
                        </button>
                        <BsSearch className="search_area_icon js-search_area_icon"/>
                        <input list="tag-list"  className="search_area_input js-search_area_input edit" id="tag-choice" 
                            name="tag-choice" placeholder=""  
                            value={searchState.keyword}
                            onChange={(e)=>{
                                setSearchState(searchState => ({...searchState, "keyword":e.target.value}))
                            }
                            } 
                        />
                        <datalist id="tag-list">
                                      
                        </datalist>
                    </div>
                    <div className="section_content posts edit">
                        <RendarallPage />
                    </div>
                </section> 
        </AuthenticatedLayout> 
	);
  }
