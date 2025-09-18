console.log("connected")
{    // console.log(sessionStorage.getItem("user"))
    const firebaseConfig = {
        apiKey: "AIzaSyDlqNMzVsqHNTVzLAYSrsn4SjuUhZyOELc",
        authDomain: "e-restaurant-23034.firebaseapp.com",
        projectId: "e-restaurant-23034",
        storageBucket: "e-restaurant-23034.appspot.com",
        messagingSenderId: "411328100739",
        appId: "1:411328100739:web:ba4eb93d5f6828017f5eb6",
        measurementId: "G-WSW44TGVTM",
        databaseURL: "https://e-restaurant.firebaseio.com",
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    console.log("connected")

    $('#waiterDataForm').on('submit', function (event) {
        event.preventDefault();
        console.log("button click")
        const waiterDataBillNo = $('#waiterDataBillNo').val();
        const waiterDataDate = $('#waiterDataDate').val();
        const waiterDataMenu = $('#waiterDataMenu').val();
        const waiterDataMobile = $('#waiterDataMobile').val();
        const waiterDataName = $('#waiterDataName').val();
        const waiterDataQuantity = $('#waiterDataQuantity').val();
        const waiterDataTable = $('#waiterDataTable').val();
        const waiterDataTime = $('#waiterDataTime').val();



        const data = {
            "billNo": waiterDataBillNo,
            "date": waiterDataDate,
            "menu": waiterDataMenu,
            "mobile": waiterDataMobile,
            "name": waiterDataName,
            "quantity": waiterDataQuantity,
            "table": waiterDataTable,
            "time": waiterDataTime,
        }
        db.collection('waiterData').add(data)
            .then(function (docRef) {
                // Display success message using SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data added to Firestore successfully!',
                    timer: 3000,
                    showConfirmButton: false
                });
                // Reset the form
                // $('#alarmingSituation')[0].reset();
                //    window.href = "./"
                location.reload();
            })
            .catch(function (error) {
                // Display error message using SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add data to Firestore!',
                    timer: 3000,
                    showConfirmButton: false
                });
            })
            .catch((error) => {
                console.log('Error getting restaurants: ', error);
            });



        // Print the table name in the console
        // console.log(tableName);
    });

    db.collection("waiterData")
        .get()
        .then((querySnapshot) => {
            let index = 0;
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                $("#insertWaiterDataData").append(` <tr data-key=${doc.id}>
                                                    <td>${data.billNo}</td>
                                                    <td>${data.date}</td>
                                                    <td>${data.menu}</td>
                                                    <td>${data.mobile}</td>
                                                    <td>${data.name}</td>
                                                    <td>${data.quantity}</td>
                                                    <td>${data.table}</td>
                                                    <td>${data.time}</td>
                                                    <td style="text-align: left">
                                                        <a class="btn btn-primary btn-sm edit-table"><em
                                    style="color: white"
                                    class="icon ni ni-pen "></em></a>
                            <a data-toggle="modal" 
                                class="khan btn btn-danger btn-sm delete-table"><em
                                    style="color: white"
                                    class="icon ni ni-trash "></em></a>
                                                    </td>
                                                </tr>`);
                index++;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add data to Firestore!',
                timer: 3000,
                showConfirmButton: false
            });
        });


    // Delete data from table

    $("#insertWaiterDataData").on("click", ".delete-table", function () {
        var waiterId = $(this).closest("tr").attr("data-key");
        // Perform the delete action for the items with the ID tableId
        // Your code here
        console.log(waiterId)
        var tableRef = db.collection("waiterData").doc(waiterId);

        // Delete the table document
        tableRef.delete().then(function () {
            console.log("waiter form data deleted successfully!");
            // Remove the table row from the HTML
            location.reload();
            // $(this).closest("tr").remove();
        }).catch(function (error) {
            console.error("Error deleting table: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete the table!',
                timer: 3000,
                showConfirmButton: false
            });
        });

    });
}
