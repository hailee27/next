/* eslint-disable max-lines-per-function */
/* eslint-disable no-irregular-whitespace */
import Link from 'next/link';
import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="px-[20px] max-w-[820px] mx-auto text-justify">
      <div className="flex flex-col items-center space-y-[32px] mt-[40px]">
        <h1 className="text-[28px] font-bold text-[#04AFAF]">プライバシーポリシー</h1>
        <p className="text-[13px] text-[#777] leading-[22px]">
          このプライバシーポリシー（以下「本プライバシーポリシー」といいます。）は、株式会社clout（以下「当社」といいます。）における個人情報の取り扱い方針に関し定めるものです。
        </p>
      </div>
      <div className="h-[24px]" />
      <ol className="list-decimal list-inside text-[#777] text-[13px]   leading-[22px] flex flex-col space-y-[24px]">
        <li className="font-bold">
          <span>定義等</span>

          <p className="  font-normal">
            本プライバシーポリシーにおいて、「個人情報」「個人データ」その他「個人情報の保護に関する法律」（平成15年法律第57号。以下「法」といいます。）に定義される語の意義は、法の定義するところによります。
          </p>
        </li>
        <li className="font-bold">
          <span>取得する情報及びその利用目的</span>

          <ul className=" pl-[14px] font-normal space-y-[8px]">
            <li className="mt-[8px]">
              <span className="font-medium">
                2.1　当社は、当社の事業活動に関連し、以下の個人情報を取得する場合があります。
              </span>
              <ul className="list-disc list-inside ml-[14px]">
                <li>氏名、会社名、部署、役職、住所、電話番号、メールアドレス</li>
                <li>SNSのユーザID及びプロフィール画像</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">2.2　当社が取得する個人情報の利用目的は以下の通りです。</span>
              <ul className="list-disc list-inside ml-[14px]">
                <li>当社サービスの提供</li>
                <li>当社サービスに関連する問い合わせへの対応及びユーザへの連絡</li>
                <li>当社サービスの利用状況の分析及び改善、新サービスの開発</li>
                <li>当社サービスに関する広告及びマーケティング</li>

                <li>当社サービスの不正利用の検知及び予防</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">
                2.3　当社は、当社サービスの利用者及び当社ウェブサイトの訪問者から、以下の情報を取得する場合があります。
              </span>
              <ul className="list-disc list-inside ml-[14px]">
                <li>アクセス元のIPアドレス、タイムスタンプ、ユーザーエージェント、クッキー／広告識別子、リファラ等</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">
                2.4　当社は、サービス料金の決済のために外部の決済サービスを利用する場合があります。その場合、決済情報は当該決済サービスにおいて保持され、当社はこれを取得しません。
              </span>
            </li>
          </ul>
        </li>
        <li className="font-bold">
          <span>個人データの第三者への提供等</span>

          <ul className=" pl-[14px] font-normal space-y-[8px]">
            <li className="mt-[8px]">
              <span className="font-medium">3.1　個人データの第三者への提供</span>
              <p className=" font-normal">
                当社は、本プライバシーポリシーに別途規定する場合のほか、以下の各号に定める場合を除いて、お客様の個人データを第三者に提供しません。
              </p>
              <p className="ml-[14px]">
                (1)　
                <span>
                  キャンペーンに応募した参加者の情報を主催者に提供する場合であって、あらかじめ参加者の同意を得ているとき{' '}
                </span>
                <br />
                (2)　前号のほか、あらかじめお客様の同意を得た場合
                <br />
                (3)　法令に基づく場合
                <br />
                (4)　
                人の生命、身体又は財産の保護のために必要がある場合であって、お客様本人の同意を得ることが困難であるとき
                <br />
                (5)　
                公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、お客様本人の同意を得ることが困難であるとき
                <br />
                (6)　
                国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、お客様本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
              </p>
            </li>
            <li>
              <span className="font-medium">3.2　個人データの取扱いの委託</span>
              <ul className=" ml-[14px] space-y-[8px]">
                <li>
                  3.2.1　
                  当社は、当社サービスの運営にあたり、利用目的の達成に必要な範囲内において、お客様の個人データの取り扱いの全部又は一部を第三者に委託することがあります。この場合、当社は当該委託先に対して必要かつ適切な監督を行います。
                </li>
                <li>
                  3.2.2　
                  当社は、個人情報取扱事業者が講ずべきこととされている措置に相当する措置を講じている外国にある第三者に個人情報を提供するときは、当該措置の継続的実施を確保するために必要な措置を講じています。当該措置の詳細については、本プライバシーポリシー末尾のお問い合わせ窓口までご連絡ください。
                </li>
              </ul>
            </li>
            <li>
              <span className="font-medium">3.3　個人データの共同利用</span>
              <p>当社は、個人情報の共同利用を行っておりません。</p>
            </li>
            <li>
              <span className="font-medium">3.4　外部のウェブサイト</span>
              <p>
                当社のウェブサイト又はサービスからリンクされた外部のウェブサイト又はサービスにおける個人情報の取扱いについては、当該ウェブサイト又はサービスのプライバシーポリシー等をご確認ください。
              </p>
            </li>
            <li>
              <span className="font-medium">3.5　Google Analytics等の利用</span>
              <p>
                当社は、当社のウェブサイト又はサービスの改良等を目的としてその利用頻度等を測定するために、Google
                LLCの提供するサービスであるGoogle Analytics又はFirebase（以下「Google
                Analytics等」といいます。）を利用する場合があります。Google
                Analytics等はCookieを使用して匿名のトラフィックデータを収集しています。この行為によりお客様個人が特定されることはありません。Google
                Analytics等の収集する情報およびその取扱いについては、同社のプライバシーポリシーおよび「Google
                のサービスを使用するサイトやアプリから収集した情報の Google による使用」のページ
                <Link className="text-[#04AFAF]" href="https://policies.google.com/technologies/partner-sites?hl=ja">
                  （https://policies.google.com/technologies/partner-sites?hl=ja）
                </Link>
                をご参照ください。
              </p>
            </li>
            <li>
              3.6　利用者情報の外部送信
              <p>当社が利用者情報の外部送信に関して公表する事項は以下のとおりです。</p>
              <div className=" overflow-x-auto mt-[8px]">
                <table>
                  <thead>
                    <tr>
                      <th className="p-[8px] border-[1px] border-[#333] w-[20%] min-w-[150px]">外部送信先 事業者名</th>
                      <th className="p-[8px] border-[1px] border-[#333] w-[20%] min-w-[150px]">
                        外部送信先 サービス名
                      </th>
                      <th className="p-[8px] border-[1px] border-[#333] w-[20%] min-w-[150px]">外部送信の目的</th>
                      <th className="p-[8px] border-[1px] border-[#333] w-[20%] min-w-[150px]">外部送信する情報</th>
                      <th className="p-[8px] border-[1px] border-[#333] w-[20%] min-w-[150px]">外部送信の停止等</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-[8px] border-[1px] border-[#333]">
                        <span>Google LLC</span>
                      </td>
                      <td className="p-[8px] border-[1px] border-[#333]">
                        <span>Google Analytics</span>
                      </td>
                      <td className="p-[8px] border-[1px] border-[#333]">
                        お客様のアクセスを解析し、
                        <br /> サービスの改善に役立てるため
                      </td>
                      <td className="p-[8px] border-[1px] border-[#333]">
                        アクセス回数、滞在時間、利用環境、地域ごとの利用者数、流入経路、検索語等
                      </td>
                      <td className="p-[8px] border-[1px] border-[#333] text-[#04AFAF]">
                        <Link
                          className="flex gap-[8px]"
                          href="https://analytics.google.com/analytics/web/provision/#/provision"
                        >
                          <span>&#x2713;</span>
                          サービスサイト
                        </Link>{' '}
                        <br />
                        <Link className="flex gap-[8px]" href="https://policies.google.com/privacy">
                          <span>&#x2713;</span> プライバシーポリシー
                        </Link>
                        <br />
                        <Link className="flex gap-[8px]" href="https://tools.google.com/dlpage/gaoptout/">
                          <span>&#x2713;</span> オプトアウト
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </li>
        <li className="font-bold">
          <span>安全管理措置</span>
          <p className="  font-normal">
            当社は、当社の取り扱う個人データの漏えい、滅失又はき損の防止その他の個人データの安全管理のために必要かつ適切な措置を講じます。当社が講じる安全管理措置については、本プライバシーポリシー末尾のお問い合わせ窓口までご連絡ください。
          </p>
        </li>
        <li className="font-bold">
          <span>開示、訂正等の求めに応じる手続</span>
          <p className="  font-normal">
            当社は、保有個人データについて、法令に従い、本人又はその代理人からの利用目的の通知、開示、変更等（内容の訂正、追加又は削除）、利用停止等（利用の停止又は消去）、第三者への提供の停止の求めに対応させていただきます。これらをご希望される場合、本プライバシーポリシー末尾のお問合せ窓口までご連絡下さい。
          </p>
        </li>
        <li className="font-bold">
          <span>改定</span>
          <p className="  font-normal">
            本プライバシーポリシーは、改定されることがあります。改定に当たって、当社は、改定後の本プライバシーポリシーを当社が別途指定する方法で表示し、改定した旨の通知をお客様に対して当社が指定する方法により通知します。
          </p>
        </li>
        <li className="font-bold">
          <span>個人情報取扱事業者について</span>
          <p className="  font-normal">
            当社の住所、名称及び代表者の氏名は下記の通りです。 東京都港区南青山3丁目1番36号青山丸竹ビル6F 株式会社clout
            代表取締役　岩島　慶
          </p>
        </li>
        <li className="font-bold">
          <span>お問い合わせ</span>
          <p className="  font-normal">
            当社の保有個人データの取扱いに関する苦情のお申し出その他本プライバシーポリシーに関するお問い合わせは、{' '}
            <span>【問い合わせフォームのURL、メールアドレス等を記載】</span>
            までご連絡ください。
          </p>
        </li>
      </ol>

      <div className="mt-[72px] text-right text-[#777] mb-[56px]">2024年4月1日 制定</div>
    </div>
  );
}

export default PrivacyPolicyPage;
