import React, { Fragment } from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
import NextLink from "next/link";

function SideBarContent({ data }) {

    const { query } = useRouter();

    return (
        <Fragment>
            <ul className="mb-0 list_style_none">
                {data.map((item, index) => <li className={query.name === item.title
                    ? "activeSubtxt font15 pb-2"
                    : "font15 pb-2"}
                    key={`sidebarContent${index}`}
                >
                    <NextLink href={item.href}>{item.name}</NextLink>
                </li>)}
            </ul>
        </Fragment>
    )
};


export default React.memo(SideBarContent);
