
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, {useState } from 'react';
import {useForm, router, Link, usePage  } from '@inertiajs/react';
import $ from "jquery";

import {editorConfiguration} from '@/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { formatinputDate } from '@/script';



export default function Create({auth}){    

    
    const [thumbnailValue,setThumbnailValue] =useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const {post} = usePage().props;
    const { data, setData, progress,processing } = useForm({
        id:"",
        title:"",
        content: "",   
        excerpt:"",
        category:1,
        tag:"",
        keywords:"",
        thumbnail:"",
        is_show:0,
        wysiwygData:{},
        published_at:formatinputDate(new Date()),
        is_preview:0,
        is_continue:0,
    });
    const [content, setContent] = useState( '');
    const submit = (e) => {
        e.preventDefault();

        if(data.is_continue == 1){
            router.post(route('page.store'), data,{preserveScroll:true});
        }else{
            router.post(route('page.store'), data);
        }
        
    };
    function onClickSubmit(e){
        e.preventDefault();
        let content = $(".ql-editor").html();
        setData("content", content);
        console.log(data);
    
    }
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
        console.log(data);
    }
    
    function handleClickPreview(e){      
        setData('is_preview', 1);
    }
        
    return(
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
            <div className="create">
                <section className="section">
                <h1 className="section_title">
                    <div className="section_title_jp">新規投稿</div>
                </h1>
                <form onSubmit={submit} method='post' className='form_control admin-content' encType="multipart/form-data" >
                    <div className='main'>
                        <div  className="form_control_item">
                            <label htmlFor="title" >タイトル</label>
                            <input type="text" id="title" className="form_control_item_input" value={data.title} 
                                onChange={handleChange}  disabled={processing}
                            />
                        </div>     
   
                        <div className="form_control_item page_content">
                            <label htmlFor="content" >内容</label>
                    
                            <CKEditor
                                editor={ ClassicEditor }
                                config={ editorConfiguration }
                                data=''
                                onChange={ ( event, editor ) => {
                                    setData('content', editor.getData());
                                } }

                            />
                         
                            
                        </div>
                    </div>
                    <div className='sub'>
                        <div  className="form_control_item">
                            <label htmlFor="published_at">投稿日付</label>
                            <input type='datetime-local' className="form_control_item_select" 
                                value={formatinputDate(data.published_at)}
                                name='published_at' id='published_at' onChange={handleChange}
                             />
                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="category">カテゴリ</label>
                            <select className="form_control_item_select" value={data.category}
                                name='category' id='category' onChange={(e)=>handleChange(e)}
                                
                            >
                                <option value="1">wiki</option>
                                <option value="2">Note</option>
                                <option value="3">Tool</option>
                                <option value="4">Diary</option>
                                
                            </select>
                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="tag" >タグ</label>
                            <input name="tag" id='tag' list="tag_list" className="form_control_item_input"
                                value={data.tag} onChange={(e)=>handleChange(e)}
                            
                            />
                            <datalist id='tag_list'>
                                <option value='tag1' />
                                <option value='tag2' />
                            </datalist>
                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="keywords" >キーワード</label>
                            <input name="keywords" list="keyword_list" id='keywords' className="form_control_item_input"
                                value={data.keywords} onChange={(e)=>handleChange(e)}
                                
                            />
                            <datalist id='keyword_list'>
                                <option value='keyword1' />
                                <option value='keyword2' />
                            </datalist>
                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="thumbnail" >サムネイル</label>
                            <input type="file" id="thumbnail" name='thumbnail' className="form_control_item_input" 
                            value={thumbnailValue} 
                           
                            onChange={(e)=>{
                                setThumbnailValue(e.target.value);
                                setData("thumbnail", e.target.files[0]);
                                setThumbnailPreview(window.URL.createObjectURL(e.target.files[0]));
                                
                            }} />
                            <div className="form_control_item_input_preview">
                                {thumbnailPreview && <img src={thumbnailPreview} /> }
                            </div>
                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="excerpt" >抜粋</label>
                            <textarea id="excerpt" name='excerpt' className="form_control_item_input"  
                             rows="5" value={data.excerpt} onChange={handleChange} >
                            </textarea>
                        </div>
                        <div  className="form_control_item button">
                            <button type="submit" value="1" id="is_continue" 
                                className="form_control_item_submit" onClick={onClickSubmit}>
                            一時保存
                            </button>
                            <a href={route('page',
                                {
                                 is_preview:data.is_preview,
                                 data:data
                                }
                            )} target='_blank'
                                className="form_control_item_submit" 
                                id='is_preview' onClick={handleClickPreview}
                            >
                                プレビュー
                            </a>
                        </div>
                    </div>

                        <div  className="form_control_item button">
                            <button type="submit" value="0" className="form_control_item_submit" 
                            id="is_show" disabled={processing} onClick={handleChange}>
                            下書
                            </button>
                            <button type="submit" value="1" className="form_control_item_submit" 
                            id="is_show" onClick={handleChange} disabled={processing}>
                            公開
                            </button>
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

const insertToEditor = (url) => {
    const range = ref.current.editor.getSelection();
    //ref.current.editor.insertEmbed(range.index, "image", url);
    ref.current.editor.insertEmbed(range.index, "image", url);
    };
    const selectLocalImage =  () => {
        
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.click();
        input.onchange = () => {
        const file = input.files[0];
        console.log(input)
        // file type is only image.
        if (/^image\//.test(file.type)) {
           //quillFile.append("file", file);
           console.log(file)
           const range = ref.current.editor.getSelection();
         
    
            const reader = new FileReader();
            let base;
            reader.onload = (event) => {
              const base64Text = event.currentTarget.result
    
              document.querySelector('#base64text').value = base64Text
              base = `<img src="${base64Text}" width="100%" />`
            }
            reader.readAsDataURL(file)
            console.log(base)
          
            //ref.current.editor.insertEmbed(range.index, "image", url);
            ref.current.editor.insertText(range.index, "image");
        } else {
            alert("画像のみアップロードできます。");
        }
        };
    };