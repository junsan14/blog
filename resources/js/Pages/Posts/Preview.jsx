import {ModalShow,formatDate, addClassPage} from "@/script.jsx";
import {usePage } from '@inertiajs/react'
import {useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import parse from 'html-react-parser';

function PreviewPage() {
    const pageData = usePage().props[0];
    console.log(pageData);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const Renderpagedata = ()=>{
    //記事のスタイル装飾

      ModalShow();
      addClassPage();


    return(
        <>
        {/*
          <button className="modal_blog_close js-modal-blog-close" onClick={()=>{
              setIsModalOpen(false);
              setPageData([]);
              $(".js-modal-blog").removeClass("show");
            }}>
          </button>
          */}
          <div className="page">
            <section className="section">
              <div className="section_content page_content">
                <h1 className="section_content_title">{pageData.title}</h1>
                <div className="" id={pageData.id} key={pageData.id}>
                  <div className="article_date">
                      <p className="article_date_publish">
                        公開日: {pageData.created_at ? formatDate(pageData.created_at):formatDate(new Date()) }
                      </p>
                      <p className="article_date_publish">
                        更新日: {formatDate(new Date())}
                      </p>
                  </div>
                  <div className="article_content">
                      {parse(pageData.content)}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
    )    
      }
	return (
    <GuestLayout>
			  <div className="section_content page_content">
          <Renderpagedata />
		    </div>
	  </GuestLayout>
	);
}

export default PreviewPage;