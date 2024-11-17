import GuestLayout from '@/Layouts/GuestLayout';
import appearance01_01 from './appearance01_01_pc.png'
import appearance01_02 from './appearance01_02_pc.png'
import appearance01_01_sp from './appearance01_01_sp.png'
import appearance01_02_sp from './appearance01_02_sp.png'

import { apperanceWebShow } from '@/Script';
import { usePage } from '@inertiajs/react';
export default function Work(){
	const work = usePage().props.work;
	console.log(work)
apperanceWebShow();
	return(
		<GuestLayout>        
            <div className='background'>
              <div className="images">
              </div>
            </div>
            <section className="section work">
              <h1 className="section_title">
                <div className="section_title_en">SHIMONADA SHOTEN</div>
                <div className="section_title_jp">WORK</div>
              </h1>
                     
              <div className="section_content desc">
	            <h1 className="section_content_title">
	              DESCRIPTION
	            </h1>
               	<dl>
                  <dt>Period</dt>
                  <dd>{work.period}</dd>
                  <dt>Frameworks</dt>
                  <dd>{work.frameworks} </dd>
                  <dt>Work Time</dt>
                  <dd>{work.worktime}</dd>
                  <dt>URL</dt>
                  <dd>
                  	<a href={work.url} target='_blank'>{work.url}</a> 
                  </dd>
                  <dt>Git</dt>
                  <dd>
                  	<a href={work.git} target='_blank'>{work.git}</a> 
                  </dd> 
                  <dt>Remarks</dt>
                  <dd>
                  	{work.remarks}
                  </dd> 
                </dl>
              </div>
              <div className='section_content appearance'>
              	<h1 className="section_content_title">
	              APPEARANCE
	            </h1>
	            <ul className="appearance_tab tab">
                    <li className="appearance_tab_li js-skill-tab-li on" tabIndex="-1" name="pc">PC</li>
                    <li className="appearance_tab_li js-skill-tab-li" tabIndex="-1" name="sp">SP</li>
                  </ul>
	            <div className='appearance_content show js-content-pc'>
	            	<div className='appearance_content_imgs'>
	            		<img src={work.pc_appearance}alt="" className='appearance_content_imgs_item'/>
	            		<img src={work.pc_appearance} alt="" className='appearance_content_imgs_item' />
	            	</div>
	            </div>
	            <div className='appearance_content js-content-sp'>
	            	<div className='appearance_content_imgs'>
	            		<img src={work.sp_appearance} alt="" className='appearance_content_imgs_item'/>
	            		<img src={work.sp_appearance} alt="" className='appearance_content_imgs_item' />
	            	</div>
	            	
	            </div>
              </div>
            </section>
      </GuestLayout>
		)
}