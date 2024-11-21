import {Head, router } from '@inertiajs/react'
import React, {useEffect, useState } from "react";
import $ from 'jquery';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import SharedBlogIndex from './Components/SharedBlogIndex';


export default function AdminBlog(){
    const [editInfo, setEditInfo] = useState([]);
    const handleClickVisible = (e,is_show)=>{
        let id = Number(e.currentTarget.id);

        $(".btn-" + id).prop('disabled', true);
        $(e.currentTarget).css('cursor', "not-allowed");

        setEditInfo([id, is_show, "visible"]);
        router.patch(
            route('page.visible', {id:id, is_show:Number(is_show)}),
            {},
            {preserveScroll: true,}     
        )
     }
     const handleClickDelete = (e, uri)=>{
        let id = Number(e.currentTarget.id);
        $(e.currentTarget).parent().prop('disabled', true);
        $(e.currentTarget).css('cursor', "not-allowed");
        setEditInfo([id, "", "delete"]);
        router.delete(
            route("page.destroy", {id:id, url:uri}), 
            {
                onBefore: () => {
                    const res = confirm('本当に削除してよろしいですか?');
                    if(!res){
                        $(e.currentTarget).parent().prop('disabled', false);
                        $(e.currentTarget).css('cursor', "pointer");
                    }
                    return res;
            },
                preserveScroll: true,
            
            },
        )
     }
    return(
        <Authenticated>
            <Head>
                <title>Admin</title>
                <meta name="description" content="WEBエンジニアとしてのポートフォリオ､またWEB制作やWEB開発に関わる知識を発信しています" />
            </Head>
            <section className="section blog edit">
                <h1 className="section_title">
                    <p className="section_title_jp">BLOG ADMIN</p>
                </h1>
                <SharedBlogIndex handleClickDelete={handleClickDelete} handleClickVisible={handleClickVisible} editInfo={editInfo}/>
            </section>
        </Authenticated>
        );
}
