

import {useForm, router,usePage } from '@inertiajs/react';
import {editorConfiguration,editorConfigurationThumbnail} from '@/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import {get,set,keys,del} from 'idb-keyval';
import { useState } from 'react'; 
import CreateEditorHeader from './CreateEditorHeader';

export default function CreateEditor(){
	const {work} = usePage().props;
    const [is_restore, setIs_restore] = useState("false");
    const { data, setData, progress,processing } = useForm({
        id:work === undefined?"":work[0].id,
        title:work === undefined?"":work[0].title,
        period: work === undefined?"":work[0].period,
        frameworks:work === undefined?"":work[0].frameworks,
        worktime:work === undefined?"":work[0].worktime,
        url:work === undefined?"":work[0].url,
        git:work === undefined?"":work[0].git,
        remarks:work === undefined?"":work[0].remarks,
        thumbnail:work === undefined?"":work[0].thumbnail,
        is_top:work === undefined?0:work[0].is_top,
        pc_appearance:work === undefined?"":`<img src="${work[0].pc_appearance}" />`,
        pc_appearance02:work === undefined?"":work[0].pc_appearance02,
        sp_appearance:work === undefined?"":work[0].sp_appearance,
        sp_appearance02:work === undefined?"":work[0].sp_appearance02,
        created_at:new Date(),
        updated_at:new Date(),
        is_restore:"false"
    });
	function handleSubmitPageData(e){
        e.preventDefault();
        keys().then((keys)=>{
            keys.forEach((key,i)=>{
             //console.log(key);
             del(key)
            })
         })
        router.post(route('work.store'), data);    
    };
    function handleChangeData(e){
        if(work){
            setData('id',work.id);
            setData('is_continue',0);
        }
        
        const key = e.target.id;
        const value =e.target.value;
        setData(data => ({
            ...data,
            [key]: value,
        }))
       set("new_" +[key], value);
    }
    function handleClickRestore(e){
        e.preventDefault();
        let res =  confirm(`前回のデータを復元しますか?`);
        if(res){
            setIs_restore("true");
            keys().then((keys)=>{
               keys.forEach((key,i)=>{
                //console.log(key);
                get(key).then((val)=>{
                    let data_key = String(key).slice(String(key).indexOf("_")+1, String(key).length);
                    //console.log(`${data_key}:${val}`)
                    setData(data => ({...data, [data_key]:val}))
                })
               })
            })
            
        }else{

        }
    }
	return(
		<div className='section_content workEditor'>
			<CreateEditorHeader  data={data} handleClickData={handleChangeData}/>
	        <form onSubmit={handleSubmitPageData} method='post' id='formwork' className='form_control admin-content' encType="multipart/form-data" >
	            <div className=''>
	                <div  className="form_control_item">
	                    <label htmlFor="title" >Title</label>
	                    <input type="text" id="title" className="form_control_item_input" value={data.title} 
	                        onChange={handleChangeData}  disabled={processing} maxLength={30}/>                        
	                </div>  
	                <div  className="form_control_item">
	                    <label htmlFor="title" >PERIOD</label>
	                    <input type="text" id="period" className="form_control_item_input" value={data.period} 
	                        onChange={handleChangeData}  disabled={processing} maxLength={30}/>                        
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="title" >FRAMEWORKS</label>
	                    <input type="text" id="frameworks" className="form_control_item_input" value={data.frameworks} 
	                        onChange={handleChangeData}  disabled={processing} maxLength={30}/>                        
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="title" >WORK TIME</label>
	                    <input type="text" id="worktime" className="form_control_item_input" value={data.worktime} 
	                        onChange={handleChangeData}  disabled={processing} maxLength={30}/>                        
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="title" >URL</label>
	                    <input type="text" id="url" className="form_control_item_input" value={data.url} 
	                        onChange={handleChangeData}  disabled={processing} maxLength={30}/>                        
	                </div> 


	                <div  className="form_control_item">
	                    <label htmlFor="title" >Git URL</label>
	                    <input type="text" id="git" className="form_control_item_input" value={data.git} 
	                        onChange={handleChangeData}  disabled={processing} maxLength={30}/>                        
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="remarks" >REMARKS</label>
	                    <textarea name="remarks" id='remarks' className="form_control_item_input"
	                        value={data.remarks} onChange={(e)=>handleChangeData(e)} rows={5}
	                        
	                    ></textarea>
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="thumbnail" style={{marginBottom:'20px'}} >THUMBNAIL</label>
	                    <CKEditor
	                        editor={ ClassicEditor }
	                        config={ editorConfigurationThumbnail }
	                        data={data.thumbnail}
	                        onChange={ ( event, editor ) => {  
	                            setData('thumbnail', editor.getData())}}
	                    />
	                </div> 
	                <div  className="form_control_item">
	                    <label htmlFor="pc_appearance" style={{marginBottom:'20px'}} >PC OUTLOOK01</label>
	                    <CKEditor
	                        editor={ ClassicEditor }
	                        config={ editorConfigurationThumbnail }
	                        data={data.pc_appearance}
	                        onChange={ ( event, editor ) => {  
	                            setData('pc_appearance', editor.getData())}}
	                    />
	                </div> 
	                <div  className="form_control_item">
	                    <label htmlFor="pc_appearance02" style={{marginBottom:'20px'}} >PC OUTLOOK02</label>
	                    <CKEditor
	                        editor={ ClassicEditor }
	                        config={ editorConfigurationThumbnail }
	                        data={data.pc_appearance02}
	                        onChange={ ( event, editor ) => {  
	                            setData('pc_appearance02', editor.getData())}}
	                    />
	                </div> 
	                <div  className="form_control_item">
	                    <label htmlFor="sp_appearance" style={{marginBottom:'20px'}} >SP OUTLOOK01</label>
	                    <CKEditor
	                        editor={ ClassicEditor }
	                        config={ editorConfigurationThumbnail }
	                        data={data.sp_appearance}
	                        onChange={ ( event, editor ) => {  
	                            setData('sp_appearance', editor.getData())}}
	                    />
	                </div> 
	                <div  className="form_control_item">
	                    <label htmlFor="sp_appearance02" style={{marginBottom:'20px'}} >SP OUTLOOK02</label>
	                    <CKEditor
	                        editor={ ClassicEditor }
	                        config={ editorConfigurationThumbnail }
	                        data={data.sp_appearance02}
	                        onChange={ ( event, editor ) => {  
	                            setData('sp_appearance02', editor.getData())}}
	                    />
	                </div> 
	            </div>
                {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                )}

	        </form>
        </div>
        )
}