import { usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react';
import {fixedSearch} from "@/Script";
import SearchPostsbyKeyword from "./SearchPostsByKeyword";
import SearchPostsByCategory  from './SearchPostsByCategory';
import GetPosts from './GetPosts';
import $ from 'jquery';

export default function SharedBlogIndex({handleClickVisible, handleClickDelete, editInfo}) {
    fixedSearch();
    const loadPosts = usePage().props.loadPosts.data;
    const uri = usePage().component;
    const [posts, setPosts] = useState(loadPosts);
    const [selectedPosts, setSelectedPosts] = useState(loadPosts);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    useEffect(()=>{
        if(editInfo[2] === "visible"){
            setSelectedPosts(
                    selectedPosts.map((post)=>{
                        if(post.id == editInfo[0] && editInfo[2] == "visible" ){
                            return {...post,is_show:!Boolean(editInfo[1])};
                        }else{
                            return {...post};
                        }
                    })
                )
            }else{
                setSelectedPosts(selectedPosts.filter((post)=> post.id !== editInfo[0]));
            }
        $(".btn-" + editInfo[0]).prop('disabled', false);
        $(".btn-" + editInfo[0]).children().css('cursor', "allowed");
    },[loadPosts])


    return(
            <>
                <SearchPostsByCategory  category={category} keyword={keyword} 
                                  setCategory={setCategory} posts={posts} selectedPosts={selectedPosts} setSelectedPosts={setSelectedPosts}/>
                <SearchPostsbyKeyword keyword={keyword} setKeyword={setKeyword} category={category} setCategory={setCategory}
                            posts={posts} selectedPosts={selectedPosts} setSelectedPosts={setSelectedPosts} />
                <div className="section_content posts edit">
                   <GetPosts 
                        selectedPosts={selectedPosts} category={category} keyword={keyword} uri={uri}
                        handleClickVisible={handleClickVisible} handleClickDelete={handleClickDelete}
                    />         
                </div>
            </>
        )
}