
import Dropdown from '@/Components/Dropdown';
import { FiSave } from "react-icons/fi";

export default function CreateEditorHeader({data,handleClickData,handleClickRestore}){
	
	return(
		<div  className="post_icon">
            <div className='post_icon_item'>
                <Dropdown align='right'>
                    <Dropdown.Trigger>
                        <span className="">
                            <FiSave />
                        </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <button type="submit" value="1" form='formwork' id="is_show" onClick={handleClickData} className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '>
                            Publish
                        </button>
                        <button  onClick={handleClickRestore} className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '>
                            Restore
                        </button>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
		)
}

