import GuestLayout from '@/Layouts/GuestLayout';
import { Link,usePage } from '@inertiajs/react';
import GetWorks from './Components/GetWorks';
export default function WorkIndex(){
	const works = usePage().props.works;
	const uri = usePage().component;
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
              	<GetWorks works={works} uri={uri}/>
              </div>
            </section>
      </GuestLayout>
		)
}