/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import dayjs from 'dayjs';

import { useSocketContext } from '@/context/SocketContext';
import { NotificationType } from '@/redux/endpoints/auth';
import { MetaDataType } from '@/redux/endpoints/teacher/class';

import TeacherAddNotificationModal from './TeacherAddNotificationModal';

interface PropsType {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const TeacherNotificationModal = ({ open, setOpen }: PropsType) => {
  const { socket } = useSocketContext();

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [metadata, setMetadata] = useState<MetaDataType>({});
  const [page, setPage] = useState(1);
  const [openAddNotiModal, setOpenAddNotiModal] = useState(false);

  useEffect(() => {
    socket.emit('teacher-get-notifications', { page, limit: 100 });
  }, [page]);

  useEffect(() => {
    socket.on('refresh-notification', (notification) => {
      setNotifications(
        notification?.data?.map((item) => ({
          id: item?.id,
          createdAt: item?.createdAt,
          body: item?.body,
          class: {
            id: item?.class?.id,
            name: item?.class?.name,
          },
          assignment: {
            id: item?.assignment?.id,
            name: item?.assignment?.name,
          },
        }))
      );
      setMetadata({
        total: notification?.metadata?.total,
        page: notification?.metadata?.page,
        totalPage: notification?.metadata?.totalPage,
      });
    });

    socket.on('new-notification', (notification) => {
      console.log('New notification', notification);
    });
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const fetchMore = () => {
    if (notifications?.length < Number(metadata?.total)) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <Drawer closable={false} onClose={onClose} open={open} placement="right" title="Notification">
        <div className="flex justify-end mb-5">
          <Button onClick={() => setOpenAddNotiModal(true)}>Send Notification</Button>
        </div>
        <InfiniteScroll
          className="flex flex-col gap-y-6"
          dataLength={Number(notifications.length)}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          hasMore
          height={700}
          loader={<h4>...</h4>}
          next={fetchMore}
        >
          {notifications?.map((item) => (
            <div className="py-4 px-3 rounded shadow-md" key={item?.id}>
              <div className="">{item?.body}</div>
              <div className="text-end text-[11px] text-[#80888F]">{dayjs(item?.createdAt).format('YYYY-MM-DD')}</div>
            </div>
          ))}
        </InfiniteScroll>
      </Drawer>

      {openAddNotiModal && (
        <TeacherAddNotificationModal
          openModal={openAddNotiModal}
          setNotifications={setNotifications}
          setOpenModal={setOpenAddNotiModal}
        />
      )}
    </div>
  );
};

export default TeacherNotificationModal;
