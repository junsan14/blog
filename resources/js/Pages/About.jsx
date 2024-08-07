import {graphShow} from "@/Script";
import GuestLayout from '@/Layouts/GuestLayout';
import {FrontSKillGraph,BackSKillGraph,OtherSkillGraph} from '@/Components/SkillGraph';
import profile from '../../images/profile.png';
import {Head } from '@inertiajs/react';
export default function About() {
  graphShow();

 
  return (
      <GuestLayout>
            <Head>
              <title>ABOUT</title>
              <meta name="description" content="WEBエンジニアとしてのポートフォリオ､またWEB制作やWEB開発に関わる知識を発信しています" />
            </Head>
            <div className='background'>
              <div className="images">
              </div>
            </div>
            <section className="section about">
              <h1 className="section_title">
                <div className="section_title_jp">ABOUT</div>
              </h1>
                     
              <div className="section_content about_content">
                <h2 className="section_content_title">
                  PROFILE
                </h2>
                <div className="profile">
                  <div className="profile_icon">
                    <img src={profile} className="profile_icon_img" alt="" />
                    <div className="profile_icon_desc">
                      <p >junsan14</p>
                      <p>ホテル業界4年､WEB業界2年</p>
                      <p>JICA海外協力隊2024年第1次隊ルワンダ</p>
                      
                    </div>
                    <div className="profile_icon_desc">
                      <p>好きなもの</p>
                      <p>バスケ,Mac,ドラクエ,自然､海,お酒,温泉</p>

                      
                    </div>
                  </div>
                  <div className="profile_biography">
                    <dl>
                      <dt>1992</dt>
                      <dd>大阪で生まれ､高校まで過ごす</dd>
                      <dt>2011</dt>
                      <dd>大学入学を機に上京､工学部情報システム専攻</dd>
                      <dt>2014</dt>
                      <dd>留学への強い憧れがあり､国際教養学部へ転部</dd>
                      <dt>2016</dt>
                      <dd>ロンドンに留学し、日本の言語/文化交流のコミュニティ JLCE設立し2年弱滞在</dd>
                      <dt>2018</dt>
                      <dd>帰国後、星野リゾートに入社、4年間河口湖のほとりで過ごす</dd>
                      <dt>2022</dt>
                      <dd>転職後､WEBディレクター兼エンジニアとして東京で活動</dd>
                      <dt>2024 Jan-Mar</dt>
                      <dd>JICAグローカルプログラム第3期愛媛県伊予市</dd>
                      <dt>2024 Aug</dt>
                      <dd>青年海外協力隊24年第1期コンピュータ技術 ルワンダ派遣予定</dd>
                    </dl>
                  </div>
                </div>

                <h2 className="section_content_title">
                  SKILL
                </h2>
                <div className="skill">
                  <ul className="skill_tab tab">
                    <li className="skill_tab_li js-skill-tab-li on" tabIndex="-1" name="front">FrontEnd</li>
                    <li className="skill_tab_li js-skill-tab-li" tabIndex="-1" name="back">BackEnd</li>
                    <li className="skill_tab_li js-skill-tab-li" tabIndex="-1" name="other">Adobe/Tools</li>
                  </ul>
                  <div className="skill_content">
                      <div className="skill_content_item js-content-front show">
                        <div className="skill_content_item_graph skill_graph">
                          <FrontSKillGraph />
                        </div>
                        <div className="skill_content_item_desc skill_desc">
                           <p>5: どんな処理も基本的に対応可能</p>
                           <p>4: 実務経験が豊富にあり､人に指南可能</p>
                           <p>3: 1人でリファレンスみながら実装可能</p>
                           <p>2: 基本的な処理の理解あるが､1人では対応困難</p>
                           <p>1: 少し触れたレベルで､スキル向上の余地多くあり</p>
                        </div>
                      </div>
                      <div className="skill_content_item js-content-back">
                        <div className="skill_content_item_graph skill_graph">
                          <BackSKillGraph />
                        </div>
                        <div className="skill_content_item_desc skill_desc">
                           <p>5: どんな処理も基本的に対応可能</p>
                           <p>4: 実務経験が豊富にあり､人に指南可能</p>
                           <p>3: 1人でリファレンスみながら実装可能</p>
                           <p>2: 基本的な処理の理解あるが､1人では対応困難</p>
                           <p>1: 少し触れたレベルで､スキル向上の余地多くあり</p>
                        </div>
                      </div>
                      <div className="skill_content_item js-content-other">
                        <div className="skill_content_item_graph skill_graph">
                          <OtherSkillGraph />
                        </div>
                        <div className="skill_content_item_desc skill_desc">
                           <p>5: Toolマスター</p>
                           <p>4: 実務使用経験があり、複雑な機能も使用可能</p>
                           <p>3: 機能の多くを理解、ある程度1人で操作可能</p>
                           <p>2: 基本的な機能は使用しているが、それまで</p>
                           <p>1: 少し触れたレベルで､機能理解の余地多くあり</p>
                        </div>
                    </div>
                  </div>

                </div>
               
              </div>
            </section>
      </GuestLayout>
  );
}


