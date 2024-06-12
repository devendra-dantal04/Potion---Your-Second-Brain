import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface MenuProps {
    documentId: Id<"documents">
}

function Menu({
    documentId
}: MenuProps) {

    const { user } = useUser();
    const router = useRouter();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({
            id: documentId
        })

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash.",
            error: "Failed to archive document."
        })

        router.push('/documents');

    }


    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size={"sm"} className="" variant={"ghost"}>
                <MoreHorizontal className="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 p-2" alignOffset={8} forceMount>
            <DropdownMenuItem onClick={onArchive} className="flex items-center">
                <Trash className="h-4 w-4 mr-2" />
                Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-muted-foregroundp-2">
                Last edited by : {user?.fullName}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>;
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-4 w-10" />
    )
}

export default Menu;
