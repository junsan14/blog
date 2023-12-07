import parse from 'html-react-parser';
import { usePage, Link, Head, router, useRemember } from '@inertiajs/react'
import React, {useEffect, useState } from "react";
import $ from 'jquery';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { fixedSearch,formatDate} from "@/script";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {AiOutlineClear} from 'react-icons/ai';

import { FaTrash,FaEdit } from 'react-icons/fa';
import {MdAccessTime,MdUpdate} from 'react-icons/md';

export default function Blog({auth}) {
    fixedSearch();
    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useRemember('');
    const [category, setCategory] = useRemember('');
    const [tagid,setTagid] = useState('');
    let loadPosts = usePage().props.loadPosts.data;
    
    const uri = usePage().component;
    const [posts, setPosts] = useState(loadPosts);


    useEffect(() => { 
        setPosts(loadPosts);
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

      }, [keyword,category,tagid]);
    
     const handleClickVisible = (e,is_show)=>{
        let id = e.currentTarget.id;
        $(e.currentTarget).parent().prop('disabled', true);
        $(e.currentTarget).css('cursor', "not-allowed");
        //console.log(router)
        router.patch(
            route('page.visible', 
            {id:id, is_show:Number(is_show)},),
            {onStart: (progress) => {console.log(progress)},},
            { preserveScroll: true }
        )
     }
     const handleClickDelete = (e)=>{
        let id = e.currentTarget.id;
        $(e.currentTarget).parent().prop('disabled', true);
        $(e.currentTarget).css('cursor', "not-allowed");
        router.delete(
            route("page.destroy", 
            {id:id, url:uri}), 
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
         setTagid("");
         setKeyword("");
         setPosts(loadPosts);
         $(".js-search_area_icon").removeClass("fixed");
     }
    
     const RendarVisibility= (props)=>{
        const is_show = props.props[0];
        const id = props.props[1] 
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
                                    <div>
                                        <MdUpdate />{formatDate(updated_at)}
                                    </div>
                                    <div>
                                        <MdAccessTime /> {formatDate(published_at)} 
                                    </div>
                                </div> 
                            </div>
                        </div>
                    )
                })}
                </>
            )
        }else{
            return(
                <>{keyword}のキーワードでは､記事がありません</>
                
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
                    <div className="search_area js-search_area edit">
                        <button type="button" className="search_area_reset js-search_area_reset edit" value="RESET" onClick={reset}>
                            <AiOutlineClear />
                        </button>
                        <BsSearch className="search_area_icon js-search_area_icon"/>
                        <input list="tag-list"  className="search_area_input js-search_area_input edit" id="tag-choice" 
                            name="tag-choice" placeholder=""  
                            onChange={(e)=>{
                                setKeyword(e.target.value);
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
