/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const page = () => {

    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({
            title: "Untitled"
        });

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created",
            error: "Failed to create new note"
        })
    }

    return <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
            src="/empty.png"
            height="300"
            width="300"
            alt="Empty"
            className="dark:hidden"
        />
        <Image
            src="/empty-dark.png"
            height="300"
            width="300"
            alt="Empty"
            className="hidden dark:block"
        />
        <h2>Welcome to {user?.firstName}&apos;s Potion</h2>
        <Button onClick={onCreate}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Create a note
        </Button>
    </div>;
};

export default page;
