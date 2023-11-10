import {ModalShow,formatDate, addClassPage} from "@/script.jsx";
import {usePage } from '@inertiajs/react'
import {useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import parse from 'html-react-parser';
import $ from 'jquery';
import {MdAccessTime,MdUpdate} from 'react-icons/md';

export default function Page() {

    const pageData = usePage().props.post[0]? usePage().props.post[0]:usePage().props.post ;
    console.log(pageData.length)
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [inProp, setInProp] = useState(false);

    const Renderpagedata = ()=>{
    //記事のスタイル装飾

      addClassPage();
    
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
                    {pageData.created_at?formatDate(pageData.created_at):formatDate(new Date())}
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
        <ModalShow />
	  </GuestLayout>
	);
}

