import {ModalShow,formatDate, addClassPage,smoothScroll} from "@/Script.jsx";
import {usePage,Head, Link } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout';
import parse from 'html-react-parser';

import {MdAccessTime,MdUpdate} from 'react-icons/md';





export default function Page() { 
    const homeUrl = usePage().props.ziggy.url;
    const pageData = usePage().props.post[0]? usePage().props.post[0]:usePage().props.post ;
    const prevPost = usePage().props.prevPost? usePage().props.prevPost:usePage().props.post ;

    const nextPost = usePage().props.nextPost? usePage().props.nextPost:usePage().props.post ;
    const pattern = /(src=)["|'](.*?)["|']+/g;
    const pattern2 = /(src=)/g;
    const ogExerpt = pageData.excerpt?pageData.excerpt:"";
    const ogpURL = parse(pageData.thumbnail).props.children?homeUrl + parse(pageData.thumbnail).props.children.props.src:parse(pageData.thumbnail).props.src;
    const Renderpagedata = ()=>{
      addClassPage();
      smoothScroll();

      return(
          <>
            <div className="page" >
              <section className="section">
                <div className="section_content page_content">
                  <h1 className="section_content_title">{pageData.title}</h1>
                  <div className="" id={pageData.id} key={pageData.id}>
                    <div className="article_date">
                      
                      <MdUpdate className="article_date_publish_icon"/>
                      {pageData.updated_at?formatDate(pageData.updated_at):formatDate(new Date())}

                      <MdAccessTime className="article_date_publish_icon" />
                      {pageData.created_at?formatDate(pageData.published_at):formatDate(new Date())}
                    </div>
                    <div className="article_content ck ck-content">
                        {parse(pageData.content)}
                    </div>
                  </div>
                </div>
              </section>
              <RevelantPage />
            </div>
          </>
      )    
    }

    const RevelantPage = ()=>{

      return(
        <>
          <h3 className="revelant-title">関連記事</h3>
          <div className="revelant posts">
            <div className="article fade" id={prevPost.id} key={prevPost.id}>
                <Link href="/blog/page" data={{ id: prevPost.id }} className='article_link'>
                    <div className="article_link_img">
                        {parse(prevPost.thumbnail)}
                    </div>
                    <div className="article_link_remarks">
                        <h3 className="article_link_remarks_title">{prevPost.title}</h3>
                        <div className="article_link_remarks_text">
                            {prevPost.excerpt}
                        </div>
                        <p className="article_link_remarks_date">
                            <MdAccessTime className='article_link_remarks_date_icon' />
                            {formatDate(prevPost.published_at)}<br/>
                        </p>
                    </div>
                </Link>
            </div>
            <div className="article fade" id={nextPost.id} key={nextPost.id}>
                <Link href="/blog/page" data={{ id: nextPost.id }} className='article_link'>
                    <div className="article_link_img">
                        {parse(nextPost.thumbnail)}
                    </div>
                    <div className="article_link_remarks">
                        <h3 className="article_link_remarks_title">{nextPost.title}</h3>
                        <div className="article_link_remarks_text">
                            {nextPost.excerpt}
                        </div>
                        <p className="article_link_remarks_date">
                            <MdAccessTime className='article_link_remarks_date_icon' />
                            {formatDate(nextPost.published_at)}<br/>
                        </p>
                    </div>
                </Link>
            </div>
          </div>

        </>
      )
    }

      //console.log(homeUrl + parse(pageData.thumbnail).props.children.props.src)
	return (
    <GuestLayout>
			  <div className="section_content page_content">
          <Renderpagedata />
          
		    </div>
        <ModalShow />
	  </GuestLayout>
	);
}

