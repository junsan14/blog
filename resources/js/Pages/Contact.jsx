import GuestLayout from '@/Layouts/GuestLayout';
import {useForm, router, Head} from '@inertiajs/react';
import TextInput from '@/Components/TextInput';


export default function Contact() {

  const { data, setData,processing,progress,post } = useForm({
    user_name: "",
    user_email: "",   
    subject:"",
    content:"",
    remember: false,
}) 
    function handleChange(e){
        const key = e.target.id;
        const value = e.target.value;
        setData(values => ({
            ...values,
            [key]: value,
        }))

    }
    function submit(e){
      e.preventDefault();
      post(route('contact'), data,{
        onSuccess: () => reset('data'),
      })
    }
  return (
    <>
   <GuestLayout> 
          <Head>
            <title>CONTACT</title>
            <meta name="description" content="WEBエンジニアとしてのポートフォリオ､またWEB制作やWEB開発に関わる知識を発信しています" />
          </Head>
          <div className='background'>
              <div className="images">
                <img className="flow-image 0" src="/userfiles/images/africa.png" />
              </div>
            </div>
          <section className="section contact">
            <h1 className="section_title">
              <div className="section_title_jp">CONTACT</div>
            </h1>         
            <div className="section_content contact_content">
            <form onSubmit={submit} className="form_control" id="form">
                <div className="form_control_item">
                    <label htmlFor="email">名前</label>
                    <TextInput
                            id="user_name"
                            type="text"
                            name="email"
                            className="form_control_item_input"
                            autoComplete="username"
                            isFocused={true}
                            value={data.user_name}
                            onChange={handleChange}
                        />
                </div>
                <div className="form_control_item">
                    <label htmlFor="email">アドレス</label>
                    <TextInput
                            id="user_email"
                            type="email"
                            name="email"
                            className="form_control_item_input"
                            autoComplete="username"
                            isFocused={true}
                            value={data.user_email}
                            onChange={handleChange}
                        />
                </div>

                <div className="form_control_item">
                    <label htmlFor="subject">件名</label>
                    <TextInput
                            id="subject"
                            type="text"
                            name="email"
                            className="form_control_item_input"
                            autoComplete="subject"
                            isFocused={true}
                            value={data.subject}
                            onChange={handleChange}
                        />
                </div>
               
                <div className="form_control_item">
                    <label htmlFor="content">内容</label>
                    <textarea id="content" className="form_control_item_input" rows="10" name="content"
                            required
                            onChange={handleChange}
                            value={data.content}
                    ></textarea>
                </div>
                      
                <button disabled={processing} className="form_control_item_submit" >
                  送信
                </button>
            </form>

            </div>
          </section>
  </GuestLayout>
  </>
  );
}


