import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function SideBarContent({ data }) {

    const { query } = useRouter();

    return (
        <Fragment>
            <ul className="mb-0 list_style_circle">
                {data.map((item, index) => <li className={query.list === item.list_name ? "activeSubtxt font13 pb-2" : "font13 pb-2"} key={`sidebarContent${index}`}><Link href={item.link}>{item.name}</Link></li>)}
            </ul>
        </Fragment>
    )
};

export default React.memo(SideBarContent);