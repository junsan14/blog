
import { AiOutlineClear } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

export default function SearchPostsbyKeyword({keyword,category, setKeyword, setCategory,posts,selectedPosts, setSelectedPosts}) {
    const handleChangeKeyword = (e)=>{
        const inputKeyword = e.currentTarget.value;
        setKeyword(inputKeyword);
        let reg = new RegExp(inputKeyword,"gi");
        if(category){
            const matchPosts = posts.filter(post => post.category === category&& String(post['keywords']).match(reg));
            setSelectedPosts(matchPosts)
        }else{
            setSelectedPosts(posts.filter(post =>  String(post['keywords']).match(reg) ));
        }
    }

    const handleClickReset = ()=>{
        $(".search_area_input").val("");
         setKeyword("");
         setCategory("");
         setSelectedPosts(posts);
         $(".js-search_area_icon").removeClass("fixed");
     }

    return(
        <div className="search_area js-search_area">
            <button type="button" className="search_area_reset js-search_area_reset" value="RESET" 
                    onClick={handleClickReset}>
                <AiOutlineClear />
            </button>
            <BsSearch className="search_area_icon js-search_area_icon"/>
            
            <input list="tag-list"  className="search_area_input js-search_area_input" id="tag-choice" 
                name="tag-choice" placeholder=""  
                value={keyword}
                onChange={handleChangeKeyword} 
            />
        </div>
        )
}