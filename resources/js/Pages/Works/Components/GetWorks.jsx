
import { AiOutlineEye } from "react-icons/ai"
import { FaTrash, FaEdit } from "react-icons/fa"
import { Link } from "@inertiajs/react"
import parse from 'html-react-parser';


export default function GetWorks({works, uri}){
    if(uri == "Works/WorksEditIndex"){
        return(
            works.map((work,i)=>(
                <div className='works_content_work' key={work.id}>
                    <Link href="/works/work/edit" data={{ id: work.id }}>
                        {parse(work.thumbnail)}
                        <h2 className='works_content_work_title'>
                            {work.title}
                        </h2>
                    </Link>
                </div>
            ))
        )    
    }else{
            return(
                <>
                    {works.map((work,i)=> {
                        return(
                            <div className='works_content_work' key={work.id}>
                                <Link href="/works/work" data={{ id: work.id }}>
                                     {parse(work.thumbnail)}
                                    <h2 className='works_content_work_title'>
                                        {work.title}
                                    </h2>
                                </Link>
                            </div>
                        )
                    })}
                </>
            )       
    }
}
    
