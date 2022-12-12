import { useRouter } from "next/router";
import React, { useMemo } from "react";
import DashBoardContent from "../../components/admin/dashBoardContent";
import DashBoardSideBar from "../../components/admin/dashBoardSideBar";

function AdminDashBoard() {

    const { query } = useRouter();
    const heading = useMemo(() => {
        switch (query.list) {
            case 'dashboard': return "DashBoard";
            case 'catalog_list': return "Catalog";
            case 'permission': return "Admin";
            case 'publish': return "View";
            case 'products': return "Products";
            case 'uploads': return "Catalog";
            case 'brands_categories': return "Brands";
            default: return `${query.name}/${query.list}`;
        }
    }, [query])

    return (
        <div className="page-container dashBoard">
            <h4 className="offset-md-2 px-2 text-uppercase heading">{heading}</h4>
            <div className="row mx-0 pe-md-5">
                <div className="col-md-2 pe-0">
                    <DashBoardSideBar defaultValue={query.name} />
                </div>
                <div className="col-md-10 px-2">
                    <DashBoardContent />
                </div>
            </div>
        </div>
    )
};

export default React.memo(AdminDashBoard)