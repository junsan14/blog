
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useState,useMemo, useEffect } from 'react';
import {useForm, router, Link, usePage  } from '@inertiajs/react';
import $ from "jquery";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { CKEditor,CKFinder } from '@ckeditor/ckeditor5-react';
import ClassicEditor,{ima} from '@ckeditor/ckeditor5-build-classic';




import ResizeModule from "@ssumo/quill-resize-module";
Quill.register("modules/resize", ResizeModule);
import { formatinputDate,LoadQuillModule } from '@/script';



export default function Create({auth}){    

    function uploadAdapter2(loader) {
        let HOST = "/public/userfiles"
        return {
          upload: () => {
            return new Promise(async (resolve, reject) => {
              try {
                const file = await loader.file;
                const response = await axios.request({
                  method: "POST",
                  url: `${HOST}`,
                  data: {
                    files: file
                  },
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                });
                resolve({
                  default: `${HOST}/${response.data.filename}`
                });
              } catch (error) {
               console.log(error);
              }
            });
          },
          abort: () => {}
        };
    }
    const API_URl = "http://192.168.40.25:8000"
    const UPLOAD_ENDPOINT = "public/userfiles/images";

    function uploadAdapter(loader) {
      
            
                ckfinder:{
                    uploadUrl:`${API_URl}/${UPLOAD_ENDPOINT}`
                }
            
        
    }
    function uploadPlugin(editor) {
        ckfinder:{
            uploadUrl:`${API_URl}/${UPLOAD_ENDPOINT}`
        }
      }
    
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
        published_at:new Date(),
        is_preview:0,
        is_continue:0,
    });
    const [content, setContent] = useState( '');
     useEffect(()=>{
        const quill = new Quill("#editor", {
            theme: "snow",
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, 4, 5, 6,false] }],
                    ['bold', 'italic', 'underline','strike'],
                    [{ 'color': [] }, { 'background': [] }],  
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['blockquote', 'code-block'],
                    ["image","video","link"],
                    ['clean']  
                ]
            }
        })
        
    
   
    
    },[])
  
    const submit = (e) => {
        e.preventDefault();

        if(data.is_continue == 1){
            router.post('/blog/admin/create', data,{preserveScroll:true});
        }else{
            router.post('/blog/admin/create', data);
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

    

    function handleChangeWysiwyg(e) {
        const key = "content";
        let content = e.target.innerHTML;
        setData('content',content);
       console.log(data) ;

    }
    function convertToFile (imgData, file) {
        // ここでバイナリにしている
        const blob = atob(imgData.replace(/^.*,/, ''));
        let buffer = new Uint8Array(blob.length);
        for (let i = 0; i < blob.length; i++) {
        buffer[i] = blob.charCodeAt(i);
        }
        return new File([buffer.buffer], file.name, {type: file.type});
    }




      
    const modules = useMemo(() => {
        return {
          toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6,false] }],
                ['bold', 'italic', 'underline','strike'],
                [{ 'color': [] }, { 'background': [] }],  
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['blockquote', 'code-block'],
                ["image","video","link"],
                ['clean']   
            ],
          },

        };
}, []);
        
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
                        <div className="form_control_item page_content" onBlur={handleChangeWysiwyg}>
                            <label htmlFor="content" >内容</label>
                            <CKEditor
                                editor={ ClassicEditor }
                              
                                config={{
                                    ckfinder:{
                                        "uploaded": true,
                                        uploadUrl: `${route('ckfinder_connector')}?command=QuickUpload&type=Files`
                                    }
                                }}
                                data="<p>Hello from CKEditor&nbsp;5!</p>"
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                   // console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setData("content", data);
                                    console.log(data);
                                    //console.log( { event, editor, data } );
                                } }
                                onBlur={ ( event, editor ) => {
                                   // console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                   // console.log( 'Focus.', editor );
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