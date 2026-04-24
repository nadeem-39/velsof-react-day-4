import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import instance from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ReactElement } from "react";
interface bookDataTemplate {
  author: string;
  id: number;
  title: string;
}

const DeleteBookDialog = (book: bookDataTemplate): ReactElement => {
  const queryClient = useQueryClient();
  const deleteStudentMutatation = useMutation({
    mutationFn: (id: Number) => instance.delete(`/book/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast(`Successfully deleted`, {
        position: "top-center",
      });
    },

    onError: () => {
      toast(`Could not delete`, {
        position: "top-center",
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger
        key={book.id}
        className="  border p-2 pl-5 pr-5 rounded cursor-pointer"
        onClick={() => {}}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {book.title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteStudentMutatation.mutate(book.id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteBookDialog;
