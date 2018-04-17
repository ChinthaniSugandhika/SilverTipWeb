var leafCollectionList = [{ route: '213', sipplierRegistrationNumber: '2334', collectionOfficer: 'Lahriu', weight: '245Kg' },
{ route: '213', sipplierRegistrationNumber: '2334', collectionOfficer: 'Lahriu', weight: '245Kg' },
{ route: '213', sipplierRegistrationNumber: '2334', collectionOfficer: 'Lahriu', weight: '245Kg' }];

var DataTable = new Vue({
    el: '#datatable',
    data: {
        leafCollectionDetails: [],
    },
    methods: {

    },
    mounted() {
        this.leafCollectionDetails = leafCollectionList;
    }
});