import GuestLayout from '@/Layouts/GuestLayout';
import PageData from "./Components/PageData";
import {usePage} from '@inertiajs/react'
import GetPosts from './Components/GetPosts';


export default function Page() { 
    const pageData = usePage().props.pageData;
    const relevantPosts = usePage().props.relevantPosts;
      return(
           <GuestLayout>
                <div className="section_content page_content">
                    <div className="page" >
                      <section className="section">
                        <div className="section_content page_content">
                         <PageData pageData={pageData}/>
                        </div>
                      </section>
                      <h3 className="revelant-title">関連記事</h3>
                      <div className="revelant posts">
                        <GetPosts selectedPosts={relevantPosts} />
                      </div>
                    </div>
                </div>    
          </GuestLayout>
      )    
    


}

