import GuestLayout from '@/Layouts/GuestLayout';
import work01 from './work.001.png'
import work02 from './work.002.png'
import { Link,usePage } from '@inertiajs/react';


export default function WorkIndex(){
	const works = usePage().props.works;
	console.log(works)
	return(
		<GuestLayout>
            <div className='background'>
              <div className="images">
              </div>
            </div>
            <section className="section works">
              <h1 className="section_title">
                <div className="section_title_jp">WORKS</div>
              </h1>
                     
              <div className="section_content works_content">
              {works.map((work,index)=>(
              	<div className='works_content_work'>
                	<Link href="/works/work" data={{ id: work.id }}>
                		<img src={work.thumbnail} alt="" />
                		<h2 className='works_content_work_title'>
                			{work.title}
                		</h2>
                	</Link>
                </div>

              	))}
                
                
              </div>
            </section>
      </GuestLayout>
		)
}