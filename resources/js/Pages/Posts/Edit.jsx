import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Editor from './Components/Editor';
import EditorHeader from './Components/EditorHeader';

export default function Update({auth}){
    return(
        <AuthenticatedLayout user={auth.user} >
            <EditorHeader />
            <div className="create">
                <section className="section">
                    <h1 className="section_title">
                        <div className="section_title_jp">EDIT POST</div>
                    </h1>
                    <Editor/>
                </section>
            </div>
        </AuthenticatedLayout>     
    )
}


