const TABLE_HEADERS = [{
    DashBoard: {
      tableName:"DashBoard",
      id: "ID",
      name: "DashBoard Name",
      discription: "DashBoard Discription",
      action: "Action",
    },
    Brand: {
      tableName:"Brand",
        // id: "Email Id",
        name: "Name",
        discription: "Brand Discription",
        email: "Email",
        contact: "Contact Info",
        category: "Total Categories",
        sku: "Total SKU's",
        status:"Status",
        action: "Action",
      },
      Product: {
        tableName:"Proucts",
          // id: "Email Id",
          image: "Image",
          productName: "Product Name",
          sku: "SKU",
          brand: "Brand",
          channels: "Channels",
          category: "Category",
          subcategory:"Sub-Category",
          status: "Status",
          action:"Action"
        },
    Catergory: {
      tableName:"Catergory",
         id: "Catergory ID",
         Parent_Category_Id: "Parent Category ID",
         CategoryL1: "Catergory L1",
         CategoryL2: "Catergory L2",
         CategoryL3: "Catergory L3",
        action: "Action",
    },
    Channels: {
      tableName:"Channels",
         name: "Name",
         discription: "Discription",
         lastUploaded: "Last Uploaded",
         totalProductsActive: "Total Products Active",
         totalProductsInactive: "Total Products InActive",
         status: "Status",
         action: "Action",
    },
  }];
   
  export default TABLE_HEADERS;
  