
import { usePage, Link,useForm,router, Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useState } from 'react';
import {editorConfiguration,editorConfigurationThumbnail} from '@/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { formatinputDate } from '@/script';
import { FiSave } from "react-icons/fi";
import Dropdown from '@/Components/Dropdown';

export default function Update({auth}){
    const editPost = usePage().props.post[0];
    const [thumbnailValue,setThumbnailValue] =useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState(editPost.thumbnail);
    const uri = usePage().component;

    const { data, setData, progress, processing} = useForm({
        id:editPost.id,
        title: editPost.title,
        content: editPost.content,   
        excerpt:editPost.excerpt,
        category:editPost.category,
        tag:editPost.tag,
        keywords:editPost.keywords,
        thumbnail:editPost.thumbnail,
        is_show:1,
        published_at: editPost.published_at,
        is_preview:0,
        is_continue:0,
    })
    const submit = (e) => {
        e.preventDefault();
        if(data.is_continue == 1){
            router.post('/blog/admin/create', data,{preserveScroll:true});
        }else{
            router.post('/blog/admin/create', data);
        }
 
    };
    function handleChange(e){
        setData('is_continue',0);
        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleClickPreview(e){      
        setData('is_preview', 1);
    }

    const handleClickDelete = (e)=>{
        
      
        router.delete(route("page.destroy", {id:data.id, url:uri}), {
            onBefore: () => confirm('本当に削除してよろしいですか?'),
            preserveScroll: true 
        })
       
     }
     const RenderEditor = (prop) =>{
        if(prop.is_restore == "true"){
            console.log("true!")
            return(
                <CKEditor
                    editor={ ClassicEditor }
                    config={ editorConfiguration }
                    data={localStorage.getItem('content')}
                    onChange={ ( event, editor ) => {
                        setData('content', editor.getData());
                        localStorage.setItem('content', editor.getData());
                    } }
                    
                />
            )
        }else{
            return(
                <CKEditor
                    editor={ ClassicEditor }
                    config={ editorConfiguration }
                    data={data.content}
                    onChange={ ( event, editor ) => {
                        console.log(document.getElementById('eb843053a8f607a8bf0975849349b7558'))
                        setData('content', editor.getData());
                        localStorage.setItem('content', editor.getData());
                    } }
                    
                />
            )
        }
    }


    return(
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Post" />
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
                                Update
                            </button>
                            <button disabled={processing} onClick={handleClickDelete}  className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '>
                                Delete
                            </button>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
            <div className="create">
                <section className="section">
                    <h1 className="section_title">
                        <div className="section_title_jp">Edit Post</div>
                    </h1>
                    <form onSubmit={submit} id="form" className='form_control admin-content' encType="multipart/form-data" >
                        <div className='main'>
                            <div  className="form_control_item">
                                <label htmlFor="title" >Title</label>
                                <input type="text" id="title" className="form_control_item_input" 
                                value={data.title} onChange={handleChange}/>
                            </div>
                            <div className="form_control_item page_content" >
                                <div className='article_content edit '>
                                    <label htmlFor="content"  style={{marginBottom:'20px'}}>Content</label>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        config={ editorConfiguration }
                                        data={data.content}
                                        onChange={ ( event, editor ) => {           
                                            setData('content', editor.getData());
                                            //console.log(data);
                                        } }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='sub'>
                            <div  className="form_control_item">
                                <label htmlFor="published_at">Publish Date</label>
                                <input type='datetime-local' className="form_control_item_select" value={formatinputDate(data.published_at)}
                                    name='published_at' id='published_at' onChange={(e)=>handleChange(e)}
                                />
                            </div>
                            <div  className="form_control_item">
                                <label htmlFor="category">Category</label>
                                <select className="form_control_item_select" value={data.category}
                                    name='category' id='category' onChange={(e)=>handleChange(e)}>
                                    <option value="1">wiki</option>
                                    <option value="2">Note</option>
                                    <option value="3">Tool</option>
                                    <option value="4">Diary</option>
                                    
                                </select>
                            </div>
                            <div  className="form_control_item">
                                <label htmlFor="tag" >Tag</label>
                                <textarea name="tag" id='tag' list="tag_list" className="form_control_item_input"
                                    value={data.tag} onChange={(e)=>handleChange(e)} rows={5}
                                >{data.tag}
                                </textarea>

                            </div>
                            <div  className="form_control_item">
                                <label htmlFor="keywords" >Keywords</label>
                                <textarea name="keywords" list="keyword_list" id='keywords' className="form_control_item_input"
                                    value={data.keywords} onChange={(e)=>handleChange(e)} rows={5}
                                >
                                </textarea>
                                
                            </div>
                            <div  className="form_control_item">
                                <label htmlFor="thumbnail"  style={{marginBottom:'20px'}} >Thumbnail</label>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    config={ editorConfigurationThumbnail }
                                    data={data.thumbnail}
                                   
                                    onChange={ ( event, editor ) => {  
                                        setData('thumbnail', editor.getData())
                                    } }
                                />
                            </div>
                            <div  className="form_control_item" style={{marginTop:'20px'}}>
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