import { Link, usePage } from '@inertiajs/react';
import {SpMenuShow, showMsg} from "@/script";
import {FaXTwitter,FaInstagram} from 'react-icons/fa6';

function Layout({user,children,status}){
  SpMenuShow();
  let is_login = usePage().props.auth.user?true:false
  const is_sccuess= usePage().props.is_success;
  showMsg(is_sccuess);
  const ShowMsg = ()=>{
    if(is_sccuess){
      return (
        <div className="modal_contact js-send-success">
            <p className='modal_contact_msg js-send-success-msg js-msg'>
              メッセージの送信に成功しました｡メールをご確認ください｡
            </p>
        </div>
      )
    }
  }
 // console.log(usePage().props.auth.user)
  return(
    <>
    <ShowMsg />
    <header className="header guest">
      <div className="toggle-sp js-toggle-sp">
          <span></span>
          <span></span>
          <span></span>
      </div> 
      <nav className="nav js-nav">
        <ul className="nav_ul">
           <li className="nav_ul_li js-nav-ul-li"><Link href={route("home")}>HOME</Link></li>
           <li className="nav_ul_li js-nav-ul-li"><Link href={route("about")}>ABOUT</Link></li>
           <li className="nav_ul_li js-nav-ul-li"><Link href={route("blog")}>BLOG</Link></li>     
           <li className="nav_ul_li js-nav-ul-li"><Link href={route("contact")}>CONTACT</Link></li>
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

