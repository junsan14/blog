import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link,usePage } from '@inertiajs/react';
import { CgProfile} from 'react-icons/cg';
import { RxHome} from 'react-icons/rx';
import { BsClipboardPlus} from 'react-icons/bs';
import {FaRegListAlt} from 'react-icons/fa';
import { IoIosSwitch } from "react-icons/io";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    let uri =usePage().component;

    return (
        <>
            <header className="header auth">
                <ul className='header_ul'>
                    <li className='header_ul_li'>
                        <Link href='/'>
                            <RxHome className='header_ul_li_icon' />
                        </Link>
                    </li>
                    <li className='header_ul_li'>
                        <Link href={uri.indexOf("Works") !== -1 ?'/blog/admin':'/works/editIndex'}>
                            <IoIosSwitch  className='header_ul_li_icon'/>
                        </Link>  
                    </li>
                    <li className='header_ul_li'>
                        <Link href={uri.indexOf("Works") === -1 ?'/blog/admin':'/works/editIndex'}>
                            <FaRegListAlt className='header_ul_li_icon'/>
                        </Link>
                    </li>
                    <li className='header_ul_li'>
                        <Link href={uri.indexOf("Works") === -1 ?'/blog/admin/create':'/works/work/create'}>
                            <BsClipboardPlus className='header_ul_li_icon'/>
                        </Link>  
                    </li>
                    <li className='header_ul_li'>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <CgProfile className='header_ul_li_icon'/>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </li>


                </ul>
            </header>           
                        
            <main className="main auth-wrapper">
                {children}
            </main>
        </>
    );
}
