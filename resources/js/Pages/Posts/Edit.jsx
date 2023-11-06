
import { usePage, Link,useForm,router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useState,useMemo,ref,useRef } from 'react';
import $ from "jquery";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResizeModule from "@ssumo/quill-resize-module";



Quill.register("modules/resize", ResizeModule);


export default function Update({auth}){
    const editPost = usePage().props[0][0];
    console.log(editPost);
    const ref = useRef(null);
    const [thumbnailValue,setThumbnailValue] =useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState(editPost.thumbnail);
    const [test, setTest] = useState(editPost.content);
    
    

    const { data, setData, progress } = useForm({
        id:editPost.id,
        title: editPost.title,
        content: editPost.content,   
        excerpt:editPost.excerpt,
        category:editPost.category,
        tag:editPost.tag,
        keywords:editPost.keyword,
        thumbnail:editPost.thumbnail,
        is_show:true,
        wysiwygData:{},
        _method: 'PATCH'
    })
      console.log(test);
      console.log(data.content);
    const submit = (e) => {
        e.preventDefault();
        router.post('/blog/admin/edit', data);
 
    };
    function handleChange(e){
        const key = e.target.id;
        const value = e.target.value;
        setData(data => ({
            ...data,
            [key]: value,
        }))
       console.log(data)
    }


    function handleChangeWysiwyg(content, delta) {
        console.log(delta)
        const key = "content";
        const value = content;
        let storedImageNum = Object.keys(data.wysiwygData).length;
        let currentImageNum = content.match(/\img src="data:/g) == undefined?0:content.match(/\img src="data:/g).length;

       delta["ops"].forEach((c,index) => {
        
        if('insert' in c){
            if(typeof(c["insert"]) === "string"){
            }
            else if('image' in c['insert']){   
                const imgData = c["insert"]["image"];
                if(imgData.length >10000){
                    const $inputFile = document.querySelector('input[type=file]').files[0]                       
                    const imgFile = convertToFile(imgData, $inputFile);
                    const id = c["insert"]["image"];
                    data.wysiwygData[id]= imgFile;
                }
                
                    
                }
            }else if('delete' in c){
                    if(currentImageNum !== storedImageNum){
                        let images = content.match(/(src=)["|'](.*?)["|']+/g);
                        let srcAry = [];
                        if(images){
                            
                            images.forEach((ele,i)=>{
                                let src = ele.replace(/src=|"/g, '');
                                //console.log(Object.keys(data.wysiwygData))
                                srcAry.push(src);
                                //console.log(data.wysiwygData[src])
                                    
                            })
                            
                            let a = Object.keys(data.wysiwygData).filter((i)=>srcAry.indexOf(i) == -1 );
                            console.log(a);
                            a.forEach((ele,i)=>{
                                delete data.wysiwygData[ele];
                            })
                        }     
                    }              
            }
            storedImageNum = Object.keys(data.wysiwygData).length;
        });
        setData(data => ({
            ...data,
            [key]: value,
        }))

        console.log(`保存枚数${storedImageNum}` )
        console.log(`エディター枚数${currentImageNum}` )
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
                handlers: {
                  //image: selectLocalImage,
                  
                },
                container: [
                    [{ 'header': [1, 2, false] }],
                    ['blockquote', 'code-block'],
                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    [{ 'color': [] }, { 'background': [] }],  
                    ["image","link"],
                    [{ size: [] }],
                    ['clean']   
                ],
              },
              resize: {
                locale: {
                  altTip: "按住alt键比例缩放",
                  inputTip: "回车键确认",
                  floatLeft: "左",
                  floatRight: "右",
                  center: "中央",
                  restore: "元に戻す",
                },
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
                    <div className="section_title_jp">投稿を編集</div>
                </h1>
           
                <form onSubmit={submit} className='form_control admin-content' encType="multipart/form-data" >
                    <div className='main'>
                        <div  className="form_control_item">
                            <label htmlFor="title" >タイトル</label>
                            <input type="text" id="title" className="form_control_item_input" value={data.title} onChange={handleChange} />

                        </div>
                
                        <div className="form_control_item" >
                            <label htmlFor="content" >内容</label>
                            <ReactQuill theme="snow"
                            id="content"
                            modules={modules}
                            onChange={handleChangeWysiwyg}
                            defaultValue ={data.content}
                            className="form_control_item_textarea"
                            ref={ref}

                            >
                            </ReactQuill>
                            
                        </div>
                    </div>
                    <div className='sub'>
                        <div  className="form_control_item">
                            <label htmlFor="excerpt">カテゴリ</label>
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
                            <label htmlFor="excerpt" >タグ</label>
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
                            value={thumbnailValue} onChange={(e)=>{
                                setThumbnailValue(e.target.value);
                                setData("thumbnail", e.target.files[0]);
                                setThumbnailPreview(window.URL.createObjectURL(e.target.files[0]));
                                console.log(data);
                            }} />
                            <div className="form_control_item_input_preview">
                                <img src={thumbnailPreview} />
                            </div>
                        </div>
                        <div  className="form_control_item">
                            <label htmlFor="excerpt" >抜粋</label>
                            <textarea id="excerpt" name='excerpt' className="form_control_item_input"  
                             rows="5" value={data.excerpt} onChange={handleChange} >
                            </textarea>
                        </div>
                    </div>
                    <div  className="form_control_item button">
                        <input type="submit" value="更新" className="form_control_item_submit" onChange={handleChange} />
                            {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                            )}
                    </div>
                </form>
                </section>
            </div>

        </AuthenticatedLayout>            
 
       
    )
}