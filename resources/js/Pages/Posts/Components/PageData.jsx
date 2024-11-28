import {ModalShow,formatDate, addClassPage,smoothScroll} from "@/Script.jsx";
import parse from 'html-react-parser';

export default function PageData({pageData}){
	  addClassPage();
      smoothScroll();  
    const Date = ({post})=>{
    	if(formatDate(post.published_at) == "1970/01/01"){
            return(
            	<div className="article_link_remarks_dates_area">
	                <div className="article_link_remarks_dates_area_date">
                       投稿日_
                        <span className='article_link_remarks_dates_area_date_value'>{formatDate(post.created_at)}</span>
                    </div>  
	            </div>
            )
        }else if(formatDate(post.published_at) == formatDate(post.updated_at)){
            return(
                <div className="article_link_remarks_dates_area">
                    <div className="article_link_remarks_dates_area_date">
                       投稿日_
                        <span className='article_link_remarks_dates_area_date_value'>{formatDate(post.published_at)}</span>
                    </div> 
                </div>
            )
        }else{
            return(
                <div className="article_link_remarks_dates_area">
                    <div className="article_link_remarks_dates_area_date">
                       更新日_
                        <span className='article_link_remarks_dates_area_date_value'>{formatDate(post.updated_at)}</span>
                    </div> 
                    <br/>
                    <div className="article_link_remarks_dates_area_date">
                       投稿日_
                        <span className='article_link_remarks_dates_area_date_value'>{formatDate(post.published_at)}</span>
                    </div> 
                </div>
            ) 
        }
    }
	return(
		<>        
			<ModalShow />
			<h1 className="section_content_title">{pageData.title}</h1>
              <div className="" id={pageData.id} key={pageData.id}>
                <div className="article_date">
                	<Date post={pageData}/>

                </div>
                <div className="article_content ck ck-content">
                    {parse(pageData.content)}
                </div>
              </div>
		</>
		)
}