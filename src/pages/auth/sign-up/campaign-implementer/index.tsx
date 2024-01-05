/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ConnectXModal from '@/components/auth/ConnectXModal';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import { useLoginMutation, useRecaptchaVerifyMutation, useTwitterAuthMutation } from '@/redux/endpoints/auth';
import { SMS_CASE } from '@/utils/constant/enums';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { LoginFormData, loginSchema } from '@/utils/schema/login-email';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

export default function CampaignImplementerSignin() {
  return (
    <div className="min-h-[100vh] bg-[#D5FFFF] py-[40px] px-[20px]">
      <h1 className="text-[20px] font-bold tracking-[0.6px] text-center text-[#04AFAF]">新規会員登録</h1>
      <div className="h-[36px]" />
      <div>
        <div className="px-[24px] py-[14px] border-[2px] border-[#333] rounded-t-[16px] flex items-center justify-center bg-[#333] text-white text-[18px] font-bold">
          キャンペーン参加者の方
        </div>
        <div className="border-[2px] border-[#333] rounded-b-[16px] px-[22px] py-[38px]">
          <ConnectXModal actionType="SIGNUP" buttonLabel="X（twitter）を連携する" />
          <div className="h-[16px]" />
          <p className="text-gray-1 text-[13px] leading-[22px] tracking-[0.39px]">
            ※キャンペーンに参加するにはXでの連携が必要です。
          </p>
        </div>
      </div>
      <div className="h-[16px]" />
      <div>
        <div className="px-[24px] py-[14px] border-[2px] border-[#333] rounded-t-[16px] flex items-center justify-center bg-[#333] text-white text-[18px] font-bold">
          キャンペーン作成者の方
        </div>
        <div className="border-[2px] border-[#333] rounded-b-[16px] px-[22px] py-[38px]">
          <form autoComplete="off" className="flex flex-col gap-[16px] max-w-[327px] mx-auto items-center">
            <div className="w-full">
              <CFormInputShadow name="email" placeholder="メールアドレスを入力" />
              <div className="h-[8px]" />
              <CFormInputShadow name="password" placeholder="パスワードを入力" type="password" />
            </div>

            {/* eslint-disable-next-line react/jsx-no-bind */}
            <ReCAPTCHA onChange={() => {}} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />

            <div className="w-full h-[53px]">
              <CButtonShadow
                isDisable
                textClass="text-white text-[14px] font-notoSans"
                title="ログインする"
                type="submit"
                // classBgColor={isDisableSubmit ? "#c2c2c2" : "#333"}
                // classBorderColor={isDisableSubmit ? "#c2c2c2" : "#333"}
              />
            </div>
            <div>
              <p className="text-[13px] text-gray-1 leading-[22px]">
                ※キャンペーンを作成するにはメールアドレス/パスワードでの登録が必要です。
              </p>
              <p className="text-[13px] text-gray-1 leading-[22px]">
                ※続行することにより利用規約およびプライバシーポリシーに同意したものとみなされます。
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="h-[32px]" />
      <div className="flex items-center justify-center">
        <Link
          className="flex items-center justify-center gap-[4px] text-[13px] font-bold pb-[6px] border-b-[2px] border-b-[#333] cursor-pointer"
          href="/auth/sign-in/campaign-implementer"
        >
          ログインの方はこちら
          <ArrowDown className="rotate-[-90deg]" />
        </Link>
      </div>
    </div>
  );
}
