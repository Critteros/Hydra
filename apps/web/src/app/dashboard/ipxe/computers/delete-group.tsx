'use client';

import { useRouter } from 'next/navigation';

import { useMutation, type ApolloError } from '@apollo/client';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';

import { DeleteButton } from '@/components/buttons/delete-button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { deleteComputerGroupMututation } from './computer-mutations';

type DeleteGroupProps = {
  groupUid: string;
};

export function DeleteGroup({ groupUid }: DeleteGroupProps) {
  const { toast } = useToast();
  const { refresh } = useRouter();

  const [deleteGroup] = useMutation(deleteComputerGroupMututation, {
    variables: { uid: groupUid },
  });

  const handleClick = async () => {
    try {
      await deleteGroup();
      toast({
        title: 'Computer group deleted',
        description: 'The computer group has been deleted',
      });
      refresh();
    } catch (e) {
      const error = e as ApolloError;
      toast({
        title: 'Could not delete computer group',
        description: `${error.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteButton icon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutly sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={handleClick}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
