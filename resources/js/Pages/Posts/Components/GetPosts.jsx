
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { FaTrash, FaEdit } from "react-icons/fa"
import { Link } from "@inertiajs/react"
import parse from 'html-react-parser';
import PostDate from "./PostDate";
import { categoryList } from "./CategoryList";
export default function GetPosts({selectedPosts, category, keyword, uri, handleClickVisible, handleClickDelete}){

    if(uri == "Posts/EditIndex"){
        return(
            selectedPosts.map((post,i)=>(
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
                            <button className={"btn-"+post.id} >
                                {post.is_show
                                    ?<AiOutlineEyeInvisible className='icon' id={post.id} alt='表示する' onClick={(e)=>handleClickVisible(e,1)}/>
                                    :<AiOutlineEye className='icon' id={post.id} alt='表示する' onClick={(e)=>handleClickVisible(e,0)}/>
                                 }
                            </button>
                            <button className={"btn-"+post.id}>
                                <FaTrash className='icon' id={post.id} 
                                  onClick={(e)=>handleClickDelete(e,uri)}/>
                            </button>
                        </div>
                        <div className="date">
                                <PostDate post={post}/>
                        </div> 
                    </div>
                </div>
            ))
        )
        
    }else{
        if(selectedPosts.length >0){
            return(
                <>
                    {selectedPosts.map((post,i)=> {
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
                                        <PostDate post={post}/>  
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </>
            )
        }else{
            if(category || keyword){
                return(
                    <div className='fade'>
                        {category?categoryList[Number(category)]+"の中に､":""}
                        {keyword}のキーワードで該当する記事がありません
                    </div> 
                )
            }else{
                return(
                    <div className='fade'>
                        該当記事がありません
                    </div> 
                )
            }
            
    }
    }
    
}