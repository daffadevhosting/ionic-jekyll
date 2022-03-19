//<[CDATA[
$(function () {
        $(function () {
            $('#nama_masakan').on('click', function () {
                let id_masakan = $('#nama_masakan option:selected').attr('value');
                let nama_masakan = $('#nama_masakan option:selected').attr('data');
    $.ajax(url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from("SB-Mid-server-OlcPbvosi7DN_co_ZPkDKmnA").toString("base64")
      // Above is API server key for the Midtrans account, encoded to base64
                }
           })
      }),
    data:
      // Below is the HTTP request body in JSON
      {
 /* Call Input Form */ 
 cartItem = '';
 waItems = JSON.parse(localStorage.getItem('simpleCart_items'));
 waItems = Object.values(waItems);
 waItems.forEach((item,i)=>{ 
        transaction_details: {
          order_id: "order-csb-" + getCurrentTimestamp(),
    cartItem += 'gross_amount: '+angkaToRp(item.price * item.quantity)+';
        },
        credit_card: {
          secure: true
        },
      }
 }).then(
    (snapResponse) => {
      let snapToken = snapResponse.data.token;
      console.log("Retrieved snap token:", snapToken);
      // Pass the Snap Token to frontend, render the HTML page
      res.send(getMainHtmlPage(snapToken, handleMainRequest));
    },
    (error) => {
      res.send(`Fail to call API w/ error ${error}`);
      console.log(error);
    }
  );

//]]>
