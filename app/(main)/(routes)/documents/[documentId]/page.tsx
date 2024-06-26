"use client"
import { Cover } from "@/components/cover";
import ToolBar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">
    }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });

    if (document === undefined) {
        return <div>Loading....</div>
    }

    if (document === null) {
        return (<div>
            Not found
        </div>)
    }


    return <div className="pb-40">
        <Cover url={document.coverImage} />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
            <ToolBar initialData={document} />
        </div>
    </div>;
};

export default DocumentIdPage;
