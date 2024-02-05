import { useRouter } from 'next/router';
import CreatorRoleModal from './CreatorRoleModal';

export default function CreatorRoleFeedbackModal() {
  const router = useRouter();

  return (
    <div>
      <CreatorRoleModal
        isOpen
        onCancel={() => {
          router.push('/');
        }}
      />
    </div>
  );
}
