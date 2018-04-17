var supplist = [{ regno: '10024', date: '2018/01/24', name: 'Shakyani', route: 'Ambewela', weight: '245Kg' },
                { regno: '10025', date: '2017/02/2', name: 'Jinadasa', route: 'Nuwara Eliya', weight: '11KG' },
                { regno: '10026', date: '2018/01/24', name: 'Chinthanie', route: 'Rathnapura', weight: '245Kg' }];

var SupplierList = new Vue({
    el: '#supplierSummaryList',
    data: {
        supplierList: []

    },
    methods: {

    },
    mounted() {
        this.supplierList = supplist;
    }
});

var routeDetailList = [{ routeNo: '20014', routeName: 'Ambewela', totalCollection: '200Kg' },
                        { routeNo: '20014', routeName: 'Ambewela', totalCollection: '200Kg' },
                        { routeNo: '20014', routeName: 'Ambewela', totalCollection: '200Kg' }];

var RouteDetail = new Vue({
    el: "#routeDetailSummary",
    data: {
        routeDetail: []
    },
    methods: {

    },
    mounted() {
        this.routeDetail = routeDetailList;
    }
});

var rSummary = [{ date: '2017/02/01', collectionOfficer: 'Shakyani', collectionAmount: '254Kg' }, { date: '2017/02/01', collectionOfficer: 'Shakyani', collectionAmount: '254Kg' }, { date: '2017/02/01', collectionOfficer: 'Shakyani', collectionAmount: '254Kg' }];

var RouteSummaryLeafCollection = new Vue({
    el: '#leafcol-route-wise-detail-resultTable',
    data: {
        routeSummary: []
    },
    methods: {

    },
    mounted() {
        this.routeSummary = rSummary;
    }
});

var rDailySummary = [{ supplierNumber: '10245', supplierName: 'Shakyani', collectionAmount: '250Kg' }, { supplierNumber: '10245', supplierName: 'Shakyani', collectionAmount: '245Kg' }, { supplierNumber: '10245', supplierName: 'Shakyani', collectionAmount: '245Kg' }];

var RouteSummaryDailyLeafCollection = new Vue({
    el: '#leafcol-route-wise-daily-detail-resultTable',
    data: {
        routeDailySummary: []
    },
    methods: {

    },
    mounted() {
        this.routeDailySummary = rDailySummary;
    }
});


var rLeafCollectionSummary = [{ routeNumber: '2004', routeName: 'Ambewela', totalCollection: '245Kg' },
    { routeNumber: '2004', routeName: 'Ambewela', totalCollection: '245Kg' },
    { routeNumber: '2004', routeName: 'Ratthnapura', totalCollection: '245Kg' },
{ routeNumber: '2004', routeName: 'Ratthnapura', totalCollection: '245Kg' }];

var RouteNameLeafCollection = new Vue({
    el: '#leafCollectionRouteName',
    data: {
        routeLeafCollectionSummary: []
    },
    methods: {

    },
    mounted() {
        this.routeLeafCollectionSummary = rLeafCollectionSummary;
    }
});