import {formatDate } from "@/Script";
import { MdAccessTime,MdUpdate } from "react-icons/md"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
export default function PostDate({post}){

        if(formatDate(post.published_at) == "1970/01/01"){
          return(
            <div className="article_link_remarks_dates_area">
                <div className="article_link_remarks_dates_area_date">
                        <MdAccessTime className='article_link_remarks_dates_area_date_icon' />
                        <span className='article_link_remarks_dates_area_date_value'>公開前</span>
                </div> 
            </div>   
          )
        }else if(formatDate(post.published_at) == formatDate(post.updated_at)){
            return(
            	<div className="article_link_remarks_dates_area">
	                <div className="article_link_remarks_dates_area_date">
                        <MdAccessTime className='article_link_remarks_dates_area_date_icon' />
                        <span className='article_link_remarks_dates_area_date_value'>{formatDistanceToNow(post.published_at,{locale: ja})}前</span>
                    </div>  
	            </div>
            )
        }else{
            return(
                <div className="article_link_remarks_dates_area">
                    <div className="article_link_remarks_dates_area_date">
                        <MdUpdate className="article_link_remarks_dates_area_date_icon"/>
                        <span className='article_link_remarks_dates_area_date_value'>{formatDistanceToNow(post.updated_at,{locale: ja})}前</span>
                    </div>
                  
               
                </div>
            )
        }
    }