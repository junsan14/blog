import GuestLayout from '@/Layouts/GuestLayout';
import parse from 'html-react-parser';

import { apperanceWebShow } from '@/Script';
import { usePage } from '@inertiajs/react';
export default function Work(){
	const work = usePage().props.work;
	apperanceWebShow();
	return(
		<GuestLayout>        
            <div className='background'>
              <div className="images">
              </div>
            </div>
            <section className="section work">
              <h1 className="section_title">
                <div className="section_title_en">{work.title}</div>
                <div className="section_title_jp">WORK</div>
              </h1>
                     
              <div className="section_content desc">
	            <h1 className="section_content_title">
	              DESCRIPTION
	            </h1>
               	<dl>
                  <dt>Period</dt>
                  <dd>{work.period}</dd>
                  <dt>Used Skills</dt>
                  <dd>{work.skills}</dd>
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
                  <dd className='remarks'>
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
	            		{parse(work.pc_appearance)}
	            		{work.pc_appearance02?parse(work.pc_appearance02):""}
	            		
	            	</div>
	            </div>
	            <div className='appearance_content js-content-sp'>
	            	<div className='appearance_content_imgs'>
	            		{parse(work.sp_appearance)}
	            		{work.sp_appearance02?parse(work.sp_appearance02):""}
	 
	            	</div>
	            	
	            </div>
              </div>
            </section>
      </GuestLayout>
		)
}