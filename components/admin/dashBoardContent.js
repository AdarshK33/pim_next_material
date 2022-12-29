import React, { Fragment, useMemo } from "react";
import CatalogContent from "./catalog/catalogContent";
import { useRouter } from "next/dist/client/router";
import DashBoardView from "./dashboard/dashBoardView";
import PermissionView from "./settings/permissionView";
import ActionsView from "./catalog/actionsView";
import ProductList from "./catalog/productList";
import BulkUpload from "./bulkUpload/bulkUpload";
import Category from "./catalog/categories/classifyingCategory";
import ClassifyingBrand from "./brands/classifyingBrand";
import ClassifyingChannel from "./channels/classifyingChannel";
import ClassifyingUser from "./userManagement/classifyingUser";

function DashBoardContent() {

    const { query } = useRouter();

    const content = useMemo(() => {
        switch (query.list) {
            case 'dashboard': return <DashBoardView />;
            case 'catalog_list': return <CatalogContent />;
            case 'permission': return <PermissionView />;
            case 'publish': return <ActionsView />;
            case 'products': return <ProductList />;
            case 'bulkUpload': return <BulkUpload />;
            case 'categories': return <Category />;
            case 'brands_categories': return <ClassifyingBrand />;
            case 'channels': return <ClassifyingChannel />;
            case 'userManagement': return <ClassifyingUser />;
            
            default : return <DashBoardView />;
        }
    }, [query]);

    return (
        <Fragment>           
            {content}            
        </Fragment>
    )
};

export default React.memo(DashBoardContent);