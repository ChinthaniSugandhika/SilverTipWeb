var NewSupplier = new Vue({
    el: '#newsupplier',
    data: {
        supplierDetails: {
            id:'',
            registrationNo: '',
            fullName: '',
            address: '',
            isActive: '',
            contactNumber: '',
            notes: '',
            nicNo: '',
            routes: {},
            types: {},
            leafTypes: {},
            supplierPaymentTypes: {
                paymentModes: {},
                accountName: '',
                accountNumber: '',
                banks: {},
                branch: '',
            },
            supplierFunds: [],
        },
        routes: [],
        types: [],
        leafTypes: [],
        paymentModes: [],
        fundNames: [],
        fundModes: [],
        banks:[],
        //Created a list to add each iteration to the table
        fundDetails: {
            id: "0",
            fundNames: {},
            fundModes: {},
            fundAmount: '',
        },
        fObj:{}
    },
    methods: {
        addfunddetails: function(){
            this.supplierDetails.supplierFunds.push(this.fundDetails);
        },
        submitSupplierDetails: function () {
            console.log(this.supplierDetails);
            this.$http.post(apiISS + '/api/Supplier/CreateSupplier', this.supplierDetails
            ).then(function (response) {
                console.log(response);
                if (response.body.messageCode.code == 1) {
                    console.log('Create Supplier - code 1');
                } else {
                    console.log('Create Supplier - else part');
                }
            }).catch(function (response) {
            });
        },
        getAllRoutes: function () {
            this.$http.get(apiISS + '/api/Route/GetAllRoutes', {}
            ).then(function (response) {                
                if (response.body.messageCode.code == 1) {
                    console.log('Get All Routes - code 1');
                    this.routes = response.body.routeList;
                    ViewSupplier.routes = response.body.routeList;
                    UpdateSupplierPersonalDetails.routes = response.body.routeList;
                    PersonalDetailHeading.routes = response.body.routeList;
                } else {
                    console.log('Get All Routes - else part');
                }
            }).catch(function (response) {
            });
        },
        getAllSupplierType: function () {
            this.$http.get(apiISS + '/api/SupplierType/GetAllSupplierTypes', {}
            ).then(function (response) {
                if (response.body.messageCode.code == 1) {
                    console.log('Get All Supplier Types - code 1');
                    this.types = response.body.suppplierTypeList;
                    ViewSupplier.types = response.body.suppplierTypeList;
                    UpdateSupplierPersonalDetails.types = response.body.suppplierTypeList;
                } else {
                    console.log('Get All Supplier Types - else part');
                }
            }).catch(function (response) {
            });
        },
        getAllLeafTypes: function () {
            this.$http.get(apiISS + '/api/LeafType/GetAllLeafTypes', {}
            ).then(function (response) {
                if (response.body.messageCode.code == 1) {
                    console.log('Get All Leaf Types - code 1');
                    this.leafTypes = response.body.leafTypeList;
                } else {
                    console.log('Get All Leaf Types - else part');
                }
            }).catch(function (response) {
            });
        },
        getAllPaymentTypes: function () {
            this.$http.get(apiISS + '/api/PaymentType/GetAllPaymentTypes', {}
            ).then(function (response) {
                if (response.body.messageCode.code == 1) {
                    console.log('Get All Payment Types - code 1');
                    this.paymentModes = response.body.paymentTypeList;
                    UpdateSupplierFinancialDetails.paymentModes = response.body.paymentTypeList;
                } else {
                    console.log('Get All Payment Types - else part');
                }
            }).catch(function (response) {
            });
        },
        getAllFunds: function () {
            this.$http.get(apiISS + '/api/Fund/GetAllFunds', {}
            ).then(function (response) {
                if (response.body.messageCode.code == 1) {
                    console.log('Get All Funds - code 1');
                    this.fundNames = response.body.fundList;
                    UpdateSupplierFinancialDetails.fundNames = response.body.fundList;
                } else {
                    console.log('Get All Funds - else part');
                }
            }).catch(function (response) {
            });
        },
        getAllFundModes: function () {
            this.$http.get(apiISS + '/api/FundMode/GetAllFundModes', {}
            ).then(function (response) {
                if (response.body.messageCode.code == 1) {
                    console.log('Get All Fund Modes - code 1');
                    this.fundModes = response.body.fundModeList;
                    UpdateSupplierFinancialDetails.fundModes = response.body.fundModeList;
                } else {
                    console.log('Get All Fund Modes - else part');
                }
            }).catch(function (response) {
            });
        },
        getAllBanks: function () {
            this.$http.get(apiISS + '/api/Bank/GetAllBanks', {}
            ).then(function (response) {
                if (response.body.messageCode.code == 1) {
                    console.log('Get All Banks - code 1');
                    this.banks = response.body.bankList;
                    UpdateSupplierFinancialDetails.banks = response.body.bankList;
                } else {
                    console.log('Get All Banks - else part');
                }
            }).catch(function (response) {
            });
        }
    },
    mounted() {
        this.getAllRoutes();
        this.getAllSupplierType();
        this.getAllLeafTypes();
        this.getAllPaymentTypes();
        this.getAllFunds();
        this.getAllFundModes();
        this.getAllBanks();
    }
});

var ViewSupplier = new Vue({
    el: '#viewSupplier',
    data: {
        supplierTable: {
            id:'',
            registrationNo: '',
            fullName: '',
            routesId: '',
            typesId: '',
            isActive:'',
            pageSize: 10,
            pageNum: 1,
            sortColumn: 'regNo',
            sortOrder: 'ASC',
        },
        totalRows: 0,
        routes: [],
        types: [],
        supplierColumns: [
            { "data": "regNo", sWidth: "15%" },
            { "data": "fullName", sWidth: "15%" },
            { "data": "routeName", sWidth: "20%" },
            { "data": "typeName", sWidth: "10%" },
            { "data": "isActive", sWidth: "10%" }
        ],
        isViewSupplierShow: false,
    },
    methods: {
        getIndexOfSortData: function (col) {
            var index = null;
            this.supplierColumns.filter(function (v, k) {
                if (v.data == col) {
                    index = k;
                }
            });
            return index;
        },
        getSortData: function () {
            //var queries = localStorageService.get('queries') || {};
            //var locData = localStorageService.get('queries');
            var sortData = [[1, "asc"]];
            //if ($rootScope.locationChanged && locData && locData.product && $scope.locationChanged) {
            sortData = [[ViewSupplier.getIndexOfSortData(ViewSupplier.supplierTable.sortColumn), ViewSupplier.supplierTable.sortOrder]];
            //}
            return sortData;
        },
        getSupplierList: function () {
            $(document).ready(function () {
                var supplierTable = $('#datatable-supplierGridList').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "searching": false,
                    "bLengthChange": false,
                    "order": ViewSupplier.getSortData(),
                    // "draw":false,
                    "pagingType": "full_numbers",
                    "language": {
                        "emptyTable": "No results founds.",
                        "info": "Showing _START_ to _END_ of _TOTAL_ total.",
                        "infoEmpty": "Showing 0 to 0 of 0 total.",
                        "infoFiltered": "(filtered from _MAX_ total.)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Show _MENU_ total.",
                        "loadingRecords": " <i class='fa fa-spin fa-spinner spinner-icon'></i>",
                        "processing": "<i class='fa fa-spin fa-spinner spinner-icon'></i>",
                        // "search": "Search:",
                        "zeroRecords": "No results founds.",
                        "paginate": {
                            "first": "First",
                            "last": "Last",
                            "next": "Next",
                            "previous": "Previous"
                        },
                    },
                    'ajax': {
                        'url': apiISS + '/api/Supplier/SearchSupplierGrid',
                        'type': 'POST',
                        contentType: 'application/json',
                        "data": function (data) {

                            var info = $('#datatable-supplierGridList').DataTable().page.info();
                            data.draw = info.page + 1;
                            ViewSupplier.supplierTable.pageSize = 10;
                            ViewSupplier.supplierTable.pageNum = data.draw;
                            ViewSupplier.supplierTable.sortColumn = ViewSupplier.supplierColumns[parseInt(data.order[0].column)].data;
                            ViewSupplier.supplierTable.sortOrder = data.order[0].dir;
                            return JSON.stringify(ViewSupplier.supplierTable);
                        },
                        error: function (jqXHR, textStatus, ex) {
                            console.log(textStatus + "," + ex + "," + jqXHR.responseText);
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            json.recordsTotal = json.suppliersList.length > 0 ? json.suppliersList[0].totalRows : 0;
                            json.recordsFiltered = json.suppliersList.length > 0 ? json.suppliersList[0].totalRows : 0;
                            totalRows = json.suppliersList.length > 0 ? json.suppliersList[0].totalRows : 0;
                            json.data = json.suppliersList;
                            return JSON.stringify(json);
                        }
                    }
                     , "aoColumns": [
                             { "data": "registrationNo", "name": "registrationNo", sWidth: "15%", },
                             { "data": "fullName", "name": "fullName", sWidth: "20%" },
                             { "data": "routeName", "name": "routeName", sWidth: "15%" },
                             { "data": "typeName", "name": "typeName", sWidth: "15%" },
                             { "data": "isActive", "name": "isActive", sWidth: "10%" },
                             {
                                 "data": null, "bSortable": false, sWidth: "10%",
                                 "render": function (data, type, row, meta) {
                                     var button = '';
                                     if (row.status == "Pending Approval") {

                                     }
                                     return button;
                                 },
                                 "mRender": function (o) {
                                     return '<a href="javascript:void(0);" id="btnView" class="openMod btn btn-inverse waves-effect waves-light btn-xs  m-b-5">+</a>';
                                 }
                             },
                     ],
                    initComplete: function () {
                        // DataTable
                        var table = $('#datatable-supplierGridList').DataTable();
                        table.page(ViewSupplier.supplierTable.pageNum - 1).draw(false);
                    },
                    "iDisplayLength": 10,
                });
            });
        },
        searchPaymentList: function () {
            this.isViewSupplierShow = true;
            $("#datatable-supplierGridList").dataTable().fnDestroy();
            this.getSupplierList();
        },
    },    
    mounted() {
        $('#datatable-supplierGridList').on('click', '#btnView', function () {
            $('.add-fund-details').show();
            $(".child").show();
            var divWidth = $(".content").innerWidth();
            var divHeight = $(".content").innerHeight();
            divHeight = divHeight + 55;
            $(".child").height(divHeight);
            $(".child").width(divWidth);


            var tr = $(this).closest('tr');
            var table = $('#datatable-supplierGridList').DataTable();
            var row = table.row(tr);
            var rowData = table.row(tr).data();
            console.log(rowData);

            //UpdateSupplierPersonalDetails.updateSupplierDetails(rowData.id);
            //$("#resultTable").css("display", "none");
            //$("#supdetails").css("display", "block");
            UpdateSupplierPersonalDetails.updatePersonalDetails.registrationNo = rowData.registrationNo;
            UpdateSupplierPersonalDetails.updatePersonalDetails.fullName = rowData.fullName;
            UpdateSupplierPersonalDetails.updatePersonalDetails.address = rowData.address;
            UpdateSupplierPersonalDetails.updatePersonalDetails.contactNumber = rowData.contactNumber;
            UpdateSupplierPersonalDetails.updatePersonalDetails.nicNo = rowData.nicNo;
            
            UpdateSupplierPersonalDetails.routes.filter(function (obj) {
                if (obj.id == rowData.routeID) {
                    UpdateSupplierPersonalDetails.updatePersonalDetails.routes = obj;
                }
            });
            UpdateSupplierPersonalDetails.types.filter(function (obj) {
                if (obj.id == rowData.typeID) {
                    UpdateSupplierPersonalDetails.updatePersonalDetails.types = obj;
                }
            });

            PersonalDetailHeading.personalDetailHead.registrationNo = rowData.registrationNo;
            PersonalDetailHeading.personalDetailHead.fullName = rowData.fullName;
            PersonalDetailHeading.personalDetailHead.contactNumber = rowData.contactNumber;
            PersonalDetailHeading.personalDetailHead.routeName = rowData.routeName;
            
            NewSupplier.supplierDetails.id = rowData.id;


            
            FinanceDetailsHeading.getFinancialDetails(NewSupplier.supplierDetails.id);
            //UpdateSupplierFinancialDetails.getSupplierFundDetails(NewSupplier.supplierDetails.id);
            //UpdateSupplierFinancialDetails.getFinancialDetails(NewSupplier.supplierDetails.id);

            });
        }
});

var UpdateSupplierPersonalDetails = new Vue({
    el: '#updateSupplierPersonalDetails',
    data: {
        updatePersonalDetails:{
            registrationNo: '',
            fullName: '',
            address: '',
            isActive: '',
            contactNumber: '',
            notes: '',
            nicNo: '',
            routes: {},
            //types: {},
            //supplierPaymentTypes: {
            //    paymentModes: {},
            //    accountName: '',
            //    accountNumber: '',
            //    banks: {},
            //    branch: '',
            //},
            //supplierFunds: [],
        },
        routes: [],
        types: [],
        //paymentModes: [],
        //fundNames: [],
        //fundModes: [],
        //banks:[],
        //Created a list to add each iteration to the table
        //fundDetails: {
        //    id: "0",
        //    fundNames: {},
        //    fundModes: {},
        //    fundAmount: '',
        //}
    },
    methods: {
        updateSupplierDetails: function () {
            console.log(this.supplierDetails);
            this.$http.post(apiISS + '/api/Supplier/UpdateSupplierPersonalDetails', this.updatePersonalDetails
            ).then(function (response) {
                console.log(response);
                if (response.body.messageCode.code == 1) {
                } else {
                }
            }).catch(function (response) {
            });
        }
    },
    mounted(){

    }
});

var UpdateSupplierFinancialDetails = new Vue({
    el: '#updateSupplierFinancialDetails',
    data: {
        updateFinancialDetails: {
            paymentModes: {},
            accountName: '',
            accountNumber: '',
            banks: {},
            branch: '',
            supplierFunds: [],
            
        },
        paymentModes: [],
        fundNames: [],
        fundModes: [],
        banks: [],
        fundDetails: {
                id: "0",
                fundNames: {},
                fundModes: {},
                fundAmount: '',
        },
        isEdit: false
    },
    methods: {
        updateSupplierDetails: function () {
            console.log(this.updateFinancialDetails);
            this.$http.get(apiISS + '/api/Supplier/UpdateSupplierPersonalDetails', this.updateFinancialDetails
            ).then(function (response) {
                console.log(response);
                if (response.body.messageCode.code == 1) {
                } else {
                }
            }).catch(function (response) {
            });
        },
        addfunddetails: function () {
            var x = JSON.parse(JSON.stringify(this.fundDetails));
            if (this.isEdit) {
                this.updateFinancialDetails.supplierFunds.filter(function (obj) {
                    if (obj.id == x.id) {
                        obj.fundNames = UpdateSupplierFinancialDetails.fundDetails.fundNames;
                        obj.fundModes = UpdateSupplierFinancialDetails.fundDetails.fundModes;
                        obj.fundAmount = UpdateSupplierFinancialDetails.fundDetails.fundAmount;
                    }
                });
                this.clearFundDetails();
            }
            else {
                //var y = JSON.parse(JSON.stringify(x));
                var date = new Date();                
                x.id = Math.floor(Math.random() * -10 * date.getSeconds());
                this.updateFinancialDetails.supplierFunds.push(x);
                this.clearFundDetails();
            }
            
        },
        editFundRow: function (fund) {
            this.isEdit = true;
            this.fundDetails = JSON.parse(JSON.stringify(fund));
        },
        clearFundDetails: function () {
            this.fundDetails.id = "0";
            this.fundDetails.fundNames = {};
            this.fundDetails.fundModes = {};
            this.fundDetails.fundAmount = "";

        },
        getFinancialDetails: function () {
        }
    },
    mounted() {
    }
});

var FinanceDetailsHeading = new Vue({
    el: '#financeDetailsHeading',
    data: {
        displayDetails: {
            paymentModeName:'',
            accountNumber: '',
            bankName:'',
            branch: '',
        },
        obj: {},
        jObj: {}
    },
    methods: {
        getFinancialDetails: function (id) {
            console.log(this.displayDetails);
            this.$http.get(apiISS + '/api/Supplier/GetSupplierDetails', {
                params: {
                    id: id,
                }
            }
            ).then(function (response) {
                console.log(response);

                if (response.body.messageCode.code == 1) {
                    this.displayDetails.paymentModeName = response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.paymentModes.name;
                    this.displayDetails.bankName = response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.banks.name;
                    this.displayDetails.accountNumber = response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.accountNumber;
                    this.displayDetails.branch = response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.branch;


                    UpdateSupplierFinancialDetails.updateFinancialDetails.accountName = response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.accountName;
                    UpdateSupplierFinancialDetails.updateFinancialDetails.accountNumber = response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.accountNumber;
                    UpdateSupplierFinancialDetails.updateFinancialDetails.branch = response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.branch;

                    UpdateSupplierFinancialDetails.paymentModes.filter(function (obj) {
                        if (obj.id == response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.paymentModes.id) {
                            UpdateSupplierFinancialDetails.updateFinancialDetails.paymentModes = obj;
                        }
                    });
                    UpdateSupplierFinancialDetails.banks.filter(function (obj) {
                        if (obj.id == response.body.updateSupplierDetailsViewModel.supplierPaymentTypes.banks.id) {
                            UpdateSupplierFinancialDetails.updateFinancialDetails.banks = obj;
                        }
                    });

                    this.$http.get(apiISS + '/api/SupplierFund/GetAllFundsById', {
                        params: {
                            id: id,
                        }
                    }
                    ).then(function (response) {
                        console.log('reponse');
                        if (response.body.messageCode.code == 1) {
                            console.log('Get Supplier Fund List by SupId - code 1');

                            UpdateSupplierFinancialDetails.updateFinancialDetails.supplierFunds = response.body.supplierFundDetailsVM.supplierFunds;
                            this.obj = JSON.parse(JSON.stringify(UpdateSupplierFinancialDetails.updateFinancialDetails.supplierFunds));
                            console.log(this.obj);
                            console.log(this.obj.fundModes.id);  //cannot access the inner object

                            //UpdateSupplierFinancialDetails.fundModes.filter(function (obj) {
                            //    if (obj.id == response.body.supplierFundDetailsVM.supplierFunds.fundModes.id) {
                            //        UpdateSupplierFinancialDetails.fundModes = obj;
                            //    }
                            //});
                            //UpdateSupplierFinancialDetails.fundNames.filter(function (obj) {
                            //    if (obj.id == response.body.supplierFundDetailsVM.supplierFunds.fundNames.id) {
                            //        UpdateSupplierFinancialDetails.fundNames = obj;
                            //    }
                            //});
                        }
                        else {
                            console.log('Get Supplier Fund List by SupId - else part');
                        }
                    }).catch(function (response) {
                        console.log(response);
                    });


                } else {
                }
            }).catch(function (response) {
            });
        },
    },
    mounted() {
    }
});
var PersonalDetailHeading = new Vue({
    el: '#personalDetailHeading',
    data: {
        personalDetailHead:{
           registrationNo: '',
           fullName: '',
           contactNumber: '',
           routeName: '',
        },
        routes: [],
    },
    methods: {

    },
    mounted() {

    }
});


/*
this.$http.get(apiURL + 'api/Item/GetItemsForEvaluation', {
    params: {
        outletId: outletId
    }
}).then(function (response) {
    if (response.body.messageCode.code == 1) {
        this.returnItemList = response.body.itemsList;
        this.bindDataTable();
    } else {
        msgAlert.isSuccess = false;
        msgAlert.alertMessage = response.body.messageCode.message;
        msgAlert.showModal();
    }
    $('.pre-loader').css("display", "none");
}).catch(function (response) {
    msgAlert.isSuccess = false;
    msgAlert.alertMessage = response.statusText;
    msgAlert.showModal();
    $('.pre-loader').css("display", "none");
    if (response.statusText == "Unauthorized") {
        $(location).attr('href', webURL + 'Account/Login');
    }
});*/

