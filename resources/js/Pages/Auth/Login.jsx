import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();  
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <section className="section contact">
                <h1 className="section_title">
                <div className="section_title_jp">Log in</div>
                </h1>
                <form onSubmit={submit} className="form_control" >
                    <div className="form_control_item">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="form_control_item_input"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="form_control_item">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="form_control_item_input"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="form_control_item">
                        <label>
                            <input type='checkbox'
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>{
                                    setData('remember', e.target.checked); 
                                    console.log(data);
                                } }
                                className='form_control_item_checkbox'
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>

                    <div className="form_control_item">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className='form_control_item_link'
                            >
                                パスワードを忘れた方
                            </Link>
                        )}
                         <Link
                                href={route('register')}
                                className='form_control_item_link'
                            >
                                新規登録
                        </Link>
                        <PrimaryButton className="form_control_item_submit" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </GuestLayout>
    );
}
