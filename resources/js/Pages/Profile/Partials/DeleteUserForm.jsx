import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <>
            <h2 className="section_content_title">Delete Account</h2>
            <div className='form_control'>
                <div className="form_control_item">
                    <DangerButton className='form_control_item_submit' onClick={confirmUserDeletion}>Delete Account</DangerButton>
                </div>
            </div>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="form_control delete">
                    <h2 className="text-lg font-medium text-gray-900">
                        本当にアカウントを削除しますか?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        一度アカウントを削除すると､すべてのデータが消えますのでご注意ください｡
                    </p>

                    <div className="form_control_item">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="form_control_item_input"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="form_control_item">
                        <SecondaryButton className='form_control_item_submit' onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                    <div className="form_control_item">
                        <DangerButton className="form_control_item_submit" disabled={processing}>
                            アカウントを削除する
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
