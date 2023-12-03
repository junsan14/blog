
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, {useState } from 'react';
import {useForm, router, Link, usePage, Head  } from '@inertiajs/react';
import {editorConfiguration,editorConfigurationThumbnail} from '@/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { FiSave } from "react-icons/fi";
import Dropdown from '@/Components/Dropdown';
import { formatinputDate } from '@/script';
import {get,set,keys,del} from 'idb-keyval';
export default function Create({auth}){    
   

    const {post} = usePage().props;
    const [is_restore, setIs_restore] = useState("false");

    const { data, setData, progress,processing } = useForm({
        id:"",
        title:is_restore == "true"?localStorage.getItem('title'):"",
        content: "",
        excerpt:"",
        category:1,
        tag:"",
        keywords:"",
        thumbnail:"",
        is_show:0,
        published_at:formatinputDate(new Date()),
        is_preview:0,
        is_continue:0,
        is_restore:"false"
    });
    function handleSubmit(e){
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
    
    function handleChange(e){
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
    function handleClickPreview(){      
        setData('is_preview', 1);
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
        //setData(data => ({ ...data, title: localStorage.getItem('title')}));
        //setData(data => ({...data, title:localStorage.getItem('title')}));

    }
    return(
        <AuthenticatedLayout user={auth.user} >
            <Head title="新規投稿" />
            <div  className="post_icon">
                <div className='post_icon_item'>
                    <Dropdown align='right'>
                        <Dropdown.Trigger>
                            <span className="">
                                <FiSave />
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <a href={route('page',{is_preview:data.is_preview,data:data})}
                                target='_blank' id='is_preview' onClick={handleClickPreview}
                                className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '>
                                Preview
                            </a>
                            <button type="submit" value="0" form='form' id="is_show" disabled={processing} onClick={handleChange}  className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '>
                                Draft
                            </button>
                            <button type="submit" value="1" form='form' id="is_show" disabled={processing} onClick={handleChange} className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '>
                                Publish
                            </button>
                            <button  disabled={processing} onClick={handleClickRestore} className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '>
                                Restore
                            </button>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
            <div className="create">
                <section className="section">
                <h1 className="section_title">
                    <div className="section_title_jp">New Post</div>
                </h1>
                <form onSubmit={handleSubmit} method='post' id='form' className='form_control admin-content' encType="multipart/form-data" >
                    <div className='main'>
                        <div  className="form_control_item">
                            <label htmlFor="title" >Title</label>
                            <input type="text" id="title" className="form_control_item_input" value={data.title} 
                                onChange={handleChange}  disabled={processing}
                            />                        </div>     
                        <div className="form_control_item page_content">
                            <label htmlFor="content"  style={{marginBottom:'20px'}} >Content</label>
                            <div className='article_content edit' id="content">
                            <CKEditor
                                editor={ ClassicEditor }
                                config={ editorConfiguration }
                                data={data.content}
                                onChange={ ( event, editor ) => {
                                    set("new_content", editor.getData());
                                } }
                                onBlur={ ( event, editor ) => {
                                    setData('content', editor.getData());
                                } }                    
                            />
                            </div>                     
                        </div>
                    </div>
                    <div className='sub'>
                        <div  className="form_control_item">
                            <label htmlFor="published_at">Publish Date</label>
                            <input type='datetime-local' className="form_control_item_select" 
                                value={formatinputDate(data.published_at)}
                                name='published_at' id='published_at' onChange={handleChange}
                             />
                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="category">Category</label>
                            <select className="form_control_item_select" value={data.category}
                                name='category' id='category' onChange={(e)=>handleChange(e)}
                            >
                                <option value="1">wiki</option>
                                <option value="2">Tool</option>
                                <option value="3">Notion</option>
                                <option value="4">Diary</option>
                                
                            </select>
                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="tag" >Tag</label>
                            <textarea name="tag" id='tag' list="tag_list" className="form_control_item_input"
                                value={data.tag} onChange={(e)=>handleChange(e)} rows={5}
                            ></textarea>

                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="keywords" >Keywords</label>
                            <textarea name="keywords" list="keyword_list" id='keywords' className="form_control_item_input"
                                value={data.keywords} onChange={(e)=>handleChange(e)} rows={5}
                                
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
                                data=""
                                onChange={ ( event, editor ) => {  
                                    setData('thumbnail', editor.getData())
                                } }
                            />
                        </div>
                        <div  className="form_control_item"  style={{marginTop:'20px'}}>
                            <label htmlFor="excerpt" >Summary</label>
                            <textarea id="excerpt" name='excerpt' className="form_control_item_input"  
                             rows="5" value={data.excerpt} onChange={handleChange} >
                            </textarea>
                        </div>
                        
                    </div>

                        
                            {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                            )}
                </form>
                </section>
            </div>
        </AuthenticatedLayout>            
 
       
    )
}
