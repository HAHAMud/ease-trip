import { useMutation } from '@tanstack/react-query';
import { EzIconButton, useFormContext, useToast } from '@ease-trip/easy-ui';
import { checkEmail } from '@/api/auth';
import { RegisterForm } from '../models';

export default function CheckEmailButton() {
  const { getValues, setValue, watch } = useFormContext<RegisterForm>();
  const emailChecked = watch('emailChecked');

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: checkEmail,
    onSuccess: ({ isExisting }) => {
      if (isExisting) {
        setValue('emailChecked', true);
        toast.error('The email address is registered. Please check the email address again.');
      }
    },
  });

  return (
    <EzIconButton
      className={emailChecked ? 'text-green-500' : ''}
      name={emailChecked ? 'CheckCircleOutline' : 'LiveHelp'}
      onClick={() => {
        const email = getValues('email');
        mutation.mutateAsync({ email });
      }}
    />
  );
}
