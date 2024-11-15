import { MdAccessTime,MdUpdate } from "react-icons/md"
import { AiOutlineEye } from "react-icons/ai"
import { FaTrash, FaEdit } from "react-icons/fa"
import { Link } from "@inertiajs/react"
import parse from 'html-react-parser';
import {formatDate } from "@/Script";

export default function ShowPosts({selectedPosts, category, keyword, uri, handleClickVisible, handleClickDelete}){
    const UpdateDate = ({post})=>{
        if(formatDate(post.published_at) == "1970/01/01"){
          return(
            <>
                <p className="article_link_remarks_date">
                        <MdAccessTime className='article_link_remarks_date_icon' />
                        <span>{formatDate(post.created_at)}</span>
                </p> 
            </>   
          )
        }else if(formatDate(post.published_at) == formatDate(post.updated_at)){
            return(
                <p className="article_link_remarks_date">
                    <MdAccessTime className='article_link_remarks_date_icon' />
                    <span>{formatDate(post.published_at)} </span>
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
                        <span>{formatDate(post.published_at)}</span>
                    </p>  
                </>
            )
        }
    }
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