import { Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { TypeListCard } from '@/types/listCardCampaign.type';
import { useRouter } from 'next/router';
import SelectShadow from '../common/BasicSelect/SelectShadow';
import CardItem from '../CampaignCardItem/CardItem';
import BasicPaination from '../common/BasicPaination';

function ListCampaign() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>('');
  useEffect(() => {
    if (router.query.filter) {
      setFilter(String(router.query.filter));
    }
  }, [router.query.filter]);

  const listCard = useMemo<TypeListCard[]>(() => {
    const data: TypeListCard[] = [
      {
        nameCompany: '組織名',
        popularity: 3,
        date: '12/10 11:00 〜 12/30 15:00',
        type: 'default',
        description: '管理画面で設定した「報酬要約文」が入ります（最大100文字）ここにテキストが入りま...',
        id: '1',
        title: 'キャンペーンタイトルが入ります',
        avatar:
          'https://s3-alpha-sig.figma.com/img/2584/ee0c/6cd054f66b4bd53b1386637330c087fe?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pF4aVfPbiQxd1MKv~006K2ocQsE2DH5SSSRKzZCu48QNJU7L6JY6nytrufYUwqJm5A3kzKyEIIR4GvQc5wcQ7Y1-cOekHhntxIEc1V9qDpTnrjkOoXKbQffvRLfXGTtzFGFJ~AdECLDUBhd91fxFoTlT4dlO5CiRbhl3JVDrrDOI6ujL~acp3QwMjAc75n~1IpDMbULOWp64wHw-GkT7cBJ9DBsFP0nQ7ZXJWzMn8Z-w~5bJ49QsnIsFMCbtGEGR88sAyEerqPWaFmqmEAK9AjLl890776flVL3C94GyUNGM4ET6KjTAL8BhWgqkwqdUFwam-vWvBLhRVyX6zx2pcQ__',
      },
      {
        nameCompany: '組織名',
        popularity: 2,
        date: '12/10 11:00 〜 12/30 15:00',
        type: 'Instant',
        reWard: '100円 〜 1,000,000円',
        winnerSlot: 100,
        id: '2',
        title: 'キャンペーンタイトルが入ります',
        avatar:
          'https://s3-alpha-sig.figma.com/img/ebfd/3fa1/0b189d2eca0160a1fadb13e997c809e6?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BcJyRkdlbUkILR7NQ-MBduh2uckRPmhBQnRtg-zW038Lfp5PgPaYRG9Aagkmqvl1fVQCR47Ur8fvbrvpFKa~zWEFNLh6X2l3KtCQOJL8KDjGLw-qgU73e42pcT8aVXFQP0cM5LL5urcgIpgz89SlrOkZaj9hePKCUDyWjWAOX2wHJTld1KvrjrI-RkBANHcfSrcTbaX0e5nGOL0qnWkKXn2GCZL3WyXvOKQM6ketxGtVc5GwP1nms8K3NuGoFDaPmXu6DFIDjgiunp8jiZ8E55gNnmmxvyDLO~qJkS6jhS7nTZyU4vpiqo8UnOh2hHUPmo0Yr6jxP9mys6Nngez83A__',
      },
      {
        nameCompany: '組織名',
        popularity: 4,
        date: '12/10 11:00 〜 12/30 15:00',
        type: 'default',
        description: '管理画面で設定した「報酬要約文」が入ります（最大100文字）ここにテキストが入りま...',
        id: '3',
        title: 'キャンペーンタイトルが入ります',
        avatar:
          'https://s3-alpha-sig.figma.com/img/0bc5/f750/8410b5f8d7dd01ceeb8355778eecac18?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SxvhdjzotjgOMbY80H1eY~i9e~j3A0ASNSluljmbeisARQt6BADYux-0o8oRRdbR~gRpxqKqLhO6OT81RlC9z0cfXsu7T-nchp0AkFXPEFzeHrfVs6OSSNrn6T6xy-BfG7OB5g3OoWWRO9jGktN~Syuh5UTTtWQ8sRS7wu2G44bOT8BR0wjs3SIkVtb~P9nTAqh5nZRjuoCx262yLw1bp7ZYC-ebAicygGqUUt4WpHgBTpQrBeEzCkB8a~xUUMQ2Ig4trrUXlr1uQjNRZnep2nSfoSUH9Rw7w3kOlKWsh7QlfB6hkvXMCq5Ho2BICWHklCqmL9S91vz12fSdPr-iaA__',
      },
      {
        nameCompany: '組織名',
        popularity: 1,
        date: '12/10 11:00 〜 12/30 15:00',
        type: 'Instant',
        reWard: '100円 〜 1,000,000円',
        winnerSlot: 100,
        id: '4',
        title: 'キャンペーンタイトルが入ります',
        avatar:
          'https://s3-alpha-sig.figma.com/img/ebfd/3fa1/0b189d2eca0160a1fadb13e997c809e6?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BcJyRkdlbUkILR7NQ-MBduh2uckRPmhBQnRtg-zW038Lfp5PgPaYRG9Aagkmqvl1fVQCR47Ur8fvbrvpFKa~zWEFNLh6X2l3KtCQOJL8KDjGLw-qgU73e42pcT8aVXFQP0cM5LL5urcgIpgz89SlrOkZaj9hePKCUDyWjWAOX2wHJTld1KvrjrI-RkBANHcfSrcTbaX0e5nGOL0qnWkKXn2GCZL3WyXvOKQM6ketxGtVc5GwP1nms8K3NuGoFDaPmXu6DFIDjgiunp8jiZ8E55gNnmmxvyDLO~qJkS6jhS7nTZyU4vpiqo8UnOh2hHUPmo0Yr6jxP9mys6Nngez83A__',
      },
      {
        nameCompany: '組織名',
        popularity: 6,
        date: '12/10 11:00 〜 12/30 15:00',
        type: 'default',
        description: '管理画面で設定した「報酬要約文」が入ります（最大100文字）ここにテキストが入りま...',
        id: '5',
        title: 'キャンペーンタイトルが入ります',
        avatar:
          'https://s3-alpha-sig.figma.com/img/0bc5/f750/8410b5f8d7dd01ceeb8355778eecac18?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SxvhdjzotjgOMbY80H1eY~i9e~j3A0ASNSluljmbeisARQt6BADYux-0o8oRRdbR~gRpxqKqLhO6OT81RlC9z0cfXsu7T-nchp0AkFXPEFzeHrfVs6OSSNrn6T6xy-BfG7OB5g3OoWWRO9jGktN~Syuh5UTTtWQ8sRS7wu2G44bOT8BR0wjs3SIkVtb~P9nTAqh5nZRjuoCx262yLw1bp7ZYC-ebAicygGqUUt4WpHgBTpQrBeEzCkB8a~xUUMQ2Ig4trrUXlr1uQjNRZnep2nSfoSUH9Rw7w3kOlKWsh7QlfB6hkvXMCq5Ho2BICWHklCqmL9S91vz12fSdPr-iaA__',
      },
    ];
    if (filter === '人気順') {
      data.sort((a, b) => a.popularity - b.popularity);
    }
    return data;
  }, [filter]);
  return (
    <div className="px-[20px] py-[40px] bg-[#D5FFFF] ">
      <Form onValuesChange={(e, v) => router.replace({ query: v })}>
        <Form.Item initialValue="人気順" name="filter">
          <SelectShadow
            options={[
              { label: '人気順', value: '人気順' },
              { label: '新着順', value: '新着順' },
              { label: '報酬額順', value: '報酬額順' },
            ]}
          />
        </Form.Item>
      </Form>
      <div className="flex flex-col space-y-[16px] pb-[32px]">
        {listCard.map((item) => (
          <CardItem item={item} key={item.id} />
        ))}
      </div>
      <BasicPaination total={20} />
    </div>
  );
}

export default ListCampaign;
