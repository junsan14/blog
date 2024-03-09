import {ModalShow,formatDate, addClassPage} from "@/script.jsx";
import {usePage,Head } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout';
import parse from 'html-react-parser';

import {MdAccessTime,MdUpdate} from 'react-icons/md';





export default function Page() {
    const homeUrl = usePage().props.ziggy.url;
    const pageData = usePage().props.post[0]? usePage().props.post[0]:usePage().props.post ;
    const pattern = /(src=)["|'](.*?)["|']+/g;
    const pattern2 = /(src=)/g;
    const Renderpagedata = ()=>{
    //記事のスタイル装飾
    addClassPage();
   console.log(parse(pageData.thumbnail).props.children.props.src)
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

      console.log(homeUrl + parse(pageData.thumbnail).props.children.props.src)
	return (
    <GuestLayout>
        <Head>
            <title>{pageData.title}</title>
            <meta name="description" content={pageData.excerpt} />
            <meta head-key="og:description" name="description" content={pageData.excerpt}/>
            <meta inertia property="og:description" content={pageData.excerpt}/>
            <meta inertia property="og:title" content={pageData.title} />
            <meta property="og:image" content={homeUrl + parse(pageData.thumbnail).props.children.props.src} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://junsan.info/" />
        </Head>
			  <div className="section_content page_content">
          <Renderpagedata />
		    </div>
        <ModalShow />
	  </GuestLayout>
	);
}

