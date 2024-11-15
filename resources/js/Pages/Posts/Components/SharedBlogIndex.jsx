import { usePage } from '@inertiajs/react'
import { useState } from 'react';
import {fixedSearch,bg } from "@/Script";
import SearchPostsbyKeyword from "./SearchPostsByKeyword";
import SearchPostsByCategory  from './SearchPostsByCategory';
import ShowPosts from './ShowPosts';

export default function SharedBlogIndex({handleClickVisible, handleClickDelete}) {
    fixedSearch();
    const loadPosts = usePage().props.loadPosts.data;
    const uri = usePage().component;
    const [posts, setPosts] = useState(loadPosts);
    const [selectedPosts, setSelectedPosts] = useState(loadPosts);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    return(
            <>
                <SearchPostsByCategory  category={category} keyword={keyword} 
                                  setCategory={setCategory} posts={posts} selectedPosts={selectedPosts} setSelectedPosts={setSelectedPosts}/>
                <SearchPostsbyKeyword keyword={keyword} setKeyword={setKeyword} category={category} setCategory={setCategory}
                            posts={posts} selectedPosts={selectedPosts} setSelectedPosts={setSelectedPosts} />
                <div className="section_content posts edit">
                   <ShowPosts 
                        selectedPosts={selectedPosts} category={category} keyword={keyword} uri={uri}
                        handleClickVisible={handleClickVisible} handleClickDelete={handleClickDelete}
                    />         
                </div>
            </>
        )
}