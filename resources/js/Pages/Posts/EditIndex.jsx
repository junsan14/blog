import parse from 'html-react-parser';
import { usePage, Link, Head, router, useRemember } from '@inertiajs/react'
import React, {useEffect, useState } from "react";
import $ from 'jquery';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {CommonBlog } from './Index';


export default function AdminBlog(){
    const handleClickVisible = (e,is_show)=>{
        let id = e.currentTarget.id;
        $(e.currentTarget).parent().prop('disabled', true);
        $(e.currentTarget).css('cursor', "not-allowed");
        router.patch(
            route('page.visible', {id:id, is_show:Number(is_show)},

            )
        )




     }
     const handleClickDelete = (e, uri)=>{
        let id = e.currentTarget.id;
        $(e.currentTarget).parent().prop('disabled', true);
        $(e.currentTarget).css('cursor', "not-allowed");
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
                preserveScroll: true 
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
                <CommonBlog handleClickDelete={handleClickDelete} handleClickVisible={handleClickVisible}/>
            </section>
        </Authenticated>
        );
}
