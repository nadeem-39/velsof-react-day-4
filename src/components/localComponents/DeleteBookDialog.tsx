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
    mutationFn: (id: number) => instance.delete(`/book/${id}`),
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
        className=" cursor-pointer text-danger"
        onClick={() => {}}
      >
        <i className="mdi mdi-circle-off-outline"></i>
      </AlertDialogTrigger>
      <AlertDialogContent className={"bg-gray-100"}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p className="text-xl">
              Are you sure you want to delete{" "}
              <span className="text-red-700">{book.title}</span>
            </p>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteStudentMutatation.mutate(book.id);
            }}
            className={"btn btn-primary"}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteBookDialog;
