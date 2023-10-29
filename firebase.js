// urdunotes.innerHTML = `آپ نے جاز کیش کو اپنے بل کی ادائیگی کے لئے منتخب کیا ہے برائے مہربانی ہمارے جاز کیش نمبر 03215600735 میں اپنے بل کی ادائیگی کو یقینی بنا کر رسید کو ہمارے واٹس ایپ نمبر 03215600735 پر میسج کر دیں تاکہ آپکے آرڈر پر فوری عمل کیا جاسکے۔`
// window.location.href = 'http://www.google.com';
// convert numbers in words function start here
// System for American Numbering
var th_val = ['', 'thousand', 'million', 'billion', 'trillion'];
// System for uncomment this line for Number of English
// var th_val = ['','thousand','million', 'milliard','billion'];

var dg_val = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn_val = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw_val = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function toWordsconver(s) {
  s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s))
        return 'not a number ';
    var x_val = s.indexOf('.');
    if (x_val == -1)
        x_val = s.length;
    if (x_val > 15)
        return 'too big';
    var n_val = s.split('');
    var str_val = '';
    var sk_val = 0;
    for (var i = 0; i < x_val; i++) {
        if ((x_val - i) % 3 == 2) {
            if (n_val[i] == '1') {
                str_val += tn_val[Number(n_val[i + 1])] + ' ';
                i++;
                sk_val = 1;
            } else if (n_val[i] != 0) {
                str_val += tw_val[n_val[i] - 2] + ' ';
                sk_val = 1;
            }
        } else if (n_val[i] != 0) {
            str_val += dg_val[n_val[i]] + ' ';
            if ((x_val - i) % 3 == 0)
                str_val += 'hundred ';
            sk_val = 1;
        }
        if ((x_val - i) % 3 == 1) {
            if (sk_val)
                str_val += th_val[(x_val - i - 1) / 3] + ' ';
            sk_val = 0;
        }
    }
    if (x_val != s.length) {
        var y_val = s.length;
        str_val += 'point ';
        for (var i = x_val + 1; i < y_val; i++)
            str_val += dg_val[n_val[i]] + ' ';
    }
    // return str_val.replace(/\s+/g, ' ');
    return str_val+"rupees only".replace(/\s+/g, ' ');
}

// convert numbers in words function end here

const firebaseConfig = {
    apiKey: "AIzaSyANErTna-KU59v9NTZDypr0Dd6xBxqhiS0",
    authDomain: "neworder-45ac6.firebaseapp.com",
    databaseURL: "https://neworder-45ac6-default-rtdb.firebaseio.com",
    projectId: "neworder-45ac6",
    storageBucket: "neworder-45ac6.appspot.com",
    messagingSenderId: "221646293378",
    appId: "1:221646293378:web:6e10270653ed0f5392279b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var newOrderRef = firebase.database().ref('newOrders');

  if (document.title != "Invoice - Rukhsar Selection") {

  document.getElementById('orderForm').addEventListener('submit', formSubmit);

  function formSubmit(e) {
    e.preventDefault();

    function getInputVal(id) {
      return document.getElementById(id).value;
    }

    var customerEmail = getInputVal('customer-email');
    var customerFirstName = getInputVal('customer-first-name');
    var customerLastName = getInputVal('customer-last-name');
    var customerAddress = getInputVal('customer-address');
    var customerCityName = getInputVal('customer-city-name');
    var customerProvinceName = getInputVal('customer-province-name');
    var customerPostalCode = getInputVal('customer-postal-code');
    var customerMobileNumber = getInputVal('customer-mobile-number');
    var cartList = JSON.parse(localStorage.getItem("cartProducts"));
    var paymentOption = document.querySelector('input[name="paymentOption"]:checked').value;

    saveOrder(
      customerEmail,
      customerFirstName,
      customerLastName,
      customerAddress,
      customerCityName,
      customerProvinceName,
      customerPostalCode,
      customerMobileNumber,
      cartList,
      paymentOption
      );
  }

  function saveOrder(
    customerEmail,
    customerFirstName,
    customerLastName,
    customerAddress,
    customerCityName,
    customerProvinceName,
    customerPostalCode,
    customerMobileNumber,
    cartList,
    paymentOption
    ) {
      var firebaseOrderRef = newOrderRef.push();

      var customerInvoice=true;
      localStorage.setItem("customerInvoice", customerInvoice);
      localStorage.setItem("customerEmail", customerEmail);
      localStorage.setItem("timeStamp", new Date(Date.now()));

      firebaseOrderRef.set({
        customerInvoiceNo: Date.now(),
        customerEmail: customerEmail,
        customerFirstName: customerFirstName,
        customerLastName: customerLastName,
        customerAddress: customerAddress,
        customerCityName: customerCityName,
        customerProvinceName: customerProvinceName,
        customerPostalCode: customerPostalCode,
        customerMobileNumber: customerMobileNumber,
        customerCartList: cartList,
        paymentOption: paymentOption,
        timeStamp: localStorage.getItem("timeStamp")
      });

      newOrderRef.once("value", function(snapshot) {

        var VerifiedStatus = false;
        snapshot.forEach(function(element, key) {
          if (customerEmail===element.val().customerEmail && element.val().timeStamp===localStorage.getItem("timeStamp")) {
            VerifiedStatus=true;
          }
        })

        if (VerifiedStatus) {
          localStorage.removeItem("cartProducts");
          // localStorage.removeItem("timeStamp");
          cartcheck();
          closeChkbtn();
          console.log(VerifiedStatus);
          console.log("Order has been placed successfully ...");
          window.location.href = 'http://127.0.0.1:5500/invoice.html';
        } else {
          console.log("Something went wrong, please submit your order again. Thank you!");
        }

      })

    }

  } else {

    newOrderRef.once("value", function(snapshot) {

    var invoiceNo = document.getElementById("invoiceNo");
    var address = document.getElementById('address');
    var customerOrderDate = document.getElementById('orderDate');
    var customerPaymentMethod = document.getElementById('payment-method');
    var cartItems = document.getElementById('cartItems');
    var invoiceDate = document.getElementById('date');
    var amountDue = document.getElementById('amountDue');
    var amountInWords = document.getElementById('amountInWords');
    var notes = document.getElementById('notes');
    var urdunotes = document.getElementById('urdunotes');

    snapshot.forEach(function(element, key) {
      if (element.val().customerEmail===localStorage.getItem("customerEmail") && element.val().timeStamp===localStorage.getItem("timeStamp") && localStorage.getItem("customerInvoice")==="true") {

        customerOrderDate.innerHTML = element.val().timeStamp;
        customerPaymentMethod.innerHTML = `<strong>${element.val().paymentOption}</strong>`;
        address.innerHTML = `<strong>${element.val().customerFirstName} ${element.val().customerLastName}</strong><br />
                            ${element.val().customerAddress}<br />
                            ${element.val().customerCityName} - ${element.val().customerPostalCode} (${element.val().customerProvinceName})<br />
                            Mobile: ${element.val().customerMobileNumber}
                            `;

                            var invoiceTotal = 0;

                            const customerCartList = element.val().customerCartList.map((product, index) => {

                              invoiceTotal = invoiceTotal + product.price;

                              return `
                              <tr class="item">
                                  <td>${product.name}</td>
                                  <td>01</td>
                                  <td>Rs. ${product.price}</td>
                                  <td>Rs. ${product.price}</td>
                              </tr>
                              `
                              }).join('');

                              var tableHeading = `
                              <tr class="heading">
                              <td>Description</td>
                              <td>QTY</td>
                              <td>Unit Price</td>
                              <td>Total</td>
                              </tr>`;

                              invoiceNo.innerHTML = "Invoice # " + element.val().customerInvoiceNo;
                              cartItems.innerHTML = tableHeading + customerCartList;
                              amountDue.innerHTML = `<strong>Rs. ${invoiceTotal}</strong>`;
                              amountInWords.innerHTML = `<strong>${toWordsconver(invoiceTotal).toUpperCase()}</strong>`;

                              if (element.val().paymentOption==="JazzCash" || element.val().paymentOption==="EasyPaisa" || element.val().paymentOption==="NayaPay" || element.val().paymentOption==="SadaPay") {
                                notes.innerHTML = `<strong>Notes:</strong> Your selected payment method is: ${element.val().paymentOption}, Please make your bill payment <strong>Rs. ${invoiceTotal}</strong> via ${element.val().paymentOption}, On our, <strong>${element.val().paymentOption}</strong>, number <strong>03215600735</strong> and share screenshot via WhatsApp.`;
                                if (element.val().paymentOption==="JazzCash") {urdunotes.innerHTML = `آپ نے جاز کیش کو اپنے بل کی ادائیگی کے لئے منتخب کیا ہے برائے مہربانی ہمارے جاز کیش نمبر 03215600735 میں اپنے بل کی ادائیگی کو یقینی بنا کر رسید کو ہمارے واٹس ایپ نمبر 03161736023  پر میسج کر دیں تاکہ آپکے آرڈر پر فوری عمل کیا جاسکے۔`}
                                if (element.val().paymentOption==="EasyPaisa") {urdunotes.innerHTML = `آپ نے ایزی پیسہ کو اپنے بل کی ادائیگی کے لئے منتخب کیا ہے برائے مہربانی ہمارے ایزی پیسہ نمبر 03215600735 میں اپنے بل کی ادائیگی کو یقینی بنا کر رسید کو ہمارے واٹس ایپ نمبر 03161736023  پر میسج کر دیں تاکہ آپکے آرڈر پر فوری عمل کیا جاسکے۔`}
                                if (element.val().paymentOption==="NayaPay") {urdunotes.innerHTML = `آپ نے نیاپے کو اپنے بل کی ادائیگی کے لئے منتخب کیا ہے برائے مہربانی ہمارے نیاپے نمبر 03215600735 میں اپنے بل کی ادائیگی کو یقینی بنا کر رسید کو ہمارے واٹس ایپ نمبر 03161736023  پر میسج کر دیں تاکہ آپکے آرڈر پر فوری عمل کیا جاسکے۔`}
                                if (element.val().paymentOption==="SadaPay") {urdunotes.innerHTML = `آپ نے ساداپے کو اپنے بل کی ادائیگی کے لئے منتخب کیا ہے برائے مہربانی ہمارے ساداپے نمبر 03215600735 میں اپنے بل کی ادائیگی کو یقینی بنا کر رسید کو ہمارے واٹس ایپ نمبر 03161736023  پر میسج کر دیں تاکہ آپکے آرڈر پر فوری عمل کیا جاسکے۔`}
                              } else if (element.val().paymentOption==="Bank Transfer") {
                                notes.innerHTML = `
                                Your selected payment method is: ${element.val().paymentOption} Please make payment via ${element.val().paymentOption} and share screenshot via WhatsApp. Here is our bank detail:<br /><br />
                                Bank: Faysal Bank<br />
                                Account Title: MUHAMMAD ZAHID ALI<br />
                                Account No: 3260704000004368<br />
                                Currency: PKR
                                `;
                              } else if (element.val().paymentOption==="Cash On Delivery") {
                                notes.innerHTML = `Your selected payment method is: ${element.val().paymentOption}, Please make your cash <strong>Rs. ${invoiceTotal}</strong>, ready at the time of delivery.`;
                              }

                              invoiceDate.innerHTML = element.val().timeStamp;
      }
    })
  })
  }