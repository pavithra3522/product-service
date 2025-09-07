function loadOrders() {
fetch("https://order-service-app.herokuapp.com/orders")
    .then(response => response.json())
    .then(orders => {
      var listDiv = document.getElementById("order-list");
 
      if (orders.length === 0) {
        listDiv.innerHTML = "<p>No orders available.</p>";
        return;
      }
 
      var html = "<ul>";
      for (var i = 0; i < orders.length; i++) {
        var o = orders[i];
		html += "<li>Product Name: " + o.name + ", Quantity: " + o.quantity + ", Price: " + o.price + "<button onclick=\"removeOrder('" + o.id +"')\">Remove</button>" + "</li>";
      }
      html += "</ul>";
 
      listDiv.innerHTML = html;
    })
    .catch(error => {
      console.error("Error loading orders:", error);
      document.getElementById("order-list").innerHTML =
        "<p style='color:red;'>Failed to load orders.</p>";
    });
}
 
function removeOrder(id) {
fetch("https://order-service-app.herokuapp.com/orders/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            alert("Order removed!");
            location.reload();  // Refresh the page to reload updated order list
        } else {
            alert("Failed to remove order.");
        }
    })
    .catch(error => console.error("Error:", error));
}

// Load orders immediately
loadOrders();


