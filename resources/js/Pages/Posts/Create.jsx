
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useState,useMemo } from 'react';
import {useForm, router, Link, usePage  } from '@inertiajs/react';
import $ from "jquery";
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResizeModule from "@ssumo/quill-resize-module";
Quill.register("modules/resize", ResizeModule);




export default function Create({auth}){

    const id = usePage().props.id?usePage().props.id:"";
    
    const [thumbnailValue,setThumbnailValue] =useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    
    const { data, setData, progress,processing } = useForm({
        id: id,
        title: "",
        content: "",   
        excerpt:"",
        category:1,
        tag:"",
        keywords:"",
        thumbnail:"",
        is_show:0,
        wysiwygData:{},
        is_preview:0,
    });

    const submit = (e) => {
        e.preventDefault();
        router.post('/blog/admin/create', data);
    };
    function handleChange(e){
        setData('id', id);
        const key = e.target.id;
        const value =e.target.value;
        setData(data => ({
            ...data,
            [key]: value,
        }))
    
    }

    function autoSave(e){
        if(e.target.value){
            router.patch('/blog/admin/create', 
            data,
            {preserveScroll:true}
        );
        }
        
    }
    
    function handleClickPreview(e){
        setData('is_preview', 1);
    }

    

    function handleChangeWysiwyg(content, delta, source, editor, oldDelta) {
        const key = "content";
        const value = content;
        setData('id', id);
        let storedImageNum = Object.keys(data.wysiwygData).length;
        let currentImageNum = content.match(/\img src="data:/g) == undefined?0:content.match(/\img src="data:/g).length;

       delta["ops"].forEach((c,index) => {
        
        if('insert' in c){
            if(typeof(c["insert"]) === "string"){
            }
            else if('image' in c['insert']){   
                const imgData = c["insert"]["image"];
              
                const $inputFile = document.querySelector('input[type=file]').files[0]                       
                const imgFile = convertToFile(imgData, $inputFile);
                const id = c["insert"]["image"];
                data.wysiwygData[id]= imgFile;
                    
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
        //console.log(data )
        //console.log(`保存枚数${storedImageNum}` )
        //console.log(`エディター枚数${currentImageNum}` )
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
                    <div className="section_title_jp"></div>
                </h1>
                <form onSubmit={submit} method='post' className='form_control admin-content' encType="multipart/form-data" >
                    <div className='main'>
                        <div  className="form_control_item">
                            <label htmlFor="title" >タイトル</label>
                            <input type="text" id="title" className="form_control_item_input" value={data.title} 
                                onChange={handleChange} onBlur={autoSave} disabled={processing}
                            />
                        </div>     
                        <div className="form_control_item page_content" >
                            <label htmlFor="content" >内容</label>
                            <ReactQuill theme="snow"
                            id="content"
                            modules={modules}
                            onChange={handleChangeWysiwyg}
                            value={data.content}
                            className="form_control_item_textarea article_content create"
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
                            <button type="submit" value="0" className="form_control_item_submit" id="is_show" onClick={handleChange}>
                            下書
                            </button>
                            <button type="submit" value="1" className="form_control_item_submit" id="is_show" onClick={handleChange} >
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