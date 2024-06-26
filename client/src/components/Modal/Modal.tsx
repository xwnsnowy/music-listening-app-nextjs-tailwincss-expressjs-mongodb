import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title?: string | null;
  description?: string | null;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onChange,
  title,
  description,
}) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogContent className="fixed drop-shadow-md border border-neutral-700 max-h-full h-full md:h-auto md:max-h-[95vh] w-full md:w-[90vw] md:max-w-[450px] rounded-md bg-neutral-800 p-5 focus:outline-none">
        <DialogHeader>
          {title && (
            <DialogTitle className="text-primaryColor text-center text-xl font-bold">
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
