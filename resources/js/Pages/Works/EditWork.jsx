import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import WorkEditor from './Components/WorkEditor';

export default function EditWork(){
	
	return(
		<AuthenticatedLayout>
			<div className="adminwork edit">
                <section className="section">
                    <h1 className="section_title">
                        <div className="section_title_jp">Edit WORK</div>
                    </h1>
                    <WorkEditor />
                </section>
            </div>
        </AuthenticatedLayout>
        )
}