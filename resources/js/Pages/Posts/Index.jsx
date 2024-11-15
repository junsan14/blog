import {Head, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import SharedBlogIndex from './Components/SharedBlogIndex';

export default function GuestBlog(){
    return(
        <GuestLayout>
            <Head>
                <title>BLOG</title>
                <meta name="description" content="WEBエンジニアとしてのポートフォリオ､またWEB制作やWEB開発に関わる知識を発信しています" />
            </Head>
            <div className='background'>
                <div className="images">
                    <img className="flow-image 0" src="/userfiles/images/africa.png" />
                </div>
            </div>
            <section className="section blog">
                <h1 className="section_title">
                    <p className="section_title_jp">BLOG</p>
                </h1>
                <SharedBlogIndex />
            </section>
        </GuestLayout>
        )
}




