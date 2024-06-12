import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">
}

function Banner({
    documentId
}: BannerProps) {

    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        })

        router.push('/documents');
    }

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note."
        })
    }


    return <div className="w-full bg-rose-500 text-center p-2 flex items-center text-white text-sm justify-center gap-x-2">
        <p>This page is in the trash.</p>
        <Button variant={"outline"} size={"sm"} onClick={onRestore} className="border-white bg-transparent h-auto font-normal p-1 px-2 hover:bg-primary/5 hover:text-white outline-white text-white ">Restore Page</Button>
        <ConfirmModal onConfirm={onRemove}>
            <Button variant={"outline"} size={"sm"} className="border-white bg-transparent h-auto font-normal p-1 px-2 hover:bg-primary/5 hover:text-white outline-white text-white ">Delete forever</Button>
        </ConfirmModal>
    </div>;
}

export default Banner;
