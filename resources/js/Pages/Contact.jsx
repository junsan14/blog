import GuestLayout from '@/Layouts/GuestLayout';
import {useForm, router, Head} from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';


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
          <section className="section contact">
            <h1 className="section_title">
              <div className="section_title_jp">CONTACT</div>
            </h1>         
            <div className="section_content contact_content">
            <form onSubmit={submit} className="form_control" id="form">
                <div className="form_control_item">
                    <label htmlFor="email">名前</label>
                    <input  id="user_name" className="form_control_item_input" name="user_name" required
                            value={data.user_name} onChange={handleChange}
                    />
                </div>
                <div className="form_control_item">
                    <label htmlFor="email">アドレス</label>
                    <input  type="email" id="user_email" 
                    className="form_control_item_input" 
                    name="user_email"
                            required
                            value={data.user_email}
                            onChange={handleChange}
                    />
                </div>

                <div className="form_control_item">
                    <label htmlFor="subject">件名</label>
                    <input type="text" id="subject" className="form_control_item_input" name="subject"
                        required
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


