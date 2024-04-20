import { useMutation } from '@tanstack/react-query';
import { EzIconButton, useFormContext, useToast } from '@ease-trip/easy-ui';
import { checkEmail } from '@/api/auth';

interface CheckEmailButtonProps {
  isCheck: boolean;
  onChange: (isExisting: boolean) => void;
}

export default function CheckEmailButton({ isCheck, onChange }: CheckEmailButtonProps) {
  const methods = useFormContext();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: checkEmail,
    onSuccess: ({ isExisting }) => {
      onChange(!isExisting);
      if (isExisting) {
        toast.error('The email address is not registered. Please check the email address again.');
      }
    },
  });

  return (
    <EzIconButton
      className={isCheck ? 'text-green-500' : ''}
      name={isCheck ? 'CheckCircleOutline' : 'LiveHelp'}
      onClick={() => {
        const email = methods.getValues('email') as string;
        mutation.mutateAsync({ email });
      }}
    />
  );
}
