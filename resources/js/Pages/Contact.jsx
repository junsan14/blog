import React, { useState,useRef } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import {useForm, router, usePage, Head} from '@inertiajs/react';


export default function Contact() {
  const pageData = usePage().props;
  const { data, setData, post, progress } = useForm({
    user_name: "",
    user_email: "",   
    subject:"",
    content:"",
}) 
    function handleChange(e){
        const key = e.target.id;
        const value = e.target.value;
        setData(values => ({
            ...values,
            [key]: value,
        }))

    }
    function submit(e){
      e.preventDefault();
      router.post('/contact', data)
    }
    
  return (
   <GuestLayout> 
          <Head>
            <title>CONTACT</title>
            <meta name="description" content="WEBエンジニアとしてのポートフォリオ､またWEB制作やWEB開発に関わる知識を発信しています" />
          </Head>
          <div className="modal_contact js-send-success">
            <p className='modal_contact_msg js-send-success-msg'></p>
          </div>
          <section className="section contact">
            <h1 className="section_title">
              <div className="section_title_jp">CONTACT</div>
            </h1>         
            <div className="section_content contact_content">
            <form onSubmit={submit} method="post" className="form_control" >
                <div className="form_control_item">
                    <label htmlFor="email">名前</label>
                    <input  id="user_name" className="form_control_item_input" name="user_name" required
                            value={data.user_name} onChange={handleChange}
                    />
                </div>
                <div className="form_control_item">
                    <label htmlFor="email">アドレス</label>
                    <input  type="email" id="user_email" 
                    className="form_control_item_input" 
                    name="user_email"
                            required
                            value={data.user_email}
                            onChange={handleChange}
                    />
                </div>

                <div className="form_control_item">
                    <label htmlFor="subject">件名</label>
                    <input type="text" id="subject" className="form_control_item_input" name="subject"
                        required
                        value={data.subject}
                        onChange={handleChange}
                    />
                </div>
               
                <div className="form_control_item">
                    <label htmlFor="content">内容</label>
                    <textarea id="content" className="form_control_item_input" rows="10" name="content"
                            required
                            onChange={handleChange}
                            value={data.content}
                    ></textarea>
                </div>
                      
                <input type="submit" value="送信" className="form_control_item_submit" />
            </form>
            </div>
          </section>
  </GuestLayout>
   
  );
}


