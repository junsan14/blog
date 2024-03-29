import {ModalShow,formatDate, addClassPage} from "@/Script.jsx";
import {usePage,Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout';
import parse from 'html-react-parser';

import {MdAccessTime,MdUpdate} from 'react-icons/md';





export default function Page() {
    const homeUrl = usePage().props.ziggy.url;
    const pageData = usePage().props.post[0]? usePage().props.post[0]:usePage().props.post ;
    const pattern = /(src=)["|'](.*?)["|']+/g;
    const pattern2 = /(src=)/g;
    const ogExerpt = pageData.excerpt?pageData.excerpt:"";
    //console.log(parse(pageData.thumbnail).props.src)
    const ogpURL = parse(pageData.thumbnail).props.children?homeUrl + parse(pageData.thumbnail).props.children.props.src:parse(pageData.thumbnail).props.src;
    const Renderpagedata = ()=>{
    //記事のスタイル装飾
    addClassPage();
   //console.log(parse(pageData.thumbnail).props.children.props.src)
    return(
        <>
          <div className="page">
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

