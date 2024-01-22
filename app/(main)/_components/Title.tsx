import { Doc } from "@/convex/_generated/dataModel";
import React from "react";

interface TitleProps {
    initialData: Doc<"documents">
}

const Title = ({ initialData }: TitleProps) => {
    return <div>{initialData.title}</div>;
};

export default Title;
