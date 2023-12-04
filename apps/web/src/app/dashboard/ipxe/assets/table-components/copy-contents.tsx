import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type CopyContentsProps = {
  contents: string;
  className?: string;
};

export function CopyContents({ contents, className }: CopyContentsProps) {
  const { toast } = useToast();

  const onCopyToClipboard = async () => {
    await navigator.clipboard.writeText(contents);
    toast({
      title: 'Copied',
      description: `The contents has been copied to the clipboard`,
    });
  };

  return (
    <Button variant="ghost" onClick={onCopyToClipboard} className={className}>
      {contents}
    </Button>
  );
}
