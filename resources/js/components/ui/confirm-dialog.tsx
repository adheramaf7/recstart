import React, { PropsWithChildren } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";

type ConfirmDialogProps = {
    title?: string;
    message?: string;
    cancelText?: string;
    confirmText?: string;
    isOpen: boolean;
    onConfirm: () => void;
    onOpenChange: (isOpen: boolean) => void;
};

function ConfirmDialog({
    title = "Confirm",
    message = "Are you sure to perform this action?",
    isOpen,
    onConfirm,
    onOpenChange,
    cancelText = "Cancel",
    confirmText = "Continue",
}: ConfirmDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ConfirmDialog;
