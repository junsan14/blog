import { Link, usePage } from '@inertiajs/react';
import {useState } from "react";
import {SpMenuShow} from "@/script";
import {FaXTwitter,FaInstagram} from 'react-icons/fa6';

function Layout({user,children,status}){
  SpMenuShow();
  let is_login = usePage().props.auth.user?true:false
 // console.log(usePage().props.auth.user)
  return(
    <>
    <header className="header guest">
      <div className="toggle-sp js-toggle-sp">
          <span></span>
          <span></span>
          <span></span>
      </div> 
      <nav className="nav js-nav">
        <ul className="nav_ul">
           <li className="nav_ul_li js-nav-ul-li"><Link href="/">HOME</Link></li>
           <li className="nav_ul_li js-nav-ul-li"><Link href="/about">ABOUT</Link></li>
           <li className="nav_ul_li js-nav-ul-li"><Link href="/blog">BLOG</Link></li>     
           <li className="nav_ul_li js-nav-ul-li"><Link href="/contact">CONTACT</Link></li>
           {is_login&&  <li className="nav_ul_li js-nav-ul-li"><Link href="/blog/admin/editIndex">管理画面</Link></li>}
        </ul>
        <div className="nav_sns">
          <a href="https://twitter.com/junsan_junsan14" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className='nav_sns_icon'/>
          </a>
          <a href="https://www.instagram.com/junsan_junsan14/" rel="noopener noreferrer" target='_blank'>
            <FaInstagram className='nav_sns_icon'/>
          </a>
        </div>
      </nav>
    </header>
    <main className="main guest-wrapper">
      {children}
    </main>
    <footer className="footer">
        &copy; JUNSAN14 2023
    </footer>
    </>
    )

}



export default Layout;

