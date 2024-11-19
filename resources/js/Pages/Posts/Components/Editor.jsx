
import {useForm, router,usePage } from '@inertiajs/react';
import {editorConfiguration,editorConfigurationThumbnail} from '@/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { formatinputDate } from '@/Script';
import {get,set,keys,del} from 'idb-keyval';
import { useState } from 'react'; 
import { categoryList } from './CategoryList';
import EditorHeader from './EditorHeader';

export default function Editor(){
	const {post} = usePage().props;
	const keywords= usePage().props.keywords?usePage().props.keywords[0]:"";
	const tags= usePage().props.tags?usePage().props.tags:"";
    const [is_restore, setIs_restore] = useState("false");
    const { data, setData, progress,processing } = useForm({
        id:post === undefined?"":post[0].id,
        title:post === undefined?"":post[0].title,
        content: post === undefined?"":post[0].content,
        excerpt:post === undefined?"":post[0].excerpt,
        category:post === undefined?5:post[0].category,
        tag:post === undefined?"":post[0].tag,
        keywords:post === undefined?keywords.keywords:post[0].keywords,
        thumbnail:post === undefined?"":post[0].thumbnail,
        is_show:post === undefined?"":post[0].is_show,
        is_top:post === undefined?0:post[0].is_top,
        published_at:post === undefined?formatinputDate(new Date()):post[0].published_at,
        is_continue:post === undefined?"":post[0].is_continue,
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
        
        if(data.is_continue == 1){
            router.post(route('page.store'), data,{preserveScroll:true});
        }else{
            router.post(route('page.store'), data);
        }    
    };
    function handleChangeData(e){
        if(post){
            setData('id',post.id);
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
		<>
			<EditorHeader data={data} handleClickData={handleChangeData} handleClickRestore={handleClickRestore}/>
	        <form onSubmit={handleSubmitPageData} method='post' id='form' className='form_control admin-content' encType="multipart/form-data" >
	            <div className='main'>
	                <div  className="form_control_item">
	                    <label htmlFor="title" >Title</label>
	                    <input type="text" id="title" className="form_control_item_input" value={data.title} 
	                        onChange={handleChangeData}  disabled={processing} maxLength={30}/>                        
	                </div>     
	                <div className="form_control_item page_content">
	                    <label htmlFor="content"  style={{marginBottom:'20px'}} >Content</label>
	                    <div className='article_content edit' id="content">
		                    <CKEditor
		                        editor={ ClassicEditor }
		                        config={ editorConfiguration }
		                        data={data.content}
		                        onChange={ ( event, editor ) => {
		                            set("content", editor.getData());
		                        } }
		                        onBlur={ ( event, editor ) => {
		                            setData('content', editor.getData());
		                        } }/>
	                    </div>                     
	                </div>
	            </div>
	            <div className='sub'>
	                <div  className="form_control_item">
	                    <label htmlFor="is_top">Show on Home</label>
	                    <input type='checkbox'
	                        name="is_top"
	                        checked={data.is_top}
	                        onChange={(e) =>{
	                            setData('is_top', e.target.checked); 
	                        } } className='form_control_item_checkbox'/>
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="published_at">Publish Date</label>
	                    <input type='datetime-local' className="form_control_item_select" 
	                        value={formatinputDate(data.published_at)}
	                        name='published_at' id='published_at' onChange={handleChangeData}/>
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="category">Category</label>
	                    <select className="form_control_item_select" value={data.category}
	                        name='category' id='category' onChange={
	                            (e)=>{
	                                handleChangeData(e);
	                            }}>
	                    	{categoryList.map((category,i)=>{
	                    		if(category !==""){
	                    			return category && <option value={i} key={i}>{category}</option>
	                    		}
	                    	})}
	                    </select>
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="tag" >Tag</label>
	                    
	                    <input list="tags" name="tag" id="tag" 
	                    	   className='form_control_item_input' value={data.tag} onChange={(e)=>handleChangeData(e)}  />
	                    <datalist id="tags">
	                    	{tags.map((tag, key)=>(<option value={tag.tag} key={key} />))}
						</datalist>

	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="keywords" >Keywords</label>
	                    <textarea name="keywords" list="keyword_list" id='keywords' className="form_control_item_input"
	                        value={data.keywords} onChange={(e)=>handleChangeData(e)} rows={5}
	                        
	                    ></textarea>
	                    <datalist id='keyword_list'>
	                        <option value='keyword1' />
	                        <option value='keyword2' />
	                    </datalist>
	                </div>
	                <div  className="form_control_item">
	                    <label htmlFor="thumbnail" style={{marginBottom:'20px'}} >Thumbnail</label>
	                    <CKEditor
	                        editor={ ClassicEditor }
	                        config={ editorConfigurationThumbnail }
	                        data={data.thumbnail}
	                        onChange={ ( event, editor ) => {  
	                            setData('thumbnail', editor.getData())
	                        } }
	                    />
	                </div>
	                <div  className="form_control_item"  style={{marginTop:'20px'}}>
	                    <label htmlFor="excerpt" >Summary</label>
	                    <textarea id="excerpt" name='excerpt' className="form_control_item_input"  
	                     rows="5" value={data.excerpt} onChange={handleChangeData}  maxLength={40}>
	                    </textarea>
	                </div>
	                
	            </div>
                {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                )}
	        </form>
        </>
        )
}