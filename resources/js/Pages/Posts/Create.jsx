
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, {useState } from 'react';
import { Head } from '@inertiajs/react';
import EditorHeader from './Components/EditorHeader';
import Editor from './Components/Editor';
export default function Create({auth}){    

    
    
    return(
        <AuthenticatedLayout user={auth.user} >
            <Head>
                <title>新規投稿</title>
            </Head>
            
            <div className="create">
                <section className="section">
                <h1 className="section_title">
                    <div className="section_title_jp">NEW POST</div>
                </h1>
                <Editor />
                </section>
            </div>
        </AuthenticatedLayout>            
 
       
    )
}

function Editor2 ({auth, handleSubmitPageData={handleSubmitPageData},handleClickPreview={handleClickPreview},
                  handleClickRestore={handleClickRestore}, handleChangeData={handleChangeData}

    }){
    const {post} = usePage().props;
    console.log(post);
    const [is_restore, setIs_restore] = useState("false");
    const { data, setData, progress,processing } = useForm({
        id:"",
        title:is_restore == "true"?localStorage.getItem('title'):"",
        content: "",
        excerpt:"",
        category:5,
        tag:"",
        keywords:"",
        thumbnail:"",
        is_show:0,
        is_top:1,
        published_at:formatinputDate(new Date()),
        is_preview:0,
        is_continue:0,
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
    return(
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
                        <label htmlFor="is_top">Wanna Show on TOP</label>
                        <input type='checkbox'
                            name="is_top"
                            checked={data.is_top}
                            onChange={(e) =>{
                                setData('is_top', e.target.checked); 
                                console.log(data.is_top)
                            } }
                            className='form_control_item_checkbox'
                        />
                    </div>
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
                            name='category' id='category' onChange={
                                (e)=>{
                                    handleChange(e);
                                }
                            }
                        >
                            <option value="1">IT</option>
                            <option value="4">LIFE</option>
                            <option value="5">JOCV</option>
                            
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
        )
}
