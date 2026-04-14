"use client";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";
interface ILayoutCommonComponents {
    children: ReactNode;
}
const LayoutCommonComponents = (props: ILayoutCommonComponents) => {
    const { children } = props;

    return (
        <>
            {children}
        </>
    );
};

export default LayoutCommonComponents;
