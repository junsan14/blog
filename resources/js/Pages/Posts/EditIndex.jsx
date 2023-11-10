import parse from 'html-react-parser';
import { usePage, Link,useForm,router  } from '@inertiajs/react'
import React, {useEffect, useState,useRef } from "react";
import $ from 'jquery';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { ModalShow,fixedSearch,formatDate} from "@/script";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { FaTrash,FaEdit } from 'react-icons/fa';
import {MdAccessTime,MdUpdate} from 'react-icons/md';

export default function Blog({auth}) {
    fixedSearch();
    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [tagid,setTagid] = useState('');
    const loadPosts = usePage().props.posts.data;
    const [posts, setPosts] = useState(loadPosts);
    //console.log(loadPosts);
    useEffect(() => { 
        setPosts(loadPosts);
        if(keyword){   
            setPosts(loadPosts.filter(post => post.keywords.indexOf(keyword) !==-1 ));
        }else if(category){
            setPosts(loadPosts.filter(post => post.category === category));
           
        }

      }, [keyword,category,tagid,loadPosts]);
    
     const handleClickVisible = (e,id,is_show)=>{
        const is_show_bool = is_show?1:0;
        if(is_show){
            router.patch(`/blog/admin/editIndex?id=${id}&is_show=${is_show_bool}`, {
                onBefore: () => confirm('非表示にします')
            },{ preserveScroll: true })
        }else{
            router.patch(`/blog/admin/editIndex?id=${id}&is_show=${is_show_bool}`, {
                onBefore: () => confirm('表示します')
            },{ preserveScroll: true })
        }
     }
     const handleClickDelete = (e)=>{
        
        let id = e.currentTarget.id;
        router.delete(`/blog/admin/editIndex?id=${id}`, {
            onBefore: () => confirm('本当に削除してよろしいですか?'),
            preserveScroll: true 
        })
       
     }
     const reset = ()=>{
        $(".search_area_input").val("");
         setTagid("");
         setKeyword("");
         setPosts(loadPosts);
         $(".js-search_area_icon").removeClass("fixed");
     }
    
     const LoadTag = ()=>{
       return(  
                 <option value="1" >タグ1</option>    
           
         )
     }
     const ChangeVisibility= (props)=>{
        const is_show = props.props[0];
        const id = props.props[1] 
        if(is_show){
            return(
                <AiOutlineEyeInvisible className='icon' id={id} alt='非表示にする' onClick={(e)=>handleClickVisible(e,id,is_show)}/>
            )
        }else{
            return(
                <AiOutlineEye className='icon' id={id} alt='表示する'　onClick={(e)=>handleClickVisible(e,id,is_show)}/>
            )
        }
        
     }
     const RendarallPage = ()=>{
        if(posts.length>0){
            return(
                <>
                {posts.map(({id, title, content,excerpt,thumbnail,created_at,updated_at,is_show} )=> {
                    return(
                        <div className={is_show?'article edit': 'article edit unshown'} id={id} key={id}>
                            <div className='article_id'>
                                {id}
                            </div>
                            
                            <div className='article_link'>
                                <div className="article_link_img">
                                    <img className="thumbnail" src={thumbnail} alt="" />
                                </div>
                                <div className="article_link_remarks">
                                    <h3 className="article_link_remarks_title">{title}</h3>
                                    <div className="article_link_remarks_text">
                                        {excerpt}
                                    </div>
                                    <p className="article_link_remarks_date">
                                        <MdUpdate />{formatDate(updated_at)} 
                                        <MdAccessTime /> {formatDate(created_at)} 
                                    </p>

                                </div>
                            </div>
                            <div className='article_icon'>
                                <Link href="/blog/admin/edit" data={{ id: id }}>
                                    <FaEdit className='icon'/>
                                </Link>
                                <button>
                                    <ChangeVisibility props={[is_show,id]}/>
                                </button>
                                <button>
                                    <FaTrash className='icon' id={id} onClick={(e)=>handleClickDelete(e)}/>
                                </button>
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
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
                <section className="section blog editIndex">
                    <h1 className="section_title">
                    <div className="section_title_jp">編集画面</div>
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
                        <button type="button" className="search_area_reset js-search_area_reset" value="RESET" onClick={reset}>リセット</button>
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
                    <div className="section_content posts edit">
                        <RendarallPage />
                    </div>
                </section> 
        </AuthenticatedLayout> 
	);
  }
