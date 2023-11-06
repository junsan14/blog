import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="dashboard">
                <section className='section'>
                        <ul className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <li><Link href="/profile" >プロフィール編集</Link></li>
                            <li><Link href="/blog/admin/create" >記事投稿</Link></li>
                            <li><Link href="/blog/admin/editIndex" >記事修正</Link></li>
                        </ul>
              
                </section>
            </div>

        </AuthenticatedLayout>
    );
}
