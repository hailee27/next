/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, Layout, Menu, Popover } from 'antd';
import { MenuOutlined, NotificationOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { LayoutContext, LayoutContextInterface } from '@/components/pages/context/LayoutContext';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/auth.slice';
import TeacherNotificationModal from '@/components/pages/Notification/Modal/TeacherNotificationModal';
import StudentNotificationModal from '@/components/pages/Notification/Modal/StudentNotificationModal';
import { useSocketContext } from '@/context/SocketContext';

const { Sider } = Layout;

function PrimaryLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);

  const { collapsed, setCollapsed } = useContext<LayoutContextInterface>(LayoutContext);
  const { socket } = useSocketContext();

  const checkRole = auth?.teacher?.id ? 'TEACHER' : 'STUDENT';

  const router = useRouter();

  const [activeMenu, setActiceMenu] = useState(['']);
  const [openNotification, setOpenNotification] = useState(false);
  const [messageUnRead, setMessageUnRead] = useState(0);

  useEffect(() => {
    socket.on('count-message-unread', (msg) => {
      setMessageUnRead(msg?.count);
    });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  //   useEffect(() => {
  //     if (location.pathname == '/login') {
  //       router.push('/');
  //     }
  //   }, []);

  // useEffect(() => {}, [location]);

  const svgIcon = (
    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 14H8V10H4V14ZM10 14H14V10H10V14ZM4 8H8V4H4V8ZM10 8H14V4H10V8ZM2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H16V2H2V16Z"
        fill="black"
      />
    </svg>
  );

  const menuItems: any = [
    {
      key: 'teacher_management',
      label: 'Teacher',
      type: 'group',
      authority: ['TEACHER'],
      children: [
        {
          key: 'item_class',
          icon: svgIcon,
          label: 'Class',
          authority: ['TEACHER'],
          onClick: () => {
            router.push('/teacher/class');
          },
        },
        {
          key: 'item_assignment',
          icon: svgIcon,
          label: 'Assignment',
          authority: ['TEACHER'],
          onClick: () => {
            router.push('/teacher/assignment');
          },
        },
        {
          key: 'item_teacher_student',
          icon: svgIcon,
          label: 'Student',
          authority: ['TEACHER'],
          onClick: () => {
            router.push('/teacher/student');
          },
        },
        {
          key: 'item_question_bank',
          icon: svgIcon,
          label: 'Question Bank',
          authority: ['TEACHER'],
          onClick: () => {
            router.push('/teacher/question-bank');
          },
        },
        {
          key: 'item_teacher_message',
          icon: svgIcon,
          label: 'Message',
          authority: ['TEACHER'],
          onClick: () => {
            router.push('/teacher/message');
          },
        },
      ],
    },
    {
      key: 'student_management',
      label: 'Student',
      type: 'group',
      authority: ['STUDENT'],
      children: [
        {
          key: 'item_student_class',
          icon: svgIcon,
          label: 'Class',
          authority: ['STUDENT'],
          onClick: () => {
            router.push('/student/class');
          },
        },
        {
          key: 'item_student_assignment',
          icon: svgIcon,
          label: 'Assignment',
          authority: ['STUDENT'],
          onClick: () => {
            router.push('/student/assignment');
          },
        },
        {
          key: 'item_student_practice',
          icon: svgIcon,
          label: 'Practice',
          authority: ['STUDENT'],
          onClick: () => {
            router.push('/student/practice');
          },
        },
        {
          key: 'item_student_message',
          icon: svgIcon,
          label: 'Message',
          authority: ['STUDENT'],
          onClick: () => {
            router.push('/student/message');
          },
        },
      ],
    },
  ];

  const menuItemsRenderGroup = menuItems?.filter((e: any) => !e.authority || e.authority?.includes(checkRole));
  const menuItemsRenderChildren = menuItemsRenderGroup?.map((e: any) => {
    if (!e.children) {
      return e;
    }
    const newChildren = e.children?.filter((ele: any) => !ele.authority || ele.authority?.includes(checkRole));
    return { ...e, children: newChildren };
  });

  return (
    <Layout className="min-h-screen w-[100%]">
      <Sider
        className="!bg-white border"
        collapsed={collapsed}
        collapsible
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 99,
        }}
        trigger={null}
      >
        <div className={`!h-[61px] !p-[20px] border-b flex items-center space-x-3 ${collapsed ? '!pl-[26px]' : ''}`}>
          <Button
            icon={<MenuOutlined />}
            // onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 32,
              height: 32,
            }}
            type="text"
          />
          {!collapsed ? (
            <div className="flex justify-between items-center w-full">
              <div
                className="cursor-pointer"
                onClick={() => {
                  router.push('/');
                }}
                role="presentation"
              >
                LOGO
              </div>
              <div className="cursor-pointer" onClick={() => setOpenNotification(true)} role="presentation">
                <NotificationOutlined />
              </div>
            </div>
          ) : null}
        </div>

        <Menu
          className="[&_.ant-menu-item]:!ps-[20px] [&_.ant-menu-item]:flex [&_.ant-menu-item]:items-center"
          items={menuItemsRenderChildren}
          selectedKeys={activeMenu}
          style={{ borderRight: 0 }}
        />

        <Popover
          arrow={false}
          content={
            <div className="w-[200px]">
              <div
                className="p-[6px] font-bold cursor-pointer hover:bg-[#F4F6F7]"
                onClick={() => {
                  if (auth?.teacher?.id) {
                    router.push('/teacher/my-profile');
                  } else {
                    router.push('/student/my-profile');
                  }
                }}
                role="presentation"
              >
                Profile
              </div>

              <div
                className="p-[6px] font-bold cursor-pointer hover:bg-[#F4F6F7]"
                onClick={handleLogout}
                role="presentation"
              >
                Logout
              </div>
            </div>
          }
          placement="top"
        >
          <div className="flex ps-[23px] my-[12px] relative cursor-pointer pb-[20px] items-center space-x-[10px]">
            <div>{svgIcon}</div>
            <div className="font-bold text-[#2f2f2f]">{auth?.teacher?.name || auth?.student?.name || ''}</div>
            <div className="absolute right-[16px]">
              <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <rect
                  fill="white"
                  height="19"
                  rx="2.5"
                  stroke="#DFE5EE"
                  transform="rotate(-180 19.5 19.5)"
                  width="19"
                  x="19.5"
                  y="19.5"
                />
                <path
                  d="M9.28926 6.71811C9.6806 6.32271 10.3194 6.32271 10.7107 6.71811L14.3762 10.4215C15.0012 11.053 14.5539 12.125 13.6655 12.125L6.33455 12.125C5.44612 12.125 4.99884 11.053 5.6238 10.4215L9.28926 6.71811Z"
                  fill="#80888F"
                />
              </svg>
            </div>
          </div>
        </Popover>
      </Sider>

      <Layout style={{ padding: '0 24px 24px', marginLeft: collapsed ? 80 : 200 }}>{children}</Layout>
      {openNotification && auth?.teacher?.id && (
        <TeacherNotificationModal open={openNotification} setOpen={setOpenNotification} />
      )}
      {openNotification && auth?.student?.id && (
        <StudentNotificationModal open={openNotification} setOpen={setOpenNotification} />
      )}

      <div
        className="fixed bottom-[200px] right-[55px] z-[100] cursor-pointer"
        onClick={() => {
          if (auth?.teacher?.id) {
            router.push('/teacher/message');
          } else {
            router.push('/student/message');
          }
        }}
        role="presentation"
      >
        <div className="relative flex items-center justify-center w-[40px] h-[40px] border rounded-full">
          <Image
            alt="msg"
            className="rounded-full w-[40px] h-[40px] z-[-1]"
            height={30}
            preview={false}
            src="https://www.pikpng.com/pngl/m/259-2592784_messenger-facebook-messenger-icon-clipart.png"
            width={30}
          />
          {messageUnRead !== 0 && (
            <div className="absolute top-0 right-0 z-2 w-[15px] rounded-full font-bold text-[#fff] flex items-center justify-center h-[15px] bg-[#f00]">
              {messageUnRead}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PrimaryLayout;
