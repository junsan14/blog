import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import WorkEditor from './Components/WorkEditor';
import CreateEditorHeader from './Components/CreateEditorHeader';
export default function CreateWork(){
	
	return(
		<AuthenticatedLayout>
			<div className="adminwork">
                <section className="section">
                    <h1 className="section_title">
                        <div className="section_title_jp">NEW WORK</div>
                    </h1>
                    <WorkEditor />
                </section>
            </div>
        </AuthenticatedLayout>
        )
}