'use client'

import { useState, useTransition } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { toast } from "sonner";
import { Trash } from "lucide-react";

const DeleteDialog = ({
    id,
    action
}: {
    id: string,
    action: (id: string) => Promise<{success: boolean, message: string}>
}) => {

    const [open, setOpen] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleDeleteClick = () => {
        startTransition(async () => {
            const res = await action(id);

            if(!res.success) {
                toast.error(res.success)
            } else {
                setOpen(false)
                toast.success(res.message)
            }
        })
    }

    
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className="btn-primary pastel-pink text-pink-700 ml-2 p-3">
                    <Trash/>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can`t be undone 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="bg-white">
                    <AlertDialogCancel className="btn-secondary">
                        Cancel
                    </AlertDialogCancel>
                    <button className="btn-primary pastel-pink text-pink-700 " disabled={isPending} onClick={handleDeleteClick}>
                        {isPending ? 'Deleting...' : <Trash/>}
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default DeleteDialog;