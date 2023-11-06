import React from 'react';
import { Radar,RadarChart, PolarGrid,Tooltip, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { LineChart ,CartesianGrid,XAxis,YAxis,Legend,Line } from 'recharts';



const enginerSkill = [
  {
    subject: 'CODING',
    A: 4.0,
    fullMark: 5,
  },
  {
    subject: 'Front',
    A: 3.3,
    fullMark: 5,
  },
  {
    subject: 'Back',
    A: 3,
    fullMark: 5,
  },
  {
    subject: 'Mobile App',
    A: 1.5,
    fullMark: 5,
  },
  {
    subject: 'CMS',
    A: 4,
    fullMark: 5,
  },
  {
    subject: 'DB',
    A: 2.75,
    fullMark: 5,
  },
  {
    subject: 'SNS API',
    A: 3,
    fullMark: 5,
  },
];

const frontSkill = [
    {
      subject: 'HTML/CSS/SASS',
      A: 4,
      fullMark: 5,
    },
    {
      subject: 'JavaScript',
      A: 4,
      fullMark: 5,
    },
    {
      subject: 'jQuery',
      A: 4,
      fullMark: 5,
    },
    {
      subject: 'Google App Script',
      A: 4,
      fullMark: 5,
    },
    {
      subject: 'React',
      A: 3,
      fullMark: 5,
    },
    {
      subject: 'RN',
      A: 1.5,
      fullMark: 5,
    },

  ];


const backSkill = [
  {
    subject: 'PHP',
    A: 2.5,
    fullMark: 5,
  },
  {
    subject: 'Laravel',
    A: 3.5,
    fullMark: 5,
  },
  {
    subject: 'Wordpress',
    A: 3.0,
    fullMark: 5,
  },
  {
    subject: 'mySQL',
    A: 3,
    fullMark: 5,
  },
  {
    subject: 'firebase',
    A: 2.5,
    fullMark: 5,
  },
  {
    subject: 'API',
    A: 3,
    fullMark: 5,
  },
];


const otherSkill = [
  {
    subject: 'PSD',
    A: 3.0,
    fullMark: 5,
  },
  {
    subject: 'XD',
    A: 4.0,
    fullMark: 5,
  },
  {
    subject: 'AI',
    A: 2.5,
    fullMark: 5,
  },
  {
    subject: 'git',
    A: 4,
    fullMark: 5,
  },
  {
    subject: 'gulp',
    A: 4,
    fullMark: 5,
  },
  {
    subject: 'webpack',
    A: 3,
    fullMark: 5,
  },

];

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {getIntroOfPage(label)}
          </p>  
        </div>
      );
    } 
    return null;
  }
  const getIntroOfPage = (label) => {
    switch(label){
      case "CODING":
        return(
          <>
           HTML5/ CSS3/ SASS/ Responsive<br/>
          </>
        );
      case "Front":
        return(
          <>
          JS/ jQuery/ Google Apps Script/ React <br/>  
          </>
        );
      case "Back":
        return (
          <>
            PHP/ Laravel<br />
          </>
        );
      case "CMS":
        return(
          <>
            Wordpress<br />
          </>
  
        );
      case "Mobile App":
        return(
          <>
            React Native<br />          
          </>
        );
      case "DB":
        return(
          <>
            mySQL/ firebase<br />
            
          </>
        );
      case "SNS API":
        return(
          <>
            Twitter/ Instagram<br />           
          </>
        );
      case "HTML/CSS/SASS":
        return(
          <>
            疑似要素/ ポジション/ ransition/ animation/ filter<br />
            リファレンスなしで基本的に実装可能
            
          </>
        );
      case "JavaScript":
        return(
          <>
            タブ/ アコーディオン/ スライダー/ プルダウン/ イベント/ 非同期 <br />
            繰り返し/条件分岐/配列など基本は習得済
          </>
        );
      case "jQuery":
        return(
          <>
            jsと同じ理解度<br />
                      
          </>
        );
      case "Google App Script":
        return(
          <>
            onOpen/ onEdit/ SpreadSheeptApp / Webアプリ <br />
            jsで一番得意｡SpreadSheetsと連携し､WEBアプリ作成経験あり
          </>
        );
      case "React":
        return(
          <>
           JSX/ Babel/ useState/ useEffect/ SPA/ Render<br />
           クラスコンポーネントの理解もあるが､16.8以降基本はフックのみ使用
            
          </>
        );
      case "RN":
        return(
          <>
            一度触れたことがあるのみで経験はあまりないが､
            ページの遷移など基本的な理解あり
          </>
        );
      case "PHP":
        return(
          <>
            一度フルスクラッチで､ユーザのCRUD処理を
            一から実装経験あり(一応セキュリティ実装も)          
          </>
        );
      case "Laravel":
        return(
          <>
            <a href='https://hotelier-front.com/'>Hotelier</a>の
            WEBアプリ構築経験あり     
          </>
        );
      case "Wordpress":
        return(
          <>
            自作テーマ作成の経験あり<br />
            基本的なWP特有のPHPの書き方の理解
          </>
        );
      case "mySQL":
        return(
          <>
            SQL構文/ Laravel Eloquentの操作経験あり   
          </>
        );
      case "firebase":
        return(
          <>
            React NativeのDBとして連携経験あり   
          </>
        );
      case "API":
        return(
          <>
            Twitter/ Instagramのapi組み込み経験あり
          </>
        );
      case "PSD":
        return(
          <>
           レイヤーの理解､スライスなど基本的な操作理解あり
          </>
        );
      case "XD":
        return(
          <>
            アニメーション/レイヤー/コンポーネントなどある程度複雑な操作理解あり   
          </>
        );
      case "AI":
        return(
          <>
            PSDより操作経験なし
          </>
        );
      case "gulp":
        return(
          <>
            Frameworkなしの際､関数を作成しホットリロードやSass/jsコンパイルなどの理解あり 
          </>
        );
      case "webpack":
        return(
          <>
            gulpより理解は低いが､リファレンス見ながら操作経験あり   
          </>
        );
      case "git":
        return(
          <>
            sourcetree/コマンドどちらも操作経験あり。   
          </>
        );

      case "2011":
        return(
          <>
            情報システム工学科入学 
          </>
        );
      case "2012":
        return(
          <>
            留学に行きたい気持ちが強まる
          </>
        );
      case "2013":
        return(
          <>
            転学決意、再受験勉強
          </>
        );  
      case "2014":
        return(
          <>
            国際教養学部合格
          </>
        );
      case "2015":
        return(
          <>
            イギリスへ留学
          </>
        );
      case "2016":
        return(
          <>
            帰国
          </>
        );
      case "2017":
        return(
          <>
            就職活動、卒業論文
          </>
        );
      case "2018":
        return(
          <>
            星野リゾート入社
          </>
        );
      case "2019":
        return(
          <>
            河口湖を満喫
          </>
        );
      case "2020":
        return(
          <>
            将来の不安を感じ転職活動
          </>
        );
      case "2021":
        return(
          <>
            転職活動
          </>
        );
      case "2022":
        return(
          <>
            転職し、WEBエンジニアとして勤務
          </>
        );
      case "2023":
        return(
          <>
            人生について思考中
          </>
        );
      default:
    }
    
    return '';
  };

  function EnginerSkillGraph(){
    return (
        <ResponsiveContainer width="100%" height={400}> 
          <RadarChart cx="50%" cy="50%"
            outerRadius="80%"
            data={enginerSkill}
          >
            <Tooltip content={<CustomTooltip />}/>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[1, 5]} />
            <Legend />
            <Radar
              name="Skill"
              dataKey="A"
              stroke="#111"
              fill="#eee"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
    )
  }
  function FrontSKillGraph(){
    return (

        <ResponsiveContainer width="100%" height={400}>
          <RadarChart
            outerRadius="80%"
            data={frontSkill}
          >
            <Tooltip content={<CustomTooltip />}/>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[1, 5]} />
            <Radar
              name="jun"
              dataKey="A"
              stroke="#111"
              fill="#eee"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
    )
  }
  function BackSKillGraph(){
    return (

        <ResponsiveContainer width="100%" height={400} >
          <RadarChart
            outerRadius="80%"
            data={backSkill}
          >
            <Tooltip content={<CustomTooltip />}/>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[1, 5]} />
            <Radar
              name="jun"
              dataKey="A"
              stroke="#111"
              fill="#eee"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
    )
  }

  function OtherSkillGraph(){
    return (
        <ResponsiveContainer width="100%" height={400} >
          <RadarChart
            outerRadius="80%"
            data={otherSkill}
          >
            <Tooltip content={<CustomTooltip />}/>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[1, 5]} />
            <Radar
              name="jun"
              dataKey="A"
              stroke="#111"
              fill="#eee"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
    )
  }

const bidographyData = [

  {
    "year": "2011",
    "Motivation": 80,
  },
  {
    "year": "2012",
    "Motivation": 100,
  },

  {
    "year": "2013",
    "Motivation": 70,
  },
  {
    "year": "2014",
    "Motivation": -50,
  },
  {
    "year": "2015",
    "Motivation": 80,
  },
  {
    "year": "2016",
    "Motivation": 100,
  },
  {
    "year": "2017",
    "Motivation": 30,
  },
  {
    "year": "2018",
    "Motivation": 0,
  },
  {
    "year": "2019",
    "Motivation": 80,
  },
  {
    "year": "2020",
    "Motivation": 70,
  },
  {
    "year": "2021",
    "Motivation": -60,
  },
  {
    "year": "2022",
    "Motivation": 80,
  },
  {
    "year": "2023",
    "Motivation": 20,
  },
]

function MotivationChart(){
  return(
    <ResponsiveContainer width="100%" height={300} >
      <LineChart width={730} height={250} data={bidographyData}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis  dataKey="year" interval={2} padding={{ right: 20 }} />
        <YAxis dataKey="" domain={[-100, 100]} name="test"/>
        <Tooltip content={<CustomTooltip />}/>
        <Legend />
        <Line type="monotone" dataKey="Motivation" stroke="#505050" />
      </LineChart>
    </ResponsiveContainer>
    )
}


export {EnginerSkillGraph,FrontSKillGraph,BackSKillGraph,OtherSkillGraph,MotivationChart};