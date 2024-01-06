import Link from 'next/link';
import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="px-[20px]">
      <div className="flex flex-col items-center space-y-[32px] mt-[40px]">
        <h2 className="text-[28px] font-bold text-[#04AFAF]">プライバシーポリシー</h2>
        <p className="text-[13px] text-[#777] leading-[22px]">
          株式会社cloutここにテキストが入ります。株式会社cloutここにテキストが入ります。株式会社cloutここにテキストが入ります。株式会社cloutここにテキストが入ります。株式会社cloutここにテキストが入ります。
        </p>
      </div>
      <ol className="list-decimal list-inside text-[#777] text-[13px] mt-[48px] leading-[22px] flex flex-col space-y-[24px]">
        <li className="font-bold">
          <span>取得する情報</span>
          <p className="mt-[24px] font-normal">
            弊社グループが「4.取得情報の利用目的」に定める目的を達成するために取得する情報には、次のものが含まれます（以下(1)、(2)および(3)をあわせて「取得情報」とします）。{' '}
          </p>
          <ol className="list-decimal  pl-[22px] font-normal">
            <li>
              弊社グループがお客様から取得する情報個人情報とは、個人情報の保護に関する法律（平成15年法律第57号、以下「個人情報保護法」といいます）2条1項に定める個人情報をいいますが、特に弊社グループにおいて下記は個人情報として扱います。
              <ol className="list-lower-alpha  pl-[20px]">
                <li>氏名、生年月日、性別、ご職業、その他の特定の個人を識別することができる情報</li>
                <li>
                  特定の個人情報に結びついて使用されるご住所、電話番号、アカウント情報（メールアドレスおよびパスワード等をいいます）、ニックネーム等の情報
                </li>
                <li>クレジットカード情報</li>
                <li>個人情報と一体となった趣味、家族構成、年齢その他の個人に関する属性情報</li>
                <li>お客様の本人確認に関する情報</li>
                <li>
                  お客様がFacebook
                  Connectを使用することを許諾し、FacebookのIDおよびパスワードを入力した場合に取得できる名前、ニックネーム、電子メールアドレス、Facebook
                  ID、誕生日、性別、プロフィール画像、Facebook上の友達情報、その他のお客様のFacebook上で登録されている情報
                </li>
                <li>
                  お客様が本サービスに申込みの際および利用の際に弊社グループに届け出た加盟店および出店者等に関する情報
                </li>
              </ol>
            </li>
            <li>
              弊社グループが本サービスの利用に関連して取得する情報個人情報に該当するか否かにかかわらず、本サービスの利用に関する以下の情報を取得します。{' '}
              <ol className="list-lower-alpha  pl-[20px]">
                <li>
                  お客様がご利用になった本サービスの内容、ご利用日時および回数、本サービス利用時のお客様のオンライン行動等、お客様による本サービスの利用・閲覧に関連する情報（これには、Cookie
                  情報、アクセスログ等の利用状況に関する情報、ご利用の端末情報、OS情報、位置情報、そして IP
                  アドレス、ブラウザ情報、ブラウザ言語等を含むお客様の通信に関する情報を含みます）
                </li>
                <li>お客様が本サービスに掲載・発信した投稿、写真、動画、コメント、取引メッセージ、評価その他の情報 </li>
                <li>お客様の本サービスでの決済状況に関する情報</li>
              </ol>
            </li>
            <li>
              弊社グループが業務提携先および第三者から間接的に収集する情報弊社グループは、パブリックDMP事業者、アフィリエイト・サービス・プロバイダ、データ解析事業者、不正利用検知サービスプロバイダ、広告事業者その他の各種サービスプロバイダ等の第三者から取得するお客様に関する識別子（Cookie、ADID/IDFA、IPアドレス等を含みます）、電話番号、メールアドレス、閲覧履歴、位置情報等の行動履歴、趣味嗜好等の情報といった個人情報または個人関連情報を取得し、弊社グループが既に有しているお客様の個人情報と紐づけて、突合・分析する場合があります。{' '}
            </li>
          </ol>
        </li>
        <li className="font-bold">
          <span>取得情報の収集方法</span>
          <p className="mt-[24px] font-normal">
            弊社グループは、本サービスをご利用になるお客様の情報を、以下の方法等により収集します。
          </p>
          <ol className="list-decimal  pl-[22px] font-normal">
            <li>本サービス上でお客様自身に直接ご入力いただく方法</li>
            <li>
              お客様から弊社グループに対し、電子メール、郵便、書面、電話等でご提供いただく方法（弊社グループは、お客様との電話応対時、応対品質向上等のため通話を録音します）
            </li>
            <li>お客様による本サービスの利用・閲覧の際に収集する方法</li>
            <li>
              業務提携先および第三者から間接的に収集する方法これには、以下の方法によるものを含みますがこれらに限られるものではありません。
              <ol className="list-lower-alpha  pl-[20px]">
                <li>
                  お客様が Facebook Connect を使用することを許諾し Facebook の ID
                  およびパスワードを入力した場合に、Facebook からお客様の登録情報を収集する方法
                </li>
                <li>
                  パブリックDMP事業者、アフィリエイト・サービス・プロバイダ、その他の各種サービスプロバイダ等の第三者からお客様の情報を収集する方法{' '}
                </li>
              </ol>
            </li>
            <li>第三者のサービスで表示されるコンテンツの内容を、お客様のご同意のもと、機械的に収集する方法</li>
          </ol>
        </li>
        <li className="font-bold">
          <span>取得情報の共同利用</span>
          <p className="my-[24px] font-normal">
            弊社グループは、「4.
            取得情報の利用目的」の達成に必要な範囲で、取得情報を、弊社グループ各社間で共同利用します{' '}
          </p>
          <ol className="list-decimal  pl-[22px] font-normal">
            <li>共同して利用される情報「1. 取得する情報」に規定されている取得情報</li>
            <li>共同して利用する者の範囲「プライバシーポリシー」の前文に規定されている弊社グループ </li>
            <li>
              共同利用する者の利用目的「4.
              取得情報の利用目的」の達成のためただし、株式会社cloutが、同社の運営するサービスを利用していないお客様の取得情報を共同利用する場合は、その利用目的は本サービス運営上のトラブル解決、不正利用防止や安全性の確保の目的に限定されます。
            </li>
            <li>
              共同利用における管理責任者株式会社cloutの住所・代表者等の情報については、以下をご参照ください。
              <Link href=" https://about.mercari.com/about/company/">
                <span className="text-[#04AFAF] font-medium">https://about.mercari.com/about/company/</span>
              </Link>
            </li>
          </ol>
        </li>
      </ol>
      <div className="mt-[72px] text-right text-[#777] mb-[56px]">2024年1月15日制定</div>
    </div>
  );
}

export default PrivacyPolicyPage;
