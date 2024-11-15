
import {categoryList} from "./CategoryList";

export default function SearchPostsByCategory ({ category, keyword, setCategory, posts, selectedPosts, setSelectedPosts}){
    const hanldeClickCategory = (e)=>{
        const inputCategory = e.currentTarget.value;
        setCategory(inputCategory);
        if(keyword){
            const matchPosts = posts.filter(post => post.category === category&& String(post['keywords']).match(reg));
            setSelectedPosts(matchPosts)
        }else{
            setSelectedPosts(posts.filter(post => post.category === inputCategory));
        }

    }
    return(
        <ul className="category_tab tab">  
            {categoryList.map((item,i)=>{
                if(item !==""){
                    return(
                        <li className={category === i?"category_tab_li on":"category_tab_li"} 
                            tabIndex="-1" value={i}  onClick={hanldeClickCategory} key={i} >
                                {item}
                        </li>
                        )
                }
                })}
            
        </ul>
    )
}