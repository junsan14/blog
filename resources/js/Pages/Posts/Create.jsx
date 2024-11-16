
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Editor from './Components/Editor';

export default function Create({auth}){    
    return(
        <AuthenticatedLayout user={auth.user} >
            <div className="create">
                <section className="section">
                    <h1 className="section_title">
                        <div className="section_title_jp">NEW POST</div>
                    </h1>
                    <Editor/>
                </section>
            </div>
        </AuthenticatedLayout>                
    )
}
